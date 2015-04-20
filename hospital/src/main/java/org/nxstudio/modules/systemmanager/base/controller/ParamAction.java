package org.nxstudio.modules.systemmanager.base.controller;

import org.nxstudio.core.controller.BaseAction;
import org.nxstudio.modules.systemmanager.base.service.ParamService;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.json.JsonHelper;
import org.nxstudio.core.model.CommonActionForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * 全局参数表管理控制器
 *
 * @author XiongChun
 * @see org.nxstudio.core.controller.BaseAction
 * @since 2010-05-05
 */
@Controller
@RequestMapping("/param")
public class ParamAction extends BaseAction {
    @Autowired
    private ParamService paramService;
//    = (ParamService)super.getService("paramService");

    /**
     * 页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=init")
    public String init(HttpServletRequest request,
                       HttpServletResponse response) throws Exception {
        return "/arm/manageParam";
    }

    /**
     * 查询参数列表
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=queryParamsForManage")
    public String queryParamsForManage(HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        List paramList = g4Reader.queryForPage("Param.queryParamsForManage", dto);
        Integer pageCount = (Integer) g4Reader.queryForObject("Param.queryParamsForManageForPageCount", dto);
        String jsonString = JsonHelper.encodeList2PageJson(paramList, pageCount, null);
        write(jsonString, response);
        return null;
    }

    /**
     * 保存参数信息
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=saveParamItem")
    public String saveParamItem(HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto inDto = aForm.getParamAsDto(request);
        paramService.saveParamItem(inDto);
        setOkTipMsg("参数数据新增成功", response);
        return null;
    }

    /**
     * 删除参数信息
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=deleteParamItems")
    public String deleteParamItems(HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        String strChecked = request.getParameter("strChecked");
        Dto inDto = new BaseDto();
        inDto.put("strChecked", strChecked);
        paramService.deleteParamItem(inDto);
        setOkTipMsg("参数数据删除成功", response);
        return null;
    }

    /**
     * 修改参数信息
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=updateParamItem")
    public String updateParamItem(HttpServletRequest request,
                                  HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto inDto = aForm.getParamAsDto(request);
        paramService.updateParamItem(inDto);
        Dto outDto = new BaseDto();
        outDto.put("success", new Boolean(true));
        outDto.put("msg", "参数数据修改成功!");
        write(outDto.toJson(), response);
        return null;
    }

    /**
     * 内存同步
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=synMemory")
    public String synMemory(HttpServletRequest request,
                            HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        List paramList = g4Reader.queryForList("Resource.getParamList");
        servletContext.removeAttribute("EAPARAMLIST");
        servletContext.setAttribute("EAPARAMLIST", paramList);
        Dto outDto = new BaseDto();
        outDto.put("success", new Boolean(true));
        write(JsonHelper.encodeObject2Json(outDto), response);
        return null;
    }

}
