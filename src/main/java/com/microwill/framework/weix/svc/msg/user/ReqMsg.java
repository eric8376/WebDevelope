package com.microwill.framework.weix.svc.msg.user;

/**
 * XML消息请求基类，当用户跟微信交互时，相关请求通过微信公共平台转发到企业方。
 * 
 * 
 */
public abstract class ReqMsg extends BaseMsg
{	
	// 消息id，64位整型
	protected long msgId;

	public long getMsgId()
	{
		return msgId;
	}

	public void setMsgId(long msgId)
	{
		this.msgId = msgId;
	}

}
