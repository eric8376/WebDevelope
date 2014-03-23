package com.microwill.framework.weix.svc.msg.user;

/**
 * 多媒体请求消息的公共类。
 * 
 * 
 * 
 * 
 *
 */
public abstract class ReqMsgMedia extends ReqMsg
{
	// 消息媒体id，可以调用多媒体文件下载接口拉取数据。
	private String mediaId;

	public String getMediaId()
	{
		return mediaId;
	}

	public void setMediaId(String mediaId)
	{
		this.mediaId = mediaId;
	}

}
