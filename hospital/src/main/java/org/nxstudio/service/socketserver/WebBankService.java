package org.nxstudio.service.socketserver;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


public class WebBankService implements IWebBankService {

    private static Log log = LogFactory.getLog(WebBankService.class);

    public String process(String busicode, String xmlStr) {
        String ret = "";
        log.info("时间" + new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
        log.info("busicode=" + busicode);
        log.info("xmlStr=" + xmlStr);
        try {
//			Page page = XmlParserToObject.xmlToPageCond(busicode,xmlStr);
//			ret = PageToXML.parserToXml(page);
        } catch (Exception e) {
            log.info("错误信息" + e);
        }
        log.info(ret);
        return ret;
    }
}
