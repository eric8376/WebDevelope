package org.nxstudio.core.service.impl;

import org.nxstudio.core.dao.base.GeneralDao;
import org.nxstudio.modules.tool.service.impl.DriveSerive;
import org.nxstudio.service.workflow.common.service.IActivitiService;
import org.nxstudio.plugin.pagination.Page;
import org.nxstudio.core.model.T_SB.FlowUrge;
import org.nxstudio.core.model.T_SB.FlowUrgeMx;
import org.nxstudio.core.model.T_SB.FlowUrgeMx2;
import org.nxstudio.core.service.IFlowUrge2Service;
import org.activiti.engine.impl.pvm.process.ActivityImpl;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.g4.G4Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【流程超时管理提醒升级版】
 * 时间: 2013-08-21 下午2:07
 */

@Service("flowUrge2Service")
public class FlowUrge2Service extends DriveSerive implements IFlowUrge2Service {
    /**
     * 工作流服务
     */
    @Autowired
    public IActivitiService activitiService;

    @Autowired
    @Qualifier("generalDao")
    private GeneralDao flowUrge2Dao;

    /**
     * 1、查询某发布流程的所有环节
     * 需要参数{流程id：id}
     */
    public Dto getAllUrge(Dto pDto) throws Exception {
        String id = pDto.getAsString("id");
        if (G4Utils.isEmpty(id)) {
            return getResDto(false);
        }

        //查询所有活动动作
        List<ActivityImpl> activityList = activitiService.findActivityByProcDefIdWhereUserTask(id);

        //查询所有已经设置的环节信息
        Page<Map> settingsPage = flowUrge2Dao.listPageBySql("urge_no,flow_no,point_no,use_time,urge_count,is_urge,explain", "from T_SB_FLOW_URGE where flow_no='" + id + "'", null);

        //设置返回的数据
        List<Dto> dtoList = new ArrayList<Dto>();
        for (int i = 0; i < activityList.size(); i++) {
            ActivityImpl tempActivity = activityList.get(i);
            Dto tempDto = getPointDto(id, tempActivity);
            for (int j = 0; j < settingsPage.getItems().size(); j++) {
                Map tempMap = settingsPage.getItems().get(j);
                if (tempMap.get("point_no").toString().equals(tempDto.getAsString("point_no"))) {
                    tempDto.put("source_type", 1);
                    tempDto.put("urge_no", tempMap.get("urge_no"));
                    tempDto.put("use_time", tempMap.get("use_time"));
                    tempDto.put("urge_count", tempMap.get("urge_count"));
                    tempDto.put("is_urge", tempMap.get("is_urge"));
                    tempDto.put("explain", tempMap.get("explain"));
                    settingsPage.getItems().remove(j);
                    break;
                }
            }
            dtoList.add(tempDto);
        }

        return getGridDto(dtoList);
    }

    /**
     * 2、增加一条环节设置
     */
    public Dto saveUrge(Dto pDto) throws Exception {
        flowUrge2Dao.save(FlowUrge.class, pDto);
        return getResDto(true);
    }

    /**
     * 3、删除一条环节设置
     * 需要参数:del_id
     */
    public Dto deleteUrge(Dto pDto) throws Exception {
        Long del_id = pDto.getAsLong("del_id");
        if (del_id == null || del_id == 0) {
            return getResDto(false, "该环节未设置，不需要进行删除！");
        }

        //删除环节
        flowUrge2Dao.delete(FlowUrge.class, del_id);

        //删除到达
        Page<Map> mx2Page = flowUrge2Dao.listPageBySql("mx2_no", "from T_SB_FLOW_URGE_MX2 where urge_no=" + del_id, null);
        for (int i = 0; i < mx2Page.getItems().size(); i++) {
            flowUrge2Dao.delete(FlowUrgeMx2.class, Long.parseLong(mx2Page.getItems().get(i).get("mx2_no").toString()));
        }

        //删除超时
        Page<Map> mxPage = flowUrge2Dao.listPageBySql("mx_no", "from T_SB_FLOW_URGE_MX where urge_no=" + del_id, null);
        for (int i = 0; i < mxPage.getItems().size(); i++) {
            flowUrge2Dao.delete(FlowUrgeMx.class, Long.parseLong(mxPage.getItems().get(i).get("mx_no").toString()));
        }

        return getResDto(true);
    }

    /**
     * 4、删除多条环节设置
     * 需要参数:del_id
     */
    public Dto deleteUrges(Dto pDto) throws Exception {
        Dto paramDto = new BaseDto();
        String[] del_id_array = pDto.getAsString("del_id").split(",");
        for (int i = 0; i < del_id_array.length; i++) {
            paramDto.put("del_id", del_id_array[i]);
            deleteUrge(paramDto);
        }
        return getResDto(true);
    }

    /**
     * 5、更新一条环节设置
     */
    public Dto updateUrge(Dto pDto) throws Exception {
        flowUrge2Dao.update(FlowUrge.class, pDto);
        return getResDto(true);
    }


    /**
     * 6、查询某环节的任务到达提醒设置
     */
    public Dto getAllUrgeMx2(Dto pDto) throws Exception {
        return getResDto(true);
    }

    /**
     * 7、增加一条到达提醒
     */
    public Dto saveUrgeMx2(Dto pDto) throws Exception {
        flowUrge2Dao.save(FlowUrgeMx2.class, pDto);
        return getResDto(true);
    }

    /**
     * 8、删除一条到达提醒
     * 需要参数:del_id
     */
    public Dto deleteUrgeMx2(Dto pDto) throws Exception {
        Long del_id = pDto.getAsLong("del_id");
        flowUrge2Dao.delete(FlowUrgeMx2.class, del_id);
        return getResDto(true);
    }

    /**
     * 9、删除多条到达提醒
     * 需要参数:del_id
     */
    public Dto deleteUrgeMx2s(Dto pDto) throws Exception {
        String[] del_id_array = pDto.getAsString("del_id").split(",");
        for (int i = 0; i < del_id_array.length; i++) {
            flowUrge2Dao.delete(FlowUrgeMx2.class, Long.parseLong(del_id_array[i]));
        }
        return getResDto(true);
    }

    /**
     * 10、高级删除多条到达提醒
     * 需要参数:del_id
     */
    public Dto deleteUrgeMx2s_special(Dto pDto) throws Exception {
        String[] del_id_array = pDto.getAsString("del_id").split(",");
        for (int i = 0; i < del_id_array.length; i++) {
            //查询此删除信息
            Dto tempDto = flowUrge2Dao.getBySql("flow_no,mx2_no,receive_man,activity,tpl_no", "from T_SB_FLOW_URGE a,T_SB_FLOW_URGE_MX2 b where a.urge_no=b.urge_no and mx2_no='" + del_id_array[i] + "'");

            //查询与此删除信息匹配所有配置项并进行删除
            Page<Map> mx2Page = flowUrge2Dao.listPageBySql("mx2_no", "from T_SB_FLOW_URGE a,T_SB_FLOW_URGE_MX2 b where a.urge_no=b.urge_no and flow_no='" + tempDto.getAsString("flow_no") + "' and receive_man='" +
                    tempDto.getAsString("receive_man") + "' and activity='" + tempDto.getAsString("activity") + "' and tpl_no='" + tempDto.getAsString("tpl_no") + "'", null);
            for (int j = 0; j < mx2Page.getItems().size(); j++) {
                flowUrge2Dao.delete(FlowUrgeMx2.class, Long.parseLong(mx2Page.getItems().get(j).get("mx2_no").toString()));
            }
        }
        return getResDto(true);
    }

    /**
     * 11、更新一条到达提醒
     */
    public Dto updateUrgeMx2(Dto pDto) throws Exception {
        flowUrge2Dao.update(FlowUrgeMx2.class, pDto);
        return getResDto(true);
    }


    /**
     * 12、查询某环节的任务超时提醒设置
     */
    public Dto getAllUrgeMx(Dto pDto) throws Exception {
        return getResDto(true);
    }

    /**
     * 13、增加一条超时提醒
     */
    public Dto saveUrgeMx(Dto pDto) throws Exception {
        flowUrge2Dao.save(FlowUrgeMx.class, pDto);
        return getResDto(true);
    }

    /**
     * 14、删除一条超时提醒
     * 需要参数:del_id
     */
    public Dto deleteUrgeMx(Dto pDto) throws Exception {
        Long del_id = pDto.getAsLong("del_id");
        flowUrge2Dao.delete(FlowUrgeMx.class, del_id);
        return getResDto(true);
    }

    /**
     * 15、删除多条超时提醒
     * 需要参数:del_id
     */
    public Dto deleteUrgeMxs(Dto pDto) throws Exception {
        String[] del_id_array = pDto.getAsString("del_id").split(",");
        for (int i = 0; i < del_id_array.length; i++) {
            flowUrge2Dao.delete(FlowUrgeMx.class, Long.parseLong(del_id_array[i]));
        }
        return getResDto(true);
    }

    /**
     * 16、高级删除多条超时提醒
     * 需要参数:del_id
     */
    public Dto deleteUrgeMxs_special(Dto pDto) throws Exception {
        String[] del_id_array = pDto.getAsString("del_id").split(",");
        for (int i = 0; i < del_id_array.length; i++) {
            //查询此删除信息
            Dto tempDto = flowUrge2Dao.getBySql("flow_no,mx_no,b.urge_type as \"urge_type\",interval_time,repeat_urge_count,repeat_urge_interval,receive_man,activity,tpl_no", "from T_SB_FLOW_URGE a,T_SB_FLOW_URGE_MX b where a.urge_no=b.urge_no and mx_no='" + del_id_array[i] + "'");

            //查询与此删除信息匹配所有配置项并进行删除
            Page<Map> mxPage = flowUrge2Dao.listPageBySql("mx_no", "from T_SB_FLOW_URGE a,T_SB_FLOW_URGE_MX b where a.urge_no=b.urge_no and flow_no='" + tempDto.getAsString("flow_no") + "' and b.urge_type='" +
                    tempDto.getAsString("urge_type") + "' and interval_time='" + tempDto.getAsString("interval_time") + "' and repeat_urge_count='" + tempDto.getAsString("repeat_urge_count") + "' " +
                    "and repeat_urge_interval='" + tempDto.getAsString("repeat_urge_interval") + "' and receive_man='" + tempDto.getAsString("receive_man") + "' and activity='" +
                    tempDto.getAsString("activity") + "' and tpl_no='" + tempDto.getAsString("tpl_no") + "'", null);
            for (int j = 0; j < mxPage.getItems().size(); j++) {
                flowUrge2Dao.delete(FlowUrgeMx.class, Long.parseLong(mxPage.getItems().get(j).get("mx_no").toString()));
            }
        }
        return getResDto(true);
    }

    /**
     * 17、更新一条超时提醒
     */
    public Dto updateUrgeMx(Dto pDto) throws Exception {
        flowUrge2Dao.update(FlowUrgeMx.class, pDto);
        return getResDto(true);
    }


    //----------------复制粘贴功能----------------

    /**
     * 粘贴到任务到达提醒
     * 参数:from_id,to_id,type
     */
    public Dto saveToUrgeMx2(Dto pDto) throws Exception {
        String from_id = pDto.getAsString("from_id");
        String to_id = pDto.getAsString("to_id");

        //查询所有复制源信息
        Page<Map> copyPage;
        if (pDto.containsKey("copyPage")) {
            copyPage = (Page<Map>) pDto.get("copyPage");
        } else {
            copyPage = flowUrge2Dao.listPageBySql("mx2_no,urge_no,receive_man,activity,tpl_no", "from T_SB_FLOW_URGE_MX2 where mx2_no in(" + from_id + ")", null);
        }

        //粘贴到目标
        for (int i = 0; i < copyPage.getItems().size(); i++) {
            Dto tempDto = new BaseDto();
            tempDto.putAll(copyPage.getItems().get(i));
            tempDto.put("urge_no", to_id);
            flowUrge2Dao.save(FlowUrgeMx2.class, tempDto);
        }

        return getResDto(true);
    }

    /**
     * 粘帖到任务超时提醒
     * 参数:from_id,to_id,type
     */
    public Dto saveToUrgeMx(Dto pDto) throws Exception {
        String from_id = pDto.getAsString("from_id");
        String to_id = pDto.getAsString("to_id");

        //查询所有复制源信息
        Page<Map> copyPage;
        if (pDto.containsKey("copyPage")) {
            copyPage = (Page<Map>) pDto.get("copyPage");
        } else {
            copyPage = flowUrge2Dao.listPageBySql("mx_no,urge_no,urge_type,interval_time,repeat_urge_count,repeat_urge_interval,receive_man,activity,tpl_no", "from T_SB_FLOW_URGE_MX where mx_no in(" + from_id + ")", null);
        }

        //粘贴到目标
        for (int i = 0; i < copyPage.getItems().size(); i++) {
            Dto tempDto = new BaseDto();
            tempDto.putAll(copyPage.getItems().get(i));
            tempDto.put("urge_no", to_id);
            flowUrge2Dao.save(FlowUrgeMx.class, tempDto);
        }

        return getResDto(true);
    }

    /**
     * 粘贴到环节设置
     * 参数:from_id,to_id,type
     */
    public Dto saveToUrge(Dto pDto) throws Exception {
        String from_id = pDto.getAsString("from_id");
        String to_id = pDto.getAsString("to_id");
        String[] to_ids = to_id.split(",");
        String type = pDto.getAsString("type");
        Dto paramDto = new BaseDto();

        //查询所有复制源信息(mx2,mx)
        if (type.equals("mx2")) {
            Page<Map> copyPage = flowUrge2Dao.listPageBySql("mx2_no,urge_no,receive_man,activity,tpl_no", "from T_SB_FLOW_URGE_MX2 where mx2_no in(" + from_id + ")", null);
            paramDto.put("copyPage", copyPage);

            //粘贴到目标
            for (int i = 0; i < to_ids.length; i++) {
                paramDto.put("to_id", to_ids[i]);
                saveToUrgeMx2(paramDto);
            }
        } else if (type.equals("mx")) {
            Page<Map> copyPage = flowUrge2Dao.listPageBySql("mx_no,urge_no,urge_type,interval_time,repeat_urge_count,repeat_urge_interval,receive_man,activity,tpl_no", "from T_SB_FLOW_URGE_MX where mx_no in(" + from_id + ")", null);
            paramDto.put("copyPage", copyPage);

            //粘贴到目标
            for (int i = 0; i < to_ids.length; i++) {
                paramDto.put("to_id", to_ids[i]);
                saveToUrgeMx(paramDto);
            }
        } else {
            return getResDto(false, "粘贴不符合规则！");
        }

        return getResDto(true);
    }

    /**
     * 粘贴到流程设置
     * 参数:from_id,to_id,type
     */
    public Dto saveToFlow(Dto pDto) throws Exception {
        String from_id = pDto.getAsString("from_id");
        String to_id = pDto.getAsString("to_id");
        String type = pDto.getAsString("type");
        pDto.put("id", to_id);
        Dto paramDto = new BaseDto();

        //查询出粘贴目标流程的所有环节
        List<Dto> dtoList = (List<Dto>) getAllUrge(pDto).get("data");

        //查询所有复制源信息(mx2,mx,point,flow)
        if (type.equals("mx2") || type.equals("mx")) {
            String tempToId = "";
            //整理所有环节编号（没有记录则添加)
            for (int i = 0; i < dtoList.size(); i++) {
                Dto tempDto = dtoList.get(i);
                if (tempDto.getAsInteger("source_type") == 0) {
                    tempToId += flowUrge2Dao.save(FlowUrge.class, tempDto).getUrge_no();
                } else {
                    tempToId += tempDto.getAsString("urge_no");
                }
                //“,”号隔开
                if (i != dtoList.size() - 1) {
                    tempToId += ",";
                }
            }
            //调用粘帖到环节方法
            pDto.put("to_id", tempToId);
            saveToUrge(pDto);
        } else if (type.equals("point")) {
            //查询出所有复制环节信息
            Page<Map> pointPage = flowUrge2Dao.listPageBySql("urge_no,flow_no,point_no,use_time,urge_count,is_urge,explain", "from T_SB_FLOW_URGE where urge_no in(" + from_id + ")", null);
            //如果复制环节流程和粘贴环节流程一致，则返回
            if (pointPage.getItems().size() < 1 || pointPage.getItems().get(0).get("flow_no").toString().equals(to_id)) {
                return getResDto(false, "复制的环节信息从属于粘贴目标流程，无需进行粘贴!");
            }
            //复制与粘贴比对（不存在则粘贴-保存环节信息和明细配置信息)
            copyPasteCompare(dtoList, pointPage);
        } else if (type.equals("flow")) {
            //如果复制环节流程和粘贴环节流程一致，则返回
            if (from_id == to_id) {
                return getResDto(false, "复制目标流程与粘贴目标流程一致，无需进行粘贴!");
            }
            //查询出所有复制环节信息
            Page<Map> pointPage = flowUrge2Dao.listPageBySql("urge_no,flow_no,point_no,use_time,urge_count,is_urge,explain", "from T_SB_FLOW_URGE where flow_no='" + from_id + "'", null);
            //复制与粘贴比对（不存在则粘贴-保存环节信息和明细配置信息)
            copyPasteCompare(dtoList, pointPage);
        } else {
            return getResDto(false, "粘贴不符合规则！");
        }

        return getResDto(true);
    }


    //--------------------------------私有工具类-------------------------------

    /**
     * 获取某流程环节默认配置信息
     */
    private Dto getPointDto(String id, ActivityImpl activity) {
        Dto tempDto = new BaseDto();
        tempDto.put("source_type", 0);//资源类型0:来自发布流程，未设定该环节 1:已经设定
        tempDto.put("flow_no", id);
        tempDto.put("point_no", activity.getId());
        tempDto.put("explain", activity.getProperty("name"));

        tempDto.put("use_time", "0");
        tempDto.put("urge_count", 0);
        tempDto.put("is_urge", 0);
        return tempDto;
    }

    /**
     * 复制环节与粘贴环节比对(不存在则粘贴)
     */
    private void copyPasteCompare(List<Dto> pasteList, Page<Map> copyPage) throws Exception {
        Dto paramDto = new BaseDto();
        //遍历复制环节，如果粘贴目标有此环节且未设置提醒，则进行保存
        for (int i = 0; i < copyPage.getItems().size(); i++) {
            Map tempMap = copyPage.getItems().get(i);
            for (int j = 0; j < pasteList.size(); j++) {
                Dto tempDto = pasteList.get(j);
                if (tempMap.get("point_no").toString().equals(tempDto.getAsString("point_no")) && tempDto.getAsInteger("source_type") == 0) {
                    tempDto.put("use_time", tempMap.get("use_time"));
                    tempDto.put("urge_count", tempMap.get("urge_count"));
                    tempDto.put("is_urge", tempMap.get("is_urge"));
                    Long tempUrgeNo = flowUrge2Dao.save(FlowUrge.class, tempDto).getUrge_no();
                    paramDto.put("to_id", tempUrgeNo);

                    //粘贴到目标(Mx2)
                    Page<Map> copyMX2Page = flowUrge2Dao.listPageBySql("mx2_no,urge_no,receive_man,activity,tpl_no", "from T_SB_FLOW_URGE_MX2 where urge_no=" + tempMap.get("urge_no").toString(), null);
                    paramDto.put("copyPage", copyMX2Page);
                    saveToUrgeMx2(paramDto);

                    //粘贴到目标(Mx)
                    Page<Map> copyMXPage = flowUrge2Dao.listPageBySql("mx_no,urge_no,urge_type,interval_time,repeat_urge_count,repeat_urge_interval,receive_man,activity,tpl_no", "from T_SB_FLOW_URGE_MX where urge_no=" + tempMap.get("urge_no").toString(), null);
                    paramDto.put("copyPage", copyMXPage);
                    saveToUrgeMx(paramDto);
                }
            }
        }
    }

    //-----------------------getter&&setter--------------------------
//    public IActivitiService getActivitiService() {
//        return activitiService;
//    }
//
//    public void setActivitiService(IActivitiService activitiService) {
//        flowUrge2Dao.activitiService = activitiService;
//    }
}
