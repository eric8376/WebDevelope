package org.nxstudio.modules.systemassist.controller;

import org.activiti.engine.runtime.ProcessInstance;
import org.nxstudio.core.controller.BaseAction;
import org.nxstudio.core.model.CommonActionForm;
import org.nxstudio.core.model.Dto;
import org.nxstudio.modules.systemassist.service.IUserWorkMgrService;
import org.nxstudio.plugin.pagination.Page;
import org.nxstudio.service.workflow.common.service.IActivitiService;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.util.json.JsonHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【人员工作安排查询】
 * 时间: 2013-06-10 下午4:36
 */
@Controller
@RequestMapping("/UserWorkMgrAction")
public class UserWorkMgrAction extends BaseAction {
    @Autowired
    private IUserWorkMgrService userWorkMgrService;
    @Autowired
    private IActivitiService activitiManager;

    /**
     * 查询在某部门下的员工工作状态
     */
    @RequestMapping(params = "reqCode=getUserWorkStatusInDept")
    public String getUserWorkStatusInDept(HttpServletRequest request, HttpServletResponse response) throws Exception {


        //取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);
        Page page = userWorkMgrService.listAllBySql(pDto);

        //其它数据
        for (int i = 0; i < page.getItems().size(); i++) {
            Map tempMap = (Map) page.getItems().get(i);
            tempMap.put("ordernumber", "未获取到...");
            String tempStr = (String) tempMap.get("proc_inst_id_");
            if (!(tempStr == null || tempStr.equals(""))) {
                tempMap.put("ordernumber", activitiManager.findVarInstByProcInstId(tempStr, "wf_title"));
            } else {
                tempMap.put("ordernumber", "");
            }

            page.getItems().set(i, tempMap);
        }

        //转换
        String jsonString = JsonHelper.encodeList2PageJson(page.getItems(), page.getContext().getTotal(), G4Constants.FORMAT_DateTime);
        super.write(jsonString, response);

        return null;
    }

    /**
     * 查询所有未提交的工程单
     */
    @RequestMapping(params = "reqCode=getAllUserWorkStatus")
    public String getAllUserWorkStatus(HttpServletRequest request, HttpServletResponse response) throws Exception {

        //取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        Page page = userWorkMgrService.listUnCommitBySql(pDto);

        //其它数据
        for (int i = 0; i < page.getItems().size(); i++) {
            Map tempMap = (Map) page.getItems().get(i);
            tempMap.put("ordernumber", "未获取到...");
            String tempStr = (String) tempMap.get("key");
            if (!(tempStr == null || tempStr.equals(""))) {
                ProcessInstance pi = null;
                try {
                    pi = activitiManager.findProcessInstanceByProcInstId(tempStr);
                    Page projectPage = userWorkMgrService.listAllBySql(pi.getBusinessKey());//获取工程信息
                    if (projectPage.getItems().size() > 0) {
                        Map tempProjectMap = (Map) (projectPage.getItems().get(0));
                        tempMap.put("ordernumber", (String) tempProjectMap.get("ordernumber"));
                    }
                } catch (Exception ex) {
                    tempMap.put("ordernumber", "无法获取...");
                }
            } else {
                tempMap.put("ordernumber", "");
            }

            page.getItems().set(i, tempMap);
        }

        //转换
        String jsonString = JsonHelper.encodeList2PageJson(page.getItems(), page.getContext().getTotal(), G4Constants.FORMAT_DateTime);
        super.write(jsonString, response);

        return null;
    }


}
