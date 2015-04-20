package org.nxstudio.modules.systemassist.service.impl;

import org.nxstudio.core.model.T_SB.TSbRelationOperationHistory;
import org.nxstudio.modules.systemassist.dao.TSbRelationOperationHistoryDao;
import org.nxstudio.modules.systemassist.service.ITSbRelationOperationHistoryService;
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
public class TSbRelationOperationHistoryServiceImpl implements ITSbRelationOperationHistoryService {

    @Autowired
    private TSbRelationOperationHistoryDao tSbRelationOperationHistoryDao;

    public void save(TSbRelationOperationHistory tSbRelationOperationHistory) {
        tSbRelationOperationHistoryDao.save(tSbRelationOperationHistory);
    }

}
