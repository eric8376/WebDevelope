package com.microwill.framework.Persistence.help;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

public class MapUtils {
	
	public static Map convert(Map arg0) {
		Map map = null;
		if (arg0 != null && arg0.size() > 0) {
			map = new HashMap();
			Iterator ir = arg0.keySet().iterator();
			while (ir.hasNext()) {
				String key = (String) ir.next();
				//Object value = QueryUtils.getResultSetValue(arg0.get(key));
				Object value=arg0.get(key);
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
}
