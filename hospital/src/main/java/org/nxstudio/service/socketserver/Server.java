package org.nxstudio.service.socketserver;


import org.nxstudio.service.socketserver.io.Reader;
import org.nxstudio.service.socketserver.io.Request;
import org.nxstudio.service.socketserver.io.Writer;
import org.nxstudio.service.socketserver.util.Helper;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;


/**
 * <p>Title: 主控服务线程</p>
 * <p>Description: 主控服务线程，支持自定义读取、发送线程个数</p>
 * <p>Copyright: Copyright (c) 2008</p>
 * <p>Company: 力铭科技</p>
 *
 * @author 夏兵
 * @version 1.0
 */

/**
 * V1.0功能： 1、底层通讯、业务逻辑处理分开； 2、采用事件触发机制控制流程； 3、自定义读取、发送线程数； 4、只支持连接、单次读取发送、关闭模型；
 *
 * 以后版本需要增加的功能： 1、支持连接、多次读取发送、关闭模型； 2、同时支持对多个端口的监听，每个端口处理类自定义；
 * 3、对所有线程进行监控，支持线程重启动； 4、支持优雅关闭，即支持Ctrl+C、远程命令关闭系统； 5、支持系统状态查询，包括线程、消息池状态；
 */

public class Server implements Runnable {
    private static Log log = LogFactory.getLog(Server.class);

    private boolean isRun = false;

    public static int DEFAULT_PORT = 9999; // 默认监听端口

    public static int READER_THREADS = 4; // 默认读取线程数

    public static int WRITER_THREADS = 4; // 默认发送线程数

    // protected Logger log = Logger.getLogger(Server.class); // 日志记录

    protected static List wpool = new LinkedList(); // 发送池

    protected static Selector selector = null; // 选择器

    protected int port; // 监听端口

    protected int reader; // 读取线程数

    protected int writer; // 发送线程数

    protected Notifier notifier; // 事件触发器

    private ServerSocketChannel sschannel;

    public Server() throws Exception {
        this(DEFAULT_PORT, READER_THREADS, WRITER_THREADS);
    }

    public Server(int port) throws Exception {
        this(port, READER_THREADS, WRITER_THREADS);
    }

    public Server(int reader, int writer) throws Exception {
        this(DEFAULT_PORT, reader, writer);
    }

    public synchronized boolean getIsRun() {
        return isRun;
    }

    /**
     * 创建主控服务线程
     *
     * @param port
     *            服务端口
     * @param reader
     *            读取线程数
     * @param writer
     *            发送线程数
     * @throws Exception
     */
    public Server(int port, int reader, int writer) throws Exception {
        this.port = port;
        this.reader = reader;
        this.writer = writer;

        // 获取事件触发器
        notifier = Notifier.getInstance();

        // 创建读取线程池
        for (int i = 0; i < reader; i++) {
            new Reader().start();
        }

        // 创建发送线程池
        for (int i = 0; i < writer; i++) {
            new Writer().start();
        }

        // 创建无阻塞网络套接
        selector = Selector.open();
        sschannel = ServerSocketChannel.open();
        sschannel.configureBlocking(false);
        ServerSocket ss = sschannel.socket();
        ss.bind(new InetSocketAddress(port));
        sschannel.register(selector, SelectionKey.OP_ACCEPT);
        // sschannel.close();
    }

    /**
     * 主控服务线程方法,负责调度整个处理过程
     */
    public void run() {
        log.info("服务器启动，监听端口: " + port);
        isRun = true;
        while (getIsRun()) {
            try {
                if (selector.select(1000) > 0) {
                    Set selectedKeys = selector.selectedKeys();
                    Iterator it = selectedKeys.iterator();
                    while (it.hasNext()) {
                        SelectionKey key = (SelectionKey) it.next();
                        it.remove();
                        // 处理IO事件
                        if ((key.readyOps() & SelectionKey.OP_ACCEPT) == SelectionKey.OP_ACCEPT) {
                            // 接受到新的请求
                            ServerSocketChannel ssc = (ServerSocketChannel) key.channel();
                            notifier.fireOnAccept();

                            SocketChannel sc = ssc.accept();
                            Request request = new Request(sc);

                            try {
                                sc.configureBlocking(false);

                                // 触发接受连接事件
                                notifier.fireOnAccepted(request);

                                // 注册读操作,以进行下一步的读操作
                                sc.register(selector, SelectionKey.OP_READ, request);
                            } catch (Exception e) {
                                log.error("XXX", e);
                                log.error("Error occured in Server", e);
                                notifier.fireOnError("Error occured in Server: " + e.getMessage());
                                Helper.close(sc, notifier, request);
                            }
                        } else if ((key.readyOps() & SelectionKey.OP_READ) == SelectionKey.OP_READ) {
                            Reader.processRequest(key); // 提交读服务线程读取客户端数据
                            key.cancel(); // 避免下一次选择器选择时再次返回，该操作将该键放入已取消键集（键集的子集）中。在下一次选择器选择时，已取消键集会自动清空
                        } else if ((key.readyOps() & SelectionKey.OP_WRITE) == SelectionKey.OP_WRITE) {
                            Writer.processRequest(key); // 提交写服务线程向客户端发送回应数据
                            key.cancel();
                        }
                    }
                } else {// 由于可能接收到写请求（调用wakeup），在Selector中注册新的写通道
                    addRegister();
                }
            } catch (Exception e) {
                log.error("XXX", e);
                log.error("Error occured in Server", e);
                notifier.fireOnError("Error occured in Server: " + e.getMessage());
                continue;
            }
        }
    }

    public void stop() {
        isRun = false;
        try {
            sschannel.close();
        } catch (Exception e) {
            log.error("XXX", e);
            // e.printStackTrace();
        }

    }

    /**
     * 添加新的通道注册
     */
    private void addRegister() {
        synchronized (wpool) {
            while (!wpool.isEmpty()) {
                SelectionKey key = (SelectionKey) wpool.remove(0);
                SocketChannel schannel = (SocketChannel) key.channel();
                Request request = (Request) key.attachment();

                if (schannel.socket().isClosed()) {
                    log.warn("连接已异常关闭：" + request);
                    Helper.close(schannel, notifier, request);
                } else {// register方法会首先从键集中查找通道对应键值是否存在，如果存在但状态不对，会抛出CancelledKeyException等异常
                    try {
                        schannel.register(selector, SelectionKey.OP_WRITE, request);
                    } catch (Exception e) {
                        log.error("XXX", e);
                        log.error("Error occured in addRegister", e);
                        notifier.fireOnError("Error occured in addRegister: " + e.getMessage());

                        Helper.close(schannel, notifier, request);
                    }
                }
            }
        }
    }

    /**
     * 提交新的客户端写请求到主服务线程的发送池中
     *
     * @param key
     *            选择键
     */
    public static void processWriteRequest(SelectionKey key) {
        synchronized (wpool) {
            wpool.add(wpool.size(), key);
            wpool.notifyAll();
        }
        // 解除selector的阻塞状态，以便注册新的通道
        selector.wakeup(); // 如果正在选择操作，立即返回；如果不在选择中，下次选择调用马上返回；在两个连续的选择操作之间多次调用此方法与只调用一次的效果相同
    }
}
