package org.nxstudio.modules.systemassist.service.impl;

import org.nxstudio.core.model.T_SB.TSbLeavelUsers;
import org.nxstudio.modules.systemassist.dao.TSbLeavelUsersDao;
import org.nxstudio.modules.systemassist.service.ITSbLeavelUsersService;
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
public class TSbLeavelUsersServiceImpl implements ITSbLeavelUsersService {

    @Autowired
    private TSbLeavelUsersDao tSbLeavelUsersDao;

    public void save(TSbLeavelUsers tSbLeavelUsers) {
        tSbLeavelUsersDao.save(tSbLeavelUsers);
    }
}
