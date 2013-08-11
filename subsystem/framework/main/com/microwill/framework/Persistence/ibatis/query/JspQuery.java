package com.microwill.framework.Persistence.ibatis.query;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import org.apache.commons.lang.StringUtils;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import com.ibatis.sqlmap.client.SqlMapClient;

import com.microwill.framework.command.Command;
import com.microwill.framework.command.impl.DefaultContextImpl;
import com.microwill.framework.context.Context;
import com.microwill.framework.context.ContextKey;
import com.microwill.framework.context.util.ContextUtils;
import com.microwill.framework.rpc.CallContextImpl;
import com.microwill.framework.rpc.help.ExecuteHelp;

public class JspQuery {

	private WebApplicationContext wac;

	private SqlMapClient sqlMapClient;

	public JspQuery() {

	}

	public JspQuery(ServletContext sc) {

		wac = WebApplicationContextUtils.getRequiredWebApplicationContext(sc);

		sqlMapClient = (SqlMapClient) wac.getBean("sqlMapClient");
	}

	public List queryForList(Map paramMap) {
		List list = null;
		if (paramMap.get("viewName") != null) {
			try {
				list = listConvert(sqlMapClient.queryForList(
						"defaultQuery.find", paramMap));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return list;
	}
	public List queryBaseMenu(Map paramMap) {
		List list = null;
		
			try {
				list = listConvert(sqlMapClient.queryForList(
						"menuCfg.selectMenuBase", paramMap));
			} catch (Exception e) {
				e.printStackTrace();
			}
		
		return list;
	}
	public Object serviceCall(String beanName, Object map) {
		if (beanName == null)
			return null;
		Object[] obj = null;
		obj = new Object[] { map };
		Context context = new DefaultContextImpl();
		ContextUtils.addToContext(context, ContextKey.COMMAND_PARAM, obj);
		ContextUtils.addToContext(context, "formInfo", map);
		ContextUtils.addToContext(context,
				ContextKey.SPRING_APPLICATION_CONTEXT, wac);
		Command bean = (Command) wac.getBean(beanName);
		try {
			bean.execute(context);
			return ContextUtils.getObject(context, ContextKey.COMMAND_RESULT);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}
	   public Object execute(String serviceName, String methodName,
			   Object map) {
	    try {
	            Object rtObj = null;
	            Object svc = wac.getBean(serviceName);
	            Object[] objs = { map };
	            if (!ExecuteHelp.isEmpty(methodName)) {
	                    Method meth = null;
	                    Method[] meths = svc.getClass().getMethods();
	                    for (int i = 0; i < meths.length; i++) {
	                            if (meths[i].getName().equalsIgnoreCase(methodName)
	                                            && meths[i].getParameterTypes().length == objs.length) {
	                                    meth = meths[i];
	                                    break;
	                            }
	                    }
	                    rtObj = meth.invoke(svc, objs);
	            } else {
	                    Command cmd = (Command) svc;
	                    rtObj = processFunctionCall(cmd, objs, wac);
	            }
	            return rtObj;
	    } catch (Exception e) {
	            e.printStackTrace();
	            return null;
	    }
	}


	public WebApplicationContext getWac() {
		return wac;
	}

	public void setWac(WebApplicationContext wac) {
		this.wac = wac;
	}

	private List listConvert(List list) {
		List resultList = new ArrayList();
		if (list == null || list.size() == 0) {
			return null;
		} else {
			for (int i = 0; i < list.size(); i++) {
				resultList.add(convert((Map) list.get(i)));
			}
		}
		return resultList;
	}

	public static Map convert(Map arg0) {
		Map map = null;
		if (arg0 != null && arg0.size() > 0) {
			map = new HashMap();
			Iterator ir = arg0.keySet().iterator();
			while (ir.hasNext()) {
				String key = (String) ir.next();
				//Object value = QueryUtils.getResultSetValue(arg0.get(key));
				Object value = arg0.get(key);
				if (value == null) {
					value = "";
				}
				key = convertStr(key);
				map.put(key, value);
			}
		}
		return map;
	}

	private static String convertStr(String arg0) {
		String sa[] = StringUtils.split(arg0, "_");
		char firstC = arg0.charAt(0);
		int len = sa.length;
		if (len > 1) {
			for (int i = 0; i < len; i++)
				sa[i] = StringUtils.capitalise(StringUtils.lowerCase(sa[i]));
			sa[0] = StringUtils.lowerCase(sa[0]);
		} else if (!Character.isLowerCase(firstC)) {
			sa[0] = StringUtils.lowerCase(sa[0]);
		}
		return StringUtils.join(sa, null);
	}
	
	protected static final Object processFunctionCall(Command cmd,
			Object[] params, WebApplicationContext context) throws Exception {
		CallContextImpl ctx = new CallContextImpl();
		ctx.setParams(params);
		ctx.setSpringContext(context);
		cmd.execute(ctx);
		return (ctx.getResult());
	}
}
