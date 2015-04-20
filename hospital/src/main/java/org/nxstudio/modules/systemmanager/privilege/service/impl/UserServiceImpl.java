package org.nxstudio.modules.systemmanager.privilege.service.impl;

import org.nxstudio.core.constant.ArmConstants;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.Eadept;
import org.nxstudio.core.model.Earole;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.modules.systemmanager.privilege.dao.OrganizationDao;
import org.nxstudio.modules.systemmanager.privilege.dao.RoleDao;
import org.nxstudio.modules.systemmanager.privilege.dao.UserDao;
import org.nxstudio.modules.systemmanager.privilege.service.UserService;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.util.idgenerator.IDHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 用户管理与授权业务实现类
 *
 * @author XiongChun
 * @since 2010-04-13
 */
@Service("userService")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;
    @Autowired
    private OrganizationDao organizationDao;

    /**
     * 保存用户
     *
     * @param pDto
     * @return
     */
    public Dto saveUserItem(Dto pDto) {
        Dto outDto = new BaseDto();
        List<Earole> earolelist = new ArrayList<Earole>();
        //含注册码，就去校验注册码的真是性
        pDto.put("enabled", ArmConstants.ENABLED_Y);
        Integer temp = (Integer) userDao.checkAccount(pDto);
        if (temp.intValue() != 0) {
            outDto.put("error", "登录账户" + outDto.getAsString("account") + "已被占用,请尝试其它帐户!");
            outDto.put("msg", "登录账户" + outDto.getAsString("account") + "已被占用,请尝试其它帐户!");
            outDto.put("success", new Boolean(false));
            return outDto;
        }
        pDto.put("userid", IDHelper.getIdSequenceByKey("USERSEQUENCES"));
        String password = pDto.getAsString("password");
        String mPasswor = G4Utils.encryptBasedDes(password);
        pDto.put("password", mPasswor);
        if (G4Utils.isEmpty(pDto.getAsString("sex"))) {
            pDto.put("sex", "0");
        }
        userDao.insert("User.saveUserItem", pDto);
        userDao.insert("User.saveEausersubinfoItem", pDto);
        outDto.put("msg", "用户数据新增成功");
        //如果含有角色id，那么就表示该用户新建时要绑定角色
        if (pDto.containsKey("roleid")) {
            saveSelectedRole(pDto);
        }
        outDto.put("success", new Boolean(true));
        return outDto;
    }

    /**
     * 删除用户
     *
     * @param pDto
     * @return
     */
    public String deleteUserItems(Dto pDto) {
        String result = "用户数据删除成功";
        Dto dto = new BaseDto();
        String[] arrChecked = pDto.getAsString("strChecked").split(",");
        //校验用户是否存在与用户关系表，存在就提示前台哪些存在而无法删除。
        List<Dto> existsUser = userDao.queryForList("User.verifyUserRelaction", pDto);
        if (G4Utils.isNotEmpty(existsUser)) {
            result = "用户 ";
            for (int i = 0; i < existsUser.size(); i++) {
                result += existsUser.get(i).getAsString("username") + "  ";
            }
            return result + "存在于用户关系表中，故无法删除";
        }
        //校验该用户是否存在与用户关系表中，如果存在就不让修改
        for (int i = 0; i < arrChecked.length; i++) {
            dto.put("userid", arrChecked[i]);
            userDao.update("User.updateEauserInUserManage", dto);
            userDao.delete("User.deleteEaUserAuthorizeByUserId", dto);
            userDao.delete("User.deleteEausermenumapByUserid", dto);
            userDao.delete("User.deleteEausersubinfoByUserid", dto);
        }
        return result;
    }

    /**
     * 修改用户
     *
     * @param pDto
     * @return
     */
    public Dto updateUserItem(Dto pDto) {
        Dto result = new BaseDto("success", "用户数据修改成功");
        String password = pDto.getAsString("password");
        String mPasswor = "";
        if (password.equals("@@@@@@")) {
            List<Dto> user = userDao.queryForList("User.getUserInfoByKey", pDto);
            if (G4Utils.isEmpty(user) || user.size() > 1) {
                result.put("success", "用户数据异常，请联系it人员处理");
                return result;
            }
            mPasswor = user.get(0).getAsString("password");
        } else {
            mPasswor = G4Utils.encryptBasedDes(password);
        }
        pDto.put("password", mPasswor);
        userDao.update("User.updateUserItem", pDto);
        if (!pDto.getAsString("deptid").equals(pDto.getAsString("deptid_old"))) {
            userDao.delete("User.deleteEaUserAuthorizeByUserId", pDto);
            userDao.delete("User.deleteEausermenumapByUserId", pDto);
        }
        if (pDto.containsKey("empower")) {
            result.putAll(pDto.getAsString("empower").equals("on") ? saveSelectedRole(pDto) : deleteSelectedRole(pDto));
        }
        return result;
    }

    /**
     * 保存人员角色关联信息
     *
     * @param pDto
     * @return
     */
    public Dto saveSelectedRole(Dto pDto) {
        userDao.delete("User.deleteEaUserAuthorizeByUserId", pDto);
        String[] roleids = pDto.getAsString("roleid").split(",");
        for (int i = 0; i < roleids.length; i++) {
            String roleid = roleids[i];
            if (G4Utils.isEmpty(roleid))
                continue;
            pDto.put("roleid", roleid);
            pDto.put("authorizeid", IDHelper.getIdSequenceByKey("AUTHUSERSEQUENCES"));
            userDao.insert("User.saveSelectedRole", pDto);
        }
        return new BaseDto();
    }

    /**
     * 删除人员角色关联信息
     *
     * @param pDto
     * @return
     */
    public Dto deleteSelectedRole(Dto pDto) {
        userDao.delete("User.deleteSelectedRole", pDto);
        return new BaseDto();
    }

    /**
     * 保存人员菜单关联信息
     *
     * @param pDto
     * @return
     */
    public Dto saveSelectedMenu(Dto pDto) {
        userDao.delete("User.deleteEausermenumapByUserId", pDto);
        String[] menuids = pDto.getAsString("menuid").split(",");
        for (int i = 0; i < menuids.length; i++) {
            String menuid = menuids[i];
            if (G4Utils.isEmpty(menuid))
                continue;
            pDto.put("menuid", menuid);
            pDto.put("authorizeid", IDHelper.getIdSequenceByKey("AUTHUSERMAPSEQUENCES"));
            pDto.put("authorizelevel", ArmConstants.AUTHORIZELEVEL_ACCESS);
            userDao.insert("User.saveSelectedMenu", pDto);
        }
        return null;
    }

    /**
     * 修改用户(提供首页修改使用)
     *
     * @param pDto
     * @return
     */
    public Dto updateUserItem4IndexPage(Dto pDto) {
        String password = pDto.getAsString("password");
        String mPasswor = G4Utils.encryptBasedDes(password);
        pDto.put("password", mPasswor);
        pDto.put("updatemode", "notnull");
        userDao.update("User.updateUserItem", pDto);
        return null;
    }

    @Override
    public Integer checkAccount(Dto pDto) {
        pDto.put("enabled", ArmConstants.ENABLED_Y);
        return userDao.checkAccount(pDto);
    }

    @Override
    public List<Dto> queryUserInfo(Dto pDto) {
        return userDao.queryUserInfo(pDto);
    }

    @Override
    public List<Dto> getUserInfoByKey(Dto pDto) {
        return userDao.getUserInfoByKey(pDto);
    }

}
