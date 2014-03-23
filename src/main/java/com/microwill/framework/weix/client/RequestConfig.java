package com.microwill.framework.weix.client;

import com.microwill.framework.weix.client.msg.BaseResp;
import com.microwill.framework.weix.client.msg.LoginResp;
import com.microwill.framework.weix.client.msg.menu.GetMenuResp;
import com.microwill.framework.weix.client.msg.usermng.CreateGroupResp;
import com.microwill.framework.weix.client.msg.usermng.GetGroupsResp;
import com.microwill.framework.weix.client.msg.usermng.UserInfoResp;
import com.microwill.framework.weix.client.util.HttpsClient.RequestMethod;

/**
 * 定义向微信请求不同服务的配置，
 * 包括URL地址、请求参数、请求方式、返回信息类。
 * 
 * 通过在一个地方统一管理这些信息，使得以后微信新增服务时，只需在此配置一下即可。
 * 
 * 
 * 
 * 
 *
 */
public class RequestConfig
{
	/**
	 * URL地址
	 * @author Administrator
	 *
	 */
	public static class URLS
	{
		public static final String BASE_URL = "https://api.weixin.qq.com/cgi-bin/";
	
		public static final String LOGON_URL = BASE_URL + "token?";
	
		public static final String MENU_URL = BASE_URL + "menu/";
		public static final String CREATE_MENU_URL = MENU_URL + "create?";
		public static final String DEL_MENU_URL = MENU_URL + "delete?";
		public static final String GET_MENU_URL = MENU_URL + "get?";
	
		public static final String GET_USER_INFO_URL = BASE_URL + "user/info?";
	
		public static final String SEND_TO_USER_URL = BASE_URL + "message/custom/send?";
		
		public static final String GET_GROUPS_URL = BASE_URL + "groups/get?";
		public static final String CREATE_GROUP_URL = BASE_URL + "groups/create?";
		public static final String UPDATE_GROUP_URL = BASE_URL + "groups/update?";
		public static final String UPDATE_USERGROUP_URL = BASE_URL + "groups/members/update?";
	}
	
	/**
	 * HTTP请求信息定义,包括名称、URL地址、请求方式，返回结果
	 */
	public static RequestConfig LOGIN = new RequestConfig("getAccessToken", URLS.LOGON_URL, RequestMethod.GET, LoginResp.class);
	
	public static RequestConfig CREATE_MENU = new RequestConfig("createMenu", URLS.CREATE_MENU_URL, RequestMethod.POST, BaseResp.class);
	public static RequestConfig DEL_MENU = new RequestConfig("delMenu", URLS.DEL_MENU_URL, RequestMethod.GET, BaseResp.class);
	public static RequestConfig GET_MENU = new RequestConfig("getMenu", URLS.GET_MENU_URL, RequestMethod.GET, GetMenuResp.class);
	
	public static RequestConfig SEND_TO_USER = new RequestConfig("sendToUser", URLS.SEND_TO_USER_URL, RequestMethod.POST, BaseResp.class);
	public static RequestConfig GET_USER_INFO = new RequestConfig("getUserInfo", URLS.GET_USER_INFO_URL, RequestMethod.GET, UserInfoResp.class);
	public static RequestConfig GET_GROUPS = new RequestConfig("getGroups", URLS.GET_GROUPS_URL, RequestMethod.GET, GetGroupsResp.class);
	public static RequestConfig CREATE_GROUP = new RequestConfig("createGroup", URLS.CREATE_GROUP_URL, RequestMethod.POST, CreateGroupResp.class);
	public static RequestConfig UPDATE_GROUP = new RequestConfig("updateGroup", URLS.UPDATE_GROUP_URL, RequestMethod.POST, BaseResp.class);
	public static RequestConfig UPDATE_USERGROUP = new RequestConfig("updateUserGroup", URLS.UPDATE_USERGROUP_URL, RequestMethod.POST, BaseResp.class);
	

	// 名称
	public String name;
	//请求地址
	public String url;
	//请求方式
	public RequestMethod requestMethod;
	//返回结果类
	public Class<?> respCls;
	public RequestConfig(String name, String url,
			RequestMethod requestMethod, Class<?> respCls)
	{
		this.name = name;
		this.url = url;
		this.requestMethod = requestMethod;
		this.respCls = respCls;
	}
	
	
}
