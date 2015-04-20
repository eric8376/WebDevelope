package org.nxstudio.core.service;

import org.nxstudio.modules.exception.PrcException;
import org.nxstudio.util.dao.ConditionQuery;
import org.nxstudio.util.dao.OrderBy;
import org.nxstudio.core.model.AbstractModel;
import org.nxstudio.plugin.pagination.Page;
import org.nxstudio.core.model.Dto;
import org.springframework.orm.ibatis.SqlMapClientTemplate;

import javax.sql.DataSource;
import java.io.Serializable;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

/**
 * 通用的service接口
 */
public interface ICommonService {

    /**
     * -------Hibernate部分--------
     */


    public <T extends AbstractModel, PK extends Serializable> T get(Class<T> entityClass, PK id);

    public <T extends AbstractModel> int countAll(Class<T> entityClass);

    public <T extends AbstractModel> int countAll(Class<T> entityClass, ConditionQuery conditions);

    public <T extends AbstractModel> List<T> listAll(Class<T> entityClass);

    public <T extends AbstractModel> Page<T> listAll(Class<T> entityClass, int pn);

    public <T extends AbstractModel> Page<T> listAll(Class<T> entityClass, int pn, int pageSize);

    /**
     * 保存一条记录，自动将Dto转换成VO
     */
}