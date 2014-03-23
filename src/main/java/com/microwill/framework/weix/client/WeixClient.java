package com.microwill.framework.weix.client;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.microwill.framework.weix.client.msg.BaseResp;
import com.microwill.framework.weix.client.msg.LoginResp;
import com.microwill.framework.weix.client.msg.WeixClientId;
import com.microwill.framework.weix.client.msg.menu.GetMenuResp;
import com.microwill.framework.weix.client.msg.menu.Menu;
import com.microwill.framework.weix.client.msg.usermng.CreateGroupReq;
import com.microwill.framework.weix.client.msg.usermng.CreateGroupResp;
import com.microwill.framework.weix.client.msg.usermng.GroupBasic;
import com.microwill.framework.weix.client.msg.usermng.GroupMin;
import com.microwill.framework.weix.client.msg.usermng.UpdateGroupReq;
import com.microwill.framework.weix.client.msg.usermng.UpdateUserGroupReq;
import com.microwill.framework.weix.client.msg.usermng.UserInfoResp;
import com.microwill.framework.weix.client.msg.usermng.GetGroupsResp;
import com.microwill.framework.weix.client.msg.usersvc.UserMsg;
import com.microwill.framework.weix.client.util.HttpParamUtil;
import com.microwill.framework.weix.client.util.HttpsClient;
import com.microwill.framework.weix.client.util.JsonUtil;

/**
 * 微信客户端，封装跟微信服务器的交互。
 * 
 * 一个WeixClient代表一个公共账号,支持多线程并发调用。
 * 
 * 
 * 
 * 
 *
 */
public class WeixClient implements MenuManager, UserService, UserManager
{
	private static Logger logger = LoggerFactory.getLogger(WeixClient.class);
	
	/**
	 * 负责自动登录
	 * 
	 * 
	 *
	 */
	public class ReloginHelper
	{
		//登录失败重新尝试的时间。定为5秒
		private static final long RETRY_INTERVL = 5000;
		//微信TOKEN超时的折扣设置，考虑到时间不同步等问题，设置为300秒,即5分钟。
		private static final int EXPIRE_DISCOUNT = 300;
		
		private ScheduledExecutorService reloginSchedu;
		
		private LoginResp ensureLogin()
		{
			LoginResp result = null;
			boolean loginSuccess = false;
			int retryTimes = 0;
			
			while(!loginSuccess)
			{
				try
				{
					result = login();
					loginSuccess = result.success();
				}
				catch (Exception e) 
				{
					logger.warn("error while login to get access token, retry times {} ", retryTimes, e);
				}
				
				if(!loginSuccess)
				{
					++retryTimes;
					try
					{
						Thread.sleep(RETRY_INTERVL * retryTimes);
					}
					catch (InterruptedException e)
					{
						//ignore
					}			
				}
			}

			
			return result;
		}
		
		public boolean start()
		{
			LoginResp result = login();
			
			if(result.success())
			{
				if(reloginSchedu == null)
				{
					reloginSchedu = Executors.newScheduledThreadPool(1);
				}
				
				long period = result.expires_in - EXPIRE_DISCOUNT;
				
				reloginSchedu.scheduleAtFixedRate(new Runnable()
				{
					
					@Override
					public void run()
					{
						ensureLogin();
					}
				}, period, period, TimeUnit.SECONDS);
			}
			
			return result.success();
		}
		
		public void stop()
		{
			if(reloginSchedu != null)
			{
				reloginSchedu.shutdownNow();
			}
		}

	}
	
	// 微信接入信息
	private WeixClientId cid;
	// 微信TOKEN
	private AccessTokenParam accessToken;
	//自动登录工具
	private ReloginHelper reloginHelper = new ReloginHelper();

	public synchronized AccessTokenParam getAccessToken()
	{
		return accessToken;
	}

	public synchronized void setAccessToken(AccessTokenParam accessToken)
	{
		this.accessToken = accessToken;
	}

	/**
	 * 创建微信客户端
	 * 
	 * @param cid 客户端ID
	 */
	public WeixClient(WeixClientId cid)
	{
		if(cid == null)
		{
			throw new IllegalArgumentException("cid can not be null");
		}
		
		this.cid = cid;
	}
	
	private void checkResult(Object bean)
	{
		if(bean != null)
		{
			if(bean instanceof BaseResp)
			{
				BaseResp result = (BaseResp) bean;
				if(!result.success())
				{
					logger.warn("not a success response, error code is {}, error msg is {}", result.errcode, result.errmsg);
				}
				
			}
		}
	}
	
	protected <T> T requestWithAccessToken(RequestConfig info, Object bodyBean)
	{
		AccessTokenParam accessToken = getAccessToken();
		
		if(accessToken == null)
		{
			logger.error("request with null accesstoken!");
			throw new RuntimeException("accesstoken is null, please call login to get accesstoken.");
		}
		
		return commRequest(info, getAccessToken(), bodyBean);
	}
	
	@SuppressWarnings("unchecked")
	protected <T> T commRequest(RequestConfig info, Object paramBean, Object bodyBean)
	{
		logger.info("requesting weixin service: {}", info.name);
		
		String url = info.url + HttpParamUtil.genParamFromBean(paramBean);
		String body = null;

		try
		{
			if(bodyBean != null)
			{
				body = JsonUtil.bean2Json(bodyBean);
			}
			
			if(logger.isDebugEnabled())
			{
				logger.debug("requesting url: {} body:{} ", url, bodyBean);
			}
			
			String jsonResult = HttpsClient.request(info.requestMethod, url, body);
			
			logger.info("get response from weixin service: {}", info.name);
			if(logger.isDebugEnabled())
			{
				logger.debug(jsonResult);
			}

			T result= (T)JsonUtil.json2Bean(jsonResult, info.respCls);
			
			if(logger.isDebugEnabled())
			{
				logger.debug("{} response is: {}", info.name, result);
			}
			
			checkResult(result);
			
			return result;
		}
		catch (Exception e) 
		{
			logger.error("exception requesting weixin service: {}", info.name, e);
			throw new RuntimeException("error while requesting weixin service", e);
		}
	}
	
	/**
	 * 启用自动登录，启用后会定时到微信服务器登录获得ACCESS TOKEN。
	 * 
	 */
	public boolean startAutoLogin()
	{
		return reloginHelper.start();
	}
	
	/**
	 * 停止自动登录。
	 */
	public void stopAutoLogin()
	{
		reloginHelper.stop();
	}
	

	/**
	 * 登录到微信服务器，获得ACCESS TOKEN,
	 * 
	 * @return 登录结果
	 */
	public LoginResp login()
	{
		LoginResp result = commRequest(RequestConfig.LOGIN, cid, null);

		if(result.success())
		{
			setAccessToken(new AccessTokenParam(result.access_token));
		}
		
		return result;
	}

	@Override
	public BaseResp createMenu(Menu menu)
	{
		return requestWithAccessToken(RequestConfig.CREATE_MENU, menu);
	}

	@Override
	public BaseResp deleteMenu()
	{
		return requestWithAccessToken(RequestConfig.DEL_MENU, null);
	}

	@Override
	public GetMenuResp getMenu()
	{
		return requestWithAccessToken(RequestConfig.GET_MENU, null);
	}
	
	@Override
	public UserInfoResp getUserInfo(String openid)
	{
		return commRequest(RequestConfig.GET_USER_INFO, new UserInfoParam(getAccessToken(), openid), null);
	}
	
	@Override
	public BaseResp sendToUser(UserMsg userMsg)
	{
		return requestWithAccessToken(RequestConfig.SEND_TO_USER, userMsg);
	}

	@Override
	public GetGroupsResp getGroups()
	{
		return requestWithAccessToken(RequestConfig.GET_GROUPS, null);
	}

	@Override
	public CreateGroupResp createGroup(String name)
	{
		return requestWithAccessToken(RequestConfig.CREATE_GROUP, new CreateGroupReq(new GroupMin(name)));
	}

	@Override
	public BaseResp updateGroup(GroupBasic group)
	{
		return requestWithAccessToken(RequestConfig.UPDATE_GROUP, new UpdateGroupReq(group));
	}

	@Override
	public BaseResp updateUserGroup(UpdateUserGroupReq req)
	{
		return requestWithAccessToken(RequestConfig.UPDATE_USERGROUP, req);
	}
}
