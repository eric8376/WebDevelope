package org.nxstudio.service.httpService;
import java.io.IOException;
import java.net.InetSocketAddress;
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.spi.HttpServerProvider;
import org.nxstudio.util.properties.PropertiesFactory;
import org.nxstudio.util.properties.PropertiesFile;
import org.nxstudio.util.properties.PropertiesHelper;

/**
 * @author chuer
 * @version V1.0
 * @Description: 服务器启动类
 * Created by 黄琦鸿 on 2015/4/10.
 */
public class MyHttpServer {
    private static PropertiesHelper g4PHelper = PropertiesFactory.getPropertiesHelper(PropertiesFile.APP);
    //启动服务，监听来自客户端的请求
    public static void start() throws IOException {
        Integer httpServicePort=Integer.valueOf(g4PHelper.getValue("httpServicePort"));
        Context.load();
        HttpServerProvider provider = HttpServerProvider.provider();
        HttpServer httpserver = provider.createHttpServer(new InetSocketAddress(httpServicePort), 100);//监听端口8888,能同时接 受100个请求
        httpserver.createContext(Context.contextPath, new MyHttpHandler());
        httpserver.setExecutor(null);
        httpserver.start();
        System.out.println("httpserver started");
    }



}

