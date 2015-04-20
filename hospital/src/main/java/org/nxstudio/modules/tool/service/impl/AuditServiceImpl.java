package org.nxstudio.modules.tool.service.impl;

import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.modules.tool.dao.IAuditServiceDao;
import org.nxstudio.modules.tool.service.IAuditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 通用的service
 */
@Service("AuditService")
public class AuditServiceImpl implements IAuditService {

    @Autowired
    private IAuditServiceDao iAuditServiceDao;

    @Override
    public String saveOrUpdateAuditDraftLog(String ReqDraft, String RespDraft, String type, String log_id, String header) {
        Dto dto = new BaseDto();
        if (log_id == null) {
            dto.put("reqdraft", ReqDraft);
            dto.put("respdraft", RespDraft);
            dto.put("header", header);
            dto.put("log_id", "");
            dto.put("type", type);
            iAuditServiceDao.insert("Audit.saveAudit", dto);
            log_id = dto.getAsString("log_id");
        } else {
            dto.put("log_id", log_id);
            dto.put("respdraft", RespDraft);
            iAuditServiceDao.update("Audit.updateAudit", dto);
        }
        return log_id;
    }

    @Override
    public String saveOrUpdateAuditDraftLogProcess(String ProDraft, String entityclass, String method, String statu, String Log_id) {
        Dto dto = new BaseDto();
        String processid = "";
        if (Log_id == null) {
            dto.put("prodraft", ProDraft);
            dto.put("proclass", entityclass);
            dto.put("promethod", method);
            dto.put("processid", "");
            dto.put("log_id", Log_id);
            iAuditServiceDao.insert("Audit.saveAuditProcess", dto);
            processid = dto.getAsString("processid");
        } else {
            iAuditServiceDao.update("Audit.updateAuditProcess", dto);
        }
        return processid;
    }

    @Override
    public void saveOrUpdateAuditDraftLogException(String exDes, String exType, String formid) {
        Dto dto = new BaseDto();
        dto.put("exceptiondes", exDes);
        dto.put("exceptiontype", exType);
        dto.put("formid", formid);
        iAuditServiceDao.insert("Audit.saveAuditException", dto);
    }


}
