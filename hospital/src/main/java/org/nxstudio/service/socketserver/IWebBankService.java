package org.nxstudio.service.socketserver;

import javax.jws.WebService;

@WebService
public interface IWebBankService {

    public String process(String busiCode, String xmlStr);

}
