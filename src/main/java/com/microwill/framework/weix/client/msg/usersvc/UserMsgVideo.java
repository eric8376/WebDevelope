package com.microwill.framework.weix.client.msg.usersvc;

import com.microwill.framework.weix.shared.msg.MediaEx;

/**
 * 发送给客户的视频消息
 * 
 * 
 * 
 * 
 * 
 */
public class UserMsgVideo extends UserMsg {

    public MediaEx video;

    public UserMsgVideo(String touser, MediaEx video) {
	super(touser, "video");
	this.video = video;
    }

}
