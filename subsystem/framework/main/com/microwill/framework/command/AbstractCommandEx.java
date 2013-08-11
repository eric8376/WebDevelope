package com.microwill.framework.command;
 

public abstract class AbstractCommandEx implements Command {

	private String name; 

	public void setName(String name) {
		this.name = name;
	}
	public String getName() {
		return (this.name);
	}
}
