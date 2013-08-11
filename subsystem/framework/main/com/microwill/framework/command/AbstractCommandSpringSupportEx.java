package com.microwill.framework.command;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public abstract class AbstractCommandSpringSupportEx extends AbstractSpringBeanCommand
		implements
			ApplicationContextAware {

	private ApplicationContext applicationContext = null;

	public void setApplicationContext(ApplicationContext applicationContext)
			throws BeansException {
		this.applicationContext = applicationContext;
	}

	protected final ApplicationContext getApplicationContext() {
		return (this.applicationContext);
	}
}
