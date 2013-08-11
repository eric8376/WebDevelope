package com.microwill.framework.Persistence.help;

import java.sql.Blob;
import java.sql.Clob;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Date;

public class QueryUtils {
	public static Object getResultSetValue(Object obj) {
		if (obj == null)
			return null;
		if (obj instanceof Date) {
			String rt = ((Date) obj).toString();
			if (rt.lastIndexOf(".") >= 0)
				return rt.substring(0, rt.lastIndexOf("."));
			else
				return rt;
		} else {
			return obj;
		}
	}

	/**
	 * Retrieve a JDBC column value from a ResultSet, using the most appropriate
	 * value type. The returned value should be a detached value object, not
	 * having any ties to the active ResultSet: in particular, it should not be
	 * a Blob or Clob object but rather a byte array respectively String
	 * representation.
	 * <p>
	 * Uses the <code>getObject(index)</code> method, but includes additional
	 * "hacks" to get around Oracle 10g returning a non-standard object for its
	 * TIMESTAMP datatype and a <code>java.sql.Date</code> for DATE columns
	 * leaving out the time portion: These columns will explicitly be extracted
	 * as standard <code>java.sql.Timestamp</code> object.
	 * 
	 * @param rs
	 *            is the ResultSet holding the data
	 * @param index
	 *            is the column index
	 * @return the value object
	 * @see java.sql.Blob
	 * @see java.sql.Clob
	 * @see java.sql.Timestamp
	 * @see oracle.sql.TIMESTAMP
	 */
	public static Object getResultSetValue(ResultSet rs, int index)
			throws SQLException {
		Object obj = rs.getObject(index);
		if (obj instanceof Blob) {
			obj = rs.getBytes(index);
		} else if (obj instanceof Clob) {
			obj = rs.getString(index);
		} else if (obj != null
				&& obj.getClass().getName().startsWith("oracle.sql.TIMESTAMP")) {
			obj = rs.getTimestamp(index).toLocaleString();
		} else if (obj != null
				&& obj.getClass().getName().startsWith("oracle.sql.DATE")) {
			String metaDataClassName = rs.getMetaData().getColumnClassName(
					index);
			if ("java.sql.Timestamp".equals(metaDataClassName)
					|| "oracle.sql.TIMESTAMP".equals(metaDataClassName)) {
				obj = rs.getTimestamp(index).toLocaleString();
			} else {
				obj = rs.getDate(index).toLocaleString();
			}
		} else if (obj != null && obj instanceof java.sql.Date) {
			if ("java.sql.Timestamp".equals(rs.getMetaData()
					.getColumnClassName(index))) {
				Timestamp ts = rs.getTimestamp(index);
				obj = ts.toLocaleString();
			}
		}
		return obj;
	}
}
