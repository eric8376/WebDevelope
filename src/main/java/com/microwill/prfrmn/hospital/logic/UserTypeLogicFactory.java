/**
 * 
 */
package com.microwill.prfrmn.hospital.logic;

import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;

import com.microwill.prfrmn.hospital.bo.RoomType;
import com.microwill.prfrmn.hospital.bo.UserType;

/**
 * @author Administrator
 *
 */
public class UserTypeLogicFactory {
	public static UserTypeLogic createUserTypeLogic(Map loginedUserContext,JdbcTemplate jdbcTemplate){
		UserTypeLogic userTypeLogic=null;
		String userTypeCode = (String) loginedUserContext.get("jb");
		UserType userType = UserType.fromCode(userTypeCode);
		String roomTypeCode = (String) loginedUserContext.get("bm");
		RoomType roomType = (roomTypeCode==null)?null:RoomType.fromCode(roomTypeCode);
		if(UserType.ADMIN.equals(userType)){
			userTypeLogic=new AdminLogic();
		}else if(UserType.MANEGER.equals(userType)&&RoomType.OPERATE.equals(roomType)){
			userTypeLogic=new OperationLeaderLogic();
		}else if(UserType.STAFF.equals(userType)&&RoomType.OPERATE.equals(roomType)){
			userTypeLogic=new OperationStaffLogic();
		}
		else if((UserType.STAFF.equals(userType)||UserType.MANEGER.equals(userType))&&RoomType.MANAGE.equals(roomType)){
			userTypeLogic=new ManageDepartmentLogic();
		}else{
			throw new IllegalArgumentException("User type can't match.");
		}
		userTypeLogic.setJdbcTemplate(jdbcTemplate);
		userTypeLogic.setRoomType(roomType);
		userTypeLogic.setUserType(userType);
		userTypeLogic.setLoginedUserContext(loginedUserContext);
		return userTypeLogic;
	}

}
