/**
 * 
 */
package com.microwill.framework.weix;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.annotation.PostConstruct;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.ui.Model;

import com.microwill.framework.web.BaseMultiActionController;
import com.microwill.framework.weix.svc.msg.XmlMsgUtil;
import com.microwill.framework.weix.svc.msg.user.BaseMsg;
import com.microwill.framework.weix.svc.msg.user.RespMsg;

/**
 * @author lizhen
 * 
 */
public abstract class WeixBaseController extends BaseMultiActionController {
    protected SignUtil signUtil;

    protected abstract String getAppToken();
    protected abstract RespMsg  onResponse(BaseMsg msg);
    @PostConstruct
    public void init(){
	signUtil=new SignUtil(getAppToken());
   }
    public String doService(Model model,HttpServletRequest request, HttpServletResponse response)
	    throws Exception {
	if (request.getMethod().equals("GET")) {
	    return doGet(request, response);
	} else if (request.getMethod().equals("POST")) {
	    return doPost( model,request, response);
	}
	return null;
    }

    private String getHttpBody(HttpServletRequest request) throws IOException {
	String charset = request.getCharacterEncoding();
	if (charset == null) {
	    charset = EnCodingType.UTF_8;
	}

	BufferedReader in = new BufferedReader(new InputStreamReader(
		request.getInputStream(), charset));
	String line = null;
	StringBuilder result = new StringBuilder();
	while ((line = in.readLine()) != null) {
	    result.append(line);
	}

	in.close();

	return result.toString();
    }

    public String doPost(Model model,HttpServletRequest request, HttpServletResponse response)
	    throws ServletException, IOException {
	String reqBody = getHttpBody(request);
	BaseMsg msg = XmlMsgUtil.xml2Bean(reqBody);
	RespMsg result = this.onResponse(msg);
	model.addAttribute("result", result);
	return "xmlview";

    }

    private String doGet(HttpServletRequest request, HttpServletResponse response)
	    throws IOException {
	// 微信加密签名
	String signature = request.getParameter("signature");
	// 时间戳
	String timestamp = request.getParameter("timestamp");
	// 随机数
	String nonce = request.getParameter("nonce");
	// 随机字符串
	String echostr = request.getParameter("echostr");

	// 通过检验signature对请求进行校验，若校验成功则原样返回echostr，表示接入成功，否则接入失败
	if (signUtil.checkSignature(signature, timestamp, nonce)) {
	    try {
		response.getWriter().print(echostr);
		response.getWriter().flush();
	    } finally {
		response.getWriter().close();
	    }
	} else {
	    // logger.error("checkSignature failed for request address:{}",
	    // request.getRemoteAddr());
	    // logger.error("signature={},timestamp={},nonce={},echostr={}",
	    // signature, timestamp, nonce, echostr);
	}
	return null;
    }

    

}
