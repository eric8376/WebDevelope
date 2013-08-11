package com.microwill.framework.rpc;

import javax.servlet.http.HttpServletRequest;

import org.springframework.context.ApplicationContext;

import com.microwill.framework.command.impl.DefaultContextImpl;
import com.microwill.framework.context.ContextKey;
import com.microwill.framework.context.util.ContextUtils;


public final class CallContextImpl extends DefaultContextImpl {

	private static final long serialVersionUID = -5905986907118618442L;

	public final void setHttpServletRequest(HttpServletRequest request) {
		if (request != null) {
			ContextUtils.addToContext(this, ContextKey.WEB_REQUEST, request);
			ContextUtils.addToContext(this, ContextKey.WEB_SESSION, request
					.getSession());
		}
	}

	public final void setParams(Object obj[]) {
		ContextUtils.addToContext(this, ContextKey.COMMAND_PARAM, obj);
	}

	public final Object getResult() {
		return (ContextUtils.getObject(this, ContextKey.COMMAND_RESULT));
	}

	public final void setSpringContext(ApplicationContext applicationContext) {		
		ContextUtils.addToContext(this, ContextKey.SPRING_APPLICATION_CONTEXT,
				applicationContext);
	}

}
