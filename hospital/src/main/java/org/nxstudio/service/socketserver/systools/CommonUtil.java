/*
 * Created on 2006-1-2
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package org.nxstudio.service.socketserver.systools;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.Date;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;


/**
 * @author Admin
 *         <p/>
 *         TODO To change the template for this generated type comment go to Window -
 *         Preferences - Java - Code Style - Code Templates
 */

public class CommonUtil {

    /**
     * convert a string array into a string, each element in array will be
     * delimited by "," if an array = {"0000", "1111", "2222"}, the return
     * string will be : 0000,1111,2222
     *
     * @param values string array
     * @return converted string, if values is null, null will be return
     */
    public static String strArrayToString(String[] values) {
        if (values == null)
            return null;

        int i = 0, length = values.length;
        String str = "";
        for (i = 0; i < length; i++) {
            str += values[i];
            if (i != length - 1) {
                str += ",";
            }
        }
        return str;
    }

    /**
     * translate a date string such as 2004-10-27 to a array of string
     *
     * @param src     the date string
     * @param sepChar a separate character in the date string such as '-' ':' or '/'
     *                and so on
     * @return an array of string
     */
    public static String[] split(String src, char sepChar) {
        // char sepChar = '-' ;
        if (src == null || src.trim().equals("")) {
            String[] ret = new String[6];
            int p = 0;
            for (p = 0; p < 6; p++) {
                ret[p] = "";
            }
            return ret;
        }

        int[] pos = new int[100];
        int partCount = 0;
        int i = 0;
        int len = src.length();
        char chr;

        pos[0] = -1;

        for (i = 0; i < len; i++) {
            chr = src.charAt(i);
            if (chr == sepChar || chr == ' ' || chr == ':')
                pos[++partCount] = i;
        }

        pos[++partCount] = src.length();

        String[] aStrRet = new String[pos.length];

        for (i = 0; i < partCount; i++) {
            aStrRet[i] = src.substring(pos[i] + 1, pos[i + 1]);
        }
        return aStrRet;
    }

    /**
     * @param date
     * @param time
     * @return String like 2004-10-26
     */
    public static String getDateTime(Date date, Time time) {
        return new SimpleDateFormat("yyyy-MM-dd").format(date) + " "
                + time.toString();
    }

    /**
     * 分割字串
     *
     * @param source 原始字符
     * @param delim  分割符
     * @return 字符串数组
     */
    public static String[] split(String source, String delim) {
        int i = 0;
        int l = 0;
        if (source == null || delim == null)
            return new String[0];
        if (source.equals("") || delim.equals(""))
            return new String[0];

        StringTokenizer st = new StringTokenizer(source, delim);
        l = st.countTokens();
        String[] s = new String[l];
        while (st.hasMoreTokens()) {
            s[i++] = st.nextToken();
        }
        return s;
    }

    public static void main(String[] args) throws SecurityException,
            NoSuchMethodException, IllegalArgumentException,
            IllegalAccessException, InvocationTargetException {
        // CommonSearchBean csb=new CommonSearchBean();
        // String methodName="getAddress";
        // csb.setAddress("jacke");
        // Method mthod=csb.getClass().getMethod(methodName, new Class[0]);
        // Object ojb=mthod.invoke(csb, null);
        // System.out.println(ojb);
    }

    /*
     * 比较两个字段数组里面的内容是否相同
     */
    public static boolean compareToStrings(String[] str1, String[] str2) {
        boolean ret = false;
        int len = str1.length;
        if (len == str2.length) {
            for (int i = 0; i < len; i++) {
                if (str1[i].equalsIgnoreCase(str2[i])) {
                    ret = true;
                    break;
                }
            }
        }
        return ret;
    }

    /**
     * 把 null 转化成 ""
     *
     * @param resource
     * @return
     */
    public static String nullToString(String resource) {
        if (resource == null)
            resource = "";
        return resource;
    }

    public static boolean isHasInclude(String aim, String[] columns) {
        boolean ret = false;
        for (int i = 0; i < columns.length; i++) {
            if (aim.equalsIgnoreCase(columns[i])) {
                ret = true;
                break;
            }
        }
        return ret;
    }

    /**
     * 比较两个浮点数字符串是否一致
     */
    public static boolean isFloatSame(String amt1, String amt2) {
        boolean ret = true;
        try {
            if (amt1 != null && !amt1.equals("") && amt2 != null
                    && !amt2.equals("")) {
                ret = Double.parseDouble(amt1) == Double.parseDouble(amt2);
            }
        } catch (Exception e) {
            ret = false;
            e.printStackTrace();
        }
        return ret;
    }

    /**
     * 比较两个浮点数 amt1 是否 大于 amt2
     */
    public static boolean isLargOne(String amt1, String amt2) {
        boolean ret = true;
        try {
            if (amt1 != null && !amt1.equals("") && amt2 != null
                    && !amt2.equals("")) {
                ret = Double.parseDouble(amt1) >= Double.parseDouble(amt2);
            }
        } catch (Exception e) {
            ret = false;
            e.printStackTrace();
        }
        return ret;
    }

    /**
     * 取SearchBean的所有属性,通过get方式出现的所有元素
     */
    public static List beanProperties(Object searchBean) {

        List propList = new ArrayList();
        Method[] mds = searchBean.getClass().getMethods();
        for (int i = 0; i < mds.length; i++) {
            Method md = mds[i];
            String name = md.getName();
            Class type = md.getReturnType();

            if (name.startsWith("get")) {
                if (type == Integer.class || type == String.class
                        || type == Long.class || type == Double.class
                        || type == Boolean.class
                        || type == Byte.class
                        || type == Float.class
                        || type == Short.class
                        || type == java.util.Date.class
                        || type == Object[].class) {
                    String prop = name.substring(3, name.length());
                    String firstMark = prop.substring(0, 1);
                    String newProp = firstMark.toLowerCase()
                            + prop.substring(1, prop.length());

                    propList.add(newProp);
                }

            }

        }

        return propList;
    }

    /**
     * 取SearchBean的所有属性,通过get方式出现的所有元素
     */
    public static List classProperties(Class searchBean) {

        List propList = new ArrayList();
        Method[] mds = searchBean.getMethods();
        for (int i = 0; i < mds.length; i++) {
            Method md = mds[i];
            String name = md.getName();
            Class type = md.getReturnType();

            if (name.startsWith("get")) {
                if (type == Integer.class || type == String.class
                        || type == Long.class || type == Double.class
                        || type == Boolean.class
                        || type == Byte.class
                        || type == Float.class
                        || type == Short.class
                        || type == java.util.Date.class) {
                    String prop = name.substring(3, name.length());
                    String firstMark = prop.substring(0, 1);
                    String newProp = firstMark.toLowerCase()
                            + prop.substring(1, prop.length());

                    propList.add(newProp);
                }

            }

        }

        return propList;
    }

    public static Object getPropertyValue(String property, Object searchBean)
            throws Exception {

        String firstMark = property.substring(0, 1);
        String behindStr = property.substring(1, property.length());

        Method mthod = searchBean.getClass().getMethod(
                "get" + firstMark.toUpperCase() + behindStr, new Class[0]);
        Object vu = mthod.invoke(searchBean, null);

        return vu;
    }

    /**
     * 合并两个数组
     *
     * @param arr1
     * @param arr2
     * @return
     */
    public static Object[] concatArray(Object[] arr1, Object[] arr2) {
        if (arr1 == null)
            return arr2;
        if (arr2 == null)
            return arr1;

        List list = new ArrayList(arr1.length + arr2.length);
        for (int i = 0; i < arr1.length; i++) {
            list.add(arr1[i]);
        }

        for (int i = 0; i < arr2.length; i++) {
            list.add(arr2[i]);
        }
        return list.toArray();
    }

    /***
     * 解决发托记账异常BUG
     * **/
//	public static String getSignerSign(String bank_no) {
//		ICustomerService cust = CustomerServiceFactory.getCustomerService();
//		CustInfo cu=null;
//		try {
//			cu = cust.getCustInfoByBankNo(bank_no);
//			if(cu==null){
//				return "";
//			}
//		} catch (Exception ex) {
//			return "";
//		}
//		if (cu.getPartnerType().equals("RC00")
//				|| cu.getPartnerType().equals("RC02")
//				|| cu.getPartnerType().equals("RC05")) {
//			return "0";
//		}
//		Random r = new Random();
//		long r1 = System.currentTimeMillis();
//		String sign = CodeConst.signerSign + r1;
//		return sign;
//	}
}