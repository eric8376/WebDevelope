package com.microwill.framework.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class DataValidate {

	/**
	 * @param regex
	 *            正则表达式字符串
	 * @param str
	 *            要匹配的字符串
	 * @return 如果str 符合 regex的正则表达式格式,返回true, 否则返回 false;
	 */
	private static boolean match(String regex, String str) {
		if (StringUtils.isEmpty(str)) {
			return false;
		}
		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(str);
		return matcher.matches();
	}

	/**
	 * 验证字符串长度 (6-18位)
	 * 
	 * @param 待验证的字符串
	 * @return 如果是符合格式的字符串,返回 <b>true </b>,否则为 <b>false </b>
	 */
	public static boolean isStringLength(String str, int min, int max) {
		if (StringUtils.isEmpty(str)) {
			return false;
		} else {
			str = str.trim();
			int n = str.length();
			if (n >= min && n <= max) {
				return true;
			} else {
				return false;
			}
		}
	}

	/**
	 * 验证日期时间
	 * 
	 * @param 待验证的字符串
	 * @return 如果是符合网址格式的字符串,返回 <b>true </b>,否则为 <b>false </b>
	 */
	public static boolean isDate(String str) {
		// 严格验证时间格式的(匹配[2002-01-31], [1997-04-30],
		// [2004-01-01])不匹配([2002-01-32], [2003-02-29], [04-01-01])
		// String regex =
		// "^((((19|20)(([02468][048])|([13579][26]))-02-29))|((20[0-9][0-9])|(19[0-9][0-9]))-((((0[1-9])|(1[0-2]))-((0[1-9])|(1//d)|(2[0-8])))|((((0[13578])|(1[02]))-31)|(((01,3-9])|(1[0-2]))-(29|30)))))$";
		// 没加时间验证的YYYY-MM-DD
		// String regex =
		// "^((((1[6-9]|[2-9]//d)//d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]//d|3[01]))|(((1[6-9]|[2-9]//d)//d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]//d|30))|(((1[6-9]|[2-9]//d)//d{2})-0?2-(0?[1-9]|1//d|2[0-8]))|(((1[6-9]|[2-9]//d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$";
		// 加了时间验证的YYYY-MM-DD 00:00:00
		if (StringUtils.isEmpty(str)) {
			return false;
		}
		String regex = "^((((19|20)(([02468][048])|([13579][26]))-02-29))|((20[0-9][0-9])|(19[0-9][0-9]))-((((0[1-9])|(1[0-2]))-((0[1-9])|(1//d)|(2[0-8])))|((((0[13578])|(1[02]))-31)|(((01,3-9])|(1[0-2]))-(29|30)))))$";
		regex = "^[0-9]{4}-[0-9]{2}-[0-9]{2}$";
		return match(regex, str);
	}

	/**
	 * 验证输入n位小数
	 * 
	 * @param 待验证的字符串
	 * @return 如果是符合格式的字符串,返回 <b>true </b>,否则为 <b>false </b>
	 */
	public static boolean isDecimal(String str, int leftmaxSize,
			int rightmaxSize) {
		String regex = "^[0-9]{1," + leftmaxSize + "}+(.[0-9]{1,"
				+ rightmaxSize + "})?$";
		return match(regex, str);
	}

	/**
	 * 验证邮箱
	 * 
	 * @param 待验证的字符串
	 * @return 如果是符合的字符串,返回 <b>true </b>,否则为 <b>false </b>
	 */
	public static boolean isEmail(String str) {
		// String regex =
		// "^([//w-//.]+)@((http://www.ccc.com/yaojian/admin/file://[[0-9]%7b1,3%7d//.[0-9]%7B1,3%7D//.[0-9]%7B1,3%7D//.)%7C(([//w-]+//.)+))([a-zA-Z]%7B2,4%7D%7C[0-9]%7B1,3%7D)(//]?)$";
		String regex = "\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*";
		return match(regex, str);
	}

	/**
	 * 验证字符串是否为数字
	 * 
	 * @param 待验证的字符串
	 * @return 如果是符合的字符串,返回 <b>true </b>,否则为 <b>false </b>
	 */
	public static boolean isNumber(String str) {
		String regex = "-{0,1}\\d{1,99}\\.{0,1}\\d{0,9}";
		return match(regex, str);
	}

	/**
	 * 数字四舍五入并按参数控制小数点位数
	 * 
	 * @param Number待验证的字符串
	 * @param radixPoint小数点位数
	 * @return
	 */
	public static String getFourToFive(String Number, int radixPoint) {
		String point = ".";
		for (int i = 1; i < radixPoint; i++) {
			point = point + "0";
		}
		point = point + "1";
		double bl = (Math.round(Double.parseDouble(Number)
				/ Double.parseDouble(point)) * Double.parseDouble(point));
		String st = String.valueOf(bl);
		st = st.replace(".", "_");
		String[] st_arr = st.split("_");
		String temp = "";
		if (st_arr[1].length() > radixPoint) {
			temp = st_arr[1].substring(0, radixPoint);
		} else if (st_arr[1].length() < radixPoint) {
			temp = st_arr[1] + "0";
		} else {
			temp = st_arr[1];
		}
		return st_arr[0] + "." + temp;
	}

	/**
	 * 校验省份证有效性
	 * 
	 * @param number
	 * @return
	 */
	public static boolean validateIdnumber(String number) {
		// 身份证正则表达式(15位)
		String isIDCard15 = "^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$";
		// 身份证正则表达式(18位)
		String isIDCard18 = "^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|X)$";
		switch (number.length()) {
		case 15:
			return match(isIDCard15, number);
		case 18:
			return match(isIDCard18, number);
		}
		return false;
	}

	/**
	 * 校验手机号码有效性
	 * 
	 * @param telphone
	 * @return
	 */
	public static boolean validatePhone(String telphone) {
//		String phoneRegex = "^([\\+][0-9]{1,3}[ \\.\\-])?([\\(]{1}[0-9]{2,6}[\\)])?([0-9 \\.\\-\\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$";
//		return match(phoneRegex, telphone);
		if(telphone.trim().length()!=11){
			return false;
		}
		String regx ="[0-9]*";
		return match(regx, telphone);
	}
	
	public static boolean validateName(String name){
		String regx = "[\u4E00-\u9FA5]+";
		if(name.length()>10){
			return false;
		}
		return match(regx, name);
	}
}
