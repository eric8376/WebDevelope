package com.microwill.framework.web.listener;

import java.util.List;
import java.util.Set;

import javax.management.MBeanServer;
import javax.management.MBeanServerFactory;
import javax.management.ObjectName;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.apache.log4j.jmx.HierarchyDynamicMBean;
import org.apache.log4j.spi.LoggerRepository;

/**
 * Log4jMBeanRegistrationListener registers MBeans to configure all loggers of the webapp.
 * Using code fragements and inspiration from http://oss.wxnet.org/mbeans.html and
 * http://www.objectsource.com/j2eechapters/Ch06-Logging_Service.htm.
 * 
 * @author Rene Gielen
 */
public class Log4jMBeanRegistrationListener implements ServletContextListener {

    private static final Logger LOG = Logger.getLogger(Log4jMBeanRegistrationListener.class);
    private static final String LOG4J_HIEARCHY_DEFAULT = "log4j:hiearchy=default";

    public void contextInitialized( ServletContextEvent sce ) {
        if (LOG.isInfoEnabled()) {
        	LOG.info("[contextInitialized]: Registering log4j MBeans.");
        }
        MBeanServer server = findMBeanServer();

        // Create and Register the top level Log4J MBean
        HierarchyDynamicMBean hdm = new HierarchyDynamicMBean();
        try {
            ObjectName mbo = new ObjectName(LOG4J_HIEARCHY_DEFAULT);
            server.registerMBean(hdm, mbo);

            // Add the root logger to the Hierarchy MBean
            hdm.addLoggerMBean(Logger.getRootLogger().getName());

            // Get each logger from the Log4J Repository and add it to
            // the Hierarchy MBean created above.
            LoggerRepository r = LogManager.getLoggerRepository();

            java.util.Enumeration loggers = r.getCurrentLoggers();

            int count = 1;
            while ( loggers.hasMoreElements() ) {
                String name = ((Logger) loggers.nextElement()).getName();
                if (LOG.isDebugEnabled()) {
                	LOG.debug("[contextInitialized]: Registering " + name);
                }
                hdm.addLoggerMBean(name);
                count ++;
            }
            if (LOG.isInfoEnabled()) {
            	LOG.info("[contextInitialized]: " + count + " log4j MBeans registered.");
            }
        } catch ( Exception e ) {
            LOG.error("[contextInitialized]: Exception catched: ", e);
        }
    }

    private MBeanServer findMBeanServer() {
        List<MBeanServer> serverList = MBeanServerFactory.findMBeanServer(null);
        if (serverList != null && serverList.size()>0) {
            return serverList.get(0);
        } else {
            return null;
        }
    }


    public void contextDestroyed( ServletContextEvent sce ) {
        if (LOG.isInfoEnabled()) {
        	LOG.info("[contextDestroyed]: Unregistering log4j MBeans.");
        }
        MBeanServer server = findMBeanServer();
        try {
            ObjectName qmbo = new ObjectName("log4j:*");
            Set<ObjectName> names = server.queryNames(qmbo, null);
            if (LOG.isInfoEnabled()) {
            	LOG.info("[contextDestroyed]: Found " + names.size() + " MBeans to unregister.");
            }
            for ( ObjectName name : names ) {
                if (LOG.isDebugEnabled()) {
                	LOG.debug("[contextDestroyed]: Unregistering " + name.toString());
                }
                server.unregisterMBean(name);
            }
        } catch ( Exception e ) {
            LOG.error("[contextDestroyed]: Exception catched: ", e);
        }
    }
}