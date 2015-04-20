package org.nxstudio.service.socketserver.start;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import org.nxstudio.service.socketserver.Notifier;
import org.nxstudio.service.socketserver.Server;
import org.nxstudio.service.socketserver.handler.AuditDraftHandler;
import org.nxstudio.service.socketserver.handler.LogHandler;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


@SuppressWarnings("serial")
public class Service extends HttpServlet {
    private static Log log = LogFactory.getLog(Service.class);

    private Server serverRunnable = null;


    public void init() throws ServletException {
        System.out.println();
    }

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        int port = 8282;
        try {
            port = Integer.parseInt(config.getInitParameter("port"));
        } catch (Exception e) {
            e.printStackTrace();
            port = 8282;
        }
        try {
//			int port = Integer.parseInt();
            log.info("端口" + port + "Socket服务加载开始");
            Notifier notifier = Notifier.getInstance();
            notifier.addListener(new LogHandler());
            //notifier.addListener(new EchoHandler());
            notifier.addListener(new AuditDraftHandler());
            try {
                serverRunnable = new Server(port, 4, 4);
            } catch (Exception e) {
                serverRunnable = new Server(port + 1, 4, 4);
            }
            Thread server = new Thread(serverRunnable);
            server.start();
            log.info("端口" + port + "Socket服务加载完成");
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
    }

    public static void main(String[] args) {
        // TODO Auto-generated method stub
        System.out.println();
    }

    public void destroy() {
        // TODO Auto-generated method stub
        log.info("----stop Server Thread!");
        serverRunnable.stop();
    }
}
