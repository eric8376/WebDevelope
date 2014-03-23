package com.microwill.framework.weix.svc.msg.user;

import com.microwill.framework.weix.svc.msg.MsgType.RespType;
import com.thoughtworks.xstream.annotations.XStreamAlias;

/**
 * 文本应答消息 
 * 
 * 
 * 
 * 
 *
 */
@XStreamAlias("xml")
public class RespMsgText extends RespMsg
{
	
	// 回复的消息内容（换行：在content中能够换行，微信客户端就支持换行显示） 
    @XStreamAlias("Content")
	private String content;

	public RespMsgText(BaseMsg req, String content)
	{
		super(req, RespType.text.name());
		this.content = content;
	}

	public String getContent()
	{
		return content;
	}

	public void setContent(String content)
	{
		this.content = content;
	}
 
}
