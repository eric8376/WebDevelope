package com.microwill.framework.weix.client.msg.usersvc;

import com.microwill.framework.weix.shared.msg.Media;

/**
 * 发送给客户的图片消息
 * 
 * 
 * 
 * 
 *
 */
public class UserMsgImage extends UserMsg
{	
	public Media image;
	
	public UserMsgImage(String touser, String media_id)
	{
		super(touser, "image");
		this.image = new Media(media_id);
	}

}
