package org.nxstudio.service.socketserver.systools;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;


public class BeanPropertyCoper {
    private Object hbmPojo;
    private Map propValues = new HashMap();

    public BeanPropertyCoper(Object bean, String[] propNames, Object[] vus) {
        hbmPojo = bean;
        if (propNames.length == vus.length) {
            for (int i = 0; i < propNames.length; i++) {
                propValues.put(propNames[i], vus[i]);
            }
        }
        initPropCopys();
    }

    public BeanPropertyCoper(Object bean, Map propValues) {
        hbmPojo = bean;
        this.propValues = propValues;
        initPropCopys();
    }


    private void initPropCopys() {
        try {
            BeanUtils.populate(hbmPojo, propValues);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


//	public static void main(String[] args){
//		Buser buser=new Buser();
//		String[] propNames=new String[]{"sysUserId","userName","userNo"};
//		Object[] vus=new Object[]{new Long(1),new String("222"),new String("333")};
//		BeanPropertyCoper  bpc=new BeanPropertyCoper(buser,propNames,vus);
//		System.out.println();
//	}


}
