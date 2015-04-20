package org.nxstudio.service.socketserver.util;

import org.nxstudio.service.socketserver.Notifier;
import org.nxstudio.service.socketserver.io.Request;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.SocketChannel;

public class Helper {
    private static Log log = LogFactory.getLog(Helper.class);

    private static int BUFFER_SIZE = 1024;

    // private static Logger log = Logger.getLogger(Helper.class);

    /**
     * 读取客户端发出请求数据
     *
     * @param sc 套接通道
     */
    public static byte[] readRequest(SocketChannel sc) throws IOException {
        int off = 0;
        ByteBuffer buffer = ByteBuffer.allocate(BUFFER_SIZE);
        byte[] data = new byte[BUFFER_SIZE * 10];
        int circle = 1;
        while (true) {
//			if (circle > 1) {// circle 暂时无特别用途做为读一次控制，以后可以留做读多次扩展
//				break;
//			}
            buffer.clear();
            int size = sc.read(buffer);
            //System.out.println(new String(buffer.array()));
            //log.info("" + new String(buffer.array()));
            if (size <= 0)
                break;
            if ((off + size) > data.length) {
                data = grow(data, BUFFER_SIZE * 10);
            }
            System.arraycopy(buffer.array(), 0, data, off, size);
            off += size;
            circle++;
        }
        byte[] req = new byte[off];
        System.arraycopy(data, 0, req, 0, off);
        return req;
    }

    /**
     * 数组扩容
     *
     * @param src  源数组数据
     * @param size 扩容的增加量
     * @return 扩容后的数组
     */
    public static byte[] grow(byte[] src, int size) {
        byte[] tmp = new byte[src.length + size];
        System.arraycopy(src, 0, tmp, 0, src.length);
        return tmp;
    }

    /**
     * 安全关闭套接通道
     *
     * @param sc       套接通道
     * @param notifier 事件触发器
     * @param request  客户请求
     */
    public static void close(SocketChannel sc, Notifier notifier, Request request) {
        try {
            sc.finishConnect();
            sc.close();
            sc.socket().close();
            // 触发onClosed事件
            notifier.fireOnClosed(request);
        } catch (Exception e) {
            log.error("XXX", e);
            log.warn("关闭套接通道时发生异常", e);
        }
    }

    /**
     * 向客户端写数据
     *
     * @param sc   套接通道
     * @param data 待响应数据
     */
    public static void send(SocketChannel sc, byte[] data) throws IOException {
//		int position = 0; // data数组的当前位置
//		byte[] tmp = new byte[BUFFER_SIZE];
//
//		while (position < data.length) {
//			int size = 0;
//			if (data.length - position > BUFFER_SIZE) {
//				size = BUFFER_SIZE;
//			} else {
//				size = data.length - position;
//			}
//			System.arraycopy(data, position, tmp, 0, size);
//
//			ByteBuffer buffer = ByteBuffer.wrap(tmp, 0, size);
//			// buffer.flip(); //只有在使用过put等操作后，才需要执行flip命令
//			int out = sc.write(buffer);
//			if (out == 0) { // 底层缓存区空间不够，等待100毫秒
//				try {
//					log.warn("底层缓存区空间不够，发送字节数为0");
//					Thread.sleep(100);
//				} catch (InterruptedException e) {
//					log.error("XXX", e);
//				}
//			} else {
//				position = position + out;
//			}
//		}
        ByteBuffer buffer = ByteBuffer.wrap(data, 0, data.length);
        int out = sc.write(buffer);
        if (out == 0) { // 底层缓存区空间不够，等待100毫秒
            try {
                log.warn("底层缓存区空间不够，发送字节数为0");
                Thread.sleep(100);
            } catch (InterruptedException e) {
                log.error("XXX", e);
            }
        }

    }


    public static BaseObj buildInData(byte[] in) throws Exception {
        BaseObj bo = null;
        try {
            String inString = new String(in, "GBK");
            String busi_code = inString.substring(0, BaseObj.busi_code_length);
            String class_name = "";
            // 如果头报文的前4位是TISC，则代表是信贷发起的查询交易，否则就是大额支付的交易
            if (busi_code.equalsIgnoreCase("TISC")) {
                String code = inString.substring(10, 14);
                class_name = "com.leadmind.common.xindai.pj" + code + ".BusiObj";
            } else {
                class_name = "com.leadmind.common.hvps.server.pj" + busi_code + ".BusiObj";
            }
            bo = (BaseObj) Class.forName(class_name).newInstance();
        } catch (Exception e) {
            log.error("XXX", e);
            throw new Exception("错误的交易号，没有该交易");
        }
        if (bo.getHeadTotalLength() + bo.getBusiTotalLength() != in.length) {
            bo.setErrorMsg("输入的数据长度不等于业务对象接口定义的长度总和");
            bo.setReturnCode("RT0401");
            return bo;
        }
        try {
            bo = buildInHeadData(bo, in);
            bo = buildInBusiData(bo, in);
        } catch (Exception e) {
            log.error("XXX", e);
            bo.setErrorMsg("处理交易" + bo.getBusi_code() + e.getMessage());
            bo.setReturnCode("RT0401");
            return bo;
        }
        return bo;
    }

    public static BaseObj buildInBusiData(BaseObj bo, byte[] in) throws Exception {
        String[] outArea = bo.getInArea();
        String[] outAreaType = bo.getInAreaType();
        int[] outAreaLen = bo.getInAreaLen();
        byte busiCont[] = Helper.getPartBytes(in, bo.getHeadTotalLength(), bo.getBusiTotalLength());
        int index = 0;
        for (int i = 0; i < outArea.length; i++) {
            String item = outArea[i];
            String iType = outAreaType[i];
            int iLen = outAreaLen[i];
            try {
                byte[] ivalue = Helper.getPartBytes(busiCont, index, iLen);
                String value = getItemValueByType(ivalue, iType); // 获取值
                bo.setValues(item, value);
            } catch (Exception e) {
                log.error("XXX", e);
                // e.printStackTrace();
                throw new Exception("获取响应报文信息出错,输入项" + item + "值解析错误");
            }
            index = index + iLen;
        }
        return bo;
    }

    public static BaseObj buildInHeadData(BaseObj bo, byte[] in) throws Exception {
        String[] outArea = bo.getHeadArea();
        String[] outAreaType = bo.getHeadAreaType();
        int[] outAreaLen = bo.getHeadAreaLen();
        int index = 0;
        for (int i = 0; i < outArea.length; i++) {
            String item = outArea[i];
            String iType = outAreaType[i];
            int iLen = outAreaLen[i];
            try {
                byte[] ivalue = Helper.getPartBytes(in, index, iLen);
                String value = getItemValueByType(ivalue, iType); // 获取值
                bo.setValues(item, value);
            } catch (Exception e) {
                log.error("XXX", e);
                // e.printStackTrace();
                throw new Exception("获取响应头信息出错,输入项" + item + "值解析错误");
            }
            index = index + iLen;
        }
        return bo;
    }

    // 读取指定长度的byte数组
    public static byte[] getPartBytes(byte[] bt, int begin, int len) {
        byte[] bbt = new byte[len];
        for (int i = 0; i < len; i++) {
            bbt[i] = bt[begin + i];
        }
        return bbt;
    }

    // 根据类型从字节数组中获取返回值
    private static String getItemValueByType(byte[] value, String type) {
        String rs = "";
        String rec = Constant.getCharsetStr(value);
        // 格式化接收到的数据
        if (type.toUpperCase().equals("X")) {
            rs = getStrTrim(rec);
        } else {
            rs = getDataStr(rec, type); // 转换为数字类型
        }
        return rs;
    }

    public static String getStrTrim(String str) {
        String rs = "";
        rs = str.trim();
        return rs;
    }

    // 获取整数
    // type: "9","s9","9v99","s9v999" 解析标准的定长数字型数据，
    public static String getDataStr(String str, String type) {
        String rs = "";
        if (type.toLowerCase().equals("9")) { // 纯数字
            if (str.startsWith("+") || str.startsWith("-")) {
                str = str.substring(1);

            }
            rs = divBefZero(str);
        } else if (type.toLowerCase().equals("s9")) {// 带+/-号的数字
            String pix = "";
            if (str.startsWith("-")) {
                pix = "-";
                str = str.substring(1);
            } else if (str.startsWith("+")) {
                str = str.substring(1);
            }
            rs = pix + divBefZero(str);
        } else {
            if (type.toLowerCase().startsWith("9v")) { // 小数点
                if (str.startsWith("+") || str.startsWith("-")) {
                    str = str.substring(1);
                }
                // String tmp=divBefZero(str); //
                int c = getSmlCount(type);
                // rs=
                // tmp.substring(0,tmp.length()-c)+"."+tmp.substring(tmp.length()-c);
                // if(rs.startsWith(".")){
                // rs="0"+rs;
                // }
                rs = getZhengStr(str, c) + "." + getSmlStr(str, c);
                return rs;
            } else if (type.toLowerCase().startsWith("s9v")) {// 带+/-号的数字
                String pix = "";
                if (str.startsWith("-")) {
                    pix = "-";
                    str = str.substring(1);
                } else if (str.startsWith("+")) {
                    str = str.substring(1);
                }
                String tmp = divBefZero(str); //
                int c = getSmlCount(type);
                return pix + tmp.substring(0, tmp.length() - c) + "." + tmp.substring(tmp.length() - c);

            }
        }
        return rs;
    }

    // 去除数字前面的0
    private static String divBefZero(String str) {
        if (str == null || str.trim().equals("")) {
            return "";

        }
        char[] arr = str.toCharArray();
        int j = 0;
        boolean hasNoZero = false;
        for (int i = 0; i < arr.length; i++) {
            char k = arr[i];
            if (k != '0') { // 过滤前面的0
                hasNoZero = true;
                j = i;
                break;
            }

        }
        if (j == 0) {
            if (!hasNoZero) {// 说明都是0组成的字符串
                return "";
            }
        }
        return str.substring(j);
    }

    // 获取小数位个数
    private static int getSmlCount(String type) {

        String tmp = type.substring(type.toLowerCase().indexOf("v") + 1); // s9v999表示三位小数
        return tmp.length();
    }

    // 获取整数值，
    private static String getZhengStr(String str, int smlCount) {

        if (str.length() <= smlCount) {
            return "0";
        } else {
            str = str.substring(0, str.length() - smlCount);
            // 去除整数前面的0
            str = divBefZero(str);
            return str;
        }
    }

    // 获取小数点后的数值，
    private static String getSmlStr(String str, int smlCount) {
        String t = "";
        if (str.length() < smlCount) {
            for (int i = 0; i < smlCount - str.length(); i++) {
                t = t + "0";
            }
            return t + str;
        } else {
            str = str.substring(str.length() - smlCount);
            return str;
        }
    }

    public static byte[] spe_buildOutData(BaseObj bo) throws Exception {
        byte[] allArr;
        byte[] headData;
        byte[] busiData;
        // ******************组装头信息开始*******************
        headData = buildSpeHeadOutData(bo);
        busiData = buildBusiOutData(bo);
        allArr = copyArr(headData, busiData);
        //System.out.println(new String(allArr));
        return allArr;
        // ******************组装头信息结束*******************
    }

    public static byte[] buildOutData(BaseObj bo) throws Exception {
        byte[] allArr;
        byte[] headData;
        byte[] busiData;
        // ******************组装头信息开始*******************
        headData = buildHeadOutData(bo);
        busiData = buildBusiOutData(bo);
        allArr = copyArr(headData, busiData);
        return allArr;
        // ******************组装头信息结束*******************
    }

    public static byte[] copyArr(byte[] src, byte[] dest) {
        byte[] tmp = new byte[src.length + dest.length];
        System.arraycopy(src, 0, tmp, 0, src.length);

        for (int i = 0; i < dest.length; i++) {
            tmp[i + src.length] = dest[i];
        }
        return tmp;
    }

    private static byte[] buildBusiOutData(BaseObj bo) throws Exception {
        ByteParser tools = new ByteParser();
        String[] outArea = bo.getOutArea();
        String[] outAreaType = bo.getOutAreaType();
        int[] outAreaLen = bo.getOutAreaLen();
        for (int i = 0; i < outArea.length; i++) {
            String key = outArea[i];
            String type = outAreaType[i];
            int length = outAreaLen[i];
            String value = bo.getValues(key);
            if (value == null) {
                value = "";
            }
            byte[] tA = null;
            if ("x".equals(type.toLowerCase())) {// 字符类型
                if (value.getBytes("GBK").length > length) {
                    throw new Exception("交易" + bo.getBusi_code() + "解析报文体错误:" + "字段(" + key + ")byte长度为" + (value.getBytes("GBK").length) + "，超过规定的长度" + length);
                } else {
                    String mStr = value;
                    byte[] byteValue = mStr.getBytes("GBK");
                    for (int j = 0; j < length - byteValue.length; j++) {
                        mStr = mStr + " ";
                    }
                    value = mStr;
                }
            } else {// 数值类型 添加+/-符号，去除小数点，填充整数，填充小数位;中间直接判断是否超长
                value = getFormatStrData(key, value, type, length);
            }
            tA = Constant.getByteArr(value);
            tools.sendBytes(tA);
        }
        return tools.getTotalBytes();
    }

    public static String getFormatStrData(String key, String value, String type, int len) throws Exception {
        if ("9".equals(type.toLowerCase())) {
            // 去掉前面的+/-号
            if (value.startsWith("+") || value.startsWith("-")) {
                value = value.substring(1);
            }
            if (value.indexOf(".") != -1) {
                value = value.substring(0, value.indexOf("."));
            }
            if (value.length() > len) {
                throw new Exception("字段(" + key + ")长度为" + (value.length()) + "，超过规定的长度" + len);
            } else {
                String mStr = value;
                for (int i = 0; i < len - value.length(); i++) {
                    mStr = "0" + mStr;
                }
                value = mStr;
            }
            return value;// 单纯数字，直接返回
        } else if ("9s".equals(type.toLowerCase())) {
            if (value.indexOf(".") != -1) {
                value = value.substring(0, value.indexOf("."));
            }
            if (value.startsWith("-")) { // 已经带负号不处理
                if (value.length() > len) {
                    throw new Exception("字段(" + key + ")长度为" + (value.length()) + "，超过规定的长度" + len);
                } else {
                    String tmpValue = value.substring(1);
                    for (int i = 0; i < len - value.length(); i++) {
                        tmpValue = "0" + tmpValue; // +/-号后面补足不够的整数位
                    }
                    value = "-" + tmpValue;
                }
            } else if (value.startsWith("+")) {// 已经带正号
                if (value.length() > len) {
                    throw new Exception("字段(" + key + ")长度为" + (value.length()) + "，超过规定的长度" + len);
                } else {
                    String tmpValue = value.substring(1);
                    for (int i = 0; i < len - value.length(); i++) {
                        tmpValue = "0" + tmpValue; // +/-号后面补足不够的整数位
                    }
                    value = "+" + tmpValue;
                }
            } else {
                // 超长，直接报错，加一是因为要加上 +/-
                if (value.length() + 1 > len) {
                    throw new Exception("字段(" + key + ")长度为" + (value.length()) + "，超过规定的长度" + len);
                } else {
                    String mStr = value;
                    for (int i = 0; i < len - 1 - value.length(); i++) {
                        mStr = "0" + mStr; // +/-号后面补足不够的整数位
                    }
                    value = "+" + mStr;
                }
            }
            return value;
        } else if (type.toLowerCase().startsWith("9v")) {
            if (value.startsWith("+") || value.startsWith("-")) {
                value = value.substring(1);
            }
            // 获取小数点后的
            int sC = getSmaCount(type);// 接口规定的小数点后多少位
            // 获取格式化后的小数值
            String sS = getSmaStr(value, sC);
            // 获取整数值
            String zStr = value;
            if (value.indexOf(".") != -1) {
                zStr = value.substring(0, value.indexOf("."));
            }
            // 整数的长度为len-sC
            int zLen = len - sC;
            if (zStr.length() > zLen) {
                throw new Exception("字段(" + key + ")长度为" + (value.length()) + "，超过规定的长度" + len);
            } else {
                String mStr = zStr;
                for (int i = 0; i < (zLen - zStr.length()); i++) {
                    mStr = "0" + mStr;
                }
                zStr = mStr;
            }
            value = zStr + sS;
            return zStr + sS; // 整数+小数
        } else if (type.toLowerCase().startsWith("s9v")) {
            // 获取小数点后的
            int sC = getSmaCount(type);// 接口规定的小数点后多少位
            // 获取格式化后的小数值
            String sS = getSmaStr(value, sC);

            String sign = "";// 正负号标记
            String zStr = "";
            if (value.indexOf(".") != -1) {
                value = value.substring(0, value.indexOf("."));
            }
            if (value.startsWith("-")) {
                sign = "-";
                zStr = value.substring(1);
            } else if (value.startsWith("+")) {
                sign = "+";
                zStr = value.substring(1);
            } else {
                sign = "+";
                zStr = value;
            }

            // 规定的整数位= len-sC-1 (长度-小数位长度-符号位长度)
            int zLen = len - sC - 1;
            if (zStr.length() > zLen) {// 整数位丢失，必须报错
                throw new Exception("字段(" + key + ")长度为" + (value.length()) + "，超过规定的长度" + len);
            } else {
                String mStr = zStr;
                for (int i = 0; i < (zLen - zStr.length()); i++) {
                    mStr = "0" + mStr;
                }
                zStr = mStr;
            }
            value = sign + zStr + sS; // 正确的是：符号+整数位+小数位
        }
        return value;
    }

    private static byte[] buildSpeHeadOutData(BaseObj bo) throws Exception {
        ByteParser tools = new ByteParser();
        String[] outArea = bo.getSpeHeadArea();
        String[] outAreaType = bo.getSpeHeadAreaType();
        int[] outAreaLen = bo.getSpeHeadAreaLen();
        try {
            for (int i = 0; i < outArea.length; i++) {
                String key = outArea[i];
                String type = outAreaType[i];
                int length = outAreaLen[i];
                String value = bo.getValues(key);
                if (value == null) {
                    value = "";
                }
                byte[] tA = null;
                if ("x".equals(type.toLowerCase())) {// 字符类型
                    if (value.getBytes("GBK").length > length) {
                        throw new Exception("交易" + bo.getBusi_code() + "解析报文头错误:" + "字段(" + key + ")byte长度为" + (value.getBytes("GBK").length) + "，超过规定的长度" + length);
                    } else {
                        String mStr = value;
                        byte[] byteValue = mStr.getBytes("GBK");
                        for (int j = 0; j < length - byteValue.length; j++) {
                            mStr = mStr + " ";
                        }
                        value = mStr;
                    }
                } else {// 数值类型 添加+/-符号，去除小数点，填充整数，填充小数位;中间直接判断是否超长
                    value = getFormatStrData(key, value, type, length);
                }
                tA = Constant.getByteArr(value);
                tools.sendBytes(tA);
            }
        } catch (Exception e) {
            log.error("XXX", e);
            throw new Exception("交易" + bo.getBusi_code() + "解析报文头错误:" + e.getMessage());
        }
        return tools.getTotalBytes();
    }

    private static byte[] buildHeadOutData(BaseObj bo) throws Exception {
        ByteParser tools = new ByteParser();
        String[] outArea = bo.getHeadArea();
        String[] outAreaType = bo.getHeadAreaType();
        int[] outAreaLen = bo.getHeadAreaLen();
        try {
            for (int i = 0; i < outArea.length; i++) {
                String key = outArea[i];
                String type = outAreaType[i];
                int length = outAreaLen[i];
                String value = bo.getValues(key);
                if (value == null) {
                    value = "";
                }
                byte[] tA = null;
                if ("x".equals(type.toLowerCase())) {// 字符类型
                    if (value.getBytes("GBK").length > length) {
                        throw new Exception("交易" + bo.getBusi_code() + "解析报文头错误:" + "字段(" + key + ")byte长度为" + (value.getBytes("GBK").length) + "，超过规定的长度" + length);
                    } else {
                        String mStr = value;
                        byte[] byteValue = mStr.getBytes("GBK");
                        for (int j = 0; j < length - byteValue.length; j++) {
                            mStr = mStr + " ";
                        }
                        value = mStr;
                    }
                } else {// 数值类型 添加+/-符号，去除小数点，填充整数，填充小数位;中间直接判断是否超长
                    value = getFormatStrData(key, value, type, length);
                }
                tA = Constant.getByteArr(value);
                tools.sendBytes(tA);
            }
        } catch (Exception e) {
            log.error("XXX", e);
            throw new Exception("交易" + bo.getBusi_code() + "解析报文头错误:" + e.getMessage());
        }
        return tools.getTotalBytes();
    }

    // 根据类型，规定的小数点位数
    private static int getSmaCount(String type) {
        // int rs = 0;
        String tmp = type.substring(type.toLowerCase().indexOf("v") + 1); // s9v999表示三位小数
        return tmp.length();

    }

    private static String getSmaStr(String str, int count) {
        String rs = "";
        if (str.indexOf(".") == -1) {
            for (int i = 0; i < count; i++) {
                rs = rs + "0"; // 右边补0
            }
        } else {
            String tmpStr = str.substring(str.indexOf(".") + 1);
            if (tmpStr.length() > count) {
                tmpStr = tmpStr.substring(0, count);
            } else if (tmpStr.length() <= count) {
                String mStr = tmpStr;
                for (int i = 0; i < (count - tmpStr.length()); i++) {
                    mStr = mStr + "0";
                }
                tmpStr = mStr;
            }
            rs = tmpStr;
        }

        return rs;
    }

    public static void main(String args) throws Exception {
        log.info("" + Exceptest());
    }

    public static int Exceptest() throws Exception {
        int i = 0;
        try {
            Integer.parseInt("er");
        } catch (Exception e) {
            log.error("XXX", e);
            i = 3;
            return i;
        }
        return i;
    }
}
