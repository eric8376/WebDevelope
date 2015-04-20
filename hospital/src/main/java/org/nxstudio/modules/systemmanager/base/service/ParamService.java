package org.nxstudio.modules.systemmanager.base.service;

import org.nxstudio.core.model.Dto;

/*
 * 全局参数管理业务接口
 * @author XiongChun
 * @since 2010-05-13
 */
public interface ParamService {

    /**
     * 保存参数信息表
     */
    public Dto saveParamItem(Dto pDto);

    /**
     * 删除参数信息
     *
     * @param pDto
     */
    public Dto deleteParamItem(Dto pDto);

    /**
     * 修改参数信息
     *
     * @param pDto
     */
    public Dto updateParamItem(Dto pDto);
}
