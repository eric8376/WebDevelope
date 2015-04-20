package org.nxstudio.modules.demo.other.dao.impl;

import org.nxstudio.core.dao.impl.GeneralDaoImpl;
import org.nxstudio.core.model.Dto;
import org.nxstudio.modules.demo.other.dao.CMAppendixDao;
import org.springframework.stereotype.Repository;

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
@Repository
public class CMAppendixDaoImpl extends GeneralDaoImpl implements CMAppendixDao {
    @Override
    public void deleteAppendix(Dto dto) {
        updateByHql("update SyAppendix   a set a.delete_status=1      where a.from_id in (select mi.from_id from  " + dto.getAsString("appendixMidtable") + "  mi where mi.to_id=" + dto.getAsString("to_id") + ")");
    }

}
