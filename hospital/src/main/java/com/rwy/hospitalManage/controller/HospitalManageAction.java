package com.rwy.hospitalManage.controller;

import com.rwy.hospitalManage.service.IHospitalInfoService;
import org.apache.batik.transcoder.TranscoderInput;
import org.apache.batik.transcoder.TranscoderOutput;
import org.apache.batik.transcoder.image.JPEGTranscoder;
import org.nxstudio.core.controller.BaseAction;
import org.nxstudio.core.model.CommonActionForm;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.Earole;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.core.vo.UserInfoVo;
import org.nxstudio.modules.systemmanager.privilege.service.OrganizationService;
import org.nxstudio.modules.systemmanager.privilege.service.RoleService;
import org.nxstudio.plugin.report.excel.ExcelExporter;
import org.nxstudio.plugin.report.fcf.FcfDataMapper;
import org.nxstudio.plugin.report.fcf.GraphConfig;
import org.nxstudio.plugin.report.fcf.Set;
import org.nxstudio.util.base.WebUtils;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.util.json.JsonHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.StringReader;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * <pre></pre>
 * <br>
 * <pre>所属模块：医院管理</pre>
 *
 * @author 黄琦鸿
 *         创建于  2014/12/27 17:22.
 */
@Controller
@RequestMapping("/HospitalManageAction")
public class HospitalManageAction extends BaseAction {
    @Autowired
    private IHospitalInfoService hospitalInfoService;
    @Autowired
    private OrganizationService organizationService;
    @Autowired
    private RoleService roleService;

    /**
     * 医院管理
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=HospitalManageInit")
    public String HospitalManageInit(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        return "/HospitalManage/HospitalInfoManage";
    }

    /**
     * 医院管理
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=HistoryCheckDetailInfoInit")
    public String HistoryCheckDetailInfoInit(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        Dto inDto = new BaseDto();
        super.removeSessionAttribute(request, "deptid");
        UserInfoVo user = super.getSessionContainer(request).getUserInfo();
        String deptid = user.getDeptid();
        inDto.put("deptid", deptid);
        Dto outDto = organizationService.queryDeptinfoByDeptid(inDto);
        request.setAttribute("rootDeptid", outDto.getAsString("deptid"));
        request.setAttribute("rootDeptname", outDto.getAsString("deptname"));
        inDto.put("deptid", deptid.length() < 6 ? deptid : deptid.substring(0, 6));
        outDto = organizationService.queryDeptinfoByDeptid(inDto);
        inDto.put("userid", user.getUserid());
        inDto.put("rolename", "医院管理员");
        List<Dto> role = roleService.queryUserRole(inDto);
        if (G4Utils.isNotEmpty(role)) {
            request.setAttribute("ismanager", "true");
        } else {
            request.setAttribute("ismanager", "false");
        }
        request.setAttribute("Hospitaltname", outDto.getAsString("deptname"));
        return "/CheckInfoManage/HistoryCheckDetailInfo";
    }

    /**
     * 医院人员管理
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=UsersManageInit")
    public String UsersManageInit(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        super.removeSessionAttribute(request, "deptid");
        Dto inDto = new BaseDto();
        String deptid = super.getSessionContainer(request).getUserInfo().getDeptid();
        inDto.put("deptid", deptid);
        Dto outDto = organizationService.queryDeptinfoByDeptid(inDto);
        request.setAttribute("rootDeptid", outDto.getAsString("deptid"));
        request.setAttribute("rootDeptname", outDto.getAsString("deptname"));
        inDto.put("deptid", deptid.length() < 6 ? deptid : deptid.substring(0, 6));
        outDto = organizationService.queryDeptinfoByDeptid(inDto);
        request.setAttribute("Hospitaltname", outDto.getAsString("deptname"));
        UserInfoVo userInfoVo = getSessionContainer(request).getUserInfo();
        request.setAttribute("login_account", userInfoVo.getAccount());
        return "/HospitalManage/UsersManage";
    }

    /**
     * 用户授权 :选择角色
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=userGrantInit")
    public String userGrantInit(HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        pDto.put("rolename", "手卫记录员");
        List<Dto> role = roleService.queryUserRole(pDto);
        if (G4Utils.isNotEmpty(role)) {
            for (int i = 0; i < role.size(); i++) {
                if (G4Utils.isEmpty(role.get(i).getAsString("authorizeid"))) {
                    role.get(i).put("checked", false);
                } else {
                    role.get(i).put("checked", true);
                }
            }
        }
        write(JsonHelper.encodeObject2Json(role), response);
        return null;
    }


    /**
     * 保存用户授权
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=saveUserGrant")
    public String saveUserGrant(HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        pDto.put("success", "保存成功");
        if (G4Utils.isNotEmpty(pDto.getAsString("roleid"))) {
            Integer count = roleService.queryRoleExistByUser(pDto);
            if (count == 0) {
                roleService.saveEaUserAuthorize(pDto);
            }
        } else {
            List<Dto> role = roleService.queryEaroleBySql(new BaseDto("rolename", "手卫记录员"));
            if (G4Utils.isNotEmpty(role) && role.size() == 1) {
                pDto.put("roleid", role.get(0).getAsString("roleid"));
                roleService.deleteEaUserAuthorize(pDto);
            } else {
                pDto.put("error", "角色已不存在，无法保存");
            }
        }
        write(pDto.toJson(), response);
        return null;
    }

    /**
     * 科目管理
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=CourseManageInit")
    public String CourseManageInit(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        return "CourseInfoManage/CourseInfoManage";
    }

    /**
     * 检查记录管理
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=CheckInfoManageInit")
    public String CheckInfoManageInit(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        Dto inDto = new BaseDto();
        super.removeSessionAttribute(request, "deptid");
        UserInfoVo user = super.getSessionContainer(request).getUserInfo();
        String deptid = user.getDeptid();
        inDto.put("deptid", deptid);
        Dto outDto = organizationService.queryDeptinfoByDeptid(inDto);
        inDto.put("userid", user.getUserid());
        inDto.put("rolename", "医院管理员");
        List<Dto> role = roleService.queryUserRole(inDto);
        if (G4Utils.isNotEmpty(role)) {
            request.setAttribute("ismanager", "true");
        } else {
            request.setAttribute("ismanager", "false");
        }
        request.setAttribute("rootDeptid", outDto.getAsString("deptid"));
        request.setAttribute("rootDeptname", outDto.getAsString("deptname"));
        inDto.put("deptid", deptid.length() < 6 ? deptid : deptid.substring(0, 6));
        outDto = organizationService.queryDeptinfoByDeptid(inDto);
        request.setAttribute("Hospitaltname", outDto.getAsString("deptname"));
        request.setAttribute("checker_name", user.getUsername());
        request.setAttribute("checker", user.getUserid());
        return "CheckInfoManage/CheckInfoManage";
    }

    /**
     * 检查记录查询
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=queryCheckInfoManageInit")
    public String queryCheckInfoManageInit(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        Dto inDto = new BaseDto();
        super.removeSessionAttribute(request, "deptid");
        UserInfoVo user = super.getSessionContainer(request).getUserInfo();
        String deptid = user.getDeptid();
        inDto.put("deptid", deptid);
        Dto outDto = organizationService.queryDeptinfoByDeptid(inDto);
        request.setAttribute("rootDeptid", outDto.getAsString("deptid"));
        request.setAttribute("rootDeptname", outDto.getAsString("deptname"));
        inDto.put("deptid", deptid.length() < 6 ? deptid : deptid.substring(0, 6));
        outDto = organizationService.queryDeptinfoByDeptid(inDto);
        request.setAttribute("Hospitaltname", outDto.getAsString("deptname"));
        inDto.put("userid", user.getUserid());
        inDto.put("rolename", "医院管理员");
        List<Dto> role = roleService.queryUserRole(inDto);
        if (G4Utils.isNotEmpty(role)) {
            request.setAttribute("ismanager", "true");
        } else {
            request.setAttribute("ismanager", "false");
        }

        return "CheckInfoManage/QueryCheckInfoManage";
    }

    /**
     * 批量审核检查记录页面初始化
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=BatchVerifyCheckInfoInit")
    public String BatchVerifyCheckInfoInit(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        Dto inDto = new BaseDto();
        super.removeSessionAttribute(request, "deptid");
        UserInfoVo user = super.getSessionContainer(request).getUserInfo();
        String deptid = user.getDeptid();
        inDto.put("deptid", deptid);
        Dto outDto = organizationService.queryDeptinfoByDeptid(inDto);
        request.setAttribute("rootDeptid", outDto.getAsString("deptid"));
        request.setAttribute("rootDeptname", outDto.getAsString("deptname"));
        inDto.put("deptid", deptid.length() < 6 ? deptid : deptid.substring(0, 6));
        outDto = organizationService.queryDeptinfoByDeptid(inDto);
        request.setAttribute("Hospitaltname", outDto.getAsString("deptname"));
        return "/CheckInfoManage/BatchVerifyCheckInfo";
    }
    /**
     * 查询医院信息
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=queryHospitalInfo")
    public String queryHospitalInfo(HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        String jsonString = hospitalInfoService.queryHospitalInfo(pDto);
        super.write(jsonString, response);
        return null;
    }

    /**
     * 保存医院信息
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=saveHospitalInfo")
    public String saveHospitalInfo(HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        pDto.put("success", "医院保存成功");
        UserInfoVo user = super.getSessionContainer(request).getUserInfo();
        pDto.put("creater", user.getUserid());
        hospitalInfoService.saveHospitalInfo(pDto);
        pDto.remove("end_of_valid");
        String jsonString = pDto.toJson();
        super.write(jsonString, response);
        return null;
    }

    /**
     * 修改医院信息
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=updateHospitalInfo")
    public String updateHospitalInfo(HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        hospitalInfoService.updateHospitalInfo(pDto);
        String jsonString = new BaseDto("success", "修改成功").toJson();
        pDto.remove("end_of_valid");
        super.write(jsonString, response);
        return null;
    }

    /**
     * 删除医院信息
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=deleteHospitalInfo")
    public String deleteHospitalInfo(HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        hospitalInfoService.deleteHospitalInfo(pDto);
        String jsonString = new BaseDto("success", "删除成功").toJson();
        super.write(jsonString, response);
        return null;
    }

    /**
     * 查询部门科目信息
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=queryDeptCourseInfo")
    public String queryDeptCourseInfo(HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        String jsonString = hospitalInfoService.queryDeptCourseInfo(pDto);
        super.write(jsonString, response);
        return null;
    }

    /**
     * 查询科目信息
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=queryCourseInfo")
    public String queryCourseInfo(HttpServletRequest request,
                                  HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
//        UserInfoVo user =super.getSessionContainer(request).getUserInfo();
//        String deptid = user.getDeptid();
//        pDto.put("deptid", deptid.length() < 6 ? deptid : deptid.substring(0, 6));
//       List<Dto> hosInfo= hospitalInfoService.getHospitalInfoByDept(pDto);
        String jsonString="";
//        if(G4Utils.isEmpty(hosInfo)&&hosInfo.size()==1)
//        {
//            jsonString=new BaseDto("error","未找到对应的医院信息").toJson() ;
//        }else {
//            pDto.put("hospital_id",hosInfo.get(0).getAsString("hospital_id"));
            jsonString  = hospitalInfoService.queryCourseInfo(pDto);
//        }
        super.write(jsonString, response);
        return null;
    }

    /**
     * 查询科目信息
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=queryCourseInfoForList")
    public String queryCourseInfoForList(HttpServletRequest request,
                                         HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        UserInfoVo user = super.getSessionContainer(request).getUserInfo();
        pDto.put("deptid", user.getDeptid());
        List<Dto> courseInfos = hospitalInfoService.queryCourseInfoForList(pDto);
        super.write(JsonHelper.encodeObject2Json(courseInfos), response);
        return null;
    }

    /**
     * 查询科室信息
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=queryDeptInfoForList")
    public String queryDeptInfoForList(HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        UserInfoVo user = super.getSessionContainer(request).getUserInfo();
        pDto.put("deptid", user.getDeptid());
        List<Dto> depts = hospitalInfoService.queryDeptInfoForList(pDto);
        super.write(JsonHelper.encodeObject2Json(depts), response);
        return null;
    }

    /**
     * 查询检查记录信息
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=queryCheckInfo")
    public String queryCheckInfo(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        UserInfoVo user = super.getSessionContainer(request).getUserInfo();
        String jsonString = hospitalInfoService.queryCheckInfo(pDto, user);
        super.write(jsonString, response);
        return null;
    }

    /**
     * 查询检查记录信息
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=getRunningTaskForCheckRecord")
    public String getRunningTaskForCheckRecord(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        UserInfoVo user = super.getSessionContainer(request).getUserInfo();
        String jsonString = hospitalInfoService.getRunningTaskForCheckRecord(pDto, user);
        super.write(jsonString, response);
        return null;
    }
    /**
     * 查询检查记录标准信息
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=queryCheckStandardInfo")
    public String queryCheckStandardInfo(HttpServletRequest request,
                                         HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        List<Dto> result = hospitalInfoService.queryCheckStandardInfo(pDto);
        String jsonString = JsonHelper.encodeObject2Json(result);
        super.write(jsonString, response);
        return null;
    }

    /**
     * 保存科目信息
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=saveCourseInfo")
    public String saveCourseInfo(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        pDto.put("success", "科目保存成功");
        UserInfoVo user = super.getSessionContainer(request).getUserInfo();
        pDto.put("creater", user.getUserid());
        pDto.put("deptid", user.getDeptid());
        hospitalInfoService.saveCourseInfo(pDto);
        String jsonString = pDto.toJson();
        super.write(jsonString, response);
        return null;
    }

    /**
     * 修改科目信息
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=updateCourseInfo")
    public String updateCourseInfo(HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        hospitalInfoService.updateCourseInfo(pDto);
        String jsonString = new BaseDto("success", "修改成功").toJson();
        super.write(jsonString, response);
        return null;
    }

    /**
     * 删除科目信息
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=deleteCourseInfo")
    public String deleteCourseInfo(HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        hospitalInfoService.deleteCourseInfo(pDto);
        String jsonString = new BaseDto("success", "删除成功").toJson();
        super.write(jsonString, response);
        return null;
    }

    /**
     * 删除部门科目信息
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=deleteDeptCourseInfo")
    public String deleteDeptCourseInfo(HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        hospitalInfoService.deleteDeptCourseInfo(pDto);
        String jsonString = new BaseDto("success", "删除成功").toJson();
        super.write(jsonString, response);
        return null;
    }

    /**
     * 保存部门科目信息
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=saveDeptCourseInfo")
    public String saveDeptCourseInfo(HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        pDto.put("success", "科目保存成功");
        UserInfoVo user = super.getSessionContainer(request).getUserInfo();
        pDto.put("creater", user.getUserid());
        hospitalInfoService.saveDeptCourseInfo(pDto);
        String jsonString = pDto.toJson();
        super.write(jsonString, response);
        return null;
    }

    /**
     * 保存检查记录信息
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=saveCheckRecordInfo")
    public String saveCheckRecordInfo(HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        pDto.put("success", "记录保存成功");
        UserInfoVo user = super.getSessionContainer(request).getUserInfo();
        pDto.put("userid", user.getUserid());
        pDto.put("rolename", "医院管理员");
        pDto.put("userAccount", user.getAccount());
        List<Dto> CS001 = WebUtils.getCodeListByField("CS001", request);
        List<Dto> CS002 = WebUtils.getCodeListByField("CS002", request);
        pDto.put("CS001", CS001);
        pDto.put("CS002", CS002);
        hospitalInfoService.saveCheckRecordInfo(pDto);
        String jsonString = pDto.toJson();
        super.write(jsonString, response);
        return null;
    }

    /**
     * 修改检查记录信息
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=updateCheckRecordInfo")
    public String updateCheckRecordInfo(HttpServletRequest request,
                                        HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        UserInfoVo user = super.getSessionContainer(request).getUserInfo();
        pDto.put("userid", user.getUserid());
        pDto.put("account", user.getAccount());
        List<Dto> CS001 = WebUtils.getCodeListByField("CS001", request);
        List<Dto> CS002 = WebUtils.getCodeListByField("CS002", request);
        pDto.put("CS001", CS001);
        pDto.put("CS002", CS002);
        hospitalInfoService.updateCheckRecordInfo(pDto);
        String jsonString = new BaseDto("success", "修改成功").toJson();
        super.write(jsonString, response);
        return null;
    }

    /**
     * 删除检查信息
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=deleteCheckRecordInfo")
    public String deleteCheckRecordInfo(HttpServletRequest request,
                                        HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        UserInfoVo user = super.getSessionContainer(request).getUserInfo();
        pDto.put("userid", user.getUserid());
        hospitalInfoService.deleteCheckRecordInfo(pDto);
        String jsonString = new BaseDto("success", "删除成功").toJson();
        super.write(jsonString, response);
        return null;
    }

    /**
     * 审核检查信息
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=doVerifyCheckRecordInfo")
    public String doVerifyCheckRecordInfo(HttpServletRequest request,
                                          HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        pDto.put("verify_statu", "COM00101".equals(pDto.getAsString("verify_statu")) ? "VS00101" : "VS00102");
        hospitalInfoService.doVerifyCheckRecordInfo(pDto);
        String jsonString = new BaseDto("success", pDto.containsKey("error") ? pDto.getAsString("error") : "审核成功").toJson();
        super.write(jsonString, response);
        return null;
    }
    /**
     * 批量审核检查信息
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=doBatchVerifyCheckRecordInfo")
    public String doBatchVerifyCheckRecordInfo(HttpServletRequest request,
                                          HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        boolean verify_statu= pDto.getAsBoolean("verify_statu");
        if(G4Utils.isEmpty(verify_statu))
        {
            pDto.put("error","审核结果不能为空，请联系管理员解决");
        }else
        {
            pDto.put("verify_statu", verify_statu? "VS00101" : "VS00102");
            hospitalInfoService.doBatchVerifyCheckRecordInfo(pDto);
        }
        String jsonString = new BaseDto("success", pDto.containsKey("error") ? pDto.getAsString("error") : "审核成功").toJson();
        super.write(jsonString, response);
        return null;
    }
    /**
     * 科目下拉树初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=CourseTreeManage")
    public String CourseTreeManage(HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        Dto dto = new BaseDto();
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        String nodeid = request.getParameter("node");


        Dto outDto = hospitalInfoService.CourseTreeManage(pDto);
        write(outDto.getAsString("jsonString"), response);
        return null;
    }

    /**
     * 手卫报表
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=CheckReport2DPieInit")
    public String CheckReport2DPieInit(HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto inDto = new BaseDto();
        super.removeSessionAttribute(request, "deptid");
        String deptid = super.getSessionContainer(request).getUserInfo().getDeptid();
        inDto.put("deptid", deptid);
        Dto outDto = organizationService.queryDeptinfoByDeptid(inDto);
        request.setAttribute("rootDeptid", outDto.getAsString("deptid"));
        request.setAttribute("rootDeptname", outDto.getAsString("deptname"));
        inDto.put("deptid", deptid.length() < 6 ? deptid : deptid.substring(0, 6));
        outDto = organizationService.queryDeptinfoByDeptid(inDto);
        request.setAttribute("Hospitaltname", outDto.getAsString("deptname"));
        return "/HospitalManage/CheckReport";
    }

    /**
     * 查询检查记录信息
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=queryHistoryCheckInfo")
    public String queryHistoryCheckInfo(HttpServletRequest request,
                                        HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        UserInfoVo user = super.getSessionContainer(request).getUserInfo();
        String jsonString = hospitalInfoService.queryHistoryCheckInfo(pDto);
        super.write(jsonString, response);
        return null;
    }

    /**
     * 查询检查记录历史明细信息
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=queryHistoryCheckDetailInfo")
    public String queryHistoryCheckDetailInfo(HttpServletRequest request,
                                              HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        UserInfoVo user = super.getSessionContainer(request).getUserInfo();
        String jsonString = hospitalInfoService.queryHistoryCheckDetailInfo(pDto, user);
        super.write(jsonString, response);
        return null;
    }

    /**
     * 手卫报表
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=GetCheckReportData")
    public String GetCheckReportData(HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        UserInfoVo user =super.getSessionContainer(request).getUserInfo();
        String deptid = user.getDeptid();
        Dto inDto=new BaseDto();
        inDto.put("userid", user.getUserid());
        inDto.put("rolename", "医院管理员");
        List<Dto> role = roleService.queryUserRole(inDto);
        if (G4Utils.isEmpty(role)) {
            pDto.put("userid", user.getUserid());
        }
        if (G4Utils.isEmpty(pDto.getAsString("deptid"))) {
            pDto.put("rootdeptid", deptid.length() < 6 ? deptid : deptid.substring(0, 6));
        }
        //查询原始数据
        List list = hospitalInfoService.GetCheckReportData(pDto);
        write(JsonHelper.encodeObject2Json(list), response);
        return null;
    }
    /**
     * 获取图表数据
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=GetChartData")
    public String GetChartData(HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        UserInfoVo user =super.getSessionContainer(request).getUserInfo();
        String deptid = user.getDeptid();
        Dto inDto=new BaseDto();
        inDto.put("userid", user.getUserid());
        inDto.put("rolename", "医院管理员");
        List<Dto> role = roleService.queryUserRole(inDto);
        if (G4Utils.isEmpty(role)) {
            pDto.put("userid", user.getUserid());
        }
        if (G4Utils.isEmpty(pDto.getAsString("deptid"))) {
            pDto.put("rootdeptid", deptid.length() < 6 ? deptid : deptid.substring(0, 6));
        }
        List list = hospitalInfoService.GetChartData(pDto);
        write(JsonHelper.encodeObject2Json(list), response);
        return null;
    }

    /**
     * 获取全院数据
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=getQuanCheckYuanReportData")
    public String getQuanCheckYuanReportData(HttpServletRequest request,
                               HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        UserInfoVo user =super.getSessionContainer(request).getUserInfo();
        String deptid = user.getDeptid();
        Dto inDto=new BaseDto();
        inDto.put("userid", user.getUserid());
        inDto.put("rolename", "医院管理员");
        List<Dto> role = roleService.queryUserRole(inDto);
        if (G4Utils.isEmpty(role)) {
            pDto.put("userid", user.getUserid());
        }
        if (G4Utils.isEmpty(pDto.getAsString("deptid"))) {
            pDto.put("rootdeptid", deptid.length() < 6 ? deptid : deptid.substring(0, 6));
        }
        List list = hospitalInfoService.getQuanCheckYuanReportData(pDto);
        write(JsonHelper.encodeObject2Json(list), response);
        return null;
    }
    /**
     * 手卫报表 导出Excel
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=getReportDataForExcel")
    public String getReportDataForExcel(HttpServletRequest request,
                                        HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        String ReportType = pDto.getAsString("ReportType");
        ReportType = (ReportType.contains("[") ? ReportType.substring(2, ReportType.length() - 2) : ReportType);
        ReportType = ReportType.replaceAll("\"", "");
        String[] ReportTypes = ReportType.split(",");
        pDto.put("ReportType", ReportTypes);
        UserInfoVo user =super.getSessionContainer(request).getUserInfo();
        String deptid = user.getDeptid();
        Dto inDto=new BaseDto();
        inDto.put("userid", user.getUserid());
        inDto.put("rolename", "医院管理员");
        List<Dto> role = roleService.queryUserRole(inDto);
        if (G4Utils.isEmpty(role)) {
            pDto.put("userid", user.getUserid());
        }
        if (G4Utils.isEmpty(pDto.getAsString("deptid"))) {
            pDto.put("rootdeptid", deptid.length() < 6 ? deptid : deptid.substring(0, 6));
        }
        //如果是医院管理员就查询全部。否则就查询自己录入的
        if (G4Utils.isEmpty(role)) {
            if (G4Utils.isEmpty(pDto.getAsString("userid"))) {
                pDto.put("userid", user.getUserid());
            }
        }
        hospitalInfoService.getReportDataForExcel(request, response, pDto);
        return null;
    }
    /**
     * 导出报表列表数据
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=getGridData2Excel")
    public String getGridData2Excel(HttpServletRequest request,
                                        HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        UserInfoVo user =super.getSessionContainer(request).getUserInfo();
        String deptid = user.getDeptid();
        Dto inDto=new BaseDto();
        inDto.put("userid", user.getUserid());
        inDto.put("rolename", "医院管理员");
        List<Dto> role = roleService.queryUserRole(inDto);
        if (G4Utils.isEmpty(role)) {
            pDto.put("userid", user.getUserid());
        }
        if (G4Utils.isEmpty(pDto.getAsString("deptid"))) {
            pDto.put("rootdeptid", deptid.length() < 6 ? deptid : deptid.substring(0, 6));
        }
        //如果是医院管理员就查询全部。否则就查询自己录入的
        if (G4Utils.isEmpty(role)) {
            if (G4Utils.isEmpty(pDto.getAsString("userid"))) {
                pDto.put("userid", user.getUserid());
            }
        }
        hospitalInfoService.getGridData2Excel(request, response, pDto);
        return null;
    }
    /**
     * 导出检查记录查询列表数据
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=getQueryGridData2Excel")
    public String getQueryGridData2Excel(HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        UserInfoVo user =super.getSessionContainer(request).getUserInfo();
        String deptid = user.getDeptid();
        Dto inDto=new BaseDto();
        inDto.put("userid", user.getUserid());
        inDto.put("rolename", "医院管理员");
        List<Dto> role = roleService.queryUserRole(inDto);
        if (G4Utils.isEmpty(role)) {
            pDto.put("userid", user.getUserid());
        }
        if (G4Utils.isEmpty(pDto.getAsString("deptid"))) {
            pDto.put("rootdeptid", deptid.length() < 6 ? deptid : deptid.substring(0, 6));
        }
        //如果是医院管理员就查询全部。否则就查询自己录入的
        if (G4Utils.isEmpty(role)) {
            if (G4Utils.isEmpty(pDto.getAsString("userid"))) {
                pDto.put("userid", user.getUserid());
            }
        }
        hospitalInfoService.getQueryGridData2Excel(request, response, pDto);
        return null;
    }

    /**
     * 手卫报表 导出Excel
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=getReport_HIS_DataForExcel")
    public String getReport_HIS_DataForExcel(HttpServletRequest request,
                                             HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        String ReportType = pDto.getAsString("ReportType");
        ReportType = (ReportType.contains("[") ? ReportType.substring(2, ReportType.length() - 2) : ReportType);
        ReportType = ReportType.replaceAll("\"", "");
        String[] ReportTypes = ReportType.split(",");
        pDto.put("ReportType", ReportTypes);
        UserInfoVo user = super.getSessionContainer(request).getUserInfo();
        Dto roleDto = new BaseDto("rolename", "医院管理员");
        roleDto.put("userid", user.getUserid());
        List<Dto> role = roleService.queryUserRole(roleDto);
        String deptid = user.getDeptid();
        if (!pDto.containsKey("deptid")) {
            pDto.put("rootdeptid", deptid.length() < 6 ? deptid : deptid.substring(0, 6));
        }
        //如果是医院管理员就查询全部。否则就查询自己录入的
        if (G4Utils.isEmpty(role)) {
            if (G4Utils.isEmpty(pDto.getAsString("userid"))) {
                pDto.put("userid", user.getUserid());
            }
            pDto.put("operater", user.getUserid());
        }
        hospitalInfoService.getReport_HIS_DataForExcel(request, response, pDto);
        return null;
    }

    @RequestMapping(params = "reqCode=SaveReport2Image")
    private void SaveReport2Image(HttpServletRequest request, HttpServletResponse response) throws IOException {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        String svgString = request.getParameter("svg");
        String type = request.getParameter("type");
        response.setContentType(type);
        String filename = new Date().toLocaleString().replace(" ", "_") + "." + type.substring(6);
        response.setHeader("Content-disposition", "attachment;filename=" + filename);

        JPEGTranscoder t = new JPEGTranscoder();
        t.addTranscodingHint(JPEGTranscoder.KEY_QUALITY, new Float(.8));
        TranscoderInput input = new TranscoderInput(new StringReader(svgString));
        try {
            TranscoderOutput output = new TranscoderOutput(response.getOutputStream());
            t.transcode(input, output);
            response.getOutputStream().flush();
            response.getOutputStream().close();
        } catch (Exception e) {
            response.getOutputStream().close();
            e.printStackTrace();
        }
    }

    /**
     * 查询检查记录信息
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=querySimbleCheckInfo")
    public String querySimbleCheckInfo(HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto pDto = aForm.getParamAsDto(request);
        String jsonString = "";
        List<Dto> result = hospitalInfoService.querySimbleCheckInfo(pDto);
        jsonString = JsonHelper.encodeObject2Json(result);
        super.write(jsonString, response);
        return null;
    }


}