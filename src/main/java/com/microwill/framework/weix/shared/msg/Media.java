package com.microwill.framework.weix.shared.msg;

import com.thoughtworks.xstream.annotations.XStreamAlias;

/**
 * 多媒体消息，对应Image消息,这种多媒体需要上传到微信服务器。
 * 
 * 
 * 
 * 
 *
 */
public class Media
{
	// 发送的媒体ID 
	@XStreamAlias("MediaId")
	public String media_id;

	public Media(String media_id)
	{
		this.media_id = media_id;
	}
	
}
