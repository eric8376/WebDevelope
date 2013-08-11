package com.microwill.framework.Persistence.help;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtilsBean;
import org.apache.commons.beanutils.ConvertUtilsBean;
import org.apache.commons.beanutils.PropertyUtilsBean;
import org.apache.commons.beanutils.converters.BigDecimalConverter;
import org.apache.commons.beanutils.converters.BigIntegerConverter;
import org.apache.commons.beanutils.converters.BooleanConverter;
import org.apache.commons.beanutils.converters.CharacterConverter;
import org.apache.commons.beanutils.converters.DoubleConverter;
import org.apache.commons.beanutils.converters.FloatConverter;
import org.apache.commons.beanutils.converters.IntegerConverter;
import org.apache.commons.beanutils.converters.LongConverter;
import org.apache.commons.beanutils.converters.SqlDateConverter;
import org.apache.commons.beanutils.converters.SqlTimeConverter;
import org.apache.commons.beanutils.converters.SqlTimestampConverter;

import com.microwill.framework.Persistence.PersistenceException;

public final class POHelper {

	private POHelper() {
	}

	private static BeanUtilsBean converter = null;

	static {
		ConvertUtilsBean bb = new ConvertUtilsBean();

		bb.register(new SqlTimestampConverter(null), Timestamp.class);
		bb.register(new SqlDateConverter(null), Date.class);
		bb.register(new SqlTimeConverter(null), Time.class);
		bb.register(new BooleanConverter(null), Boolean.class);
		bb.register(new BigDecimalConverter(null), BigDecimal.class);
		bb.register(new BigIntegerConverter(null), BigInteger.class);
		bb.register(new IntegerConverter(null), Integer.class);
		bb.register(new LongConverter(null), Long.class);
		bb.register(new FloatConverter(null), Float.class);
		bb.register(new DoubleConverter(null), Double.class);
		bb.register(new CharacterConverter(null), Character.class);
		bb.register(new CalendarConverter(null), Calendar.class);

		converter = new BeanUtilsBean(bb, new PropertyUtilsBean());
	}

	public static final BeanUtilsBean getConverter() {
		return (converter);
	}

	public static final void populate(Object o, Map map) {
		try {
			converter.populate(o, map);
		} catch (Exception e) {
			throw new PersistenceException(e);
		}
	}

	public static final Map describe(Object o) {
		try {
			return (converter.describe(o));
		} catch (Exception e) {
			throw new PersistenceException(e);
		}
	}

	public static final Map cloneMap(Map map) {
		if (map == null) {
			return (null);
		}
		HashMap m = new HashMap(map);
		return ((Map) m.clone());
	}
}
