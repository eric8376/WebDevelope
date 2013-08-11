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

	public  abstract String getZBList() throws Exception;
	public  abstract String getXMList() throws Exception;
	public  abstract String getHJList() throws Exception;
	public  abstract String getScopeSql();

}
