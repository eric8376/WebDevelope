package org.nxstudio.service.httpService;

import org.nxstudio.service.httpService.request.Request;
import org.nxstudio.service.httpService.response.Response;

import java.io.IOException;

/**
 * Created by Administrator on 2015/4/10.
 */

public abstract class HttpHandler implements Handler {

    @Override
    public void service(Request request, Response response) {
        request.initRequestHeader();
        if(request.getMethod().equals(Request.GET)){
            request.initRequestParam();
            doGet(request,response);
        }else if(request.getMethod().equals(Request.POST)){
            request.initRequestBody();
            request.initRequestParam();
            doPost(request, response);
        }
    }

    @Override
    public abstract void doGet(Request request, Response response) ;

    @Override
    public abstract void doPost(Request request, Response response) ;


}

