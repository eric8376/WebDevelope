package org.nxstudio.modules.tool.service;


/**
 * Created by 黄琦鸿 on 2014/5/23.
 */
public interface IAuditService {
    /**
     * 保存或更新报文
     *
     * @param ReqDraft
     * @param RespDraft
     * @param type
     * @param log_id
     * @param header
     * @return
     */
    public String saveOrUpdateAuditDraftLog(String ReqDraft, String RespDraft, String type, String log_id, String header);

    /**
     * 保存报文处理记录
     *
     * @return
     */
    public String saveOrUpdateAuditDraftLogProcess(String ProDraft, String entityclass, String method, String statu, String Log_id);

    /**
     * 保存报文处理异常
     *
     * @param exDes
     * @param exType
     * @param formid
     * @return
     */
    public void saveOrUpdateAuditDraftLogException(String exDes, String exType, String formid);
}
