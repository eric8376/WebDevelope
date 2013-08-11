/**
 * 
 */
package com.microwill.prfrmn.bureau.logic;

import java.util.Map;

import com.microwill.prfrmn.bureau.bo.RoomType;
import com.microwill.prfrmn.bureau.bo.UserType;
import com.microwill.framework.Persistence.ibatis.query.QueryDataCmd;

/**
 * @author Administrator
 *
 */
public class UserTypeLogicFactory {
	public static UserTypeLogic createUserTypeLogic(Map loginedUserContext,QueryDataCmd queryDataCmd){
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
		}else{
			throw new IllegalArgumentException("User type can't match.");
		}
		userTypeLogic.setQueryDataCmd(queryDataCmd);
		userTypeLogic.setUserType(userType);
		userTypeLogic.setLoginedUserContext(loginedUserContext);
		return userTypeLogic;
	}

}
