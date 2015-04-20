package com.rwy.hospitalManage.service.impl;

import com.rwy.hospitalManage.dao.IHospitalDao;
import com.rwy.hospitalManage.entity.DeptCourseInfo;
import com.rwy.hospitalManage.entity.HospitalBaseInfo;
import com.rwy.hospitalManage.service.IHospitalInfoService;
import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.runtime.ProcessInstance;
import org.nxstudio.core.constant.ArmConstants;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.Earole;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.core.vo.UserInfoVo;
import org.nxstudio.modules.systemmanager.privilege.service.OrganizationService;
import org.nxstudio.modules.systemmanager.privilege.service.RoleService;
import org.nxstudio.modules.systemmanager.privilege.service.UserService;
import org.nxstudio.plugin.report.excel.ExcelData;
import org.nxstudio.plugin.report.excel.ExcelExporter;
import org.nxstudio.service.workflow.common.service.IActivitiService;
import org.nxstudio.util.base.WebUtils;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.util.json.JsonHelper;
import org.nxstudio.util.json.ListJson2List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * <pre></pre>
 * <br>
 * <pre>所属模块：</pre>
 *
 * @author 黄琦鸿
 *         创建于  2014/12/28 19:15.
 */
@Service
public class HospitalInfoServiceImpl implements IHospitalInfoService {
    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;
    @Autowired
    private OrganizationService organizationService;
    @Autowired
    private IActivitiService activitisManage;
    private ListJson2List listjson2list = new ListJson2List();
    @Autowired
    private IHospitalDao hospitalDao;
    private DecimalFormat df2 = new DecimalFormat("###.00");
    private String[] reportmodel = new String[]{"", "dcbReport", "gn_swsycxhzReport", "gn_swszqxhzReport", "gn_zskhhzReport", "swsycxhzReport"};

    @Override
    public void saveHospitalInfo(Dto dto) throws Exception {
        List<Earole> earoles = roleService.queryEaroleByHql(new BaseDto("rolename", "'医院管理员'"));
        if (G4Utils.isEmpty(earoles) || earoles.size() > 1) {
            dto.put("error", "医院管理员角色不存在");
            return;
        } else {
            dto.put("roleid", earoles.get(0).getRoleid());
        }
        //校验医院名称是否存在
        List<HospitalBaseInfo> hospitalBaseInfos = hospitalDao.CheckHospitalUnion(dto.getAsString("hospital_name"));
        if (G4Utils.isNotEmpty(hospitalBaseInfos)) {
            dto.put("error", "医院名称已存在");
            return;
        }
        dto.put("deptname", dto.getAsString("hospital_name"));
        List<Dto> deptlist = organizationService.CheckDeptUnion(dto);
        if (G4Utils.isNotEmpty(deptlist)) {
            dto.put("error", "医院对应部门已存在已存在");
            return;
        }
        Integer accountCount = userService.checkAccount(dto);
        if (accountCount != 0) {
            dto.put("error", "登录账户已被占用,请尝试其它帐户!");
            return;
        }
        dto.put("parentid", "001");
        //保存部门
        organizationService.saveDeptItem(dto);
        dto.put("usertype", "1");
        dto.put("locked", ArmConstants.LOCK_N);
        //保存用户
        userService.saveUserItem(dto);

        //保存医院信息
        hospitalDao.saveHospitalInfo(dto);

    }

    @Override
    public void updateHospitalInfo(Dto dto) throws Exception {
        hospitalDao.updateHospitalInfo(dto);
    }

    @Override
    public void deleteHospitalInfo(Dto dto) {
        hospitalDao.deleteHospitalInfo(dto);
        dto.put("type", "2");
        //获取该部门的人员和部门，并删除
        organizationService.deleteDeptItems(dto);
    }

    @Override
    public String queryHospitalInfo(Dto dto) throws SQLException {
        List<Dto> list = hospitalDao.queryHospitalInfo(dto);
        Integer count = hospitalDao.queryHospitalInfoCount(dto);
        String jsonString = JsonHelper.encodeList2PageJson(list, count, G4Constants.FORMAT_DateTime);
        return jsonString;
    }

    @Override
    public String queryDeptCourseInfo(Dto dto) throws SQLException {
        List<Dto> list = hospitalDao.queryDeptCourseInfo(dto);
        Integer count = hospitalDao.queryDeptCourseInfoCount(dto);
        String jsonString = JsonHelper.encodeList2PageJson(list, count, null);
        return jsonString;
    }

    @Override
    public String queryCourseInfo(Dto dto) throws SQLException {
        List<Dto> list = hospitalDao.queryCourseInfo(dto);
        Integer count = hospitalDao.queryCourseInfoCount(dto);
        String jsonString = JsonHelper.encodeList2PageJson(list, count, null);
        return jsonString;
    }

    @Override
    public String queryCheckInfo(Dto pDto, UserInfoVo user) throws SQLException {
        Dto roleDto = new BaseDto("rolename", "医院管理员");
        if (G4Utils.isEmpty(pDto.getAsString("userid"))) {
            roleDto.put("userid", user.getUserid());
        }
        List<Dto> role = roleService.queryUserRole(roleDto);
        String deptid = user.getDeptid();
        if (G4Utils.isEmpty(pDto.getAsString("deptid"))) {
            pDto.put("rootdeptid", deptid.length() < 6 ? deptid : deptid.substring(0, 6));
        }
        //如果是医院管理员就查询全部。否则就查询自己录入的
        if (G4Utils.isEmpty(role) && !pDto.containsKey("record_id")) {
            pDto.put("userid", user.getUserid());
        }
        List<Dto> list = hospitalDao.queryCheckInfo(pDto);
        Integer count = hospitalDao.queryCheckInfoCount(pDto);
        if (G4Utils.isNotEmpty(list)) {
            for (int j = 0; j < list.size(); j++) {
                pDto.put("formid", list.get(j).getAsString("record_id"));
                List<Dto> stands = hospitalDao.queryCheckStandardInfo(pDto);
                for (int i = 0; i < stands.size(); i++) {
                    Dto dto = stands.get(i);
                    list.get(j).put("standard" + (i + 1), dto.getAsString("check_result"));
                }
            }
        }
        String jsonString ="";
        if( pDto.containsKey("limit") )
        {
            jsonString=   JsonHelper.encodeList2PageJson(list, count, G4Constants.FORMAT_DateTime);
            pDto.put("total",count);
        }else{
            jsonString=     JsonHelper.encodeObject2Json(list, G4Constants.FORMAT_DateTime);
        }
        pDto.put("listData",list);
        return jsonString;
    }

    @Override
    public String getRunningTaskForCheckRecord(Dto pDto, UserInfoVo user) throws SQLException {
        Dto roleDto = new BaseDto("rolename", "医院管理员");
        if (G4Utils.isEmpty(pDto.getAsString("userid"))) {
            roleDto.put("userid", user.getUserid());
        }
        List<Dto> role = roleService.queryUserRole(roleDto);
        String deptid = user.getDeptid();
        if (G4Utils.isEmpty(pDto.getAsString("deptid"))) {
            pDto.put("rootdeptid", deptid.length() < 6 ? deptid : deptid.substring(0, 6));
        }
        //如果是医院管理员就查询全部。否则就查询自己录入的
        if (G4Utils.isEmpty(role) && !pDto.containsKey("record_id")) {
            pDto.put("userid", user.getUserid());
        }
        List<Dto> list = hospitalDao.getRunningTaskForCheckRecord(pDto);
        Integer count = hospitalDao.getRunningTaskForCheckRecordCount(pDto);
        if (G4Utils.isNotEmpty(list)) {
            for (int j = 0; j < list.size(); j++) {
                pDto.put("formid", list.get(j).getAsString("record_id"));
                List<Dto> stands = hospitalDao.queryCheckStandardInfo(pDto);
                for (int i = 0; i < stands.size(); i++) {
                    Dto dto = stands.get(i);
                    list.get(j).put("standard" + (i + 1), dto.getAsString("check_result"));
                }
            }
        }
        String jsonString ="";
        if( pDto.containsKey("limit") )
        {
            jsonString=   JsonHelper.encodeList2PageJson(list, count, G4Constants.FORMAT_DateTime);
            pDto.put("total",count);
        }else{
            jsonString=     JsonHelper.encodeObject2Json(list, G4Constants.FORMAT_DateTime);
        }
        return jsonString;
    }

    @Override
    public void saveCheckRecordInfo(Dto pDto) throws Exception {
        List<Dto> role = roleService.queryUserRole(pDto);
        boolean ismepty = G4Utils.isEmpty(role);
        if (ismepty) {
            pDto.put("verify_statu", "VS00102");
        } else {
            pDto.put("verify_statu", "VS00101");
        }
        getCheckRecordStatu(pDto);
        if (pDto.containsKey("error")) {
            return;
        }
        hospitalDao.saveCheckRecordInfo(pDto);
        pDto.put("formid", pDto.getAsString("record_id"));
        saveCheckStandardInfo(pDto);
        pDto.put("operater", pDto.getAsString("userid"));
        pDto.put("operate_type", "OT00101");
        hospitalDao.saveCheckHis(pDto);
        pDto.put("formid", pDto.getAsString("detail_id"));
        saveCheckStandardInfo(pDto);
        if (ismepty) {
            Dto verableDto = new BaseDto();
            verableDto.put("applyUserId", pDto.getAsString("userAccount"));
            verableDto.put("wf_title", "手卫记录审核");
            activitisManage.doStartWorkflow("VerifyCheckRecord", pDto.getAsString("record_id"), verableDto);
        }

    }

    @Override
    public void updateCheckRecordInfo(Dto pDto) throws Exception {
        //判断是否存在流程中。存在就表示正在审核
        List<ProcessInstance> processInstanceList = activitisManage.getRuntimeService().createProcessInstanceQuery().processInstanceBusinessKey(pDto.getAsString("")).list();
        if (G4Utils.isNotEmpty(processInstanceList)) {
            pDto.put("error", "记录审核中，无法修改");
            return;
        }
        getCheckRecordStatu(pDto);
        if (pDto.containsKey("error")) {
            return;
        }
        hospitalDao.updateCheckRecordInfo(pDto);
        if (pDto.containsKey("error")) {
            return;
        }
        pDto.put("formid", pDto.getAsString("record_id"));
        updateCheckStandardInfo(pDto);
        pDto.put("operater", pDto.getAsString("userid"));
        pDto.put("operate_type", "OT00102");
        hospitalDao.saveCheckHis(pDto);
        pDto.put("formid", pDto.getAsString("detail_id"));
        saveCheckStandardInfo(pDto);
        if (pDto.containsKey("isFlowUpdate")) {
            activitisManage.doProcessAdvance(pDto);
        }
    }

    @Override
    public void deleteCheckRecordInfo(Dto pDto) throws Exception {
        hospitalDao.deleteCheckRecordInfo(pDto);
        pDto.put("operater", pDto.getAsString("userid"));
        pDto.put("operate_type", "OT00102");
        hospitalDao.saveCheckHis(pDto);
    }

    @Override
    public void doVerifyCheckRecordInfo(Dto pDto) throws Exception {
        pDto.put("record_id", pDto.getAsLong("businessKey"));
        List<HistoricProcessInstance> historicVariableInstanceList = activitisManage.getHistoryService().createHistoricProcessInstanceQuery().processInstanceBusinessKey(pDto.getAsString("businessKey")).list();
        if (G4Utils.isEmpty(historicVariableInstanceList) && historicVariableInstanceList.size() != 1) {
            pDto.put("error", "流程不存在");
            return;
        }
        String startuser = (String) activitisManage.getHistoryService().createHistoricVariableInstanceQuery().processInstanceId(historicVariableInstanceList.get(0).getId()).variableName("applyUserId").list().get(0).getValue();
        hospitalDao.doVerifyCheckRecordInfo(pDto);
        pDto.put("variables", new BaseDto("verify_statu", pDto.getAsString("verify_statu")));
        pDto.put("nextUserAccount", startuser);
        activitisManage.doProcessAdvance(pDto);
    }

    @Override
    public void doBatchVerifyCheckRecordInfo(Dto pDto) throws Exception {
      List<Dto> records= listjson2list.Listjson2List(pDto.getAsString("records"));
        for(int i=0;i<records.size();i++)
        {
            Dto temp=records.get(i);
            temp.put("isjoin",false);
            temp.put("verify_statu", pDto.getAsString("verify_statu"));
            List<Dto> list =new ArrayList<Dto>();
            if(temp.getAsString("activityId").equals("start") )
            {
                list= activitisManage.findNextTaskByProcKey(temp.getAsString("processKey"), temp.getAsString("activityId"));
            }else {
                list = activitisManage.findNextTask(temp.getAsString("processId"), temp.getAsString("taskId"));
            }
            Dto tempDto=list.get(0);
            temp.put("nextTaskId", tempDto.getAsString("id"));
            temp.put("nextTaskName", tempDto.getAsString("name"));
            temp.put("nextFlow",  "to" + tempDto.getAsString("id"));
            doVerifyCheckRecordInfo(temp);
        }
    }
    @Override
    public Dto CourseTreeManage(Dto dto) {
        return hospitalDao.CourseTreeManage(dto);

    }

    @Override
    public List<Dto> queryDeptInfoForList(Dto pDto) {
        String deptid = pDto.getAsString("deptid");
        if (deptid.length() < 6) {
            return null;
        } else {
            pDto.put("deptid", deptid.length() < 6 ? deptid : deptid.substring(0, 6));
        }
        return hospitalDao.queryDeptInfoForList(pDto);
    }

    @Override
    public List<Dto> queryCourseInfoForList(Dto pDto) {
        String deptid = pDto.getAsString("deptid");
        if (deptid.length() < 6) {
            return null;
        } else {
            pDto.put("deptid", deptid.length() < 6 ? deptid : deptid.substring(0, 6));
        }
        List<Dto> coursinfos = new ArrayList<Dto>();
        List<Dto> hospital = getHospitalInfoByDept(pDto);
        if (G4Utils.isNotEmpty(hospital) && hospital.size() == 1) {
            coursinfos = hospitalDao.queryCourseInfoForList(hospital.get(0));
        }
        return coursinfos;
    }

    @Override
    public List<Dto> getHospitalInfoByDept(Dto pDto) {
        return hospitalDao.getHospitalInfoByDept(pDto);
    }


    @Override
    public void saveCourseInfo(Dto dto) throws Exception {
        //通过参数查询所在的医院id
//        List<HospitalBaseInfo> hospitalBaseInfos = hospitalDao.listAllByHql("from HospitalBaseInfo h where h.deptid=\'" + dto.getAsString("deptid") + "\'");
//        if (G4Utils.isNotEmpty(hospitalBaseInfos) && hospitalBaseInfos.size() == 1) {
//            dto.put("hospital_id", hospitalBaseInfos.get(0).getHospital_id());
//        } else {
//            dto.put("error", "当前登陆用户没有权限");
//            return;
//        }
        List<DeptCourseInfo> deptCourseInfos = hospitalDao.listAllByHql("from DeptCourseInfo h where h.course_name=\'" +
                dto.getAsString("course_name") +/* "\' and h.hospital_id=\'" + dto.getAsString("hospital_id") +*/ "\' and h.delete_status=0");
        if (G4Utils.isNotEmpty(deptCourseInfos)) {
            dto.put("error", "科目已存在");
            return;
        }
        //保存医院信息
        hospitalDao.saveCourseInfo(dto);

    }

    @Override
    public void updateCourseInfo(Dto dto) throws Exception {
        hospitalDao.updateCourseInfo(dto);
    }

    @Override
    public void deleteCourseInfo(Dto dto) {
        hospitalDao.deleteCourseInfo(dto);
    }

    @Override
    public void deleteDeptCourseInfo(Dto pDto) {
        hospitalDao.deleteDeptCourseInfo(pDto);
    }

    @Override
    public void saveDeptCourseInfo(Dto pDto) throws Exception {
        List<Dto> choiceslist = listjson2list.Listjson2List(pDto.getAsString("choices"));
        if (G4Utils.isNotEmpty(choiceslist)) {
            for (int i = 0; i < choiceslist.size(); i++) {
                pDto.put("course_id", choiceslist.get(i).getAsString("course_id"));
                hospitalDao.saveDeptCourseInfo(pDto);
            }
        }
    }

    @Override
    public List<Dto> queryCheckStandardInfo(Dto pDto) throws SQLException {
        return hospitalDao.queryCheckStandardInfo(pDto);
    }

    /**
     * 保存检查标准记录
     *
     * @param pDto
     * @return
     */
    public void saveCheckStandardInfo(Dto pDto) throws Exception {
        //含正确性或知识考核才保存标准表的数据
        if ("COM00101".equals(pDto.getAsString("validity"))) {
            String formid = pDto.getAsString("formid");
            String check_type = pDto.getAsString("check_type");
            List<Dto> CS001 = pDto.getAsList("CS001");
            List<Dto> CS002 = pDto.getAsList("CS002");
            for (int i = 0; i < 3; i++) {
                Dto temp = "CT00101".equals(check_type) ? CS001.get(i) : CS002.get(i);
                String standard = pDto.getAsString("standard" + (i + 1));
                temp.put("formid", formid);
                temp.put("standard_name", temp.getAsString("codedesc"));
                temp.put("standard_code", temp.getAsString("code"));
                temp.put("check_result", standard);
                hospitalDao.saveCheckStandardInfo(temp);
            }
        }
    }

    /**
     * 更新检查标准记录
     *
     * @param pDto
     * @return
     */
    public void updateCheckStandardInfo(Dto pDto) throws Exception {
        hospitalDao.deleteCheckStandardInfo(pDto);
        saveCheckStandardInfo(pDto);
    }

    public void getCheckRecordStatu(Dto dto) {
        String result = "COM00101";
        if (!"CT00101".equals(dto.getAsString("check_type"))) {
            result = "";
        } else {
            if ("COM00102".equals(dto.getAsString("validity"))) {
                result = "";
            } else {
                for (int i = 0; i < 3; i++) {
                    String standard = dto.getAsString("standard" + (i + 1));
                    if (G4Utils.isEmpty(standard)) {
                        dto.put("error", "正确性或知识考核数据不全，请确认");
                        return;
                    }
                    if ("COM00102".equals(standard)) {
                        result = "COM00102";
                        break;
                    }
                }
            }


        }
        dto.put("completed", result);
    }


    @Override
    public String queryHistoryCheckDetailInfo(Dto pDto, UserInfoVo user) throws SQLException {
        Dto roleDto = new BaseDto("rolename", "医院管理员");
        roleDto.put("userid", user.getUserid());
        List<Dto> role = roleService.queryUserRole(roleDto);
        String deptid = user.getDeptid();
        if (G4Utils.isEmpty(pDto.getAsString("deptid"))) {
            pDto.put("rootdeptid", deptid.length() < 6 ? deptid : deptid.substring(0, 6));
        }
        //如果是医院管理员就查询全部。否则就查询自己录入的
        if (G4Utils.isEmpty(role)) {
            if (G4Utils.isEmpty(pDto.getAsString("userid"))) {
                pDto.put("userid", user.getUserid());
            }
            pDto.put("operater", user.getUserid());
        }
        List<Dto> list = hospitalDao.queryHistoryCheckDetailInfo(pDto);
        if (G4Utils.isNotEmpty(list)) {
            for (int j = 0; j < list.size(); j++) {
                pDto.put("formid", list.get(j).getAsString("detail_id"));
                List<Dto> stands = hospitalDao.queryCheckStandardInfo(pDto);
                for (int i = 0; i < stands.size(); i++) {
                    Dto dto = stands.get(i);
                    list.get(j).put("standard" + (i + 1), dto.getAsString("check_result"));
                }
            }
        }
        String jsonString = "";
        Integer count = 0;
        if (pDto.containsKey("limit")) {
            count = hospitalDao.queryHistoryCheckDetailInfoCount(pDto);
        }
        jsonString = pDto.containsKey("limit") ? JsonHelper.encodeList2PageJson(list, count, G4Constants.FORMAT_DateTime) : JsonHelper.encodeObject2Json(list, G4Constants.FORMAT_DateTime);
        return jsonString;
    }

    /**
     * 查询历史修改记录
     *
     * @param pDto
     * @return
     */
    public String queryHistoryCheckInfo(Dto pDto) throws SQLException {
        List<Dto> list = hospitalDao.queryHistoryCheckInfo(pDto);
        Integer count = hospitalDao.queryHistoryCheckInfoCount(pDto);
        String jsonString = pDto.containsKey("limit") ? JsonHelper.encodeList2PageJson(list, count, "yyyy-MM-dd HH:mm:ss") : JsonHelper.encodeObject2Json(list, G4Constants.FORMAT_DateTime);
        return jsonString;

    }

    @Override
    public List<Dto> querySimbleCheckInfo(Dto pDto) throws SQLException {
        return hospitalDao.queryCheckInfo(pDto);
    }

    @Override
    public void getReport_HIS_DataForExcel(HttpServletRequest request, HttpServletResponse response, Dto pDto) throws IOException {
        pDto.put("IS_HIS", true);
        getReportDataForExcel(request, response, pDto);
    }

    @Override
    public List GetChartData(Dto pDto) {
        return hospitalDao.GetChartData(pDto);
    }

    @Override
    public void getGridData2Excel(HttpServletRequest request, HttpServletResponse response, Dto pDto) throws IOException {
        ExcelExporter excelExporter = new ExcelExporter();
        excelExporter.setTemplatePath("/report/excel/checkReport/ForQueryReport.xls");
        excelExporter.setFilename("手卫生报表数据.xls");
        Dto reslut_sws = exportReportGridData(pDto);
        List<ExcelData> sheetDatas = new ArrayList<ExcelData>();
        sheetDatas.add(new ExcelData((Dto) reslut_sws.get("parametersDto"), reslut_sws.getAsList("fieldsList")));
        excelExporter.exportSheets(request, response, sheetDatas);
    }

    @Override
    public void getQueryGridData2Excel(HttpServletRequest request, HttpServletResponse response, Dto pDto) throws IOException, SQLException {
        ExcelExporter excelExporter = new ExcelExporter();
        String checkType = pDto.getAsString("check_type");
        String templatepath = "";
        if ("CT00101".equals(checkType)) {
            templatepath = "zqxForQueryReport";
            excelExporter.setFilename("手卫生正确性数据.xls");
        } else if ("CT00102".equals(checkType)) {
            templatepath = "zskhForQueryReport";
            excelExporter.setFilename("手卫生知识考核数据.xls");
        } else if ("CT00103".equals(checkType)) {
            templatepath = "ycxForQueryReport";
            excelExporter.setFilename("手卫生依从性数据.xls");
        }
        excelExporter.setTemplatePath("/report/excel/checkReport/" + templatepath + ".xls");
        Dto reslut_sws = exportQueryGridData(pDto);
        List<ExcelData> sheetDatas = new ArrayList<ExcelData>();
        sheetDatas.add(new ExcelData((Dto) reslut_sws.get("parametersDto"), reslut_sws.getAsList("fieldsList")));
        excelExporter.exportSheets(request, response, sheetDatas);
    }

    @Override
    public List<Dto> GetCheckReportData(Dto pDto) {
        return hospitalDao.GetCheckReportData(pDto);
    }

    @Override
    public List<Dto> getQuanCheckYuanReportData(Dto pDto) {
        return hospitalDao.getQuanCheckYuanReportData(pDto);
    }

    @Override
    public void getReportDataForExcel(HttpServletRequest request, HttpServletResponse response, Dto pDto) throws IOException {
        String[] ReportType = (String[]) pDto.get("ReportType");
        String MergeFile = pDto.getAsString("MergeFile");
        boolean marginfile = G4Utils.isNotEmpty(MergeFile);
        getconditionSql(pDto);
        if (G4Utils.isNotEmpty(ReportType)) {
            List<Dto> codeList = WebUtils.getCodeListByField("RT001", request);
            ExcelExporter excelExporter = new ExcelExporter();
            String start_time = pDto.getAsString("start_time");
            String end_time = pDto.getAsString("end_time");
            String filename = "手卫生汇总";
            Dto reslut = new BaseDto();
            List<ExcelData> sheetDatas = Arrays.asList(new ExcelData[]{
                    new ExcelData(new BaseDto("reportTitle", "手卫生正确性调查表"), new ArrayList()),
                    new ExcelData(new BaseDto("reportTitle", "知识考核调查表"), new ArrayList()),
                    new ExcelData(new BaseDto("reportTitle", "国内手卫生依从性汇总表"), new ArrayList()),
                    new ExcelData(new BaseDto("reportTitle", "国内正确性汇总表"), new ArrayList()),
                    new ExcelData(new BaseDto("reportTitle", "国内知识考核汇总表"), new ArrayList()),
                    new ExcelData(new BaseDto("reportTitle", "手卫生依从性汇总"), new ArrayList())
            });
            excelExporter.setTemplatePath("/report/excel/checkReport" + (pDto.containsKey("GroupByDeptId")  ? "/GroupByDept" : "") + "/gn_ycxhzReport.xls");
            for (int i = 0; i < ReportType.length; i++) {
                Integer ReportTypeIndex = Integer.valueOf(ReportType[i]);
                if (!marginfile) {
                    excelExporter.setTemplatePath("/report/excel/checkReport/" + (pDto.containsKey("GroupByDeptId") ? "GroupByDept/" : "") + reportmodel[Integer.valueOf(ReportType[i])] + ".xls");
                    sheetDatas = new ArrayList<ExcelData>();
                }
                switch (ReportTypeIndex) {
                    //手卫生调查表
                    case 1:
                        Dto reslut_zskh = new BaseDto();
                        Dto reslut_sws = new BaseDto();
                        pDto.put("check_type", "CT00102");
                        reslut_zskh = exportSWS_DCB(pDto);
                        pDto.put("check_type", "CT00101");
                        reslut_sws = exportSWS_DCB(pDto);
                        if (marginfile) {
                            sheetDatas.set(0, new ExcelData((Dto) reslut_sws.get("parametersDto"), reslut_sws.getAsList("fieldsList")));
                            sheetDatas.set(1, new ExcelData((Dto) reslut_zskh.get("parametersDto"), reslut_zskh.getAsList("fieldsList")));
                        } else {
                            sheetDatas.add(new ExcelData((Dto) reslut_sws.get("parametersDto"), reslut_sws.getAsList("fieldsList")));
                            sheetDatas.add(new ExcelData((Dto) reslut_zskh.get("parametersDto"), reslut_zskh.getAsList("fieldsList")));
                        }
                        break;
                    //依从性汇总表
                    case 2:
                        reslut = exportGN_YCXHZ(pDto);
                        if (marginfile) {
                            sheetDatas.set(2, new ExcelData((Dto) reslut.get("parametersDto"), reslut.getAsList("fieldsList")));
                        } else {
                            sheetDatas.add(new ExcelData((Dto) reslut.get("parametersDto"), reslut.getAsList("fieldsList")));
                        }

                        break;
                    //正确性汇总表
                    case 3:
                        reslut = exportGN_ZQXHZ(pDto, "手卫生正确性考核汇总表", "HospitalManage.getGNZQX" + (pDto.containsKey("IS_HIS") ? "_HIS_" : "") + "DataForExcel");
                        if (marginfile) {
                            sheetDatas.set(3, new ExcelData((Dto) reslut.get("parametersDto"), reslut.getAsList("fieldsList")));
                        } else {
                            sheetDatas.add(new ExcelData((Dto) reslut.get("parametersDto"), reslut.getAsList("fieldsList")));
                        }

                        break;
                    //知识考核汇总表
                    case 4:
                        reslut = exportGN_ZQXHZ(pDto, "国内知识考核汇总表", "HospitalManage.getGNZSKHHZ" + (pDto.containsKey("IS_HIS") ? "_HIS_" : "") + "DataForExcel");
                        if (marginfile) {
                            sheetDatas.set(4, new ExcelData((Dto) reslut.get("parametersDto"), reslut.getAsList("fieldsList")));
                        } else {
                            sheetDatas.add(new ExcelData((Dto) reslut.get("parametersDto"), reslut.getAsList("fieldsList")));
                        }


                        break;
                    //依从性调查表汇总
                    case 5:
                        reslut = exportSWSYCXHZ(pDto);
                        if (marginfile) {
                            sheetDatas.set(5, new ExcelData((Dto) reslut.get("parametersDto"), reslut.getAsList("fieldsList")));
                        } else {
                            sheetDatas.add(new ExcelData((Dto) reslut.get("parametersDto"), reslut.getAsList("fieldsList")));
                        }

                        break;
                }
                filename = marginfile ? filename : codeList.get(Integer.valueOf(ReportType[i]) - 1).getAsString("codedesc");
            }
            excelExporter.setFilename(start_time + (G4Utils.isNotEmpty(start_time) ? "-" : "") + end_time + filename + ".xls");
            excelExporter.exportSheets(request, response, sheetDatas, pDto);
        } else {
            pDto.put("error", "请选择要导出的报表类型");
        }

//
//

    }

    /**
     * 获取国内依从性数据
     *
     * @param pDto
     * @return
     */
    public Dto exportGN_YCXHZ(Dto pDto) {
        Dto result = new BaseDto();
        Dto parametersDto = new BaseDto();
        parametersDto.put("reportTitle", "手卫生依从性考核汇总表");
        List<Dto> fieldsList = hospitalDao.queryForList("HospitalManage.getGNYCX" + (pDto.containsKey("IS_HIS") ? "_HIS_" : "") + "DataForExcel", pDto);
        Integer ys_all_count = 0, hs_all_count = 0, sh_all_count = 0, sy_all_count = 0, jx_all_count = 0, yj_all_count = 0, gr_all_count = 0, wy_all_count = 0;
        Integer ys_w_all_count = 0, hs_w_all_count = 0, sh_w_all_count = 0, sy_w_all_count = 0, jx_w_all_count = 0, yj_w_all_count = 0, gr_w_all_count = 0, wy_w_all_count = 0;
        Integer ys_c_all_count = 0, hs_c_all_count = 0, sh_c_all_count = 0, sy_c_all_count = 0, jx_c_all_count = 0, yj_c_all_count = 0, gr_c_all_count = 0, wy_c_all_count = 0;
        Integer ys_x_all_count = 0, hs_x_all_count = 0, sh_x_all_count = 0, sy_x_all_count = 0, jx_x_all_count = 0, yj_x_all_count = 0, gr_x_all_count = 0, wy_x_all_count = 0;
        Integer all_doing_count = 0, all_check_count = 0;
        if (G4Utils.isNotEmpty(fieldsList)) {
            for (int i = 0; i < fieldsList.size(); i++) {
                Dto temp = fieldsList.get(i);
                ys_all_count += temp.getAsInteger("ys_count");
                hs_all_count += temp.getAsInteger("hs_count");
                sh_all_count += temp.getAsInteger("sh_count");
                sy_all_count += temp.getAsInteger("sy_count");
                jx_all_count += temp.getAsInteger("jx_count");
                yj_all_count += temp.getAsInteger("yj_count");
                gr_all_count += temp.getAsInteger("gr_count");
                wy_all_count += temp.getAsInteger("wy_count");
                ys_w_all_count += temp.getAsInteger("ys_w_count");
                hs_w_all_count += temp.getAsInteger("hs_w_count");
                sh_w_all_count += temp.getAsInteger("sh_w_count");
                sy_w_all_count += temp.getAsInteger("sy_w_count");
                jx_w_all_count += temp.getAsInteger("jx_w_count");
                yj_w_all_count += temp.getAsInteger("yj_w_count");
                gr_w_all_count += temp.getAsInteger("gr_w_count");
                wy_w_all_count += temp.getAsInteger("wy_w_count");
                ys_c_all_count += temp.getAsInteger("ys_c_count");
                hs_c_all_count += temp.getAsInteger("hs_c_count");
                sh_c_all_count += temp.getAsInteger("sh_c_count");
                sy_c_all_count += temp.getAsInteger("sy_c_count");
                jx_c_all_count += temp.getAsInteger("jx_c_count");
                yj_c_all_count += temp.getAsInteger("yj_c_count");
                gr_c_all_count += temp.getAsInteger("gr_c_count");
                wy_c_all_count += temp.getAsInteger("wy_c_count");
                ys_x_all_count += temp.getAsInteger("ys_x_count");
                hs_x_all_count += temp.getAsInteger("hs_x_count");
                sh_x_all_count += temp.getAsInteger("sh_x_count");
                sy_x_all_count += temp.getAsInteger("sy_x_count");
                jx_x_all_count += temp.getAsInteger("jx_x_count");
                yj_x_all_count += temp.getAsInteger("yj_x_count");
                gr_x_all_count += temp.getAsInteger("gr_x_count");
                wy_x_all_count += temp.getAsInteger("wy_x_count");
            }
        }
        all_check_count = ys_all_count + hs_all_count + sh_all_count + sy_all_count + jx_all_count + yj_all_count + gr_all_count + wy_all_count;
        all_doing_count = all_check_count - ys_w_all_count - hs_w_all_count - sh_w_all_count - sy_w_all_count - jx_w_all_count - yj_w_all_count - gr_w_all_count - wy_w_all_count;
        parametersDto.put("ys_all_count", ys_all_count);
        parametersDto.put("hs_all_count", hs_all_count);
        parametersDto.put("sh_all_count", sh_all_count);
        parametersDto.put("sy_all_count", sy_all_count);
        parametersDto.put("jx_all_count", jx_all_count);
        parametersDto.put("yj_all_count", yj_all_count);
        parametersDto.put("gr_all_count", gr_all_count);
        parametersDto.put("wy_all_count", wy_all_count);
        parametersDto.put("ys_w_all_count", ys_w_all_count);
        parametersDto.put("ys_c_all_count", ys_c_all_count);
        parametersDto.put("ys_x_all_count", ys_x_all_count);
        parametersDto.put("hs_w_all_count", hs_w_all_count);
        parametersDto.put("hs_c_all_count", hs_c_all_count);
        parametersDto.put("hs_x_all_count", hs_x_all_count);
        parametersDto.put("sh_w_all_count", sh_w_all_count);
        parametersDto.put("sh_c_all_count", sh_c_all_count);
        parametersDto.put("sh_x_all_count", sh_x_all_count);
        parametersDto.put("sy_w_all_count", sy_w_all_count);
        parametersDto.put("sy_c_all_count", sy_c_all_count);
        parametersDto.put("sy_x_all_count", sy_x_all_count);
        parametersDto.put("jx_w_all_count", jx_w_all_count);
        parametersDto.put("jx_c_all_count", jx_c_all_count);
        parametersDto.put("jx_x_all_count", jx_x_all_count);
        parametersDto.put("yj_w_all_count", yj_w_all_count);
        parametersDto.put("yj_c_all_count", yj_c_all_count);
        parametersDto.put("yj_x_all_count", yj_x_all_count);
        parametersDto.put("gr_w_all_count", gr_w_all_count);
        parametersDto.put("gr_c_all_count", gr_c_all_count);
        parametersDto.put("gr_x_all_count", gr_x_all_count);
        parametersDto.put("wy_w_all_count", wy_w_all_count);
        parametersDto.put("wy_c_all_count", wy_c_all_count);
        parametersDto.put("wy_x_all_count", wy_x_all_count);
        parametersDto.put("all_doing_count", all_doing_count);
        parametersDto.put("all_check_count", all_check_count);
        parametersDto.put("all_ycl", diy_chufa(all_doing_count, all_check_count));
        result.put("fieldsList", fieldsList);
        result.put("parametersDto", parametersDto);
        return result;
    }

    /**
     * 手卫生调查表
     *
     * @param pDto
     * @return
     */
    public Dto exportSWS_DCB(Dto pDto) {
        Dto result = new BaseDto();
        Dto parametersDto = new BaseDto();
        parametersDto.put("reportTitle", "手卫生调查表");
        List<Dto> fieldsList = hospitalDao.queryForList("HospitalManage.getSWSDC" + (pDto.containsKey("IS_HIS") ? "_HIS" : "") + "_DataForExcel", pDto);
        if (G4Utils.isNotEmpty(fieldsList)) {
            Integer allcount = 0, zq_allcount = 0;
            for (int i = 0; i < fieldsList.size(); i++) {
                Dto temp = fieldsList.get(i);
                String check_type = temp.getAsString("check_type");
                String[] standard_value = temp.getAsString("standard_value").split(",");
                if ("CT00102".equals(check_type) || "CT00101".equals(check_type)) {
                    for (int j = 0; j < standard_value.length; j++) {
                        String[] standard_values = standard_value[j].split(":");
                        if (standard_values.length > 1) {
                            zq_allcount = zq_allcount + (standard_values[1].indexOf("是") > 0 ? 1 : 0);
                            allcount = allcount + (standard_values[1].indexOf("无") < 0 ? 1 : 0);
                            temp.put("question" + (j + 1), standard_values[0]);
                            temp.put("answer" + (j + 1), standard_values[1]);
                        }
                    }
                }
            }
            parametersDto.put("zql", diy_chufa(zq_allcount, allcount));
        }
        result.put("fieldsList", fieldsList);
        result.put("parametersDto", parametersDto);
        return result;
    }

    /**
     * 获取国内正确性数据
     *
     * @param pDto
     * @return
     */
    public Dto exportGN_ZQXHZ(Dto pDto, String title, String Url) {
        Dto result = new BaseDto();
        Dto parametersDto = new BaseDto();
        parametersDto.put("reportTitle", title);
        List<Dto> fieldsList = hospitalDao.queryForList(Url, pDto);
        Integer ys_all_count = 0, hs_all_count = 0, sh_all_count = 0, sy_all_count = 0, jx_all_count = 0, yj_all_count = 0, gr_all_count = 0, wy_all_count = 0;
        Integer ys_all_zqlcount = 0, hs_all_zqlcount = 0, sh_all_zqlcount = 0, sy_all_zqlcount = 0, jx_all_zqlcount = 0, yj_all_zqlcount = 0, gr_all_zqlcount = 0, wy_all_zqlcount = 0;
        Integer ys_zq_all_count = 0, hs_zq_all_count = 0, sh_zq_all_count = 0, sy_zq_all_count = 0, jx_zq_all_count = 0, yj_zq_all_count = 0, gr_zq_all_count = 0, wy_zq_all_count = 0;
        Integer ys_bzq_all_count = 0, hs_bzq_all_count = 0, sh_bzq_all_count = 0, sy_bzq_all_count = 0, jx_bzq_all_count = 0, yj_bzq_all_count = 0, gr_bzq_all_count = 0, wy_bzq_all_count = 0;
        Integer all_zqlcount = 0, all_count = 0, all_zq_count = 0;
        if (G4Utils.isNotEmpty(fieldsList)) {
            for (int i = 0; i < fieldsList.size(); i++) {
                Dto temp = fieldsList.get(i);
                ys_all_count += temp.getAsInteger("ys_count");
                hs_all_count += temp.getAsInteger("hs_count");
                sh_all_count += temp.getAsInteger("sh_count");
                sy_all_count += temp.getAsInteger("sy_count");
                jx_all_count += temp.getAsInteger("jx_count");
                yj_all_count += temp.getAsInteger("yj_count");
                gr_all_count += temp.getAsInteger("gr_count");
                wy_all_count += temp.getAsInteger("wy_count");

                ys_all_zqlcount += temp.getAsInteger("ys_count");
                hs_all_zqlcount += temp.getAsInteger("hs_count");
                sh_all_zqlcount += temp.getAsInteger("sh_count");
                sy_all_zqlcount += temp.getAsInteger("sy_count");
                jx_all_zqlcount += temp.getAsInteger("jx_count");
                yj_all_zqlcount += temp.getAsInteger("yj_count");
                gr_all_zqlcount += temp.getAsInteger("gr_count");
                wy_all_zqlcount += temp.getAsInteger("wy_count");

                ys_zq_all_count += temp.getAsInteger("ys_zq_count");
                hs_zq_all_count += temp.getAsInteger("hs_zq_count");
                sh_zq_all_count += temp.getAsInteger("sh_zq_count");
                sy_zq_all_count += temp.getAsInteger("sy_zq_count");
                jx_zq_all_count += temp.getAsInteger("jx_zq_count");
                yj_zq_all_count += temp.getAsInteger("yj_zq_count");
                gr_zq_all_count += temp.getAsInteger("gr_zq_count");
                wy_zq_all_count += temp.getAsInteger("wy_zq_count");
                ys_bzq_all_count += temp.getAsInteger("ys_bzq_count");
                hs_bzq_all_count += temp.getAsInteger("hs_bzq_count");
                sh_bzq_all_count += temp.getAsInteger("sh_bzq_count");
                sy_bzq_all_count += temp.getAsInteger("sy_bzq_count");
                jx_bzq_all_count += temp.getAsInteger("jx_bzq_count");
                yj_bzq_all_count += temp.getAsInteger("yj_bzq_count");
                gr_bzq_all_count += temp.getAsInteger("gr_bzq_count");
                wy_bzq_all_count += temp.getAsInteger("wy_bzq_count");
                all_zq_count += temp.getAsInteger("zq_count");
                all_count += temp.getAsInteger("check_count");
            }
            all_zqlcount = ys_all_zqlcount + hs_all_zqlcount + sh_all_zqlcount + sy_all_zqlcount + jx_all_zqlcount + yj_all_zqlcount + gr_all_zqlcount + wy_all_zqlcount;
        }
        parametersDto.put("ys_all_count", ys_all_count);
        parametersDto.put("hs_all_count", hs_all_count);
        parametersDto.put("sh_all_count", sh_all_count);
        parametersDto.put("sy_all_count", sy_all_count);
        parametersDto.put("jx_all_count", jx_all_count);
        parametersDto.put("yj_all_count", yj_all_count);
        parametersDto.put("gr_all_count", gr_all_count);
        parametersDto.put("wy_all_count", wy_all_count);
        parametersDto.put("ys_all_zqlcount", ys_all_zqlcount);
        parametersDto.put("hs_all_zqlcount", hs_all_zqlcount);
        parametersDto.put("sh_all_zqlcount", sh_all_zqlcount);
        parametersDto.put("sy_all_zqlcount", sy_all_zqlcount);
        parametersDto.put("jx_all_zqlcount", jx_all_zqlcount);
        parametersDto.put("yj_all_zqlcount", yj_all_zqlcount);
        parametersDto.put("gr_all_zqlcount", gr_all_zqlcount);
        parametersDto.put("wy_all_zqlcount", wy_all_zqlcount);
        parametersDto.put("ys_zq_all_count", ys_zq_all_count);
        parametersDto.put("ys_bzq_all_count", ys_bzq_all_count);
        parametersDto.put("ys_all_zql", diy_chufa(ys_zq_all_count, ys_all_zqlcount));
        parametersDto.put("hs_zq_all_count", hs_zq_all_count);
        parametersDto.put("hs_bzq_all_count", hs_bzq_all_count);
        parametersDto.put("hs_all_zql", diy_chufa(hs_zq_all_count, hs_all_zqlcount));
        parametersDto.put("sh_zq_all_count", sh_zq_all_count);
        parametersDto.put("sh_bzq_all_count", sh_bzq_all_count);
        parametersDto.put("sh_all_zql", diy_chufa(sh_zq_all_count, sh_all_zqlcount));
        parametersDto.put("sy_zq_all_count", sy_zq_all_count);
        parametersDto.put("sy_bzq_all_count", sy_bzq_all_count);
        parametersDto.put("sy_all_zql", diy_chufa(sy_zq_all_count, sy_all_zqlcount));
        parametersDto.put("jx_zq_all_count", jx_zq_all_count);
        parametersDto.put("jx_bzq_all_count", jx_bzq_all_count);
        parametersDto.put("jx_all_zql", diy_chufa(jx_zq_all_count, jx_all_zqlcount));
        parametersDto.put("yj_zq_all_count", yj_zq_all_count);
        parametersDto.put("yj_bzq_all_count", yj_bzq_all_count);
        parametersDto.put("yj_all_zql", diy_chufa(yj_zq_all_count, yj_all_zqlcount));
        parametersDto.put("gr_zq_all_count", gr_zq_all_count);
        parametersDto.put("gr_bzq_all_count", gr_bzq_all_count);
        parametersDto.put("gr_all_zql", diy_chufa(gr_zq_all_count, gr_all_zqlcount));
        parametersDto.put("wy_zq_all_count", wy_zq_all_count);
        parametersDto.put("wy_bzq_all_count", wy_bzq_all_count);
        parametersDto.put("wy_all_zql", diy_chufa(wy_zq_all_count, wy_all_zqlcount));
        parametersDto.put("all_count", all_count);
        parametersDto.put("all_zq_count", all_zq_count);
        parametersDto.put("all_zql", diy_chufa(all_zq_count, all_zqlcount));
        result.put("fieldsList", fieldsList);
        result.put("parametersDto", parametersDto);
        return result;
    }

    /**
     * 获取手卫生依从性数据
     *
     * @param pDto
     * @return
     */
    public Dto exportSWSYCXHZ(Dto pDto) {
        Dto result = new BaseDto();
        Dto parametersDto = new BaseDto();
        parametersDto.put("reportTitle", "手卫生依从性调查表合计");
        List<Dto> fieldsList = hospitalDao.queryForList("HospitalManage.getSWSYCXHZ" + (pDto.containsKey("IS_HIS") ? "_HIS_" : "") + "DataForExcel", pDto);
        Integer ys_all_wc_count = 0,
                ys_all_need_count = 0,
                hs_all_wc_count = 0,
                hs_all_need_count = 0,
                ssj_all_wc_count = 0,
                ssj_all_need_count = 0,
                yg_all_wc_count = 0,
                yg_all_need_count = 0,
                wy_all_wc_count = 0,
                wy_all_need_count = 0,
                all_wc_count = 0,
                all_need_count = 0;
        if (G4Utils.isNotEmpty(fieldsList)) {
            for (int i = 0; i < fieldsList.size(); i++) {
                Dto temp = fieldsList.get(i);
                ys_all_wc_count += temp.getAsInteger("ys_wc_count");
                ys_all_need_count += temp.getAsInteger("ys_need_count");
                hs_all_wc_count += temp.getAsInteger("hs_wc_count");
                hs_all_need_count += temp.getAsInteger("hs_need_count");
                ssj_all_wc_count += temp.getAsInteger("ssj_wc_count");
                ssj_all_need_count += temp.getAsInteger("ssj_need_count");
                yg_all_wc_count += temp.getAsInteger("yg_wc_count");
                yg_all_need_count += temp.getAsInteger("yg_need_count");
                wy_all_wc_count += temp.getAsInteger("wy_wc_count");
                wy_all_need_count += temp.getAsInteger("wy_need_count");
            }
        }
        all_wc_count = ys_all_wc_count + hs_all_wc_count + ssj_all_wc_count + yg_all_wc_count + wy_all_wc_count;
        all_need_count = ys_all_need_count + hs_all_need_count + ssj_all_need_count + yg_all_need_count + wy_all_need_count;

        parametersDto.put("ys_all_wc_count", ys_all_wc_count);
        parametersDto.put("hs_all_wc_count", hs_all_wc_count);
        parametersDto.put("ssj_all_wc_count", ssj_all_wc_count);
        parametersDto.put("yg_all_wc_count", yg_all_wc_count);
        parametersDto.put("wy_all_wc_count", wy_all_wc_count);
        parametersDto.put("ys_all_need_count", ys_all_need_count);
        parametersDto.put("hs_all_need_count", hs_all_need_count);
        parametersDto.put("ssj_all_need_count", ssj_all_need_count);
        parametersDto.put("yg_all_need_count", yg_all_need_count);
        parametersDto.put("wy_all_need_count", wy_all_need_count);
        parametersDto.put("all_wc_count", all_wc_count);
        parametersDto.put("all_need_count", all_need_count);

        parametersDto.put("ys_all_ycl", diy_chufa(ys_all_wc_count, ys_all_need_count));
        parametersDto.put("hs_all_ycl", diy_chufa(hs_all_wc_count, hs_all_need_count));
        parametersDto.put("ssj_all_ycl", diy_chufa(ssj_all_wc_count, ssj_all_need_count));
        parametersDto.put("yg_all_ycl", diy_chufa(yg_all_wc_count, yg_all_need_count));
        parametersDto.put("wy_all_ycl", diy_chufa(wy_all_wc_count, wy_all_need_count));
        parametersDto.put("all_ycl", diy_chufa(all_wc_count, all_need_count));
        result.put("fieldsList", fieldsList);
        result.put("parametersDto", parametersDto);
        return result;
    }

    /**
     * 获取报表列表查询的数据
     *
     * @param pDto
     * @return
     */
    public Dto exportReportGridData(Dto pDto) {
        Dto result = new BaseDto();
        Dto parametersDto = new BaseDto();
        List<Dto> fieldsList = hospitalDao.queryForList("HospitalManage.GetCheckReportData", pDto);
        result.put("fieldsList", fieldsList);
        result.put("parametersDto", parametersDto);
        return result;
    }

    /**
     * 获取检查记录列表查询的数据
     *
     * @param pDto
     * @return
     */
    public Dto exportQueryGridData(Dto pDto) throws SQLException {
        Dto result = new BaseDto();
        Dto parametersDto = new BaseDto();
        List<Dto> fieldsList = hospitalDao.queryForList("HospitalManage.queryCheckInfo", pDto);
        if (G4Utils.isNotEmpty(fieldsList) && !"CT00103".equals(pDto.getAsString("check_type"))) {
            for (int j = 0; j < fieldsList.size(); j++) {
                pDto.put("formid", fieldsList.get(j).getAsString("record_id"));
                List<Dto> stands = hospitalDao.queryCheckStandardInfo(pDto);
                for (int i = 0; i < stands.size(); i++) {
                    Dto dto = stands.get(i);
                    fieldsList.get(j).put("standard" + (i + 1), dto.getAsString("check_result"));
                    fieldsList.get(j).put("standard" + (i + 1) + "_name", dto.getAsString("codedesc"));
                }
            }
        }
        result.put("fieldsList", fieldsList);
        result.put("parametersDto", parametersDto);
        return result;
    }

    /**
     * 自定义除法
     *
     * @param fenzi
     * @param fenmu
     * @return
     */
    public String diy_chufa(Integer fenzi, Integer fenmu) {
        String result = "0.00";
        if (0 != fenzi && 0 != fenmu) {
            result = df2.format(Float.valueOf(fenzi) / fenmu * 100);
        }
        return result + "%";
    }

    public void getconditionSql(Dto pDto) {
        String GroupSummation = pDto.getAsString("GroupSummation");
        boolean groupsummation = G4Utils.isNotEmpty(GroupSummation);
        String result = "";
        //是否需要分组
        if (G4Utils.isNotEmpty(pDto.getAsString("needGroup"))) {
            switch (pDto.getAsInteger("GroupType")) {
                case 1:
                    result = "order by c.deptid desc";
                    pDto.put("GroupField", groupsummation ? "deptname" : "");
                    pDto.put("GroupByDeptId", true);
                    break;
                case 2:
                    result = "order by c.course_id desc";
                    pDto.put("GroupField", groupsummation ? "course_name" : "");
                    break;
            }
        }

        pDto.put("conditionsql", result);
    }
}
