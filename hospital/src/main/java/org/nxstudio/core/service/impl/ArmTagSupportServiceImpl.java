package org.nxstudio.core.service.impl;

import org.nxstudio.core.dao.base.GeneralDao;
import org.nxstudio.core.service.ArmTagSupportService;
import org.nxstudio.core.constant.ArmConstants;
import org.nxstudio.core.vo.MenuVo;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.g4.G4Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 权限模型标签业务实现类
 *
 * @author XiongChun
 * @since 2010-05-13
 */
@Service("armTagSupportService")
public class ArmTagSupportServiceImpl implements ArmTagSupportService {

    @Autowired
    @Qualifier("generalDao")
    private GeneralDao armTagSupportDao;

    /**
     * 获取卡片
     *
     * @param pDto
     * @return
     */
    public Dto getCardList(Dto pDto) {
        Dto outDto = new BaseDto();
        List resultList = new ArrayList();
        String accountType = pDto.getAsString("accountType");
        pDto.put("dbType", "common");
        //modify by chenqiaoming   只使用oracle
        /*if (System.getProperty("g4Dao.db").equalsIgnoreCase("sqlserver")) {
            pDto.put("dbType", "sqlserver");
		}*/
        if (!accountType.equalsIgnoreCase(ArmConstants.ACCOUNTTYPE_NORMAL)) {
            resultList = armTagSupportDao.queryForList("ArmTagSupport.getCardListBasedSuperAndDeveloper", pDto);
            outDto.setDefaultAList(resultList);
            return outDto;
        }
        List cardListBasedRole = armTagSupportDao.queryForList("ArmTagSupport.getCardList", pDto);
        List cardListBasedUser = armTagSupportDao.queryForList("ArmTagSupport.getCardListBasedUser", pDto);
        if (G4Utils.isEmpty(cardListBasedRole)) {
            resultList.addAll(cardListBasedUser);
        } else {
            resultList.addAll(cardListBasedRole);
            for (int i = 0; i < cardListBasedUser.size(); i++) {
                MenuVo menuVoBaseUser = (MenuVo) cardListBasedUser.get(i);
                boolean flag = true;
                for (int j = 0; j < cardListBasedRole.size(); j++) {
                    MenuVo menuVoBaseRole = (MenuVo) cardListBasedRole.get(j);
                    if (menuVoBaseUser.getMenuid().equals(menuVoBaseRole.getMenuid())) {
                        flag = false;
                    }
                }
                if (flag)
                    resultList.add(menuVoBaseUser);
            }
        }
        outDto.setDefaultAList(resultList);
        return outDto;
    }

    /**
     * 获取卡片子树
     *
     * @param pDto
     * @return
     */
    public Dto getCardTreeList(Dto pDto) {
        Dto outDto = new BaseDto();
        List resultList = new ArrayList();
        String accountType = pDto.getAsString("accountType");
        if (!accountType.equalsIgnoreCase(ArmConstants.ACCOUNTTYPE_NORMAL)) {
            resultList = armTagSupportDao.queryForList("ArmTagSupport.getCardTreeListBasedSuperAndDeveloper", pDto);
            for (int i = 0; i < resultList.size(); i++) {
                MenuVo vo = (MenuVo) resultList.get(i);
                if (vo.getMenuid().length() == 4) {
                    vo.setIsRoot("true");
                } else {
                    vo.setIsRoot("false");
                }
                if (vo.getExpanded().equals("1")) {
                    vo.setExpanded("true");
                } else if (vo.getExpanded().equals("0")) {
                    vo.setExpanded("false");
                }
                if (G4Utils.isEmpty(vo.getIcon())) {
                    vo.setIcon("tab_blank.png");
                }
            }
            outDto.setDefaultAList(resultList);
            return outDto;
        }
        List cardTreeListBasedRole = new ArrayList();
        ;
        cardTreeListBasedRole = armTagSupportDao.queryForList("ArmTagSupport.getCardTreeList", pDto);
        for (int i = 0; i < cardTreeListBasedRole.size(); i++) {
            MenuVo vo = (MenuVo) cardTreeListBasedRole.get(i);
            if (vo.getMenuid().length() == 4) {
                vo.setIsRoot("true");
            } else {
                vo.setIsRoot("false");
            }
            if (vo.getExpanded().equals("1")) {
                vo.setExpanded("true");
            } else if (vo.getExpanded().equals("0")) {
                vo.setExpanded("false");
            }
            if (G4Utils.isEmpty(vo.getIcon())) {
                vo.setIcon("tab_blank.png");
            }
        }
        List cardTreeListBasedUser = new ArrayList();
        ;
        cardTreeListBasedUser = armTagSupportDao.queryForList("ArmTagSupport.getCardTreeListBasedUser", pDto);
        for (int i = 0; i < cardTreeListBasedUser.size(); i++) {
            MenuVo vo = (MenuVo) cardTreeListBasedUser.get(i);
            if (vo.getMenuid().length() == 4) {
                vo.setIsRoot("true");
            } else {
                vo.setIsRoot("false");
            }
            if (vo.getExpanded().equals("1")) {
                vo.setExpanded("true");
            } else if (vo.getExpanded().equals("0")) {
                vo.setExpanded("false");
            }
            if (G4Utils.isEmpty(vo.getIcon())) {
                vo.setIcon("tab_blank.png");
            }
        }
        if (G4Utils.isEmpty(cardTreeListBasedRole)) {
            resultList.addAll(cardTreeListBasedUser);
        } else {
            resultList.addAll(cardTreeListBasedRole);
            for (int i = 0; i < cardTreeListBasedUser.size(); i++) {
                MenuVo menuVoBaseUser = (MenuVo) cardTreeListBasedUser.get(i);
                boolean flag = true;
                for (int j = 0; j < cardTreeListBasedRole.size(); j++) {
                    MenuVo menuVoBaseRole = (MenuVo) cardTreeListBasedRole.get(j);
                    if (menuVoBaseUser.getMenuid().equals(menuVoBaseRole.getMenuid())) {
                        flag = false;
                    }
                }
                if (flag)
                    resultList.add(menuVoBaseUser);
            }
        }
        for (int i = 0; i < resultList.size(); i++) {
            MenuVo menuVo = (MenuVo) resultList.get(i);
            if (menuVo.getMenuid().equals(ArmConstants.ROORID_MENU)) {
                resultList.remove(i);
            }
        }
        outDto.setDefaultAList(resultList);
        return outDto;
    }

    /**
     * 获取登录人员所属部门信息
     *
     * @return
     */
    public Dto getDepartmentInfo(Dto pDto) {
        Dto outDto = (BaseDto) armTagSupportDao.queryForObject("ArmTagSupport.getDepartmentInfo", pDto);
        String deptname = ((BaseDto) armTagSupportDao.queryForObject("ArmTagSupport.getDepartmentInfo", pDto)).getAsString("deptname");
        return outDto;
    }

    /**
     * 获取登录人员附加信息
     *
     * @param pDto
     * @return
     */
    public Dto getEauserSubInfo(Dto pDto) {
        return (BaseDto) armTagSupportDao.queryForObject("ArmTagSupport.getEauserSubInfo", pDto);
    }

}
