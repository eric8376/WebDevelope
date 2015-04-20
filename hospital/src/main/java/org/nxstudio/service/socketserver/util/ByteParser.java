package org.nxstudio.service.socketserver.util;


import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.util.HashMap;

import org.nxstudio.service.socketserver.constants.CodeConst;
import org.nxstudio.service.socketserver.exceptions.DAOException;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


public class ByteParser {
    private static Log log = LogFactory.getLog(ByteParser.class);

    // String 类型的转化为byte[]
    // public static Logger log = Logger.getLogger(ByteParser.class);

    public static byte[] getBytesByLen(String para) throws Exception {
        int len = 0xfa;
        byte[] datas = para.getBytes("GBK");// 可以指定字符集
        int k = datas.length / len + 1;
        // log.info(""+k + " " + datas.length);
        ByteParser bser = new ByteParser();
        for (int i = 0; i < k; i++) {
            if (i == (k - 1)) {
                int lenL = datas.length - i * 0xfa;
                bser.sendInt(lenL);
                bser.sendBytes(getPartBytes(datas, i * 0xfa, lenL));
            } else {
                byte[] newBt = new byte[0xfa];
                int p = 0;
                for (int j = i * 0xfa; j < (i + 1) * 0xfa; j++) {
                    newBt[p] = datas[j];
                    p++;
                }
                bser.sendInt(0xff);
                bser.sendBytes(newBt);
            }
        }
        return bser.getTotalBytes();
    }

    public static byte[] grow(byte[] src, int size) {
        byte[] tmp = new byte[src.length + size];
        System.arraycopy(src, 0, tmp, 0, src.length);
        return tmp;
    }

    // 转化short类型为byte[]
    public static byte[] getBytesByLen(short vu) {
        byte[] tmp = null;
        String hexString = Integer.toHexString(vu);
        int len = 4 - hexString.length();
        String tmpS = "";
        for (int i = 0; i < len; i++) {
            tmpS += 0;
        }
        tmpS += hexString;
        tmp = string2Bytes(tmpS);
        return tmp;
    }

    // 转化int类型为byte[]
    public static byte[] getBytesByLen(int vu) {
        byte[] tmp = null;
        String hexString = Integer.toHexString(vu);
        int len = 8 - hexString.length();
        String tmpS = "";
        for (int i = 0; i < len; i++) {
            tmpS += 0;
        }
        tmpS += hexString;
        tmp = string2Bytes(tmpS);
        return tmp;
    }

    // 转化char[] 到 byte[]
    public static byte[] getBytesByLen(char[] chs) {
        byte[] tmp = new byte[chs.length];
        for (int i = 0; i < chs.length; i++) {
            tmp[i] = (byte) chs[i];
        }
        return tmp;
    }

    // 转化十六进制的字符串为byte[]
    public static byte[] string2Bytes(String para) {
        int len = para.length() / 2;
        byte[] tmp = new byte[len];

        String[] paras = new String[len];
        for (int i = 0; i < len; i++) {
            String pa = para.substring(2 * i, 2 * i + 2);
            int vu = Integer.parseInt(pa, 16);
            tmp[i] = (byte) (vu & 0xff);
        }

        return tmp;
    }

    // 补充指定数据包的长度,使数据包能够满足报文规范（往右边填充）
    public static byte[] reSizeBytes(byte[] bt, int len) {
        byte[] tmp = new byte[len];
        for (int i = 0; i < bt.length; i++) {
            tmp[i] = bt[i];
        }
        for (int i = bt.length; i < len; i++) {
            tmp[i] = 32;
        }
        return tmp;
    }

    // 补充指定数据包的长度,使数据包能够满足报文规范（往左边边填充）
    public static byte[] reSizeBytesLeft(byte[] bt, int len) {
        if (len <= bt.length)
            return bt;

        byte[] tmp = new byte[len];
        // 先填充空值
        for (int i = 0; i < (len - bt.length); i++) {
            tmp[i] = 0x00;
        }
        for (int i = len - bt.length; i < len; i++) {
            tmp[i] = bt[i - (len - bt.length)];
        }

        return tmp;
    }

    // 左填充
    public static String leftPad(String str, int size, char padChar) {
        if (str == null) {
            str = "";
        }
        int pads = size - str.length();
        if (pads <= 0) {
            return str; // returns original String when possible
        }
        return padding(pads, padChar).concat(str);
    }

    // 右填充
    public static String rightPad(String str, int size, char padChar) {
        if (str == null) {
            str = "";
        }
        int pads = size - str.length();
        if (pads <= 0) {
            return str; // returns original String when possible
        }
        return str.concat(padding(pads, padChar));
    }

    private static String padding(int repeat, char padChar) {
        StringBuffer sb = new StringBuffer(repeat + 10);
        while (repeat-- > 0) {
            sb.append(padChar);
        }
        return sb.toString();
    }

    private ByteArrayOutputStream baos;

    public ByteParser() {
        baos = new ByteArrayOutputStream();
    }

    // 往缓冲区填充
    public void sendBytes(byte[] bs) {
        try {
            baos.write(bs);
        } catch (Exception e) {
            log.error("XXX", e);
            log.error(e.getMessage());
        }
    }

    // 往缓冲区中填充int
    public void sendInt(int k) {
        try {
            baos.write(k);
        } catch (Exception e) {
            log.error("XXX", e);
            // e.printStackTrace();
        }
    }

    // 往缓冲区中填充char
    public void sendChar(char k) {
        try {
            baos.write(k);

        } catch (Exception e) {
            log.error("XXX", e);
            // e.printStackTrace();
        }
    }

    // 将要送给远程tuxedo的字节包
    public byte[] getTotalBytes() {
        return baos.toByteArray();

    }

    // *******************************指定解包方法****
    public static String getStringVu(byte[] bt) {
        String ret = null;
        ret = new String(bt);
        return ret;
    }

    // 返回一个数值!!!!!!!!!!!!!!!!!

    public static String getVu(byte[] bt, String type) {
        String ret = null;
        try {
            DataInputStream dis = new DataInputStream(new ByteArrayInputStream(bt));
            if (type.equals("byte")) {
                ret = dis.readUnsignedByte() + "";
            } else if (type.equals("short")) {
                ret = dis.readShort() + "";
            } else if (type.equals("int")) {
                ret = dis.readInt() + "";
            } else if (type.equals("long")) {
                ret = dis.readLong() + "";
            } else if (type.equals("char")) {
                ret = new String(bt);
            }
        } catch (Exception e) {
            log.error("XXX", e);
            // e.printStackTrace();
            // log.info(e.getMessage());
        }
        return ret;
    }

    // 读取指定长度的byte数组
    public static byte[] getPartBytes(byte[] bt, int begin, int len) throws DAOException {
        byte[] bbt = new byte[len];
        try {
            for (int i = 0; i < len; i++) {
                bbt[i] = bt[begin + i];
            }
        } catch (Exception e) {

            log.error(e.getMessage());
            log.error("信息包长度不够*********");
            throw new DAOException(e.getMessage() + " 解包的时候,数据包长度不符合,请检查报文域", CodeConst.DAO_ERR_CODE_DEFAULT);

        }
        return bbt;
    }

    // 读取指定长度的String数组
    public static String[] getPartString(String[] bt, int begin, int len) throws DAOException {
        String[] bbt = new String[len];
        try {
            for (int i = 0; i < len; i++) {
                bbt[i] = bt[begin + i];
            }
        } catch (Exception e) {

            log.error(e.getMessage());
            log.error("信息包长度不够*********");
            throw new DAOException(e.getMessage() + " 解包的时候,数据包长度不符合,请检查报文域", CodeConst.DAO_ERR_CODE_DEFAULT);

        }
        return bbt;
    }

    // 读取指定长度的int数组
    public static int[] getPartInt(int[] bt, int begin, int len) throws DAOException {
        int[] bbt = new int[len];
        try {
            for (int i = 0; i < len; i++) {
                bbt[i] = bt[begin + i];
            }
        } catch (Exception e) {

            log.error(e.getMessage());
            log.error("信息包长度不够*********");
            throw new DAOException(e.getMessage() + " 解包的时候,数据包长度不符合,请检查报文域", CodeConst.DAO_ERR_CODE_DEFAULT);

        }
        return bbt;
    }

    public static boolean isAllZero(byte[] bt) {
        boolean ret = true;
        for (int i = 0; i < bt.length; i++) {// 如果有一个不为零
            if (bt[i] != 0) {
                ret = false;
                break;
            }
        }
        return ret;
    }

    // 组合发送给核心系统的业务数据
    public static byte[] getBillToCenBytes(String[] indexParas, HashMap h) {
        try {
            // String objName="obj";
            ByteParser bpser = new ByteParser();
            // bpser.sendBytes(ByteParser.getBytesByLen(objName));

            for (int i = 0; i < indexParas.length; i++) {
                String vu = (String) h.get(indexParas[i]);
                if (vu != null) {
                    bpser.sendBytes(ByteParser.getBytesByLen(vu));
                } else {
                    bpser.sendInt(0);
                }
            }
            return bpser.getTotalBytes();
        } catch (Exception e) {
            log.error("XXX", e);
            log.error(e.getMessage());
            return new byte[0];
        }
    }

    // 组合发送给核心系统的业务数据
    public static byte[] getBillToCenBytes_6527(String[] indexParas, HashMap h) {
        try {
            // String objName="obj";
            ByteParser bpser = new ByteParser();
            // bpser.sendBytes(ByteParser.getBytesByLen(objName));

            for (int i = 0; i < indexParas.length; i++) {
                String vu = (String) h.get(indexParas[i]);
                if (vu != null) {
                    bpser.sendBytes(ByteParser.getBytesByLen(vu));
                } else {
                    bpser.sendInt(0);
                }
            }
            return bpser.getTotalBytes();
        } catch (Exception e) {
            log.error("XXX", e);
            // e.printStackTrace();
            return new byte[0];
        }
    }

    // 组合有表单的情况
    /*
	 * public static byte[] getBillToCenBytes(String[] indexParas,List l){
	 * log.info(""+indexParas); log.info(""+l); try{ String objName="list";
	 * ByteParser bpser=new ByteParser();
	 * bpser.sendBytes(ByteParser.getBytesByLen(objName)); int _len=0;
	 * if(l==null){ bpser.sendInt(0); //列表长度
	 * bpser.sendInt(indexParas.length);//列表宽度 }else{ bpser.sendInt(l.size());
	 * //列表长度 bpser.sendInt(indexParas.length);//列表宽度 for(int j=0;j<l.size();j++){
	 * String[] tmp=(String[])l.get(j); if(tmp!=null){ for(int i=0;i<indexParas.length;i++){
	 * String vu=tmp[i]; if(vu!=null){
	 * bpser.sendBytes(ByteParser.getBytesByLen(vu)); }else{ bpser.sendInt(0); } } } } } // *
	 * return bpser.getTotalBytes(); }catch(Exception e){ e.printStackTrace();
	 * return new byte[0]; } }
	 * 
	 * 
	 * 
	 * /** 新增的电子票据组包方式
	 */
    /***************************************************************************
     * public static byte[] listToBytes(ListObj lob) throws DAOException{ byte[]
     * b=new byte[0]; try{ ByteParser bpser=new ByteParser(); if(lob==null)
     * throw new
     * DAOException("向核心发送包时,列表对象为空",ExceptionConst.DEFAULT_EXCEPTION); String
     * listName=lob.getLstName();
     * if(listName==null||"".equalsIgnoreCase(listName)){ listName="OBJ0"; }
     * bpser.sendBytes(ByteParser.getBytesByLen(listName));
     *
     * bpser.sendInt(lob.getRows()); bpser.sendInt(lob.getCols()); String[]
     * index=lob.getStruts(); List list=lob.getListData(); StringBuffer sb=new
     * StringBuffer(); for(int i=0;i<list.size();i++){ HashMap hp=(HashMap)
     * list.get(i); for(int j=0;j<index.length;j++){ String
     * vu=(String)hp.get(index[j]); sb.append("key="+index[j]+" ; vu="+vu+"\n");
     * if(vu!=null){ bpser.sendBytes(ByteParser.getBytesByLen(vu)); }else{
     * bpser.sendInt(0);//如果为空,以0代替 } } }
     *
     * log.info("列表对象="+sb.toString()); b=bpser.getTotalBytes(); // *
     * }catch(Exception e){ e.printStackTrace(); } return b; }
     * //************************解包方法结束
     **************************************************************************/
	/*
	 * public static void main(String[] args){
	 * 
	 * 
	 * String[] index=test001Const.getListStrutsByKey(test001Const.LIST_OBJ1);
	 * List list=new ArrayList(); HashMap hp=null; for(int i=0;i<3;i++){ hp=new
	 * HashMap(); hp.put("LB01","ab"+i); hp.put("LB02","cd"+(i+1));
	 * hp.put("LB03","ef"+i); list.add(hp); }
	 * 
	 * ListObj lob=new ListObj(index); lob.setListData(list); try{ byte[]
	 * b=listToBytes(lob); for(int i=0;i<b.length;i++){ log.info(""+b[i]+" // *
	 * "); } }catch(Exception e){ e.printStackTrace(); } }
	 */

    /**
     * 组装头信息
     */
    public static byte[] CommCombinBytes(HashMap paraVu, HashMap paraIndex, String[] paraSeq) {
        byte[] tmp = null;

        // byte流解析器
        ByteParser bper = new ByteParser();
        for (int i = 0; i < paraSeq.length; i++) {
            byte[] tmping = null;
            String indexString = paraSeq[i];
            // log.info(""+indexString);
            // 标准解析
            String[] comIndex = (String[]) (paraIndex.get(indexString));
            String type = comIndex[0];
            int len = Integer.parseInt(comIndex[1]);
            Object vu = paraVu.get(indexString);// 数据对象

            if (vu == null) {// 用0x00填充
                tmping = ByteParser.reSizeBytes(new byte[0], len);
            } else {
                if (type.equals("short")) {
                    short st = Short.parseShort((String) vu);
                    tmping = ByteParser.getBytesByLen(st);

                } else if (type.equals("char")) {
                    String str = (String) vu;
                    tmping = str.getBytes();
                    tmping = ByteParser.reSizeBytes(tmping, len);

                } else if (type.equals("int")) {
                    int it = Integer.parseInt((String) vu);
                    tmping = ByteParser.getBytesByLen(it);
                } else if (type.equals("byte")) {
                    tmping = new byte[1];
                    tmping[0] = Byte.parseByte((String) vu);
                }
            }
            // 处理好一个字段 把流体推入缓冲区
            bper.sendBytes(tmping);
        }
        tmp = bper.getTotalBytes();
        return tmp;
    }

    public static String byte_to_str(byte[] b) {
        StringBuffer sb = new StringBuffer();
        if (b != null) {
            for (int i = 0; i < b.length; i++) {
                sb.append(b[i] + ",");

            }
        }

        return sb.toString();
    }

}
