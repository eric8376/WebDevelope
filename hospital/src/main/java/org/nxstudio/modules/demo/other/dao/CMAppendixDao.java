package org.nxstudio.modules.demo.other.dao;

import org.nxstudio.core.dao.base.GeneralDao;
import org.nxstudio.core.model.Dto;

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
public interface CMAppendixDao extends GeneralDao {
    /**
     * 删除指定to_id对应的旧的附件
     *
     * @param dto appendixMidtable中间表名
     *            to_id
     */
    public void deleteAppendix(Dto dto);

    public void insert(String statementName, Object parameterObject);

    public int delete(String statementName, Object parameterObject);


    public int update(String statementName, Object parameterObject);
}
