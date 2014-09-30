package com.microwill.framework;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.commons.logging.LogFactory;

/**
 * 整个应用通用的常量 <br>
 * <b>类描述:</b>
 * 
 * @see
 * @since
 */
public class CommonConstant {
	// ///////////////有关操作日志记录/////////////////////////////////////
	public final static String UN_LOGIN_USER = "unLoginUser";
	public final static String EXTEND_SYS_LOG = "exSysLog";
	public final static String HTTP_REQUEST_PARAM = "httpRequestParam";
	public final static String HTTP_REQUEST_HEADER = "httpRequestHeader";
	public final static String HTTP_REQUEST_IP = "httpRequestIP";
	public final static String OPERATION_RESULT = "operationResult";
	public final static String OPERATION_RESULT_MESSAGE = "operationResultMessage";
	// ///////////////有关WEB控制器/////////////////////////////////////
	public static final String ASYN_RESULT_KEY = "result";
	public static final String ERROR_CODE_KEY = "errorCode";
	public static final String REALIP_IN_HEADER = "X-Real-IP";
	public static final String CHECK_SECURITY = "checkSecurity";
	public static final String SESSION_KEY_DEBUGMODE = "debugMode";
	// ///////////////有关文件上传/////////////////////////////////////
	public static String upload_file_dir = null;
	public static String upload_http_path = null;
	public static  String DEBUG_KEY=null;
	// ///////////////关于身份验证的常量//////////////
	public static final String V_CODE = "vcode";// 会话中验证码的对象名
	public static final String USER_CONTEXT = "TOKEN";// 会话中的User对象名
	public static final String LOGIN_TO_URL = "toUrl";// 将登录前的URL放到Session中的键名称
	public static final String LOGIN_ERROR_COUNT = "loginerrorcount"; // 登录错误session中的键名称
	// ///////////////////放在header的key/////////////////////////////
	public static final String HEADER_KEY_MOBILE_VERSION = "version";
	public static final String HEADER_KEY_MOBILE_HASHCODE = "hashcode";
    public static final String MOBILE_DATAGRAM="datagram";
    public static final String MOBILE_HEADER_VERSION="headerOfVersion";

	static {
		InputStream is = CommonConstant.class
				.getResourceAsStream("/config.properties");
		try {
			Properties props = new Properties();
			props.load(is);
			upload_file_dir = props.getProperty("upload_file_dir");
			upload_http_path = props.getProperty("upload_http_path");
			DEBUG_KEY = props.getProperty("debug_key");
		} catch (IOException e) {
			LogFactory.getLog(CommonConstant.class).error("读取配置文件出错！", e);
		} finally {
			try {
				is.close();
			} catch (Exception ex) {

			}
		}
	}
}
