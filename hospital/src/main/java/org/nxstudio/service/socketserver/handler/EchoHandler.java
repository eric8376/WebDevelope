package org.nxstudio.service.socketserver.handler;

import org.nxstudio.service.socketserver.WebBankService;
import org.nxstudio.service.socketserver.event.EventAdapter;
import org.nxstudio.service.socketserver.io.Request;
import org.nxstudio.service.socketserver.io.Response;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


public class EchoHandler extends EventAdapter {
    private static Log log = LogFactory.getLog(EchoHandler.class);

    public EchoHandler() {
    }

    public void onAccept() throws Exception {
        //log.info("onAccept:" + new Date(System.currentTimeMillis()));
    }

    public void onAccepted(Request request) throws Exception {
        //log.info("onAccepted:" + new Date(System.currentTimeMillis()));
    }

    public void onWrite(Request request, Response response) throws Exception {
        //log.info("--------------------------------onWrite():" + new Date(System.currentTimeMillis()));
        String out = new String(request.getDataInput(), "UTF-8");
        //log.info("----------------------------------------" + out);
        // 随机休息一段时间（小于2000毫秒）
//		Thread.sleep(new java.util.Random().nextInt(2000));
        response.send(out.getBytes("UTF-8"));
    }

    public void onRead(Request request) throws Exception {
        byte[] in = request.getDataInput();
        if (in.length > 0) {
            String msg = new String(request.getDataInput(), "UTF-8");
            log.info("做为服务端收到的数据：" + msg);

            WebBankService wbs = new WebBankService();
            String retStr = wbs.process(msg.substring(0, 6).trim(), msg.substring(6, msg.length()));

            request.setDataInput(retStr.getBytes("UTF-8"));
            log.info("做为服务端返回的数据：" + retStr);
        }

    }
}
