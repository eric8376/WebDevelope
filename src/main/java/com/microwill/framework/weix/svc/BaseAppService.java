package com.microwill.framework.weix.svc;

import com.microwill.framework.weix.svc.msg.event.EventMsg;
import com.microwill.framework.weix.svc.msg.user.BaseMsg;
import com.microwill.framework.weix.svc.msg.user.ReqMsg;
import com.microwill.framework.weix.svc.msg.user.RespMsg;

/**
 * AppService的抽象实现，将消息处理中的用户消息与事件消息区分开来，方便应用程序处理。
 * 
 * 注：以前以为事件消息不能返回，与普通消息区别较大，故创建此类，实际上事件消息同样可以返回，无需特殊处理。
 * 
 * 
 * 
 * 
 * 
 */
public abstract class BaseAppService implements AppService {
    /**
     * 用户请求消息到来时，此方法被调用。
     * 
     * @param req
     * @return
     * @throws Exception
     */
    public abstract RespMsg onUserReq(ReqMsg req) throws Exception;

    /**
     * 事件消息到来时，此方法被调用。事件包括点击菜单，用户加入，上报用户地理位置等
     * 
     * @param event
     * @throws Exception
     */
    public abstract RespMsg onEvent(EventMsg event) throws Exception;

    @Override
    public RespMsg onMsg(BaseMsg msg) throws Exception {
	if (msg.isEventMsg()) {
	    return onEvent((EventMsg) msg);
	} else {
	    return onUserReq((ReqMsg) msg);
	}
    }

}
