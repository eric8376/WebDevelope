/**
 * 
 */
package com.microwill.project.bureau.logic;

import java.util.List;

import com.microwill.framework.rpc.help.JSONExecuteHelp;

/**
 * @author Administrator
 *
 */
public class BureauLeader extends UserTypeLogic {

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.microwill.performance.logic.UserTypeLogic#getXMList()
	 */
	public String getXMList() throws Exception {
		String sql = "select dict_id,dict_text from bureau.t_dict_table where group_code='xm'";
		List list = getJdbcTemplate().queryForList(sql);
		String jsonTxt = JSONExecuteHelp.parseJSONText(list);
		return jsonTxt;
	}

	@Override
	public String getScopeSql() {
		return "and 1=1 ";
	}

	@Override
	public String getZBList() throws Exception {
		String sql = "select dict_id,dict_text from bureau.t_dict_table where group_code='zb' ";
		List list = getJdbcTemplate().queryForList(sql);
		String jsonTxt = JSONExecuteHelp.parseJSONText(list);
		return jsonTxt;
	}

	@Override
	public String getHJList() throws Exception {
		String sql = "select dict_id,dict_text from bureau.t_dict_table where group_code='hj' ";
		List list = getJdbcTemplate().queryForList(sql);
		String jsonTxt = JSONExecuteHelp.parseJSONText(list);
		return jsonTxt;
	}

}
