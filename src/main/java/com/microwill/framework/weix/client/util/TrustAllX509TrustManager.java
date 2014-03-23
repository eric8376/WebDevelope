package com.microwill.framework.weix.client.util;

import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

import javax.net.ssl.X509TrustManager;

/**
 * 证书信任管理器,信任所有的签发机构。适用于自签名证书确保通讯安全的场合。
 * 
 * 
 * 
 * 
 *
 */
public class TrustAllX509TrustManager implements X509TrustManager
{

	@Override
	public void checkClientTrusted(X509Certificate[] arg0, String arg1)
			throws CertificateException
	{
	}

	@Override
	public void checkServerTrusted(X509Certificate[] arg0, String arg1)
			throws CertificateException
	{
	}

	@Override
	public X509Certificate[] getAcceptedIssuers()
	{
		return null;
	}

}
