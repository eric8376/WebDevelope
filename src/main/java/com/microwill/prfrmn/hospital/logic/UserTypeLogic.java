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
public  abstract class UserTypeLogic {
	private UserType userType;
	private RoomType roomType;
	private Map loginedUserContext;
	private JdbcTemplate jdbcTemplate;
	
	public Map getLoginedUserContext() {
		return loginedUserContext;
	}

	public void setLoginedUserContext(Map loginedUserContext) {
		this.loginedUserContext = loginedUserContext;
	}


	
	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
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
