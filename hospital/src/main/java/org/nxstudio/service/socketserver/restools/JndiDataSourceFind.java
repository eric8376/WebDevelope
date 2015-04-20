package org.nxstudio.service.socketserver.restools;


import java.util.Hashtable;

import javax.naming.InitialContext;
import javax.sql.DataSource;

import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.InitializingBean;

public class JndiDataSourceFind implements InitializingBean, FactoryBean {
    private String initialContextFactory;
    private String initialContextUrl;
    private String jndiName;
    private Object jndiObj;


    public String getInitialContextFactory() {
        return initialContextFactory;
    }

    public void setInitialContextFactory(String initialContextFactory) {
        this.initialContextFactory = initialContextFactory;
    }

    public String getInitialContextUrl() {
        return initialContextUrl;
    }

    public void setInitialContextUrl(String initialContextUrl) {
        this.initialContextUrl = initialContextUrl;
    }

    public String getJndiName() {
        return jndiName;
    }

    public void setJndiName(String jndiName) {
        this.jndiName = jndiName;
    }


    public void afterPropertiesSet() throws Exception {
        // TODO Auto-gesnerated method stub
        InitialContext ic = null;
        if (getInitialContextFactory() != null) {
            Hashtable icEnv = new Hashtable();

            icEnv.put(InitialContext.INITIAL_CONTEXT_FACTORY, getInitialContextFactory());
            icEnv.put(InitialContext.PROVIDER_URL, getInitialContextUrl());
            ic = new InitialContext(icEnv);
        } else {
            ic = new InitialContext();
        }
        jndiObj = ic.lookup(getJndiName());

    }

    public Object getObject() throws Exception {
        // TODO Auto-generated method stub
        return this.jndiObj;
    }

    public Class getObjectType() {
        // TODO Auto-generated method stub
        return DataSource.class;
    }

    public boolean isSingleton() {
        // TODO Auto-generated method stub
        return true;
    }

    public static void main(String[] args) {
        try {
            JndiDataSourceFind jndiFound = new JndiDataSourceFind();
            jndiFound.setInitialContextFactory("weblogic.jndi.WLInitialContextFactory");
            jndiFound.setInitialContextUrl("t3://127.0.0.1:7002");
            jndiFound.setJndiName("jdbc/MySql");
            jndiFound.afterPropertiesSet();
            DataSource obj = (DataSource) jndiFound.getObject();
            System.out.println(obj);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}