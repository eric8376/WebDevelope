package com.microwill.framework.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;



/**
 * 实现有关日期的常用方法
 */
public class DateUtil
{
	/**
	 * 默认日期格式
	 */
	public static final String DEFAULT_DATE_PATTERN = "yyyy-MM-dd";
	
	/**
	 * 默认日期格式
	 */
	public static final String COMMON_DATE_PATTERN = "yyyy/MM/dd";
	
	/**
	 * 默认日期格式
	 */
	public static final String CHN_DATE_PATTERN = "yyyy年MM月dd日";
	
	/**
	 * 仅包含年月的日期式
	 */
	public static final String NO_DELIMITER_YEAR_MONTH_DATE_PATTERN = "yyyyMM";
	
	/**
	 * 仅包含年月的日期式去掉年份前2位
	 */
	public static final String NO_DELIMITER_SUB_YEAR_MONTH_DATE_PATTERN = "yyMM";
	
	
	/**
	 * 无分隔符的日期格式
	 */
	public static final String NO_DELIMITER_DATE_PATTERN = "yyyyMMdd";
	
	/**
	 * 无分隔符的简短年份日期格式
	 */
	public static final String NO_DELIMITER_SHORTYEAR_DATE_PATTERN = "yyMMdd";
	
	/**
	 * 无分隔符的时间格式
	 */
	private static final String NO_DELIMITER_TIME_PATTERN = "HHmmss";
	
	/**
	 * 仅包含年-月的日期式
	 */
	private static final String YEAR_MONTH_DATE_PATTERN = "yyyy-MM";
	
	/**
	 * 默认日期时间格式
	 */
	public static final String DEFAULT_TS_PATTERN = "yyyy-MM-dd HH:mm:ss";
	
	/**
	 * 无分隔符的日期时间格式
	 */
	public static final String NO_DELIMITER_TS_PATTERN = "yyyyMMdd HHmmss";
	/**
     * 比较日期，返回间隔天数
     */
    public static final int COMPARE_DATE_RETURN_DAY = 0;
    public static final int COMPARE_DATE_RETURN_MONTH = 1;
    public static final int COMPARE_DATE_RETURN_YEAR = 2;
    
    /**
     * 存放已经格式化的日期格式辅助类 主要是加快日期格式化的速度，减少日期格式化的对象创建
     */
//    private static final Map<String, SimpleDateFormat> DateFormates = new HashMap<String, SimpleDateFormat>(); //SimpleDateFormat非线程安全
    private static ThreadLocal<Map<String, SimpleDateFormat>> threadLocal = new ThreadLocal<Map<String, SimpleDateFormat>>();
    
    /**
     * 根据开始年月获取满一年的最后一个年月
     * <pre>
     * @功能说明:
     * 根据开始年月获取满一年的最后一个年月
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2013年9月10日
     * 修  改  人: zcguo
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2013年9月10日
     * @param startYearMonth 开始年月
     * @return 满一年的最后一个年月
     */
    public static String getOneYearEndMonth(String startYearMonth) {
    	Date startYearDate = string2Date(startYearMonth+"01", NO_DELIMITER_DATE_PATTERN);
    	Date endDate = addMonth(startYearDate, 11);
    	return date2String(endDate, NO_DELIMITER_YEAR_MONTH_DATE_PATTERN);
    }
    
    /**
     * 获取指定年月(yyyyMM)的接下连续指定月份数的年月月(yyyyMM)
     * <pre>
     * @功能说明:
     * 获取指定年月(yyyyMM)的接下连续指定月份数的年月月(yyyyMM)
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2013年9月22日
     * 修  改  人: zcguo
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2013年9月22日
     * @param yearMonth 年月(格式:yyyyMM)
     * @param size 共要获取月份数
     * @return 下一个月(yyyyMM)
     */
    public static List<String> getYearAfterMonthNoDelimiterList(String yearMonth, int size) {
    	Date startYearDate = string2Date(yearMonth+"01", NO_DELIMITER_DATE_PATTERN);
    	List<String> result = new ArrayList<String>();
    	for (int i=1; i<=size; i++) {
    		Date endDate = addMonth(startYearDate, i);
    		result.add(date2String(endDate, NO_DELIMITER_YEAR_MONTH_DATE_PATTERN));
    	}
    	return result;
    }
    
    /**
     * 获取开始年月与结束年月所有完整年月集合
     * <pre>
     * @功能说明:
     * 获取开始年月与结束年月所有完整年月集合
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2013年9月10日
     * 修  改  人: zcguo
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2013年9月10日
     * @param startYearMonth	开始年月
     * @param endYearMonth		结束年月
     * @return 所有完整年月集合
     */
    public static List<String> getYearMonthList(String startYearMonth, String endYearMonth) {
    	List<String> result = new ArrayList<String>();
    	while (startYearMonth.compareTo(endYearMonth) <= 0) {
    		result.add(startYearMonth);
    		Date startYearDate = string2Date(startYearMonth+"01", NO_DELIMITER_DATE_PATTERN);
        	Date endDate = addMonth(startYearDate, 1);
        	startYearMonth = date2String(endDate, NO_DELIMITER_YEAR_MONTH_DATE_PATTERN);
    	}
    	return result;
    }
    
    /**
     * 格式化日期
     * <pre>
     * @功能说明:
     * 格式化日期
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2013-9-7
     * 修  改  人: kmlin
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2013-9-7
     * @param date
     * @return
     */
    public static String formatDate (Date date) {
    	SimpleDateFormat sdf = new SimpleDateFormat(DEFAULT_DATE_PATTERN);
    	if (null!=date) {
    		return sdf.format(date);
    	} else {
    		return "";
    	}
    	
    }
    
    public static String formatDateCHN (Date date) {
    	SimpleDateFormat sdf = new SimpleDateFormat(CHN_DATE_PATTERN);
    	if (null!=date) {
    		return sdf.format(date);
    	} else {
    		return "";
    	}
    }
    
    public static String formatDateCHN (String date) {
    	Date d = parseDate(date);
    	SimpleDateFormat sdf = new SimpleDateFormat(CHN_DATE_PATTERN);
    	if (null!=d) {
    		return sdf.format(d);
    	} else {
    		return "";
    	}
    }
    
    public static Date formatDateToDate (Date date) {
    	SimpleDateFormat sdf = new SimpleDateFormat(DEFAULT_DATE_PATTERN);
    	if (null!=date) {
    		return string2Date(sdf.format(date),DEFAULT_DATE_PATTERN);
    	} else {
    		return null;
    	}
    	
    }
    
    /**
     * 转换为日期
     * <pre>
     * @功能说明:
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2013-10-9
     * 修  改  人: kmlin
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2013-10-9
     * @param date
     * @return
     */
    public static Date parseDate (String date) {
    	SimpleDateFormat sdf = new SimpleDateFormat(DEFAULT_DATE_PATTERN);
    	if (org.apache.commons.lang3.StringUtils.isNotBlank(date)) {
    		try {
				return sdf.parse(date);
			} catch (ParseException e) {
				e.printStackTrace();
			}
    	} 
		return null;
    }
    
    /**
     * 转换为日期
     * <pre>
     * @功能说明:
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2013-10-9
     * 修  改  人: kmlin
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2013-10-9
     * @param date
     * @return
     */
    public static Date parseDate2 (String date) {
    	SimpleDateFormat sdf = new SimpleDateFormat(NO_DELIMITER_DATE_PATTERN);
    	if (org.apache.commons.lang3.StringUtils.isNotBlank(date)) {
    		try {
				return sdf.parse(date);
			} catch (ParseException e) {
				e.printStackTrace();
			}
    	} 
		return null;
    }
    
    /**
     * 转换为日期
     * <pre>
     * @功能说明:
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2014-05-22
     * 修  改  人: 曹普祥
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2013-10-9
     * @param date
     * @return
     */
    public static Date parseDates(String date) {
        SimpleDateFormat sdf = new SimpleDateFormat(DEFAULT_TS_PATTERN);
        if (org.apache.commons.lang3.StringUtils.isNotBlank(date)) {
            try {
                return sdf.parse(date);
            } catch (ParseException e) {
                e.printStackTrace();
            }
        } 
        return null;
    }
    
    /**
     * 获取当前日期时间
     * <pre>
     * @功能说明:
     * 获取当前日期时间
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2013年7月23日
     * 修  改  人: zcguo
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2013年7月23日
     * @return 获取当前日期时间
     */
	public static Date getNow() {
		return new Date();
	}
	
	/**
	 * 获取当前日期时间，日期时间默认格式：yyyy-MM-dd HH:mm:ss
	 * <pre>
	 * @功能说明:
	 * 获取当前日期时间，日期时间默认格式：yyyy-MM-dd HH:mm:ss
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年7月23日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年7月23日
	 * @return 当前日期时间，日期时间默认格式：yyyy-MM-dd HH:mm:ss
	 */
	public static String getNowString() {
		return date2String(new Date());
	}
	
	/**
	 * 获取今天日期字符串，格式yyyy-MM-dd
	 * <pre>
	 * @功能说明:
	 * 获取今天日期字符串，格式yyyy-MM-dd
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年8月2日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年8月2日
	 * @return 今天日期字符串，格式yyyy-MM-dd
	 */
	public static String getTodayString() {
        Calendar c = Calendar.getInstance();
        Date date = c.getTime();
        SimpleDateFormat simple = new SimpleDateFormat(DEFAULT_DATE_PATTERN);
        return simple.format(date);
    }
	
	/**
	 * 获取今天日期，格式yyyy-MM-dd
	 * <pre>
	 * @功能说明:
	 * 获取今天日期，格式yyyy-MM-dd
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年8月9日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年8月9日
	 * @return 今天日期，格式yyyy-MM-dd
	 */
	public static Date getToday() {
		return string2Date(getTodayString(), DEFAULT_DATE_PATTERN);
    }
	
	/**
	 * 获取今天的日期，格式：yyyyMMdd
	 * <pre>
	 * @功能说明:
	 * 获取今天的日期，格式：yyyyMMdd
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年7月29日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年7月29日
	 * @return 今天的日期,格式：yyyyMMdd
	 */
	public static String getTodayWithNoDelimiter() {
		return date2String(new Date(), NO_DELIMITER_DATE_PATTERN);
	}
	
	public static String getShortTodayWithNoDelimiter() {
		return date2String(new Date(), NO_DELIMITER_YEAR_MONTH_DATE_PATTERN);
	}
	
	public static String getSubShortTodayWithNoDelimiter() {
		return date2String(new Date(), NO_DELIMITER_SUB_YEAR_MONTH_DATE_PATTERN);
	}
	
	/**
	 * 获取今天的日期，格式：yyMMdd
	 * <pre>
	 * @功能说明:
	 * 获取今天的日期，格式：yyMMdd
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年9月23日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年9月23日
	 * @return 今天的日期,格式：yyMMdd
	 */
	public static String getTodayWithNoDelimiterShortYear() {
		return date2String(new Date(), NO_DELIMITER_SHORTYEAR_DATE_PATTERN);
	}
	
	/**
	 * 获取当前时间，格式：HHmmss
	 * <pre>
	 * @功能说明:
	 * 获取当前时间，格式：HHmmss
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年8月23日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年8月23日
	 * @return 当前时间(格式：HHmmss)
	 */
	public static String getNowTimeWithNoDelimiter() {
		return date2String(new Date(), NO_DELIMITER_TIME_PATTERN);
	}
	
	/**
	 * 获取某天的最后时间
	 * <pre>
	 * @功能说明:
	 * 获取某天的最后时间
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年7月26日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年7月26日
	 * @param date
	 * @return 某天的最后时间
	 */
    public static Date getDateLastSecond(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        return calendar.getTime();
    }
    
	/**
	 * 获取源时间相对于参照时间的剩余天数小时描述，格式：剩余X天X小时
	 * <pre>
	 * @功能说明:
	 * 获取源时间相对于参照时间的剩余天数小时描述，格式：剩余X天X小时
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年7月26日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年7月26日
	 * @param ref 参照时间
	 * @param src 源时间
	 * @return 剩余天数小时描述
	 */
    public static String getSurplusDayHourMemo(Date ref, Date src) {
    	long start = ref.getTime();
    	long to = src.getTime();
    	long diff = to - start;
    	if (diff <= 0) {
    		return "";
    	}
    	long day = 24*60*60*1000;
    	long hour = 60*60*1000;
    	Long d = new Long(diff / (day));
    	Long h = new Long((diff % (day)) / hour);
    	return "剩余" + d + "天" + h +"小时";
    }
    
    /**
     * 获取前面时间相对于后边时间的间隔秒数
     * <pre>
     * @功能说明:
     * 获取前面时间相对于后边时间的间隔秒数
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2013年9月22日
     * 修  改  人: zcguo
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2013年9月22日
     * @param src 计算源时间
     * @param ref 参照时间
     * @return 间隔秒数
     */
    public static long getDiffSecond(Date src, Date ref) {
    	long start = ref.getTime();
    	long to = src.getTime();
    	long diff = to - start;
    	return new Long(diff / 1000);
    }
    
    /**
     * 比较2个日期，根据指定的返回类型返回间隔时间（天，月，年），
     * 注意：相隔天数，不受时分秒影响；相隔月数，不受日、时分秒影响；相隔年数，不受月日、时分秒影响
     * <pre>
     * @功能说明:
     * 比较2个日期，根据指定的返回类型返回间隔时间（天，月，年），
     * 注意：相隔天数，不受时分秒影响；相隔月数，不受日、时分秒影响；相隔年数，不受月日、时分秒影响
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2013年8月2日
     * 修  改  人: zcguo
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2013年8月2日
     * @param before 比较日前
     * @param after	 被比较日期
     * @param stype 返回值类型 0为多少天，1为多少个月，2为多少年
     * @return 间隔时间（天，月，年）
     */
    public static int compareDate(String before, String after, int stype) {
    	if (stype == COMPARE_DATE_RETURN_DAY) {
    		return dayBetween(before, after);
    	} else if (stype == COMPARE_DATE_RETURN_MONTH) {
    		return monthBetween(string2Date(before, DEFAULT_DATE_PATTERN), string2Date(after, DEFAULT_DATE_PATTERN));
    	} else if (stype == COMPARE_DATE_RETURN_YEAR) {
    		return yearBetween(string2Date(before, DEFAULT_DATE_PATTERN), string2Date(after, DEFAULT_DATE_PATTERN));
    	} else {
    		throw new IllegalArgumentException("返回值类型非法");
    	}
//        int n = 0;
//        String formatStyle = (stype == 1 ? YEAR_MONTH_DATE_PATTERN : DEFAULT_DATE_PATTERN);
//        after = (after == null ? getTodayString() : after);
//        DateFormat df = new SimpleDateFormat(formatStyle);
//        Calendar c1 = Calendar.getInstance();
//        Calendar c2 = Calendar.getInstance();
//        try {
//            c1.setTime(df.parse(before));
//            c2.setTime(df.parse(after));
//        } catch(Exception e3) {
//        }
//        while(!c1.after(c2)) { 
//            n++;
//            if(stype==1) {
//                c1.add(Calendar.MONTH, 1); // 比较月份，月份+1
//            } else {
//                c1.add(Calendar.DATE, 1); // 比较天数，日期+1
//            }
//        }
//        n = n-1;
//        if(stype==2) {
//            n = (int)n/365;
//        }
//        return n;
    }
    /**
     * 比较2个日期，根据指定的返回类型返回间隔时间（天，月，年），
     * 注意：相隔天数，不受时分秒影响；相隔月数，不受日、时分秒影响；相隔年数，不受月日、时分秒影响
     * <pre>
     * @功能说明:
     * 比较2个日期，根据指定的返回类型返回间隔时间（天，月，年），
     * 注意：相隔天数，不受时分秒影响；相隔月数，不受日、时分秒影响；相隔年数，不受月日、时分秒影响
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2013年8月2日
     * 修  改  人: zcguo
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2013年8月2日
     * @param before 比较日前
     * @param after	 被比较日期
     * @param stype 返回值类型 0为多少天，1为多少个月，2为多少年
     * @return 间隔时间（天，月，年）
     */
    public static int compareDate(Date before, Date after, int stype) {
    	if (stype == COMPARE_DATE_RETURN_DAY) {
    		return dayBetween(before, after);
    	} else if (stype == COMPARE_DATE_RETURN_MONTH) {
    		return monthBetween(before, after);
    	} else if (stype == COMPARE_DATE_RETURN_YEAR) {
    		return yearBetween(before, after);
    	} else {
    		throw new IllegalArgumentException("返回值类型非法");
    	}
//        int n = 0;
//        String formatStyle = (stype == 1 ? YEAR_MONTH_DATE_PATTERN : DEFAULT_DATE_PATTERN);
//        after = (after == null ? new Date() : after);
//        //DateFormat df = new SimpleDateFormat(formatStyle);
//        Calendar c1 = Calendar.getInstance();
//        Calendar c2 = Calendar.getInstance();
//        try {
//        	if (before.before(after)) {
//        		c1.setTime(before);
//        		c2.setTime(after);
//        	} else {
//        		c1.setTime(after);
//        		c2.setTime(before);
//        	}
//        } catch(Exception e3) {
//        }
//        while(!c1.after(c2)) { 
//            n++;
//            if(stype==1) {
//                c1.add(Calendar.MONTH, 1); // 比较月份，月份+1
//            } else {
//                c1.add(Calendar.DATE, 1); // 比较天数，日期+1
//            }
//        }
//        n = n-1;
//        if(stype==2) {
//            n = (int)n/365;
//        }
//        if (!before.before(after)) {
//        	n = 0 - n;
//        }
//        return n;
    }
    
    /**
     * 两个时间差，以秒计算
     * 
     * @param time1
     * @param time2
     * @return
     */
    public static long getDiffMinute(Date time1, Date time2) {
    	try {
    		long minute = 60*1000;
    		return (time1.getTime()-time2.getTime())/minute;
        }
        catch(Exception e) {
            e.printStackTrace();
        }
        return 0;
    }
    
	/**
	 * 判断第一个日期是否比第二个日期早
	 * <pre>
	 * @功能说明:
	 * 判断第一个日期是否比第二个日期早
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年7月18日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年7月18日
	 * @param date1
	 * @param date2
	 * @return true-是 false-否
	 */
	public static boolean before(Date date1, Date date2) {
		return date1.compareTo(date2) < 0;
	}
	
	/**
	 * 判断第一个日期是否比第二个日期早或是同一天
	 * <pre>
	 * @功能说明:
	 * 判断第一个日期是否比第二个日期早或是同一天
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年7月18日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年9月6日
	 * @param date1
	 * @param date2
	 * @return true-是 false-否
	 */
	public static boolean beforeEquals(Date date1, Date date2) {
		return date1.compareTo(date2) <= 0;
	}
	
	/**
	 * 获取指定日期的前一天日期
	 * <pre>
	 * @功能说明:
	 * 获取指定日期的前一天日期
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年7月21日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年7月21日
	 * @param from 源日期
	 * @return 前一天
	 */
	public static Date getYesterday(Date from) {
		return addDay(from, -1);
	}
	
	/**
	 * 日期的天数加法运算
	 * <pre>
	 * @功能说明:
	 * 日期的天数加法运算
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年7月21日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年7月21日
	 * @param date 	源日期
	 * @param n		运算天数(支持负数)
	 * @return 几天前或几天后日期
	 */
	public static Date addDay(Date date, int n) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.DAY_OF_MONTH, n);
		return cal.getTime();
	}
	
	/**
	 * 获取下个月的前一天
	 * <pre>
	 * @功能说明:
	 *  
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年8月9日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年8月9日
	 * @param date 	源日期
	 * @param month	月份数
	 * @return 下个月的前一天
	 */
	public static Date getYestodayAfterMonth(Date date, int month) {
		return addMonth(addDay(date, -1), month);
	}
	
	/**
	 * 日期的月份加法运算
	 * <pre>
	 * @功能说明:
	 * 日期的月份加法运算
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年8月9日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年8月9日
	 * @param date	源日期
	 * @param n		运算月份数(支持负数)
	 * @return 几月前或几月后日期
	 */
    public static Date addMonth(Date date, int n) {
        Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.MONTH, n);
        return cal.getTime();
    }
    
    /**
	 * 日期的年份加法运算
	 * <pre>
	 * @功能说明:
	 * 日期的年份加法运算
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年8月9日
	 * 修  改  人: zhangwei
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年8月9日
	 * @param date	源日期
	 * @param n		运算月份数(支持负数)
	 * @return 几月前或几月后日期
	 */
    public static Date addYear(Date date, int n) {
        Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.YEAR, n);
        return cal.getTime();
    }
    
    /**
     * 获取年份（4位数）
     * @功能说明:
     * 获取年份（4位数）
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2014年7月11日
     * 修  改  人: zcguo
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2014年7月11日
     * @param date
     * @return 年份（4位数）
     */
    public static int getYear(Date date) {
    	Calendar cal = Calendar.getInstance();
		cal.setTime(date);
        return cal.get(Calendar.YEAR);
    }
    
    /**
     * 获取月份(1~12)
     * @功能说明:
     * 获取月份(1~12)
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2014年7月11日
     * 修  改  人: zcguo
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2014年7月11日
     * @param date
     * @return 月份(1~12)
     */
    public static int getMonth(Date date) {
    	Calendar cal = Calendar.getInstance();
		cal.setTime(date);
        return cal.get(Calendar.MONTH)+1;
    }
    
    /**
     * 获取季度(1~4)
     * @功能说明:
     * 获取季度(1~4)
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2014年7月11日
     * 修  改  人: zcguo
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2014年7月11日
     * @param date
     * @return 季度(1~4)
     */
    public static int getSeason(Date date) {
    	int month = getMonth(date);
    	if (month>=1 && month<=3) {
    		return 1;
    	} else if (month>=4 && month<=6) {
    		return 2;
    	} else if (month>=7 && month<=9) {
    		return 3;
    	} else {
    		return 4;
    	}
    }
    
    /**
     * 获取半年(1-上半年 2-下半年)
     * @功能说明:
     * 获取半年(1-上半年 2-下半年)
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2014年7月11日
     * 修  改  人: zcguo
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2014年7月11日
     * @param date
     * @return 半年(1-上半年 2-下半年)
     */
    public static int getHalfYear(Date date) {
    	int month = getMonth(date);
    	if (month>=1 && month<=6) {
    		return 1;
    	} else {
    		return 2;
    	}
    }
	
    /**
     * 日期的分钟加法运算
     * <pre>
     * @功能说明:
     * 日期的分钟加法运算
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2013年9月5日
     * 修  改  人: llk
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2013年9月5日
     * @param date  源日期
     * @param n     运算分钟数(支持负数)
     * @return 几分钟前或几分钟后日期
     */
    public static Date addMinute(Date date, int n) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.MINUTE, n);
        return cal.getTime();
    }
    
    /**
     * 日期的分钟加法运算
     * <pre>
     * @功能说明:
     * 日期的秒加法运算
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2013年9月5日
     * 修  改  人: llk
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2013年9月5日
     * @param date  源日期
     * @param n     运算秒数(支持负数)
     * @return 几分钟前或几分钟后日期
     */
    public static Date addSecond(Date date, int n) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.SECOND, n);
        return cal.getTime();
    }
    
	/**
	 * 获取指定日期凌晨3点整日期时间
	 * <pre>
	 * @功能说明:
	 * getNowString
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年7月23日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年7月23日
	 * @param date 指定日期
	 * @return 指定日期凌晨3点整日期时间
	 */
	public static Date getMidnightThreeToday() {
		String now = getNowString();
		String three = now.substring(0, 10) + " 03:00:00";
		return string2Date(three);
	}
	
	/**
	 * 将指定日期字符串按照指定格式格式化为日期
	 * <pre>
	 * @功能说明:
	 * 将指定日期字符串按照指定格式格式化为日期
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年7月23日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年7月23日
	 * @param date		字符串 日期字符串
	 * @param pattern	日期格式字符串
	 * @return 格式化后的日期. 如果日期字符串为Null或无法格式化则返回Null
	 */
    public static Date string2Date(String date, String pattern) {
        if(date==null) {
            return null;
        }
        try {
            return getDateFormat(pattern).parse(date);
        } catch(ParseException e) {
            return null;
        }
    }

    /**
     * 将指定日期字符串按照默认格式[yyyy-MM-dd HH:mm:ss]格式化为日期
     * <pre>
     * @功能说明:
     * 将指定日期字符串按照默认格式[yyyy-MM-dd HH:mm:ss]格式化为日期
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2013年7月23日
     * 修  改  人: zcguo
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2013年7月23日
     * @param date 日期字符串
     * @return 格式化后的日期. 如果日期字符串为Null或无法格式化则返回Null
     */
    public static Date string2Date(String date) {
        if(date==null) {
            return null;
        }
        try {
            return getDateFormat(null).parse(date);
        } catch(ParseException e) {
            return null;
        }
    }
    
    public static Date getDate(Object date) {
        if(date==null) {
            return null;
        }
        try {
            return java.sql.Date.valueOf(date.toString());
        } catch(Exception e) {
            return null;
        }
    }
    
    /**
     * 将指定日期转换为指定的日期格式的日期字符串
     * <pre>
     * @功能说明:
     * 将指定日期转换为指定的日期格式的日期字符串
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2013年7月23日
     * 修  改  人: zcguo
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2013年7月23日
     * @param date		要标准化的日期
     * @param pattern	日期格式
     * @return 标准化后的日期字符串
     */
    public static String date2String(Date date, String pattern) {
        if(date == null) {
            return null;
        }
        return getDateFormat(pattern).format(date);
    }

    /**
     * 将日期转换为字符串,默认格式为:yyyy-MM-dd HH:mm:ss
     * <pre>
     * @功能说明:
     * 将日期转换为字符串,默认格式为:yyyy-MM-dd HH:mm:ss
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2013年7月23日
     * 修  改  人: zcguo
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2013年7月23日
     * @param date 要标准化的日期
     * @return 标准化后的日期字符串
     */
    public static String date2String(Date date) {
        if(date == null) {
            return null;
        }
        return getDateFormat(null).format(date);
    }

    
    /**
     * 获取指定日期格式字符串的日期格式化辅助类
     * <pre>
     * @功能说明:
     * 获取指定日期格式字符串的日期格式化辅助类
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2013年7月23日
     * 修  改  人: zcguo
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2013年7月23日
     * @param pattern 日期格式字符串
     * @return 日期格式化字符串
     */
    protected static SimpleDateFormat getDateFormat(String pattern) {
        if(pattern==null) {
            pattern = DEFAULT_TS_PATTERN;
        }
        Map<String, SimpleDateFormat> dfMap = (Map<String, SimpleDateFormat>) threadLocal.get();  
        if (dfMap == null) {  
        	dfMap = new HashMap<String, SimpleDateFormat>();
        	dfMap.put(pattern, new SimpleDateFormat(pattern));  
            threadLocal.set(dfMap);
        } else if (dfMap.get(pattern) == null) {
        	dfMap.put(pattern, new SimpleDateFormat(pattern));  
            threadLocal.set(dfMap);
        }
        return dfMap.get(pattern);
//        synchronized(DateFormates) {
//            if(DateFormates.containsKey(pattern)) {
//                return DateFormates.get(pattern);
//            } else {
//                SimpleDateFormat dateFormate = new SimpleDateFormat(pattern);
//                DateFormates.put(pattern, dateFormate);
//                return dateFormate;
//            }
//        }
    }

    /**
     * 获取当前的账期月份.
     * 
     * @return 账期月份
     *         <p>
     *         使用账期年份*100 + 账期月份
     *         </p>
     */
    public static Integer getNowYearMonth()
    {
        Calendar cal = Calendar.getInstance();
        return cal.get(Calendar.YEAR)*100+cal.get(Calendar.MONTH)+1;
    }

    /**
     * 校验指定的账期月份字符串是否有效，如果有效则转换成指定数值。
     * 
     * <pre>
     * 账期月份字符串包含以下情况，则为无效
     * 1.日期在1993年之前
     * 2.账期月份跟当前年月一样，或是当前年月之后的
     * 3.年份在1993之前或是当前所在年份之后
     * 4.月份不是有效的月份日期（01~12）
     * </pre>
     * 
     * @param yearMonth
     *            账期月份字符串，日期格式为yyyyMM
     * @return 如果账期字符串是有效的账期字符串，则计算其账期月份
     *         <p>
     *         使用账期年份*100 + 账期月份
     *         </p>
     */
    public static Integer getCheckYearMonth(String yearMonth)
    {
        try
        {
            if(StringUtils.isAllNumbric(yearMonth))
            {
                int num = Integer.parseInt(yearMonth);
                if(num<=199300)
                {
                    return null;
                }
                Calendar cal = Calendar.getInstance();
                int year = num/100;
                if(year<1993||year>cal.get(Calendar.YEAR))
                {
                    return null;
                }
                int month = num%100;
                if(month<1||month>12)
                {
                    return null;
                }
                if(year==cal.get(Calendar.YEAR)&&month>cal.get(Calendar.MONTH))
                {
                    return null;
                }
                return num;
            }
            else
            {
                return null;
            }
        }
        catch(Exception e)
        {
            return null;
        }
    }

    /**
     * 获取当前时间的毫秒值
     * 
     * @return 当前时间的毫秒值
     */
    public static long getNowTimestamp()
    {
        return new Date().getTime();
    }

    /**
     * 获取指定时间与当前时间的标准化区别
     * 
     * @param datetimeStr
     *            要分析的时间字符串(格式为:yyyy-MM-dd HH:mm)
     * @return 标准化的区别时间
     * 
     *         <pre>
     * 年份不一样					显示完整时间[yyyy年MM月dd日 HH时mm分]
     * 前面都一样,月份不一样			显示完整时间[MM月dd日 HH时mm分]
     * 前面都一样,日期不一样			显示完整时间[dd日 HH时mm分]
     * 前面都一样,小时数不一样		显示完整时间[HH时mm分]
     * 前面都一样,分钟数不一样		显示完整时间[HH时mm分]
     * 前面都一样,秒数不一样			显示完整时间[0秒前]
     * 全部一样(除了毫秒数不一样)		显示[刚刚]
     * </pre>
     */
    public static String getShowDatetimeFormat(String datetimeStr)
    {
        try
        {
            return getShowDatetimeFormat(string2Date(datetimeStr, "yyyy-MM-dd HH:mm"));
        }
        catch(Exception e)
        {
            return datetimeStr;
        }
    }

    /**
     * 获取指定时间与当前时间的标准化区别
     * 
     * @param date
     *            要分析的时间
     * @return 标准化的区别时间
     * 
     *         <pre>
     * 年份不一样					显示完整时间[yyyy年MM月dd日 HH时mm分]
     * 前面都一样,月份不一样			显示完整时间[MM月dd日 HH时mm分]
     * 前面都一样,日期不一样			显示完整时间[dd日 HH时mm分]
     * 前面都一样,小时数不一样		显示完整时间[HH时mm分]
     * 前面都一样,分钟数不一样		显示完整时间[HH时mm分]
     * 前面都一样,秒数不一样			显示完整时间[0秒前]
     * 全部一样(除了毫秒数不一样)		显示[刚刚]
     * </pre>
     */
    public static String getShowDatetimeFormat(Date date)
    {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        Calendar now = Calendar.getInstance();
        if(cal.get(Calendar.YEAR)!=now.get(Calendar.YEAR))
        {
            return date2String(date, "yyyy年MM月dd日 HH时mm分");
        }
        else if(cal.get(Calendar.MONTH)!=now.get(Calendar.MONTH))
        {
            return date2String(date, "MM月dd日 HH时mm分");
        }
        else if(cal.get(Calendar.DAY_OF_MONTH)!=now.get(Calendar.DAY_OF_MONTH))
        {
            return date2String(date, "dd日 HH时mm分");
        }
        else if(cal.get(Calendar.HOUR_OF_DAY)!=now.get(Calendar.HOUR_OF_DAY))
        {
            return date2String(date, "HH时mm分");
        }
        else if(cal.get(Calendar.MINUTE)!=now.get(Calendar.MINUTE))
        {
            return date2String(date, "HH时mm分");
        }
        else if(cal.get(Calendar.SECOND)!=now.get(Calendar.SECOND))
        {
            return now.get(Calendar.SECOND)-cal.get(Calendar.SECOND)+"秒前";
        }
        return "刚刚";
    }

    /**
     * 将传入的日期向前（或向后）滚动|amount|月
     * 
     * @param date
     *            要处理的日期
     * @param amount
     *            要调整的月份
     * 
     *            <pre>
     * 正整数		向后调整指定月份
     * 负整数		向前调整指定月份
     * </pre>
     * @return 调整后的日期
     * @throws NullArgumentException
     *             如果日期参数为空，则抛出该意外
     */
    public static Date rollByMonth(Date date, int amount)
        throws IllegalArgumentException
    {
        if(date==null)
        {
            throw new IllegalArgumentException("参数[date]不能为空");
        }
        if(amount==0)
        {
            return date;
        }
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.MONTH, amount);
        return cal.getTime();
    }

    /**
     * 将传入的日期向前（或向后）滚动|amount|天
     * 
     * @param date
     *            要处理的日期
     * @param amount
     *            要调整的天数
     * 
     *            <pre>
     * 正整数		向后调整指定天数
     * 负整数		向前调整指定天数
     * </pre>
     * @return 调整后的日期
     * @throws NullArgumentException
     *             如果日期参数为空，则抛出该意外
     */
    public static Date rollByDay(Date date, int amount)
        
    {
        if(date==null)
        {
            throw new IllegalArgumentException("参数[date]不能为空");
        }
        if(amount==0)
        {
            return date;
        }
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.DAY_OF_YEAR, amount);
        return cal.getTime();
    }
    
    /**
     * 将传入的日期向前（或向后）滚动|amount|秒
     * 
     * @param date
     *            要处理的日期
     * @param amount
     *            要调整的天数
     * 
     *            <pre>
     * 正整数		向后调整指定天数
     * 负整数		向前调整指定天数
     * </pre>
     * @return 调整后的日期
     * @throws NullArgumentException
     *             如果日期参数为空，则抛出该意外
     */
    public static Date rollBySecond(Date date, int second)
        throws IllegalArgumentException
    {
        if(date==null)
        {
            throw new IllegalArgumentException("参数[date]不能为空");
        }
        if(second==0)
        {
            return date;
        }
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.SECOND, second);
        return cal.getTime();
    }

    /*
     * 计算两个时间相差的月数
     */
    public static int getDiffer(Date begin, Date end)
        throws Exception
    {
    	Calendar cal = Calendar.getInstance();
    	cal.setTime(begin);
        int beginYear = cal.get(Calendar.YEAR);
        int beginMonth = cal.get(Calendar.MONTH);
        cal.setTime(end);
        int endYear = cal.get(Calendar.YEAR);
        int endMonth = cal.get(Calendar.MONTH);
        int difMonth = (endYear-beginYear)*12+(endMonth-beginMonth);

        return difMonth;
    }

    /**
     * 获取某天的最开始时间
     * 
     * @param date
     * @return
     */
    public static Date getDateFirstSecond(Date date)
    {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        return calendar.getTime();
    }
    
    /*
     * 计算两个时间相差的天数数
     */
    public static int getDifferDay(Date begin, Date end) {
    	long start = begin.getTime();
    	long to = end.getTime();
    	if(start <= to)
    		return -1;
    	
    	long diff = to - start;
    	Long d = new Long(diff / (24*60*60*1000));
    	return d.intValue();
    }

    public static boolean isInMonth(Date expireDate)
    {
        try
        {
           if(null == expireDate)
               return false;
           Integer pre = Integer.valueOf(date2String(rollByMonth(expireDate, -1), "yyyyMMdd"));
           Integer now = Integer.valueOf(date2String(new Date(), "yyyyMMdd"));
           Integer expired = Integer.valueOf(date2String(expireDate, "yyyyMMdd"));
           if(pre< now && now < expired)
               return true;
        }
        catch(Exception e)
        {
            return false;
        }
        return false;
    }
    /**
     * 两个时间差，以秒计算
     * 
     * @param time1
     * @param time2
     * @return
     */
    public static long getTimeSS(String time1, String time2)
    {
        try
        {
            return (string2Date(time2).getTime()-string2Date(time1).getTime())/1000;
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
        return 0;
    }

    /**
     * @param mins
     * 				    秒
     * @return
     */
    public static String getTimeByMin(long mins){
    	String result = "";
    	if(mins != 0){
    		long hour = mins / (60 * 60);
    		long minute = (mins - hour * 60 * 60 ) / (60);
    		long second = (mins - hour * 60 * 60 - minute * 60) ;
    		if (second >= 60) {
    			second = second % 60;
    			minute += second / 60;
    		}
    		if (minute >= 60) {
    			minute = minute % 60;
    			hour += minute / 60;
    		}
    		if(hour != 0){
    			result +=hour + "小时";
    		}
    		if(minute != 0){
    			result += minute + "分";
    		}
    		if(second != 0){
    			result += second + "秒 ";
    		}
    	}else{
    		result ="0小时0分0秒";
    	}
    	return result;
    }
    
    /**
     * 从起始日期计算间隔期限得到的天数（比如从今天开始算，间隔2个月后，这两个月是多少天）
     * <pre>
     * @功能说明:
     * 从起始日期计算间隔期限得到的天数
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2013-8-12
     * 修  改  人: kmlin
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2013-8-12
     * @param fromDate 起始日期
     * @param timelimit 期限
     * @param timelimitunit 期限单位  d-天  m-月
     * @return
     */
    public static int getDaysByTimeLimit(Date fromDate,int timelimit,String timelimitunit) {
    	Date toDate = null;
    	if ("d".equals(timelimitunit)) {
    		toDate = addDay(fromDate, timelimit);
    	} else if  ("m".equals(timelimitunit)) {
    		toDate = addMonth(fromDate, timelimit);
    	}
    	SimpleDateFormat sdf = new SimpleDateFormat(DEFAULT_DATE_PATTERN);
    	return compareDate(sdf.format(fromDate), sdf.format(toDate), 0);
    }
    
    /**
     * 根据当前日期，获取上个月的第一天日期
     * <pre>
     * @功能说明:
     * 根据当前日期，获取上个月的第一天日期
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2013年9月5日
     * 修  改  人: hcx
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2013年8月19日
     * @return 
     */
    public static Date getLastMonthFirstDate() {
		Calendar cal = Calendar.getInstance();
		//cal.setTime(DateUtil.getNow());
		cal.add(Calendar.MONTH, -1);
		cal.set(Calendar.DAY_OF_MONTH, 1);
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		return cal.getTime();
	}
    
    /**
     * 根据当前日期，获取上个月的第一天日期
     * <pre>
     * @功能说明:
     * 根据当前日期，获取上个月的第一天日期
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2013年9月5日
     * 修  改  人: hcx
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2013年8月19日
     * @return 
     */
    public static Date getCurrentMonthFirstDate() {
		Calendar cal = Calendar.getInstance();
		//cal.setTime(DateUtil.getNow());
		cal.set(Calendar.DAY_OF_MONTH, 1);
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		return cal.getTime();
	}
	
    /**
     * 根据当前日期，获取上个月的第一天日期
     * <pre>
     * @功能说明:
     * 根据当前日期，获取上个月的第一天日期
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2013年9月5日
     * 修  改  人: hcx
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2013年8月19日
     * @return 
     */
    public static Date getLastMonthFirstDate(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.MONTH, -1);
		cal.set(Calendar.DAY_OF_MONTH, 1);
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		return cal.getTime();
	}
    
    /**
     * 根据当前日期，获取上个月最后一天的日期
     * <pre>
     * @功能说明:
     * ...................
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2013年9月5日
     * 修  改  人: hcx
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2013年8月19日
     * @return
     */
    public static Date getLastMonthLastDate() {
		Calendar cal = Calendar.getInstance();
		cal.setTime(DateUtil.getNow());
		cal.set(Calendar.DAY_OF_MONTH, 1);
		cal.add(Calendar.DATE, -1);
		cal.set(Calendar.HOUR_OF_DAY, 23);
		cal.set(Calendar.MINUTE, 59);
		cal.set(Calendar.SECOND, 59);
		return cal.getTime();
	}
    
    /**
     * 根据当前日期，获取上个月最后一天的日期
     * <pre>
     * @功能说明:
     * ...................
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2013年9月5日
     * 修  改  人: hcx
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2013年8月19日
     * @return
     */
    public static Date getLastMonthLastDate(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.DAY_OF_MONTH, 1);
		cal.add(Calendar.DATE, -1);
		cal.set(Calendar.HOUR_OF_DAY, 23);
		cal.set(Calendar.MINUTE, 59);
		cal.set(Calendar.SECOND, 59);
		return cal.getTime();
	}
    
    /**
     * 获取指定日期的上一季度的最后时间
     * @功能说明:
     * 获取指定日期的上一季度的最后时间
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2014年7月10日
     * 修  改  人: zcguo
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2014年7月10日
     * @param date
     * @return 上一季度的最后时间
     */
    public static Date getLastSeasonLastDate(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		int currentMonth = cal.get(Calendar.MONTH) + 1;
        if (currentMonth >= 1 && currentMonth <= 3) {
        	cal.add(Calendar.YEAR, -1);
        	cal.set(Calendar.MONTH, 11);
        	cal.set(Calendar.DATE, 31);
        } else if (currentMonth >= 4 && currentMonth <= 6) {
        	cal.set(Calendar.MONTH, 2);
        	cal.set(Calendar.DATE, 31);
        } else if (currentMonth >= 7 && currentMonth <= 9) {
        	cal.set(Calendar.MONTH, 5);
        	cal.set(Calendar.DATE, 30);
        } else if (currentMonth >= 10 && currentMonth <= 12) {
        	cal.set(Calendar.MONTH, 8);
        	cal.set(Calendar.DATE, 30);
        }
        cal.set(Calendar.HOUR_OF_DAY, 23);
		cal.set(Calendar.MINUTE, 59);
		cal.set(Calendar.SECOND, 59);
		return cal.getTime();
	}
    
    /**
     * 获取指定日期的上一半年的最后时间
     * @功能说明:
     * 获取指定日期的上一半年的最后时间
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2014年7月10日
     * 修  改  人: zcguo
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2014年7月10日
     * @param date
     * @return 上一半年的最后时间
     */
    public static Date getLastHalfYearLastDate(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		int currentMonth = cal.get(Calendar.MONTH) + 1;
        if (currentMonth >= 1 && currentMonth <= 6) {
        	cal.add(Calendar.YEAR, -1);
        	cal.set(Calendar.MONTH, 11);
        	cal.set(Calendar.DATE, 31);
        } else {
        	cal.set(Calendar.MONTH, 5);
        	cal.set(Calendar.DATE, 30);
        }
        cal.set(Calendar.HOUR_OF_DAY, 23);
		cal.set(Calendar.MINUTE, 59);
		cal.set(Calendar.SECOND, 59);
		return cal.getTime();
	}
    
    /**
     * 获取指定日期的上一年的最后时间
     * @功能说明:
     * 获取指定日期的上一年的最后时间
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2014年7月10日
     * 修  改  人: zcguo
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2014年7月10日
     * @param date
     * @return 上一年的最后时间
     */
    public static Date getLastYearLastDate(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.YEAR, -1);
    	cal.set(Calendar.MONTH, 11);
    	cal.set(Calendar.DATE, 31);
        cal.set(Calendar.HOUR_OF_DAY, 23);
		cal.set(Calendar.MINUTE, 59);
		cal.set(Calendar.SECOND, 59);
		return cal.getTime();
	}
    
    /**
     * 获取指定年月的起始时间
     * @功能说明:
     * 获取指定年月的起始时间
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2014年7月10日
     * 修  改  人: zcguo
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2014年7月10日
     * @param year	年份(4位)
     * @param idx	月份
     * @return 年月的起始时间
     */
    public static Date getMonthFirstDate(int year, int idx) {
    	String sYear = String.valueOf(year);
    	String sIdx = String.valueOf(idx);
    	if (sYear.length() != 4 || idx < 1 || idx > 12) {
    		return null;
    	}
    	StringBuffer dateStr = new StringBuffer(50);
    	dateStr.append(sYear).append("-").append(StringUtils.extendStrLeftWithZero(sIdx, 2)).append("-01 00:00:00");
    	return DateUtil.string2Date(dateStr.toString(), DateUtil.DEFAULT_TS_PATTERN);
    }
    
    /**
     * 获取指定年月的终止时间
     * @功能说明:
     * 获取指定年月的终止时间
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2014年7月10日
     * 修  改  人: zcguo
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2014年7月10日
     * @param year	年份(4位)
     * @param idx	月份
     * @return 年月的终止时间
     */
    public static Date getMonthLastDate(int year, int idx) {
    	String sYear = String.valueOf(year);
    	if (sYear.length() != 4 || idx < 1 || idx > 12) {
    		return null;
    	}
    	Calendar cal = Calendar.getInstance();     
        cal.set(Calendar.YEAR, year);     
        cal.set(Calendar.MONTH, idx-1);     
        cal.set(Calendar.DAY_OF_MONTH,cal.getActualMaximum(Calendar.DATE));
        cal.set(Calendar.HOUR_OF_DAY, 23);
		cal.set(Calendar.MINUTE, 59);
		cal.set(Calendar.SECOND, 59);
        return cal.getTime();
    }
    
    /**
     * 获取指定年份指定季度的起始时间
     * @功能说明:
     * 获取指定年份指定季度的起始时间
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2014年7月10日
     * 修  改  人: zcguo
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2014年7月10日
     * @param year	年份(4位)
     * @param idx	季度(1,2,3,4)
     * @return 指定年份指定季度的起始时间
     */
    public static Date getSeasonFirstDate(int year, int idx) {
    	String sYear = String.valueOf(year);
    	if (sYear.length() != 4 || idx < 1 || idx > 4) {
    		return null;
    	}
    	StringBuffer dateStr = new StringBuffer(50);
    	dateStr.append(sYear);
    	if (idx == 1) {	//1季度
    		dateStr.append("-").append("01-01 00:00:00");
    	} else if (idx == 2) {	//2季度
    		dateStr.append("-").append("04-01 00:00:00");
    	} else if (idx == 3) {	//3季度
    		dateStr.append("-").append("07-01 00:00:00");
    	} else {	//4季度
    		dateStr.append("-").append("10-01 00:00:00");
    	}
    	return DateUtil.string2Date(dateStr.toString(), DateUtil.DEFAULT_TS_PATTERN);
    }
    
    /**
     * 获取指定年份指定季度的终止时间
     * @功能说明:
     * 获取指定年份指定季度的终止时间
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2014年7月10日
     * 修  改  人: zcguo
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2014年7月10日
     * @param year	年份(4位)
     * @param idx	季度(1,2,3,4)
     * @return 指定年份指定季度的终止时间
     */
    public static Date getSeasonLastDate(int year, int idx) {
    	String sYear = String.valueOf(year);
    	if (sYear.length() != 4 || idx < 1 || idx > 4) {
    		return null;
    	}
    	StringBuffer dateStr = new StringBuffer(50);
    	dateStr.append(sYear);
    	if (idx == 1) {	//1季度
    		dateStr.append("-").append("03-31 23:59:59");
    	} else if (idx == 2) {	//2季度
    		dateStr.append("-").append("06-30 23:59:59");
    	} else if (idx == 3) {	//3季度
    		dateStr.append("-").append("09-30 23:59:59");
    	} else {	//4季度
    		dateStr.append("-").append("12-31 23:59:59");
    	}
    	return DateUtil.string2Date(dateStr.toString(), DateUtil.DEFAULT_TS_PATTERN);
    }
    
    /**
     * 获取指定年份指定半年的起始时间
     * @功能说明:
     * 获取指定年份指定半年的起始时间
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2014年7月10日
     * 修  改  人: zcguo
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2014年7月10日
     * @param year	年份(4位)
     * @param idx	季度(1,2)
     * @return 指定年份指定半年的起始时间
     */
    public static Date getHalfYearFirstDate(int year, int idx) {
    	String sYear = String.valueOf(year);
    	if (sYear.length() != 4 || idx < 1 || idx > 2) {
    		return null;
    	}
    	StringBuffer dateStr = new StringBuffer(50);
    	dateStr.append(sYear);
    	if (idx == 1) {	//上半年
    		dateStr.append("-").append("01-01 00:00:00");
    	} else {	//下半年
    		dateStr.append("-").append("07-01 00:00:00");
    	}
    	return DateUtil.string2Date(dateStr.toString(), DateUtil.DEFAULT_TS_PATTERN);
    }
    
    /**
     * 获取指定年份指定半年的终止时间
     * @功能说明:
     * 获取指定年份指定半年的终止时间
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2014年7月10日
     * 修  改  人: zcguo
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2014年7月10日
     * @param year	年份(4位)
     * @param idx	季度(1,2)
     * @return 指定年份指定半年的终止时间
     */
    public static Date getHalfYearLastDate(int year, int idx) {
    	String sYear = String.valueOf(year);
    	if (sYear.length() != 4 || idx < 1 || idx > 2) {
    		return null;
    	}
    	StringBuffer dateStr = new StringBuffer(50);
    	dateStr.append(sYear);
    	if (idx == 1) {	//上半年
    		dateStr.append("-").append("06-30 23:59:59");
    	} else {	//下半年
    		dateStr.append("-").append("12-31 23:59:59");
    	}
    	return DateUtil.string2Date(dateStr.toString(), DateUtil.DEFAULT_TS_PATTERN);
    }
    
    /**
     * 获取指定年份的起始时间
     * @功能说明:
     * 获取指定年份的起始时间
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2014年7月10日
     * 修  改  人: zcguo
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2014年7月10日
     * @param year	年份(4位)
     * @param idx	季度(1,2)
     * @return 指定年份的起始时间
     */
    public static Date getYearFirstDate(int year) {
    	String sYear = String.valueOf(year);
    	if (sYear.length() != 4) {
    		return null;
    	}
    	return DateUtil.string2Date(sYear+"-01-01 00:00:00", DateUtil.DEFAULT_TS_PATTERN);
    }
    
    /**
     * 获取指定年份的终止时间
     * @功能说明:
     * 获取指定年份的终止时间
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2014年7月10日
     * 修  改  人: zcguo
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2014年7月10日
     * @param year	年份(4位)
     * @param idx	季度(1,2)
     * @return 指定年份的终止时间
     */
    public static Date getYearLastDate(int year) {
    	String sYear = String.valueOf(year);
    	if (sYear.length() != 4) {
    		return null;
    	}
    	return DateUtil.string2Date(sYear+"-12-31 23:59:59", DateUtil.DEFAULT_TS_PATTERN);
    }
	
    /**
     * 上个月yyyy-MM
     * <pre>
     * @功能说明:
     * ...................
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2013年8月19日
     * 修  改  人: zhangwei
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2013年8月19日
     * @return
     */
    public static String getLastMonth() {
		Calendar cal = Calendar.getInstance();
		cal.setTime(DateUtil.getNow());
		cal.add(Calendar.MONTH, -1);
		return getDateFormat(YEAR_MONTH_DATE_PATTERN).format(cal.getTime());
    }
    
    /**
     * 上个月yyyy-MM
     * <pre>
     * @功能说明:
     * ...................
     * @版本更新列表
     * 修改版本: 1.0.0
     * 修改日期: 2013年8月19日
     * 修  改  人: zhangwei
     * 修改说明: 形成初始版本
     * 复  审  人:
     * </pre>
     * @date 2013年8月19日
     * @return
     */
    public static String getCurrentMonth() {
		Calendar cal = Calendar.getInstance();
		cal.setTime(DateUtil.getNow());
		return getDateFormat(YEAR_MONTH_DATE_PATTERN).format(cal.getTime());
    }
    
    public static Date getYesterday() {
    	Calendar cal = Calendar.getInstance();
    	cal.add(Calendar.DATE,-1);
    	return cal.getTime();
    }
    /**
     * 获取某个小时内的晚时间,精确到秒
     * 例如：14:00:00 取的最大值为14:59:59
     * 
     * @param date 2013-10-12
     * @return Date
     */
    public static Date getHourLastSecond(Date date)
    {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        return calendar.getTime();
    }
    
    /**
     * 根据当前日期获取前第几个月日期yyyyMM
     * -1为当前月份的上一个月
     * @date 2014-3-31
     * @param month 
     * @return
     */
    public static String getLastMonthByMonth(int month, Date date) {
  		Calendar cal = Calendar.getInstance();
  		cal.setTime(date);
  		cal.add(Calendar.MONTH, month);
  		return getDateFormat(NO_DELIMITER_YEAR_MONTH_DATE_PATTERN).format(cal.getTime());
      }
    
    /**
     * 格式化日期为yyyyMM
     * @date 2014-3-31
     * @param date 
     * @return
     */
    public static String formatDateToyyyyMM(Date date){
    	SimpleDateFormat sdf = new SimpleDateFormat(NO_DELIMITER_YEAR_MONTH_DATE_PATTERN);
    	if (null!=date) {
    		return sdf.format(date);
    	} else {
    		return sdf.format(DateUtil.getNow());
    	}
    }
    
   
    
    /**
     * 从日期字符串中获取年份
     */
    public static int getYearFromDateStr(String dateStr,String formatStr){
    	DateFormat dd=new SimpleDateFormat(formatStr==null?"yyyy-MM-dd":formatStr);
    	Date date=null;
    	int year=0;
		try {
			if(dateStr!=null&&!"".equals(dateStr)){
				date = dd.parse(dateStr);
				year=date.getYear();
    		}else{
    			year=0;
    		}
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		return year;
    }
	
	/**
	 * 判断某天的最晚时间,精确到秒
	 * <pre>
	 * @功能说明:
	 * 获取某天的最后时间
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年10月12日
	 * 修  改  人: hcx
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年10月12日
	 * @param date
	 * @return 判断某天的最晚时间,精确到秒
	 */
    public static boolean isDateLastSecond(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
		if(calendar.get(Calendar.HOUR_OF_DAY)==23&&calendar.get(Calendar.MINUTE)==59&&calendar.get(Calendar.SECOND)==59){
			 return true;
		}
		return false;
    }
    
	/**
	 * 获取日期对应月份的天数
	 * <pre>
	 * @功能说明:
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013-10-16
	 * 修  改  人: kmlin
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013-10-16
	 * @param date
	 * @return
	 */
	public static int getDaysOfMonth(Date date) {
		Calendar a = Calendar.getInstance();
		a.setTime(date);
		return a.getActualMaximum(Calendar.DAY_OF_MONTH);
	}

	
	public static boolean isValidDate(String sDate) {  
		 String datePattern1 = "^((\\d{2}(([02468][048])|([13579][26]))"  
	             + "[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|"  
	             + "(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?"  
	             + "((0?[1-9])|([1-2][0-9])))))|(\\d{2}(([02468][1235679])|([13579][01345789]))[\\-\\/\\s]?("  
	             + "(((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?"  
	             + "((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))";  //格式：2013-02-23
		 
	     String datePattern2 = "^((\\d{2}(([02468][048])|([13579][26]))"  
	             + "[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|"  
	             + "(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?"  
	             + "((0?[1-9])|([1-2][0-9])))))|(\\d{2}(([02468][1235679])|([13579][01345789]))[\\-\\/\\s]?("  
	             + "(((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?"  
	             + "((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))"
	            +" ((\\d|[0-1]\\d|2[0-3]):[0-5]\\d:[0-5]\\d)";  //格式：2013-02-23 19：23：38  2013-02-23 9：23：38
	     
	     if (org.apache.commons.lang3.StringUtils.isNotEmpty(sDate)){
	     if(sDate.matches(datePattern1)||sDate.matches(datePattern2)){
	    	 return true;
	     }else{
	    	 return false;
	     }
	     }else{
	    	 return false;
	     }
	}
	
	/**
	 * 计算2个日期之间的相差天数（不受时分秒影响）
	 * <pre>
	 * @功能说明:
	 * 计算2个日期之间的相差天数（不受时分秒影响）
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2014年6月18日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2014年6月18日
	 * @param before 前面日期
	 * @param after  后面日期
	 * @return 相差天数
	 */
	public static int dayBetween(Date before,Date after){
        before=DateUtil.formatDateToDate(before);
        after=DateUtil.formatDateToDate(after);
        Calendar cal = Calendar.getInstance();
        cal.setTime(before);
        long time1 = cal.getTimeInMillis();
        cal.setTime(after);
        long time2 = cal.getTimeInMillis();
        long between_days=(time2-time1)/(1000*3600*24);
        return Integer.parseInt(String.valueOf(between_days));
    }
	
	/**
	 * 计算2个日期之间的相差天数（不受时分秒影响）
	 * <pre>
	 * @功能说明:
	 * 计算2个日期之间的相差天数（不受时分秒影响）
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2014年6月18日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2014年6月18日
	 * @param before 前面日期
	 * @param after  后面日期
	 * @return 相差天数
	 */
	public static int dayBetween(String before,String after){
        Calendar cal = Calendar.getInstance();
        cal.setTime(DateUtil.string2Date(before, DateUtil.DEFAULT_DATE_PATTERN));
        long time1 = cal.getTimeInMillis();
        cal.setTime(DateUtil.string2Date(after, DateUtil.DEFAULT_DATE_PATTERN));
        long time2 = cal.getTimeInMillis();
        long between_days=(time2-time1)/(1000*3600*24);
        return Integer.parseInt(String.valueOf(between_days));
    }
	
	/**
	 * 计算2个日期之间的相差月数（不受日、时分秒影响）
	 * <pre>
	 * @功能说明:
	 * 计算2个日期之间的相差月数（不受日、时分秒影响）
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2014年6月18日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2014年6月18日
	 * @param before 前面日期
	 * @param after  后面日期
	 * @return 相差月数
	 */
	public static int monthBetween(Date before,Date after){
        Calendar calBefore = Calendar.getInstance();
        calBefore.setTime(before);
        Calendar calAfter = Calendar.getInstance();
        calAfter.setTime(after);
        return (calAfter.get(Calendar.YEAR) - calBefore.get(Calendar.YEAR)) * 12 
        		+ calAfter.get(Calendar.MONTH) - calBefore.get(Calendar.MONTH);
    }
	
	/**
	 * 计算2个日期之间的相差年数（不受月日、时分秒影响）
	 * <pre>
	 * @功能说明:
	 * 计算2个日期之间的相差年数（不受月日、时分秒影响）
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2014年6月18日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2014年6月18日
	 * @param before 前面日期
	 * @param after  后面日期
	 * @return 相差年数
	 */
	public static int yearBetween(Date before,Date after)   
    {    
        Calendar calBefore = Calendar.getInstance();    
        calBefore.setTime(before);    
        Calendar calAfter = Calendar.getInstance();    
        calAfter.setTime(after);   
            
       return calAfter.get(Calendar.YEAR)-calBefore.get(Calendar.YEAR);           
    }
	
	/**
	 * 获取某个日期的星期几
	 * <pre>
	 * @功能说明:
	 * 获取某个日期的星期几
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2014年6月18日
	 * 修  改  人: zhoujun
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2014年6月18日
	 * @param date 前面日期
	 * @return 星期几
	 */
    public static String getWeek(Date date){  
        String[] weeks = {"周日","周一","周二","周三","周四","周五","周六"};  
        Calendar cal = Calendar.getInstance();  
        cal.setTime(date);  
        int week_index = cal.get(Calendar.DAY_OF_WEEK) - 1;  
        if(week_index<0){  
            week_index = 0;  
        }   
        return weeks[week_index];  
    }  
	
	public static void main(String[] args) {
		System.out.println(DateUtil.compareDate(DateUtil.string2Date("2014-06-07 23:00:19", DateUtil.DEFAULT_TS_PATTERN), DateUtil.getNow(), DateUtil.COMPARE_DATE_RETURN_DAY));
		System.out.println(DateUtil.compareDate(DateUtil.getNow(), DateUtil.string2Date("2014-06-07 23:00:19", DateUtil.DEFAULT_TS_PATTERN), DateUtil.COMPARE_DATE_RETURN_DAY));
		System.out.println(DateUtil.compareDate(DateUtil.string2Date("2015-02-18 12:00:19", DateUtil.DEFAULT_TS_PATTERN), DateUtil.getNow(), DateUtil.COMPARE_DATE_RETURN_MONTH));
		System.out.println(DateUtil.compareDate(DateUtil.getNow(), DateUtil.string2Date("2015-02-18 12:00:19", DateUtil.DEFAULT_TS_PATTERN), DateUtil.COMPARE_DATE_RETURN_MONTH));
		System.out.println(DateUtil.compareDate(DateUtil.string2Date("1999-05-18 12:00:19", DateUtil.DEFAULT_TS_PATTERN), DateUtil.getNow(), DateUtil.COMPARE_DATE_RETURN_YEAR));
		System.out.println(DateUtil.compareDate(DateUtil.getNow(), DateUtil.string2Date("1999-05-18 12:00:19", DateUtil.DEFAULT_TS_PATTERN), DateUtil.COMPARE_DATE_RETURN_YEAR));
		System.out.println("=======================");
		System.out.println(DateUtil.compareDate("2014-06-07 23:00:19.44", "2014-06-18 11:18:19.45", DateUtil.COMPARE_DATE_RETURN_DAY));
		System.out.println(DateUtil.compareDate("2014-06-18 11:18:19.44", "2014-06-07 23:00:19.45", DateUtil.COMPARE_DATE_RETURN_DAY));
		System.out.println(DateUtil.compareDate("2015-02-18 12:00:19.44", "2014-06-18 11:18:19.45", DateUtil.COMPARE_DATE_RETURN_MONTH));
		System.out.println(DateUtil.compareDate("2014-06-18 11:18:19.44", "2015-02-18 12:00:19.45", DateUtil.COMPARE_DATE_RETURN_MONTH));
		System.out.println(DateUtil.compareDate("1999-05-18 12:00:19.44", "2014-06-18 11:18:19.45", DateUtil.COMPARE_DATE_RETURN_YEAR));
		System.out.println(DateUtil.compareDate("2014-06-18 11:18:19.44", "1999-05-18 12:00:19.45", DateUtil.COMPARE_DATE_RETURN_YEAR));
		System.out.println("=======================");
		System.out.println(DateUtil.compareDate("2014-06-07", "2014-06-18", DateUtil.COMPARE_DATE_RETURN_DAY));
		System.out.println(DateUtil.compareDate("2014-06-18", "2014-06-07", DateUtil.COMPARE_DATE_RETURN_DAY));
		System.out.println(DateUtil.compareDate("2015-02-18", "2014-06-18", DateUtil.COMPARE_DATE_RETURN_MONTH));
		System.out.println(DateUtil.compareDate("2014-06-18", "2015-02-18", DateUtil.COMPARE_DATE_RETURN_MONTH));
		System.out.println(DateUtil.compareDate("1999-05-18", "2014-06-18", DateUtil.COMPARE_DATE_RETURN_YEAR));
		System.out.println(DateUtil.compareDate("2014-06-18", "1999-05-18", DateUtil.COMPARE_DATE_RETURN_YEAR));
		System.out.println("=======================");
		System.out.println(DateUtil.compareDate("2014-06-07", "2014-06-18", DateUtil.COMPARE_DATE_RETURN_DAY));
		System.out.println(DateUtil.compareDate("2014-06-18", "2014-06-07", DateUtil.COMPARE_DATE_RETURN_DAY));
		System.out.println(DateUtil.compareDate("2015-02-18", "2014-06-18", DateUtil.COMPARE_DATE_RETURN_MONTH));
		System.out.println(DateUtil.compareDate("2014-06-18", "2015-02-18", DateUtil.COMPARE_DATE_RETURN_MONTH));
		System.out.println(DateUtil.compareDate("1999-05-18", "2014-06-18", DateUtil.COMPARE_DATE_RETURN_YEAR));
		System.out.println(DateUtil.compareDate("2014-06-18", "1999-05-18", DateUtil.COMPARE_DATE_RETURN_YEAR));
		
		Calendar cal = Calendar.getInstance();
		System.out.println(cal.get(Calendar.YEAR));
		cal.set(Calendar.YEAR, 2015);
		System.out.println(cal.get(Calendar.YEAR));
		
		System.out.println(DateUtil.date2String(DateUtil.getMonthFirstDate(2014, 4), DateUtil.DEFAULT_TS_PATTERN));
		System.out.println(DateUtil.date2String(DateUtil.getMonthLastDate(2014, 4), DateUtil.DEFAULT_TS_PATTERN));
		System.out.println(DateUtil.date2String(DateUtil.getSeasonFirstDate(2014, 4), DateUtil.DEFAULT_TS_PATTERN));
		System.out.println(DateUtil.date2String(DateUtil.getSeasonLastDate(2014, 4), DateUtil.DEFAULT_TS_PATTERN));
		System.out.println(DateUtil.date2String(DateUtil.getHalfYearFirstDate(2014, 4), DateUtil.DEFAULT_TS_PATTERN));
		System.out.println(DateUtil.date2String(DateUtil.getHalfYearLastDate(2014, 4), DateUtil.DEFAULT_TS_PATTERN));
		System.out.println(DateUtil.date2String(DateUtil.getYearFirstDate(2014), DateUtil.DEFAULT_TS_PATTERN));
		System.out.println(DateUtil.date2String(DateUtil.getYearLastDate(2014), DateUtil.DEFAULT_TS_PATTERN));
		
		System.out.println(DateUtil.date2String(DateUtil.getLastMonthLastDate(DateUtil.string2Date("2014-12-18 12:00:19", DateUtil.DEFAULT_TS_PATTERN)), DateUtil.DEFAULT_TS_PATTERN));
		System.out.println(DateUtil.date2String(DateUtil.getLastSeasonLastDate(DateUtil.string2Date("2014-05-18 12:00:19", DateUtil.DEFAULT_TS_PATTERN)), DateUtil.DEFAULT_TS_PATTERN));
		System.out.println(DateUtil.date2String(DateUtil.getLastHalfYearLastDate(DateUtil.string2Date("2014-09-18 12:00:19", DateUtil.DEFAULT_TS_PATTERN)), DateUtil.DEFAULT_TS_PATTERN));
		System.out.println(DateUtil.date2String(DateUtil.getLastYearLastDate(DateUtil.string2Date("2014-04-18 12:00:19", DateUtil.DEFAULT_TS_PATTERN)), DateUtil.DEFAULT_TS_PATTERN));
//		System.out.println(DateUtil.dayBetween(DateUtil.getNow(), DateUtil.string2Date("2014-06-07 23:00:19", DateUtil.DEFAULT_TS_PATTERN)));
//		System.out.println(DateUtil.monthBetween(DateUtil.getNow(), DateUtil.string2Date("2013-03-07 23:00:19", DateUtil.DEFAULT_TS_PATTERN)));
//		System.out.println(DateUtil.monthBetween(DateUtil.string2Date("2013-03-07 23:00:19", DateUtil.DEFAULT_TS_PATTERN), DateUtil.string2Date("2014-02-28 23:00:19", DateUtil.DEFAULT_TS_PATTERN)));
//		System.out.println(DateUtil.yearBetween(DateUtil.string2Date("2013-03-07 23:00:19", DateUtil.DEFAULT_TS_PATTERN), DateUtil.string2Date("2014-02-28 23:00:19", DateUtil.DEFAULT_TS_PATTERN)));
	}

}
