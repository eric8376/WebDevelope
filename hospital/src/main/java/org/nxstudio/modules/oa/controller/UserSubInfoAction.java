package org.nxstudio.modules.oa.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.nxstudio.core.controller.BaseAction;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.json.JsonHelper;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.core.model.CommonActionForm;

import org.nxstudio.modules.oa.service.IUserSubInfoService;
import org.nxstudio.util.io.FileUpload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【用户信息接收】
 * 时间: 2013-06-10 下午4:36
 */
@Controller
@RequestMapping("/UserSubInfoAction")
public class UserSubInfoAction extends BaseAction {
    @Autowired
    private IUserSubInfoService subInfoService;

    /**
     * 保存用户子信息
     */
    @RequestMapping(params = "reqCode=save_pv_form")
    public String save_pv_form(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        CommonActionForm aForm = new CommonActionForm();
        Dto dto = aForm.getParamAsDto(request);

        //service
        subInfoService.updUserInfo(dto);

        setOkTipMsg("数据保存成功", response);

        return null;
    }

    /**
     * 查询用户子信息
     */
    @RequestMapping(params = "reqCode=load_pv_form")
    public String load_pv_form(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        //获取登录用户信息
        Dto pDto = new BaseDto();
        String userId = super.getSessionContainer(request).getUserInfo().getUserid();
        pDto.put("user_id", userId);

        //service
        Dto outDto = subInfoService.selectUserInfo(pDto);

        //转换
        String jsonString = JsonHelper.encodeDto2FormLoadJson(outDto, G4Constants.FORMAT_Date);
        super.write(jsonString, response);

        return null;
    }

    /**
     * 上传图片(读取文件测试)--！!!!仅仅测试(未实现 )
     */
    @RequestMapping(params = "reqCode=load_pv_file")
    public String load_pv_file(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        List<MultipartFile> UploadFileInfo = FileUpload.getUploadFile(request);
        if (G4Utils.isNotEmpty(UploadFileInfo)) {
            for (MultipartFile multipartfile : UploadFileInfo) {
                System.out.println(multipartfile.toString());
            }
        }
        setOkTipMsg("读取文件...", response);

        return null;
    }

}
