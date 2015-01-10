/**
 * 
 */
package com.microwill.project.BGM.logic;

import java.util.HashMap;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;

import com.microwill.framework.vo.TreeItem;
import com.microwill.project.BGM.bo.RoleType;


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
		priviageMap.put("/patient/add/", false);
		priviageMap.put("/user/add/", false);
		priviageMap.put("/result/query/", false);
		priviageMap.put("/plan/query/", false);
		priviageMap.put("/dict/query/", false);

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
