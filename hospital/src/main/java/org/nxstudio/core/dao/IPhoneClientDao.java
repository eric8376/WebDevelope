package org.nxstudio.core.dao;

import org.nxstudio.core.dao.base.GeneralDao;
import org.nxstudio.core.model.Dto;

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

public interface IPhoneClientDao extends GeneralDao {
    public List<Dto> queryCheckRecord(Dto indDto) throws SQLException;

    public Integer queryCheckRecordCount(Dto indDto);
}
