/**
 * @(#) TSysLog.java 2013年7月14日
 * Copyright (c) 厦门极网商业互联技术有限公司
 */
package com.microwill.framework.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.microwill.framework.entity.TSyslog;



/**
 * 系统日志Dao
 * 
 * <pre>
 * @date 2013年7月14日
 * @author zcguo
 * @功能说明:
 * ...................
 * @版本更新列表
 * 修改版本: 1.0.0
 * 修改日期: 2013年7月14日
 * 修  改  人: zcguo
 * 修改说明: 形成初始版本
 * 复  审  人:
 * </pre>
 */
@Repository
public class TSysLogDao {
	@Autowired
	private SessionFactory sessionFactory;
	/*
	 * 添加日志
	 */
	public void addLog(TSyslog syslog) {
		Session session=sessionFactory.openSession();
		session.saveOrUpdate(syslog);
	}


	
}
