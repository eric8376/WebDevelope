/*
 * Copyright 2002-2006 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.microwill.framework.hive.jndi;

import javax.naming.NamingException;

/**
 * Convenient superclass for JNDI-based service locators. Subclasses are
 * JavaBeans, exposing a "jndiName" property. This may or may not include the
 * "java:comp/env/" prefix expected by J2EE applications when accessing a
 * locally mapped (ENC - Environmental Naming Context) resource. If it doesn't,
 * the "java:comp/env/" prefix will be prepended if the "resourceRef" property
 * is true (the default is <strong>false</strong>) and no other scheme like
 * "java:" is given.
 * 
 * <p>
 * Subclasses can invoke the lookup method whenever it is appropriate. Some
 * classes might do this on initialization, while others might do it on demand.
 * The latter strategy is more flexible in that it allows for initialization of
 * the locator before the JNDI object is available.
 * 
 * @author Juergen Hoeller
 * @see #setJndiName
 * @see #setJndiTemplate
 * @see #setJndiEnvironment
 * @see #setResourceRef
 * @see #lookup()
 */
public abstract class JndiObjectLocator extends JndiLocatorSupport {

	private String jndiName;

	private Class expectedType;

	/**
	 * Set the JNDI name to look up. If it doesn't begin with "java:comp/env/"
	 * this prefix is added if resourceRef is set to true.
	 * 
	 * @param jndiName
	 *            JNDI name to look up
	 * @see #setResourceRef
	 */
	public void setJndiName(String jndiName) {
		this.jndiName = jndiName;
	}

	/**
	 * Return the JNDI name to look up.
	 */
	public String getJndiName() {
		return jndiName;
	}

	/**
	 * Set the type that the located JNDI object is supposed to be assignable
	 * to, if any.
	 */
	public void setExpectedType(Class expectedType) {
		this.expectedType = expectedType;
	}

	/**
	 * Return the type that the located JNDI object is supposed to be assignable
	 * to, if any.
	 */
	public Class getExpectedType() {
		return expectedType;
	}

	public void afterPropertiesSet() throws IllegalArgumentException,
			NamingException {
		if (getJndiName() == null || getJndiName().trim().length() == 0) {
			throw new IllegalArgumentException("jndiName is required");
		}
	}

	/**
	 * Perform the actual JNDI lookup via the JndiTemplate. Invokes the
	 * <code>located</code> method after successful lookup.
	 * 
	 * @throws NamingException
	 *             if the JNDI lookup failed or if the located JNDI object is
	 *             not assigable to the expected type
	 * @see #setJndiName
	 * @see #setExpectedType
	 */
	protected Object lookup() throws NamingException {
		return lookup(getJndiName(), getExpectedType());
	}

}
