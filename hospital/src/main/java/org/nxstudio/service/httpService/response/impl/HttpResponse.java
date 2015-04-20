package org.nxstudio.service.httpService.response.impl;

import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;

import com.sun.net.httpserver.HttpExchange;
import org.nxstudio.service.httpService.response.Response;

/**
 * Created by Administrator on 2015/4/10.
 */
public class HttpResponse implements Response {
    private HttpExchange httpExchange;

    public HttpResponse(HttpExchange httpExchange) {
        this.httpExchange = httpExchange;
    }

    @Override
    public void write(String result) {
        try {
            httpExchange.sendResponseHeaders(HttpURLConnection.HTTP_OK, result.getBytes("utf-8").length);
            OutputStream out = httpExchange.getResponseBody(); // 获得输出流
            out.write(result.getBytes("utf-8"));
            out.flush();
            httpExchange.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }


}
