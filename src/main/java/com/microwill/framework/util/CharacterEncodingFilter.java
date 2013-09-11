package com.microwill.framework.util;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

public class CharacterEncodingFilter implements Filter {
	protected String encoding = null;
	protected FilterConfig filterConfig = null;

	public void init(FilterConfig filterConfig) throws ServletException {
		this.filterConfig = filterConfig;
		this.encoding = filterConfig.getInitParameter("encoding");
		if (this.encoding == null) {
			this.encoding = "UTF-8";
		}
	}	

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain filterChain) throws IOException, ServletException {
		if ((request.getCharacterEncoding() == null)) {
			if (encoding != null) {
				request.setCharacterEncoding(encoding);
			}
			filterChain.doFilter(request, response);
		}
	}

	public void destroy() {
		encoding = null;
		filterConfig = null;
	}

}