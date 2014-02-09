package com.microwill.framework;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Properties;

public class ErrorHelper extends Properties {
	private static final long serialVersionUID = 1L;
	private static final Properties errors = new Properties();

	/**
	 * @return  获取系统默认错误消息
	 */
	  public static String debugException(Exception e) {  
	        try {  
	            StringWriter sw = new StringWriter();  
	            PrintWriter pw = new PrintWriter(sw);  
	            e.printStackTrace(pw);  
	            return "\r\n" + sw.toString() + "\r\n";  
	        } catch (Exception e2) {  
	            return "bad getErrorInfoFromException";  
	        }  
	    }  
	
}
