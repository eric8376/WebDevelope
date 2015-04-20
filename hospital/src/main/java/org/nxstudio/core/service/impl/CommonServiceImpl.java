package org.nxstudio.core.service.impl;

import org.nxstudio.core.constant.Constants;
import org.nxstudio.core.dao.base.GeneralDao;
import org.nxstudio.core.model.AbstractModel;
import org.nxstudio.core.service.ICommonService;
import org.nxstudio.plugin.pagination.Page;
import org.nxstudio.plugin.pagination.PageUtil;
import org.nxstudio.util.dao.ConditionQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.List;

/**
 * 通用的service
 */
@Service("commonService")
public class CommonServiceImpl implements ICommonService {

    @Autowired
    protected GeneralDao generalDao;

    public <T extends AbstractModel, PK extends Serializable> T get(Class<T> entityClass, PK id) {
        return generalDao.get(entityClass, id);
    }

    public <T extends AbstractModel> int countAll(Class<T> entityClass) {
        return generalDao.countAll(entityClass);
    }

    public <T extends AbstractModel> int countAll(Class<T> entityClass, ConditionQuery conditions) {
        return generalDao.countAll(entityClass, conditions);
    }

    public <T extends AbstractModel> List<T> listAll(Class<T> entityClass) {
        return generalDao.listAll(entityClass);
    }

    public <T extends AbstractModel> Page<T> listAll(Class<T> entityClass, int pn) {
        return listAll(entityClass, pn, Constants.DEFAULT_PAGE_SIZE);
    }

    public <T extends AbstractModel> Page<T> listAll(Class<T> entityClass, int pn, int pageSize) {
        int total = countAll(entityClass);
        List<T> items = generalDao.listAll(entityClass, pn, pageSize);
        return PageUtil.getPage(total, pn, items, pageSize);
    }


}
