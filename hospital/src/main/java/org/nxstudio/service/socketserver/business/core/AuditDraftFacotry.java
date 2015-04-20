package org.nxstudio.service.socketserver.business.core;


import org.nxstudio.service.socketserver.business.common.AuditDraftConst;

/**
 * 创建审核报文实例工厂类
 *
 * @author ltao
 * @version 2010-5-31
 */
public class AuditDraftFacotry {

    public static AuditDraftProCenter getAuditDraftInstance(String draftType) {
        AuditDraftProCenter draftProCenter = null;
        if (AuditDraftConst.DRAFT_TRADE_ACPT_QUERY_TRADE_CODE.equals(draftType)) {
//    	    	 draftProCenter=new AcptAuditDraftPro();
        } else if (AuditDraftConst.DRAFT_TRADE_DISC_QUERY_TRADE_CODE.equals(draftType)) {
//    	    	 draftProCenter=new DiscAuditDraftPro();
        } else if (AuditDraftConst.DRAFT_TRADE_ACPT_AUDIT_RESULT_TRADE_CODE.equals(draftType)) {
//    	    	 draftProCenter=new AcptAuditDraftResultPro();
        } else if (AuditDraftConst.DRAFT_TRADE_DISC_AUDIT_RESULT_TRADE_CODE.equals(draftType)) {
//    	    	 draftProCenter=new DiscAuditDraftResultPro();
        }
        return draftProCenter;
    }
}
