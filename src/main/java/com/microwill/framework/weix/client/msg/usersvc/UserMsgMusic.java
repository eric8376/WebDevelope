package com.microwill.framework.weix.client.msg.usersvc;

import com.microwill.framework.weix.shared.msg.Music;

/**
 * 发送给客户的音乐信息
 * 
 * 
 * 
 * 
 *
 */
public class UserMsgMusic extends UserMsg
{
	public Music music;

	public UserMsgMusic(String touser, Music music)
	{
		super(touser, "music");
		this.music = music;
	}
}
