package com.microwill.framework.weix.client.util;

import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;

/**
 * 将 java bean 的属性转成HTTP GET的参数。
 * 
 * 
 * 
 * 
 *
 */
public class HttpParamUtil
{
	public static String genParamFromBean(Object bean)
	{
		try
		{
			StringBuilder result = new StringBuilder();
			
			BeanInfo beanInfo = Introspector.getBeanInfo(bean.getClass(), Object.class);
			PropertyDescriptor[] pds = beanInfo.getPropertyDescriptors();
			for (PropertyDescriptor pd : pds)
			{
				if(result.length() > 0)
				{
					result.append("&");
				}
				
				Object value = pd.getReadMethod().invoke(bean, (Object[])null);
				if(value != null)
				{
					result.append(pd.getName());
					result.append("=");
					result.append(value);	
				}
				

			}
			
			return result == null ? "" : result.toString();
		}
		catch (Exception e)
		{
			throw new RuntimeException("error while get params from bean", e);
		}
	}
}
