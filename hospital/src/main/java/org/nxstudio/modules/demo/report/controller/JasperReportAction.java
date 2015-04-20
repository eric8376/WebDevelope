package org.nxstudio.modules.demo.report.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.plugin.report.jasper.ReportData;
import org.nxstudio.core.controller.BaseAction;
import org.nxstudio.core.model.CommonActionForm;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Applet报表标准范例暨教程Action
 *
 * @author XiongChun
 * @see org.nxstudio.core.controller.BaseAction
 * @since 2010-10-13
 */
@Controller
@RequestMapping("/jasperReportDemo")
public class JasperReportAction extends BaseAction {

    /**
     * applet报表页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=appletInit")
    public String appletInit(HttpServletRequest request,
                             HttpServletResponse response) throws Exception {
        super.getSessionContainer(request).cleanUp();
        return "/demo/jasperReport/appletReport";
    }

    /**
     * PDF报表页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=pdfInit")
    public String pdfInit(HttpServletRequest request,
                          HttpServletResponse response) throws Exception {
        super.getSessionContainer(request).cleanUp();
        return "/demo/jasperReport/pdfReport";
    }

    /**
     * 查询医院收费目录
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=queryCatalogs4Print")
    public String queryCatalogs4Print(HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto inDto = aForm.getParamAsDto(request);
        super.setSessionAttribute(request, "QUERYCATALOGS4PRINT_QUERYDTO", inDto);
        List catalogList = g4Reader.queryForPage("Demo.queryCatalogsForPrint", inDto);
        Integer pageCount = (Integer) g4Reader.queryForObject("Demo.queryCatalogsForPrintForPageCount", inDto);
        String jsonString = encodeList2PageJson(catalogList, pageCount, G4Constants.FORMAT_DateTime);
        write(jsonString, response);
        return null;
    }

    /**
     * 构造报表数据对象
     */
    @RequestMapping(params = "reqCode=buildReportDataObject")
    public String buildReportDataObject(HttpServletRequest request,
                                        HttpServletResponse response) throws Exception {
        Dto dto = new BaseDto();
        dto.put("reportTitle", "北京市第一人民医院收费项目明细报表(演示)");
        dto.put("jbr", getSessionContainer(request).getUserInfo().getUsername());
        dto.put("jbsj", G4Utils.getCurrentTime());
        Dto inDto = (BaseDto) getSessionAttribute(request, "QUERYCATALOGS4PRINT_QUERYDTO");
        List catalogList = g4Reader.queryForList("Demo.queryCatalogsForPrintLimitRows", inDto);
        int toIndex = 80;
        if (catalogList.size() <= toIndex) {
            toIndex = catalogList.size() - 1;
        }
        List subList = catalogList.subList(0, toIndex);
        for (int i = 0; i < subList.size(); i++) {
            Dto dto2 = (BaseDto) subList.get(i);
            dto2.put("zfbl", dto2.getAsBigDecimal("zfbl"));
        }
        ReportData reportData = new ReportData();
        reportData.setParametersDto(dto);
        reportData.setFieldsList(subList);
        reportData.setReportFilePath("/report/jasper/demo/hisCatalogReport.jasper");
        getSessionContainer(request).setReportData("hisCatalogReport", reportData);
        return null;
    }

}
