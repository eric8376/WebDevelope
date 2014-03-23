package com.microwill.framework.weix.svc.msg;

import com.microwill.framework.weix.svc.msg.event.EventMsgClick;
import com.microwill.framework.weix.svc.msg.event.EventMsgLocation;
import com.microwill.framework.weix.svc.msg.event.EventMsgUserAttention;
import com.microwill.framework.weix.svc.msg.user.ReqMsgImage;
import com.microwill.framework.weix.svc.msg.user.ReqMsgLink;
import com.microwill.framework.weix.svc.msg.user.ReqMsgLocation;
import com.microwill.framework.weix.svc.msg.user.ReqMsgText;
import com.microwill.framework.weix.svc.msg.user.ReqMsgVideo;
import com.microwill.framework.weix.svc.msg.user.ReqMsgVoice;

/**
 * 各种消息的类型定义。
 * 在此定义消息类型与其对应的JAVA BEAN的对应关系，
 * 使得系统增加新的消息时，只需要在此配置即可，无需更改解析逻辑。
 */
public class MsgType
{
	/**
	 * 用户请求消息类型与JAVA BEAN对应关系。
	 * 
	 * @author Administrator
	 *
	 */
	public static enum ReqType
	{
		text(ReqMsgText.class), 
		image(ReqMsgImage.class),
		link(ReqMsgLink.class),
		location(ReqMsgLocation.class),
		video(ReqMsgVideo.class),
		voice(ReqMsgVoice.class);	

		private Class<?> msgCls;
		
		private ReqType(Class<?> msgCls)
		{
			this.msgCls = msgCls;
		}

		public Class<?> getMsgCls()
		{
			return msgCls;
		}		
	}
	
	/**
	 * 事件消息类型与JAVA BEAN对应关系。
	 * 这里有大小写不不一致的情况，是因为微信消息本身定义的原因。
	 * 
	 * @author Administrator
	 *
	 */
	public static enum EventType
	{
		subscribe(EventMsgUserAttention.class),
		unsubscribe(EventMsgUserAttention.class),
		scan(EventMsgUserAttention.class),
		LOCATION(EventMsgLocation.class),
		CLICK(EventMsgClick.class);
		
		private Class<?> msgCls;
		
		private EventType(Class<?> msgCls)
		{
			this.msgCls = msgCls;
		}

		public Class<?> getMsgCls()
		{
			return msgCls;
		}			
	}
	
	/**
	 * 应答消息类型定义。
	 * 
	 * @author cailx
	 *
	 */
	public static enum RespType
	{
		image,music,news,text,video,voice
	}
}
