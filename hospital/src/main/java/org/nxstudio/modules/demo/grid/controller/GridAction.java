package org.nxstudio.modules.demo.grid.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.json.JsonHelper;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.core.controller.BaseAction;
import org.nxstudio.core.model.CommonActionForm;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 表格标准范例暨教程Action
 *
 * @author XiongChun
 * @see org.nxstudio.core.controller.BaseAction
 * @since 2010-10-23
 */
@Controller
@RequestMapping("/gridDemo")
public class GridAction extends BaseAction {

    /**
     * 表格演示一页面初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=gridDemo1Init")
    public String gridDemo1Init(HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        return "/demo/grid/gridDemo1";
    }

    /**
     * 表格演示二页面初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=gridDemo2Init")
    public String gridDemo2Init(HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        return "/demo/grid/gridDemo2";
    }

    /**
     * 表格演示三页面初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=gridDemo3Init")
    public String gridDemo3Init(HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        return "/demo/grid/gridDemo3";
    }

    /**
     * 表格演示四页面初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=gridDemo4Init")
    public String gridDemo4Init(HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        return "/demo/grid/gridDemo4";
    }

    /**
     * 表格演示五页面初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=gridDemo5Init")
    public String gridDemo5Init(HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        return "/demo/grid/gridDemo5";
    }

    /**
     * 表格演示六页面初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=gridDemo6Init")
    public String gridDemo6Init(HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        super.removeSessionAttribute(request, "GRIDACTION_QUERYBALANCEINFO_DTO");
        return "/demo/grid/gridDemo6";
    }

    /**
     * 表格演示七页面初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=gridDemo7Init")
    public String gridDemo7Init(HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        return "/demo/grid/gridDemo7";
    }

    /**
     * 查询医院收费项目数据
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=querySfxmDatas")
    public String querySfxmDatas(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        List list = g4Reader.queryForPage("Demo.queryCatalogsForGridDemo", dto);
        Integer countInteger = (Integer) g4Reader.queryForObject("Demo.countCatalogsForGridDemo", dto);
        String jsonString = JsonHelper.encodeList2PageJson(list, countInteger, G4Constants.FORMAT_Date);
        super.write(jsonString, response);
        return null;
    }

    /**
     * 查询医院结算数据
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=queryBalanceInfo")
    public String queryBalanceInfo(HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        List list = g4Reader.queryForPage("Demo.queryBalanceInfo", dto);
        Integer countInteger = (Integer) g4Reader.queryForObject("Demo.countBalanceInfo", dto);
        super.setSessionAttribute(request, "GRIDACTION_QUERYBALANCEINFO_DTO", dto);
        String jsonString = encodeList2PageJson(list, countInteger, G4Constants.FORMAT_Date);
        super.write(jsonString, response);
        return null;
    }

    /**
     * 汇总医院结算数据
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=sumBalanceInfo")
    public String sumBalanceInfo(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        Dto dto = (BaseDto) super.getSessionAttribute(request, "GRIDACTION_QUERYBALANCEINFO_DTO");
        Dto sumDto = sumDto = (BaseDto) g4Reader.queryForObject("Demo.sumBalanceInfo", dto);
        if (G4Utils.isNotEmpty(sumDto)) {
            sumDto.put("sxh", "共" + sumDto.getAsString("sxh") + "人次");
        }
        sumDto.put("success", new Boolean(true));
        String jsonString = JsonHelper.encodeObject2Json(sumDto);
        super.write(jsonString, response);
        return null;
    }

    /**
     * 保存表格脏数据
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=saveDirtyDatas")
    public String saveDirtyDatas(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        List list = aForm.getGridDirtyData(request);
        for (int i = 0; i < list.size(); i++) {
            Dto dto = (BaseDto) list.get(i);
            System.out.println("脏数据:\n" + dto);
            //todo anything what u want
        }
        Dto outDto = new BaseDto();
        outDto.put("success", new Boolean(true));
        outDto.put("msg", "数据已提交到后台,但演示程序没有将其持久化到数据库.<br>" + request.getParameter("dirtydata"));
        super.write(outDto.toJson(), response);
        return null;
    }
}
