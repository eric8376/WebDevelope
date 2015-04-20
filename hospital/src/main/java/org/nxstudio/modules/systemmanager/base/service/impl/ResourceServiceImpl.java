package org.nxstudio.modules.systemmanager.base.service.impl;

import org.nxstudio.core.constant.ArmConstants;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.modules.systemmanager.base.dao.ResourceDao;
import org.nxstudio.modules.systemmanager.base.service.ResourceService;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.util.idgenerator.IDHelper;
import org.nxstudio.util.idgenerator.IdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 资源模型业务实现类
 *
 * @author XiongChun
 * @since 2010-01-13
 */
@Service("resourceService")
public class ResourceServiceImpl implements ResourceService {

    @Autowired
    private ResourceDao resourceDao;

    /**
     * 保存代码对照
     *
     * @param pDto
     * @return
     */
    public Dto saveCodeItem(Dto pDto) {
        Dto outDto = new BaseDto();
        String codeid = IDHelper.getCodeID();
        pDto.put("codeid", codeid);
        Dto checkDto = (BaseDto) resourceDao.queryForObject("Resource.checkEaCodeByIndex", pDto);
        if (G4Utils.isNotEmpty(checkDto)) {
            outDto.put("success", false);
            outDto.put("msg", "违反唯一约束,[对照字段]和[代码]组合不能重复.");
            return outDto;
        } else {
            resourceDao.insert("Resource.createEacodeDomain", pDto);
            outDto.put("success", new Boolean(true));
        }
        return outDto;
    }

    /**
     * 删除代码表
     *
     * @param pDto
     * @return
     */
    public Dto deleteCodeItem(Dto pDto) {
        Dto dto = new BaseDto();
        String[] arrChecked = pDto.getAsString("strChecked").split(",");
        for (int i = 0; i < arrChecked.length; i++) {
            dto.put("codeid", arrChecked[i]);
            Dto chechkDto = (BaseDto) resourceDao.queryForObject("Resource.getEaCodeByKey", dto);
            if (chechkDto.getAsString("editmode").equals(ArmConstants.EDITMODE_Y)) {
                resourceDao.delete("Resource.deleteCodeItem", dto);
            }
        }
        return null;
    }

    /**
     * 修改代码表
     *
     * @param pDto
     * @return
     */
    public Dto updateCodeItem(Dto pDto) {
        resourceDao.update("Resource.updateCodeItem", pDto);
        return null;
    }

    /**
     * 保存菜单
     *
     * @param pDto
     * @return
     */
    public Dto saveMenuItem(Dto pDto) throws Exception {
        String menuid = IdGenerator.getMenuIdGenerator(pDto.getAsString("parentid"));
        pDto.put("menuid", menuid);
        pDto.put("leaf", ArmConstants.LEAF_Y);
        pDto.put("sortno", G4Utils.isEmpty(pDto.getAsString("sortno")) ? Integer.valueOf("0") : pDto
                .getAsString("sortno"));
        resourceDao.insert("Resource.saveMenuItem", pDto);
        Dto updateDto = new BaseDto();
        updateDto.put("menuid", pDto.getAsString("parentid"));
        updateDto.put("leaf", ArmConstants.LEAF_N);
        resourceDao.update("Resource.updateLeafFieldInEaMenu", updateDto);
        return null;
    }

    /**
     * 删除菜单项
     *
     * @param pDto
     * @return
     */
    public Dto deleteMenuItems(Dto pDto) {
        Dto dto = new BaseDto();
        Dto changeLeafDto = new BaseDto();
        if (pDto.getAsString("type").equals("1")) {
            String[] arrChecked = pDto.getAsString("strChecked").split(",");
            for (int i = 0; i < arrChecked.length; i++) {
                dto.put("menuid", arrChecked[i]);
                changeLeafDto.put("parentid", ((BaseDto) resourceDao.queryForObject("Resource.queryMenuItemsByDto", dto))
                        .getAsString("parentid"));
                resourceDao.delete("Resource.deleteEamenuItem", dto);
                resourceDao.delete("Resource.deleteEarwauthorizeItem", dto);
                resourceDao.delete("Resource.deleteEausermenumapByMenuid", dto);
                updateLeafOfDeletedParent(changeLeafDto);
            }
        } else {
            dto.put("menuid", pDto.getAsString("menuid"));
            changeLeafDto.put("parentid", ((BaseDto) resourceDao.queryForObject("Resource.queryMenuItemsByDto", dto))
                    .getAsString("parentid"));
            resourceDao.delete("Resource.deleteEamenuItem", dto);
            resourceDao.delete("Resource.deleteEarwauthorizeItem", dto);
            resourceDao.delete("Resource.deleteEausermenumapByMenuid", dto);
            updateLeafOfDeletedParent(changeLeafDto);
        }
        return null;
    }

    /**
     * 调整被删除菜单的直系父级菜单的Leaf属性
     *
     * @param pDto
     */
    private void updateLeafOfDeletedParent(Dto pDto) {
        String parentid = pDto.getAsString("parentid");
        pDto.put("menuid", parentid);
        Integer countInteger = (Integer) resourceDao.queryForObject("Resource.prepareChangeLeafOfDeletedParent", pDto);
        if (countInteger.intValue() == 0) {
            pDto.put("leaf", ArmConstants.LEAF_Y);
        } else {
            pDto.put("leaf", ArmConstants.LEAF_N);
        }
        resourceDao.update("Resource.updateLeafFieldInEaMenu", pDto);
    }

    /**
     * 修改菜单
     *
     * @param pDto
     * @return
     */
    public Dto updateMenuItem(Dto pDto) throws Exception {
        if (G4Utils.isEmpty(pDto.getAsString("sortno"))) {
            pDto.put("sortno", "0");
        }
        if (pDto.getAsString("parentid").equals(pDto.getAsString("parentid_old"))) {
            pDto.remove("parentid");
            resourceDao.update("Resource.updateMenuItem", pDto);
        } else {
            resourceDao.delete("Resource.deleteEamenuItem", pDto);
            resourceDao.delete("Resource.deleteEarwauthorizeItem", pDto);
            resourceDao.delete("Resource.deleteEausermenumapByMenuid", pDto);
            saveMenuItem(pDto);
            pDto.put("parentid", pDto.getAsString("parentid_old"));
            updateLeafOfDeletedParent(pDto);
        }
        return null;
    }

}
