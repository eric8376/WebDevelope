package com.microwill.framework.weix.client.util;

import java.io.BufferedReader;
import java.io.Closeable;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;

import javax.net.ssl.HttpsURLConnection;

import com.microwill.framework.weix.EnCodingType;

/**
 * 封装对HTTPS地址的请求访问。
 * 
 * 
 * 
 * 
 * 
 */
public class HttpsClient {
    public enum RequestMethod {
	GET, POST
    }

    public static void closeClosable(Closeable closeable) {
	try {
	    if (closeable != null) {
		closeable.close();
	    }
	} catch (Exception e) {
	    // ignore
	}
    }

    /**
     * 调用GET请求
     * 
     * @param url
     *            请求地址
     * @return 返回内容
     */
    public static String get(String url) {
	return request(RequestMethod.GET, url, null);
    }

    /**
     * 调用post请求
     * 
     * @param url
     *            请求地址
     * @param body
     *            请求内容
     * @return 返回内容
     */
    public static String post(String url, String body) {
	return request(RequestMethod.POST, url, body);
    }

    /**
     * 进行HTTPS请求。
     * 
     * @param requestMethod
     *            请求方式，可为GET或POST
     * @param url
     *            请求地址
     * @param body
     *            请求内容，可为空。
     * @return 应答内容
     */
    public static String request(RequestMethod requestMethod, String url,
	    String body) {
	HttpsURLConnection conn = null;
	InputStream ips = null;
	OutputStream ops = null;
	BufferedReader reader = null;

	try {
	    conn = HttpsUtil.openHttpsURLConnection(url);

	    // 增大timeout时间
	    // 连接超时
	    conn.setConnectTimeout(10000);
	    // 读取超时 --服务器响应比较慢，增大时间
	    conn.setReadTimeout(15000);

	    conn.setDoOutput(true);
	    conn.setDoInput(true);
	    conn.setUseCaches(false);
	    conn.setRequestMethod(requestMethod.name());
	    conn.connect();

	    if (body != null) {
		ops = conn.getOutputStream();
		ops.write(body.getBytes(EnCodingType.UTF_8));
		ops.flush();
	    }

	    ips = conn.getInputStream();
	    reader = new BufferedReader(new InputStreamReader(ips,
		    EnCodingType.UTF_8));

	    StringBuffer result = new StringBuffer();
	    String line = null;
	    while ((line = reader.readLine()) != null) {
		result.append(line);
	    }

	    return result.toString();
	} catch (Exception e) {
	    throw new RuntimeException(e);
	} finally {
	    closeClosable(ops);
	    closeClosable(ips);
	    closeClosable(reader);

	    if (conn != null) {
		conn.disconnect();
	    }
	}
    }

}
