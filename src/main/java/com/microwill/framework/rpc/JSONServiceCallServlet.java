package com.microwill.framework.rpc;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import com.microwill.framework.rpc.help.JSONExecuteHelp;
import com.microwill.framework.rpc.service.QueryDataService;

public class JSONServiceCallServlet extends HttpServletSupport
{
	private static final long serialVersionUID = -8717789606252275564L;
	public void init(ServletConfig servletConfig) throws ServletException {
		super.init(servletConfig);
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException
	{
		request.setCharacterEncoding("UTF-8");
		String json = readJSONStringFromRequestBody(request);
		String responseText = "";
		response.setContentType("text/plain; charset=UTF-8");
		response.setBufferSize(8192);
		PrintWriter out = response.getWriter();
		try
		{
			if (!StringUtils.isEmpty(json))
			{
				System.out.println(json);
				JSONObject jsonObject = new JSONObject(json);
				String serviceName = jsonObject.optString(JSONExecuteHelp.SERVICE_NAME);
				String methName = jsonObject.optString(JSONExecuteHelp.METHOD_NAME);
				JSONArray para = jsonObject.optJSONArray(JSONExecuteHelp.PARAMETER);

				List list = JSONExecuteHelp.analyzeJSONArray(para);
				Object[] obj = (Object[]) list.toArray(new Object[0]);
				System.out.println("ExecuteAction JSON Remote Call.");
				System.out.println("Service:" + serviceName);
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
				System.out.println(")");

				Object rtObj = null;
				Object svc = getWebApplicationContext().getBean(serviceName);
				if (!StringUtils.isEmpty(methName))
				{
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
				} else
				{
					QueryDataService queryDataService=(QueryDataService)svc;
					Map<String, String> sqlMap=(Map<String, String>)obj[0];
					rtObj=queryDataService.query(sqlMap.get("sql"));
				}
				responseText = JSONExecuteHelp.parseJSONText(rtObj);
			}
			out.print(responseText);
		} catch (Exception e)
		{
			e.printStackTrace();
			try
			{
				responseText = JSONExecuteHelp.parseJSONText(e);
				out.print(responseText);
			} catch (Exception e1)
			{
				e1.printStackTrace();
			}
		} finally
		{
			out.close();
		}
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException
	{
		request.setCharacterEncoding("UTF-8");
		System.out.println("---doGet----");
		String json = request.getParameter("getParam");

		String responseText = "";
		response.setContentType("text/plain; charset=UTF-8");
		response.setBufferSize(8192);
		PrintWriter out = response.getWriter();
		try
		{
			if (!StringUtils.isEmpty(json))
			{
				JSONObject jsonObject = new JSONObject(json);
				String serviceName = jsonObject.optString(JSONExecuteHelp.SERVICE_NAME);
				String methName = jsonObject.optString(JSONExecuteHelp.METHOD_NAME);
				JSONArray para = jsonObject.optJSONArray(JSONExecuteHelp.PARAMETER);

				List list = JSONExecuteHelp.analyzeJSONArray(para);
				Object[] obj = (Object[]) list.toArray(new Object[0]);
				System.out.println("ExecuteAction JSON Remote Call.");
				System.out.println("Service:" + serviceName);
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
				System.out.println(")");
				Object rtObj = null;
				Object svc = getWebApplicationContext().getBean(serviceName);
				if (!StringUtils.isEmpty(methName))
				{
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
				} else
				{
					QueryDataService queryDataService=(QueryDataService)svc;
					Map<String, String> sqlMap=(Map<String, String>)obj[0];
					Map<String,Object> result=new HashMap<String, Object>();
					result.put("value", queryDataService.query(sqlMap.get("sql")));
					rtObj=result;
				}
				responseText = JSONExecuteHelp.parseJSONText(rtObj);
			}
			out.print(responseText);
		} catch (Exception e)
		{
			e.printStackTrace();
			try
			{
				responseText = JSONExecuteHelp.parseJSONText(e);
				out.print(responseText);
			} catch (Exception e1)
			{
				e1.printStackTrace();
			}
		} finally
		{
			out.close();
		}	}

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
			System.out.println(" Error reading JSON string:  " + e.toString());
			e.printStackTrace();
		}
		return json.toString();
	}


}
