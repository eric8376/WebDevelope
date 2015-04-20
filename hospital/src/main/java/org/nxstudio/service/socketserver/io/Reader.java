package org.nxstudio.service.socketserver.io;

import org.nxstudio.service.socketserver.Notifier;
import org.nxstudio.service.socketserver.Server;
import org.nxstudio.service.socketserver.util.Helper;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.nio.channels.SelectionKey;
import java.nio.channels.SocketChannel;
import java.util.LinkedList;
import java.util.List;


/**
 * <p>
 * Title: 数据读取线程
 * </p>
 * <p>
 * Description: 该线程用于读取客户端数据
 * </p>
 * <p>
 * Copyright: Copyright (c) 2008
 * </p>
 * <p>
 * Company: 力铭科技
 * </p>
 *
 * @author 夏兵
 * @version 1.0
 */

public class Reader extends Thread {
    private static Log log = LogFactory.getLog(Reader.class);

    private static List pool = new LinkedList();

    protected static Notifier notifier = Notifier.getInstance();

    // protected Logger log = Logger.getLogger(Reader.class);

    public Reader() {
    }

    /**
     * 读取线程主控服务方法,负责调度整个读取处理过程
     */
    public void run() {
        while (true) {
            try {
                SelectionKey key = null;
                synchronized (pool) {
                    while (pool.isEmpty()) {
                        pool.wait();
                    }
                    key = (SelectionKey) pool.remove(0);
                }

                // 读取数据
                read(key);
            } catch (Exception e) {
                log.error("XXX", e);
                continue;
            }
        }
    }

    /**
     * 处理客户请求数据读取
     *
     * @param key 选择键
     */
    public void read(SelectionKey key) {
        SocketChannel sc = (SocketChannel) key.channel();
        Request request = (Request) key.attachment();

        try {
            // 读取客户端数据
            request.setDataInput(Helper.readRequest(sc));

            // 触发onRead
            notifier.fireOnRead(request);

            // 提交主控线程进行写处理
            Server.processWriteRequest(key);
        } catch (Exception e) {
            log.error("XXX", e);
            log.error("Error occured in Reader", e);
            notifier.fireOnError("Error occured in Reader: " + e.getMessage());
            Helper.close(sc, notifier, request);
        }
    }

    /**
     * 处理客户请求,并唤醒队列中的线程进行处理
     *
     * @param key 选择键
     */
    public static void processRequest(SelectionKey key) {
        synchronized (pool) {
            pool.add(pool.size(), key);
            pool.notifyAll();
        }
    }
}
