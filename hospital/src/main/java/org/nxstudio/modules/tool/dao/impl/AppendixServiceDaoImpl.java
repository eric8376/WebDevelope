package org.nxstudio.modules.tool.dao.impl;

import org.nxstudio.core.dao.impl.GeneralDaoImpl;
import org.nxstudio.modules.tool.dao.IAppendixServiceDao;
import org.springframework.stereotype.Component;

/**
 * Created by 吴为超 on 2014/8/6.
 */
@Component
public class AppendixServiceDaoImpl extends GeneralDaoImpl implements IAppendixServiceDao {

    @Override
    public void insert(String statementName, Object parameterObject) {
        super.insert(statementName, parameterObject);
    }
}
