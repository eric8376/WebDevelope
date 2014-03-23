package com.microwill.framework.weix.client.util;

import java.text.SimpleDateFormat;

import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializationConfig;

/**
 * 负责将JSON与Java bean的转换 ，使用JACKJSON, 这是目前最快的JSON解析器。
 * 
 * 
 * 
 * 
 * 
 */
public class JsonUtil {
    public final static String DATE_FORMATE = "yyyyMMddHHmmss";

    private static ObjectMapper objMapper;

    static {
	objMapper = new ObjectMapper();
	// 不序列化为空的值
	//objMapper.setSerializationInclusion(Include.NON_NULL);
	objMapper.configure(SerializationConfig.Feature.WRITE_NULL_PROPERTIES, false);
	// 采用尽量解析的原则，如果JAVA bean中没有相关属性，则不设置。并不抛出异常
	objMapper.configure(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES,
		false);
	objMapper.configure(SerializationConfig.Feature.WRITE_NULL_MAP_VALUES, false);
	objMapper.getSerializationConfig().setDateFormat(new SimpleDateFormat(DATE_FORMATE));
    }

    public static <T> T json2Bean(String json, Class<T> beanCls) {
	try {
	    return (T) objMapper.readValue(json, beanCls);
	} catch (Exception e) {
	    throw new RuntimeException("Fail to convert json to java bean.", e);
	}
    }

    public static String bean2Json(Object bean) throws Exception{
	try {
	    return objMapper.writeValueAsString(bean);
	} catch (JsonProcessingException e) {
	    throw new RuntimeException("Fail to convert java bean to json.", e);
	}
    }
}
