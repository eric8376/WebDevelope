package com.microwill.framework.weix.svc.msg.user;

import com.microwill.framework.weix.shared.msg.MediaEx;
import com.microwill.framework.weix.svc.msg.MsgType.RespType;
import com.thoughtworks.xstream.annotations.XStreamAlias;

/**
 * 回复视频消息
 * 
 * 
 * 
 * 
 *
 */
@XStreamAlias("xml")
public class RespMsgVideo extends RespMsg
{
	@XStreamAlias("Video")
	private MediaEx video;
	
	public RespMsgVideo(BaseMsg req, MediaEx video)
	{
		super(req, RespType.video.name());
		this.video = video;
	}

	public MediaEx getVideo()
	{
		return video;
	}

	public void setVideo(MediaEx video)
	{
		this.video = video;
	}

}
