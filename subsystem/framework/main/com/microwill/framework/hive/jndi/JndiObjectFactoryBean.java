
package com.microwill.framework.hive.jndi;

import javax.naming.NamingException;

import com.microwill.framework.hive.factory.FactoryBean;


/**
 * FactoryBean that looks up a JNDI object. Exposes the object found in JNDI
 * when used as bean reference, e.g. for JdbcTemplate's "dataSource" property
 * in case of a <code>javax.sql.DataSource</code>.
 *
 * <p>The typical usage will be to register this as singleton factory
 * (e.g. for a certain JNDI DataSource) in an application context,
 * and give bean references to application services that need it.
 *
 * <p>The default behavior is to look up the JNDI object on startup and
 * cache it. This can be customized through the "lookupOnStartup" and
 * "cache" properties, using a JndiObjectTargetSource underneath.
 * Note that you need to specify a "proxyInterface" in such a scenario,
 * because the actual JNDI object type is not known in advance.
 *
 * <p>Of course, service implementations can lookup e.g. a DataSource from
 * JNDI themselves, but this class enables central configuration of the
 * JNDI name, and easy switching to non-JNDI replacements. The latter can
 * be used for test setups, standalone clients, etc.
 *
 * <p>Note that switching to e.g. DriverManagerDataSource is just a matter
 * of configuration: replace the definition of this FactoryBean with a
 * DriverManagerDataSource definition!
 *
 * @author Juergen Hoeller
 * @since 22.05.2003
 * @see #setProxyInterface
 * @see #setLookupOnStartup
 * @see #setCache
 * @see JndiObjectTargetSource
 * @see javax.sql.DataSource
 * @see org.springframework.jdbc.core.JdbcTemplate#setDataSource
 * @see org.springframework.jdbc.datasource.DriverManagerDataSource
 */
public class JndiObjectFactoryBean extends JndiObjectLocator implements
		FactoryBean {
	/**
	 * Return the singleton JNDI object.
	 */
	public Object getObject() {
		try {
			return super.lookup();
		} catch (NamingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}

	public Class getObjectType() {
		return getExpectedType();
	}

	public boolean isSingleton() {
		return true;
	}

}
