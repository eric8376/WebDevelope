/**
 * 
 */
package com.microwill.framework.web.util;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsonorg.JsonOrgModule;

/**
 * @author Administrator
 *
 */
public class ResponseUtil {
	public static void outputJSON(HttpServletResponse response, String json)
			throws Exception {

		response.setContentType("application/json;charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.write(json);
		out.flush();
		out.close();
	}
	public static void  responseOutWithJson(HttpServletResponse response,  
	        Object responseObject) {  
	  
    	ObjectMapper mapper = new ObjectMapper();
		mapper.registerModule(new JsonOrgModule());
	    response.setCharacterEncoding("UTF-8");  
	    response.setContentType("application/json; charset=utf-8");
	    response.setBufferSize(8192);
	    PrintWriter out = null;  
	    try {  
	        out = response.getWriter();  
	        out.append(mapper.writeValueAsString(responseObject)); 
	    } catch (IOException e) {  
	        e.printStackTrace();  
	    } finally {  
	        if (out != null) {  
	            out.close();  
	        }  
	    }  
	} 
}
