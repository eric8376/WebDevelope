package com.microwill.framework.syslog;

import java.util.Map;

import com.microwill.framework.enums.SysLogEnum;

public class Element {
	
	private final Map<String,Object> token;
	private final SysLogEnum sysLogType;
	private final Map<String, Object> detail;
	
	public Element(
			Map<String,Object>  token, 
			SysLogEnum sysLogType,
			Map<String, Object> detail
			) {
		super();
		this.token = token;
		this.sysLogType = sysLogType;
		this.detail = detail;
	}
	public Map<String,Object>  getToken() {
		return token;
	}
	public SysLogEnum getSysLogType() {
		return sysLogType;
	}
	public Map<String, Object> getDetail() {
		return detail;
	}
}
