/**
 * @(#) TokenUtil.java 2013年8月11日
 * Copyright (c) 厦门极网商业互联技术有限公司
 */
package com.microwill.framework.web.util;


import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.microwill.framework.CommonConstant;
import com.microwill.framework.util.DateUtil;
import com.microwill.framework.vo.mobile.MobileToken;

/**
 * Token工具类
 * <pre>
 * @date 2013年8月11日
 * @author zcguo
 * @功能说明:
 * Token工具类
 * @版本更新列表
 * 修改版本: 1.0.0
 * 修改日期: 2013年8月11日
 * 修  改  人: zcguo
 * 修改说明: 形成初始版本
 * 复  审  人:
 * </pre>
 */
public class TokenUtil {
	protected static Log log = LogFactory.getLog(TokenUtil.class);
	public static final String JSON_MOBILE_TOKEN_KEY = "token";
	
    /**
     * 获取mobile用户的登陆token
     * @return 手机令牌信息
     * @throws JSONException 
     */
    public static MobileToken getMobileToken() throws JSONException {
    	ServletRequestAttributes attributes = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes());
		if (attributes == null) {
			return null;
		}
		HttpServletRequest request = attributes.getRequest();
		if (request == null) {
			return null;
		}
		return getMobileToken(request);
    }

    /**
     * 获取移动Token
     * @param request
     * @return
     * @throws JSONException 
     */
    public static MobileToken getMobileToken(HttpServletRequest request) throws JSONException {
	JSONObject requestJsonObj = (JSONObject) request
		.getAttribute(CommonConstant.MOBILE_DATAGRAM);
	if(requestJsonObj==null||!requestJsonObj.has(JSON_MOBILE_TOKEN_KEY)){
	    return null;
	}
	String tokenStr = requestJsonObj.getString(JSON_MOBILE_TOKEN_KEY);
	if (tokenStr != null && tokenStr.length() > 0) {
		if (log.isInfoEnabled()) {
			log.info("移动平台应用mobiletokenStr:"+tokenStr);
		}
	    String[] data = tokenStr.split("\\|");
	    int length = data.length;
	    String userId = data[0];
	    String supplyName = data[1];
	    String loginTime = data[2];
	    String supplyId = (length > 3 ? data[3] : "");
	    MobileToken mobileToken = new MobileToken(userId, supplyName,
		    DateUtil.string2Date(loginTime), supplyId);
	    return mobileToken;
	} else {
	    return null;
	}
    }
	
	
}
