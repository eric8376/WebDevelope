package com.microwill.framework.weix.svc.msg.user;

import com.microwill.framework.weix.shared.msg.Media;
import com.microwill.framework.weix.svc.msg.MsgType.RespType;
import com.thoughtworks.xstream.annotations.XStreamAlias;

/**
 * 回复图片消息 

 * 
 * 
 * 
 *
 */
@XStreamAlias("xml")
public class RespMsgImage extends RespMsg
{
	@XStreamAlias("Image")
	private Media image;
	
	public RespMsgImage(BaseMsg req, Media image)
	{
		super(req, RespType.image.name());
		this.image = image;
	}

	public Media getImage()
	{
		return image;
	}

	public void setImage(Media image)
	{
		this.image = image;
	}

}
