package org.nxstudio.service.httpService.request.impl;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.sun.net.httpserver.HttpExchange;
import org.nxstudio.service.httpService.request.Request;

import javax.servlet.http.HttpSession;

/**
 * Created by Administrator on 2015/4/10.
 */
public class HttpRequest implements Request {
    private HttpExchange httpExchange;
    private Map<String, String> paramMap = new HashMap<String, String>();
    private Map<String, List<String>> headMap = new HashMap<String, List<String>>();
    private String requestBody = "";

    public HttpRequest(HttpExchange httpExchange) {
        this.httpExchange = httpExchange;
    }

    @Override
    public String getParamter(String param) {
        return paramMap.get(param);
    }

    @Override
    public Map<String, String> getParamters() {
        return paramMap;
    }

    @Override
    public String getMethod() {
        return httpExchange.getRequestMethod().trim().toUpperCase();
    }

    @Override
    public URI getReuestURI() {
        return httpExchange.getRequestURI();
    }

    @Override
    public void initRequestParam() {
        String query ="POST".equals(getMethod())?requestBody: getReuestURI().getQuery();
        String[] arrayStr = query.split("&");
        for (String str : arrayStr) {
            paramMap.put(str.split("=")[0], str.split("=")[1]);
        }

    }

    @Override
    public void initRequestHeader() {
        for (String s : httpExchange.getRequestHeaders().keySet()) {
            headMap.put(s, httpExchange.getRequestHeaders().get(s));
        }
    }

    @Override
    public void initRequestBody() {
        InputStream in = httpExchange.getRequestBody(); // 获得输入流
        BufferedReader reader = new BufferedReader(new InputStreamReader(in));
        String temp = null;
        try {
            while ((temp = reader.readLine()) != null) {
                requestBody += temp;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public String getRequestBody() {
        return requestBody;
    }

}
