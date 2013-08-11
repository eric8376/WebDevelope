/**
 * 
 */
package com.microwill.prfrmn.bureau.logic;

import java.util.List;
import java.util.Map;

import com.microwill.framework.rpc.help.JSONExecuteHelp;

/**
 * @author Administrator
 *distinct
 */
public class OrganizationLogic extends UserTypeLogic {
	private static final String XMSql="select t2.dict_id,t2.dict_text from bureau.t_per_record t1,bureau.t_dict_table t2 where t1.xm_id=t2.dict_id and t1.user_name=? and t1.hosp_id=? group by t2.dict_id,t2.dict_text";
	private static final String ZBSql="select t2.dict_id,t2.dict_text from bureau.t_per_record t1,bureau.t_dict_table t2 where t1.zb_id=t2.dict_id and t1.user_name=? and t1.hosp_id=? group by t2.dict_id,t2.dict_text";
	private static final String HJSql="select t2.dict_id,t2.dict_text from bureau.t_per_record t1,bureau.t_dict_table t2 where t1.hj_id=t2.dict_id and t1.user_name=? and t1.hosp_id=? group by t2.dict_id,t2.dict_text";


	/* (non-Javadoc)
	 * @see com.microwill.performance.logic.UserTypeLogic#getXMList()
	 */
	@Override
	public String getXMList() throws Exception {
		String user_name=(String)getLoginedUserContext().get("user_name");
		String hosp_id=(String)getLoginedUserContext().get("hosp_id");
		List list=getQueryDataCmd().getJdbcTemplate().queryForList(XMSql,new Object[]{user_name,hosp_id});
		String jsonTxt=JSONExecuteHelp.parseJSONText(list);
		return jsonTxt;
	}

	@Override
	public String getScopeSql() {
		String user_name=(String)getLoginedUserContext().get("user_name");
		String hosp_id=(String)getLoginedUserContext().get("hosp_id");
		String scopeSql="and hosp_id ='"+hosp_id+"' and user_name='"+user_name+"'";
		return scopeSql;
	}

	@Override
	public String getZBList() throws Exception {
		String user_name=(String)getLoginedUserContext().get("user_name");
		String hosp_id=(String)getLoginedUserContext().get("hosp_id");
		List list=getQueryDataCmd().getJdbcTemplate().queryForList(ZBSql,new Object[]{user_name,hosp_id});
		String jsonTxt=JSONExecuteHelp.parseJSONText(list);
		return jsonTxt;
	}

	@Override
	public String getHJList() throws Exception {
		String user_name=(String)getLoginedUserContext().get("user_name");
		String hosp_id=(String)getLoginedUserContext().get("hosp_id");
		List list=getQueryDataCmd().getJdbcTemplate().queryForList(HJSql,new Object[]{user_name,hosp_id});
		String jsonTxt=JSONExecuteHelp.parseJSONText(list);
		return jsonTxt;
	}

}
