package com.microwill.framework.weix.svc.msg.user;

/**
 * 图片请求消息
 * 
 * 
 * 
 * 
 *
 */
public class ReqMsgImage extends ReqMsgMedia
{
	// 图片链接   
    private String picUrl;
    
	public String getPicUrl()
	{
		return picUrl;
	}

	public void setPicUrl(String picUrl)
	{
		this.picUrl = picUrl;
	}
}
