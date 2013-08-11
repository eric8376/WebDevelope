package com.microwill.framework.command;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

import com.microwill.framework.Persistence.AllInOneDaoSupport;

public abstract class DaoSupportCmd extends AllInOneDaoSupport
		implements
			ApplicationContextAware,
			CommandEx {

	private String name;

	private ApplicationContext applicationContext = null;

	public void setApplicationContext(ApplicationContext applicationContext)
			throws BeansException {
		this.applicationContext = applicationContext;
	}

	protected final ApplicationContext getApplicationContext() {
		return (this.applicationContext);
	}

	public void setName(String name) {
		this.name = name;
	}
	public String getName() {
		return (this.name);
	}

}
