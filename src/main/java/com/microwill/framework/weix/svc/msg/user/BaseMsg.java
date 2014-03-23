package com.microwill.framework.weix.svc.msg.user;

import com.microwill.framework.weix.svc.msg.MsgType.ReqType;
import com.thoughtworks.xstream.annotations.XStreamAlias;

/**
 * 消息的基类
 * 
 *
 */
public abstract class BaseMsg
{
	
	// 接收方帐号
	@XStreamAlias("ToUserName")
    protected String toUserName;  
    // 发送方帐号
	@XStreamAlias("FromUserName")
	protected String fromUserName;  
    // 消息创建时间 （整型）
	@XStreamAlias("CreateTime")
	protected long createTime;  
    // 消息类型
	@XStreamAlias("MsgType")
	protected String msgType;

	//getter setter
	
	public String getToUserName()
	{
		return toUserName;
	}

	public String getFromUserName()
	{
		return fromUserName;
	}

	public long getCreateTime()
	{
		return createTime;
	}

	public String getMsgType()
	{
		return msgType;
	}

	public void setToUserName(String toUserName)
	{
		this.toUserName = toUserName;
	}

	public void setFromUserName(String fromUserName)
	{
		this.fromUserName = fromUserName;
	}

	public void setCreateTime(long createTime)
	{
		this.createTime = createTime;
	}

	public void setMsgType(String msgType)
	{
		this.msgType = msgType;
	}
	
	//以下为各种消息判断的便利方法
	
	//是否事件
	public boolean isEventMsg()
	{
		return "event".equalsIgnoreCase(msgType);
	}
	//是否文本消息
	public boolean isTextMsg()
	{
		return ReqType.text.name().equalsIgnoreCase(msgType);
	}
	//是否图片消息
	public boolean isImageMsg()
	{
		return ReqType.image.name().equalsIgnoreCase(msgType);
	}
	//是否链接消息
	public boolean isLinkMsg()
	{
		return ReqType.link.name().equalsIgnoreCase(msgType);
	}
	//是否视频消息
	public boolean isVideoMsg()
	{
		return ReqType.video.name().equalsIgnoreCase(msgType);
	}
	//是否语音消息
	public boolean isVoiceMsg()
	{
		return ReqType.voice.name().equalsIgnoreCase(msgType);
	}
	//是否地理位置消息
	public boolean isLocationMsg()
	{
		return ReqType.location.name().equalsIgnoreCase(msgType);
	}
}
