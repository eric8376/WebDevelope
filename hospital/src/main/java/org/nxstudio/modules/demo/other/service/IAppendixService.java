package org.nxstudio.modules.demo.other.service;

import org.nxstudio.core.model.Dto;

import java.sql.SQLException;

/**
 * 附件操作暴露的接口
 */
public interface IAppendixService {
    /**
     * 获取指定的附件信息
     *
     * @param dto
     * @return
     * @throws java.sql.SQLException
     */
    public Dto queryAppendixByFromId(Dto dto) throws SQLException;

    /**
     * 保存附件信息
     *
     * @param dto
     */
    public void saveAppendix(Dto dto);

    /**
     * 复制图纸
     *
     * @param dto
     */
    public void copyAppendix(Dto dto) throws SQLException;
}