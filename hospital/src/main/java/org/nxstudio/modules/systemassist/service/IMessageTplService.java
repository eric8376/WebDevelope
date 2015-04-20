package org.nxstudio.modules.systemassist.service;

import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.T_SB.MessageTpl;
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
 * Created by Chunji.Luo on 2014/7/30.
 */
public interface IMessageTplService {

    public MessageTpl save(Dto dto) throws Exception;

    public void deleteObject(Dto dto) throws Exception;

    public void update(Dto dto) throws Exception;

    public Page listAll(Dto dto) throws Exception;

    void get(Class<MessageTpl> messageTplClass, String id);
}
