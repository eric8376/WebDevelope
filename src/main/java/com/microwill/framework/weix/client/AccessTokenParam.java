package com.microwill.framework.weix.client;

/**
 * 用于在请求参数中加上access_token
 * 
 * 
 * 
 * 
 *
 */
public class AccessTokenParam
{
	private String access_token;
	
	public AccessTokenParam()
	{
	}
	
	public AccessTokenParam(String access_token)
	{
		this.access_token = access_token;
	}

	public String getAccess_token()
	{
		return access_token;
	}

	public void setAccess_token(String access_token)
	{
		this.access_token = access_token;
	}
}
