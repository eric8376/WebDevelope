package org.nxstudio.service.socketserver.business.core;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.nxstudio.core.model.AuditDraftLog;
import org.nxstudio.core.model.TempAuditlog;
import org.nxstudio.service.socketserver.business.common.AuditDraftUtil;
import org.nxstudio.service.socketserver.business.dao.AuditDraftLogDao;
import org.nxstudio.service.socketserver.exceptions.DAOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;


/**
 * 处理与信贷通讯，处理承兑审核、贴现审核接实现类
 *
 * @author ltao
 * @version 2010-5-27
 */
@Service("auditDraftService")
public class AuditDraftServiceImpl implements IAuditDraftService {

    private static final Log log = LogFactory.getLog(AuditDraftServiceImpl.class);
    @Autowired
    private AuditDraftLogDao auditDraftLogDao;

    @Override
    public String process(String draft) {

        String draftType = "";
        Map<String, Object> draftMap = new HashMap<String, Object>();
        draftMap = AuditDraftUtil.parseAuditDraft(draft);
        draftType = (String) draftMap.get("draftType");
//		log.info(draft);
        return AuditDraftFacotry.getAuditDraftInstance(draftType).processDraft(draft, draftMap);
    }

    @Override
    public void saveAuditDraftLog(String reqcontext) throws Exception {
        TempAuditlog tempauditlog = new TempAuditlog();
        tempauditlog.setReq_context(reqcontext);
        auditDraftLogDao.save(tempauditlog);
    }

    /**
     * 持久化与信贷通讯的审核报文
     */
    @Override
    public void saveOrUpdateAuditDraftLog(AuditDraftLog auditLog) {
        try {
            auditDraftLogDao.saveOrUpdate(auditLog);
        } catch (Exception e) {
            e.printStackTrace();
            throw new DAOException(e);
        }
    }

    public void saveTempAudit(String statementName, Object parameterObject) {
        auditDraftLogDao.insert(statementName, parameterObject);
    }


}
