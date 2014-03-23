/**
 * 
 */
package com.microwill.project.hospital.logic;

import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;

import com.microwill.project.hospital.bo.RoleType;
import com.microwill.project.hospital.bo.RoomType;

/**
 * @author Administrator
 *
 */
public class UserTypeLogicFactory {
	public static UserTypeLogic createUserTypeLogic(Map loginedUserContext,JdbcTemplate jdbcTemplate){
		UserTypeLogic userTypeLogic=null;
		String roleName = (String) loginedUserContext.get("role_name");
		RoleType roleType = RoleType.fromCode(roleName);
		if(RoleType.ADMIN.equals(roleType)){
			userTypeLogic=new AdminLogic();
		}else if(RoleType.KSMANAGER.equals(roleType)){
			userTypeLogic=new OperationLeaderLogic();
		}else if(RoleType.KSSTAFF.equals(roleType)){
			userTypeLogic=new OperationStaffLogic();
		}
		else if(RoleType.BMMANAGER.equals(roleType)||RoleType.BMSTAFF.equals(roleType)){
			userTypeLogic=new ManageDepartmentLogic();
		}else{
			throw new IllegalArgumentException("User type can't match.");
		}
		userTypeLogic.setJdbcTemplate(jdbcTemplate);
		userTypeLogic.setLoginedUserContext(loginedUserContext);
		userTypeLogic.setRoleType(roleType);
		return userTypeLogic;
	}

}
