package com.microwill.framework.service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.LinkedBlockingDeque;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.microwill.framework.CommonConstant;
import com.microwill.framework.dao.TSysLogDao;
import com.microwill.framework.entity.TSyslog;
import com.microwill.framework.syslog.Element;
import com.microwill.framework.vo.Page;

/**
 * 系统日志
 * 
 * @author lizhen
 * 
 */
@Service
@Transactional(readOnly = true)
public class SysLogService {

	protected final static Log log = LogFactory.getLog(SysLogService.class);
	
	private TSysLogDao sysLogDao;

	@Autowired
	public void setSysLogDao(TSysLogDao sysLogDao) {
		this.sysLogDao = sysLogDao;
		
	}

    @Transactional(readOnly = false, propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    public void addLog(LinkedBlockingDeque<Element> syslogDeque)
	    throws Exception {
	if (syslogDeque.isEmpty()) {
	    return;
	}
	for (int i = 0; i < 100; i++) {
	    Element event = syslogDeque.poll();
	    if (event == null) {
		return;
	    }
	    Map<String, Object> detail = event.getDetail();
	    final String detailString;
	    if (detail == null || detail.isEmpty()) {
		detailString = null;
	    } else {
		try {
		    detailString = new ObjectMapper()
			    .writeValueAsString(detail);
		} catch (Exception e) {
		    log.warn("无法将系统日志的参数转换为Json！", e);
		    continue;
		}
	    }
	    TSyslog syslog = new TSyslog();
	    syslog.setLogtime(new Date());
	    syslog.setOperatorid("");
	    syslog.setOperator("未识别用户");
	    syslog.setRole(99);
	    if (event.getToken() != null) {
		syslog.setOperatorid((String)event.getToken().get("user_id"));
		syslog.setOperator((String)event.getToken().get("user_name"));
		//syslog.setRole(Integer.valueOf((int)event.getToken().get("role")));
	    } else if (detail.containsKey(CommonConstant.EXTEND_SYS_LOG)) {
		Map<String, String> exSysLogContext = (Map<String, String>) detail
			.get(CommonConstant.EXTEND_SYS_LOG);
		if (exSysLogContext!=null&&exSysLogContext.containsKey(CommonConstant.UN_LOGIN_USER)) {
		    String unLoginUserStr = exSysLogContext.get(CommonConstant.UN_LOGIN_USER);
		    String[] unLoginUserInfo=unLoginUserStr.split(",");
		    syslog.setOperatorid(unLoginUserInfo[0]);
		    syslog.setOperator(unLoginUserInfo[1]);
		    syslog.setRole(Integer.valueOf(unLoginUserInfo[2]));
		}
	    } 
	    syslog.setBackground(event.getSysLogType().getBackground());
	    syslog.setLogtype(event.getSysLogType().getLogType());
	    syslog.setEvent(event.getSysLogType().getEvent());
	    syslog.setDetail(detailString);
	    if (detail.get(CommonConstant.OPERATION_RESULT) != null) {
		boolean isSuccess = (boolean) detail.get(CommonConstant.OPERATION_RESULT);
		syslog.setState(0);
		if (isSuccess) {
		    syslog.setState(1);
		}
	    }
	    this.sysLogDao.addLog(syslog);
	}
    }
	
}
