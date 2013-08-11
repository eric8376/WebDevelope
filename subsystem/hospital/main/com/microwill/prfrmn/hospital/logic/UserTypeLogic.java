/**
 * 
 */
package com.microwill.prfrmn.hospital.logic;

import java.util.Map;

import com.microwill.prfrmn.hospital.bo.RoomType;
import com.microwill.prfrmn.hospital.bo.UserType;
import com.microwill.framework.Persistence.ibatis.query.QueryDataCmd;

/**
 * @author Administrator
 *
 */
public  abstract class UserTypeLogic {
	private UserType userType;
	private RoomType roomType;
	private Map loginedUserContext;
	private QueryDataCmd queryDataCmd;
	
	public Map getLoginedUserContext() {
		return loginedUserContext;
	}

	public void setLoginedUserContext(Map loginedUserContext) {
		this.loginedUserContext = loginedUserContext;
	}

	public QueryDataCmd getQueryDataCmd() {
		return queryDataCmd;
	}

	public void setQueryDataCmd(QueryDataCmd queryDataCmd) {
		this.queryDataCmd = queryDataCmd;
	} 
	
	public UserType getUserType() {
		return userType;
	}

	public void setUserType(UserType userType) {
		this.userType = userType;
	}

	public RoomType getRoomType() {
		return roomType;
	}

	public void setRoomType(RoomType roomType) {
		this.roomType = roomType;
	}

	public  abstract String getKSList() throws Exception;
	public  abstract String getXMList() throws Exception;
	public  abstract String getScopeSql();

}
