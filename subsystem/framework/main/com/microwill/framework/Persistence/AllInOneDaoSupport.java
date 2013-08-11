/*
 * AllInOneDaoSupport = HibernateDaoSupport + SqlMapClientDaoSupport + JdbcSupport (MikeWang)
 */

package com.microwill.framework.Persistence;

import java.sql.Connection;

import javax.sql.DataSource;

import org.springframework.dao.support.DaoSupport;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.jdbc.support.SQLExceptionTranslator;
import org.springframework.orm.ibatis.SqlMapClientTemplate;

import com.ibatis.sqlmap.client.SqlMapClient;

public abstract class AllInOneDaoSupport extends DaoSupport {


	private SqlMapClientTemplate sqlMapClientTemplate = new SqlMapClientTemplate();
	private boolean externalTemplate = false;
	private JdbcTemplate jdbcTemplate;
	private DataSource dataSource;



	// ---------------------------------------------------

	public final void setSqlMapClient(SqlMapClient sqlMapClient) {
		this.sqlMapClientTemplate.setSqlMapClient(sqlMapClient);
	}

	public final SqlMapClient getSqlMapClient() {
		return this.sqlMapClientTemplate.getSqlMapClient();
	}

	public final void setSqlMapClientTemplate(
			SqlMapClientTemplate sqlMapClientTemplate) {
		if (sqlMapClientTemplate == null) {
			throw new IllegalArgumentException(
					"Cannot set sqlMapClientTemplate to null");
		}
		this.sqlMapClientTemplate = sqlMapClientTemplate;
		this.dataSource = sqlMapClientTemplate.getDataSource();
		this.jdbcTemplate = createJdbcTemplate(this.dataSource);
		this.externalTemplate = true;
	}

	public final SqlMapClientTemplate getSqlMapClientTemplate() {
		return sqlMapClientTemplate;
	}

	// ---------------------------------------------------

	protected JdbcTemplate createJdbcTemplate(DataSource dataSource) {
		return new JdbcTemplate(dataSource);
	}

	public final DataSource getDataSource() {
		return (this.dataSource);
	}

	public final void setDataSource(DataSource dataSource) {
		this.jdbcTemplate = createJdbcTemplate(dataSource);
		this.sqlMapClientTemplate.setDataSource(dataSource);
		this.dataSource = dataSource;
	}

	public final void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	public final JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	protected final Connection getConnection()
			throws CannotGetJdbcConnectionException {
		return DataSourceUtils.getConnection(getDataSource());
	}

	protected final SQLExceptionTranslator getExceptionTranslator() {
		return this.jdbcTemplate.getExceptionTranslator();
	}

	protected final void releaseConnection(Connection con) {
		DataSourceUtils.releaseConnection(con, getDataSource());
	}

	// ---------------------------------------------------

	protected final void checkDaoConfig() {
		if (!this.externalTemplate) {
			this.sqlMapClientTemplate.afterPropertiesSet();
		}
	}

	protected void initDao() throws Exception {
		super.initDao();
		if (this.jdbcTemplate == null) {
			if (this.dataSource == null) {
				this.dataSource = this.sqlMapClientTemplate.getDataSource();
			}
			this.jdbcTemplate = createJdbcTemplate(this.dataSource);
		}
	}
}
