package org.nxstudio.modules.demo.integrate.controller;

import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.json.JsonHelper;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.modules.demo.other.service.DemoService;
import org.nxstudio.plugin.report.jasper.ReportData;
import org.nxstudio.core.controller.BaseAction;
import org.nxstudio.core.model.CommonActionForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * 综合实例Action
 *
 * @author XiongChun
 * @see org.nxstudio.core.controller.BaseAction
 * @since 2010-11-30
 */
@Controller
@RequestMapping("/integrateDemo")
public class IntegrateAction extends BaseAction {
    @Autowired
    private DemoService demoService;
//    = (DemoService) getService("demoService");


    /**
     * 查询实例1
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=queryDemo1Init")
    public String queryDemo1Init(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        return "/demo/integrate/queryDemo1";
    }

    /**
     * 存储过程调用初始化
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=callPrcInit")
    public String callPrcInit(HttpServletRequest request,
                              HttpServletResponse response) throws Exception {

        return "/demo/other/callPrc";
    }

    /**
     * 查询实例2
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=queryDemo2Init")
    public String queryDemo2Init(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        return "/demo/integrate/queryDemo2";
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
        List list = g4Reader.queryForPage("Demo.queryBalanceInfo2", dto);
        Integer countInteger = (Integer) g4Reader.queryForObject("Demo.countBalanceInfo2", dto);
        String jsonString = JsonHelper.encodeList2PageJson(list, countInteger, G4Constants.FORMAT_Date);
        super.write(jsonString, response);
        return null;
    }

    /**
     * 数据采集
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=collectDataInit")
    public String collectDataInit(HttpServletRequest request,
                                  HttpServletResponse response) throws Exception {

        return "/demo/integrate/collectData";
    }

    /**
     * 数据维护
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=manageDataInit")
    public String manageDataInit(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {

        return "/demo/integrate/manageData";
    }

    /**
     * 数据维护(4合1)
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=manageData4In1Init")
    public String manageData4In1Init(HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        removeSessionAttribute(request, "printList");
        return "/demo/integrate/manageData4In1";
    }

    /**
     * 数据采集(窗口模式)
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=collectDataByWindowInit")
    public String collectDataByWindowInit(HttpServletRequest request,
                                          HttpServletResponse response) throws Exception {

        return "/demo/integrate/collectDataByWindow";
    }

    /**
     * 查询收费项目
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=querySfxm")
    public String querySfxm(HttpServletRequest request,
                            HttpServletResponse response) throws Exception {
        CommonActionForm cForm = (CommonActionForm) form;
        Dto inDto = cForm.getParamAsDto(request);
        Dto outDto = (BaseDto) g4Reader.queryForObject("Demo.queryCatalogs2", inDto);
        if (G4Utils.isEmpty(outDto)) {
            outDto = new BaseDto();
            outDto.put("msg", "没有查询到数据");
        } else {
            outDto.put("msg", "ok");
        }
        String jsonString = JsonHelper.encodeDto2FormLoadJson(outDto, G4Constants.FORMAT_Date);
        write(jsonString, response);
        return null;
    }

    /**
     * 更新收费项目
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=updateSfxm")
    public String updateSfxm(HttpServletRequest request,
                             HttpServletResponse response) throws Exception {
        CommonActionForm cForm = (CommonActionForm) form;
        Dto inDto = cForm.getParamAsDto(request);
        inDto.put("ggsj", inDto.getAsTimestamp("ggsj"));
        demoService.updateSfxmDomain(inDto);
        setOkTipMsg("数据修改成功", response);
        return null;
    }

    /**
     * 保存收费项目
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=saveSfxmDomain")
    public String saveSfxmDomain(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto inDto = aForm.getParamAsDto(request);
        inDto.put("ggsj", inDto.getAsTimestamp("ggsj"));
        inDto.put("yybm", "03010001");
        demoService.saveSfxmDomain(inDto);
        setOkTipMsg("收费项目数据保存成功", response);
        return null;
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
        setSessionAttribute(request, "printList", list);
        Integer countInteger = (Integer) g4Reader.queryForObject("Demo.countCatalogsForGridDemo", dto);
        String jsonString = JsonHelper.encodeList2PageJson(list, countInteger, G4Constants.FORMAT_Date);
        write(jsonString, response);
        return null;
    }

    /**
     * 删除收费项目
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=deleteSfxm")
    public String deleteSfxm(HttpServletRequest request,
                             HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto inDto = aForm.getParamAsDto(request);
        demoService.deleteSfxm(inDto);
        setOkTipMsg("收费项目删除成功", response);
        return null;
    }

    /**
     * 构造报表数据对象
     */
    @RequestMapping(params = "reqCode=buildReportDataObject")
    public String buildReportDataObject(HttpServletRequest request,
                                        HttpServletResponse response) throws Exception {
        List catalogList = catalogList = (List) getSessionAttribute(request, "printList");
        removeSessionAttribute(request, "printList");
        if (G4Utils.isNotEmpty(catalogList)) {
            for (int i = 0; i < catalogList.size(); i++) {
                Dto dto2 = (BaseDto) catalogList.get(i);
                dto2.put("zfbl", dto2.getAsBigDecimal("zfbl"));
            }
        }
        Dto dto = new BaseDto();
        dto.put("reportTitle", "北京市第一人民医院收费项目明细报表(演示)");
        //制表人
        dto.put("jbr", getSessionContainer(request).getUserInfo().getUsername());
        //制表时间
        dto.put("jbsj", G4Utils.getCurrentTime());
        ReportData reportData = new ReportData();
        reportData.setParametersDto(dto);
        reportData.setFieldsList(catalogList);
        reportData.setReportFilePath("/report/jasper/demo/hisCatalogReport.jasper");
        getSessionContainer(request).setReportData("hisCatalogReport4App", reportData);
        return null;
    }

    /**
     * 调用存储过程
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=callPrc")
    public String callPrc(HttpServletRequest request,
                          HttpServletResponse response) throws Exception {
        CommonActionForm cForm = (CommonActionForm) form;
        Dto inDto = cForm.getParamAsDto(request);
        inDto.put("myname", getSessionContainer(request).getUserInfo().getUsername());
        Dto outDto = demoService.callPrc(inDto);
        String result = outDto.getAsString("result");
        result = result + " " + inDto.getAsString("number1") + "+" + inDto.getAsString("number2") + "=" + outDto.getAsString("sum");
        outDto.put("result", result);
        outDto.put("success", new Boolean(true));
        outDto.put("msg", "存储过程调用成功");
        write(outDto.toJson(), response);
        return null;
    }

    /**
     * SQL语句批处理
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=batchSql")
    public String batchSql(HttpServletRequest request,
                           HttpServletResponse response) throws Exception {
        CommonActionForm cForm = (CommonActionForm) form;
        Dto inDto = cForm.getParamAsDto(request);
        inDto.put("count", "3");
        inDto.put("ggsj", inDto.getAsTimestamp("ggsj"));
        inDto.put("yybm", "03010001");
        demoService.batchSaveSfxmDomains(inDto);
        setOkTipMsg("保存成功(以batch方式一次性向数据库服务器批量提交了3条SQL语句)", response);
        return null;
    }

}
