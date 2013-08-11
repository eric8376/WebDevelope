package com.microwill.framework.context.util;

import java.util.Map;

import com.microwill.framework.context.Context;
import com.microwill.framework.context.ContextKey;

public final class ContextParamUtils {

	private ContextParamUtils() {

	}

	public static int paramCount(Context context) {

		Object[] params = (Object[]) ContextUtils.getObject(context,
				ContextKey.COMMAND_PARAM);

		return (params.length );
	}

	public static void putResult(Context context, Object o) {
		ContextUtils.addToContext(context, ContextKey.COMMAND_RESULT, o);
	}

	public static Object getParam(Context context, int i) {
		Object[] params = (Object[]) ContextUtils.getObject(context,
				ContextKey.COMMAND_PARAM);

		if (i < 1) {
			throw new ArrayIndexOutOfBoundsException(i);
		}

		try {
			return (params[i - 1]);
		} catch (ArrayIndexOutOfBoundsException e) {
			return null;
		}
	}

	public static Map getParamMap(Context context, int i) {
		Object o = getParam(context, i);
		return ((Map) o);
	}

	public static Integer getParamInteger(Context context, int i) {
		Object o = getParam(context, i);
		return ((Integer) o);
	}

	public static String getParamString(Context context, int i) {
		Object o = getParam(context, i);
		// return ((String) o);
		// ---------------------hlw modify
		return o.toString();
	}
}
