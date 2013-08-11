/*
* @(#)com.microwill.pipeline.sys.SysConfig.java
* Date:  12-Sep-2010
* Copyright 2010  中兴软创版权所有 违者必究 
*/

package com.microwill.framework.util;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.springframework.util.Assert;

/**
 * @author <a href="mailto:wen.jianguo@zte.com.cn">文建国 </a>
 * @version 1.0 12-Sep-2010
 */
public class SysConfig {

    /**-----------------------------------------通用常量----------------------------------------*/

    /**
     * ON 值

     */
    public static final String ON = "ON";
    /**
     * YES 值

     */
    public static final String YES = "YES";
    /**
     * TRUE 值

     */
    public static final String TRUE = "TRUE";

    /**
     * session过期时间，单位为分钟
     */
    public static int SESSION_TIMEOUT = 30;
    /**
     * 左边菜单
     */
    public final static String MENUTYPELEFT="2";
    /**
     * TAB菜单
     */
    public final static String MENUTYPETAB="1";
    /**
     * 不进行登录检查的URI，以“/”开始

     */
    public static String[] LOGIN_FILTER_ESCAPE_URIS = {};

     /**-----------------------------------------系统常量（业务相关的）--------------------------*/

    /**
     * 存量系统的主机地址
     */
    public static String RESMASTER_HOST;
    
    /**
     * EOMS工单接口
     */
    public static String EOMS_HOST;

    /**
     * GIS接口
     */
    public static String GIS_HOST;
    
    /**
     * 系统登录使用数据库sid
     */
    public static String DB_SID;
    /**
     * 数据库用户1
     */
    public static String DB_USER1;
    /**
     * 数据库用户2
     */
    public static String DB_USER2;
    
    public static String EJB_URL;
    
    public static String EJB_DRIVER;
    public static String LOGIN_URL;
    public static String VERSION;
    public static String TEL;
    
    private static Properties pipeProperties;
    /**
     * 记录当前在线用户数
     * key为用户名
     * value在线用户数
     */
    public static Map loginUsersMap = new HashMap();

    private SysConfig() {

    }

    public static Properties getProperties() {
        return pipeProperties;
    }

    /**
     * 加载PipeLine的属性配置文件,并且初始化系统参数

     */
    public static final void loadBaskConfProps() {
        try {
            pipeProperties = PropertiesLoaderUtils.loadAllProperties("com/microwill/customerview/conf/customerview.properties");
            init();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static String getPropertiesByKey(String key) {
        Assert.notNull(key, "Resource name must not be null");

        if (null == pipeProperties) {
            loadBaskConfProps();
        }

        return pipeProperties.getProperty(key);
    }

    private static void init() {
        RESMASTER_HOST = getPropertiesByKey("resmaster.host");
        EOMS_HOST = getPropertiesByKey("eoms.host");
        GIS_HOST = getPropertiesByKey("gis.host");

        DB_SID=getPropertiesByKey("db.sid");
        DB_USER1=getPropertiesByKey("db.user2");
        DB_USER2=getPropertiesByKey("db.user1");
        EJB_URL=getPropertiesByKey("ejb.url");
        EJB_DRIVER=getPropertiesByKey("ejb.driver");
        LOGIN_URL=getPropertiesByKey("loginUrl");
        VERSION=getPropertiesByKey("version");
        TEL=getPropertiesByKey("tel");
    }

     /**
     * 检查对应属性是否设备为ON
     *
     * @param propName     属性值

     * @param defaultValue 默认值,如果属性不存在,返回的默认值

     * @return
     */
    public static boolean isResConfPropOn(String propName, boolean defaultValue) {
        String value = getPropertiesByKey(propName);
        if (value == null) return defaultValue;
        return ON.equalsIgnoreCase(value);
    }
     
}
