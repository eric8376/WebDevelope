package org.nxstudio.modules.tool.dao.impl;

import org.nxstudio.core.dao.impl.GeneralDaoImpl;
import org.nxstudio.modules.tool.dao.IAuditServiceDao;
import org.springframework.stereotype.Component;

/**
 * Created by 吴为超 on 2014/8/6.
 */
@Component
public class AuditServiceDaoImpl extends GeneralDaoImpl implements IAuditServiceDao {

    @Override
    public void insert(String statementName, Object parameterObject) {
        super.insert(statementName, parameterObject);
    }

    @Override
    public int update(String statementName, Object parameterObject) {
        return super.update(statementName, parameterObject);
    }
}
