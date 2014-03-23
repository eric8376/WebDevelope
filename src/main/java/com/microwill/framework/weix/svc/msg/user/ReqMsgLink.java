package com.microwill.framework.weix.svc.msg.user;

/**
 * 链接请求消息
 * 
 * 
 * 
 * 
 *
 */
public class ReqMsgLink extends ReqMsg
{
	 // 消息标题   
    private String title;  
    // 消息描述   
    private String description;  
    // 消息链接   
    private String url;
    
	public String getTitle()
	{
		return title;
	}
	public String getDescription()
	{
		return description;
	}
	public String getUrl()
	{
		return url;
	}
	public void setTitle(String title)
	{
		this.title = title;
	}
	public void setDescription(String description)
	{
		this.description = description;
	}
	public void setUrl(String url)
	{
		this.url = url;
	}

}
