package org.nxstudio.modules.systemassist.service.impl;

import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.T_SB.MessageTpl;
import org.nxstudio.modules.systemassist.dao.MessageTplDao;
import org.nxstudio.modules.systemassist.service.IMessageTplService;
import org.nxstudio.plugin.pagination.Page;
import org.nxstudio.util.dao.ConditionQuery;
import org.nxstudio.util.dao.OrderBy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Copyright 2000-2014 by RenWoYou Corporation.
 * <p/>
 * All rights reserved.
 * <p/>
 * This software is the confidential and proprietary information of
 * RenWoYou Corporation ("Confidential Information").  You
 * shall not disclose such Confidential Information and shall use
 * it only in accordance with the terms of the license agreement
 * you entered into with RenWoYou.
 * <p/>
 * <p/>
 * Created by Chunji.Luo on 2014/7/30.
 */
@Service
public class MessageTplServiceImpl implements IMessageTplService {

    @Autowired
    private MessageTplDao messageTplDao;

    public MessageTpl save(Dto dto) throws Exception {
        return messageTplDao.save(MessageTpl.class, dto);
    }

    public void deleteObject(Dto dto) throws Exception {
        messageTplDao.deleteObject(MessageTpl.class, dto);
    }

    public void update(Dto dto) throws Exception {
        messageTplDao.update(MessageTpl.class, dto);
    }

    public Page listAll(Dto dto) throws Exception {
        //排序
        OrderBy orders = new OrderBy();
        orders.add(Order.desc("create_date"));

        //条件
        String searchKey = "%" + dto.getAsString("searchKey") + "%";
        ConditionQuery conditions = new ConditionQuery();

        conditions.add(Restrictions.or(Restrictions.like("tpl_name", searchKey), Restrictions.like("title", searchKey), Restrictions.like("content", searchKey)));
        return messageTplDao.listPage(MessageTpl.class, dto, conditions, orders);
    }

    @Override
    public void get(Class<MessageTpl> messageTplClass, String id) {
        messageTplDao.get(messageTplClass, id);
    }

}
