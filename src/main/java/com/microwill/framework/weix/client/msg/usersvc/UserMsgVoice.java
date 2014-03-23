package com.microwill.framework.weix.client.msg.usersvc;

import com.microwill.framework.weix.shared.msg.Media;

/**
 * 发送给客户的语音信息
 * 
 * 
 * 
 * 
 * 
 */
public class UserMsgVoice extends UserMsg {
    public Media voice;

    public UserMsgVoice(String touser, String media_id) {
	super(touser, "voice");
	this.voice = new Media(media_id);
    }
}
