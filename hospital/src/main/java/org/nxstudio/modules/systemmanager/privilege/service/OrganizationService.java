package org.nxstudio.modules.systemmanager.privilege.service;

import org.nxstudio.core.model.Dto;

import java.sql.SQLException;
import java.util.List;

/**
 * 组织机构模型模型业务接口
 *
 * @author XiongChun
 * @since 2010-01-13
 */
public interface OrganizationService {

    /**
     * 获取用户信息
     *
     * @param pDto
     * @return
     */
    public Dto getUserInfo(Dto pDto);

    /**
     * 查询部门信息生成部门树
     *
     * @param pDto
     * @return
     */
    public Dto queryDeptItems(Dto pDto);

    /**
     * 保存部门
     *
     * @param pDto
     * @return
     */
    public Dto saveDeptItem(Dto pDto);

    /**
     * 修改部门
     *
     * @param pDto
     * @return
     */
    public Dto updateDeptItem(Dto pDto);

    /**
     * 删除部门
     *
     * @param pDto
     * @return
     */
    public Dto deleteDeptItems(Dto pDto);

    /**
     * 删除部门通过hql，只删除部门。不删除部门相关数据
     *
     * @param pDto
     * @return
     */
    public void deleteDeptByHql(Dto pDto);

    /**
     * 根据用户所属部门编号查询部门对象<br>
     * 用于构造组织机构树的根节点
     *
     * @param
     * @return
     */
    public Dto queryDeptinfoByDeptid(Dto pDto);

    /**
     * 保存用户主题信息
     *
     * @param pDto
     */
    public Dto saveUserTheme(Dto pDto);

    /**
     * 保存部门管理者
     *
     * @param pDto
     * @return
     */
    public void saveDeptManager(Dto pDto);

    /**
     * 根据人员获取对应的管理人员
     *
     * @param inDto
     * @return
     */
    public Dto queryDeptManagerByUserId(Dto inDto) throws SQLException;

    /**
     * 根据人员获取对应的管理人员
     *
     * @param inDto
     * @return
     */
    public Dto queryDeptManagerByUserId(Dto inDto, boolean isTManager) throws SQLException;

    /**
     * 根据人员获取对应的管理人员
     *
     * @param inDto
     * @return
     */
    public Dto queryDeptManagerByAccount(Dto inDto) throws SQLException;

    /**
     * 根据人员获取对应的管理人员
     *
     * @param inDto
     * @return
     */
    public Dto queryDeptManagerByAccount(Dto inDto, boolean isTManager) throws SQLException;

    /**
     * 根据部门获取对应的管理人员
     *
     * @param inDto
     * @return
     */
    public Dto queryDeptManagerByDeptId(Dto inDto) throws SQLException;

    /**
     * 根据部门获取对应的管理人员
     *
     * @param inDto
     * @return
     */
    public Dto queryDeptManagerByDeptId(Dto inDto, boolean isTManager);

    /**
     * 财务补充费用移动
     */
    public String moveData();

    /**
     * 部门唯一性校验
     *
     * @param dto
     * @return
     */
    public List<Dto> CheckDeptUnion(Dto dto);
}
