package com.microwill.framework.weix.svc.msg.event;

/**
 * 用户关注事件
 * 
 * 为方便处理，将原消息中的subscribe，scan，unsubscribe合为一并处理了。
 * 
 * 1. 用户在关注与取消关注公众号事，微信会把这个事件推送到开发者填写的URL。
 *    方便开发者给用户下发欢迎消息或者做帐号的解绑。 
 *    此种情况下，事件值为subscribe或unsubscribe，其余各项为空。
 * 
 * 2. 扫描二维码事件，其事件值为subscribe或scan
 * 
 * 用户扫描带场景值二维码时，可能推送以下两种事件： 
 * 	1.如果用户还未关注公众号，则用户可以关注公众号，关注后微信会将带场景值关注事件推送给开发者。
 * 	2.如果用户已经关注公众号，则微信会将带场景值扫描事件推送给开发者。
 * 
 * 如果未关注，则EVENT 为 subscribe
 * 如果已关注，则EVENT 为 scan
 *
 * 
 * 
 * 
 */
public class EventMsgUserAttention extends EventMsg
{
	// 事件KEY值，如果未关注，则表示为qrscene_为前缀，后面为二维码的参数值，已关注则直接为二维码参数值 
	private String EventKey;
	// 二维码的ticket，可用来换取二维码图片 
	private String Ticket;
	
	public String getEventKey()
	{
		return EventKey;
	}
	public void setEventKey(String eventKey)
	{
		EventKey = eventKey;
	}
	public String getTicket()
	{
		return Ticket;
	}
	public void setTicket(String ticket)
	{
		Ticket = ticket;
	}

}
