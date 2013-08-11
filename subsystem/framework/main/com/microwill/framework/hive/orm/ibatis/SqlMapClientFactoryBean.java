/*
 * Copyright 2002-2005 the original author or authors.
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

package com.microwill.framework.hive.orm.ibatis;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Properties;
import javax.sql.DataSource;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.context.support.ServletContextResource;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.ibatis.sqlmap.client.SqlMapClientBuilder;
import com.ibatis.sqlmap.engine.impl.ExtendedSqlMapClient;
import com.ibatis.sqlmap.engine.transaction.TransactionConfig;
import com.ibatis.sqlmap.engine.transaction.TransactionManager;
import com.ibatis.sqlmap.engine.transaction.external.ExternalTransactionConfig;
import com.microwill.framework.client.web.HttpServletSupport;
import com.microwill.framework.hive.factory.FactoryBean;

/**
 * FactoryBean that creates an iBATIS Database Layer SqlMapClient as singleton
 * in the current bean factory, possibly for use with SqlMapClientTemplate.
 * 
 * <p>
 * Allows to specify a DataSource at the SqlMapClient level. This is preferable
 * to per-DAO DataSource references, as it allows for lazy loading and avoids
 * repeated DataSource references.
 * 
 * @author Juergen Hoeller
 * @since 24.02.2004
 * @see #setConfigLocation
 * @see #setDataSource
 * @see SqlMapClientTemplate#setSqlMapClient
 * @see SqlMapClientTemplate#setDataSource
 */
public class SqlMapClientFactoryBean implements FactoryBean {

	private Resource configLocation;

	private Properties sqlMapClientProperties;

	private DataSource dataSource;

	private Class transactionConfigClass = ExternalTransactionConfig.class;

	private Properties transactionConfigProperties;

	private SqlMapClient sqlMapClient;

	public SqlMapClientFactoryBean() {
		this.transactionConfigProperties = new Properties();
		this.transactionConfigProperties.setProperty("SetAutoCommitAllowed",
				"false");
	}

	/**
	 * Set the location of the iBATIS SqlMapClient config file. A typical value
	 * is "WEB-INF/sql-map-config.xml".
	 */
	public void setConfigLocation(String config) {
		if (config.startsWith("classpath:")) {
			this.configLocation = new ClassPathResource(config);
		} else if (config.startsWith("WEB-INF/")) {
			this.configLocation = new ServletContextResource(
					HttpServletSupport.thisSC, "/" + config);
		}
	}

	/**
	 * Set optional properties to be passed into the SqlMapClientBuilder, as
	 * alternative to a <code>&lt;properties&gt;</code> tag in the
	 * sql-map-config.xml file. Will be used to resolve placeholders in the
	 * config file.
	 * 
	 * @see #setConfigLocation
	 * @see com.ibatis.sqlmap.client.SqlMapClientBuilder#buildSqlMapClient(java.io.Reader,
	 *      java.util.Properties)
	 */
	public void setSqlMapClientProperties(Properties sqlMapClientProperties) {
		this.sqlMapClientProperties = sqlMapClientProperties;
	}

	/**
	 * Set the DataSource to be used by iBATIS SQL Maps. This will be passed to
	 * the SqlMapClient as part of a TransactionConfig instance.
	 * <p>
	 * If specified, this will override corresponding settings in the
	 * SqlMapClient properties. Usually, you will specify DataSource and
	 * transaction configuration <i>either</i> here <i>or</i> in SqlMapClient
	 * properties.
	 * <p>
	 * Specifying a DataSource for the SqlMapClient rather than for each
	 * individual DAO allows for lazy loading, for example when using
	 * PaginatedList results.
	 * <p>
	 * With a DataSource passed in here, you don't need to specify one for each
	 * DAO. Passing the SqlMapClient to the DAOs is enough, as it already
	 * carries a DataSource. Thus, it's recommended to specify the DataSource at
	 * this central location only.
	 * <p>
	 * Thanks to Brandon Goodin from the iBATIS team for the hint on how to make
	 * this work with Spring's integration strategy!
	 * 
	 * @throws Exception
	 * 
	 * @see #setTransactionConfigClass
	 * @see #setTransactionConfigProperties
	 * @see com.ibatis.sqlmap.client.SqlMapClient#getDataSource
	 * @see SqlMapClientTemplate#setDataSource
	 * @see SqlMapClientTemplate#queryForPaginatedList
	 */
	public void setDataSource(Object dataSource) throws Exception {
		if (dataSource instanceof DataSource)
			this.dataSource = (DataSource) dataSource;
		else if (dataSource instanceof FactoryBean)
			this.dataSource = (DataSource) ((FactoryBean) dataSource)
					.getObject();
	}

	public void afterPropertiesSet() throws Exception {
		if (this.configLocation == null) {
			throw new IllegalArgumentException("configLocation is required");
		}

		try {
			// Build the SqlMapClient.
			InputStream is = this.configLocation.getInputStream();
			this.sqlMapClient = (this.sqlMapClientProperties != null) ? SqlMapClientBuilder
					.buildSqlMapClient(new InputStreamReader(is),
							this.sqlMapClientProperties)
					: SqlMapClientBuilder
							.buildSqlMapClient(new InputStreamReader(is));
			// Tell the SqlMapClient to use the given DataSource, if any.
			if (this.dataSource != null) {
				TransactionConfig transactionConfig = (TransactionConfig) this.transactionConfigClass
						.newInstance();
				transactionConfig.setDataSource(this.dataSource);
				transactionConfig.initialize(this.transactionConfigProperties);
				applyTransactionConfig(this.sqlMapClient, transactionConfig);
			}
		}

		finally {
		}
	}

	/**
	 * Apply the given iBATIS TransactionConfig to the SqlMapClient.
	 * <p>
	 * Default implementation casts to ExtendedSqlMapClient, retrieves the
	 * maximum number of concurrent transactions from the
	 * SqlMapExecutorDelegate, and sets an iBATIS TransactionManager with the
	 * given TransactionConfig.
	 * 
	 * @param sqlMapClient
	 *            the SqlMapClient to apply the TransactionConfig to
	 * @param transactionConfig
	 *            the iBATIS TransactionConfig to apply
	 * @see com.ibatis.sqlmap.engine.impl.ExtendedSqlMapClient
	 * @see com.ibatis.sqlmap.engine.impl.SqlMapExecutorDelegate#getMaxTransactions
	 * @see com.ibatis.sqlmap.engine.impl.SqlMapExecutorDelegate#setTxManager
	 */
	protected void applyTransactionConfig(SqlMapClient sqlMapClient,
			TransactionConfig transactionConfig) {
		if (!(this.sqlMapClient instanceof ExtendedSqlMapClient)) {
			throw new IllegalArgumentException(
					"Cannot set TransactionConfig with DataSource for SqlMapClient if not of type "
							+ "ExtendedSqlMapClient: " + this.sqlMapClient);
		}
		ExtendedSqlMapClient extendedClient = (ExtendedSqlMapClient) this.sqlMapClient;
		transactionConfig.setMaximumConcurrentTransactions(extendedClient
				.getDelegate().getMaxTransactions());
		extendedClient.getDelegate().setTxManager(
				new TransactionManager(transactionConfig));
	}

	public Object getObject() {
		if (this.sqlMapClient == null) {
			try {
				afterPropertiesSet();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return this.sqlMapClient;
	}

	public Class getObjectType() {
		return (this.sqlMapClient != null ? this.sqlMapClient.getClass()
				: SqlMapClient.class);
	}

	public boolean isSingleton() {
		return true;
	}

}
