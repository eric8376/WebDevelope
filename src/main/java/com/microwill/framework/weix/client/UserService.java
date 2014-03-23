package com.microwill.framework.weix.client;

import com.microwill.framework.weix.client.msg.BaseResp;
import com.microwill.framework.weix.client.msg.usersvc.UserMsg;

/**
 * 用户服务接口。
 * 
 * 
 * 
 * 
 *
 */
public interface UserService
{	
	/**
	 * 向用户发送消息。
	 * 
	 * 当用户主动发消息给公众号的时候（包括发送信息、点击自定义菜单clike事件、订阅事件、扫描二维码事件、支付成功事件、用户维权），
	 * 微信将会把消息数据推送给开发者，开发者在一段时间内（目前为24小时）可以调用客服消息接口，
	 * 通过POST一个JSON数据包来发送消息给普通用户，在24小时内不限制发送次数。
	 * 此接口主要用于客服等有人工消息处理环节的功能，方便开发者为用户提供更加优质的服务。
	 * 
	 * @param msg 要发送的用户消息，包括文本、多媒体等
	 * @return 
	 */
	BaseResp sendToUser(UserMsg msg);

}
