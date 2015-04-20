package org.nxstudio.core.dao.impl;

import org.nxstudio.core.dao.IPhoneClientDao;
import org.nxstudio.core.model.Dto;
import org.springframework.stereotype.Component;

import java.sql.SQLException;
import java.util.List;

/**
 * <pre></pre>
 * <br>
 * <pre>所属模块：</pre>
 *
 * @author 黄琦鸿
 *         创建于  2015/1/3 23:58.
 */
@Component
public class PhoneClientDaoImpl extends GeneralDaoImpl implements IPhoneClientDao {
    @Override
    public List<Dto> queryCheckRecord(Dto indDto) throws SQLException {
        List<Dto> list = queryForList("PhoneClient.getChechRecordInfo", indDto);
        return list;
    }

    @Override
    public Integer queryCheckRecordCount(Dto indDto) {
        return (Integer) queryForObject("PhoneClient.getChechRecordInfoCount", indDto);
    }
}
