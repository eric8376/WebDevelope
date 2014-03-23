package com.microwill.framework.weix.client.msg.usersvc;

/**
 * 发送给客户的文本消息
 * 
 * 
 * 
 * 
 *
 */
public class UserMsgText extends UserMsg
{
	public static class Text
	{
		// 文本消息内容
		public String content;
	}

	public Text text;
	
	public UserMsgText(String touser, String content)
	{
		super(touser, "text");
		this.text = new Text();
		this.text.content = content;
	}

}
