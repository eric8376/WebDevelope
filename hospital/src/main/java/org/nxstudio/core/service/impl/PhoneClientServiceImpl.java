package org.nxstudio.core.service.impl;

import com.rwy.hospitalManage.service.IHospitalInfoService;
import com.rwy.httpService.entity.request.*;
import com.rwy.httpService.entity.response.LoginVerifyResponse;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.nxstudio.core.dao.IPhoneClientDao;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.core.service.IPhoneClientService;
import org.nxstudio.core.vo.UserInfoVo;
import org.nxstudio.modules.systemmanager.privilege.service.OrganizationService;
import org.nxstudio.service.httpService.entity.RequestMessageVO;
import org.nxstudio.service.httpService.request.Request;
import org.nxstudio.util.AutowireVoAtt;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.util.json.JsonHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.beans.IntrospectionException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

/**
 * <pre></pre>
 * <br>
 * <pre>所属模块：</pre>
 *
 * @author 黄琦鸿
 *         创建于  2015/1/3 23:56.
 */
@Service("PhoneClientService")
public class PhoneClientServiceImpl implements IPhoneClientService {
    private static Log log = LogFactory.getLog(PhoneClientServiceImpl.class);
    @Autowired
    private IPhoneClientDao phoneClientDao;
    @Autowired
    private OrganizationService organizationService;
    @Autowired
    private IHospitalInfoService hospitalInfoService;
    private List<String> BussinessCode = Arrays.asList(new String[]{"BS001",
            "BS002",
            "BS003",
            "BS004",
            "BS005",
            "BS006",
            "BS007"
    });

    @Override
    public String queryCheckRecord(Dto indDto) throws SQLException {
        List<Dto> list = phoneClientDao.queryCheckRecord(indDto);
        String jsonString = JsonHelper.encodeObject2Json(list);
        return jsonString;
    }


    /**
     * @param request
     * @param paramsDto
     * @param result
     * @return
     */
    public void doBusiness(Request request, Dto paramsDto, Dto result) throws Exception {
        RequestMessageVO requestMessageVO = getRequestVo(paramsDto);
        if (requestMessageVO == null) {
            result.put("code", -1);
            result.put("msg", "业务代码不能为空");
        } else {
            requestMessageVO.verifyParams(result);
        }

        String bussinesscode = G4Utils.isNotEmpty(requestMessageVO) ? requestMessageVO.getBusiness_code() : "";
        int index = BussinessCode.indexOf(bussinesscode);
        UserInfoVo userInfo = null;
        if (index > 0) {
            Dto querydto = new BaseDto();
            querydto.put("userid", paramsDto.getAsString("loginuserid"));
            Dto outDto = organizationService.getUserInfo(querydto);
            userInfo = (UserInfoVo) outDto.get("userInfo");
            if (G4Utils.isEmpty(userInfo)) {
                result.put("code", -1);
                result.put("msg", "当前登录用户已不存在");
            }
        }
        //如果不是登录校验的话，就查看loginuserid是否存在
        if (result.getAsInteger("code") == -1) {
            return;
        }
        switch (index) {
            case 0:
                login(request, paramsDto, result);
                break;
            case 1:
                querycheckinfo(paramsDto, result, userInfo);
                break;
            case 2:
                getDeptInfo(paramsDto, result);
                break;
            case 3:
                getUserListInfo(paramsDto, result);
                break;
            case 4:
                getEacodeInfo(paramsDto, result);
                break;
            case 5:
                saveCheckRecordInfo(paramsDto, result, userInfo);
                break;
            case 6:
                paramsDto.put("deptid", userInfo.getDeptid());
                queryCourseInfo(paramsDto, result);
                break;
        }
    }

    @Override
    public Long saveHandlerInfo(String context, String bussiness_code) {
        Co_AuditProcess co_auditProcess = new Co_AuditProcess();
        co_auditProcess.setBusiness_code(bussiness_code);
        co_auditProcess.setReqdata(context.getBytes());
        co_auditProcess.setReqdate(new Date());
        phoneClientDao.save(co_auditProcess);
        return co_auditProcess.getProcessid();
    }

    @Override
    public void updateHandlerInfo(String context, Long processid) {
        Co_AuditProcess co_auditProcess = phoneClientDao.get(Co_AuditProcess.class, processid);
        co_auditProcess.setResdate(new Date());
        co_auditProcess.setResdata(context.getBytes());
        phoneClientDao.update(co_auditProcess);
    }


    /**
     * 将params转成对应的vo
     *
     * @param params
     * @return
     * @throws Exception
     */
    public RequestMessageVO getRequestVo(Dto params) throws Exception {
        RequestMessageVO requestMessageVO = null;
        String bussinesscode = params.getAsString("business_code");
        int index = BussinessCode.indexOf(bussinesscode);
        switch (index) {
            case 0:
                requestMessageVO = AutowireVoAtt.addValue(LoginVerify.class, params);
                break;
            case 1:
                requestMessageVO = AutowireVoAtt.addValue(QueryCheckInfo.class, params);
                break;
            case 2:
                requestMessageVO = AutowireVoAtt.addValue(QueryDeptInfo.class, params);
                break;
            case 3:
                requestMessageVO = AutowireVoAtt.addValue(QueryUserInfo.class, params);
                break;
            case 4:
                requestMessageVO = AutowireVoAtt.addValue(QueryEacodeInfo.class, params);
                break;
            case 5:
                requestMessageVO = AutowireVoAtt.addValue(CheckRecordInfo.class, params);
                break;
            case 6:
                requestMessageVO = AutowireVoAtt.addValue(CourseInfo.class, params);
                break;
        }
        return requestMessageVO;
    }

    /**
     * app登录校验
     *
     * @param request
     * @param dto
     * @param result
     */
    public void login(Request request, Dto dto, Dto result) throws IllegalAccessException, IntrospectionException, InstantiationException {
        String account = dto.getAsString("account");
        String password = dto.getAsString("password");
        password = G4Utils.encryptBasedDes(password);
        log.info("帐户[" + account + "]正尝试登陆系统...");
        Dto querydto = new BaseDto();
        querydto.put("account", account);
        Dto outDto = organizationService.getUserInfo(querydto);
        UserInfoVo userInfo = (UserInfoVo) outDto.get("userInfo");
        if (G4Utils.isEmpty(userInfo)) {
            result.put("code", -1);
            result.put("msg", "帐号输入错误,请重新输入!");
            return;
        }
        if (!password.equals(userInfo.getPassword())) {
            result.put("code", -1);
            result.put("msg", "密码输入错误,请重新输入!");
            return;
        }
        Dto dataDto = userInfo.toDto();
        dataDto.put("loginuserid", userInfo.getUserid());
        LoginVerifyResponse loginVerifyResponse = AutowireVoAtt.addValue(LoginVerifyResponse.class, dataDto);
        result.put("data", loginVerifyResponse);
        result.put("msg", "登录成功");
    }

    /**
     * 查询检查记录
     *
     * @param params
     * @param result
     * @param user
     * @throws SQLException
     */
    public void querycheckinfo(Dto params, Dto result, UserInfoVo user) throws SQLException {
        String jsonString = hospitalInfoService.queryCheckInfo(params, user);
        if (params.containsKey("limit")) {
            result.put("total", params.getAsString("total"));
        }
        result.put("data", params.get("listData"));
        result.put("msg", "查询检查记录成功");
    }

    /**
     * 获取部门信息
     *
     * @param params
     * @param result
     */
    public void getDeptInfo(Dto params, Dto result) {
        organizationService.queryDeptItems(params);
        result.put("data", params.get("listData"));
    }

    /**
     * 获取用户信息
     *
     * @param params
     * @param result
     */
    public void getUserListInfo(Dto params, Dto result) throws SQLException {
        String jsonString = "";
        List userList = new ArrayList();
        if (params.containsKey("limit")) {
            userList = phoneClientDao.queryForPage("User.queryUsersForManage", params);
            Integer pageCount = (Integer) phoneClientDao.queryForObject("User.queryUsersForManageForPageCount", params);
            jsonString = JsonHelper.encodeList2PageJson(userList, pageCount, null);
            result.put("total", pageCount);
        } else {
            userList = phoneClientDao.queryForList("User.queryUsersForManage", params);
            jsonString = JsonHelper.encodeObject2Json(userList);
        }
        result.put("data", userList);
        result.put("msg", "获取用户数据成功");
    }

    /**
     * 获取字典数据
     *
     * @param params
     * @param result
     * @throws SQLException
     */
    public void getEacodeInfo(Dto params, Dto result) throws SQLException {
        List codeList = new ArrayList();
        String jsonStrList = "";
        if (params.containsKey("limit")) {
            codeList = phoneClientDao.queryForPage("Resource.getCodeForPage", params);
            Integer totalCount = (Integer) phoneClientDao.queryForObject("Resource.getCodeForPageCount", params);
            result.put("total", totalCount);
            jsonStrList = JsonHelper.encodeList2PageJson(codeList, totalCount, null);
        } else {
            codeList = phoneClientDao.queryForList("Resource.getCodeForPage", params);
            jsonStrList = JsonHelper.encodeObject2Json(codeList);
        }
        result.put("data", codeList);
        result.put("msg", "获取字典数据成功");
    }

    public void saveCheckRecordInfo(Dto pDto, Dto result, UserInfoVo userInfo) throws Exception {
        pDto.put("success", "记录保存成功");
        pDto.put("userid", userInfo.getUserid());
        pDto.put("rolename", "医院管理员");
        pDto.put("userAccount", userInfo.getAccount());
        List<Dto> CS001 = phoneClientDao.queryForList("Resource.getCodeForPage", new BaseDto("field", "CS001"));
        List<Dto> CS002 = phoneClientDao.queryForList("Resource.getCodeForPage", new BaseDto("field", "CS002"));
        pDto.put("CS001", CS001);
        pDto.put("CS002", CS002);
        hospitalInfoService.saveCheckRecordInfo(pDto);
        if (pDto.containsKey("error")) {
            result.put("code", -1);
            result.put("msg", pDto.getAsString("error"));
            return;
        }
        result.put("msg", "检查记录保存成功");
    }
    public void queryCourseInfo(Dto pDto, Dto result )
    {
        List<Dto> courseInfos = hospitalInfoService.queryCourseInfoForList(pDto);
        result.put("data", courseInfos);
        result.put("msg", "获取时机数据成功");
    }
}
