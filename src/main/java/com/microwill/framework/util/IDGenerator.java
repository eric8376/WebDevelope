package com.microwill.framework.util;

import java.net.InetAddress;
import java.util.Date;
import java.util.concurrent.atomic.AtomicInteger;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.commons.lang3.time.DateUtils;

public class IDGenerator {
	public static AtomicInteger unionID = new AtomicInteger(0);
	/**
	 * 产生一个流水号ID
	 */
	public static String getCommonID(){
		if(unionID.intValue()>=10000){
			unionID=new AtomicInteger(0);
		}
		Date d=new Date();
		String head=DateFormatUtils.format(new Date(), "yyyyMMddhhss");
		String tail=String.valueOf(unionID.incrementAndGet());
		return head+StringUtils.leftPad(tail, 5, '0');
	}
	/**
	 * 产生一个32位的UUID
	 * 
	 * @return
	 */

	public static String UUIDgenerate() {
		return new StringBuilder(32).append(format(getIP()))
				.append(format(getJVM())).append(format(getHiTime()))
				.append(format(getLoTime())).append(format(getCount()))
				.toString();

	}

	private static final int IP;
	static {
		int ipadd;
		try {
			ipadd = toInt(InetAddress.getLocalHost().getAddress());
		} catch (Exception e) {
			ipadd = 0;
		}
		IP = ipadd;
	}

	private static short counter = (short) 0;

	private static final int JVM = (int) (System.currentTimeMillis() >>> 8);

	private final static String format(int intval) {
		String formatted = Integer.toHexString(intval);
		StringBuilder buf = new StringBuilder("00000000");
		buf.replace(8 - formatted.length(), 8, formatted);
		return buf.toString();
	}

	private final static String format(short shortval) {
		String formatted = Integer.toHexString(shortval);
		StringBuilder buf = new StringBuilder("0000");
		buf.replace(4 - formatted.length(), 4, formatted);
		return buf.toString();
	}

	private final static int getJVM() {
		return JVM;
	}

	private final static short getCount() {
		synchronized (IDGenerator.class) {
			if (counter < 0)
				counter = 0;
			return counter++;
		}
	}

	/**
	 * Unique in a local network
	 */
	private final static int getIP() {
		return IP;
	}

	/**
	 * Unique down to millisecond
	 */
	private final static short getHiTime() {
		return (short) (System.currentTimeMillis() >>> 32);
	}

	private final static int getLoTime() {
		return (int) System.currentTimeMillis();
	}

	private final static int toInt(byte[] bytes) {
		int result = 0;
		for (int i = 0; i < 4; i++) {
			result = (result << 8) - Byte.MIN_VALUE + (int) bytes[i];
		}
		return result;
	}
}
