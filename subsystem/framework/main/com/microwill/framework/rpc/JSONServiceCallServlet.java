package com.microwill.framework.rpc;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.lang.reflect.Method;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.context.WebApplicationContext;
import com.microwill.framework.client.web.HttpServletSupport;
import com.microwill.framework.command.Command;
import com.microwill.framework.rpc.help.JSONExecuteHelp;

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
			if (!JSONExecuteHelp.isEmpty(json))
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
				if (!JSONExecuteHelp.isEmpty(methName))
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
					Command cmd = (Command) svc;
					rtObj = processFunctionCall(cmd, obj, request, getWebApplicationContext());
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
			if (!JSONExecuteHelp.isEmpty(json))
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
				if (!JSONExecuteHelp.isEmpty(methName))
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
					Command cmd = (Command) svc;
					rtObj = processFunctionCall(cmd, obj, request, getWebApplicationContext());
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

	/**
	 * ִ��commond����
	 * 
	 * @param cmd
	 * @param params
	 * @param request
	 * @param context
	 * @return
	 * @throws Exception
	 */
	protected static final Object processFunctionCall(Command cmd, Object[] params,
			HttpServletRequest request, WebApplicationContext context) throws Exception
	{
		CallContextImpl ctx = new CallContextImpl();
		ctx.setHttpServletRequest(request);
		ctx.setParams(params);
		ctx.setSpringContext(context);
		cmd.execute(ctx);
		return (ctx.getResult());
	}
}
