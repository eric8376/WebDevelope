package org.nxstudio.modules.demo.other.service.impl;


import org.nxstudio.core.model.Dto;
import org.nxstudio.modules.demo.other.service.IAppendixService;
import org.nxstudio.modules.tool.dao.IAppendixServiceDao;
import org.nxstudio.util.idgenerator.IDHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

/**
 * @author 张维
 * @deprecated 附件操作
 */
@Service("AppendixService")
public class AppendixServiceImpl implements IAppendixService {

    @Autowired
    private IAppendixServiceDao iAppendixServiceDao;

    /**
     * 获取指定的附件信息
     *
     * @param dto
     * @return
     * @throws java.sql.SQLException
     */
    public Dto queryAppendixByFromId(Dto dto) throws SQLException {
        List list = iAppendixServiceDao.queryForList("Appendix.queryAppendixByFromId", dto);
        if (list.size() == 0)
            return null;
        return (Dto) list.get(0);
    }

    /**
     * 保存附件信息
     *
     * @param dto
     */
    public void saveAppendix(Dto dto) {
        iAppendixServiceDao.insert("Appendix.saveAppendix", dto);
    }

    /**
     * 复制图纸
     *
     * @param dto
     */
    public void copyAppendix(Dto dto) throws SQLException {
        List list = iAppendixServiceDao.queryForList("Appendix.queryAppendix", dto);
        if (list.size() == 0)
            return;
        Dto inDto = (Dto) list.get(0);
        inDto.put("appendix_id", IDHelper.getCodeID());
        inDto.put("afrom_id", dto.getAsString("newfromid"));
        saveAppendix(inDto);
    }
}