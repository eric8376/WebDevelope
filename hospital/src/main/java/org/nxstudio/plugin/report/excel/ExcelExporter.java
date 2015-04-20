package org.nxstudio.plugin.report.excel;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.nxstudio.modules.exception.NoGroupField;
import org.nxstudio.core.model.Dto;
import org.nxstudio.util.g4.G4Utils;

/**
 * Excel导出器(适用于WebAPP)
 *
 * @author XiongChun
 * @since 2010-08-12
 */
public class ExcelExporter {

    private String templatePath;
    private Dto parametersDto;
    private List<Dto> fieldsList;
    private String filename = "Excel.xls";

    /**
     * Excel分组字段名
     */
    private String GroupFieldName;

    /**
     * 设置数据
     *
     * @param pDto  参数集合
     * @param pList 字段集合
     */
    public void setData(Dto pDto, List pList) {
        parametersDto = pDto;
        fieldsList = pList;
    }


    /**
     * 导出Excel
     *
     * @param request
     * @param response
     * @throws java.io.IOException
     */
    public void export(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/vnd.ms-excel");
        filename = G4Utils.encodeChineseDownloadFileName(request, getFilename());
        response.setHeader("Content-Disposition", "attachment; filename=" + filename + ";");
        ExcelData excelData = new ExcelData(parametersDto, fieldsList);
        ExcelTemplate excelTemplate = new ExcelTemplate();
        excelTemplate.setTemplatePath(getTemplatePath());
        excelTemplate.parse(request, 0);
        ExcelFiller excelFiller = new ExcelFiller(excelTemplate, excelData);
        ByteArrayOutputStream bos = excelFiller.fill(request);
        ServletOutputStream os = response.getOutputStream();
        os.write(bos.toByteArray());
        os.flush();
        os.close();
    }

    /**
     * 导出Excel
     *
     * @param request
     * @param response
     * @throws java.io.IOException
     */
    public void exportSheets(HttpServletRequest request, HttpServletResponse response, List<ExcelData> sheetDatas) throws IOException {
        exportSheets(request, response, sheetDatas, null);
    }

    /**
     * 分组导出Excel
     *
     * @param request
     * @param response
     * @param istInFlow 如果是在流程中导出excel就能看到价格，但是在订单管理菜单中导出excel就不能看到价格
     * @throws java.io.IOException
     */
    public void groupExport(HttpServletRequest request, HttpServletResponse response, boolean istInFlow, boolean showSubinfoAndFootInfo) throws IOException, NoGroupField {
        response.setContentType("application/vnd.ms-excel");
        filename = G4Utils.encodeChineseDownloadFileName(request, getFilename());
        response.setHeader("Content-Disposition", "attachment; filename=" + filename + ";");
        ExcelData excelData = new ExcelData(parametersDto, fieldsList, GroupFieldName);
        ExcelTemplate excelTemplate = new ExcelTemplate();
        excelTemplate.setTemplatePath(getTemplatePath());
        excelTemplate.parse(request, 0);
        ExcelFiller excelFiller = new ExcelFiller(excelTemplate, excelData);
        ByteArrayOutputStream bos = excelFiller.fillByGroup(request, istInFlow, showSubinfoAndFootInfo);
        ServletOutputStream os = response.getOutputStream();
        os.write(bos.toByteArray());
        os.flush();
        os.close();
    }

    /**
     * 分组导出Excel
     *
     * @param request
     * @param response
     * @param istInFlow 如果是在流程中导出excel就能看到价格，但是在订单管理菜单中导出excel就不能看到价格
     * @throws java.io.IOException
     */
    public void groupExportTest(HttpServletRequest request, HttpServletResponse response, boolean istInFlow, boolean showSubinfoAndFootInfo) throws IOException, NoGroupField {
        response.setContentType("application/vnd.ms-excel");
        filename = G4Utils.encodeChineseDownloadFileName(request, getFilename());
        response.setHeader("Content-Disposition", "attachment; filename=" + filename + ";");
        ExcelData excelData = new ExcelData(parametersDto, fieldsList, GroupFieldName);
        ExcelTemplate excelTemplate = new ExcelTemplate();
        excelTemplate.setTemplatePath(getTemplatePath());
        excelTemplate.parse(request, 0);
        ExcelFiller excelFiller = new ExcelFiller(excelTemplate, excelData);
        ByteArrayOutputStream bos = excelFiller.fillByGroupTest(request, istInFlow, showSubinfoAndFootInfo);
        ServletOutputStream os = response.getOutputStream();
        os.write(bos.toByteArray());
        os.flush();
        os.close();
    }


    public String getTemplatePath() {
        return templatePath;
    }

    public void setTemplatePath(String templatePath) {
        this.templatePath = templatePath;
    }

    public Dto getParametersDto() {
        return parametersDto;
    }

    public void setParametersDto(Dto parametersDto) {
        this.parametersDto = parametersDto;
    }

    public List getFieldsList() {
        return fieldsList;
    }

    public void setFieldsList(List fieldsList) {
        this.fieldsList = fieldsList;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getGroupFieldName() {
        return GroupFieldName;
    }

    public void setGroupFieldName(String groupFieldName) {
        GroupFieldName = groupFieldName;
    }

    public void exportSheets(HttpServletRequest request, HttpServletResponse response, List<ExcelData> sheetDatas, Dto pDto) throws IOException {
        if (G4Utils.isNotEmpty(sheetDatas)) {
            response.setContentType("application/vnd.ms-excel");
            filename = G4Utils.encodeChineseDownloadFileName(request, getFilename());
            response.setHeader("Content-Disposition", "attachment; filename=" + filename + ";");
            ExcelData excelData = new ExcelData(parametersDto, fieldsList);
            ExcelTemplate excelTemplate = new ExcelTemplate();
            excelTemplate.setTemplatePath(getTemplatePath());
            ExcelFiller excelFiller = new ExcelFiller(excelTemplate, excelData);
            ByteArrayOutputStream bos = excelFiller.fillSheets(request, sheetDatas, pDto);
            ServletOutputStream os = response.getOutputStream();
            os.write(bos.toByteArray());
            os.flush();
            os.close();
        }
    }
}
