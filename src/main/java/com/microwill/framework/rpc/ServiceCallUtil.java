//package com.microwill.framework.rpc;
//
//import java.lang.reflect.Method;
//import java.util.Map;
//import java.util.HashMap;
//import java.util.List;
//
//import org.springframework.context.ApplicationContext;
//import org.springframework.context.ApplicationContextAware;
//
//import com.microwill.framework.command.Command;
//import com.microwill.framework.rpc.help.ExecuteHelp;
//
//public class ServiceCallUtil implements ApplicationContextAware{
//	private ApplicationContext appContext;
//
//	public void setApplicationContext(ApplicationContext context) {
//		appContext = context;
//	} 
//    public Object execute(String serviceName, String methodName,
//            Map map) {
//    try {
//            Object rtObj = null;
//            Object svc = appContext.getBean(serviceName);
//            Object[] objs = { map };
//            if (!ExecuteHelp.isEmpty(methodName)) {
//                    Method meth = null;
//                    Method[] meths = svc.getClass().getMethods();
//                    for (int i = 0; i < meths.length; i++) {
//                            if (meths[i].getName().equalsIgnoreCase(methodName)
//                                            && meths[i].getParameterTypes().length == objs.length) {
//                                    meth = meths[i];
//                                    break;
//                            }
//                    }
//                    rtObj = meth.invoke(svc, objs);
//            } else {
//                    Command cmd = (Command) svc;
//                    rtObj = processFunctionCall(cmd, objs, appContext);
//            }
//            return rtObj;
//    } catch (Exception e) {
//            e.printStackTrace();
//            return null;
//    }
//}
//
//    
//    public Object submit(String serviceName, Map logonInfo, Map formInfo, List memoList, 
//			Map additionalData, List orders) {
//    	Map map = new HashMap();
//    	map.put("logonInfo", logonInfo);
//		formInfo.put("memoList", memoList);
//		map.put("formInfo", formInfo);
//		map.put("additionalData", additionalData);
//		map.put("orders", orders);
//
//    try {
//            Object rtObj = null;
//            Object svc = appContext.getBean(serviceName);
//            Object[] objs = { map };
//
//            Command cmd = (Command) svc;
//            rtObj = processFunctionCall(cmd, objs, appContext);
//            return rtObj;
//    } catch (Exception e) {
//            e.printStackTrace();
//            return null;
//    }
//}    
//    public Object flowAdapter(String beanName, Map formInfo){
//    	return execute(beanName, "", formInfo);
//    }
//    
//protected static final Object processFunctionCall(Command cmd,
//            Object[] params, ApplicationContext context) throws Exception {
//    CallContextImpl ctx = new CallContextImpl();
//    ctx.setParams(params);
//    ctx.setSpringContext(context);
//    cmd.execute(ctx);
//    return (ctx.getResult());
//}
//}
