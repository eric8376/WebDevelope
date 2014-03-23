package com.microwill.framework.weix.svc.msg.event;

/**
 * 自定义菜单事件, EVENT值为CLICK
 * 
 * 用户点击自定义菜单后，如果菜单按钮设置为click类型，则微信会把此次点击事件推送给开发者，
 * 注意view类型（跳转到URL）的菜单点击不会上报。 
 * 
 * 
 * 
 * 
 *
 */
public class EventMsgClick extends EventMsg
{
	//事件KEY值，与自定义菜单接口中KEY值对应 
	private String EventKey;

	public String getEventKey()
	{
		return EventKey;
	}

	public void setEventKey(String eventKey)
	{
		EventKey = eventKey;
	} 
	
}
