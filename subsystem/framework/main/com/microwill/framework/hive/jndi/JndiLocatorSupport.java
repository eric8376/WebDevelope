package com.microwill.framework.hive.jndi;

import javax.naming.NamingException;
import javax.sql.DataSource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * 
 * @author zong.xiongxiong
 * 
 */
public abstract class JndiLocatorSupport {
	public static final String CONTAINER_PREFIX = "java:comp/env/";

	protected final Log logger = LogFactory.getLog(getClass());

	private JndiTemplate jndiTemplate = new JndiTemplate();

	/**
	 * Perform an actual JNDI lookup for the given name via the JndiTemplate. If
	 * the name doesn't begin with "java:comp/env/", this prefix is added if
	 * resourceRef is set to true.
	 * 
	 * @param jndiName
	 *            the JNDI name to look up
	 * @throws NamingException
	 *             if the JNDI lookup failed
	 * @see #setResourceRef
	 */
	protected DataSource lookup(String jndiName) throws NamingException {
		return lookup(jndiName, null);
	}

	/**
	 * Perform an actual JNDI lookup for the given name via the JndiTemplate. If
	 * the name doesn't begin with "java:comp/env/", this prefix is added if
	 * resourceRef is set to true.
	 * 
	 * @param jndiName
	 *            the JNDI name to look up
	 * @throws NamingException
	 *             if the JNDI lookup failed
	 * @see #setResourceRef
	 */
	protected DataSource lookup(String jndiName, Class requiredType)
			throws NamingException {
		String jndiNameToUse = convertJndiName(jndiName);
		DataSource jndiObject = (DataSource)getJndiTemplate().lookup(jndiNameToUse,
				requiredType);
		System.out.println("Located object with JNDI name [" + jndiNameToUse
				+ "]");
		return jndiObject;
	}

	/**
	 * Convert the given JNDI name to the actual JNDI name to use. Default
	 * implementation applies the "java:comp/env/" prefix if resourceRef is true
	 * and no other scheme like "java:" is given.
	 * 
	 * @param jndiName
	 *            the original JNDI name
	 * @return the JNDI name to use
	 * @see #CONTAINER_PREFIX
	 * @see #setResourceRef
	 */
	protected String convertJndiName(String jndiName) {
		// prepend container prefix if not already specified and no other scheme
		// given
		if (!jndiName.startsWith(CONTAINER_PREFIX)
				&& jndiName.indexOf(':') == -1) {
			jndiName = CONTAINER_PREFIX + jndiName;
		}
		return jndiName;
	}

	public JndiTemplate getJndiTemplate() {
		return jndiTemplate;
	}
}
