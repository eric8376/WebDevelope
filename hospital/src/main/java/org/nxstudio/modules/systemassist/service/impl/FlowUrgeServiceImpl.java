package org.nxstudio.modules.systemassist.service.impl;

import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.modules.systemassist.dao.FlowUrgeDao;
import org.nxstudio.modules.systemassist.service.IFlowUrgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【流程催促服务】
 * 时间: 2013-06-10 下午4:36
 */
@Service("flowService")
public class FlowUrgeServiceImpl implements
        IFlowUrgeService {

    @Autowired
    private FlowUrgeDao flowUrgeDao;

    /**
     * 增加流程
     */
    public Dto addFlow(Dto pDto) {

        // 查询流程是否存在
        List tmpList = flowUrgeDao
                .queryForList("flowUrge.queryT_SB_FLOW_URGE1", pDto);
        if (tmpList.size() != 0) {
            pDto.put("success", false);
            pDto.put("msg", "该流程设置信息已存在！请重新设置！");
            return pDto;
        }

        // 查询最大编号
        String tmpStr = (String) flowUrgeDao
                .queryForObject("flowUrge.maxT_SB_FLOW_URGE");
        Long maxNo = tmpStr == null ? 1 : Long.parseLong(tmpStr) + 1;

        // 加入流程
        pDto.put("urge_no", maxNo);
        if (pDto.containsKey("is_urge_")) {
            pDto.put("is_urge", pDto.getAsString("is_urge_"));
        }
        flowUrgeDao.insert("flowUrge.insertT_SB_FLOW_URGE", pDto);

        // 返回加入的编号
        pDto.put("success", true);
        pDto.put("msg", maxNo);

        return pDto;
    }

    /**
     * 删除流程
     */
    public Dto delFlow(Dto pDto) {
        //删除催促设置
        flowUrgeDao.delete("flowUrge.deleteT_SB_FLOW_URGE_MX1", pDto);

        // 删除流程设置
        flowUrgeDao.delete("flowUrge.deleteT_SB_FLOW_URGE", pDto);

        return pDto;
    }

    /**
     * 修改流程
     */
    public Dto updFlow(Dto pDto) {
        if (pDto.containsKey("is_urge_")) {
            pDto.put("is_urge", pDto.getAsString("is_urge_"));
        }
        // 修改
        flowUrgeDao.update("flowUrge.updateT_SB_FLOW_URGE", pDto);

        return pDto;
    }

    /**
     * 增加催促设置
     */
    public Dto addUrge(Dto pDto) {
        // 查询最大编号
        String tmpStr = (String) flowUrgeDao
                .queryForObject("flowUrge.maxT_SB_FLOW_URGE_MX");
        int maxNo = tmpStr == null ? 1 : Integer.parseInt(tmpStr) + 1;

        // 加入催促设置
        pDto.put("mx_no", maxNo);
        flowUrgeDao.insert("flowUrge.insertT_SB_FLOW_URGE_MX", pDto);

        // 返回加入的编号
        pDto.put("success", true);
        pDto.put("msg", maxNo);

        return pDto;
    }

    /**
     * 删除催促设置
     */
    public Dto delUrge(Dto pDto) {
        // 删除
        flowUrgeDao.delete("flowUrge.deleteT_SB_FLOW_URGE_MX", pDto);

        return pDto;
    }

    /**
     * 修改催促设置
     */
    public Dto updUrge(Dto pDto) {
        // 修改
        flowUrgeDao.update("flowUrge.updateT_SB_FLOW_URGE_MX", pDto);

        return pDto;
    }


    /**
     * 获取某个环节的设置信息
     */
    public List<Dto> getFlow(String flowNo, String pointNo) {
        Dto pDto = new BaseDto();
        pDto.put("flow_no", flowNo);
        pDto.put("point_no", pointNo);
        List<Dto> list = flowUrgeDao.queryForList("flowUrge.queryT_SB_FLOW_URGE1", pDto);
        return list;
    }

    /**
     * 获取某个环节的催促信息
     */
    public List<Dto> getUrge(Long UrgeNo) {
        Dto pDto = new BaseDto();
        pDto.put("urge_no", UrgeNo);
        List<Dto> list = flowUrgeDao.queryForList("flowUrge.queryT_SB_FLOW_URGE_MX", pDto);
        return list;
    }
}

