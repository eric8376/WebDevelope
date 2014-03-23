package com.microwill.framework.weix.svc;

/**
 * 微信服务接口。
 * 
 * 
 * 
 * 
 *
 */
public interface WeixService
{
	/**
	 * 微信服务端有消息过来时，此方法被调用。
	 * 
	 * @param xml 请求消息
	 * @return 应答消息
	 * @throws Exception
	 */
	String onMsg(String xml);
}
