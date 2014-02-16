/**
 * 
 */
package com.microwill.prfrmn.bureau.logic;

import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;

import com.microwill.framework.rpc.help.JSONExecuteHelp;

/**
 * @author Administrator
 * 
 */
public  class AuthorizeQueryStrategy {
	private String conditionSql;
	private String pageSql;
	private String querySql = "select record_id,xm_id,hj_id,zb_id,t1.user_name,check_time,result,kaohe,dianping from bureau.t_per_record t1 where 1=1 ";
	private String summarySql="select sum(kaohe) from bureau.t_per_record t1 where 1=1 ";
	private Map loginedUserContext;
	private JdbcTemplate jdbcTemplate;
	private UserTypeLogic userTypeLogic;
	public AuthorizeQueryStrategy(Map loginedUserContext,
			JdbcTemplate jdbcTemplate) {
		this.loginedUserContext = loginedUserContext;
		this.jdbcTemplate = jdbcTemplate;
		userTypeLogic=UserTypeLogicFactory.createUserTypeLogic(loginedUserContext, jdbcTemplate);
	}
	public String getScopeSql() {
		
		return userTypeLogic.getScopeSql();
	}


	public String getConditionSql() {
		return conditionSql;
	}

	public void setConditionSql(String conditionSql) {
		this.conditionSql = conditionSql;
	}

	public String getPageSql() {
		return pageSql;
	}

	public void setPageSql(String pageSql) {
		this.pageSql = pageSql;
	}

	public Map getLoginedUserContext() {
		return loginedUserContext;
	}

	public void setLoginedUserContext(Map loginedUserContext) {
		this.loginedUserContext = loginedUserContext;
	}

	

	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}
	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	public String query(String conditionSql, String pageSql) throws Exception {
		setConditionSql(conditionSql);
		setPageSql(pageSql);
		String sql = querySql +getHospSql() +getScopeSql() + getConditionSql();
		//construct paging sql
		int index = sql.indexOf("from");
		String countSql = "select count(1) "
				+ sql.substring(index, sql.length());
		int totalCount = jdbcTemplate.queryForInt(countSql);
		int summaryNum= jdbcTemplate.queryForInt(summarySql+getHospSql()+getScopeSql() + getConditionSql());
		List list = jdbcTemplate.queryForList(
				sql + getPageSql());
		System.out.println(sql + getPageSql());
		String jsonTxt = "{'list':" + JSONExecuteHelp.parseJSONText(list)
				+ ",totalCount:" + totalCount + ",summaryNum:"+summaryNum+"}";
		return jsonTxt;
	}
	private String getHospSql() {
		if(getLoginedUserContext().get("jb").equals("4")){
			return "";
		}
		String hosp_id=(String)getLoginedUserContext().get("hosp_id");
		
		return " and hosp_id='"+hosp_id+"' ";
	}

}
