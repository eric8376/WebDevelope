package com.microwill.framework.context.util;

import java.text.NumberFormat;
import java.text.ParseException;
import java.util.Collection;
import java.util.Collections;
import java.util.Map;

import com.microwill.framework.context.Context;



public final class ContextUtils {
	private ContextUtils() {

	}

	// ------------------------------------------------------------------

	public static final Object getObject(final Context ctx, final Object key) {
		if (ctx != null) {
			return ctx.get(key);
		}
		return null;
	}

	public static final String getString(final Context ctx, final Object key) {
		if (ctx != null) {
			Object answer = ctx.get(key);
			if (answer != null) {
				return answer.toString();
			}
		}
		return null;
	}

	public static final Boolean getBoolean(final Context ctx, final Object key) {
		if (ctx != null) {
			Object answer = ctx.get(key);
			if (answer != null) {
				if (answer instanceof Boolean) {
					return (Boolean) answer;

				} else if (answer instanceof String) {
					return new Boolean((String) answer);

				} else if (answer instanceof Number) {
					Number n = (Number) answer;
					return (n.intValue() != 0) ? Boolean.TRUE : Boolean.FALSE;
				}
			}
		}
		return null;
	}

	public static final Number getNumber(final Context ctx, final Object key) {
		if (ctx != null) {
			Object answer = ctx.get(key);
			if (answer != null) {
				if (answer instanceof Number) {
					return (Number) answer;

				} else if (answer instanceof String) {
					try {
						String text = (String) answer;
						return NumberFormat.getInstance().parse(text);

					} catch (ParseException e) {
						logInfo(e);
					}
				}
			}
		}
		return null;
	}

	public static final Byte getByte(final Context ctx, final Object key) {
		Number answer = getNumber(ctx, key);
		if (answer == null) {
			return null;
		} else if (answer instanceof Byte) {
			return (Byte) answer;
		}
		return new Byte(answer.byteValue());
	}

	public static final Short getShort(final Context ctx, final Object key) {
		Number answer = getNumber(ctx, key);
		if (answer == null) {
			return null;
		} else if (answer instanceof Short) {
			return (Short) answer;
		}
		return new Short(answer.shortValue());
	}

	public static final Integer getInteger(final Context ctx, final Object key) {
		Number answer = getNumber(ctx, key);
		if (answer == null) {
			return null;
		} else if (answer instanceof Integer) {
			return (Integer) answer;
		}
		return new Integer(answer.intValue());
	}

	public static final Long getLong(final Context ctx, final Object key) {
		Number answer = getNumber(ctx, key);
		if (answer == null) {
			return null;
		} else if (answer instanceof Long) {
			return (Long) answer;
		}
		return new Long(answer.longValue());
	}

	public static final Float getFloat(final Context ctx, final Object key) {
		Number answer = getNumber(ctx, key);
		if (answer == null) {
			return null;
		} else if (answer instanceof Float) {
			return (Float) answer;
		}
		return new Float(answer.floatValue());
	}

	public static final Double getDouble(final Context ctx, final Object key) {
		Number answer = getNumber(ctx, key);
		if (answer == null) {
			return null;
		} else if (answer instanceof Double) {
			return (Double) answer;
		}
		return new Double(answer.doubleValue());
	}

	public static final Map getMap(final Context ctx, final Object key) {
		if (ctx != null) {
			Object answer = ctx.get(key);
			if (answer != null && answer instanceof Map) {
				return ((Map) answer);
			}
		}
		return (Collections.EMPTY_MAP);
	}

	public static final Object getObject(Context ctx, Object key,
			Object defaultValue) {
		if (ctx != null) {
			Object answer = ctx.get(key);
			if (answer != null) {
				return answer;
			}
		}
		return defaultValue;
	}

	public static final String getString(Context ctx, Object key,
			String defaultValue) {
		String answer = getString(ctx, key);
		if (answer == null) {
			answer = defaultValue;
		}
		return answer;
	}

	public static final Boolean getBoolean(Context ctx, Object key,
			Boolean defaultValue) {
		Boolean answer = getBoolean(ctx, key);
		if (answer == null) {
			answer = defaultValue;
		}
		return answer;
	}

	public static final Number getNumber(Context ctx, Object key,
			Number defaultValue) {
		Number answer = getNumber(ctx, key);
		if (answer == null) {
			answer = defaultValue;
		}
		return answer;
	}

	public static final Byte getByte(Context ctx, Object key, Byte defaultValue) {
		Byte answer = getByte(ctx, key);
		if (answer == null) {
			answer = defaultValue;
		}
		return answer;
	}

	public static final Short getShort(Context ctx, Object key,
			Short defaultValue) {
		Short answer = getShort(ctx, key);
		if (answer == null) {
			answer = defaultValue;
		}
		return answer;
	}

	public static final Integer getInteger(Context ctx, Object key,
			Integer defaultValue) {
		Integer answer = getInteger(ctx, key);
		if (answer == null) {
			answer = defaultValue;
		}
		return answer;
	}

	public static final Long getLong(Context ctx, Object key, Long defaultValue) {
		Long answer = getLong(ctx, key);
		if (answer == null) {
			answer = defaultValue;
		}
		return answer;
	}

	public static final Float getFloat(Context ctx, Object key,
			Float defaultValue) {
		Float answer = getFloat(ctx, key);
		if (answer == null) {
			answer = defaultValue;
		}
		return answer;
	}

	public static final Double getDouble(Context ctx, Object key,
			Double defaultValue) {
		Double answer = getDouble(ctx, key);
		if (answer == null) {
			answer = defaultValue;
		}
		return answer;
	}

	public static final Collection getCollection(Context ctx, Object key) {
		if (ctx != null) {
			Object answer = ctx.get(key);
			if (answer != null && answer instanceof Collection) {
				return ((Collection) answer);
			}
		}
		return (Collections.EMPTY_LIST);
	}

	// Type safe primitive getters

	public static final boolean getBooleanValue(final Context ctx,
			final Object key) {
		Boolean booleanObject = getBoolean(ctx, key);
		if (booleanObject == null) {
			return false;
		}
		return booleanObject.booleanValue();
	}

	public static final byte getByteValue(final Context ctx, final Object key) {
		Byte byteObject = getByte(ctx, key);
		if (byteObject == null) {
			return 0;
		}
		return byteObject.byteValue();
	}

	public static final short getShortValue(final Context ctx, final Object key) {
		Short shortObject = getShort(ctx, key);
		if (shortObject == null) {
			return 0;
		}
		return shortObject.shortValue();
	}

	public static final int getIntValue(final Context ctx, final Object key) {
		Integer integerObject = getInteger(ctx, key);
		if (integerObject == null) {
			return 0;
		}
		return integerObject.intValue();
	}

	public static final long getLongValue(final Context ctx, final Object key) {
		Long longObject = getLong(ctx, key);
		if (longObject == null) {
			return 0L;
		}
		return longObject.longValue();
	}

	public static final float getFloatValue(final Context ctx, final Object key) {
		Float floatObject = getFloat(ctx, key);
		if (floatObject == null) {
			return 0f;
		}
		return floatObject.floatValue();
	}

	public static final double getDoubleValue(final Context ctx,
			final Object key) {
		Double doubleObject = getDouble(ctx, key);
		if (doubleObject == null) {
			return 0d;
		}
		return doubleObject.doubleValue();
	}

	// Type safe primitive getters with default values

	public static final boolean getBooleanValue(final Context ctx,
			final Object key, boolean defaultValue) {
		Boolean booleanObject = getBoolean(ctx, key);
		if (booleanObject == null) {
			return defaultValue;
		}
		return booleanObject.booleanValue();
	}

	public static final byte getByteValue(final Context ctx, final Object key,
			byte defaultValue) {
		Byte byteObject = getByte(ctx, key);
		if (byteObject == null) {
			return defaultValue;
		}
		return byteObject.byteValue();
	}

	public static final short getShortValue(final Context ctx,
			final Object key, short defaultValue) {
		Short shortObject = getShort(ctx, key);
		if (shortObject == null) {
			return defaultValue;
		}
		return shortObject.shortValue();
	}

	public static final int getIntValue(final Context ctx, final Object key,
			int defaultValue) {
		Integer integerObject = getInteger(ctx, key);
		if (integerObject == null) {
			return defaultValue;
		}
		return integerObject.intValue();
	}

	public static final long getLongValue(final Context ctx, final Object key,
			long defaultValue) {
		Long longObject = getLong(ctx, key);
		if (longObject == null) {
			return defaultValue;
		}
		return longObject.longValue();
	}

	public static final float getFloatValue(final Context ctx,
			final Object key, float defaultValue) {
		Float floatObject = getFloat(ctx, key);
		if (floatObject == null) {
			return defaultValue;
		}
		return floatObject.floatValue();
	}

	public static final double getDoubleValue(final Context ctx,
			final Object key, double defaultValue) {
		Double doubleObject = getDouble(ctx, key);
		if (doubleObject == null) {
			return defaultValue;
		}
		return doubleObject.doubleValue();
	}

	public static final void safeAddToContext(Context ctx, Object key,
			Object value) {
		ctx.put(key, value);
	}

	public static final void addToContext(Context ctx, Object key, Object value) {
		ctx.put(key, value);
	}

	// Implementation methods
	protected static final void logInfo(final Exception ex) {
		System.out.println("INFO: Exception: " + ex);
	}
}
