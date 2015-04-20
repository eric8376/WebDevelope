package org.nxstudio.modules.oa.service.impl;

import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.modules.oa.dao.UserSubInfoDao;
import org.nxstudio.modules.oa.service.IUserSubInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Iterator;

/*
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【用户子信息管理】
 * 时间: 2013-06-10 下午4:36
 */
@Service("subInfoService")
public class UserSubInfoServiceImp implements IUserSubInfoService {

    @Autowired
    private UserSubInfoDao userSubInfoDao;

    /**
     * 更新一条用户信息
     */
    public Dto updUserInfo(Dto dto) {
        Dto outDto = new BaseDto();
        userSubInfoDao.update("userSubInfo.updateT_SB_USERSUBINFO", dto);
        return outDto;
    }

    /**
     * 查询当前用户信息（不存在则新建）
     */
    public Dto selectUserInfo(Dto dto) {
        //dao
        Dto outDto = (Dto) userSubInfoDao.queryForObject("userSubInfo.selectT_SB_USERSUBINFO", dto);

        if (outDto == null) {
            //不存在则新建
            userSubInfoDao.insert("userSubInfo.insertT_SB_USERSUBINFO", dto);
            return dto;
        } else {
            return outDto;
        }
    }

    /**
     * 根据登录账号查询用户的所有可引用信息
     */
    public Dto selectUserInfoByAccount(String account) {
        //整合参数
        Dto pDto = new BaseDto();
        pDto.put("account", account);

        //查询eauser
        Dto outDto = new BaseDto();
        outDto = (Dto) userSubInfoDao.queryForObject("EAOrg.selectEaUser", pDto);

        //查询用户子信息
        Dto subInfo = (Dto) userSubInfoDao.queryForObject("userSubInfo.selectT_SB_USERSUBINFO2", outDto);

        //将用户子信息加入到返回的dto
        if (subInfo != null) {
            Iterator keys = subInfo.keySet().iterator();
            while (keys.hasNext()) {
                String tmpKey = (String) keys.next();
                outDto.put(tmpKey, subInfo.get(tmpKey));
            }
        }

        return outDto;
    }

}
