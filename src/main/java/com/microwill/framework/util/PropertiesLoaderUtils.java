/*
* @(#)com.microwill.pipeline.sys.PropertiesLoaderUtils.java
* Date:  12-Sep-2010
* Copyright 2010  中兴软创版权所有 违者必究 
*/

package com.microwill.framework.util;

import org.springframework.core.io.Resource;
import org.springframework.util.Assert;
import org.springframework.util.ClassUtils;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.Enumeration;
import java.util.Properties;

/**
 * @author <a href="mailto:javawen@gmail.com">文建国 </a>
 * @version 1.0 12-Sep-2010
 */
public abstract class PropertiesLoaderUtils {

    /**
     *
     * @param resource
     * @return
     * @throws IOException
     */
	public static Properties loadProperties(Resource resource) throws IOException {
		Properties props = new Properties();
		fillProperties(props, resource);
		return props;
	}

    /**
     *
     * @param props
     * @param resource
     * @throws IOException
     */
	public static void fillProperties(Properties props, Resource resource) throws IOException {
		InputStream is = resource.getInputStream();
		try {
			props.load(is);
		}
		finally {
			is.close();
		}
	}

    /**
     *
     * @param resourceName
     * @return
     * @throws IOException
     */
	public static Properties loadAllProperties(String resourceName) throws IOException {
		return loadAllProperties(resourceName, null);
	}

    /**
     *
     * @param resourceName
     * @param classLoader
     * @return
     * @throws IOException
     */
	public static Properties loadAllProperties(String resourceName, ClassLoader classLoader) throws IOException {
		Assert.notNull(resourceName, "Resource name must not be null");
		ClassLoader clToUse = classLoader;
		if (clToUse == null) {
			clToUse = ClassUtils.getDefaultClassLoader();
		}
		Properties properties = new Properties();
		Enumeration urls = clToUse.getResources(resourceName);
		while (urls.hasMoreElements()) {
			URL url = (URL) urls.nextElement();
			InputStream is = null;
			try {
				URLConnection con = url.openConnection();
				con.setUseCaches(false);
				is = con.getInputStream();
				properties.load(is);
			}
			finally {
				if (is != null) {
					is.close();
				}
			}
		}
		return properties;
	}
}
