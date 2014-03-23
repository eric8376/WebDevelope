package com.microwill.framework.weix.svc;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.microwill.framework.weix.svc.msg.XmlMsgUtil;
import com.microwill.framework.weix.svc.msg.user.BaseMsg;
import com.microwill.framework.weix.svc.msg.user.ReqMsg;
import com.microwill.framework.weix.svc.msg.user.RespMsg;
import com.microwill.framework.weix.svc.msg.user.RespMsgText;

/**
 * 微信服务类。
 * 
 * 负责将微信发过来的消息进行解析转换后再转发给应用服务。
 * 
 * 
 * 
 * 
 *
 */
public class WeixServiceImpl implements WeixService
{	
	
	private static Logger logger = LoggerFactory.getLogger(WeixServiceImpl.class);
	
	private AppService appSvc;
	
	private String defaultRespMsg;
	
	public WeixServiceImpl(AppService appSvc, String defaultRespMsg)
	{
		if(appSvc == null)
		{
			throw new IllegalArgumentException("appSvc can not be null!");
		}
		
		this.appSvc = appSvc;
		this.defaultRespMsg = defaultRespMsg;
	}

	@Override
	public String onMsg(String xml)
	{
		logger.info("recv msg from weixin server.");
		logger.debug(xml);
	
		String result = null;
		try
		{
			BaseMsg msg = XmlMsgUtil.xml2Bean(xml);
			logger.info("call app service.");		
			RespMsg resp = appSvc.onMsg(msg);
			
			//没有应答，默认应答消息不为空且非事件消息，返回默认消息。
			if(resp == null && defaultRespMsg != null && (!msg.isEventMsg()))
			{
				resp = new RespMsgText((ReqMsg) msg, defaultRespMsg);
			}
			
			if(resp != null)
			{
				result = XmlMsgUtil.bean2Xml(resp);
			}

			logger.info("sending response to weixin service");
			logger.debug(result);
			
			return result;
		}
		catch (Exception e) 
		{
			logger.error("call app service failed.", e);
			throw new RuntimeException("error while process msg", e);
		}
	}
}
