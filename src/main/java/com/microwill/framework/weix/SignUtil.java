package com.microwill.framework.weix;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

/**
 * 微信签名检查类。由LIUFENG的代码改编而成。
 * 
 * 在开发者首次提交验证申请时，微信服务器将发送GET请求到填写的URL上，并且带上四个参数（signature、timestamp、nonce、
 * echostr）， 开发者通过对签名（即signature）的效验，来判断此条消息的真实性。
 * 此后，每次开发者接收用户消息的时候，微信也都会带上前面三个参数
 * （signature、timestamp、nonce）访问开发者设置的URL，开发者依然通过对签名的效验判断此条消息的真实性
 * 。效验方式与首次提交验证申请一致。
 * 
 * 
 * 
 * 
 * 
 */
public class SignUtil {
    private String token;

    public SignUtil(String token) {
	if (token == null) {
	    throw new IllegalArgumentException("token can not be null!");
	}

	this.token = token;
    }

    /**
     * 验证签名
     * 
     * @param signature
     * @param timestamp
     * @param nonce
     * @return
     */
    public boolean checkSignature(String signature, String timestamp,
	    String nonce) {
	String[] arr = new String[] { token, timestamp, nonce };
	// 将token、timestamp、nonce三个参数进行字典序排序
	Arrays.sort(arr);

	StringBuilder content = new StringBuilder();
	for (int i = 0; i < arr.length; i++) {
	    content.append(arr[i]);
	}
	MessageDigest md = null;
	String tmpStr = null;

	try {
	    md = MessageDigest.getInstance("SHA-1");
	    // 将三个参数字符串拼接成一个字符串进行sha1加密
	    byte[] digest = md.digest(content.toString().getBytes());
	    tmpStr = byteToStr(digest);
	} catch (NoSuchAlgorithmException e) {
	    throw new RuntimeException("error while checking signature", e);
	}

	content = null;
	// 将sha1加密后的字符串可与signature对比，标识该请求来源于微信
	return tmpStr != null ? tmpStr.equals(signature.toUpperCase()) : false;
    }

    /**
     * 将字节数组转换为十六进制字符串
     * 
     * @param byteArray
     * @return
     */
    private String byteToStr(byte[] byteArray) {
	String strDigest = "";
	for (int i = 0; i < byteArray.length; i++) {
	    strDigest += byteToHexStr(byteArray[i]);
	}
	return strDigest;
    }

    /**
     * 将字节转换为十六进制字符串
     * 
     * @param mByte
     * @return
     */
    private String byteToHexStr(byte mByte) {
	char[] Digit = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A',
		'B', 'C', 'D', 'E', 'F' };
	char[] tempArr = new char[2];
	tempArr[0] = Digit[(mByte >>> 4) & 0X0F];
	tempArr[1] = Digit[mByte & 0X0F];

	String s = new String(tempArr);
	return s;
    }

}
