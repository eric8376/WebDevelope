package com.microwill.framework.weix.svc.msg.user;

import com.microwill.framework.weix.shared.msg.Music;
import com.microwill.framework.weix.svc.msg.MsgType.RespType;
import com.thoughtworks.xstream.annotations.XStreamAlias;

/**
 * 回复音乐消息
 * 
 * 
 * 
 * 
 *
 */
@XStreamAlias("xml")
public class RespMsgMusic extends RespMsg
{
	@XStreamAlias("Music")
	private Music music;
    
    public RespMsgMusic(BaseMsg req, Music music)
    {
    	super(req, RespType.music.name());
    	this.music = music;
    }

	public Music getMusic()
	{
		return music;
	}

	public void setMusic(Music music)
	{
		this.music = music;
	}
    
    
}
