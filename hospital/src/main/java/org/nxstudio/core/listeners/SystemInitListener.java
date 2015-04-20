package org.nxstudio.core.listeners;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.nxstudio.core.dao.base.GeneralDao;
import org.nxstudio.service.httpService.MyHttpServer;
import org.nxstudio.util.spring.SpringContextHolder;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.nxstudio.modules.systemmanager.monitor.service.MonitorService;
import org.nxstudio.core.constant.ArmConstants;
import org.nxstudio.core.dao.Reader;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.properties.PropertiesFactory;
import org.nxstudio.util.properties.PropertiesFile;
import org.nxstudio.util.properties.PropertiesHelper;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.util.g4.G4Utils;
import org.springframework.context.ApplicationContext;

/**
 * 系统启动监听器
 *
 * @author XiongChun
 * @since 2010-04-13
 */
public class SystemInitListener implements ServletContextListener {
    private static Log log = LogFactory.getLog(SystemInitListener.class);
    private boolean success = true;
    private ApplicationContext wac = null;

    public void contextDestroyed(ServletContextEvent sce) {

    }

    public void contextInitialized(ServletContextEvent sce) {
        systemStartup(sce.getServletContext());
    }

    /**
     * 应用平台启动
     */
    private void systemStartup(ServletContext servletContext) {
        PropertiesHelper pHelper = PropertiesFactory.getPropertiesHelper(PropertiesFile.G4);
        String forceLoad = pHelper.getValue("forceLoad", ArmConstants.FORCELOAD_N);
        long start = System.currentTimeMillis();
        if (forceLoad.equalsIgnoreCase(ArmConstants.FORCELOAD_N)) {
            log.info("*******************************************************");
            log.info("迈微·手卫生检查系统开始启动...");
            log.info("*******************************************************");
        }
        try {
            wac = SpringContextHolder.getApplicationContext();
        } catch (Exception e) {
            success = false;
            e.printStackTrace();
        }
        if (success) {
            MonitorService monitorService = SpringContextHolder.getBean("monitorService");
//			MonitorService monitorService = (MonitorService) SpringContextHolder.getBean("monitorService");
            monitorService.deleteHttpSession(new BaseDto());
            //关闭数据检查 默认为ORACLE
            /*try {
				initDbType();
			} catch (SQLException e) {
				e.printStackTrace();
			}*/
        }
        Reader g4Reader = SpringContextHolder.getBean("g4Reader");
        if (success) {
            log.info("系统开始启动字典装载程序...");
            log.info("开始加载字典...");

            List codeList = null;
            try {
                codeList = g4Reader.queryForList("Resource.getCodeViewList");
                log.info("字典加载成功!");
            } catch (Exception e) {
                success = false;
                log.error("字典加载失败!");
                e.printStackTrace();
            }
            servletContext.setAttribute("EACODELIST", codeList);
        }
        if (success) {
            log.info("系统开始启动人员关系装载程序...");
            log.info("开始加载人员关系...");
            List userrelactionlist = null;
            try {
                userrelactionlist = g4Reader.queryForList("SysBase.synMemory");
                log.info("人员关系加载成功!");
            } catch (Exception e) {
                success = false;
                log.error("人员关系加载失败!");
                e.printStackTrace();
            }
            servletContext.setAttribute("USERRELACTIONLIST", userrelactionlist);
        }

        if (success) {
            log.info("系统开始启动全局参数表装载程序...");
            log.info("开始加载全局参数表...");
            List paramList = null;
            try {
                paramList = g4Reader.queryForList("Resource.getParamList");
                log.info("全局参数表加载成功!");
            } catch (Exception e) {
                success = false;
                log.error("全局参数表加载失败!");
                e.printStackTrace();
            }
            servletContext.setAttribute("EAPARAMLIST", paramList);
        }
        long timeSec = (System.currentTimeMillis() - start) / 1000;
        log.info("********************************************");
        if (success) {
            log.info("迈微·手卫生检查系统启动成功[" + G4Utils.getCurrentTime() + "]");
            log.info("启动总耗时: " + timeSec / 60 + "分 " + timeSec % 60 + "秒 ");
        } else {
            log.error("迈微·手卫生检查系统启动失败[" + G4Utils.getCurrentTime() + "]");
            log.error("启动总耗时: " + timeSec / 60 + "分" + timeSec % 60 + "秒");
        }
        log.info("********************************************");
        try {
            log.info("***************启动httpservice*****************");
            MyHttpServer.start();
            log.info("启动httpservice成功!");
        } catch (IOException e) {
            e.printStackTrace();
            log.error("httpservice启动失败");
        }
    }

    /**
     * 识别缺省的JDBC驱动类型(g4Dao)
     *
     * @throws java.sql.SQLException
     */
    private void initDbType() throws SQLException {
        GeneralDao generalDao = SpringContextHolder.getBean("generalDao");
        Connection connection = generalDao.getConnection();
        String dbString = connection.getMetaData().getDatabaseProductName().toLowerCase();
        try {
            connection.close();
        } catch (Exception e) {
            log.error(G4Constants.Exception_Head + "未正常关闭数据库连接");
            e.printStackTrace();
        }
        if (dbString.indexOf("ora") > -1) {
            System.setProperty("g4Dao.db", "oracle");
        } else if (dbString.indexOf("mysql") > -1) {
            System.setProperty("g4Dao.db", "mysql");
        } else if (dbString.indexOf("microsoft") > -1) {
            System.setProperty("g4Dao.db", "sqlserver");
        } else {
            if (log.isErrorEnabled()) {
                log.error(G4Constants.Exception_Head + "数据库连接报错");
            }
            System.exit(0);
        }
    }
}
