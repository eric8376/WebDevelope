/**
 * 
 */
package com.microwill.framework.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.DispatcherServlet;

/**
 * @author Administrator
 *
 */
public class AppServlet extends DispatcherServlet {
	@Override
	protected void doService(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		super.doService(request, response);
	}

}
