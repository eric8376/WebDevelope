/*
 * @(#)com.microwill.pipeline.web.BaseMultiActionController.java
 * Date:  06-Sep-2010
 * Copyright 2010  中兴软创版权所有 违者必究 
 */

package com.microwill.framework.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

/**
 * @author <a href="mailto:javawen@gmail.com">文建国 </a>
 * @version 1.0 06-Sep-2010
 */
public class BaseMultiActionController extends MultiActionController {

	private ResourceBundleMessageSource messageSource;

	protected Log log = (Log) LogFactory.getLog(this.getClass());

	protected static final String ACT_TYPE_ADD = "add";
	protected static final String ACT_TYPE_DELETE = "delete";
	protected static final String ACT_TYPE_UPDATE = "update";
	protected static final String ACT_TYPE = "actType";

	public BaseMultiActionController() {

	}

	public void setMessageSource(ResourceBundleMessageSource messageSource) {
		this.messageSource = messageSource;
	}

	/**
	 * Method to flush a String as response.
	 * 
	 * @param response
	 * @param responseContent
	 * @throws IOException
	 */
	protected void flushResponse(HttpServletResponse response,
			String responseContent) throws IOException {
		// response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html; charset=utf-8");
		PrintWriter writer = response.getWriter();
		// response.setContentLength(responseContent.length());
		writer.write(responseContent);
		writer.flush();
		writer.close();
	}


	/**
	 * 输出XML文档
	 * 
	 * @param response
	 *            `
	 * @param xml
	 * @throws Exception
	 */
	public void outputXML(HttpServletResponse response, String xml)
			throws Exception {

		response.setContentType("text/xml; charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.write(xml);
		out.flush();
		out.close();
	}

	public void outputJSON(HttpServletResponse response, String json)
			throws Exception {

		response.setContentType("application/json;charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.write(json);
		out.flush();
		out.close();
	}
}