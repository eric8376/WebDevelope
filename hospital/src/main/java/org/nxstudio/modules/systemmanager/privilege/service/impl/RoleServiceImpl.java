package org.nxstudio.modules.systemmanager.privilege.service.impl;

import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.Earole;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.modules.systemmanager.privilege.dao.RoleDao;
import org.nxstudio.modules.systemmanager.privilege.service.RoleService;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.util.idgenerator.IDHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 角色管理与授权业务实现类
 *
 * @author XiongChun
 * @since 2010-04-13
 */
@Service("roleService")
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleDao roleDao;

    /**
     * 查询角色信息
     *
     * @param pDto
     * @return
     */
    @Override
    public List<Earole> queryEaroleByHql(Dto pDto) {
        return roleDao.queryEaroleByHql(pDto);
    }

    @Override
    public List<Dto> queryEaroleBySql(Dto pDto) {
        return roleDao.queryEaroleBySql(pDto);
    }

    @Override
    public List<Dto> queryUserRole(Dto pDto) {
        return roleDao.queryUserRole(pDto);
    }

    @Override
    public Integer queryRoleExistByUser(Dto pDto) {
        return roleDao.queryRoleExistByUser(pDto);
    }

    /**
     * 保存角色
     *
     * @param pDto
     * @return
     */
    public Dto saveRoleItem(Dto pDto) {
        pDto.put("roleid", IDHelper.getIdSequenceByKey("ROLESEQUENCES"));
        roleDao.insert("Role.saveRoleItem", pDto);
        return null;
    }

    /**
     * 删除角色
     *
     * @param pDto
     * @return
     */
    public Dto deleteRoleItems(Dto pDto) {
        Dto dto = new BaseDto();
        String[] arrChecked = pDto.getAsString("strChecked").split(",");
        for (int i = 0; i < arrChecked.length; i++) {
            dto.put("roleid", arrChecked[i]);
            roleDao.delete("Role.deleteEaroleAuthorizeInRoleManage", dto);
            roleDao.delete("Role.deleteEauserauthorizeInRoleManage", dto);
            roleDao.delete("Role.deleteEarolemenupartInRoleManage", dto);
            roleDao.delete("Role.deleteEaroleInRoleManage", dto);
        }
        return null;
    }

    /**
     * 修改角色
     *
     * @param pDto
     * @return
     */
    public Dto updateRoleItem(Dto pDto) {
        roleDao.update("Role.updateRoleItem", pDto);
        if (!pDto.getAsString("deptid").equals(pDto.getAsString("deptid_old"))) {
            roleDao.delete("Role.deleteEaroleAuthorizeInRoleManage", pDto);
        }
        return null;
    }

    /**
     * 保存角色授权信息
     *
     * @param pDto
     * @return
     */
    public Dto saveGrant(Dto pDto) {
        roleDao.delete("Role.deleteERoleGrants", pDto);
        String[] menuids = pDto.getAsString("menuid").split(",");
        for (int i = 0; i < menuids.length; i++) {
            String menuid = menuids[i];
            if (G4Utils.isEmpty(menuid))
                continue;
            pDto.put("menuid", menuid);
            pDto.put("authorizeid", IDHelper.getIdSequenceByKey("AUTHROLESEQUENCES"));
            roleDao.insert("Role.saveRoleGrantItem", pDto);
        }
        return null;
    }

    /**
     * 保存角色用户关联信息
     *
     * @param pDto
     * @return
     */
    public Dto saveSelectUser(Dto pDto) {
        roleDao.delete("Role.deleteEaUserAuthorizeByRoleId", pDto);
        String[] userids = pDto.getAsString("userid").split(",");
        for (int i = 0; i < userids.length; i++) {
            String userid = userids[i];
            if (G4Utils.isEmpty(userid))
                continue;
            pDto.put("userid", userid);
            pDto.put("authorizeid", IDHelper.getIdSequenceByKey("AUTHUSERSEQUENCES"));
            roleDao.insert("Role.saveSelectUser", pDto);
        }
        return null;
    }

    @Override
    public void deleteEaUserAuthorize(Dto pDto) {
        roleDao.deleteEaUserAuthorize(pDto);
    }

    /**
     * 保存角色用户关联信息
     *
     * @param pDto
     * @return
     */
    @Override
    public Dto saveEaUserAuthorize(Dto pDto) {
        pDto.put("authorizeid", IDHelper.getIdSequenceByKey("AUTHUSERSEQUENCES"));
        roleDao.insert("Role.saveSelectUser", pDto);
        return null;
    }
}
