package com.microwill.framework.context;

import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

public class ContextKey {
	private String value; 

	public static final ContextKey COMMAND_RESULT = new ContextKey(
			"composite-command.result");

	public static final ContextKey COMMAND_PARAM = new ContextKey(
			"composite-command.PARAM");

	public static final ContextKey WEB_REQUEST = new ContextKey(
			"composite-command.web.request");

	public static final ContextKey WEB_SESSION = new ContextKey(
			"composite-command.web.session");

	public static final ContextKey SPRING_APPLICATION_CONTEXT = new ContextKey(
			"composite-command.spring.appliction_context");

	private ContextKey(String value) {
		this.value = value;
	}
	public String toString() {
		return (this.value);
	}
	public boolean equals(final Object other) {
		if (!(other instanceof ContextKey))
			return false;
		ContextKey castOther = (ContextKey) other;
		return new EqualsBuilder().append(value, castOther.value).isEquals();
	}
	public int hashCode() {
		return new HashCodeBuilder().append(value).toHashCode();
	}
}
