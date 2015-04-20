package org.nxstudio.service.workflow.common.service.impl;

import org.nxstudio.service.workflow.common.service.ITaskMappingService;
import org.nxstudio.core.model.Dto;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: zhangwei
 * Date: 13-6-13
 * Time: 上午10:32
 * =================================
 * 读取流程环节映射
 */
@Component
public class TaskMappingService implements ITaskMappingService {
    @Override
    public Map<String, Dto> GetMappingByProcessKey() {
        //SAXBuilder builder = new SAXBuilder();

        return null;
    }
}
