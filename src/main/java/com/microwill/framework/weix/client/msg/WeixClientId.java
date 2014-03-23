package com.microwill.framework.weix.client.msg;

/**
 * 唯一标志一个微信公共号的接入信息，包括AppID和AppSecret。
 * 
 * 注：access_token是公众号的全局唯一票据，公众号调用各接口时都需使用access_token。
 * 正常情况下access_token有效期为7200秒，重复获取将导致上次获取的access_token失效。
 * 公众号可以使用AppID和AppSecret调用本接口来获取access_token。
 * AppID和AppSecret可在开发模式中获得（需要已经成为开发者，且帐号没有异常状态）。
 * 
 * 
 * 
 * 
 *
 */
public class WeixClientId
{
	
	//固定为client_credential
	private String grant_type = "client_credential";
	//第三方用户唯一凭证
	private String appid;
	//第三方用户唯一凭证密钥
	private String secret;
	
	public WeixClientId(String appid, String secret)
	{
		this.appid = appid;
		this.secret = secret;
	}

	public String getGrant_type()
	{
		return grant_type;
	}

	public void setGrant_type(String grant_type)
	{
		this.grant_type = grant_type;
	}

	public String getAppid()
	{
		return appid;
	}

	public void setAppid(String appid)
	{
		this.appid = appid;
	}

	public String getSecret()
	{
		return secret;
	}

	public void setSecret(String secret)
	{
		this.secret = secret;
	}
}
