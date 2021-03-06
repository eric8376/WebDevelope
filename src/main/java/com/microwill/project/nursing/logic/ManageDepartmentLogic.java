/**
 * 
 */
package com.microwill.project.nursing.logic;

import java.util.List;
import java.util.Map;

import com.microwill.framework.rpc.help.JSONExecuteHelp;
import com.microwill.project.nursing.bo.RoleType;

/**
 * @author Administrator
 *distinct
 */
public class ManageDepartmentLogic extends UserTypeLogic {
	private static final String KSSql="select dict_id,dict_text from nursing.t_dict_table where group_code='ks' and hosp_id=? ";
	private static final String XMSql="select distinct k.dict_id,k.dict_text from t_per_xm  k " +
			"where k.creator_dep_id=? and k.hosp_id=? " ;
			
//	/* (non-Javadoc)
//	 * @see com.microwill.performance.logic.UserTypeLogic#getKSList()
//	 */
//	@Override
//	public String getKSList() throws Exception {
//		String hosp_id=(String)getLoginedUserContext().get("hosp_id");
//		List list=getJdbcTemplate().queryForList(KSSql,hosp_id);
//		String jsonTxt=JSONExecuteHelp.parseJSONText(list);
//		return jsonTxt;
//	}
//
//	/* (non-Javadoc)
//	 * @see com.microwill.performance.logic.UserTypeLogic#getXMList()
//	 */
//	@Override
//	public String getXMList() throws Exception {
//		String ks=(String)	getLoginedUserContext().get("ks");
//		String hosp_id=(String)getLoginedUserContext().get("hosp_id");
//		List list=getJdbcTemplate().queryForList(XMSql,new Object[]{ks,hosp_id});
//		String jsonTxt=JSONExecuteHelp.parseJSONText(list);
//		return jsonTxt;
//	}

	@Override
	public String getScopeSql() {
		
		 return "and 1=1 and hosp_id='"+getLoginedUserContext().get("hosp_id")+"'";
	}

	@Override
	protected void init(Map<String, Boolean> priviageMap) {
		super.init(priviageMap);
		if (getRoleType().equals(RoleType.BMMANAGER)) {
			
			priviageMap.put("/record/bm/query/", true);
			priviageMap.put("/user/query/", true);
			
		} else if (getRoleType().equals(RoleType.BMSTAFF)) {
			priviageMap.put("/record/bm/query/", true);
			
		}
	}
}
