package com.microwill.prfrmn.hospital.logic;

import java.util.List;

import com.microwill.framework.rpc.help.JSONExecuteHelp;

public class OperationLeaderLogic extends UserTypeLogic{

	@Override
	public String getKSList() throws Exception {
		String sql="select dict_id,dict_text from hospital.t_dict_table where dict_id=? and hosp_id=? ";
		String ks_id=(String)getLoginedUserContext().get("ks");
		List list=getQueryDataCmd().getJdbcTemplate().queryForList(sql,new Object[]{ks_id,getLoginedUserContext().get("hosp_id")});
		String jsonTxt=JSONExecuteHelp.parseJSONText(list);
		return jsonTxt;
	}

	@Override
	public String getXMList() throws Exception {
		String sql="select t.dict_id,t.dict_text from hospital.t_dict_table t,t_per_xm_ks xk where t.dict_id=xk.xm_id and xk.ks_id=? and t.hosp_id=?";
		String ks_id=(String)getLoginedUserContext().get("ks");
		List list=getQueryDataCmd().getJdbcTemplate().queryForList(sql,new Object[]{ks_id,getLoginedUserContext().get("hosp_id")});
		String jsonTxt=JSONExecuteHelp.parseJSONText(list);
		return jsonTxt;
	}

	@Override
	public String getScopeSql() {
		String ks_id=(String)getLoginedUserContext().get("ks");
		return "and ks_id='"+ks_id+"' ";
	}

}
