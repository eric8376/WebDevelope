package org.nxstudio.modules.systemassist.service.impl;

import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.history.HistoricVariableInstance;
import org.activiti.engine.runtime.ProcessInstance;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.T_SB.EauserRelation;
import org.nxstudio.core.model.T_SB.TSbLeavelUsers;
import org.nxstudio.core.model.T_SB.TSbRelationOperationHistory;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.core.vo.UserInfoVo;
import org.nxstudio.modules.systemassist.dao.SystemBaseDao;
import org.nxstudio.modules.systemassist.service.IEauserRelationService;
import org.nxstudio.modules.systemassist.service.ISystemBaseService;
import org.nxstudio.modules.systemassist.service.ITSbLeavelUsersService;
import org.nxstudio.modules.systemassist.service.ITSbRelationOperationHistoryService;
import org.nxstudio.service.workflow.common.service.IActivitiService;
import org.nxstudio.util.g4.G4Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.ServletContextAware;

import javax.servlet.ServletContext;
import java.util.ArrayList;
import java.util.List;

/**
 * 编程环境 IDEA.
 * 编写者: 黄琦鸿
 * 主题:【系统辅助】
 * 时间: 2014年1月24日 17:48:41
 */
@Service("SystemBaseService")
public class SystemBaseServiceImpl implements ISystemBaseService, ServletContextAware {

    @Autowired
    private IEauserRelationService eauserRelationService;
    @Autowired
    private ITSbRelationOperationHistoryService tSbRelationOperationHistoryService;
    @Autowired
    private ITSbLeavelUsersService tSbLeavelUsersService;
    @Autowired
    private SystemBaseDao systemBaseDao;
    @Autowired
    private IActivitiService activitiService;
    private ServletContext servletContext;

    @Override
    public String saveOrUpdateOrDelUserRelation(Dto dto, UserInfoVo user) {
        Dto qdto = new BaseDto();
        String result = "";
        if (dto.getAsString("operate").equals("create")) {
            result = "添加成功";
            dto.put("creater", user.getAccount());
            String p_user_id = dto.getAsString("p_user_id");
            //校验该用户是否已经有领导，是否出现循环，
            List<Dto> per_username = systemBaseDao.queryForList("SysBase.UnionVerify", dto);
            if (G4Utils.isNotEmpty(per_username)) {
                String perusername = per_username.get(0).getAsString("per_username");
                if (G4Utils.isEmpty(perusername)) {
                    perusername = "李剑";
                }
                qdto.put("error", "当前用户已经有领导了,领导是" + perusername + ",无法进行操作");
                return qdto.toJson();
            }
            EauserRelation eauserrelation = new EauserRelation(dto.getAsString("user_id"), G4Utils.isEmpty(p_user_id) ? "" : p_user_id, dto.getAsInteger("notifytype"));
            eauserRelationService.save(eauserrelation);
            TSbRelationOperationHistory tsbrelationoperationhistory = new TSbRelationOperationHistory(user.getAccount(), 0, eauserrelation);
            tSbRelationOperationHistoryService.save(tsbrelationoperationhistory);
        } else if (dto.getAsString("operate").equals("delete")) {
            EauserRelation eauserrelation = systemBaseDao.get(EauserRelation.class, dto.getAsLong("relation_id"));
            if (G4Utils.isEmpty(eauserrelation)) {
                qdto.put("error", "删除失败，未找到对应的数据，请刷新页面或联系it人员");
            } else {
                dto.put("user_id", eauserrelation.getUser_id());
                systemBaseDao.update("SysBase.deleteUserRelation", dto);
                result = "删除成功";
//                eauserrelation.setDeletestatus("1");
//                commonDao.update(eauserrelation);
            }
        } else if (dto.getAsString("operate").equals("update")) {
            EauserRelation eauserrelation = systemBaseDao.get(EauserRelation.class, dto.getAsLong("relation_id"));
            if (G4Utils.isEmpty(eauserrelation)) {
                qdto.put("error", "修改失败，未找到对应的数据，请刷新页面或联系it人员");
            } else {
                eauserrelation.setNotifytype(dto.getAsInteger("notifytype"));
                String oldP_user_id = eauserrelation.getUser_id();
                eauserrelation.setUser_id(dto.getAsString("user_id"));
                eauserRelationService.update(eauserrelation);
                dto.put("oldP_user_id", oldP_user_id);
                systemBaseDao.update("SysBase.updeteSubUserRelation", dto);
                TSbRelationOperationHistory tsbrelationoperationhistory = new TSbRelationOperationHistory(user.getAccount(), 2, eauserrelation);
                tSbRelationOperationHistoryService.save(tsbrelationoperationhistory);
                result = "修改成功";
//                eauserrelation.setDeletestatus("1");
//                commonDao.update(eauserrelation);
            }
        }
        qdto.put("success", result);
        return qdto.toJson();
    }

    /**
     * 获取该用户的所有上级领导 by account
     *
     * @param CurUserAccount
     * @return
     */
    public List<Dto> getAllParentsUserByAccount(String CurUserAccount) {
        List<Dto> result = new ArrayList<Dto>();
        Dto dto = new BaseDto("user_account", CurUserAccount);
        List<Dto> list = (List<Dto>) servletContext.getAttribute("USERRELACTIONLIST");
        int position = -1;
        for (int i = 0; i < list.size(); i++) {
            Dto temp = list.get(i);
            if (temp.getAsString("user_account").equals(CurUserAccount)) {
                position = i;
                break;
            }
        }
        if (position >= 0) {
            Dto temp = list.get(position);
            result.add(temp);
            String p_user_id = temp.getAsString("p_user_id");
            if (G4Utils.isNotEmpty(p_user_id)) {
                result.addAll(getAllParentsUser(p_user_id.trim()));
            }
        }
        return result;
    }

    /**
     * 获取该用户的所有上级领导
     *
     * @param CurUser
     * @return
     */
    @Override
    public List<Dto> getAllParentsUser(String CurUser) {
        List<Dto> result = new ArrayList<Dto>();
        Dto dto = new BaseDto("user_id", CurUser);
        List<Dto> list = (List<Dto>) servletContext.getAttribute("USERRELACTIONLIST");
        int position = -1;
        for (int i = 0; i < list.size(); i++) {
            Dto temp = list.get(i);
            if (temp.getAsString("user_id").equals(CurUser)) {
                position = i;
                break;
            }
        }
        if (position >= 0) {
            Dto temp = list.get(position);
            result.add(temp);
            String p_user_id = temp.getAsString("p_user_id");
            if (G4Utils.isNotEmpty(p_user_id)) {
                result.addAll(getAllParentsUser(p_user_id.trim()));
            }
        } else {
            return result;
        }
        return result;
    }

    /**
     * 获取最高级别的领导，辨别当前选的用户是否出现循环
     *
     * @param CurUser
     * @return
     */
    @Override
    public String getMaxLevelUser(String CurUser) {
        String result = "";
        Dto dto = new BaseDto("user_id", CurUser);
        List<Dto> PreUserList = systemBaseDao.queryForList("SysBase.getPerUser", dto);
        if (G4Utils.isEmpty(PreUserList)) {
            result = null;
        } else {
            result = getMaxLevelUser(PreUserList.get(0).getAsString("p_user_id"));
            if (result == null) {
                result = PreUserList.get(0).getAsString("p_user_id");
            }
        }
        return result;
    }

    @Override
    public String saveLeaveUserTask(Dto pDto) {
        String agentuser = pDto.getAsString("agentuser");
        String leaveluser = pDto.getAsString("leaveluser");
        TSbLeavelUsers tsbleavelusers = new TSbLeavelUsers(leaveluser, agentuser);
        tSbLeavelUsersService.save(tsbleavelusers);
        systemBaseDao.update("SysBase.updateRunTask", pDto);
        systemBaseDao.update("SysBase.updateHiTask", pDto);
        String key = "";
        if (pDto.containsKey("customer")) {
            key = "applyUserId";
            updatetaskValue(key, leaveluser, agentuser);
        } else if (pDto.containsKey("designer")) {
            key = "usertask31Assignee";
            updatetaskValue(key, leaveluser, agentuser);
        }
        return new BaseDto("success", "离职人员办理完成").toJson();
    }

    @Override
    public void setServletContext(ServletContext servletContext) {
        this.servletContext = servletContext;
    }

    public void updatetaskValue(String key, String leaveluser, String agentuser) {
        //人员类型是客服
        List<HistoricVariableInstance> list = activitiService.findVarIntsByKeyAndValue(key, leaveluser);
        if (G4Utils.isNotEmpty(list)) {
            List<HistoricProcessInstance> endProcessList = activitiService.getHistoryService().createHistoricProcessInstanceQuery().finished().list();
            for (int i = 0; i < list.size(); i++) {
                boolean hasin = false;
                String ProcessInstanceId = list.get(i).getProcessInstanceId();
                if (G4Utils.isNotEmpty(endProcessList)) {
                    for (int j = 0; j < endProcessList.size(); j++) {
                        HistoricProcessInstance historicprocessinstance = endProcessList.get(j);
                        if (historicprocessinstance.getId().equals(ProcessInstanceId)) {
                            hasin = true;
                            break;
                        }
                    }
                }
                if (!hasin) {
                    ProcessInstance process = activitiService.getRuntimeService().createProcessInstanceQuery().processInstanceId(ProcessInstanceId).singleResult();
                    boolean processIsSuspended = process.isSuspended();
                    if (processIsSuspended) {
                        activitiService.updateProcessState(ProcessInstanceId, "active");
                    }
                    activitiService.saveVarInstByPorcInstId(ProcessInstanceId, key, agentuser);
                    if (processIsSuspended) {
                        activitiService.updateProcessState(ProcessInstanceId, "suspend");
                    }
                }
            }
        }
    }

}
