package org.nxstudio.core.service;

import org.nxstudio.core.model.Dto;

/**
 * 权限模型标签业务接口
 *
 * @author XiongChun
 * @since 2010-05-13
 */
public interface ArmTagSupportService {
    /**
     * 获取卡片
     *
     * @param pDto;
     * @return
     */
    public Dto getCardList(Dto pDto);

    /**
     * 获取卡片子树
     *
     * @param pDto
     * @return
     */
    public Dto getCardTreeList(Dto pDto);

    /**
     * 获取登录人员所属部门信息
     *
     * @return
     */
    public Dto getDepartmentInfo(Dto pDto);

    /**
     * 获取登录人员附加信息
     *
     * @param pDto
     * @return
     */
    public Dto getEauserSubInfo(Dto pDto);
}
