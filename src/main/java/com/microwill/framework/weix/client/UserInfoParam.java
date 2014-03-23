package com.microwill.framework.weix.client;

/**
 * 获取用户信息的参数
 * 
 * 
 * 
 * 
 *
 */
public class UserInfoParam extends AccessTokenParam
{
	private String openid;

	public String getOpenid()
	{
		return openid;
	}

	public void setOpenid(String openid)
	{
		this.openid = openid;
	}
	
	public UserInfoParam(AccessTokenParam ac, String openid)
	{
		super(ac.getAccess_token());
		setOpenid(openid);
	}
	

}
