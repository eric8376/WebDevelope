package org.nxstudio.service.workflow.common.service;

import org.nxstudio.core.model.Dto;

import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: zhangwei
 * Date: 13-6-13
 * Time: 上午10:32
 * =================================
 * 读取流程环节映射
 */
public interface ITaskMappingService {
    public Map<String, Dto> GetMappingByProcessKey();
}
