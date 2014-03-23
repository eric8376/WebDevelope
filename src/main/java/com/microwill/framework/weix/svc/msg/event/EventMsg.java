package com.microwill.framework.weix.svc.msg.event;

import com.microwill.framework.weix.svc.msg.MsgType.EventType;
import com.microwill.framework.weix.svc.msg.user.BaseMsg;
import com.thoughtworks.xstream.annotations.XStreamAlias;

/**
 * 微信事件消息基类
 * 
 * 
 * 
 * 
 * 
 *
 */
public abstract class EventMsg extends BaseMsg
{
	// 事件类型 
	@XStreamAlias("Event")
	private String event;
	
	public String getEvent()
	{
		return event;
	}
	
	public void setEvent(String event)
	{
		this.event = event;
	}

	public boolean isClickEvent()
	{
		return EventType.CLICK.name().equalsIgnoreCase(event);
	}
	
	public boolean isSubscribeEvent()
	{
		return EventType.subscribe.name().equalsIgnoreCase(event);
	}
	public boolean isUnsubscribeEvent()
	{
		return EventType.unsubscribe.name().equalsIgnoreCase(event);
	}
	public boolean isScanEvent()
	{
		return EventType.scan.name().equalsIgnoreCase(event);
	}
	public boolean isLocationEvent()
	{
		return EventType.LOCATION.name().equalsIgnoreCase(event);
	}
}
