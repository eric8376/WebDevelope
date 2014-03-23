package com.microwill.framework.weix.client.msg;
/**
 * 微信返回的错误信息,其他返回消息从此消息继承。
 * 
 * 
 * 
 * 
 *
 */
public class BaseResp
{
	public Long errcode;
	public String errmsg;
	
	/**
	 * 请求是否成功
	 * 
	 * @return
	 */
	public boolean success()
	{
		return errcode == null || errcode == 0;
	}

	@Override
	public String toString()
	{
		return "BaseResp [errcode=" + errcode + ", errmsg=" + errmsg + "]";
	}
}
