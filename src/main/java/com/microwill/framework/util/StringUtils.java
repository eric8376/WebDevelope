package com.microwill.framework.util;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.math.BigDecimal;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.DecimalFormat;
import java.text.MessageFormat;
import java.text.NumberFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StringUtils {
	
	/**
	 * 拼接前后路径（路径分隔符替换为当前操作系统路径分隔符）
	 * <pre>
	 * @功能说明:
	 * 拼接前后路径（路径分隔符替换为当前操作系统路径分隔符）
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年10月21日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年10月21日
	 * @param prefixPath 路径前缀
	 * @param suffixPath 路径后缀
	 * @return 拼接后路径
	 */
	public static String joinPath(String prefixPath, String suffixPath) {
		String fileSeparator = getFileSeparator();
		prefixPath = replaceWithSystemFileSeparator(prefixPath);
		suffixPath = replaceWithSystemFileSeparator(suffixPath);
		if(prefixPath.endsWith(fileSeparator)) {
			if (suffixPath.startsWith(fileSeparator)) {
				return prefixPath + suffixPath.substring(1);
			} else {
				return prefixPath + suffixPath;
			}
		}else {
			prefixPath += fileSeparator;
			if (suffixPath.startsWith(fileSeparator)) {
				return prefixPath + suffixPath.substring(1);
			} else {
				return prefixPath + suffixPath;
			}
		}
	}
	
	/**
	 * 把路径分隔符号替换为操作系统的分割符号
	 * <pre>
	 * @功能说明:
	 * 把路径分隔符号替换为操作系统的分割符号
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年10月21日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年10月21日
	 * @param filePath 待处理路径
	 * @return 替换后路径
	 */
	public static String replaceWithSystemFileSeparator(String filePath){
		if (!org.apache.commons.lang3.StringUtils.isBlank(filePath)){
			int win = filePath.indexOf("\\");
			int unix = filePath.indexOf("/");
			if (win>=0){
				return org.apache.commons.lang3.StringUtils.replace(filePath, "\\", getFileSeparator());
			}
			else if (unix>=0){
				return org.apache.commons.lang3.StringUtils.replace(filePath, "/", getFileSeparator());
			}
			else{
				return filePath;
			}
		}
		return "";
	}
	
	/**
	 * 获取操作系统的路径分割符号
	 * <pre>
	 * @功能说明:
	 * 获取操作系统的路径分割符号
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年10月21日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年10月21日
	 * @return 操作系统的路径分割符号
	 */
	public static String getFileSeparator(){
		return System.getProperty("file.separator");
	}
	
	/**
	 * 获取异常栈信息
	 * <pre>
	 * @功能说明:
	 * 获取异常栈信息
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年10月20日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年10月20日
	 * @param e 异常
	 * @return 获取异常栈信息
	 */
	public static String getExceptionStackTrace(Exception e){
		StringWriter sw = new StringWriter(); 
		PrintWriter pw = new PrintWriter(sw); 
		e.printStackTrace(pw); 
		return sw.toString();
	}
	
	/**
	 * null转换为空串
	 * <pre>
	 * @功能说明:
	 * null转换为空串
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年8月12日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年8月12日
	 * @param s
	 * @return
	 */
	public static String nullToEmpty(String s) {
		if (s == null) {
			return "";
		}
		return s;
	}
	/**
	 * 按顺序逐个替换
	 * <pre>
	 * @功能说明:
	 *  
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年8月11日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年8月11日
	 * @param s		源字符串
	 * @param repl	被替换的字符串
	 * @param withs	替换参数数组
	 * @return 替换后字符串
	 */
	public static String replaceOnceInOrder(String s, String repl, Object...withs) {
		if (withs != null) {
			for (Object o : withs) {
				if (org.apache.commons.lang3.StringUtils.contains(s, repl)) {
					s = org.apache.commons.lang3.StringUtils.replaceOnce(s, repl, o.toString());
				}
			}
		}
		return s;
	}
	
	/**
	 * 源字符串不足指定长度，左边以0进行填补;超过则直接返回
	 * <pre>
	 * @功能说明:
	 * 源字符串不足指定长度，左边以0进行填补;超过则直接返回
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年7月29日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年7月29日
	 * @param src		源字符串
	 * @param numLen	总长度
	 * @return 左边填充后字符串
	 */
	public static String extendStrLeftWithZero(String src, int numLen) {
		return extendStrLeft(src, numLen, "0");
	}
	
	/**
	 * 源字符串不足指定长度，左边以指定字符进行填补;超过则直接返回
	 * <pre>
	 * @功能说明:
	 * 源字符串不足指定长度，左边以指定字符进行填补;超过则直接返回
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年7月29日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年7月29日
	 * @param src		源字符串
	 * @param numLen	总长度
	 * @param pre		填充字符
	 * @return 左边填充后字符串
	 */
	public static String extendStrLeft(String src, int numLen, String pre) {
		if (numLen < 0) {
			throw new IllegalArgumentException("参数numLen不能为负数！");
		}
		if (src.length() >= numLen) {
			return src;
		} else {
			String preStr = stringRepeat(pre, numLen - src.length());
			return preStr + src;
		}
	}
	
	/**
	 * 返回由指定字符串重复指定次数后的字符串
	 * <pre>
	 * @功能说明:
	 * 返回由指定字符串重复指定次数后的字符串
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年7月29日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年7月29日
	 * @param str			重复字符串
	 * @param repeatCount	重复次数
	 * @return 重复处理后字符串
	 */
	public static String stringRepeat(String str, int repeatCount) {
		String tmpStr = "";
		if (repeatCount <= 0) {
			tmpStr = "";
		} else {
			for (int i = 1; i <= repeatCount; i++) {
				tmpStr = tmpStr + str;
			}
		}
		return tmpStr;
	}
	
	/**
	 * 将指定的字符串转换成double类型数据，如果无法转换则返回null
	 * @param v			要标准化的字符串
	 * @return			转换后的int值，或者转换失败后的Null
	 */
	public static Double string2double(String v) {
		if(isEmpty(v)) {
			return null;
		}
		try {
			return new Double(v);
		}catch (Exception e) {
			return null;
		}
	}
	
	public static BigDecimal string2BigDecimal(String v) {
		if(isEmpty(v)) {
			return null;
		}
		try {
			return new BigDecimal(v);
		}catch (Exception e) {
			return null;
		}
	}
	
	/**
	 * 将指定的字符串转换成int类型数据，如果无法转换则使用默认值
	 * @param v				要标准化的字符串
	 * @param defaultV		默认值
	 * @return			转换后的int值，或者转换失败后的默认值
	 */
	public static Integer string2Integer(String v) {
		if(isEmpty(v)) {
			return null;
		}
		try {
			return new Integer(v);
		}catch (Exception e) {
			return null;
		}
	}
	
	/**
	 * 将指定的字符串转换成int类型数据，如果无法转换则使用默认值
	 * @param v				要标准化的字符串
	 * @param defaultV		默认值
	 * @return			转换后的int值，或者转换失败后的默认值
	 */
	public static int string2Int(String v, int defaultV) {
		if(isEmpty(v)) {
			return defaultV;
		}
		try {
			return new Integer(v);
		}catch (Exception e) {
			return defaultV;
		}
	}
	
	/**
	 * 将指定的字符串转换成long类型数据，如果无法转换则使用默认值
	 * @param v				要标准化的字符串
	 * @param defaultV		默认值
	 * @return			转换后的long值，或者转换失败后的默认值
	 */
	public static long string2Long(String v, long defaultV) {
		if(isEmpty(v)) {
			return defaultV;
		}
		try {
			return new Long(v);
		}catch (Exception e) {
			return defaultV;
		}
	}
	
	/**
	 * 截取文件名的扩展名
	 */
	public static String getFileExtension(String fileName)
	{
		if( fileName.lastIndexOf(".")>0 && fileName.lastIndexOf(".")<fileName.length()-1 )
		{
			return fileName.substring( fileName.lastIndexOf(".")+1 );
		}
		else
		{
			return null;
		}
	}
	
	 /**  功能简述  :把字符串放入一个数组
     *              系统会自动执行删除字符串首尾的多余的间隔符。如  ,abc,123,, 将自动变成 abc,123
     *   @param   PaStr_Source 要被放入的字符串
     *   @param   paCha_seq 间隔符
     *   @param   PaBoo_SeqTrim 自动删除首尾的间隔符
     *   @return   转换后的数组
     */
    public static String[] split(String paStr_Source,char paCha_seq,boolean paBoo_SeqTrim)
    {
        if (paStr_Source==null) return null;
        if (paStr_Source.equals("")) return null;
        //开头的间隔符去掉
        while (paStr_Source.charAt(0)==paCha_seq)
        {
            paStr_Source=paStr_Source.substring(1);
        }
        //尾部的间隔符去掉
        while (paStr_Source.charAt(paStr_Source.length()-1)==paCha_seq)
        {
            paStr_Source=paStr_Source.substring(0,paStr_Source.length()-1);
        }

        return split(paStr_Source,""+paCha_seq);
    }

    /**  功能简述  :把字符串放入一个数组
     *              系统会自动执行删除字符串首尾的多余的间隔符。如  ,abc,123,, 将自动变成 abc,123
     *   @param   PaStr_Source 要被放入的字符串
     *   @param   paStr_seq 间隔符
     *   @param   PaBoo_SeqTrim 自动删除首尾的间隔符
     *   @return   转换后的数组
     */
    public static String[] split(String paStr_Source,String paStr_seq,boolean paBoo_SeqTrim)
    {
        if (paStr_Source==null || paStr_seq == null) return null;
        //开头的间隔符去掉
        while (paStr_Source.indexOf(paStr_seq)==0)
        {
            paStr_Source=paStr_Source.substring(paStr_seq.length());
        }
        //尾部的间隔符去掉
        while (paStr_Source.indexOf(paStr_seq,paStr_Source.length() - paStr_seq.length()) > -1)
        {
            paStr_Source=paStr_Source.substring(0,paStr_Source.length() - paStr_seq.length());
        }

        if (paStr_Source.equals("") || paStr_seq.equals("")) return null;
        return split(paStr_Source,paStr_seq);
    }

    /**  功能简述  :把字符串放入一个数组
     *   @param   PaStr_Source 要被放入的字符串
     *   @param   paCha_seq 间隔符
     *   @return   转换后的数组
     */
    public static String[] split(String paStr_Source,char paCha_seq)
    {
        return split(paStr_Source,""+paCha_seq);
    }

    /**  功能简述  :把字符串放入一个数组
     *   @param   PaStr_Source 要被放入的字符串
     *   @param   paStr_seq 间隔符
     *   @return   转换后的数组,失败返回 null
     */
    public static String[] split(String paStr_Source,String paStr_seq)
    {
        if (paStr_Source == null || paStr_seq == null)
        {
                return new String[]{};
        }
        if (paStr_Source.equals("") || paStr_seq.equals(""))
        {
                return new String[]{};
        }
        int int_ArraySize=subStringCount(paStr_Source,paStr_seq);
        //如果为-1则返回
        if (int_ArraySize==-1) return new String[]{};

        paStr_Source+=paStr_seq;

        String[] str_RetArr=new String[int_ArraySize+1];
        int int_pos=paStr_Source.indexOf(paStr_seq);
        int int_ArrayPos=0;
        while (int_pos!=-1)
        {
            str_RetArr[int_ArrayPos++]=paStr_Source.substring(0,int_pos);
            paStr_Source=paStr_Source.substring(int_pos + paStr_seq.length());
            int_pos=paStr_Source.indexOf(paStr_seq);
        }

        return str_RetArr;
    }
    
    /**  功能简述  :在一个字符串中查找字符个数
     *   @param  paStr_Source 要被查询的字符串
     *   @param  paCha_seq 要查找的字符
     *   @return  找到的个数
     *  */
    public static int subStringCount(String paStr_Source,char paCha_seq)
    {
        //如果是空指针则返回-1
        if(paStr_Source==null) return -1;
        if(paStr_Source.equals("")||paCha_seq==32||paCha_seq==0) return -1;

        int int_ret=0;
        int int_pos=paStr_Source.indexOf(paCha_seq);
        while (int_pos!=-1)
        {
                int_ret++;
                int_pos=paStr_Source.indexOf(paCha_seq,int_pos+1);
        }

        return int_ret;
    }

    /**  功能简述  :在一个字符串中查找字符串个数(不区分大小写)
     *   @param  paStr_Source 要被查询的字符串
     *   @param  paStr_seq 要查找的字符串
     *   @return   找到的个数
     *  */
    public static int subStringCount(String paStr_Source,String paStr_seq)
    {
        //如果是空指针则返回-1
        if(paStr_Source==null||paStr_seq==null) return -1;
        if(paStr_Source.equals("")||paStr_seq.equals("")) return -1;

        int int_ret=0;
        int int_pos=paStr_Source.toUpperCase().indexOf(paStr_seq.toUpperCase());
        while (int_pos!=-1)
        {
                int_ret++;
                int_pos=paStr_Source.toUpperCase().indexOf(paStr_seq.toUpperCase(),int_pos+paStr_seq.length());
        }

        return int_ret;
    }

    /**  功能简述  :在一个字符串中查找字符串个数(区分大小写)
     *   @param  paStr_Source 要被查询的字符串
     *   @param  paStr_seq 要查找的字符串
     *   @param  paBoo_case 区分大小写
     *   @return   找到的个数
     *  */
    public static int subStringCount(String paStr_Source,String paStr_seq,boolean paBoo_case)
    {
        //如果是空指针则返回-1
        if(paStr_Source==null||paStr_seq==null) return -1;
        if(paStr_Source.equals("")||paStr_seq.equals("")) return -1;

        int int_ret=0;
        int int_pos=paStr_Source.indexOf(paStr_seq);
        while (int_pos!=-1)
        {
                int_ret++;
                int_pos=paStr_Source.indexOf(paStr_seq,int_pos+paStr_seq.length());
        }
        return int_ret;
    }
    
    public static String escape(String src) 
    {  
    	int i;  
    	char j;  
    	StringBuffer tmp = new StringBuffer();  
    	tmp.ensureCapacity(src.length()*6);  
    	for (i=0;i<src.length();i++)  
    	{   
    		j = src.charAt(i);   
    		if (Character.isDigit(j) || Character.isLowerCase(j) || Character.isUpperCase(j))    
    			tmp.append(j);   
    		else if (j<256)    
    		{    
    			tmp.append( "%" );    
    			if (j<16)     
    				tmp.append( "0" );    
    			tmp.append( Integer.toString(j,16) );    
    		}    
    		else    
    		{    
    			tmp.append( "%u" );    
    			tmp.append( Integer.toString(j,16) );    
    		}  
    	}  
    	return tmp.toString(); 
    } 
    
    public static String unescape(String src) 
    {  
    	StringBuffer tmp = new StringBuffer();  
    	tmp.ensureCapacity(src.length());  
    	int lastPos=0,pos=0;  
    	char ch;  
    	while (lastPos<src.length())  
    	{   
    		pos = src.indexOf("%",lastPos);   
    		if (pos == lastPos)    
    		{    
    			if (src.charAt(pos+1)=='u')     
    			{     
    				ch = (char)Integer.parseInt(src.substring(pos+2,pos+6),16);     
    				tmp.append(ch);     
    				lastPos = pos+6;     
    			}    
    			else     
    			{     
    				ch = (char)Integer.parseInt(src.substring(pos+1,pos+3),16);     
    				tmp.append(ch);     
    				lastPos = pos+3;     
    			}    
    		}   
    		else    
    		{    
    			if (pos == -1)     
    			{     
    				tmp.append(src.substring(lastPos));     
    				lastPos=src.length();     
    			}    
    			else     
    			{     
    				tmp.append(src.substring(lastPos,pos));     
    				lastPos=pos;     
    			}    
    		}  
    	}  
    	return tmp.toString(); 
    }
    
    public static String stringArray2String(String[] a, String sepa)
	{
		StringBuffer sb=new StringBuffer();
		for( int i=0; i<a.length; i++ )
		{
			if( i>0 )
				sb.append(sepa);
			sb.append(a[i]);
		}
		return sb.toString();
	}
  //功能函数。将变量值不为空的参数组成字符串
	public static String appendParam(String returnStr,String paramId,String paramValue)
	{
			if(!returnStr.equals(""))
			{
				if(paramValue!=null && !paramValue.equals(""))
				{
					returnStr=returnStr+"&"+paramId+"="+paramValue;
				}
			}
			else
			{
				if(paramValue!=null && !paramValue.equals(""))
				{
					returnStr=paramId+"="+paramValue;
				}
			}	
			return returnStr;
	}
	
	/*
	 * 以元为单位的数据转化为以分为单位的数据
	 */
	public static String formatYuanToFen(String input)
	{
	    String out = "";
	    NumberFormat ft = NumberFormat.getInstance();
	    Number nbInput;
	    try 
	    {
		    nbInput = ft.parse(input);
		    
		    double fInput = nbInput.doubleValue()*100.0;
		    
		    ft.setGroupingUsed(false);
		    ft.setMaximumFractionDigits(0);
		    
		    out=ft.format(fInput);
	    } 
	    catch (ParseException e) 
	    {
	        e.printStackTrace();
	    }
	    
	    return out;
	}
	/*
	 * 以分为单位的数据转化为以元为单位的数据
	 */
	public static String formatFenToYuan(String input)
	{
		    String out = "";
		    NumberFormat ft = NumberFormat.getInstance();
		    Number nbInput;
		    try 
		    {
			    nbInput = ft.parse(input);
			    
			    double fInput = nbInput.doubleValue()/100.0;
			    
			    ft.setGroupingUsed(false);
//			    ft.setMaximumFractionDigits(0);
			    out=ft.format(fInput);
		    } 
		    catch (ParseException e) 
		    {
		        e.printStackTrace();
		    }
		    
		    return out;
	}
	// 随机字符串
	public static String getRandomString(int size)
	{
	    char[] c ={ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'q',
	            'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd',
	            'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm' };
	    Random random = new Random(); // 初始化随机数产生器
	    StringBuffer sb = new StringBuffer();
	    for (int i = 0; i < size; i++){
	        sb.append(c[Math.abs(random.nextInt()) % c.length]);
	    }
	    return sb.toString();
	}
	
	// 随机字符串(数字)
	public static String getRandomNumber(int size)
	{
	    char[] c ={ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'};
	    Random random = new Random(); // 初始化随机数产生器
	    StringBuffer sb = new StringBuffer();
	    for (int i = 0; i < size; i++){
	        sb.append(c[Math.abs(random.nextInt()) % c.length]);
	    }
	    return sb.toString();
	}
	
	/*
	 * 验证指定的字串是否IP地址
	 * ip形如192.168.0.1则返回true
	 * 否则返回false
	 */
	public static boolean isAIP(String ip)
	{
		Pattern patt = Pattern.compile("^([01]?[0-9][0-9]|[01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])" +
				"\\.([01]?[0-9][0-9]|[01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])" +
				"\\.([01]?[0-9][0-9]|[01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])" +
				"\\.([01]?[0-9][0-9]|[01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$");
		Matcher mat = patt.matcher(ip);
		return mat.matches();
	}
	
	/*
	 * 返回IP的指定部分字串
	 * 如调用getOnePartOfIPDomain("192.168.0.1", 2)
	 * 返回168
	 */
	public static String getOnePartOfIP(String ip, int index)
	{
		String result = null;
		if (!isAIP(ip))
			return null;
		String[] ipArr = ip.split("\\.");
		if (index <= ipArr.length)
			result = ipArr[index - 1];
		return result;
	}
	
	
	
	/*
	 * 分析快照字符串
	 * 如调用getValueFromSnapshot("aa=11;bb=22;cc=33", bb)
	 * 返回22
	 */
	public static String getValueFromSnapshot(String snapshot, String key)
	{
		String[] snapshots = null;
		String pairs[] = null;
		String result = "";
		
		if(snapshot == null || snapshot.trim().length() == 0)
		{
			return "";
		}
		if(key == null || key.trim().length() == 0)
		{
			return "";
		}
		snapshots = StringUtils.split(snapshot, ';');
		for(int i = 0; i < snapshots.length; i++)
		{
			pairs = StringUtils.split(snapshots[i], '=');
			if(pairs.length == 2)
			{
				if(pairs[0].trim().equals(key.trim()))
				{
					result = pairs[1];
					break;
				}
			}
		}
		
		snapshots = null;
		pairs = null;
		return result;
	}
	
	/*
	 * 判断给定的字符串是否为空
	 */
    public static boolean isEmpty(String value)
    {
    	if(value == null || value.isEmpty() || value.trim().length()==0) {
    		return true;
    	}
    	return false;
    }
	
    /*
     * 将字符串去掉前后空格并将
     * 字串中的英文均转为小写字母
     */
    public static String treatStringTrimAndLowerCase(String str)
    {
    	if (str == null)
    		return null;
    	str = str.trim().toLowerCase();
    	return str;
    }
    
    /*
     * 将字符串去掉前后空格并将
     * 字串中的英文均转为大写字母
     */
    public static String treatStringTrimAndUpperCase(String str)
    {
    	if (str == null)
    		return null;
    	str = str.trim().toUpperCase();
    	return str;
    }
    
    /*
     * 判断字符串中的字符是否均为数字
     * 如"123990"返回true,"123a"返回false
     */
    public static boolean isAllNumbric(String str)
    {
    	if (str == null)
    		return false;
    	
    	for (int i = 0; i < str.length(); i ++)
    	{
    		if (str.charAt(i) <'0'  || str.charAt(i) > '9')
    			return false;
    	}
    	return true;
    }
    
    /*
     * 判断数字是否是正整数
     * 如"12.3"返回false，"20"返回true
     */
    public static boolean isIntNumber(String bot)  {  
        boolean flag=false;
        try{
               String regex="^[1-9]+[0-9]*$";
                //^[1-9]+\\d*$
                Pattern p=Pattern.compile(regex);
                Matcher m=p.matcher(bot);
                if(m.find()){
                    return true;
                }else{
                    return false;
                }
            }catch(Exception e){
                e.printStackTrace();
            }
        return flag;      
    }
	/*
	 * 返回域名或IP地址的最后部分
	 * 如调用getLastPartOfDomain("192.168.0.1")
	 * 返回1，调用getLastPartOfDomain("www.163.com.cn")返回cn
	 */
	public static String getLastPartOfDomain(String domain)
	{
		if (domain == null || domain.indexOf(".") == -1)
			return "";
		String[] domainArr = domain.split("\\.");
		return domainArr[domainArr.length - 1];
	}
	
	public static Map<String, String> getMap4KvString(String kvString, char splitor)
	{
		String[] snapshots = StringUtils.split(kvString, splitor);
		String[] pairs = null;
		Map<String, String> result = new HashMap<String, String>();
		for(int i = 0; i < snapshots.length; i++)
		{
			pairs = StringUtils.split(snapshots[i], '=');
			if(pairs.length == 2)
			{
				result.put(pairs[0], pairs[1]); 
			}
		}
		return result;
	}
	

    public static String html(String content) { 
        if(content == null) return "";         
        String html = content; 
       //  html = html.replaceAll("'", "&apos;"); 
       // html = html.replaceAll("\"", "&quot;"); 
        html = html.replaceAll("\t", "&nbsp;&nbsp;");// 替换跳格 
        html = html.replaceAll(" ", "&nbsp;");// 替换空格 
        html = html.replaceAll("<", "&lt;"); 
        html = html.replaceAll(">", "&gt;"); 
        html = html.replaceAll("\n", "<br/>");
        html = html.replaceAll("img","img style='display:none' "); 
        return html; 
    } 
    
    public static String htmlDecode(String content) { 
        if(content == null) return "";         
        String html = content; 
       //  html = html.replaceAll("'", "&apos;"); 
       // html = html.replaceAll("\"", "&quot;"); 
        html = html.replaceAll("&nbsp;&nbsp;", "\t");// 替换跳格 
        html = html.replaceAll("&nbsp;", " ");// 替换空格 
        html = html.replaceAll("&lt;", "<"); 
        html = html.replaceAll("&gt;", ">"); 
        html = html.replaceAll("<br/>", "\n");
        html = html.replaceAll("img style='display:none' ","img"); 
        return html; 
    } 
    
    public static String htmlDecodeTwo(String content) { 
        if(content == null||"".equals(content)) return ""; 
        String pContent=null;
        String emContent=null;
        String spanContent=null;
        String strongContent=null;
        String imgContent=null;
        String html=content;
        System.out.println(html);
        if(html.contains("<p")){
        	pContent=content.substring(content.indexOf("<p"),content.indexOf(">", content.indexOf("<p"))+1);
            html = html.replaceAll(pContent,""); 
            html = html.replaceAll("</p>",""); 
            System.out.println(html);
        }else if(html.contains("&lt;p")){
        	pContent=content.substring(content.indexOf("&lt;p"),content.indexOf("&gt;", content.indexOf("&lt;p"))+4);
            html = html.replaceAll(pContent,""); 
            html = html.replaceAll("&lt;&quot;p&gt;",""); 
            System.out.println(html);
        }
        if(html.contains("<em")){
        	emContent=html.substring(html.indexOf("<em"),html.indexOf(">", html.indexOf("<em"))+1);
            html = html.replaceAll(emContent,""); 
            html = html.replaceAll("</em>","");
            System.out.println(html);
        }else if(html.contains("&lt;em")){
        	emContent=html.substring(html.indexOf("&lt;em"),html.indexOf("&gt;", html.indexOf("&lt;em"))+4);
            html = html.replaceAll(emContent,""); 
            html = html.replaceAll("&lt;&quot;em&gt;","");
            System.out.println(html);
        }
        if(html.contains("<span")){
        	spanContent=html.substring(html.indexOf("<span"),html.indexOf(">", html.indexOf("<span"))+1);
            html = html.replaceAll(spanContent,""); 
            html = html.replaceAll("</span>",""); 
            System.out.println(html);
        }else if(html.contains("&lt;span")){
        	spanContent=html.substring(html.indexOf("&lt;span"),html.indexOf("&gt;", html.indexOf("&lt;span"))+4);
            html = html.replaceAll(spanContent,""); 
            html = html.replaceAll("&lt;&quot;span&gt;",""); 
            System.out.println(html);
        }
        if(html.contains("<strong")){
        	strongContent=html.substring(html.indexOf("<strong"),html.indexOf(">", html.indexOf("<strong"))+1);
            html = html.replaceAll(strongContent,""); 
            html = html.replaceAll("</strong>",""); 
            System.out.println(html);
        }else if(html.contains("&lt;strong")){
        	strongContent=html.substring(html.indexOf("&lt;strong"),html.indexOf("&gt;", html.indexOf("&lt;strong"))+4);
            html = html.replaceAll(strongContent,""); 
            html = html.replaceAll("&lt;&quot;strong&gt;",""); 
            System.out.println(html);
        }
        if(html.contains("<img")){
        	imgContent=html.substring(html.indexOf("<img"),html.indexOf(">", html.indexOf("<img"))+1);
            html = html.replaceAll(imgContent,""); 
            html = html.replaceAll("</img>","");
            System.out.println(html);
        }else if(html.contains("&lt;img")){
        	imgContent=html.substring(html.indexOf("&lt;img"),html.indexOf("&gt;", html.indexOf("&lt;img"))+4);
            html = html.replaceAll(imgContent,""); 
            html = html.replaceAll("&lt;&quot;img&gt;","");
            System.out.println(html);
        }
        return html; 

    } 
    
    //html处理标签
    public static String htmlDecodeT(String content) { 
        if(content == null||"".equals(content)) return ""; 
        String str = content.replaceAll("<[a-zA-Z]?[^><]*>", "").replaceAll(
        		"<[^>]*>", "");
        		str = str.replaceAll("[(/>)<]", "");
        		return str;
    } 
	
	public static String getKvString4Map(Map<String, String> map, char splitor) {
		Iterator<String> iter = map.keySet().iterator();
		StringBuilder sb = new StringBuilder();
		while(iter.hasNext()) {
			String key = iter.next();
			sb.append(key);
			sb.append("=");
			sb.append(map.get(key));
			sb.append(splitor);
		}
		return sb.toString();
	}
	
	public static String getSafeString(String str) {
		String result = str;
		result = result.replace("{", "");
		result = result.replace("}", "");
		result = result.replace("[", "");
		result = result.replace("]", "");
		result = result.replace(",", "");
		result = result.replace("\"", "");
		result = result.replace("'", "");
		result = result.replace(":", "");
		result = result.replaceAll("\r\n", "\\\\r\\\\n");
		return result;
	}
	
	/**
	 * 格式化字符串，如：
	 *         我是{0},今年{1}岁---->我是张三,今年34岁
	 * @param key
	 *                    目标字符串
	 * @param values
	 *                     需要在key中动态指定的值集
	 * @return
	 */
	public static String getText(String key,Object[] values)
	{
	    try
        {
	        if(isEmpty(key))    return key;
	        return new MessageFormat(key).format(values);
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
	    return key;
	}
	
	@SuppressWarnings("deprecation")
    public static String encoder(String string){
	    try
        {
	        if(StringUtils.isEmpty(string))
	            return "";
            return URLEncoder.encode(string);
        }
        catch(Exception e)
        {
        }
	    return "";
	}
	
	/**
	 * 手机号码屏蔽
	 * <pre>
	 * @功能说明:
	 * 手机号码屏蔽
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013-8-22
	 * 修  改  人: kmlin
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013-8-22
	 * @param phone
	 * @return
	 */
	public static String replacePhoneWithX(String phone){
		phone = phone.replaceAll("(\\d{3})\\d{4}(\\d{4})", "$1****$2");
		return phone;
	}
	
	public static String decoder(String string)
	{
	    try
        {
         
	        if(!StringUtils.isEmpty(string))
	            return URLDecoder.decode(string,"UTF-8");
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
	    return "";
	}
	
	/**
	 * 格式化金额为中文格式，千分符隔开，默认保留2位有效数字(如￥1,000.01元)
	 * <pre>
	 * @功能说明:
	 * 格式化金额为中文格式，千分符隔开，默认保留2位有效数字(如￥1,000.01元)
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年9月12日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年9月12日
	 * @param money	金额
	 * @return 金额的中文格式
	 */
	public static String formatMoneyCNY(BigDecimal money) {
		return formatMoneyCNY(money, 2);
	}
	/**
	 * 格式化金额为中文格式，千分符隔开(如￥1,000.01元)
	 * <pre>
	 * @功能说明:
	 * 格式化金额为中文格式，千分符隔开(如￥1,000.01元)
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年9月12日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年9月12日
	 * @param money	金额
	 * @param len	保留小数位数
	 * @return 金额的中文格式
	 */
	public static String formatMoneyCNY(BigDecimal money, int len) {
        if (money == null) {
            return "";
        }
        String s = money.toString();
        NumberFormat formater = null;
        double num = Double.parseDouble(s);
        if (len == 0) {
            formater = new DecimalFormat("###,##0");
        } else {
            StringBuffer buff = new StringBuffer();
            buff.append("###,##0.");
            for (int i = 0; i < len; i++) {
                buff.append("0");
            }
            formater = new DecimalFormat(buff.toString());
        }
        String result = formater.format(num);
        if(result.indexOf(".") == -1) {
            result = "￥" + result + ".00" + "元";
        }
        else {
            result = "￥" + result + "元";
        }
        return result;  
    } 
	
	public static String fromatMoney(BigDecimal _region) {
		if(null != _region) {
        	BigDecimal region = new BigDecimal(_region.toString());
        	String[] r = region.toString().split("\\.");
    		BigDecimal bd = new BigDecimal(region.toString()); 
    		return (new DecimalFormat(",##0.00").format(bd) );
        }else{
        	return "0.00";
        }
	}
	
	/**
	 * 拼接url
	 * <pre>
	 * @功能说明:
	 * 拼接url
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2014年3月26日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2014年3月26日
	 * @param prefixUrl	url前缀
	 * @param suffixUrl	url后缀
	 * @return 拼接后url
	 */
	public static String joinUrl(String prefixUrl, String suffixUrl) {
		String result = prefixUrl;
		boolean isEndWith = prefixUrl.endsWith("/") || prefixUrl.endsWith("\\");
		boolean isStartWith = suffixUrl.startsWith("/") || suffixUrl.startsWith("\\");
		if (isEndWith && isStartWith) {
			result = prefixUrl + suffixUrl.substring(1);
		} else if (!isEndWith && !isStartWith){
			result = prefixUrl + "/" + suffixUrl;
		} else {
			result = prefixUrl + suffixUrl;
		}
		result = org.apache.commons.lang3.StringUtils.replace(result, "\\", "/");
		return result;
	}
	
	public static void main(String[] args)
    {
//       System.out.println(getText("赞同了话题<a href=\"/event/{0}.html#activityRemark\">{1}</a>", new Object[]{"张三",34}));
//       
//       String s = "000000012";
//       System.out.println("s:"+Long.valueOf(s));
//       List<String> paramList = new ArrayList<String>();
//       paramList.add("20130900001");
//       paramList.add("20130900002");
//       System.out.println(StringUtils.replaceOnceInOrder("逾期天数累加(项目编号:?,?,?)服务发生异常", 
//    		   CommonConstant.REPLACE_SYMBOL, "", "", ""));
//       
//       System.out.println(joinPath("/aaa/bbb/", "/ccc/ddd"));
//       
      /* System.out.println(org.apache.commons.lang.StringUtils.isNumeric("123456"));
       System.out.println(org.apache.commons.lang.StringUtils.isNumeric("123a456"));
       String aa = "/data/webroot/scf_upload/contractborrowertotal/BT-20140500092-0003.pdf";
       String bb = "webroot/scf_upload/contractborrowertotal/BT-20140500092-0003.pdf";
       String cc = "/contractborrowertotal/BT-20140500092-0003.pdf";
       String dd = "E://aaa//bbb ccc//cccc_ddd//alkf.xxx";
       boolean ss = isValidPath(bb);
       System.out.println("aaaaaa============="+ss);*/
//		String content="<p style=\"text-align: left;\"><span style=\"text-decoration: underline; background-color: rgb(192, 0, 0); color: rgb(12, 12, 12);\"><em><strong><span style=\"text-decoration: underline; background-color: rgb(192, 0, 0); font-family: 宋体, SimSun; font-size: 10px;\">sfsaasfasdfadsfasdfasdfasfafd</span></strong></em></span><br/></p>";
		String content="&lt;p&gt;毛泽东同志&lt;/p&gt;";
		System.out.println(content.substring(content.indexOf("&lt;p"),content.indexOf("&gt;", content.indexOf("&lt;p"))+4));
//		System.out.println(content.substring(content.indexOf("<p"),content.indexOf(">", content.indexOf("<p"))+1));
//		System.out.println(content.substring(content.indexOf("<em"),content.indexOf(">", content.indexOf("<em"))+1));
//		System.out.println(content.substring(content.indexOf("<span"),content.indexOf(">", content.indexOf("<span"))+1));
//		System.out.println(content.substring(content.indexOf("<strong"),content.indexOf(">", content.indexOf("<strong"))+1));
		System.out.println("join url:"+StringUtils.joinUrl("http:\\\\aaa\\", "/bbb"));
    }
	
	/*
	 * 对企业信息内容进行脱敏处理
	 */
	public static String secrecyName(String secrecyName)
	{
		int length=secrecyName.length();
		String str="";
    	String startStr="";
    	String middleStr="";
    	String secrecyStr="";
    	String endStr="";
    	int midlength=0;
    	if(DataValidate.validateIdnumber(secrecyName)){
    		startStr=secrecyName.substring(0, 3);
    		endStr=secrecyName.substring(secrecyName.length()-4, secrecyName.length());
    		middleStr=secrecyName.substring(3, secrecyName.length()-1);
    		midlength=middleStr.length();
    		for(int i=0;i<midlength;i++){
    			secrecyStr+="*";
    		}
    	}else if(DataValidate.validatePhone(secrecyName)){
    		startStr=secrecyName.substring(0, 3);
    		endStr=secrecyName.substring(secrecyName.length()-4, secrecyName.length());
    		middleStr=secrecyName.substring(3, secrecyName.length()-1);
    		midlength=middleStr.length();
    		for(int i=0;i<midlength;i++){
    			secrecyStr+="*";
    		}
    	}else if(DataValidate.isEmail(secrecyName)){
    		int size=secrecyName.split("@")[0].length();
    		if(size==1){
    			secrecyStr="*";
    			endStr="@"+secrecyName.split("@")[1];
    		}else if(size==2){
    			startStr=secrecyName.split("@")[0].substring(0, 1);
    			secrecyStr="*";
    			endStr="@"+secrecyName.split("@")[1];
    		}else if(size==3){
    			startStr=secrecyName.split("@")[0].substring(0, 2);
    			secrecyStr="*";
    			endStr="@"+secrecyName.split("@")[1];
    		}else{
    			startStr=secrecyName.substring(0, 3);
        		endStr=secrecyName.split("@")[0].substring(secrecyName.split("@")[0].length()-2, secrecyName.split("@")[0].length()-1)+"@"+secrecyName.split("@")[1];
        		middleStr=secrecyName.substring(3, secrecyName.split("@")[0].length()-1);
        		midlength=middleStr.length();
        		for(int i=0;i<midlength;i++){
        			secrecyStr+="*";
        		}
    		}
    	}else if(DataValidate.validateName(secrecyName)){
    		if(length==1){
    			startStr=secrecyName;
    			secrecyStr="*";
    			str=startStr+secrecyStr;
    			return str;
    		}else if(length==2){
    			startStr=secrecyName.substring(0,1);
    			secrecyStr="*";
    			str=startStr+secrecyStr+secrecyName.substring(1,1);
    			return str;
    		}else if(length>2){
    			startStr=secrecyName.substring(0,1);
    			middleStr=secrecyName.substring(1, secrecyName.length()-1);
    			for(int i=0;i<middleStr.length();i++){
    				secrecyStr=secrecyStr+"*";
        		}
    			endStr=secrecyName.substring(secrecyName.length()-1, secrecyName.length());
    		}
    	}else{
    		if(length==1){
    			startStr=secrecyName;
    			secrecyStr="*";
    			str=startStr+secrecyStr;
    			return str;
    		}else if(length==2){
    			startStr=secrecyName;
    			secrecyStr="*";
    			str=startStr+secrecyStr;
    			return str;
    		}else if(length==3){
    			startStr=secrecyName;
    			secrecyStr="*";
    			str=startStr+secrecyStr;
    			return str;
    		}else if(length==4){
    			startStr=secrecyName.substring(0,3);
    			secrecyStr="*";
    			endStr=secrecyName.substring(secrecyName.length()-2, secrecyName.length()-1);
    			str=startStr+secrecyStr;
    			return str;
    		}else if(length==5){
    			startStr=secrecyName.substring(0,3);
    			secrecyStr="*";
    			endStr=secrecyName.substring(secrecyName.length()-3, secrecyName.length()-1);
    		}else if(length>5){
    			startStr=secrecyName.substring(0, 3);
        		endStr=secrecyName.substring(secrecyName.length()-2, secrecyName.length());
        		middleStr=secrecyName.substring(3, secrecyName.length()-1);
        		midlength=middleStr.length();
        		for(int i=0;i<midlength;i++){
        			secrecyStr+="*";
        		}
    		}
    	}
    	str=startStr+secrecyStr+endStr;
		return str;
	}
	
	/*
	 * 对企业税号进行脱敏处理
	 */
	public static String secrecyTaxCode(String secrecyName)
	{
		int length=secrecyName.length();
		String str="";
    	String startStr="";
    	String middleStr="";
    	String secrecyStr="";
    	String endStr="";
    	int midlength=0;
    	if(length==1){
			secrecyStr="*";
			str=startStr+secrecyStr;
			return str;
		}else if(length==2){
			startStr=secrecyName.substring(0,1);;
			secrecyStr="*";
			str=startStr+secrecyStr;
			return str;
		}else if(length==3){
			startStr=secrecyName.substring(0,2);;
			secrecyStr="*";
			str=startStr+secrecyStr;
			return str;
		}else if(length==4){
			startStr=secrecyName.substring(0,3);
			secrecyStr="*";
			endStr=secrecyName.substring(secrecyName.length()-2, secrecyName.length()-1);
			str=startStr+secrecyStr;
			return str;
		}else if(length==5){
			startStr=secrecyName.substring(0,3);
			secrecyStr="*";
			endStr=secrecyName.substring(secrecyName.length()-3, secrecyName.length()-1);
		}else if(length>5){
			startStr=secrecyName.substring(0, 3);
    		endStr=secrecyName.substring(secrecyName.length()-2, secrecyName.length());
    		middleStr=secrecyName.substring(3, secrecyName.length()-1);
    		midlength=middleStr.length();
    		for(int i=0;i<midlength;i++){
    			secrecyStr+="*";
    		}
		}
    	str=startStr+secrecyStr+endStr;
		return str;
	}
	
	/*
	 * 对供应商名称进行脱敏处理
	 * 马芳
	 */
	public static String hiddenName(String enterpriseName)
	{
		int length=enterpriseName.length();
    	String startStr="";
    	String middleStr="";
    	String endStr="";
    	int midlength=0;
    	if(length>20){
    		startStr=enterpriseName.substring(0,4);
    		middleStr="**************";
    		endStr=enterpriseName.substring(length-2,length);
    	}else if(length>6&&length<=20){
    		midlength=length-6;
    		startStr=enterpriseName.substring(0,4);
    		for(int i=0;i<midlength;i++){
    			middleStr=middleStr+"*";
    		}
    		endStr=enterpriseName.substring(length-2,length);
    	}else if(length>4&&length<=6){
    		midlength=length-4;
    		startStr=enterpriseName.substring(0,2);
    		for(int i=0;i<midlength;i++){
    			middleStr=middleStr+"*";
    		}
    		endStr=enterpriseName.substring(length-2,length);
    	}else if(length>2&&length<=4){
    		startStr=enterpriseName.substring(0,2);
    		middleStr="**";
    	}else{
    		startStr="**";
    	}
		return startStr+middleStr+endStr;
	}
	
	/*
	 * 对出资人名称进行脱敏处理（李*）
	 * 马芳
	 */
	public static String hidName(String lenderName)
	{
		int length=lenderName.length();
    	String startStr="";
    	String middleStr="";
    	String endStr="";
    	int midlength=0;
    	if(length>4){
    		midlength=length-2;
    		startStr=lenderName.substring(0,1);
    		for(int i=0;i<midlength;i++){
    			middleStr=middleStr+"*";
    		}
    		endStr=lenderName.substring(length-1,length);
    	}else if(length==4){
    		startStr=lenderName.substring(0,1);
    		middleStr="**";
    		endStr=lenderName.substring(length-1,length);
    	}else if(length==3){
    		startStr=lenderName.substring(0,1);
    		middleStr="*";
    		endStr=lenderName.substring(length-1,length);
    	}else if(length==2){
    		startStr="*";;
    		middleStr="";
    		endStr=lenderName.substring(length-1,length);
    	}else{
    		startStr="**";
    	}
		return startStr+middleStr+endStr;
	}
	
	/*
	 * 对邮箱进行脱敏处理（前2后一加@后显示，其余的是*@。。/q*@。。/qa*@。。）
	 * 马芳
	 */
	public static String hidEmail(String email)
	{
		String aa = email.split("@")[0];
		String cc = email.split("@")[1];
    	String startStr="";
    	String middleStr="";
    	String endStr="";
    	int midlength=0;
    	if(aa.length()==1){
			startStr="*";
			endStr="@"+cc;
		}else if(aa.length()==2){
			startStr=aa.substring(0,1);
			middleStr="*";
			endStr="@"+cc;
		}else if(aa.length()==3){
			startStr=aa.substring(0,2);
			middleStr="*";
			endStr="@"+cc;
		}else{
			midlength=aa.length()-3;
    		startStr=aa.substring(0,2);
    		for(int i=0;i<midlength;i++){
    			middleStr=middleStr+"*";
    		}
    		String ss = aa.substring(aa.length()-1,aa.length());
    		endStr=ss+"@"+cc;
		}
		return startStr+middleStr+endStr;
	}
	
	/*
	 * 对列表去重
	 * 马芳
	 */
	public static List<Object> removeDuplicate(List<Object> list)
	{
		if(null!=list&&list.size()>0){
			if(list.size()>1){
			List<Object> newList=new ArrayList<Object>();
			  Set set = new HashSet();
	          set.addAll(list);
	          newList.addAll(set);
			  return newList;	
			}else{
				return list;
			}
		}else{
			return null;
		}
	}
	/*
	 * 数组转字符串（逗号隔开并去掉最后一个逗号）
	 * 马芳
	 */
	public static String changeStrings( String[] array)
	{
		StringBuffer sb = new StringBuffer();
		for(int i = 0; i < array.length; i++){
		  sb. append(array[i]+",");
		}
		  if(sb.length() >0){
		    sb.deleteCharAt(sb.length()-1);
		  }
		return sb.toString();
	}
	//验证路径
	public static boolean isValidPath(String path) {  
		 String pathPattern = "(^//.|^/|^[a-zA-Z])?:?/.+(/$)?";
	     if (org.apache.commons.lang3.StringUtils.isNotEmpty(path)){
		     if(path.matches(pathPattern)){
		    	 return true;
		     }else{
		    	 return false;
		     }
	     }else{
	    	 return false;
	     }
	}
	
	/**
	 * 
	 * 如果str不是empty，则返回自身，否则返回sdefault
	 * @date 2014-6-16
	 * @param str
	 * @param sDefault
	 * @return
	 */
	public static String getDefaultIfEmpty(String str,String sDefault) {
	    if(StringUtils.isEmpty(str)) {
	        return sDefault;
	    }else {
	        return str;
	    }
	}
}