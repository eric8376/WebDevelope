package org.nxstudio.modules.systemmanager.privilege.service.impl;

import org.nxstudio.core.constant.ArmConstants;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.modules.systemmanager.privilege.dao.PartDao;
import org.nxstudio.modules.systemmanager.privilege.service.PartService;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.util.idgenerator.IDHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * UI组件授权服务实现
 *
 * @author XiongChun
 * @since 2011-06-25
 */
@Service("partService")
public class PartServiceImpl implements PartService {

    @Autowired
    private PartDao partDao;

    /**
     * 保存托管UI组件脏数据
     *
     * @param pDto
     * @return
     */
    public Dto saveDirtyDatas(Dto pDto) {
        Dto outDto = new BaseDto();
        List list = pDto.getDefaultAList();
        if (!checkUniqueIndex(list)) {
            outDto.setSuccess(G4Constants.FALSE);
            return outDto;
        }
        for (int i = 0; i < list.size(); i++) {
            Dto dto = (BaseDto) list.get(i);
            if (dto.getAsString("remark").equals("null")) {
                dto.put("remark", "");
            }
            if (dto.getAsString("dirtytype").equalsIgnoreCase("1")) {
                dto.put("partid", IDHelper.getIdSequenceByKey("PARTSEQUENCES"));
                partDao.insert("Part.savePartItem", dto);
            } else {
                partDao.update("Part.updatePartItem", dto);
            }
        }
        outDto.setSuccess(G4Constants.TRUE);
        return outDto;
    }

    /**
     * 检查组件唯一性
     *
     * @param pList
     * @return
     */
    private boolean checkUniqueIndex(List pList) {
        /*
		for (int i = 0; i < pList.size(); i++) {
			Dto dto = (BaseDto)pList.get(i);
			Dto qDto = new BaseDto();
			qDto.put("menuid", dto.getAsString("menuid"));
			qDto.put("cmpid", dto.getAsString("cmpid"));
			Dto outDto = (BaseDto)partDao.queryForObject("Part.queryPartByDto", qDto);
			if (!G4Utils.isEmpty(outDto)) {
				return false;
			}
		}
		*/
        return true;
    }


    /**
     * 删除数据
     *
     * @param pDto
     * @return
     */
    public Dto deleteItem(Dto pDto) {
        partDao.delete("Part.deletePartItem", pDto);
        partDao.delete("Part.deletePartUserGrantItem", pDto);
        partDao.delete("Part.deletePartRoleGrantItem", pDto);
        return null;
    }

    /**
     * 保存UI元素人员授权数据
     *
     * @param pDto
     * @return
     */
    public Dto savePartUserGrantDatas(Dto pDto) {
        List list = pDto.getDefaultAList();
        for (int i = 0; i < list.size(); i++) {
            Dto lDto = (BaseDto) list.get(i);
            if (G4Utils.isEmpty(lDto.getAsString("authorizeid"))) {
                if (!lDto.getAsString("partauthtype").equals(ArmConstants.PARTAUTHTYPE_NOGRANT)) {
                    lDto.put("authorizeid", IDHelper.getIdSequenceByKey("AUTHUIUSERSEQUENCES"));
                    partDao.insert("Part.insertEausermenupartItem", lDto);
                }
            } else {
                if (lDto.getAsString("partauthtype").equals(ArmConstants.PARTAUTHTYPE_NOGRANT)) {
                    partDao.delete("Part.deleteEausermenupartItem", lDto);
                } else {
                    partDao.update("Part.updateEausermenupartItem", lDto);
                }
            }
        }
        return null;
    }

    /**
     * 保存UI元素角色授权数据
     *
     * @param pDto
     * @return
     */
    public Dto savePartRoleGrantDatas(Dto pDto) {
        List list = pDto.getDefaultAList();
        for (int i = 0; i < list.size(); i++) {
            Dto lDto = (BaseDto) list.get(i);
            if (G4Utils.isEmpty(lDto.getAsString("authorizeid"))) {
                if (!lDto.getAsString("partauthtype").equals(ArmConstants.PARTAUTHTYPE_NOGRANT)) {
                    lDto.put("authorizeid", IDHelper.getIdSequenceByKey("AUTHUIROLESEQUENCES"));
                    partDao.insert("Part.insertEarolemenupartItem", lDto);
                }
            } else {
                if (lDto.getAsString("partauthtype").equals(ArmConstants.PARTAUTHTYPE_NOGRANT)) {
                    partDao.delete("Part.deleteEarolemenupartItem", lDto);
                } else {
                    partDao.update("Part.updateEarolemenupartItem", lDto);
                }
            }
        }
        return null;
    }
}
