/*
 * Created on 2006-1-2
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package org.nxstudio.service.socketserver.systools;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;


/**
 * @author Admin
 *         <p/>
 *         TODO To change the template for this generated type comment go to Window -
 *         Preferences - Java - Code Style - Code Templates
 */

public class DateTimeUtil {

    public static Date parse(String s) throws ParseException {
        if (s == null) {
            return null;
        }
//		DateFormat f = DateFormat.getDateInstance(DateFormat.DEFAULT);
//		return f.parse(s);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.parse(s);

    }

    public static Date parse2(String source) {
        if (source == null) {
            return null;
        }
        SimpleDateFormat mat = new SimpleDateFormat("yyyy/MM/dd");
        Date dd = new Date();
        try {
            dd = mat.parse(source);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return dd;
    }

    public static String getXX_Date(String source) {
        String str = "";
        if (source != null) {
            str = source.replaceAll("-", "/");
        }

        return str;
    }

    public static Date getNowDateTime() {
        Calendar cd = Calendar.getInstance();

        return cd.getTime();

    }

    public static String parse_time(String s) throws ParseException {
        if (s == null) {
            return null;
        }
        DateFormat f = DateFormat.getDateInstance(DateFormat.DEFAULT);
        Date d = f.parse(s);
        SimpleDateFormat sdf = new SimpleDateFormat("hh:mm:ss");
        return sdf.format(d);

    }

    public static String toDateString(Date date) {
        if (date == null) {
            return null;
        }
        SimpleDateFormat sdff = new SimpleDateFormat("yyyy-MM-dd");
        String dateStr = sdff.format(date);
        return dateStr;
        // Calendar cal = Calendar.getInstance();
        // cal.setTime(date);
        // String s = "";
        // s += cal.get(Calendar.YEAR);
        // s += "-";
        // s += cal.get(Calendar.MONTH) + 1;
        // s += "-";
        // s += cal.get(Calendar.DATE);
        // return s;
    }

    public static String toDateTimeString(Date date) {
        if (date == null) {
            return null;
        }
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        String s = "";
        s += cal.get(Calendar.YEAR);
        s += "-";
        s += cal.get(Calendar.MONTH) + 1;
        s += "-";
        s += cal.get(Calendar.DATE);
        s += " ";
        s += cal.get(Calendar.HOUR_OF_DAY);
        s += ":";
        s += cal.get(Calendar.MINUTE);
        s += ":";
        s += cal.get(Calendar.SECOND);
        return s;
    }

    public static String toTimeString(Date date) {
        if (date == null) {
            return null;
        }
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        String s = "" + cal.get(Calendar.HOUR_OF_DAY);
        s += ":";
        s += cal.get(Calendar.MINUTE);
        s += ":";
        s += cal.get(Calendar.SECOND);
        return s;
    }

    /*
     * 获得当前日期的格式 yyyyMMdd
     */
    public static String get_YYYYMMDD_Date() {
        String dt = "";
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
            Calendar cal = Calendar.getInstance();
            dt = sdf.format(cal.getTime());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return dt;
    }

    public static Date parseYYYYMMDD(String dateStr) throws ParseException {
        if (dateStr == null) {
            return null;
        }
        SimpleDateFormat mat = new SimpleDateFormat("yyyyMMdd");
        Date dd = new Date();
        dd = mat.parse(dateStr);
        return dd;
    }

    /*
     * 将字符日期yyyy-MM-dd转换为yyyyMMdd.
     */
    public static String get_YYYYMMDD_Date(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        String dt = sdf.format(date);
        return dt;
    }

    /*
     * 将字符日期yyyy-MM-dd转换为yyyyMMdd.
     */
    public static String get_YYYYMMDD_Date(String dateStr) {
        String dt = "";
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
            dt = sdf.format(parse(dateStr));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return dt;
    }

    /*
     * 将字符日期yyyy-MM-dd转换为yyyyMMdd.
     */
    public static String getYYYY_MM_DD_Date(String dateStr) {
        String dt = "";
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            dt = sdf.format(parse(dateStr));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return dt;
    }

    /*
     * 获得当前日期的格式 yyyy-MM-dd
     */
    public static String get_YYYY_MM_DD_Date() {
        String dt = "";
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Calendar cal = Calendar.getInstance();
            dt = sdf.format(cal.getTime());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return dt;
    }

    public static String get_YYYY_MM_DD_Date(Date date) {
        String dt = "";
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

            dt = sdf.format(date);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return dt;
    }

    /*
     * 获得当前时间格式的字符串
     */
    public static String get_hhmmss_time() {
        String dt = "";
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
            Calendar cal = Calendar.getInstance();
            dt = sdf.format(cal.getTime());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return dt;
    }

    /**
     * 计算某日期之后N天的日期
     *
     * @param theDateStr
     * @param days
     * @return String
     */
    public static String getDate(String theDateStr, int days) {
        Date theDate = java.sql.Date.valueOf(theDateStr);
        Calendar c = new GregorianCalendar();
        c.setTime(theDate);
        c.add(GregorianCalendar.DATE, days);
        java.sql.Date d = new java.sql.Date(c.getTime().getTime());
        return d.toString();
    }

    /**
     * 计算一旬的头一天
     *
     * @param theDate
     * @param days
     * @return
     */
    public static java.sql.Date getDayOfPerMonth(String theDataStr) {
        Date theDate = java.sql.Date.valueOf(theDataStr);
        Calendar c = new GregorianCalendar();
        c.setTime(theDate);
        int day = c.get(Calendar.DAY_OF_MONTH);
        if (day <= 10) {
            c.set(Calendar.DAY_OF_MONTH, 1);
        } else if (day > 10 && day <= 20) {
            c.set(Calendar.DAY_OF_MONTH, 11);
        } else {
            c.set(Calendar.DAY_OF_MONTH, 21);
        }
        c.add(Calendar.DAY_OF_MONTH, -1);

        return new java.sql.Date(c.getTime().getTime());
    }

    /**
     * 判断是否为该月最后一天
     *
     * @param theDate
     * @param days
     * @return
     */
    public static boolean isLastDayOfMonth(String theDataStr) {
        Date theDate = java.sql.Date.valueOf(theDataStr);
        Calendar c = new GregorianCalendar();
        c.setTime(theDate);
        int nowDay = c.get(Calendar.DAY_OF_MONTH);
        c.set(Calendar.DAY_OF_MONTH, 1);
        c.add(Calendar.MONTH, 1);
        c.add(Calendar.DAY_OF_MONTH, -1);
        int lowDayOfMonth = c.get(Calendar.DAY_OF_MONTH);
        if (nowDay == lowDayOfMonth) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取指定月份的最后一天
     *
     * @param theDataStr
     * @return
     */
    public static String LastDateOfMonth(String theDataStr) {
        Date theDate = java.sql.Date.valueOf(theDataStr);
        Calendar c = new GregorianCalendar();
        c.setTime(theDate);
        c.set(Calendar.DAY_OF_MONTH, 1);
        c.add(Calendar.MONTH, 1);
        c.add(Calendar.DAY_OF_MONTH, -1);
        return (new java.sql.Date(c.getTime().getTime())).toString();
    }

    /**
     * 计算某日期之后N天的日期
     *
     * @param theDate
     * @param days
     * @return Date
     */
    public static Date getDate(Date theDate, int days) {
        Calendar c = new GregorianCalendar();
        c.setTime(theDate);
        c.add(GregorianCalendar.DATE, days);
        return new Date(c.getTime().getTime());
    }

    /**
     * 计算某日期之后N的日期
     *
     * @param theDate
     * @param field，如GregorianCalendar.DATE,GregorianCalendar.MONTH
     * @param amount                                                数目
     * @return Date
     */
    public static java.sql.Date getDate(Date theDate, int field, int amount) {
        Calendar c = new GregorianCalendar();
        c.setTime(theDate);
        c.add(field, amount);
        return new java.sql.Date(c.getTime().getTime());
    }

    // 获得两个日期(字符串)之间的天数
    public static int getDiffDays(String begin_dt, String end_dt) {
        Date end = java.sql.Date.valueOf(end_dt);
        Date begin = java.sql.Date.valueOf(begin_dt);
        int days = DateTimeUtil.getDaysBetween(begin, end);
        return days;
    }

    /**
     * 计算两日期之间的天数
     *
     * @param start
     * @param end
     * @return int
     */
    public static int getDaysBetween(Date start, Date end) {
        if (start == null)
            return 0;
        boolean negative = false;
        if (end.before(start)) {
            negative = true;
            Date temp = start;
            start = end;
            end = temp;
        }
        GregorianCalendar cal = new GregorianCalendar();
        cal.setTime(start);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        GregorianCalendar calEnd = new GregorianCalendar();
        calEnd.setTime(end);
        calEnd.set(Calendar.HOUR_OF_DAY, 0);
        calEnd.set(Calendar.MINUTE, 0);
        calEnd.set(Calendar.SECOND, 0);
        calEnd.set(Calendar.MILLISECOND, 0);
        if (cal.get(Calendar.YEAR) == calEnd.get(Calendar.YEAR)) {
            if (negative)
                return (calEnd.get(Calendar.DAY_OF_YEAR) - cal
                        .get(Calendar.DAY_OF_YEAR))
                        * -1;
            return calEnd.get(Calendar.DAY_OF_YEAR)
                    - cal.get(Calendar.DAY_OF_YEAR);
        }
        int counter = 0;
        while (calEnd.after(cal)) {
            cal.add(Calendar.DAY_OF_YEAR, 1);
            counter++;
        }
        if (negative)
            return counter * -1;
        return counter;
    }

    /**
     * 以指定时间格式返回指定时间
     *
     * @param dt     指定时间
     * @param format 时间格式，如yyyyMMdd
     * @return 返回指定格式的时间
     */
    public static String getTime(Date dt, String format) {
        SimpleDateFormat st = new SimpleDateFormat(format);
        return st.format(dt);
    }

    /**
     * 日期解析
     *
     * @param source 日期字符
     * @param format 解析格式，如果为空，使用系统默认格式解析
     * @return 日期
     */
    public static Date parse(String source, String format) {
        if (source == null) {
            return null;
        }

        DateFormat df = null;
        if (format != null) {
            df = new SimpleDateFormat(format);
        } else {
            df = DateFormat.getDateInstance(DateFormat.DEFAULT);
        }
        try {
            return df.parse(source);
        } catch (ParseException e) {
            e.printStackTrace();
            return new Date();
        }
    }

    /**
     * 获得当前营业日
     *
     * @return 当前营业日
     */
//	public static Date getWorkday() {
//		return BusiDateFactory.getBusiDateService().getBusiDate().getWorkday();
//	}

    /**
     * 获得当前营业日，格式yyyyMMdd
     *
     * @return 当前营业日
     */
//	public static String getWorkday_YYYYMMDD() {
//		return getTime(getWorkday(), "yyyyMMdd");
//	}

    /**
     * 获得当前营业日，格式yyyy_MM_dd
     *
     * @return 当前营业日
     */
//	public static String getWorkday_YYYY_MM_DD() {
//		return getTime(getWorkday(), "yyyy-MM-dd");
//	}

    /**
     * 获得下一个营业日
     *
     * @return 下一个营业日
     */
//	public static Date getNextWorkday() {
//		return getDate(getWorkday(), 1);
//	}

    /**
     * 获得下一个营业日，格式yyyyMMdd
     *
     * @return 下一个营业日
     */
//	public static String getNextWorkday_YYYYMMDD() {
//		return getTime(getNextWorkday(), "yyyyMMdd");
//	}

    /**
     * 更新营业日
     *
     * @param dt 营业日
     */
    public static void updateWorkday(Date dt) {
//		BusiDate busiDate = new BusiDate();
//		busiDate.setWorkday(dt);
//		BusiDateFactory.getBusiDateService().updateBusiDate(busiDate);
    }

    /**
     * 更新营业日
     *
     * @param sdt 营业日
     */
    public static void updateWorkday(String sdt) {
        updateWorkday(parse(sdt, "yyyyMMdd"));
    }

    /**
     * 更新到下一营业日
     */
//	public static void updateNextWorkday() {
//		updateWorkday(getNextWorkday());
//	}
    public static boolean compartdate(Date d1, Date d2) {

        long due = d1.getTime() + 0 * 24 * 60 * 60 * 1000;
        Long due2 = d2.getTime() + 0 * 24 * 60 * 60 * 1000;
        ;
        if (due > due2) {
            return false;
        }
        return true;
    }
}