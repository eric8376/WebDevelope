package org.nxstudio.util.idgenerator.base.loader;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * LoadResourcesListener
 * 此代码源于开源项目E3,原作者：黄云辉
 *
 * @author XiongChun
 * @see org.nxstudio.util.idgenerator.base.IDException
 * @since 2010-03-17
 */
public class LoadResourcesListener implements ServletContextListener {


    public void contextInitialized(ServletContextEvent pServletContextEvent) {
        final String WEB_HOME = pServletContextEvent.getServletContext().getRealPath("/");
        ResourcesLoader.load(WEB_HOME);
    }

    public void contextDestroyed(ServletContextEvent pServletContextEvent) {
    }

}
