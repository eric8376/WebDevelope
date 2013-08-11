package com.microwill.framework.rpc;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.Method;
import java.util.Date;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.context.WebApplicationContext;

import com.microwill.framework.client.web.HttpServletSupport;
import com.microwill.framework.command.Command;
import com.microwill.framework.rpc.help.ExecuteHelp;


public class ServiceCallServlet extends HttpServletSupport {

	private static final long serialVersionUID = 531148957574802648L;

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		InputStream ins = request.getInputStream();
//		InputStreamReader insReader = new InputStreamReader(ins);
//		BufferedReader bReader = new BufferedReader(insReader);
//		String fromXML = bReader.readLine();
		response.setContentType("text/xml; charset=UTF-8");
		OutputStream outputS = response.getOutputStream();
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		try {
			Map map = ExecuteHelp.convetToMap(ins);
			String serviceName = ExecuteHelp.getString(map, "service");
			String methName = ExecuteHelp.getString(map, "meth");
			System.out.println("ExecuteAction Remote Call.");
			System.out.println("Service:" + serviceName);
			System.out.print("Invoke:" + methName + "(");

			Object[] obj = map.get("objects") == null ? null : (Object[]) map
					.get("objects");
			for (int i = 0; i < obj.length; i++) {
				if (i == 0) {
					System.out.print(obj[i]);
				} else {
					System.out.print("," + obj[i]);
				}
			}
			System.out.println(")");

			Object rtObj = null;
			Object svc = getWebApplicationContext().getBean(serviceName);
			if (!ExecuteHelp.isEmpty(methName)) {
				Method meth = null;
				Method[] meths = svc.getClass().getMethods();
				for (int i = 0; i < meths.length; i++) {
					if (meths[i].getName().equalsIgnoreCase(methName)
							&& meths[i].getParameterTypes().length == obj.length) {
						meth = meths[i];
						break;
					}
				}
				rtObj = meth.invoke(svc, obj);
			} else {
				Command cmd = (Command) svc;
				rtObj = processFunctionCall(cmd, obj, request,
						getWebApplicationContext());
			}
			ExecuteHelp.flushOutputStream(rtObj, outputStream);
			outputS.write(outputStream.toByteArray());
		} catch (Exception e) {
			e.printStackTrace();
			try {
				ExecuteHelp.flushOutputStream(e, outputStream);
				outputS.write(outputStream.toByteArray());
			} catch (Exception e1) {
				e1.printStackTrace();
			}
		} finally {
			outputS.close();
			outputStream.close();
		}
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
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
	protected static final Object processFunctionCall(Command cmd,
			Object[] params, HttpServletRequest request,
			WebApplicationContext context) throws Exception {
		System.out.println("Command���ÿ�ʼ��" + new Date());
		long baseL = System.currentTimeMillis();
		CallContextImpl ctx = new CallContextImpl();
		ctx.setHttpServletRequest(request);
		ctx.setParams(params);
		ctx.setSpringContext(context);
		cmd.execute(ctx);
		System.out.println("Command������ʱ�䣺"
				+ (System.currentTimeMillis() - baseL) / 1000);
		return (ctx.getResult());
	}
}
