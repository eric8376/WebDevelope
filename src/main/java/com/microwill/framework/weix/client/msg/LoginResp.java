package com.microwill.framework.weix.client.msg;

/**
 * 登陆请求应答。
 * 
 * 
 * 
 * 
 *
 */
public class LoginResp extends BaseResp
{
	// 获取到的凭证
	public String access_token;
	//凭证有效时间，单位：秒
	public long expires_in;
	
	@Override
	public String toString()
	{
		return "LoginResp [access_token=" + access_token + ", expires_in="
				+ expires_in + ", errcode=" + errcode + ", errmsg=" + errmsg
				+ "]";
	}
	
	
}
