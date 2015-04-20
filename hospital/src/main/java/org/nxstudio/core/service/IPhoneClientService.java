package org.nxstudio.core.service;

import org.nxstudio.core.model.Dto;
import org.nxstudio.service.httpService.request.Request;

import java.sql.SQLException;

/**
 * <pre></pre>
 * <br>
 * <pre>所属模块：</pre>
 *
 * @author 黄琦鸿
 *         创建于  2015/1/3 23:54.
 */
public interface IPhoneClientService {

    public String queryCheckRecord(Dto indDto) throws SQLException;

    /**
     * 移动app业务处理
     * @param request
     * @param paramsDto
     * @param result
     */
    public void doBusiness(Request request, Dto paramsDto, Dto result) throws Exception;

    /**
     * 保存http请求
     * @param context
     */
    public Long saveHandlerInfo(String context, String bussiness_code);

    void updateHandlerInfo(String context, Long processid);
}
