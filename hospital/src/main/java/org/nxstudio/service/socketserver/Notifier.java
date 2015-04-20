package org.nxstudio.service.socketserver;

import org.nxstudio.service.socketserver.event.ServerListener;
import org.nxstudio.service.socketserver.io.Request;
import org.nxstudio.service.socketserver.io.Response;

import java.util.ArrayList;


/**
 * <p>
 * Title: 事件触发器
 * </p>
 * <p>
 * Description: 事件触发器
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

public class Notifier {
    private ArrayList listeners = new ArrayList();

    private static Notifier instance = new Notifier();

    private Notifier() {
    }

    /**
     * 获取事件触发器
     *
     * @return 返回事件触发器
     */
    public static Notifier getInstance() {
        return instance;
    }

    /**
     * 添加事件监听器
     *
     * @param sl 监听器
     */
    public void addListener(ServerListener sl) {
        synchronized (listeners) {
            if (!listeners.contains(sl))
                listeners.add(sl);
        }
    }

    public void fireOnAccept() throws Exception {
        for (int i = listeners.size() - 1; i >= 0; i--)
            ((ServerListener) listeners.get(i)).onAccept();
    }

    public void fireOnAccepted(Request request) throws Exception {
        for (int i = listeners.size() - 1; i >= 0; i--)
            ((ServerListener) listeners.get(i)).onAccepted(request);
    }

    public void fireOnRead(Request request) throws Exception {
        for (int i = listeners.size() - 1; i >= 0; i--)
            ((ServerListener) listeners.get(i)).onRead(request);

    }

    public void fireOnWrite(Request request, Response response) throws Exception {
        for (int i = listeners.size() - 1; i >= 0; i--)
            ((ServerListener) listeners.get(i)).onWrite(request, response);

    }

    public void fireOnClosed(Request request) throws Exception {
        for (int i = listeners.size() - 1; i >= 0; i--)
            ((ServerListener) listeners.get(i)).onClosed(request);
    }

    public void fireOnError(String error) {
        for (int i = listeners.size() - 1; i >= 0; i--)
            ((ServerListener) listeners.get(i)).onError(error);
    }
}