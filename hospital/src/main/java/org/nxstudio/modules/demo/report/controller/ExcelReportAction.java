package org.nxstudio.modules.demo.report.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.upload.FormFile;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.plugin.report.excel.ExcelExporter;
import org.nxstudio.plugin.report.excel.ExcelReader;
import org.nxstudio.core.controller.BaseAction;
import org.nxstudio.core.model.CommonActionForm;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Excel导入导出标准范例暨教程Action
 *
 * @author XiongChun
 * @see org.nxstudio.core.controller.BaseAction
 * @since 2010-10-13
 */
@Controller
@RequestMapping("/excelReportDemo")
public class ExcelReportAction extends BaseAction {

    /**
     * Excel导出页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=exportInit")
    public String exportInit(HttpServletRequest request,
                             HttpServletResponse response) throws Exception {
        removeSessionAttribute(request, "QUERYCATALOGS4EXPORT_QUERYDTO");
        return "/demo/excelReport/exportExcel";
    }

    /**
     * 查询医院收费目录
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=queryCatalogs4Export")
    public String queryCatalogs4Export(HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto inDto = aForm.getParamAsDto(request);
        super.setSessionAttribute(request, "QUERYCATALOGS4EXPORT_QUERYDTO", inDto);
        List catalogList = g4Reader.queryForPage("Demo.queryCatalogsForPrint", inDto);
        Integer pageCount = (Integer) g4Reader.queryForObject("Demo.queryCatalogsForPrintForPageCount", inDto);
        String jsonString = encodeList2PageJson(catalogList, pageCount, G4Constants.FORMAT_DateTime);
        write(jsonString, response);
        return null;
    }

    /**
     * 导入Excel
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=importExcel")
    public String importExcel(HttpServletRequest request,
                              HttpServletResponse response) throws Exception {
        CommonActionForm actionForm = (CommonActionForm) form;
        FormFile theFile = actionForm.getTheFile();
        String metaData = "xmid,xmmc,xmrj,gg,dw,jx,zfbl,cd,ggsj";
        ExcelReader excelReader = new ExcelReader(metaData, theFile.getInputStream());
        List list = excelReader.read(3, 1);
        super.setSessionAttribute(request, "importExcelList", list);
        setOkTipMsg("导入成功", response);
        return null;
    }

    /**
     * 查询医院收费目录
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=queryCatalogs4Import")
    public String queryCatalogs4Import(HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        List catalogList = (List) super.getSessionAttribute(request, "importExcelList");
        Integer pageCount = new Integer(1); // 演示数据默认在一页上显示
        String jsonString = encodeList2PageJson(catalogList, pageCount, G4Constants.FORMAT_Date);
        write(jsonString, response);
        return null;
    }

    /**
     * Excel导出
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=exportExcel")
    public String exportExcel(HttpServletRequest request,
                              HttpServletResponse response) throws Exception {
        Dto parametersDto = new BaseDto();
        parametersDto.put("reportTitle", "北京市第一人民医院收费项目表");
        parametersDto.put("jbr", super.getSessionContainer(request).getUserInfo().getUsername());
        parametersDto.put("jbsj", G4Utils.getCurrentTime());
        Dto inDto = (BaseDto) super.getSessionAttribute(request, "QUERYCATALOGS4EXPORT_QUERYDTO");
        inDto.put("rownum", "500");
        List fieldsList = g4Reader.queryForList("Demo.queryCatalogsForPrintLimitRows", inDto);
        int toIndex = 80;
        if (fieldsList.size() <= toIndex) {
            toIndex = fieldsList.size() - 1;
        }
        List subList = fieldsList.subList(0, toIndex);
        parametersDto.put("countXmid", new Integer(subList.size()));// 合计条数
        ExcelExporter excelExporter = new ExcelExporter();
        excelExporter.setTemplatePath("/report/excel/demo/hisCatalogReport.xls");
        excelExporter.setData(parametersDto, subList);
        excelExporter.setFilename("北京市第一人民医院收费项目表.xls");
        excelExporter.export(request, response);
        return null;
    }

    /**
     * Excel导出
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=exportExcel2")
    public String exportExcel2(HttpServletRequest request,
                               HttpServletResponse response) throws Exception {
        Dto parametersDto = new BaseDto();
        parametersDto.put("reportTitle", "北京市第一人民医院收费项目表");
        parametersDto.put("jbr", super.getSessionContainer(request).getUserInfo().getUsername());
        parametersDto.put("jbsj", G4Utils.getCurrentTime());
        Dto inDto = (BaseDto) super.getSessionAttribute(request, "QUERYCATALOGS4EXPORT_QUERYDTO");
        inDto.put("rownum", "500");
        List fieldsList = g4Reader.queryForList("Demo.queryCatalogsForPrintLimitRows", inDto);
        int toIndex = 80;
        if (fieldsList.size() <= toIndex) {
            toIndex = fieldsList.size() - 1;
        }
        List subList = fieldsList.subList(0, toIndex);
        parametersDto.put("countXmid", new Integer(subList.size()));// 合计条数
        ExcelExporter excelExporter = new ExcelExporter();
        excelExporter.setTemplatePath("/report/excel/demo/hisCatalogReport2.xls");
        excelExporter.setData(parametersDto, subList);
        excelExporter.setFilename("北京市第一人民医院收费项目表.xls");
        excelExporter.export(request, response);
        return null;
    }

    /**
     * Excel导出
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=exportExcel3")
    public String exportExcel3(HttpServletRequest request,
                               HttpServletResponse response) throws Exception {
        Dto parametersDto = new BaseDto();
        parametersDto.put("reportTitle", "北京市第一人民医院收费项目表");
        parametersDto.put("jbr", super.getSessionContainer(request).getUserInfo().getUsername());
        parametersDto.put("jbsj", G4Utils.getCurrentTime());
        parametersDto.put("d1_1", "100.00");
        ExcelExporter excelExporter = new ExcelExporter();
        excelExporter.setTemplatePath("/report/excel/demo/hisCatalogReport3.xls");
        List fuckList = new ArrayList();
        excelExporter.setData(parametersDto, fuckList);
        excelExporter.setFilename("北京市第一人民医院收费项目表.xls");
        excelExporter.export(request, response);
        return null;
    }

    /**
     * Excel导入页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=importInit")
    public String importInit(HttpServletRequest request,
                             HttpServletResponse response) throws Exception {
        super.removeSessionAttribute(request, "importExcelList");
        return "/demo/excelReport/importExcel";
    }

}
