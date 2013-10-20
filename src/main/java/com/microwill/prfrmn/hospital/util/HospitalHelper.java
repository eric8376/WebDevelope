/**
 * 
 */
package com.microwill.prfrmn.hospital.util;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.microwill.framework.web.util.LoginHelper;

/**
 * @author Administrator
 *
 */
public class HospitalHelper {
	public static String getHospIdFromSession(HttpServletRequest request){
		return(String)LoginHelper.getToken(request).get("hosp_id");
	}
}
