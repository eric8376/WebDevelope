package org.nxstudio.modules.systemmanager.base.service.impl;

import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.modules.systemmanager.base.dao.ParamDao;
import org.nxstudio.modules.systemmanager.base.service.ParamService;
import org.nxstudio.util.idgenerator.IDHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 全局参数数据访问实现
 *
 * @author XiongChun
 * @since 2010-05-13
 */
@Service("paramService")
public class ParamServiceImpl implements ParamService {

    @Autowired
    private ParamDao paramDao;

    /**
     * 保存参数信息表
     */
    public Dto saveParamItem(Dto pDto) {
//		int i = 3/0;
        pDto.put("paramid", IDHelper.getIdSequenceByKey("PARAMSEQUENCES"));
        paramDao.insert("Param.saveParamItem", pDto);
        return null;
    }

    /**
     * 删除参数信息
     *
     * @param pDto
     */
    public Dto deleteParamItem(Dto pDto) {
        Dto dto = new BaseDto();
        String[] arrChecked = pDto.getAsString("strChecked").split(",");
        for (int i = 0; i < arrChecked.length; i++) {
            dto.put("paramid", arrChecked[i]);
            paramDao.delete("Param.deletParamItem", dto);
        }
        return null;
    }

    /**
     * 修改参数信息
     *
     * @param pDto
     */
    public Dto updateParamItem(Dto pDto) {
        paramDao.update("Param.updateParamItem", pDto);
        return null;
    }

}
