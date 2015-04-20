package com.rwy.httpService;

import com.sun.net.httpserver.HttpExchange;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.core.service.IPhoneClientService;
import org.nxstudio.service.httpService.HttpHandler;
import org.nxstudio.service.httpService.request.Request;
import org.nxstudio.service.httpService.response.Response;
import org.nxstudio.util.base.WebUtils;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.util.spring.SpringContextHolder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.HttpURLConnection;

/**
 * Created by Administrator on 2015/4/10.
 */
@Service
public class PhoneClient extends HttpHandler {
    private IPhoneClientService phoneClientService;

    public PhoneClient() {
        phoneClientService = SpringContextHolder.getBean("PhoneClientService");
    }

    @Override
    public void doGet(Request request, Response response) {
        doPost(request, response);
    }


    @Override
    public void doPost(Request request, Response response) {
        //保存请求记录
        Dto paramsdto = WebUtils.getParamAsDto(request);
        Long processid = phoneClientService.saveHandlerInfo(paramsdto.toJson(), paramsdto.getAsString("bussiness_code"));
        Dto result = new BaseDto("code", 0);
        String resultString = "";
        try {
            phoneClientService.doBusiness(request, paramsdto, result);
            resultString = result.toJson();
        } catch (Exception e) {
            e.printStackTrace();
            resultString = e.getStackTrace().toString();
        }
        phoneClientService.updateHandlerInfo(resultString, processid);
        //保存相应记录
        response.write(resultString);
    }


}
