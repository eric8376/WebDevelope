package org.nxstudio.modules.systemmanager.privilege.service;

import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.Earole;

import java.util.List;

/**
 * 角色管理与授权业务接口
 *
 * @author XiongChun
 * @since 2010-01-13
 */
public interface RoleService {
    /**
     * 查询角色信息
     *
     * @param pDto
     * @return
     */
    public List<Earole> queryEaroleByHql(Dto pDto);

    /**
     * 查询角色信息
     *
     * @param pDto
     * @return
     */
    public List<Dto> queryEaroleBySql(Dto pDto);

    /**
     * 查询用户角色信息
     *
     * @param pDto
     * @return
     */
    public List<Dto> queryUserRole(Dto pDto);

    public Integer queryRoleExistByUser(Dto pDto);

    /**
     * 保存角色
     *
     * @param pDto
     * @return
     */
    public Dto saveRoleItem(Dto pDto);

    /**
     * 删除角色
     *
     * @param pDto
     * @return
     */
    public Dto deleteRoleItems(Dto pDto);

    /**
     * 修改角色
     *
     * @param pDto
     * @return
     */
    public Dto updateRoleItem(Dto pDto);

    /**
     * 保存角色授权信息
     *
     * @param pDto
     * @return
     */
    public Dto saveGrant(Dto pDto);

    /**
     * 保存角色用户关联信息
     *
     * @param pDto
     * @return
     */
    public Dto saveSelectUser(Dto pDto);

    /**
     * 删除用户角色
     *
     * @param pDto
     */
    public void deleteEaUserAuthorize(Dto pDto);

    /**
     * 用户分配角色
     *
     * @param pDto
     * @return
     */
    public Dto saveEaUserAuthorize(Dto pDto);

}
