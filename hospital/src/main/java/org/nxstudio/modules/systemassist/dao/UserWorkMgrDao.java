package org.nxstudio.modules.systemassist.dao;

import org.nxstudio.core.dao.base.GeneralDao;
import org.nxstudio.core.model.Dto;
import org.nxstudio.plugin.pagination.Page;

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
 * Created by Chunji.Luo on 2014/8/5.
 */
public interface UserWorkMgrDao extends GeneralDao {

    public Page listAllBySql(Dto pDto);

    public Page listUnCommitBySql(Dto pDto);


}
