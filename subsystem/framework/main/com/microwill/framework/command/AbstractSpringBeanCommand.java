package com.microwill.framework.command;

import org.springframework.beans.factory.BeanNameAware;

public abstract class AbstractSpringBeanCommand implements CommandEx, BeanNameAware {

	private String name;

	public String getName() {
		return (this.name);
	}
	public void setBeanName(String name) {
		this.name = name;
	}

}
