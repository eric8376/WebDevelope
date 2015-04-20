package org.nxstudio.service.httpService;
        import java.io.IOException;
        import com.sun.net.httpserver.HttpExchange;
        import com.sun.net.httpserver.HttpHandler;
        import org.nxstudio.service.httpService.request.impl.HttpRequest;
        import org.nxstudio.service.httpService.response.impl.HttpResponse;

/**
 * Created by Administrator on 2015/4/10.
 * @Description: 内部消息处理类
 * @date 2014年11月12日 下午3:53:44
 * @version V1.0
 */
public class MyHttpHandler implements HttpHandler {

    public void handle(HttpExchange httpExchange) throws IOException {
        HttpRequest request = new HttpRequest(httpExchange);
        HttpResponse response = new HttpResponse(httpExchange);
        Handler handler = Context.getHandler(request.getReuestURI().getPath());
        handler.service(request, response);

    }
}

