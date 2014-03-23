package com.microwill.framework.weix.svc;

import com.microwill.framework.weix.svc.msg.user.BaseMsg;
import com.microwill.framework.weix.svc.msg.user.RespMsg;

/**
 * 应用服务接口。
 * 应用程序通过实现此接口，处理微信客户请求及微信的系统事件。
 * 
 * 
 * 
 * 
 *
 */
public interface AppService
{
	/**
	 * 微信的请求到达时，此方法将被调用。
	 * 
	 * 微信过来的请求分为两类。
	 * 一类为用户请求，一般需要应答。
	 * 一类为事件请求，无需应答。
	 * 
	 * @param msg 请求消息
	 * @return 应答消息, 可为空。
	 * 
	 * @throws Exception
	 */
	RespMsg onMsg(BaseMsg msg) throws Exception;
}
