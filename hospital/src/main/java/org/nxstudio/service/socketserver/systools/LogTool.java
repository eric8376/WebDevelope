package org.nxstudio.service.socketserver.systools;

import java.net.URL;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

public class LogTool {
    public static void main(String[] args) {
        URL url = LogTool.class.getClassLoader().getResource("tm.xml");
        System.out.println(url.toString());
    }

    // 核心交易日志文件
    public static void log_c(Object obj) {
        PropertyConfigurator.configure(LogTool.class.getClassLoader().getResource("C_log4j.properties"));
        Logger log = Logger.getLogger("CENTER_LOG");
        log.error(obj);
    }

    // 网银交易日志文件־
    public static void log_w(Object obj) {
        PropertyConfigurator.configure(LogTool.class.getClassLoader()
                .getResource("W_log4j.properties"));
        Logger log = Logger.getLogger("NETB_LOG");
        log.error(obj);
    }

    // 日终交易日志文件־
    public static void log_dayend(Object obj) {
        PropertyConfigurator.configure(LogTool.class.getClassLoader().getResource("W_log4j.properties"));
        Logger log = Logger.getLogger("DAYEND_LOG");
        log.error(obj);
    }

    //票据承兑模块交易日志文件־
    public static void log_ba(Object obj) {
        PropertyConfigurator.configure(LogTool.class.getClassLoader().getResource("bbsp_log4j.properties"));
        Logger log = Logger.getLogger("BBSP_LOG");
        log.error(obj);
    }

    //票据贴现模块交易日志文件־
    public static void log_bd(Object obj) {
        PropertyConfigurator.configure(LogTool.class.getClassLoader().getResource("bbsp_log4j.properties"));
        Logger log = Logger.getLogger("BBSP_LOG");
        log.error(obj);
    }

    //票据贴现模块交易日志文件־
    public static void log_bp(Object obj) {
        PropertyConfigurator.configure(LogTool.class.getClassLoader().getResource("bbsp_log4j.properties"));
        Logger log = Logger.getLogger("BBSP_LOG");
        log.error(obj);
    }
}
