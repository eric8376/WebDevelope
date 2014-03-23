package com.microwill.framework.weix.svc;

import java.util.ArrayList;
import java.util.List;

import com.microwill.framework.weix.svc.msg.user.BaseMsg;
import com.microwill.framework.weix.svc.msg.user.RespMsg;

/**
 * 使用ChainOfResponsibility模式来实现的微信服务，主要是为了简化应用服务中复杂的消息判断。
 * 当逐渐增加微信服务的功能时，每次都需要在原有的基础上进行修改，不利于模块化扩展。
 * 使用ChainOfResponsibility模块化的时候，会依次交给各个子模块处理，如果子模块有返回值， 则认为处理成功，直接返回，
 * 否则继续交给下一个模块处理。
 * 通过这样方式，新增模块只需要将新增的模块配置进去即可。
 * 
 * 其优点是利于模块划分。
 * 缺点是性能会比直接写判断差。
 * 
 * 
 * 
 * 
 */
public class CORAppService implements AppService
{
	private List<AppService> svcs = new ArrayList<AppService>();
	
	public void addSvc(AppService svc)
	{
		svcs.add(svc);
	}

	@Override
	public RespMsg onMsg(BaseMsg msg) throws Exception
	{
		for (AppService svc : svcs)
		{
			RespMsg result = svc.onMsg(msg);
			if(result != null)
			{
				return result;
			}
		}
		
		return null;
	}

}
