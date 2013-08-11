package com.microwill.framework.rpc.help;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import net.sf.cglib.beans.BeanMap;
import org.dom4j.Element;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.Date;

/**
 * json-remote���ð���
 * 
 * @author baitao
 * 
 */
public class JSONExecuteHelp
{
	public static String SERVICE_NAME = "serviceName";

	public static String METHOD_NAME = "methodName";

	public static String PARAMETER = "para";

	public static String EXCEPTION = "exception";

	public static void main(String[] args) throws Exception
	{
		// Exception e = new Exception("failture");
		// System.out.println(parseJSONText(e));
		String result = new String("20007-002-001");
		List list = new ArrayList();
		list.add("abc");
		list.add("abcd");
		Map map = new HashMap();
		map.put("date", new Date());
		map.put("list", list);
		System.out.println(parseJSONText(map));

		// System.out.println(obj.toString(1));

		// Date d = Calendar.getInstance().getTime();
		// System.out.println(p.getClass().getClassLoader());
	}

	public static String parseJSONText(Object obj) throws JSONException
	{
		String type = getObjectType(obj);
		JSONObject jsonObject = new JSONObject();
		if (type.equalsIgnoreCase("e"))
		{
			Throwable ex = (Throwable) obj;
			StringBuffer strB = new StringBuffer();
			exceptionToStr(ex, strB);
			jsonObject.put("exception", strB.toString());
		} else
		{
			jsonObject.put("value", objectJSONSerialze(obj));
		}
		return jsonObject.toString();

	}

	private static Object dealC(Collection col)
	{
		List list = new ArrayList();
		Iterator ir = col.iterator();
		while (ir.hasNext())
		{
			Object obj = ir.next();
			list.add(objectJSONSerialze(obj));
		}
		JSONArray jsonArray = new JSONArray(list);
		return jsonArray;
	}

	private static Object dealA(Object[] obj)
	{
		List list = new ArrayList();
		for (int i = 0; i < obj.length; i++)
		{
			list.add(objectJSONSerialze(obj[i]));
		}
		JSONArray jsonArray = new JSONArray(list);
		return jsonArray;
	}

	private static Object dealM(Map map)
	{
		Iterator ir = map.keySet().iterator();
		while (ir.hasNext())
		{
			Object key = ir.next();
			Object obj = map.get(key);
			map.put(key, objectJSONSerialze(obj));
		}
		JSONObject jsonObject = new JSONObject(map);
		return jsonObject;
	}

	public static Object objectJSONSerialze(Object obj)
	{
		String type = getObjectType(obj);
		if (type.equalsIgnoreCase("b") || type.equalsIgnoreCase("i")
				|| type.equalsIgnoreCase("l") || type.equalsIgnoreCase("f")
				|| type.equalsIgnoreCase("s") || type.equalsIgnoreCase("t"))
		{
			return obj.toString();
		} else if (type.equalsIgnoreCase("c"))
		{
			return dealC((Collection) obj);
		} else if (type.equalsIgnoreCase("m"))
		{
			return dealM((Map) obj);
		} else if (type.equalsIgnoreCase("a"))
		{
			return dealA((Object[]) obj);
		} else if (type.equalsIgnoreCase("o"))
		{
			Map map = BeanMap.create(obj);
			System.out.println("map:" + map);
			return dealM(map);
		} else
		{
			return "";
		}
	}

	private static String getObjectType(Object obj)
	{
		// n=null,b,i,f,s,t,o,a,e=exception
		if (obj == null)
		{
			return "n";
		}
		if (obj instanceof Exception)
		{
			return "e";
		}
		if (obj instanceof Integer || obj instanceof BigInteger || obj instanceof BigDecimal)
		{
			return "i";
		} else if (obj instanceof Float || obj instanceof Double)
		{
			return "f";
		} else if (obj instanceof Long)
		{
			return "l";
		} else if (obj instanceof Boolean)
		{
			return "b";
		} else if (obj instanceof java.util.Date)
		{
			return "t";
		} else if (obj instanceof String)
		{
			return "s";
		} else if (obj instanceof Collection)
		{
			return "c";
		} else if (obj instanceof Map)
		{
			return "m";
		} else if (obj.getClass().isArray())
		{
			return "a";
		} else if (obj instanceof Element)
		{
			return "ele";
		} else
		{
			return "o";
		}
	}

	private static void exceptionToStr(Throwable ex, StringBuffer strB)
	{
		StackTraceElement[] em = ex.getStackTrace();
		strB.append("the cause:" + ex + "\n");
		for (int i = 0; i < em.length; i++)
		{
			strB.append("\tat... " + em[i] + "\n");
		}
		strB.append("\t... more:" + em.length + "\n");
		Throwable nEx = ex.getCause();
		if (nEx != null)
		{
			exceptionToStr(nEx, strB);
		}
	}

	public static List analyzeJSONArray(JSONArray jsonArray) throws JSONException
	{
		List list = new ArrayList();
		if (jsonArray == null || jsonArray.length() == 0)
		{
			return list;
		}
		for (int i = 0; i < jsonArray.length(); i++)
		{
			Object temp = jsonArray.get(i);
			if (temp instanceof JSONArray)
			{
				list.add(analyzeJSONArray((JSONArray) temp));
			} else if (temp instanceof JSONObject)
			{
				list.add(analyzeJSONObject((JSONObject) temp));
			} else
			{
				String value = (String) temp;
				list.add(value);
			}
		}
		return list;
	}

	public static Map analyzeJSONObject(JSONObject jsonObject) throws JSONException
	{
		Map resultMap = new HashMap();
		if (jsonObject == null)
		{
			return resultMap;
		}
		for (Iterator itor = jsonObject.keys(); itor.hasNext();)
		{
			String key = (String) itor.next();
			Object temp = jsonObject.opt(key);
			if (temp instanceof JSONArray)
			{
				resultMap.put(key, analyzeJSONArray((JSONArray) temp));

			} else if (temp instanceof JSONObject)
			{
				resultMap.put(key, analyzeJSONObject((JSONObject) temp));
			} else
			{
				String value = (String) temp;
				resultMap.put(key, value);
			}
		}
		return resultMap;
	}

	public static boolean isEmpty(String str)
	{
		if (str == null || str.equalsIgnoreCase(""))
		{
			return true;
		} else
			return false;
	}
}
