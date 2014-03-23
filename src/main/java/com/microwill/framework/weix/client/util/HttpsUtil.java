package com.microwill.framework.weix.client.util;


import java.net.URL;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;

/**
 * Https的支持工具，主要对自签名证书进行支持。
 * 
 * 
 * 
 * 
 *
 */
public class HttpsUtil
{
	private static SSLSocketFactory TRUST_ALL_FACTORY;
	
	private static SSLSocketFactory createTrustAllSocketFactory()
	{
		try
		{
			SSLContext sslContext = SSLContext.getInstance("SSL", "SunJSSE");  
			sslContext.init(null, new TrustManager[]{new TrustAllX509TrustManager()}, new java.security.SecureRandom());  
			return sslContext.getSocketFactory();
		}
		catch (Exception e) 
		{
			throw new RuntimeException(e);
		}		
	}
	
	public static SSLSocketFactory getTrustAllSocketFactory()
	{
		synchronized (HttpsUtil.class)
		{
			if(TRUST_ALL_FACTORY == null)
			{
				TRUST_ALL_FACTORY = createTrustAllSocketFactory();
			}
		}
		
		return TRUST_ALL_FACTORY;
	}
	
	public static HttpsURLConnection openHttpsURLConnection(String httpsURL)
	{
		try
		{
			URL url = new URL(httpsURL);
			HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
			conn.setSSLSocketFactory(getTrustAllSocketFactory());
			
			return conn;
		}
		catch (Exception e)
		{
			throw new RuntimeException(e);
		}
	}
	

}
