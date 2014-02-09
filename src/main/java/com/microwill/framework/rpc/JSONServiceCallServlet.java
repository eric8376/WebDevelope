package com.microwill.framework.rpc;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.URLDecoder;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONObject;

import com.microwill.framework.rpc.help.JSONExecuteHelp;
import com.microwill.framework.rpc.service.QueryDataService;
import com.microwill.framework.vo.Result;
import com.microwill.framework.web.util.ResponseUtil;

public class JSONServiceCallServlet extends HttpServletSupport
{
	protected Log log = LogFactory.getLog(this.getClass());
	private static final long serialVersionUID = -8717789606252275564L;
	public void init(ServletConfig servletConfig) throws ServletException {
		super.init(servletConfig);
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException
	{
		System.out.println("--------------doPost-----------------------");
		request.setCharacterEncoding("UTF-8");
		String json = readJSONStringFromRequestBody(request);
		json = URLDecoder.decode(json, "UTF-8");
		json = URLDecoder.decode(json, "UTF-8");
		execute(response, json);
	}
	private void execute(HttpServletResponse response, String json) {
		Result result=new Result();
		try
		{
			if (!StringUtils.isEmpty(json))
			{
				log.debug(json);
				//解析参数
				JSONObject jsonObject = new JSONObject(json);
				String serviceName = jsonObject.optString(JSONExecuteHelp.SERVICE_NAME);
				String methName = jsonObject.optString(JSONExecuteHelp.METHOD_NAME);
				JSONArray para = jsonObject.optJSONArray(JSONExecuteHelp.PARAMETER);

				List list = JSONExecuteHelp.analyzeJSONArray(para);
				Object[] obj = (Object[]) list.toArray(new Object[0]);
				debugParam(serviceName, methName, obj);

				Object rtObj = null;
				//获取spring组件
				Object svc = getWebApplicationContext().getBean(serviceName);
				if (!StringUtils.isEmpty(methName))
				{
					rtObj = callMethod(methName, obj, svc);
				} else//默认使用数据查询组件
				{
					QueryDataService queryDataService=(QueryDataService)svc;
					Map<String, String> sqlMap=(Map<String, String>)obj[0];
					rtObj=queryDataService.query(sqlMap);
				}
				
				result.setSuccess(true);
				result.setContent(rtObj);
				ResponseUtil.responseOutWithJson(response, result);
				//responseText = JSONExecuteHelp.parseJSONText(result);
			}
			
		} catch (Exception e)
		{
			e.printStackTrace();
			result.setSuccess(false);
			result.setMsg(e.getMessage());
			ResponseUtil.responseOutWithJson(response, result);
			//responseText = JSONExecuteHelp.parseJSONText(e);
		}
	}
	private Object callMethod(String methName, Object[] obj, Object svc)
			throws IllegalAccessException, InvocationTargetException {
		Object rtObj;
		Method meth = null;
		Method[] meths = svc.getClass().getMethods();
		for (int i = 0; i < meths.length; i++)
		{
			if (meths[i].getName().equalsIgnoreCase(methName)
					&& meths[i].getParameterTypes().length == obj.length)
			{
				meth = meths[i];
				break;
			}
		}
		rtObj = meth.invoke(svc, obj);
		return rtObj;
	}
	private void debugParam(String serviceName, String methName, Object[] obj) {
		log.debug("ExecuteAction JSON Remote Call.");
		log.debug("Service:" + serviceName);
		System.out.print("Invoke:" + methName + "(");
		for (int i = 0; i < obj.length; i++)
		{
			if (i == 0)
			{
				System.out.print(obj[i]);
			} else
			{
				System.out.print("," + obj[i]);
			}
		}
		log.debug(")");
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException
	{
		request.setCharacterEncoding("UTF-8");
		log.debug("---doGet----");
		String json = request.getParameter("getParam");
		json = URLDecoder.decode(json, "UTF-8");
		execute(response, json);
	}

	private String readJSONStringFromRequestBody(HttpServletRequest request)
	{
		StringBuffer json = new StringBuffer();
		String line = null;
		
		try
		{
			InputStream ins = request.getInputStream();
			InputStreamReader insReader = new InputStreamReader(ins,"UTF-8");
			BufferedReader bReader = new BufferedReader(insReader);
			while ((line = bReader.readLine()) != null)
			{
				json.append(line);
			} 
			
			 
		} catch (Exception e)
		{
			log.debug(" Error reading JSON string:  " + e.toString());
			e.printStackTrace();
		}
		return json.toString();
	}


}
