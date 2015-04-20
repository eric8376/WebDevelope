package org.nxstudio.modules.demo.form.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.json.JsonHelper;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.core.controller.BaseAction;
import org.nxstudio.core.model.CommonActionForm;
import org.nxstudio.util.io.FileUpload;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;


/**
 * 表单及表单元素标准范例暨教程Action
 *
 * @author XiongChun
 * @see org.nxstudio.core.controller.BaseAction
 * @since 2010-10-23
 */
@Controller
@RequestMapping("/formDemo")
public class FormAction extends BaseAction {

    /**
     * 基本输入组件页面初始化(属性设置)
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=basicInput4PropertyInit")
    public String basicInput4PropertyInit(HttpServletRequest request,
                                          HttpServletResponse response) throws Exception {
        return "/demo/form/basicInput4Property";
    }

    /**
     * 基本输入组件页面初始化(行为方法)
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=basicInput4MethodInit")
    public String basicInput4MethodInit(HttpServletRequest request,
                                        HttpServletResponse response) throws Exception {
        return "/demo/form/basicInput4Method";
    }

    /**
     * 日期时间输入组件暨初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=dataTimeInputInit")
    public String dataTimeInputInit(HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        return "/demo/form/dataTimeInput";
    }

    /**
     * 下拉选择框(本地数据源)
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=selectInputBasedLocalDataSourceInit")
    public String selectInputBasedLocalDataSourceInit(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        return "/demo/form/selectInputBasedLocalDataSource";
    }

    /**
     * 下拉选择框(字典数据源)
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=selectInputBasedCodeTableDataSourceInit")
    public String selectInputBasedCodeTableDataSourceInit(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        return "/demo/form/selectInputBasedCodeTableDataSource";
    }

    /**
     * 下拉选择框(远程数据源)
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=selectInputBasedRemoteDataSourceInit")
    public String selectInputBasedRemoteDataSourceInit(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        return "/demo/form/selectInputBasedRemoteDataSource";
    }

    /**
     * 下拉选择框(N级联动)
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=selectInputBasedMultilevelInit")
    public String selectInputBasedMultilevelInit(
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        return "/demo/form/selectInputBasedmultilevel";
    }

    /**
     * 查询中国行政区划
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=queryAreaDatas")
    public String queryAreaDatas(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        List areaList = g4Reader.queryForList("Demo.getChinaDataArea", dto);
        String jsonString = JsonHelper.encodeObject2Json(areaList);
        write(jsonString, response);
        return null;
    }

    /**
     * 查询中国行政区划(分页)
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=queryAreaDatas4Paging")
    public String queryAreaDatas4Paging(HttpServletRequest request,
                                        HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        //System.out.println(dto);
        List areaList = g4Reader.queryForPage("Demo.getChinaDataArea4Paging", dto);
        Integer totalInteger = (Integer) g4Reader.queryForObject("Demo.getChinaDataArea4PagingForPageCount", dto);
        String jsonString = encodeList2PageJson(areaList, totalInteger, null);
        write(jsonString, response);
        return null;
    }

    /**
     * 表单：单选、复选框页面初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=radioCheckBoxInit")
    public String radioCheckBoxInit(HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        return "/demo/form/radioCheckBox";
    }

    /**
     * 表单：表单异步提交页面初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=formSubmitInit")
    public String formSubmitInit(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {

        return "/demo/form/formSubmit";
    }

    /**
     * 表单：表单同步提交页面初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=formSynSubmitInit")
    public String formSynSubmitInit(HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        return "/demo/form/formSynSubmit";
    }

    /**
     * 表单：表单同步提交后跳转的页面
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=formSynForwardInit")
    public String formSynForwardInit(HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto inDto = aForm.getParamAsDto(request);
        request.setAttribute("value", inDto.toJson());
        return "/demo/form/formSynForwardPage";
    }

    /**
     * 表单：接收表单提交数据
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=saveTheSubmitInfo")
    public String saveTheSubmitInfo(HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        System.out.println("接收到的表单提交参数：\n" + dto);
        setOkTipMsg("数据提交成功:" + dto.toString(), response);
        return null;
    }


    /**
     * 表单：接收表单提交数据(ExtAjax请求)
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=saveTheSubmitInfoBasedAjaxRequest")
    public String saveTheSubmitInfoBasedAjaxRequest(HttpServletRequest request,
                                                    HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        System.out.println("接收到的表单提交参数：\n" + dto);
        setOkTipMsg("数据提交成功:" + dto.toString(), response);
        return null;
    }

    /**
     * 表单：表单数据填充
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=loadCallBack")
    public String loadCallBack(HttpServletRequest request,
                               HttpServletResponse response) throws Exception {
        Dto outDto = new BaseDto();
        outDto.put("text1", "熊春");
        outDto.put("text2", "托尼贾");
        String jsonString = JsonHelper.encodeDto2FormLoadJson(outDto, null);
        super.write(jsonString, response);
        return null;
    }

    /**
     * 工具栏页面初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=toobarDemo1Init")
    public String toobarDemo1Init(HttpServletRequest request,
                                  HttpServletResponse response) throws Exception {
        return "/demo/form/toolbar1";
    }

    /**
     * 消息提示框页面初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=msgDemo1Init")
    public String msgDemo1Init(HttpServletRequest request,
                               HttpServletResponse response) throws Exception {
        return "/demo/form/msgdemo1";
    }

    /**
     * 表单缺省平铺布局页面初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=formLayoutInit")
    public String formLayoutInit(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        return "/demo/form/formLayout";
    }

    /**
     * 表单分列布局页面初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=columnLayoutInit")
    public String columnLayoutInit(HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        return "/demo/form/columnLayout";
    }

    /**
     * 表单复合布局页面初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=complexLayoutInit")
    public String complexLayoutInit(HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        return "/demo/form/complexLayout";
    }

    /**
     * 表单复合布局页面初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=complexLayout2Init")
    public String complexLayout2Init(HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        return "/demo/form/complexLayout2";
    }

    /**
     * 富文本输入页面初始化(原生)
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=htmlEditorInit")
    public String htmlEditorInit(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        return "/demo/form/htmlEditor";
    }

    /**
     * 富文本输入页面初始化(扩展)
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=htmlEditor2Init")
    public String htmlEditor2Init(HttpServletRequest request,
                                  HttpServletResponse response) throws Exception {
        return "/demo/form/htmlEditor2";
    }

    /**
     * 插入图片
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=doUpload")
    public String doUpload(HttpServletRequest request,
                           HttpServletResponse response) throws Exception {
        Dto outDto = new BaseDto();
        // 获取web应用根路径,也可以直接指定服务器任意盘符路径
        String savePath = servletContext.getRealPath("/") + "uploaddata/demo/";

        List<MultipartFile> UploadFileInfo = FileUpload.getUploadFile(request);
        if (G4Utils.isNotEmpty(UploadFileInfo)) {
            for (MultipartFile multipartfile : UploadFileInfo) {
                String fileName = multipartfile.getOriginalFilename();
                String type = fileName.substring(fileName.lastIndexOf("."));
                // 文件真实文件名
                fileName = getSessionContainer(request).getUserInfo().getUserid();
                fileName = fileName + "_" + G4Utils.getCurrentTime("yyyyMMddhhmmss") + type;
                if (multipartfile.getSize() > 204800) {
                    outDto.put("success", new Boolean(true));
                    outDto.put("msg", "文件上传失败,你只能上传小于100KB的图片文件");
                    outDto.put("state", "error");
                } else {
                    FileUpload.fileUpload(multipartfile, savePath, fileName);
                    outDto.put("success", new Boolean(true));
                    outDto.put("msg", "文件上传成功");
                    outDto.put("state", "ok");
                    outDto.put("aUrl", request.getContextPath() + "/uploaddata/demo/" + fileName);
                }
            }
        }
        write(outDto.toJson(), response);
        return null;
    }
}
