/**
 * 
 */
package com.microwill.project.BGM.logic;

import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;

import com.microwill.project.BGM.bo.RoleType;


/**
 * @author Administrator
 *
 */
public class UserTypeLogicFactory {
	public static UserTypeLogic createUserTypeLogic(Map loginedUserContext,JdbcTemplate jdbcTemplate){
		UserTypeLogic userTypeLogic=null;
		String roleName = (String) loginedUserContext.get("role").toString();
		RoleType roleType = RoleType.fromCode(roleName);
		if(RoleType.ADMIN.equals(roleType)){
			userTypeLogic=new AdminLogic();
		}else if(RoleType.STAFF.equals(roleType)){
			userTypeLogic=new StaffLogic();
		}else{
			throw new IllegalArgumentException("User type can't match.");
		}
		userTypeLogic.setJdbcTemplate(jdbcTemplate);
		userTypeLogic.setLoginedUserContext(loginedUserContext);
		userTypeLogic.setRoleType(roleType);
		return userTypeLogic;
	}

}
