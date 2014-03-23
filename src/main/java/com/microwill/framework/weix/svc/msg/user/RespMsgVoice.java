package com.microwill.framework.weix.svc.msg.user;

import com.microwill.framework.weix.shared.msg.Media;
import com.microwill.framework.weix.svc.msg.MsgType.RespType;
import com.thoughtworks.xstream.annotations.XStreamAlias;

/**
 * 回复语音消息
 * 
 * 
 * 
 * 
 *
 */
@XStreamAlias("xml")
public class RespMsgVoice extends RespMsg
{
	@XStreamAlias("Voice")
	private Media voice;
	
	public RespMsgVoice(BaseMsg req, Media voice)
	{
		super(req, RespType.voice.name());
		this.voice = voice;
	}

	public Media getVoice()
	{
		return voice;
	}

	public void setVoice(Media voice)
	{
		this.voice = voice;
	}

}
