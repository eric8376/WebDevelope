package org.nxstudio.service.socketserver.business.core;

import org.nxstudio.core.model.AuditDraftLog;

/**
 * 处理与信贷通讯，处理承兑审核、贴现审核接口
 *
 * @author ltao
 * @version 2010-5-27
 */
public interface IAuditDraftService {

    public String process(String draft);

    public void saveAuditDraftLog(String reqcontext) throws Exception;

    /**
     * 保存报文信息
     *
     * @param auditLog
     */
    public void saveOrUpdateAuditDraftLog(AuditDraftLog auditLog);

    /**
     * 保存TempAudit
     *
     * @param statementName
     * @param parameterObject
     */
    public void saveTempAudit(String statementName, Object parameterObject);

}
