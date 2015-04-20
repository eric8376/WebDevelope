package org.nxstudio.service.socketserver.io;

import org.nxstudio.service.socketserver.Notifier;
import org.nxstudio.service.socketserver.util.Helper;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.nio.channels.SelectionKey;
import java.nio.channels.SocketChannel;
import java.util.LinkedList;
import java.util.List;


/**
 * <p>
 * Title: 数据发送线程
 * </p>
 * <p>
 * Description: 该线程用于向客户端发送数据
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

public class Writer extends Thread {
    private static Log log = LogFactory.getLog(Writer.class);

    private static List pool = new LinkedList();

    protected static Notifier notifier = Notifier.getInstance();

    // protected Logger log = Logger.getLogger(Writer.class);

    public Writer() {
    }

    /**
     * 发送线程主控服务方法,负责调度整个发送处理过程
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

                // 处理写事件
                write(key);
            } catch (Exception e) {
                log.error("XXX", e);
                continue;
            }
        }
    }

    /**
     * 处理向客户发送数据
     *
     * @param key 选择键
     */
    public void write(SelectionKey key) {
        SocketChannel sc = (SocketChannel) key.channel();
        Response response = new Response(sc);
        Request request = (Request) key.attachment();

        try {
            // 触发onWrite事件
            notifier.fireOnWrite(request, response);

//			Thread.sleep(5000);

        } catch (Exception e) {
            log.error("XXX", e);
            log.error("Error occured in Writer", e);
            notifier.fireOnError("Error occured in Writer: " + e.getMessage());
        } finally {
            Helper.close(sc, notifier, request);
        }
    }

    /**
     * 处理客户请求,唤醒队列中的线程进行处理
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
