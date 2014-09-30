/**
 * 
 */
package com.microwill.framework.web;

import org.json.JSONObject;

import com.microwill.framework.CommonConstant;
import com.microwill.framework.vo.mobile.MobileToken;
import com.microwill.framework.web.util.TokenUtil;

/**
 * @author lizhen
 *
 */
public class AppBaseController extends BaseMultiActionController {

    /**
     * 将报文数据转为json
     * @return
     * @throws Exception
     */
    public JSONObject getRequestJsonObject()  throws Exception{
	return  (JSONObject)getRequest().getAttribute(CommonConstant.MOBILE_DATAGRAM);
    }
    
    /**
     * 获取mobile用户的登陆token
     * @return
     * @throws Exception
     */
    public MobileToken getMobileToken()throws Exception{
	return TokenUtil.getMobileToken(getRequest());
    }
    
    /**
     * 获取mobile的请求版本号
     * @return
     */
    public Integer getRequestVersion(){
	return (Integer)getRequest().getAttribute(CommonConstant.MOBILE_HEADER_VERSION);
    }

    
    
}
