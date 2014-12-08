/**
 * 
 */
package com.microwill.project.hospital.logic;

import java.util.HashMap;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;

import com.microwill.framework.vo.TreeItem;
import com.microwill.project.hospital.bo.RoleType;

/**
 * @author Administrator
 *
 */
public  abstract class UserTypeLogic {
	
	private Map loginedUserContext;
	private JdbcTemplate jdbcTemplate;
	private RoleType roleType;
	private Map<String,Boolean> priviageMap=new HashMap<String, Boolean>();
	public Map getLoginedUserContext() {
		return loginedUserContext;
	}

	public void setLoginedUserContext(Map loginedUserContext) {
		this.loginedUserContext = loginedUserContext;
	}


	
	public Map<String, Boolean> getPriviageMap() {
		init(priviageMap);
		return priviageMap;
	}

	protected void init(Map<String, Boolean> priviageMap) {
		//menu
		priviageMap.put("/record/add/", false);
		priviageMap.put("/record/search/", false);
		priviageMap.put("/record/query/", false);
		priviageMap.put("/record/analysis/", false);
		priviageMap.put("/record/analysis2/", true);
		priviageMap.put("/user/query/", false);
		priviageMap.put("/ks/query/", false);
		priviageMap.put("/bm/query/", false);
		priviageMap.put("/project/query/", false);
		priviageMap.put("/hj/query/", false);
		priviageMap.put("/zb/query/", false);
		//button
		//link
		
	}

	public TreeItem getMenuTree() {
		TreeItem root=TreeItem.getRootItem();
		
		return root;
	}
	protected void setPriviageMap(Map<String, Boolean> priviageMap) {
		this.priviageMap = priviageMap;
	}

	public RoleType getRoleType() {
		return roleType;
	}

	public void setRoleType(RoleType roleType) {
		this.roleType = roleType;
	}

	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	

	public  abstract String getKSList() throws Exception;
	public  abstract String getXMList() throws Exception;
	public  abstract String getScopeSql();

}
