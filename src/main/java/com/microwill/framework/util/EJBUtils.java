package com.microwill.framework.util;
//package com.microwill.customerview.util;
//
//import java.util.Properties;
//
//import javax.naming.Context;
//import javax.naming.InitialContext;
//import javax.rmi.PortableRemoteObject;
//
//import com.zte.resmaster.system.robot.manager.RobotHome;
//import com.zte.resmaster.system.robot.manager.RobotRemote;
//
//public class EJBUtils {
//	public static RobotRemote getRobotRemote(){
//		Properties p=new Properties();
//		 p.put(Context.INITIAL_CONTEXT_FACTORY,SysConfig.getPropertiesByKey("ejb.driver"));
//	     p.put(Context.PROVIDER_URL,SysConfig.getPropertiesByKey("ejb.url"));
//	     RobotRemote acct =null;
//		try {
//			 InitialContext in= new InitialContext(p);
//			 Object ref= in.lookup("ejb/resmaster/system/RobotEJB");
//		     RobotHome dominateEJB20Home = (RobotHome)PortableRemoteObject.narrow(ref,RobotHome.class);
//		     acct = dominateEJB20Home.create();
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	    
//	     return acct;
//	}
//}
