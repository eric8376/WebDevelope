/**
 * 
 */
package com.microwill.prfrmn.hospital.logic;

import java.util.List;

import com.microwill.framework.rpc.help.JSONExecuteHelp;

/**
 * @author Administrator
 * 
 */
public class AdminLogic extends UserTypeLogic {

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.microwill.performance.logic.UserTypeLogic#getKSList()
	 */
	public String getKSList() throws Exception {
		String sql = "select dict_id,dict_text from hospital.t_dict_table where group_code='ks' and hosp_id=? ";
		List list = getJdbcTemplate().queryForList(sql,getLoginedUserContext().get("hosp_id"));
		String jsonTxt = JSONExecuteHelp.parseJSONText(list);
		return jsonTxt;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.microwill.performance.logic.UserTypeLogic#getXMList()
	 */
	public String getXMList() throws Exception {
		String sql = "select dict_id,dict_text from hospital.t_dict_table where group_code='xm' and hosp_id=? ";
		List list = getJdbcTemplate().queryForList(sql,getLoginedUserContext().get("hosp_id"));
		String jsonTxt = JSONExecuteHelp.parseJSONText(list);
		return jsonTxt;
	}

	@Override
	public String getScopeSql() {
		return "and 1=1 and hosp_id='"+getLoginedUserContext().get("hosp_id")+"'";
	}

}
