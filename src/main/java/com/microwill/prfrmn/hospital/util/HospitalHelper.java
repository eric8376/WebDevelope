/**
 * 
 */
package com.microwill.prfrmn.hospital.util;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

/**
 * @author Administrator
 *
 */
public class HospitalHelper {
	public static String getHospIdFromSession(HttpServletRequest request){
		Map loginedUserContext = (Map) request.getSession().getAttribute(
				"loginedUser");
		return(String)loginedUserContext.get("hosp_id");
	}
}
