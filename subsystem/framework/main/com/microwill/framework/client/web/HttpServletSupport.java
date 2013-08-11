package com.microwill.framework.client.web;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

//import org.apache.hivemind.Registry;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

//import com.microwill.framework.hive.web.context.HiveContextLoader;


public class HttpServletSupport extends HttpServlet {

	private static final long serialVersionUID = -6898510869444156370L;

	private WebApplicationContext webApplicationContext;

	// private MessageSourceAccessor messageSourceAccessor;

//	private Registry registry;

	public static ServletContext thisSC;

	public void init(ServletConfig servletConfig) throws ServletException {
		super.init(servletConfig);
		if (servletConfig != null) {
			thisSC = servletConfig.getServletContext();
			this.webApplicationContext = initWebApplicationContext(servletConfig);
//			this.registry = initRegistry();
			onInit();
		} else {
			onDestroy();
		}
	}

	protected WebApplicationContext initWebApplicationContext(
			ServletConfig servletConfig) throws IllegalStateException {
		ServletContext sc = servletConfig.getServletContext();
		WebApplicationContext wac = WebApplicationContextUtils
				.getRequiredWebApplicationContext(sc);

		return wac;
	}

//	protected Registry initRegistry() {
//		Object reg = thisSC
//				.getAttribute(HiveContextLoader.ROOT_WEB_REGISTRY_ATTRIBUTE);
//		return reg == null ? null : (Registry) reg;
//		
//	}

	public final WebApplicationContext getWebApplicationContext() {
		return this.webApplicationContext;
	}

//	public final Registry getRegistry() {
//		return this.registry;
//	}

	protected void onInit() {
	}

	protected void onDestroy() {
		webApplicationContext = null;
//		registry = null;
		// messageSourceAccessor = null;
		thisSC = null;
	}
}
