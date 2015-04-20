package org.nxstudio.core.interceptor;


import org.nxstudio.util.spring.SpringDispatcherContextHolder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * spring mvc请求拦截器
 */
public class HandlerDispatcherContextInterceptor extends
        AbstractHandlerPreparInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response, Object handler) {
        SpringDispatcherContextHolder.initDispatcherContext(response);
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request,
                                HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
        SpringDispatcherContextHolder.resetDispatcherContext();
    }
}
