package com.microwill.framework.weix.client.msg.usermng;

import com.microwill.framework.weix.client.msg.BaseResp;

/**
 * 获取用户信息应答结果。
 * 
 * 
 * 
 * 
 *
 */
public class UserInfoResp extends BaseResp
{
	public enum SEX
	{
		UNKOWN(0), MALE(1), FEMALE(2);
		
		@SuppressWarnings("unused")
		private int code;
		
		private SEX(int code)
		{
			this.code = code;
		}
	}
	
	public enum SUBSCRIPTION
	{
		FALSE(0), TRUE(1);
		
		@SuppressWarnings("unused")
		private int code;
		
		private SUBSCRIPTION(int code)
		{
			this.code = code;
		}
	}
	
	private SUBSCRIPTION subscribe;
	private String openid;
	private String nickname;
	private SEX sex;
	private String city;
	private String country;
	private String province;
	private String language;
	private String headimgurl;
	private long subscribe_time;
	
	public SUBSCRIPTION getSubscribe()
	{
		return subscribe;
	}
	public void setSubscribe(SUBSCRIPTION subscribe)
	{
		this.subscribe = subscribe;
	}
	public String getOpenid()
	{
		return openid;
	}
	public void setOpenid(String openid)
	{
		this.openid = openid;
	}
	public String getNickname()
	{
		return nickname;
	}
	public void setNickname(String nickname)
	{
		this.nickname = nickname;
	}
	public SEX getSex()
	{
		return sex;
	}
	public void setSex(SEX sex)
	{
		this.sex = sex;
	}
	public String getCity()
	{
		return city;
	}
	public void setCity(String city)
	{
		this.city = city;
	}
	public String getCountry()
	{
		return country;
	}
	public void setCountry(String country)
	{
		this.country = country;
	}
	public String getProvince()
	{
		return province;
	}
	public void setProvince(String province)
	{
		this.province = province;
	}
	public String getLanguage()
	{
		return language;
	}
	public void setLanguage(String language)
	{
		this.language = language;
	}
	public String getHeadimgurl()
	{
		return headimgurl;
	}
	public void setHeadimgurl(String headimgurl)
	{
		this.headimgurl = headimgurl;
	}
	public long getSubscribe_time()
	{
		return subscribe_time;
	}
	public void setSubscribe_time(long subscribe_time)
	{
		this.subscribe_time = subscribe_time;
	}
}
