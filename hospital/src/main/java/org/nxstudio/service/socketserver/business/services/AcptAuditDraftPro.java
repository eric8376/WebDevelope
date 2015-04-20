package org.nxstudio.service.socketserver.business.services;

import org.nxstudio.service.socketserver.business.common.AuditDraftConst;
import org.nxstudio.service.socketserver.business.common.AuditDraftUtil;
import org.nxstudio.service.socketserver.business.core.AuditDraftProCenter;

import java.util.Map;


/**
 * 信贷发起承兑审核处理类
 *
 * @author ltao
 */
public class AcptAuditDraftPro extends AuditDraftProCenter {

    @SuppressWarnings("unchecked")
    @Override
    public String processDraft(String reqDraft, Map<String, Object> draftMap) {
        String ret = "";
        String batchType = (String) draftMap.get("batchType");
        String batchNo = (String) draftMap.get("batchNo");//解析XML，获取批次号
        String tradeCode = (String) draftMap.get("draftType");
        String fileDir = getProperties().getProperty("product.upFileDir");
        String fileName = AuditDraftUtil.createFileName("ba_") + ".txt";
        String fullName = fileDir + fileName;
        ret = AuditDraftUtil.retAcptOrDiscDraft(batchType, batchNo, tradeCode, fileName, AuditDraftConst.DRAFT_TRADE_SUCCESS_CODE, AuditDraftConst.DRAFT_TRADE_QUERY_SUCCESS_MSG);
        return ret;
    }

}
