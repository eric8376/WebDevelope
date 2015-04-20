package org.nxstudio.modules.systemassist.service.impl;

import org.nxstudio.core.model.Dto;
import org.nxstudio.modules.systemassist.dao.UserWorkMgrDao;
import org.nxstudio.modules.systemassist.service.IUserWorkMgrService;
import org.nxstudio.plugin.pagination.Page;
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
public class UserWorkMgrServiceImpl implements IUserWorkMgrService {

    @Autowired
    private UserWorkMgrDao userWorkMgrDao;

    @Override
    public Page listAllBySql(Dto pDto) {
        return userWorkMgrDao.listAllBySql(pDto);
    }

    @Override
    public Page listUnCommitBySql(Dto pDto) {
        return userWorkMgrDao.listUnCommitBySql(pDto);
    }

    @Override
    public Page listAllBySql(String id) {
        return null;
    }
}
