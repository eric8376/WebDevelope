package org.nxstudio.service.socketserver.event;


import org.nxstudio.service.socketserver.io.Request;
import org.nxstudio.service.socketserver.io.Response;

/**
 * <p>
 * Title: 事件适配器
 * </p>
 * <p>
 * Description: 事件适配器
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

public abstract class EventAdapter implements ServerListener {
    public EventAdapter() {
    }

    public void onError(String error) {
    }

    public void onAccept() throws Exception {
    }

    public void onAccepted(Request request) throws Exception {
    }

    public void onRead(Request request) throws Exception {
    }

    public void onWrite(Request request, Response response) throws Exception {
    }

    public void onClosed(Request request) throws Exception {
    }
}