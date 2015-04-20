package org.nxstudio.service.workflow.common.service.impl;

import org.activiti.engine.delegate.DelegateTask;
import org.nxstudio.core.dao.base.GeneralDao;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.service.workflow.common.service.IActivitiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: zhangwei
 * Date: 13-6-9
 * Time: 下午5:37
 * =================================
 * 会签环节结果
 */
@Service
public class CountersignService {
    /**
     * 工作流服务
     */
    @Autowired
    private IActivitiService activitiService;
    @Autowired
    @Qualifier("generalDao")
    protected GeneralDao generalDao;

    public void canComplete(DelegateTask delegateTask) throws Exception {
        try {
            Dto inDto = new BaseDto();
            inDto.put("taskId", delegateTask.getId());
            List<Dto> list = generalDao.queryForList("workFlow.findProcessSuggestionByTaskId", inDto);
            if (list != null && list.size() > 0) {
                Dto sDto = list.get(0);
                Object varValue = activitiService.findVarInstByTaskId(delegateTask.getId(), "agreeNum");
                Integer agreeNum = 0;
                if (varValue != null) {
                    agreeNum = Integer.parseInt(varValue.toString());
                }
                if (sDto.getAsInteger("suggestion_theme") == 1) {
                    agreeNum++;
                }
                activitiService.saveVarInstByTaskId(delegateTask.getId(), "agreeNum", agreeNum);
            }
        } catch (Exception ex) {
            System.out.print(ex.getMessage());
            throw ex;
        }
    }

    /**
     * 报价单确认会签
     *
     * @param delegateTask
     * @throws Exception
     */
    public void offerComplete(DelegateTask delegateTask) throws Exception {
        try {
            Dto inDto = new BaseDto();
            inDto.put("taskId", delegateTask.getId());
            List<Dto> list = generalDao.queryForList("workFlow.findProcessSuggestionByTaskId", inDto);
            Object offerAgreeNumT = activitiService.getTaskService().getVariable(delegateTask.getId(), "offerAgreeNumT");
            if (offerAgreeNumT == null)
                activitiService.saveVarInstByTaskId(delegateTask.getId(), "offerAgreeNumT", activitiService.getTaskService().getVariable(delegateTask.getId(), "nrOfInstances"));
            if (list != null && list.size() > 0) {
                Dto sDto = list.get(0);
                Object varValue = activitiService.findVarInstByTaskId(delegateTask.getId(), "offerAgreeNum");
                Integer agreeNum = 0;
                if (varValue != null) {
                    agreeNum = Integer.parseInt(varValue.toString());
                }
                if (sDto.getAsInteger("suggestion_theme") == 1) {
                    agreeNum++;
                }
                activitiService.saveVarInstByTaskId(delegateTask.getId(), "offerAgreeNum", agreeNum);
            }
        } catch (Exception ex) {
            System.out.print(ex.getMessage());
            throw ex;
        }
    }

    public void canCreate(DelegateTask delegateTask) {
        activitiService.removeVarInstByProcInstId(delegateTask.getProcessInstanceId(), "agreeNum");
        activitiService.removeVarInstByProcInstId(delegateTask.getProcessInstanceId(), "offerAgreeNum");
        //activitiService.saveVarInstByTaskId(delegateTask.getId(), "editstatus", "3");
    }

    public IActivitiService getActivitiService() {
        return activitiService;
    }

    public void setActivitiService(IActivitiService activitiService) {
        this.activitiService = activitiService;
    }

//    public Dao getG4Dao() {
//        return g4Dao;
//    }
//
//    public void setG4Dao(Dao g4Dao) {
//        this.g4Dao = g4Dao;
//    }
}
