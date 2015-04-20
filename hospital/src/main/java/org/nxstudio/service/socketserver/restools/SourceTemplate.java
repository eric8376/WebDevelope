package org.nxstudio.service.socketserver.restools;

import java.sql.Connection;

import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.orm.hibernate3.HibernateTemplate;

/**
 * @author jacke_yang
 *         获得各种静态资源
 */
public class SourceTemplate {
    //ClassPathXmlApplicationContext context=new ClassPathXmlApplicationContext("applicationContext.xml");
    private static ClassPathXmlApplicationContext ac = null;

    public static BeanFactory getSpringContextInstance() {
        if (ac == null) {
            ac = new ClassPathXmlApplicationContext(new String[]{
                    "./spring/applicationContext/applicationContext.xml"
                    //"serurityService.xml"
            });


        }
        return (BeanFactory) ac;
    }


    /**
     * 获得数据连接
     */
    public static Connection getConn() throws Exception {
        Connection conn = null;
        BasicDataSource bs = (BasicDataSource) (getSpringContextInstance().getBean("bbspDataSource"));
        ;
        conn = bs.getConnection();
        return conn;
    }


//	/*
//	 * 获得JbpmTemplate
//	 */
//	public static JbpmTemplate getJbpmTemplate() {
//		return (JbpmTemplate) (getSpringContextInstance()
//				.getBean("jbpmTemplate"));
//	}
//
//	/*
//	 * 获得JbpmConfiguration
//	 */
//	public static JbpmConfiguration getJbpmConfiguration() {
//		return (JbpmConfiguration) (getSpringContextInstance()
//				.getBean("jbpmConfiguration"));
//	}

    public static HibernateTemplate getHibernateTemplate() {
        return (HibernateTemplate) getSpringContextInstance().getBean("hibernateTemplate");
    }


    public static ClassPathXmlApplicationContext getAc() {
        return ac;
    }


    public static void setAc(ClassPathXmlApplicationContext ac) {
        SourceTemplate.ac = ac;
    }


}
