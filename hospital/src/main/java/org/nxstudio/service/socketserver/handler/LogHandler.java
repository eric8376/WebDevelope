package org.nxstudio.service.socketserver.handler;

import org.nxstudio.service.socketserver.event.EventAdapter;
import org.nxstudio.service.socketserver.io.Request;
import org.apache.log4j.Logger;


public class LogHandler extends EventAdapter {
    private Logger log = Logger.getLogger(LogHandler.class);

    public LogHandler() {
    }

    public void onClosed(Request request) throws Exception {
        //log.info("关闭连接：" + request.getAddress().toString() + ":" + new Date(System.currentTimeMillis()));
    }

    public void onError(String error) {
        log.error("发生错误：" + error);
    }
}