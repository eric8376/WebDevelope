/**
 * 
 */
package com.microwill.project.hospital.logic;

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
	private String querySql = "select record_id,xm_id,hj_id,zb_id,ks_id,t1.user_name,check_time,result,dianping,kaohe,beizhu from t_per_record t1 where 1=1 ";
	private String summarySql="select sum(kaohe+0.00) from t_per_record t1 where 1=1 ";
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


	public String query(String conditionSql, String pageSql) throws Exception {
		setConditionSql(conditionSql);
		setPageSql(pageSql);
		String sql = querySql +getHospSql() +getScopeSql() + getConditionSql();
		//construct paging sql
		int index = sql.indexOf("from");
		String countSql = "select count(1) "
				+ sql.substring(index, sql.length());
		int totalCount = jdbcTemplate.queryForInt(countSql);
		Float summaryNum= jdbcTemplate.queryForObject(summarySql+getHospSql()+getScopeSql() + getConditionSql(),Float.class);
		List list = jdbcTemplate.queryForList(
				sql + getPageSql());
		System.out.println(sql + getPageSql());
		String returnSummaryNum=(summaryNum==null)?"0":summaryNum.toString();
		String jsonTxt = "{'list':" + JSONExecuteHelp.parseJSONText(list)
				+ ",totalCount:" + totalCount + ",summaryNum:"+returnSummaryNum+"}";
		return jsonTxt;
	}
	public String queryAnalysis(String condition,String keyIndex) throws Exception {
		String sql ="select "+keyIndex+" as keyindex,ROUND(sum(kaohe+0.00),1) as number "
				+ "from hospital.t_per_vrecord where 1=1 "
				+ ""+condition+""+getScopeSql()+"group by "+keyIndex+ " ";
		List list = jdbcTemplate.queryForList(
				sql);
		System.out.println(sql);
		String jsonTxt = "{'list':" + JSONExecuteHelp.parseJSONText(list)+
				"}";
		return jsonTxt;
	}
	private String getHospSql() {
		String hosp_id=(String)getLoginedUserContext().get("hosp_id");
		
		return " and hosp_id='"+hosp_id+"' ";
	}

}
