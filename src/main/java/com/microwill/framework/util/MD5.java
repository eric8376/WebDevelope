package com.microwill.framework.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * MD5的算法在RFC1321 中定义
 * 在RFC 1321中，给出了Test suite用来检验你的实现是否正确： 
 * MD5 ("") = d41d8cd98f00b204e9800998ecf8427e 
 * MD5 ("a") = 0cc175b9c0f1b6a831c399e269772661 
 * MD5 ("abc") = 900150983cd24fb0d6963f7d28e17f72 
 * MD5 ("message digest") = f96b697d7cb7938d525a2f31aaf161d0 
 * MD5 ("abcdefghijklmnopqrstuvwxyz") = c3fcd3d76192e4007dfb496cca67e13b 
 * 
 * @author haogj
 *
 * 传入参数：一个字节数组
 * 传出参数：字节数组的 MD5 结果字符串
 */
public class MD5 {
    
    /**
     * 默认的密码字符串组合，apache校验下载的文件的正确性用的就是默认的这个组合
     */
    protected static char hexDigits[] = { '0', '1', '2', '3', '4', '5', '6',
            '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };
    
    protected static MessageDigest messagedigest = null;
    protected static MessageDigest messagedigestOfSHA = null;
    static {
        try {
            messagedigest = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException nsaex) {
            System.err.println(MD5.class.getName()
                    + "初始化失败，MessageDigest不支持MD5。");
            nsaex.printStackTrace();
        }
        try {
            messagedigestOfSHA = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException nsaex) {
            System.err.println(MD5.class.getName()
                    + "初始化失败，MessageDigest不支持MD5。");
            nsaex.printStackTrace();
        }
    }
    
    public static String getFileMD5String(String filename) throws IOException {
        return getFileMD5String(new File(filename));
    }
    
    /**
     * 注意：文件要大于虚拟机最大内存，否则会抛出OOM异常
     * 
     * @param file
     * @return
     * @throws IOException
     */
    public static String getFileMD5String(File file) throws IOException {
        FileInputStream in = new FileInputStream(file);
        FileChannel ch = in.getChannel();
        MappedByteBuffer byteBuffer = ch.map(FileChannel.MapMode.READ_ONLY, 0,
                file.length());
        messagedigest.update(byteBuffer);
        return bufferToHex(messagedigest.digest());
    }
    
    private static String bufferToHex(byte bytes[]) {
        return bufferToHex(bytes, 0, bytes.length);
    }

    private static String bufferToHex(byte bytes[], int m, int n) {
        StringBuffer stringbuffer = new StringBuffer(2 * n);
        int k = m + n;
        for (int l = m; l < k; l++) {
            appendHexPair(bytes[l], stringbuffer);
        }
        return stringbuffer.toString();
    }

    private static void appendHexPair(byte bt, StringBuffer stringbuffer) {
        char c0 = hexDigits[(bt & 0xf0) >> 4];
        char c1 = hexDigits[bt & 0xf];
        stringbuffer.append(c0);
        stringbuffer.append(c1);
    }
    
    public static String getMD5String(byte[] bytes) {
        messagedigest.update(bytes);
        return bufferToHex(messagedigest.digest());
    }
    public static String getSHAString(byte[] bytes){
	messagedigestOfSHA.update(bytes);
        return bufferToHex(messagedigestOfSHA.digest());
    }
    public static String convert(String s){ 
        return getMD5String(s.getBytes());
    }
    public static String convertSHA(String s){
	return getSHAString(s.getBytes());
    }
 
 public static void main(String[] args) {
//     System.out.println("123456:" + MD5.convert("123456") + "---" + MD5.convert(MD5.convert("123456")));
//     System.out.println("123456:" + MD5.convertSHA("123456") + "---" + MD5.convert(MD5.convert("123456")));
//     System.out.println(MD5.convert("123456").length());
     System.out.println(MD5.convertSHA("{\"appType\":0}gigamore"));
//     System.out.println("激活:" + MD5.convert("2c9005d840ce4d0d0140ce4d8a6e0001")+"="+MD5.convert("029342"));
 }
}


