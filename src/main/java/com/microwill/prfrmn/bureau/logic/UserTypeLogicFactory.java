/**
 * 
 */
package com.microwill.prfrmn.bureau.logic;

import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;

import com.microwill.prfrmn.bureau.bo.UserType;

/**
 * @author Administrator
 *
 */
public class UserTypeLogicFactory {
	public static UserTypeLogic createUserTypeLogic(Map loginedUserContext,JdbcTemplate jdbcTemplate){
		UserTypeLogic userTypeLogic=null;
		String userTypeCode = (String) loginedUserContext.get("jb");
		UserType userType = UserType.fromCode(userTypeCode);
		if(UserType.ADMIN.equals(userType)){
			userTypeLogic=new AdminLogic();
		}else if(UserType.LEADER.equals(userType)){
			userTypeLogic=new LeaderLogic();
		}else if(UserType.STAFF.equals(userType)){
			userTypeLogic=new StaffLogic();
		}
		else if(UserType.ORGANIZATION.equals(userType)){
			userTypeLogic=new OrganizationLogic();
		}else if(UserType.BUREAULEADER.equals(userType)){
			userTypeLogic=new BureauLeader();
		}
		else{
			throw new IllegalArgumentException("User type can't match.");
		}
		userTypeLogic.setJdbcTemplate(jdbcTemplate);
		userTypeLogic.setUserType(userType);
		userTypeLogic.setLoginedUserContext(loginedUserContext);
		return userTypeLogic;
	}

}
