package com.microwill.framework.annotation;

import com.microwill.framework.enums.SysLogTypeEnum;



public enum SysLogEnum {
    	//Service异常
  	ServiceException(0001,SysLogTypeEnum.Other.getLogType(),"服务层异常"),
	//com.chinaj.scf.controller.admin.BizstoreController 后台零售商相关
	HospitalLogin(1001,SysLogTypeEnum.WebAdmin.getLogType(),"医疗系统登录"),
	BureauLogin(1001,SysLogTypeEnum.WebAdmin.getLogType(),"卫生局系统登录"),
	BGMLogin(1001,SysLogTypeEnum.WebAdmin.getLogType(),"血糖仪系统登录");
	
	
	
	
	private SysLogEnum(Integer logType, Integer background, String event) {
		this.logType = logType;
		this.background = background;
		this.event = event;
	}
	
	
	/**
	 * 操作类型
	 */
	private final Integer logType;
	/**
	 * 是否后台操作
	 * <p>0-否；1-是</p>
	 */
	private final Integer background;
	/**
	 * 事件标题
	 */
	private final String event;
	
	
	public Integer getLogType() {
		return logType;
	}
	public Integer getBackground() {
		return background;
	}
	public String getEvent() {
		return event;
	}
}
