/**
 * 
 */
package com.microwill.prfrmn.bureau.logic;

import java.util.List;
import java.util.Map;

import com.microwill.framework.Persistence.ibatis.query.QueryDataCmd;
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
	private QueryDataCmd queryDataCmd;
	private UserTypeLogic userTypeLogic;
	public AuthorizeQueryStrategy(Map loginedUserContext,
			QueryDataCmd queryDataCmd) {
		this.loginedUserContext = loginedUserContext;
		this.queryDataCmd = queryDataCmd;
		userTypeLogic=UserTypeLogicFactory.createUserTypeLogic(loginedUserContext, queryDataCmd);
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

	public QueryDataCmd getQueryDataCmd() {
		return queryDataCmd;
	}

	public void setQueryDataCmd(QueryDataCmd queryDataCmd) {
		this.queryDataCmd = queryDataCmd;
	}

	public String query(String conditionSql, String pageSql) throws Exception {
		setConditionSql(conditionSql);
		setPageSql(pageSql);
		String sql = querySql +getHospSql() +getScopeSql() + getConditionSql();
		//construct paging sql
		int index = sql.indexOf("from");
		String countSql = "select count(1) "
				+ sql.substring(index, sql.length());
		int totalCount = queryDataCmd.getJdbcTemplate().queryForInt(countSql);
		int summaryNum= queryDataCmd.getJdbcTemplate().queryForInt(summarySql+getHospSql()+getScopeSql() + getConditionSql());
		List list = queryDataCmd.getJdbcTemplate().queryForList(
				sql + getPageSql());
		System.out.println(sql + getPageSql());
		String jsonTxt = "{'list':" + JSONExecuteHelp.parseJSONText(list)
				+ ",totalCount:" + totalCount + ",summaryNum:"+summaryNum+"}";
		return jsonTxt;
	}
	private String getHospSql() {
		String hosp_id=(String)getLoginedUserContext().get("hosp_id");
		
		return " and hosp_id='"+hosp_id+"' ";
	}

}
