package com.microwill.framework.weix.svc.msg.user;

import com.thoughtworks.xstream.annotations.XStreamAlias;

/**
 * 语音请求消息及语音识别消息。
 * 
 * 开通语音识别功能，用户每次发送语音给公众号时，微信会在推送的语音消息XML数据包中，增加一个Recongnition字段。 
 * 注：由于客户端缓存，开发者开启或者关闭语音识别功能，对新关注者立刻生效，对已关注用户需要24小时生效。
 * 开发者可以重新关注此帐号进行测试。
 * 
 * 
 * 
 * 
 *
 */
@XStreamAlias("xml")
public class ReqMsgVoice extends ReqMsgMedia
{
    // 语音格式，如amr，speex等   
    private String Format;
    
	// 语音识别结果，UTF8编码
	private String Recognition;

	public String getRecognition()
	{
		return Recognition;
	}

	public void setRecognition(String recognition)
	{
		Recognition = recognition;
	}
    
	public String getFormat()
	{
		return Format;
	}
	public void setFormat(String format)
	{
		Format = format;
	}
}
