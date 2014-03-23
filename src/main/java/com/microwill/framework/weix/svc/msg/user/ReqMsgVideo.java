package com.microwill.framework.weix.svc.msg.user;

/**
 * 视频请求消息
 * 
 * 
 * 
 * 
 *
 */
public class ReqMsgVideo extends ReqMsgMedia
{
	// 视频消息缩略图的媒体id，可以调用多媒体文件下载接口拉取数据。
	private String thumbMediaId;

	public String getThumbMediaId()
	{
		return thumbMediaId;
	}

	public void setThumbMediaId(String thumbMediaId)
	{
		this.thumbMediaId = thumbMediaId;
	}
}
