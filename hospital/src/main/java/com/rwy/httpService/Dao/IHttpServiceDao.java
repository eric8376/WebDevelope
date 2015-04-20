package com.rwy.httpService.Dao;

import org.nxstudio.core.model.Dto;

/**
 * Created by Administrator on 2015/4/12.
 */
public interface IHttpServiceDao {
    public void saveRequestInfo(Dto dto);
    public void saveResponseInfo(Dto dto);
}
