package org.nxstudio.core.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 字符编码过滤器
 *
 * @author XiongChun
 * @since 2010-01-13
 */
public class CharacterEncodingFilter implements Filter {
    protected String encoding;
    protected FilterConfig filterConfig;
    protected boolean enabled;

    public CharacterEncodingFilter() {
        encoding = null;
        filterConfig = null;
        enabled = true;
    }

    public void destroy() {
        encoding = null;
        filterConfig = null;
    }

    /**
     * 过滤器主体方法
     *
     * @param
     * @return void
     */
    public void doFilter(ServletRequest pRequest, ServletResponse pResponse, FilterChain chain) throws IOException,
            ServletException {
        HttpServletRequest request = (HttpServletRequest) pRequest;
        HttpServletResponse response = (HttpServletResponse) pResponse;
        if (enabled || request.getCharacterEncoding() == null) {
            String encoding = selectEncoding(request);
            if (encoding != null)
                request.setCharacterEncoding(encoding);
            response.setCharacterEncoding(encoding);
        }
        //解决get中文乱码问题
        MyRequest myrequest = new MyRequest(request);  //自己定义一个request
        chain.doFilter(myrequest, response);   //servlet
//        chain.doFilter(request, response);
    }

    /**
     * 过滤器初始化方法
     *
     * @param
     * @return void
     */
    public void init(FilterConfig filterConfig) throws ServletException {
        this.filterConfig = filterConfig;
        encoding = filterConfig.getInitParameter("encoding");
        String value = filterConfig.getInitParameter("enabled");
        if (value == null)
            enabled = true;
        else if (value.equalsIgnoreCase("true"))
            enabled = true;
        else if (value.equalsIgnoreCase("yes"))
            enabled = true;
        else
            enabled = false;
    }

    protected String selectEncoding(ServletRequest request) {
        return encoding;
    }
}