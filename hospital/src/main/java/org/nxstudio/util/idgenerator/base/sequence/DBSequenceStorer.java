package org.nxstudio.util.idgenerator.base.sequence;

import org.nxstudio.core.dao.base.GeneralDao;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.idgenerator.base.SequenceStorer;
import org.nxstudio.util.idgenerator.base.StoreSequenceException;
import org.nxstudio.util.spring.SpringContextHolder;

/**
 * ID数据库逻辑存储器
 *
 * @author XiongChun
 * @since 2010-03-21
 */
public class DBSequenceStorer implements SequenceStorer {

    private GeneralDao generalDao = SpringContextHolder.getBean("generalDao");

    /**
     * 返回当前最大序列号
     */
    public long load(String pIdColumnName) throws StoreSequenceException {
        Dto dto = new BaseDto();
        dto.put("fieldname", pIdColumnName);
        dto = (BaseDto) generalDao.queryForObject("IdGenerator.getEaSequenceByFieldName", dto);
        Long maxvalue = dto.getAsLong("maxid");
        return maxvalue.longValue();
    }

    /**
     * 写入当前生成的最大序列号值
     */
    public void updateMaxValueByFieldName(long pMaxId, String pIdColumnName) throws StoreSequenceException {
        Dto dto = new BaseDto();
        dto.put("maxid", String.valueOf(pMaxId));
        dto.put("fieldname", pIdColumnName);
        generalDao.update("IdGenerator.updateMaxValueByFieldName", dto);
    }
}
