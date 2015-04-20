package org.nxstudio.modules.tool.dao;

import org.nxstudio.core.dao.base.GeneralDao;

/**
 * Created by 吴为超 on 2014/8/6.
 */
public interface IAppendixServiceDao extends GeneralDao {

    public void insert(String statementName, Object parameterObject);
}
