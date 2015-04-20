package org.nxstudio.service.socketserver.business.core;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Map;
import java.util.Properties;

import org.nxstudio.core.model.AuditDraftLog;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


/**
 * 审核报文处理中心
 *
 * @author chenqiaoming
 * @version 2010-5-31
 */
public abstract class AuditDraftProCenter {

    public static final Log log = LogFactory.getLog(AuditDraftProCenter.class);

    private static Properties props = new Properties();

    static {
        init();
        if (props == null) {
            props = new Properties();
        }
    }

    /**
     * 初始化加载存储文件路径
     */
    private static void init() {
        InputStream in = null;
        try {
            //	String path=AuditDraftProCenter.class.getClassLoader().getResource("").getPath();//tomcat use this path
            String path = AuditDraftProCenter.class.getResource("").getPath();//weblogic or tomcat use this
            path = path.substring(0, path.indexOf("classes") + 8);
            in = new FileInputStream(path + "AuditDraftLog.properties");
            props.load(in);

        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

/*	*/

    /**
     * 注释掉
     * 处理报文，由子类实现
     *
     * @param iAuditDraftDAO 持久化报文
     * @param draft          报文
     * @param draftType      报文类型
     * @return
     *//*
    public abstract String processDraft(IAuditDraft iAuditDraftDAO,String draft,String draftType);*/
    public abstract String processDraft(String reqDraft, Map<String, Object> draftMap);

    /**
     * 保存请求或返回的报文信息
     *
     * @param iAuditDraftDao
     * @param draft
     * @param inOrOut
     * @param type
     * @param filePath
     */
    //@SuppressWarnings("unused")
//    public final AuditDraftLog writeReqOrRespDraft(IAuditDraft iAuditDraftDAO,String reqDraft,String respDraft,String draftType,String filePath){
//        AuditDraftLog draftLog=new AuditDraftLog();
//        draftLog.setReqDraft(reqDraft);
//        draftLog.setRespDraft(respDraft);
//        draftLog.setType(draftType);
//        draftLog.setReqDate(new java.util.Date());
//        if(filePath!=null){
//            draftLog.setFilePath(filePath);
//        }
//        iAuditDraftDAO.saveOrUpdateAuditDraftLog(draftLog);
//        return  draftLog;
//    }


//    public final void writeReqOrRespDraft(IAuditDraft iAuditDraftDAO,AuditDraftLog auditDraftLog){
//        iAuditDraftDAO.saveOrUpdateAuditDraftLog(auditDraftLog);
//    }
    public final AuditDraftLog returnAuditDraftLog(String reqDraft, String respDraft, String draftType, String filePath) {
        AuditDraftLog draftLog = new AuditDraftLog();
        draftLog.setReqDraft(reqDraft);
        draftLog.setRespDraft(respDraft);
        draftLog.setType(draftType);
        draftLog.setReqDate(new java.util.Date());
        if (filePath != null) {
            draftLog.setFilePath(filePath);
        }
        return draftLog;
    }

    /**
     * 获取报文中的XML部分
     *
     * @param draft 报文
     * @return XML数据
     */
    public final String getXMLData(String draft) {
        String xml = "";
        if (draft != null && !"".equals(draft.trim())) {
            xml = draft.substring(draft.indexOf("#") + 1);
        }
        return xml;
    }

    /**
     * 返回DraftLog.properties属性文件内容
     *
     * @return
     */
    public static final Properties getProperties() {
        return props;
    }

    public AuditDraftProCenter() {

    }

}