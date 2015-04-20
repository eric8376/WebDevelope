package org.nxstudio.plugin.report.excel;

import org.nxstudio.modules.exception.NoGroupField;
import jxl.Cell;
import jxl.Workbook;
import jxl.format.Alignment;
import jxl.format.Border;
import jxl.format.BorderLineStyle;
import jxl.format.Colour;
import jxl.format.*;
import jxl.write.*;
import jxl.write.Number;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.hssf.util.Region;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDomain;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.core.model.impl.BaseVo;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.util.g4.G4Utils;

import javax.servlet.http.HttpServletRequest;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Excel数据填充器
 *
 * @author XiongChun
 * @since 2010-08-12
 */
public class ExcelFiller {

    private Log log = LogFactory.getLog(ExcelFiller.class);

    private ExcelTemplate excelTemplate = null;

    private ExcelData excelData = null;
    List<String> sheetnames = Arrays.asList(new String[]{"国内手卫生依从性汇总表", "国内正确性汇总表", "国内知识考核汇总表", "手卫生依从性汇总"});
    List<String> EX_field = Arrays.asList(new String[]{"deptname", "course_name"});
    private int cur_num = 0;
    private int curRow = 0;

    public ExcelFiller() {
    }


    /**
     * 构造函数
     *
     * @param pExcelTemplate
     * @param pExcelData
     */
    public ExcelFiller(ExcelTemplate pExcelTemplate, ExcelData pExcelData) {
        setExcelData(pExcelData);
        setExcelTemplate(pExcelTemplate);
    }

    /**
     * 数据填充 将ExcelData填入excel模板
     *
     * @return ByteArrayOutputStream
     */
    public ByteArrayOutputStream fill(HttpServletRequest request) {
        WritableSheet wSheet = null;
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        try {
            InputStream is = request.getSession().getServletContext().getResourceAsStream(getExcelTemplate().getTemplatePath());
            Workbook wb = Workbook.getWorkbook(is);
            WritableWorkbook wwb = Workbook.createWorkbook(bos, wb);
            wSheet = wwb.getSheet(0);
            fillStatics(wSheet);
            fillParameters(wSheet);
            fillFields(wSheet, null);
            if (G4Utils.isNotEmpty(getExcelData().getFieldsList())) {
                // fillFields(wSheet);
            }
            wwb.write();
            wwb.close();
            wb.close();
        } catch (Exception e) {
            log.error(G4Constants.Exception_Head + "基于模板生成可写工作表出错了!");
            e.printStackTrace();
        }
        return bos;
    }

    public ByteArrayOutputStream fillSheets(HttpServletRequest request, List<ExcelData> sheetDatas) {
        return fillSheets(request, sheetDatas, null);
    }

    /**
     * 写入静态对象
     */
    private void fillStatics(WritableSheet wSheet) {
        List statics = getExcelTemplate().getStaticObject();
        for (int i = 0; i < statics.size(); i++) {
            Cell cell = (Cell) statics.get(i);
            Label label = new Label(cell.getColumn(), cell.getRow(), cell.getContents());
            label.setCellFormat(cell.getCellFormat());
            try {
                wSheet.addCell(label);
            } catch (Exception e) {
                log.error(G4Constants.Exception_Head + "写入静态对象发生错误!");
                e.printStackTrace();
            }
        }
    }

    /**
     * 写入表格字段对象
     *
     * @throws Exception
     */
    private void fillFields(WritableSheet wSheet, Dto pdto) throws Exception {
        List fields = getExcelTemplate().getFieldObjct();
        List fieldList = getExcelData().getFieldsList();
        String GroupField = G4Utils.isNotEmpty(pdto) ? pdto.getAsString("GroupField") : "";
        int startIndex = 0, groupCount = 0;
        for (int j = 0; j < fieldList.size(); j++) {
            int listSize=fieldList.size();
            boolean isLastRow=(j==listSize-1?true:false);
            Dto dataDto = new BaseDto();
            Object object = fieldList.get(j);
            Object next_object = isLastRow?null:fieldList.get(j+1);
            Dto next_dataDto = new BaseDto();
            if (object instanceof BaseDomain) {
                BaseDomain domain = (BaseDomain) object;
                dataDto.putAll(domain.toDto());
                if(G4Utils.isNotEmpty(next_object))
                {
                    BaseDomain next_domain = (BaseDomain) next_object;
                    next_dataDto.putAll(next_domain.toDto());
                }
            } else if (object instanceof BaseVo) {
                BaseVo vo = (BaseVo) object;
                dataDto.putAll(vo.toDto());
                if(G4Utils.isNotEmpty(next_object))
                {
                    BaseVo next_vo = (BaseVo) next_object;
                    next_dataDto.putAll(next_vo.toDto());
                }

            } else if (object instanceof BaseDto) {
                Dto dto = (BaseDto) object;
                dataDto.putAll(dto);
                if(G4Utils.isNotEmpty(next_object))
                {
                    Dto next_dto = (BaseDto) next_object;
                    next_dataDto.putAll(next_dto);
                }
            } else {
                log.error(G4Constants.Exception_Head + "不支持的数据类型!");
            }
            insertRow(fields, j + groupCount, dataDto, wSheet);
            Dto newSummarizeData =new BaseDto();

            if (G4Utils.isNotEmpty(GroupField)) {
                String next_GroupField=next_dataDto.getAsString(GroupField);
                next_GroupField=G4Utils.isEmpty(next_GroupField)?"":next_GroupField;
                if (isLastRow||!next_GroupField.equals(dataDto.getAsString(GroupField))) {
                    //通过sheet名称获取改组的合计数据
                    List subFieldList = fieldList.subList(startIndex,j+1);
                    newSummarizeData = getGroupData(subFieldList, fields, wSheet,GroupField);
                    //保存数据到excel
                    if (G4Utils.isNotEmpty(newSummarizeData)) {
                        groupCount += 1;
                        insertRow(fields, j + groupCount, newSummarizeData, wSheet);
                        startIndex = j+1;
                    }
                }
            }

        }
        int row = 0;
        row += fieldList.size();
        if (G4Utils.isEmpty(fieldList)) {
            if (G4Utils.isNotEmpty(fields)) {
                Cell cell = (Cell) fields.get(0);
                row = cell.getRow();
                wSheet.removeRow(row + 5);
                wSheet.removeRow(row + 4);
                wSheet.removeRow(row + 3);
                wSheet.removeRow(row + 2);
                wSheet.removeRow(row + 1);
                wSheet.removeRow(row);
            }
        } else {
            Cell cell = (Cell) fields.get(0);
            row += cell.getRow();
            fillVariables(wSheet, row+groupCount);
        }
    }

    /**
     * 写入参数对象
     */
    private void fillParameters(WritableSheet wSheet) {
        List parameters = getExcelTemplate().getParameterObjct();
        Dto parameterDto = getExcelData().getParametersDto();
        for (int i = 0; i < parameters.size(); i++) {
            Cell cell = (Cell) parameters.get(i);
            String key = getKey(cell.getContents().trim());
            String type = getType(cell.getContents().trim());
            try {
                if (type.equalsIgnoreCase(G4Constants.ExcelTPL_DataType_Number)) {
                    Number number = new Number(cell.getColumn(), cell.getRow(), parameterDto.getAsBigDecimal(key)
                            .doubleValue());
                    number.setCellFormat(cell.getCellFormat());
                    wSheet.addCell(number);
                } else {
                    Label label = new Label(cell.getColumn(), cell.getRow(), parameterDto.getAsString(key));
                    label.setCellFormat(cell.getCellFormat());
                    wSheet.addCell(label);
                }
            } catch (Exception e) {
                log.error(G4Constants.Exception_Head + "写入表格参数对象发生错误!");
                e.printStackTrace();
            }
        }
    }

    /**
     * 写入变量对象
     */
    private void fillVariables(WritableSheet wSheet, int row) {
        List variables = getExcelTemplate().getVariableObject();
        Dto parameterDto = getExcelData().getParametersDto();
        for (int i = 0; i < variables.size(); i++) {
            Cell cell = (Cell) variables.get(i);
            String key = getKey(cell.getContents().trim());
            String type = getType(cell.getContents().trim());
            try {
                if (type.equalsIgnoreCase(G4Constants.ExcelTPL_DataType_Number)) {
                    Number number = new Number(cell.getColumn(), row, parameterDto.getAsBigDecimal(key).doubleValue());
                    number.setCellFormat(cell.getCellFormat());
                    wSheet.addCell(number);
                } else {
                    String content = parameterDto.getAsString(key);
                    if (G4Utils.isEmpty(content) && !key.equalsIgnoreCase("nbsp")) {
                        content = key;
                    }
                    Label label = new Label(cell.getColumn(), row, content);
                    label.setCellFormat(cell.getCellFormat());
                    wSheet.addCell(label);
                }
            } catch (Exception e) {
                log.error(G4Constants.Exception_Head + "写入表格变量对象发生错误!");
                e.printStackTrace();
            }
        }
    }

    /**
     * 数据填充 将ExcelData分组填入excel模板
     *
     * @return ByteArrayOutputStream
     */
    public ByteArrayOutputStream fillByGroup(HttpServletRequest request, boolean isInFlow, boolean showSubinfoAndFootInfo) throws NoGroupField {
        String groupfieldname = getExcelData().getGroupFieldName();
        if (groupfieldname.isEmpty()) {
            //没有指定分组字段时，抛出自定义异常
            throw new NoGroupField();
        }
        List fields = getExcelTemplate().getFieldObjct();
        List<Dto> fieldList = new ArrayList<Dto>();
        List<Dto> manyPageList = new ArrayList<Dto>();
        if (showSubinfoAndFootInfo) {
            fieldList = getExcelData().getFieldsList();
        } else {
            manyPageList = getExcelData().getFieldsList();
        }
        Dto parametersDto = getExcelData().getParametersDto();
        List<Dto> fieldNameList = new ArrayList<Dto>();
        //对传进来的list对象按指定分组的字段进行排序 ，这里先忽略，因为本来传进来的就是有顺序的，就省事了
//        ListSortUtil.anyProperSort()
        //定义一个字段，表示当前第几组分组，默认为1
        cur_num = 0;
        //定义一个字段,用于保存当前记录的分组字段的值。在循环list时，如果二者不同就新建一行excel，设置0单元格为CurGroup[cur_num],并合并从1到fields长度的单元格
        String CurGroupName = "";
        WritableSheet wSheet = null;
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        try {
            InputStream is = request.getSession().getServletContext().getResourceAsStream(getExcelTemplate().getTemplatePath());
            Workbook wb = Workbook.getWorkbook(is);
            WritableWorkbook wwb = Workbook.createWorkbook(bos, wb);
            // 循环list
            boolean end = true;
            int endPage = manyPageList.size();
            int i = 0;
            while (end) {
                //定义个个数，保存当前插入数据的行号。因为分组时，会添加一行静态数据，不存在与list中，所以用循环list时的j是不行的
                curRow = 0;
                WritableFont font = new WritableFont(WritableFont.ARIAL, 12, WritableFont.BOLD, false, UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
                if (showSubinfoAndFootInfo) {
                    wSheet = wwb.getSheet(0);
                    fillStatics(wSheet);
                    fillParameters(wSheet);
                    end = false;
                } else {
                    if (manyPageList.size() != 0) {
                        if (i > 2) {
                            wwb.createSheet(manyPageList.get(i).getAsString("sheetNmae"), i);
                            wSheet = wwb.getSheet(i);
//                          MakeColumnHeader(fieldNameList, wSheet, fields,Colour.YELLOW)  ;

                        } else {
                            wSheet = wwb.getSheet(i);
                            wSheet.setName(manyPageList.get(i).getAsString("sheetNmae"));
                        }
                        wSheet.mergeCells(0, 0, 11, 1);////合并单元格，参数格式（开始列，开始行，结束列，结束行）
                        fillStatics(wSheet);
                        fillParameters(wSheet);
                        fieldList = manyPageList.get(i).getAsList("var");
                        if (i == endPage - 1) {
                            end = false;
                        } else {
                            i++;
                        }
                    } else {
                        end = false;
                    }
                }
                for (int j = 0; j < fieldList.size(); j++) {
                    Dto dataDto = new BaseDto();
                    Object object = fieldList.get(j);
                    if (object instanceof BaseDomain) {
                        BaseDomain domain = (BaseDomain) object;
                        dataDto.putAll(domain.toDto());
                    } else if (object instanceof BaseVo) {
                        BaseVo vo = (BaseVo) object;
                        dataDto.putAll(vo.toDto());
                    } else if (object instanceof BaseDto) {
                        Dto dto = (BaseDto) object;
                        dataDto.putAll(dto);
                    } else {
                        log.error(G4Constants.Exception_Head + "不支持的数据类型!");
                    }
                    //如果当前的分组字段的值不一样就新增一行
                    if (!CurGroupName.equals(dataDto.getAsString(groupfieldname))) {
                        if (j != 0) {
                            if (showSubinfoAndFootInfo) {
                                MakeSubtotalRow(wSheet, fields, CurGroupName, parametersDto, isInFlow);    //新增小计，如果isInFlow为true就显示合计的价格
                            }

                        }
                        CurGroupName = dataDto.getAsString(groupfieldname);
                        //新增分组行
                        MakeGroupRow(wSheet, fields, CurGroupName);

                        if (isInFlow)   //在流程里的导出excel才要其他费用明细
                        {
                            if (CurGroupName.equals("其他费用"))  //如果是其他费用，就新增一行其他费用的列头
                            {
                                fieldNameList = new ArrayList<Dto>();
                                Dto FieldNameDto = new BaseDto();
                                FieldNameDto.put("header", "序号");
                                FieldNameDto.put("value", "no");
                                fieldNameList.add(FieldNameDto);
                                FieldNameDto = new BaseDto();
                                FieldNameDto.put("header", "项目名称");
                                FieldNameDto.put("value", "expens");
                                fieldNameList.add(FieldNameDto);
                                FieldNameDto = new BaseDto();
                                FieldNameDto.put("header", "项目金额");
                                FieldNameDto.put("value", "unit_price");
                                fieldNameList.add(FieldNameDto);
                                MakeColumnHeader(fieldNameList, wSheet, fields, null);

                            } else if (CurGroupName.equals("成品件部件费用(不参与打折)"))  //如果是其他费用，就新增一行其他费用的列头
                            {
                                fieldNameList = new ArrayList<Dto>();
                                Dto FieldNameDto = new BaseDto();
                                FieldNameDto.put("header", "序号");
                                FieldNameDto.put("value", "no");
                                fieldNameList.add(FieldNameDto);
                                FieldNameDto = new BaseDto();
                                FieldNameDto.put("header", "设计件编号");
                                FieldNameDto.put("value", "design_no");
                                fieldNameList.add(FieldNameDto);
                                FieldNameDto = new BaseDto();
                                FieldNameDto.put("header", "成品件编号");
                                FieldNameDto.put("value", "product_no");
                                fieldNameList.add(FieldNameDto);
                                FieldNameDto = new BaseDto();
                                FieldNameDto.put("header", "数量");
                                FieldNameDto.put("value", "num");
                                fieldNameList.add(FieldNameDto);
                                FieldNameDto = new BaseDto();
                                FieldNameDto.put("header", "费用名称");
                                FieldNameDto.put("value", "costname");
                                fieldNameList.add(FieldNameDto);
                                FieldNameDto = new BaseDto();
                                FieldNameDto.put("header", "费用金额");
                                FieldNameDto.put("value", "unit_price");
                                fieldNameList.add(FieldNameDto);
                                MakeColumnHeader(fieldNameList, wSheet, fields, null);
                            }
                        }
                    }
                    WriteData(fieldNameList, wSheet, fields, dataDto);
                    if (j == fieldList.size() - 1) {
                        if (showSubinfoAndFootInfo) {
                            MakeSubtotalRow(wSheet, fields, CurGroupName, parametersDto, isInFlow);    //新增小计，如果isInFlow为true就显示合计的价格
                        }

                    }

                    if (j == fieldList.size() - 1) {
                        curRow++;
                        curRow++;
                        curRow++;
                        curRow++;
                        if (showSubinfoAndFootInfo) {
                            MakeFootData(wSheet, fields, parametersDto, isInFlow);
                        }

                    }

                }
            }
            if (G4Utils.isEmpty(fieldList)) {
                if (G4Utils.isNotEmpty(fields)) {
                    wSheet.removeRow(curRow + 5);
                    wSheet.removeRow(curRow + 4);
                    wSheet.removeRow(curRow + 3);
                    wSheet.removeRow(curRow + 2);
                    wSheet.removeRow(curRow + 1);
                    wSheet.removeRow(curRow);
                }
            }
//            else {
//                fillVariables(wSheet, curRow+3);
//            }
            wwb.write();
            wwb.close();
            wb.close();

        } catch (Exception e) {
            log.error(G4Constants.Exception_Head + "基于模板生成可写工作表出错了!");
            e.printStackTrace();
        }
        return bos;
    }


    private static void inserCell(HSSFSheet ws, short rowNum, short couNum, HSSFCellStyle style, HSSFRichTextString hssfRichTextString, short height) {

        HSSFRow row = ws.createRow(rowNum);
        HSSFCell cell = row.createCell(couNum);
        cell.setCellStyle(style);
        cell.setCellValue(hssfRichTextString);
    }

    /**
     * 导出EXCEL测试
     *
     * @param request
     * @param isInFlow
     * @param showSubinfoAndFootInfo
     * @return
     * @throws NoGroupField
     */
    public ByteArrayOutputStream fillByGroupTest(HttpServletRequest request, boolean isInFlow, boolean showSubinfoAndFootInfo) throws NoGroupField {
        String groupfieldname = getExcelData().getGroupFieldName();
        if (groupfieldname.isEmpty()) {
            //没有指定分组字段时，抛出自定义异常
            throw new NoGroupField();
        }
        List<Dto> fieldList = new ArrayList<Dto>();

//        fieldList = getExcelData().getFieldsList();
        Integer pageCount = ((Dto) (((List) getExcelData().getFieldsList().get(0)).get(1))).getAsInteger("page");

        Dto parametersDto = getExcelData().getParametersDto();
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        try {
            InputStream bis = request.getSession().getServletContext().getResourceAsStream(getExcelTemplate().getTemplatePath());
            POIFSFileSystem fs = new POIFSFileSystem(bis);
            HSSFWorkbook wb = new HSSFWorkbook(fs);
//            FileOutputStream fileOut= new FileOutputStream(getExcelTemplate().getTemplatePath());

            HSSFCellStyle styleVar = wb.createCellStyle();
            HSSFFont fVar = wb.createFont();
            fVar.setFontHeightInPoints((short) 12);
            fVar.setBoldweight(HSSFFont.BOLDWEIGHT_NORMAL);
            fVar.setFontName("宋体");
            styleVar.setFont(fVar);
            styleVar.setWrapText(true);
            styleVar.setAlignment(HSSFCellStyle.ALIGN_CENTER);
            styleVar.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
            styleVar.setBorderBottom(HSSFCellStyle.BORDER_THIN);//下边框
            styleVar.setBorderLeft(HSSFCellStyle.BORDER_THIN);//左边框
            styleVar.setBorderRight(HSSFCellStyle.BORDER_THIN);//右边框
            styleVar.setBorderTop(HSSFCellStyle.BORDER_THIN);//上边框


            HSSFCellStyle styleTtile = wb.createCellStyle();
            HSSFFont fTtile = wb.createFont();
            fTtile.setFontHeightInPoints((short) 10);
            fTtile.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
            fTtile.setFontName("宋体");
            styleTtile.setFont(fTtile);
            styleTtile.setAlignment(HSSFCellStyle.ALIGN_CENTER);
            styleTtile.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
            styleTtile.setBorderBottom(HSSFCellStyle.BORDER_THIN);//下边框
            styleTtile.setBorderLeft(HSSFCellStyle.BORDER_THIN);//左边框
            styleTtile.setBorderRight(HSSFCellStyle.BORDER_THIN);//右边框
            styleTtile.setBorderTop(HSSFCellStyle.BORDER_THIN);//上边框

            HSSFCellStyle styleTop = wb.createCellStyle();
            HSSFFont fTop = wb.createFont();
            fTop.setFontHeightInPoints((short) 10);
            fTop.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
            fTop.setFontName("宋体");
            styleTop.setFont(fTtile);
            styleTop.setAlignment(HSSFCellStyle.ALIGN_CENTER);
            styleTop.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
            styleTop.setBorderBottom(HSSFCellStyle.BORDER_THIN);//下边框
            styleTop.setBorderLeft(HSSFCellStyle.BORDER_THIN);//左边框
            styleTop.setBorderRight(HSSFCellStyle.BORDER_THIN);//右边框
            styleTop.setBorderTop(HSSFCellStyle.BORDER_MEDIUM);//上边框


            HSSFCellStyle styleFirstTop = wb.createCellStyle();
            HSSFFont fFirstTop = wb.createFont();
            fFirstTop.setFontHeightInPoints((short) 10);
            fFirstTop.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
            fFirstTop.setFontName("宋体");
            styleFirstTop.setFont(fTtile);
            styleFirstTop.setAlignment(HSSFCellStyle.ALIGN_CENTER);
            styleFirstTop.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
            styleFirstTop.setBorderBottom(HSSFCellStyle.BORDER_THIN);//下边框
            styleFirstTop.setBorderLeft(HSSFCellStyle.BORDER_MEDIUM);//左边框
            styleFirstTop.setBorderRight(HSSFCellStyle.BORDER_THIN);//右边框
            styleFirstTop.setBorderTop(HSSFCellStyle.BORDER_MEDIUM);//上边框


            HSSFCellStyle styleBigTitle = wb.createCellStyle();
            HSSFFont fBigTtile = wb.createFont();
            fBigTtile.setFontHeightInPoints((short) 20);
            fBigTtile.setBoldweight(HSSFFont.BOLDWEIGHT_NORMAL);
            fBigTtile.setFontName("华文行楷");
            styleBigTitle.setFont(fBigTtile);
            styleBigTitle.setWrapText(true);
            styleBigTitle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
            styleBigTitle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
            styleBigTitle.setBorderBottom(HSSFCellStyle.BORDER_THIN);//下边框
            styleBigTitle.setBorderLeft(HSSFCellStyle.BORDER_THIN);//左边框
            styleBigTitle.setBorderRight(HSSFCellStyle.BORDER_THIN);//右边框
            styleBigTitle.setBorderTop(HSSFCellStyle.BORDER_THIN);//上边框
//            styleBigTitle.setFillBackgroundColor(HSSFColor.GREY_25_PERCENT.index);
            styleBigTitle.setFillForegroundColor(HSSFColor.GREY_25_PERCENT.index);
            styleBigTitle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);


            HSSFCellStyle styleBigbigTitle = wb.createCellStyle();
            HSSFFont fBigbigTtile = wb.createFont();
            fBigbigTtile.setFontHeightInPoints((short) 20);
            fBigbigTtile.setBoldweight(HSSFFont.BOLDWEIGHT_NORMAL);
            fBigbigTtile.setFontName("华文行楷");
            styleBigbigTitle.setFont(fBigTtile);
            styleBigbigTitle.setWrapText(true);
            styleBigbigTitle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
            styleBigbigTitle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
            styleBigbigTitle.setBorderBottom(HSSFCellStyle.BORDER_THIN);//下边框
            styleBigbigTitle.setBorderLeft(HSSFCellStyle.BORDER_MEDIUM);//左边框
            styleBigbigTitle.setBorderRight(HSSFCellStyle.BORDER_THIN);//右边框
            styleBigbigTitle.setBorderTop(HSSFCellStyle.BORDER_THIN);//上边框
//            styleBigTitle.setFillBackgroundColor(HSSFColor.GREY_25_PERCENT.index);
            styleBigbigTitle.setFillForegroundColor(HSSFColor.GREY_25_PERCENT.index);
            styleBigbigTitle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);

            HSSFCellStyle styleBeiZhu = wb.createCellStyle();
            HSSFFont fBeiZhu = wb.createFont();
            fBeiZhu.setFontHeightInPoints((short) 10);
            fBeiZhu.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
            fBeiZhu.setFontName("仿宋");
            styleBeiZhu.setFont(fTtile);
            styleBeiZhu.setAlignment(HSSFCellStyle.ALIGN_LEFT);
            styleBeiZhu.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);


            HSSFCellStyle styleNull = wb.createCellStyle();
            HSSFFont fNull = wb.createFont();
            fNull.setFontHeightInPoints((short) 10);
            fNull.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
            fNull.setFontName("仿宋");
            styleNull.setFont(fTtile);
            styleNull.setAlignment(HSSFCellStyle.ALIGN_LEFT);
            styleNull.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
            styleNull.setBorderBottom(HSSFCellStyle.BORDER_THIN);//下边框
            styleNull.setBorderLeft(HSSFCellStyle.BORDER_THIN);//左边框
            styleNull.setBorderRight(HSSFCellStyle.BORDER_THIN);//右边框
            styleNull.setBorderTop(HSSFCellStyle.BORDER_THIN);//上边框


            HSSFCellStyle styleRight = wb.createCellStyle();
            HSSFFont fRight = wb.createFont();
            fRight.setFontHeightInPoints((short) 10);
            fRight.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
            fRight.setFontName("仿宋");
            styleRight.setFont(fTtile);
            styleRight.setAlignment(HSSFCellStyle.ALIGN_LEFT);
            styleRight.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
            styleRight.setBorderBottom(HSSFCellStyle.BORDER_THIN);//下边框
            styleRight.setBorderLeft(HSSFCellStyle.BORDER_THIN);//左边框
            styleRight.setBorderRight(HSSFCellStyle.BORDER_MEDIUM);//右边框
            styleRight.setBorderTop(HSSFCellStyle.BORDER_THIN);//上边框


            HSSFCellStyle styleBottom = wb.createCellStyle();
            HSSFFont fBottom = wb.createFont();
            fBottom.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
            fBottom.setFontName("仿宋");
            styleBottom.setFont(fTtile);
            styleBottom.setAlignment(HSSFCellStyle.ALIGN_LEFT);
            styleBottom.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
            styleBottom.setBorderBottom(HSSFCellStyle.BORDER_MEDIUM);//下边框
            styleBottom.setBorderLeft(HSSFCellStyle.BORDER_THIN);//左边框
            styleBottom.setBorderRight(HSSFCellStyle.BORDER_MEDIUM);//右边框
            styleBottom.setBorderTop(HSSFCellStyle.BORDER_THIN);//上边框
            for (int n = 0; n < pageCount; n++) {
                if (n >= 2) {
                    wb.createSheet();
                }
                HSSFSheet ws = wb.getSheetAt(n + 1);
//                ((Dto)(((List)getExcelData().getFieldsList().get(0)).get(0))).getAsInteger("page")

                fieldList = (List<Dto>) ((List) getExcelData().getFieldsList().get(1)).get(n);
                int i = 0;
                int dzj = 0;
                int bzj = 0;
                int pj = 0;
                int qt = 0;
                ws.setColumnWidth((short) 0, (short) (15 * 256));
                ws.setColumnWidth((short) 1, (short) (10 * 256));
                ws.setColumnWidth((short) 2, (short) (11 * 256));
                ws.setColumnWidth((short) 3, (short) (11 * 256));
                ws.setColumnWidth((short) 4, (short) (6 * 256));
                ws.setColumnWidth((short) 5, (short) (7 * 256));
                ws.setColumnWidth((short) 6, (short) (6 * 256));
                ws.setColumnWidth((short) 7, (short) (12 * 256));
                ws.setColumnWidth((short) 8, (short) (14 * 256));
                ws.setColumnWidth((short) 9, (short) (9 * 256));
                ws.setColumnWidth((short) 10, (short) (10 * 256));
                ws.setColumnWidth((short) 11, (short) (14 * 256));
                ws.setColumnWidth((short) 12, (short) (17 * 256));
                ws.setColumnWidth((short) 13, (short) (10 * 256));
                ws.setColumnWidth((short) 14, (short) (10 * 256));

                Region region = new Region((short) 0, (short) 0, (short) 1, (short) 14);
                ws.addMergedRegion(region);

                HSSFCellStyle style = wb.createCellStyle();
                HSSFFont f = wb.createFont();
                f.setFontHeightInPoints((short) 36);
                f.setBoldweight(HSSFFont.BOLDWEIGHT_NORMAL);
                f.setFontName("华文行楷");
                style.setFont(f);
                style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
                style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
                HSSFRow row = ws.createRow((short) 0);
                HSSFCell cell = row.createCell((short) 0);
                cell.setCellStyle(style);
                HSSFRichTextString hssfRichTextString = new HSSFRichTextString("芝麻游售票系统excel");
                cell.setCellValue(hssfRichTextString);


//            wf = new WritableFont(WritableFont.createFont("仿宋") , 14, WritableFont.BOLD);
                style = wb.createCellStyle();
                f = wb.createFont();
                f.setFontHeightInPoints((short) 14);
                f.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
                f.setFontName("仿宋");
                style.setFont(f);
                style.setAlignment(HSSFCellStyle.ALIGN_LEFT);
                style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
                for (int w = 0; w < 5; w++) {
                    ws.addMergedRegion(new Region((short) (2 + w), (short) 1, (short) (2 + w), (short) 7));
                    ws.addMergedRegion(new Region((short) (2 + w), (short) 8, (short) (2 + w), (short) 14));
                    switch (w) {
                        case 0:
                            style.setAlignment(HSSFCellStyle.ALIGN_LEFT);
                            row = ws.createRow((short) (2 + w));
                            cell = row.createCell((short) 0);
                            cell.setCellStyle(style);
                            hssfRichTextString = new HSSFRichTextString("工程单编号:");
                            cell.setCellValue(hssfRichTextString);
                            cell = row.createCell((short) 1);
                            cell.setCellStyle(style);
                            hssfRichTextString = new HSSFRichTextString(parametersDto.getAsString("ordernumber"));
                            cell.setCellValue(hssfRichTextString);
                            break;
                        case 1:
                            style.setAlignment(HSSFCellStyle.ALIGN_LEFT);
                            row = ws.createRow((short) (2 + w));
                            cell = row.createCell((short) 0);
                            cell.setCellStyle(style);
                            hssfRichTextString = new HSSFRichTextString("工程名称:");
                            cell.setCellValue(hssfRichTextString);
                            cell = row.createCell((short) 1);
                            cell.setCellStyle(style);
                            hssfRichTextString = new HSSFRichTextString(parametersDto.getAsString("projectname"));
                            cell.setCellValue(hssfRichTextString);
                            break;
                        case 2:
                            style.setAlignment(HSSFCellStyle.ALIGN_LEFT);
                            row = ws.createRow((short) (2 + w));
                            cell = row.createCell((short) 0);
                            cell.setCellStyle(style);
                            hssfRichTextString = new HSSFRichTextString("打印日期：");
                            cell.setCellValue(hssfRichTextString);
                            cell = row.createCell((short) 1);
                            cell.setCellStyle(style);
                            hssfRichTextString = new HSSFRichTextString(parametersDto.getAsString("PrinterDate"));
                            cell.setCellValue(hssfRichTextString);
                            break;
                        case 3:
                            style.setAlignment(HSSFCellStyle.ALIGN_LEFT);
                            row = ws.createRow((short) (2 + w));
                            cell = row.createCell((short) 0);
                            cell.setCellStyle(style);
                            hssfRichTextString = new HSSFRichTextString("客户经理：");
                            cell.setCellValue(hssfRichTextString);
                            cell = row.createCell((short) 1);
                            cell.setCellStyle(style);
                            hssfRichTextString = new HSSFRichTextString(parametersDto.getAsString("business"));
                            cell.setCellValue(hssfRichTextString);
                            break;
                        case 4:
                            style.setAlignment(HSSFCellStyle.ALIGN_LEFT);
                            row = ws.createRow((short) (2 + w));
                            cell = row.createCell((short) 0);
                            cell.setCellStyle(style);
                            hssfRichTextString = new HSSFRichTextString("客服人员：");
                            cell.setCellValue(hssfRichTextString);
                            cell = row.createCell((short) 1);
                            cell.setCellStyle(style);
                            hssfRichTextString = new HSSFRichTextString(parametersDto.getAsString("service"));
                            cell.setCellValue(hssfRichTextString);
                            break;
                    }
                }

                style = wb.createCellStyle();
                f = wb.createFont();
                f.setFontHeightInPoints((short) 14);
                f.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
                f.setFontName("仿宋");
                style.setFont(f);
                style.setAlignment(HSSFCellStyle.ALIGN_RIGHT);
                style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
                row = ws.createRow((short) 5);
                cell = row.createCell((short) 8);
                cell.setCellStyle(style);
                hssfRichTextString = new HSSFRichTextString("总部地址：福建省厦门市软件园二期望海路16号6楼");
                cell.setCellValue(hssfRichTextString);
                row = ws.createRow((short) 6);
                cell = row.createCell((short) 8);
                cell.setCellStyle(style);
                hssfRichTextString = new HSSFRichTextString("全国免费电话：400-6656800");
                cell.setCellValue(hssfRichTextString);


                ws.addMergedRegion(new Region((short) 7, (short) 0, (short) 7, (short) 14));

                int start = 9;
                for (int m = 0; m < fieldList.size(); m++) {
                    List<Dto> varList = (List<Dto>) fieldList.get(m);
                    if (varList.size() != 0) {
                        if (varList.get(0).containsKey("b_name")) {
                            ws.addMergedRegion(new Region((short) start, (short) 1, (short) (start + varList.size() - 1), (short) 1));
                            inserCell(ws, (short) 8, (short) 0, styleFirstTop, new HSSFRichTextString("项目类别"), (short) 0);
                            inserCell(ws, (short) 8, (short) 1, styleTop, new HSSFRichTextString("件型类别"), (short) 0);
                            inserCell(ws, (short) 8, (short) 2, styleTop, new HSSFRichTextString("序号"), (short) 0);
                            ws.addMergedRegion(new Region((short) 8, (short) 3, (short) 8, (short) 4));
                            inserCell(ws, (short) 8, (short) 3, styleTop, new HSSFRichTextString("货柜名称"), (short) 0);
                            inserCell(ws, (short) 8, (short) 4, styleTop, new HSSFRichTextString(""), (short) 0);
                            ws.addMergedRegion(new Region((short) 8, (short) 5, (short) 8, (short) 6));
                            inserCell(ws, (short) 8, (short) 5, styleTop, new HSSFRichTextString("货柜编号"), (short) 0);
                            inserCell(ws, (short) 8, (short) 6, styleTop, new HSSFRichTextString(""), (short) 0);
                            ws.addMergedRegion(new Region((short) 8, (short) 7, (short) 8, (short) 8));
                            inserCell(ws, (short) 8, (short) 7, styleTop, new HSSFRichTextString("规格尺寸(长*宽*高)"), (short) 0);
                            inserCell(ws, (short) 8, (short) 8, styleTop, new HSSFRichTextString(""), (short) 0);
                            inserCell(ws, (short) 8, (short) 9, styleTop, new HSSFRichTextString("单价"), (short) 0);
                            inserCell(ws, (short) 8, (short) 10, styleTop, new HSSFRichTextString("套数"), (short) 0);
                            ws.addMergedRegion(new Region((short) 8, (short) 11, (short) 8, (short) 12));
                            inserCell(ws, (short) 8, (short) 11, styleTop, new HSSFRichTextString("详细说明"), (short) 0);
                            inserCell(ws, (short) 8, (short) 12, styleTop, new HSSFRichTextString(""), (short) 0);
                            ws.addMergedRegion(new Region((short) 8, (short) 13, (short) 8, (short) 14));
                            inserCell(ws, (short) 8, (short) 13, styleTop, new HSSFRichTextString("总价(元)"), (short) 0);
                            inserCell(ws, (short) 8, (short) 14, styleTop, new HSSFRichTextString(""), (short) 0);
                            inserCell(ws, (short) start, (short) 1, styleBigTitle, new HSSFRichTextString("标\r\n准\r\n件"), (short) 0);
                            for (int w = start + 1; i <= start + varList.size() - 1; i++) {
                                inserCell(ws, (short) w, (short) 1, styleBigTitle, new HSSFRichTextString(""), (short) 0);
                            }
                        } else if (varList.get(0).containsKey("d_name")) {

                            ws.addMergedRegion(new Region((short) start, (short) 1, (short) (start + varList.size()), (short) 1));
                            inserCell(ws, (short) start, (short) 2, styleTtile, new HSSFRichTextString("序号"), (short) 0);
                            ws.addMergedRegion(new Region((short) start, (short) 3, (short) start, (short) 4));
                            inserCell(ws, (short) start, (short) 3, styleTtile, new HSSFRichTextString("货柜名称"), (short) 0);
                            inserCell(ws, (short) start, (short) 4, styleTtile, new HSSFRichTextString(""), (short) 0);
                            ws.addMergedRegion(new Region((short) start, (short) 5, (short) start, (short) 6));
                            inserCell(ws, (short) start, (short) 5, styleTtile, new HSSFRichTextString("货柜编号"), (short) 0);
                            inserCell(ws, (short) start, (short) 6, styleTtile, new HSSFRichTextString(""), (short) 0);
                            ws.addMergedRegion(new Region((short) start, (short) 7, (short) start, (short) 8));
                            inserCell(ws, (short) start, (short) 7, styleTtile, new HSSFRichTextString("规格尺寸(长*宽*高)"), (short) 0);
                            inserCell(ws, (short) start, (short) 8, styleTtile, new HSSFRichTextString(""), (short) 0);
                            inserCell(ws, (short) start, (short) 9, styleTtile, new HSSFRichTextString("单价"), (short) 0);
                            inserCell(ws, (short) start, (short) 10, styleTtile, new HSSFRichTextString("套数"), (short) 0);
                            ws.addMergedRegion(new Region((short) start, (short) 11, (short) start, (short) 12));
                            inserCell(ws, (short) start, (short) 11, styleTtile, new HSSFRichTextString("详细说明"), (short) 0);
                            inserCell(ws, (short) start, (short) 12, styleTtile, new HSSFRichTextString(""), (short) 0);
                            ws.addMergedRegion(new Region((short) start, (short) 13, (short) start, (short) 14));
                            inserCell(ws, (short) start, (short) 13, styleTtile, new HSSFRichTextString("总价(元)"), (short) 0);
                            inserCell(ws, (short) start, (short) 14, styleTtile, new HSSFRichTextString(""), (short) 0);
                            inserCell(ws, (short) start, (short) 1, styleBigTitle, new HSSFRichTextString("定\r\n制\r\n件"), (short) 0);
                            for (int w = start + 1; i <= start + varList.size() - 1; i++) {
                                inserCell(ws, (short) w, (short) 1, styleBigTitle, new HSSFRichTextString(""), (short) 0);
                            }
                        } else if (varList.get(0).containsKey("p_name")) {

                            ws.addMergedRegion(new Region((short) start + 1, (short) 1, (short) (start + varList.size() + 1), (short) 1));
                            inserCell(ws, (short) (start + 1), (short) 2, styleTtile, new HSSFRichTextString("序号"), (short) 0);
                            ws.addMergedRegion(new Region((short) (start + 1), (short) 3, (short) (start + 1), (short) 4));
                            inserCell(ws, (short) (start + 1), (short) 3, styleTtile, new HSSFRichTextString("货柜名称"), (short) 0);
                            inserCell(ws, (short) (start + 1), (short) 4, styleTtile, new HSSFRichTextString(""), (short) 0);
                            ws.addMergedRegion(new Region((short) (start + 1), (short) 5, (short) (start + 1), (short) 6));
                            inserCell(ws, (short) (start + 1), (short) 5, styleTtile, new HSSFRichTextString("货柜编号"), (short) 0);
                            inserCell(ws, (short) (start + 1), (short) 6, styleTtile, new HSSFRichTextString(""), (short) 0);
                            ws.addMergedRegion(new Region((short) (start + 1), (short) 7, (short) (start + 1), (short) 8));
                            inserCell(ws, (short) (start + 1), (short) 7, styleTtile, new HSSFRichTextString("规格尺寸(长*宽*高)"), (short) 0);
                            inserCell(ws, (short) (start + 1), (short) 8, styleTtile, new HSSFRichTextString(""), (short) 0);
                            inserCell(ws, (short) (start + 1), (short) 9, styleTtile, new HSSFRichTextString("单价"), (short) 0);
                            inserCell(ws, (short) (start + 1), (short) 10, styleTtile, new HSSFRichTextString("套数"), (short) 0);
                            ws.addMergedRegion(new Region((short) (start + 1), (short) 11, (short) (start + 1), (short) 12));
                            inserCell(ws, (short) (start + 1), (short) 11, styleTtile, new HSSFRichTextString("详细说明"), (short) 0);
                            inserCell(ws, (short) (start + 1), (short) 12, styleTtile, new HSSFRichTextString(""), (short) 0);
                            ws.addMergedRegion(new Region((short) (start + 1), (short) 13, (short) (start + 1), (short) 14));
                            inserCell(ws, (short) (start + 1), (short) 13, styleTtile, new HSSFRichTextString("总价(元)"), (short) 0);
                            inserCell(ws, (short) (start + 1), (short) 14, styleTtile, new HSSFRichTextString(""), (short) 0);
                            inserCell(ws, (short) (start + 1), (short) 1, styleBigTitle, new HSSFRichTextString("现\r\n场\r\n成\r\n品"), (short) 0);
                            for (int w = start + 2; i <= start + varList.size() + 1; i++) {
                                inserCell(ws, (short) w, (short) 1, styleBigTitle, new HSSFRichTextString(""), (short) 0);
                            }
                        } else if (varList.get(0).containsKey("q_name")) {

                            ws.addMergedRegion(new Region((short) start + 2, (short) 1, (short) (start + varList.size() + 2), (short) 1));
                            inserCell(ws, (short) (start + 2), (short) 2, styleTtile, new HSSFRichTextString("序号"), (short) 0);
                            ws.addMergedRegion(new Region((short) (start + 2), (short) 3, (short) (start + 2), (short) 8));
                            inserCell(ws, (short) (start + 2), (short) 3, styleTtile, new HSSFRichTextString("花费名称"), (short) 0);
                            inserCell(ws, (short) (start + 2), (short) 9, styleTtile, new HSSFRichTextString("单价"), (short) 0);
                            inserCell(ws, (short) (start + 2), (short) 10, styleTtile, new HSSFRichTextString("数量"), (short) 0);
                            ws.addMergedRegion(new Region((short) (start + 2), (short) 11, (short) (start + 2), (short) 12));
                            inserCell(ws, (short) (start + 2), (short) 11, styleTtile, new HSSFRichTextString("详细说明"), (short) 0);
                            inserCell(ws, (short) (start + 2), (short) 12, styleTtile, new HSSFRichTextString(""), (short) 0);
                            ws.addMergedRegion(new Region((short) (start + 2), (short) 13, (short) (start + 2), (short) 14));
                            inserCell(ws, (short) (start + 2), (short) 13, styleTtile, new HSSFRichTextString("总价(元)"), (short) 0);
                            inserCell(ws, (short) (start + 2), (short) 14, styleTtile, new HSSFRichTextString(""), (short) 0);
                            inserCell(ws, (short) (start + 2), (short) 1, styleBigTitle, new HSSFRichTextString("其\r\n他\r\n费\r\n用"), (short) 0);
                            for (int w = start + 3; i <= start + varList.size() + 2; i++) {
                                inserCell(ws, (short) w, (short) 1, styleBigTitle, new HSSFRichTextString(""), (short) 0);
                            }
                        }
                        start += varList.size();
                    }
                    for (int w = 0; w < varList.size(); w++) {
                        Dto varDto = varList.get(w);
                        if (varDto.containsKey("b_name")) {
                            short height = (short) (varDto.getAsString("b_detail").split("                        ").length * 10 + 10);
                            inserCell(ws, (short) (w + 9), (short) 2, styleVar, new HSSFRichTextString(varDto.getAsString("b_no")), height);
                            ws.addMergedRegion(new Region((short) (w + 9), (short) 3, (short) (w + 9), (short) 4));
                            inserCell(ws, (short) (w + 9), (short) 3, styleVar, new HSSFRichTextString(varDto.getAsString("b_name")), height);
                            inserCell(ws, (short) (w + 9), (short) 4, styleVar, new HSSFRichTextString(""), height);
                            ws.addMergedRegion(new Region((short) (w + 9), (short) 5, (short) (w + 9), (short) 6));
                            inserCell(ws, (short) (w + 9), (short) 5, styleVar, new HSSFRichTextString(varDto.getAsString("b_num")), height);
                            inserCell(ws, (short) (w + 9), (short) 6, styleVar, new HSSFRichTextString(""), height);
                            ws.addMergedRegion(new Region((short) (w + 9), (short) 7, (short) (w + 9), (short) 8));
                            inserCell(ws, (short) (w + 9), (short) 7, styleVar, new HSSFRichTextString(varDto.getAsString("b_size")), height);
                            inserCell(ws, (short) (w + 9), (short) 8, styleVar, new HSSFRichTextString(""), height);
                            inserCell(ws, (short) (w + 9), (short) 9, styleVar, new HSSFRichTextString(varDto.getAsString("b_unit")), height);
                            inserCell(ws, (short) (w + 9), (short) 10, styleVar, new HSSFRichTextString(varDto.getAsString("b_peice")), height);
                            ws.addMergedRegion(new Region((short) (w + 9), (short) 11, (short) (w + 9), (short) 12));
                            inserCell(ws, (short) (w + 9), (short) 11, styleVar, new HSSFRichTextString(varDto.getAsString("b_detail")), height);
                            inserCell(ws, (short) (w + 9), (short) 12, styleVar, new HSSFRichTextString(""), height);
                            ws.addMergedRegion(new Region((short) (w + 9), (short) 13, (short) (w + 9), (short) 14));
                            inserCell(ws, (short) (w + 9), (short) 13, styleVar, new HSSFRichTextString(varDto.getAsString("b_allmoney")), height);
                            inserCell(ws, (short) (w + 9), (short) 14, styleVar, new HSSFRichTextString(""), height);
                            bzj++;
                        } else if (varDto.containsKey("d_name")) {
                            short height = (short) (varDto.getAsString("b_detail").split("                        ").length * 10 + 10);
                            inserCell(ws, (short) (w + bzj + 10), (short) 2, styleVar, new HSSFRichTextString(varDto.getAsString("d_no")), height);
                            ws.addMergedRegion(new Region((short) (w + bzj + 10), (short) 3, (short) (w + bzj + 10), (short) 4));
                            inserCell(ws, (short) (w + bzj + 10), (short) 3, styleVar, new HSSFRichTextString(varDto.getAsString("d_name")), height);
                            inserCell(ws, (short) (w + bzj + 10), (short) 4, styleVar, new HSSFRichTextString(""), height);
                            ws.addMergedRegion(new Region((short) (w + bzj + 10), (short) 5, (short) (w + bzj + 10), (short) 6));
                            inserCell(ws, (short) (w + bzj + 10), (short) 5, styleVar, new HSSFRichTextString(varDto.getAsString("d_num")), height);
                            inserCell(ws, (short) (w + bzj + 10), (short) 6, styleVar, new HSSFRichTextString(""), height);
                            ws.addMergedRegion(new Region((short) (w + bzj + 10), (short) 7, (short) (w + bzj + 10), (short) 8));
                            inserCell(ws, (short) (w + bzj + 10), (short) 7, styleVar, new HSSFRichTextString(varDto.getAsString("d_size")), height);
                            inserCell(ws, (short) (w + bzj + 10), (short) 8, styleVar, new HSSFRichTextString(""), height);
                            inserCell(ws, (short) (w + bzj + 10), (short) 9, styleVar, new HSSFRichTextString(varDto.getAsString("d_unit")), height);
                            inserCell(ws, (short) (w + bzj + 10), (short) 10, styleVar, new HSSFRichTextString(varDto.getAsString("d_peice")), height);
                            ws.addMergedRegion(new Region((short) (w + bzj + 10), (short) 11, (short) (w + bzj + 10), (short) 12));
                            inserCell(ws, (short) (w + bzj + 10), (short) 11, styleVar, new HSSFRichTextString(varDto.getAsString("d_detail")), height);
                            inserCell(ws, (short) (w + bzj + 10), (short) 12, styleVar, new HSSFRichTextString(""), height);
                            ws.addMergedRegion(new Region((short) (w + bzj + 10), (short) 13, (short) (w + bzj + 10), (short) 14));
                            inserCell(ws, (short) (w + bzj + 10), (short) 13, styleVar, new HSSFRichTextString(varDto.getAsString("d_allmoney")), height);
                            inserCell(ws, (short) (w + bzj + 10), (short) 14, styleVar, new HSSFRichTextString(""), height);
                            dzj++;
                        } else if (varDto.containsKey("p_name")) {
                            short height = (short) (varDto.getAsString("b_detail").split("                        ").length * 10 + 10);
                            inserCell(ws, (short) (w + bzj + dzj + 11), (short) 2, styleVar, new HSSFRichTextString(varDto.getAsString("p_no")), height);
                            ws.addMergedRegion(new Region((short) (w + bzj + dzj + 11), (short) 3, (short) (w + bzj + dzj + 11), (short) 4));
                            inserCell(ws, (short) (w + bzj + dzj + 11), (short) 3, styleVar, new HSSFRichTextString(varDto.getAsString("p_name")), height);
                            inserCell(ws, (short) (w + bzj + dzj + 11), (short) 4, styleVar, new HSSFRichTextString(""), height);
                            ws.addMergedRegion(new Region((short) (w + bzj + dzj + 11), (short) 5, (short) (w + bzj + dzj + 11), (short) 6));
                            inserCell(ws, (short) (w + bzj + dzj + 11), (short) 5, styleVar, new HSSFRichTextString(varDto.getAsString("p_num")), height);
                            inserCell(ws, (short) (w + bzj + dzj + 11), (short) 6, styleVar, new HSSFRichTextString(""), height);
                            ws.addMergedRegion(new Region((short) (w + bzj + dzj + 11), (short) 7, (short) (w + bzj + dzj + 11), (short) 8));
                            inserCell(ws, (short) (w + bzj + dzj + 11), (short) 7, styleVar, new HSSFRichTextString(varDto.getAsString("p_size")), height);
                            inserCell(ws, (short) (w + bzj + dzj + 11), (short) 8, styleVar, new HSSFRichTextString(""), height);
                            inserCell(ws, (short) (w + bzj + dzj + 11), (short) 9, styleVar, new HSSFRichTextString(varDto.getAsString("p_unit")), height);
                            inserCell(ws, (short) (w + bzj + dzj + 11), (short) 10, styleVar, new HSSFRichTextString(varDto.getAsString("p_peice")), height);
                            ws.addMergedRegion(new Region((short) (w + bzj + dzj + 11), (short) 11, (short) (w + bzj + dzj + 11), (short) 12));
                            inserCell(ws, (short) (w + bzj + dzj + 11), (short) 11, styleVar, new HSSFRichTextString(varDto.getAsString("p_detail")), height);
                            inserCell(ws, (short) (w + bzj + dzj + 11), (short) 12, styleVar, new HSSFRichTextString(""), height);
                            ws.addMergedRegion(new Region((short) (w + bzj + dzj + 11), (short) 13, (short) (w + bzj + dzj + 11), (short) 14));
                            inserCell(ws, (short) (w + bzj + dzj + 11), (short) 13, styleVar, new HSSFRichTextString(varDto.getAsString("p_allmoney")), height);
                            inserCell(ws, (short) (w + bzj + dzj + 11), (short) 14, styleVar, new HSSFRichTextString(""), height);
                            pj++;
                        } else if (varDto.containsKey("q_name")) {
                            inserCell(ws, (short) (w + bzj + dzj + pj + 12), (short) 2, styleVar, new HSSFRichTextString(varDto.getAsString("q_no")), (short) 0);
                            ws.addMergedRegion(new Region((short) (w + bzj + dzj + pj + 12), (short) 3, (short) (w + bzj + dzj + pj + 12), (short) 8));
                            inserCell(ws, (short) (w + bzj + dzj + pj + 12), (short) 3, styleVar, new HSSFRichTextString(varDto.getAsString("q_name")), (short) 0);
                            inserCell(ws, (short) (w + bzj + dzj + pj + 12), (short) 4, styleVar, new HSSFRichTextString(""), (short) 0);
                            inserCell(ws, (short) (w + bzj + dzj + pj + 12), (short) 5, styleVar, new HSSFRichTextString(""), (short) 0);
                            inserCell(ws, (short) (w + bzj + dzj + pj + 12), (short) 6, styleVar, new HSSFRichTextString(""), (short) 0);
                            inserCell(ws, (short) (w + bzj + dzj + pj + 12), (short) 7, styleVar, new HSSFRichTextString(""), (short) 0);
                            inserCell(ws, (short) (w + bzj + dzj + pj + 12), (short) 8, styleVar, new HSSFRichTextString(""), (short) 0);
                            inserCell(ws, (short) (w + bzj + dzj + pj + 12), (short) 9, styleVar, new HSSFRichTextString("未知"), (short) 0);
                            inserCell(ws, (short) (w + bzj + dzj + pj + 12), (short) 10, styleVar, new HSSFRichTextString(varDto.getAsString("q_allpeice")), (short) 0);
                            ws.addMergedRegion(new Region((short) (w + bzj + dzj + pj + 12), (short) 11, (short) (w + bzj + dzj + pj + 12), (short) 12));
                            inserCell(ws, (short) (w + bzj + dzj + pj + 12), (short) 11, styleVar, new HSSFRichTextString("此项具体只显示最总价格"), (short) 0);
                            inserCell(ws, (short) (w + bzj + dzj + pj + 12), (short) 12, styleVar, new HSSFRichTextString(""), (short) 0);
                            ws.addMergedRegion(new Region((short) (w + bzj + dzj + pj + 12), (short) 13, (short) (w + bzj + dzj + pj + 12), (short) 14));
                            inserCell(ws, (short) (w + bzj + dzj + pj + 12), (short) 13, styleVar, new HSSFRichTextString(varDto.getAsString("q_allmoney")), (short) 0);
                            inserCell(ws, (short) (w + bzj + dzj + pj + 12), (short) 14, styleVar, new HSSFRichTextString(""), (short) 0);
                            qt++;
                        }
                    }
                }

                ws.addMergedRegion(new Region((short) 9, (short) 0, (short) (9 + dzj + bzj), (short) 0));
                for (int m = 9; m <= 9 + dzj + bzj + pj + qt + 2; m++) {
                    inserCell(ws, (short) m, (short) 0, styleBigbigTitle, new HSSFRichTextString(""), (short) 0);
                }
                inserCell(ws, (short) 9, (short) 0, styleBigbigTitle, new HSSFRichTextString("货\r\n柜\r\n工\r\n程"), (short) 0);
                ws.addMergedRegion(new Region((short) (9 + dzj + bzj + 1), (short) 0, (short) (9 + dzj + bzj + pj + 1), (short) 0));
                inserCell(ws, (short) (9 + dzj + bzj + 1), (short) 0, styleBigbigTitle, new HSSFRichTextString("现\r\n场\r\n成\r\n品"), (short) 0);
                ws.addMergedRegion(new Region((short) (9 + dzj + bzj + pj + 2), (short) 0, (short) (9 + dzj + bzj + pj + qt + 2), (short) 0));
                inserCell(ws, (short) (9 + dzj + bzj + pj + 2), (short) 0, styleBigbigTitle, new HSSFRichTextString("其\r\n他\r\n费\r\n用"), (short) 0);

                ws.addMergedRegion(new Region((short) (9 + dzj + bzj + pj + qt + 3), (short) 0, (short) (9 + dzj + bzj + pj + qt + 3), (short) 1));
                inserCell(ws, (short) (9 + dzj + bzj + pj + qt + 3), (short) 0, styleBigbigTitle, new HSSFRichTextString("合计"), (short) 20);
                ws.addMergedRegion(new Region((short) (9 + dzj + bzj + pj + qt + 3), (short) 2, (short) (9 + dzj + bzj + pj + qt + 3), (short) 10));
//            ws.addMergedRegion(new Region((short)(9+dzj+bzj+pj+qt+3),(short)5,(short)(9+dzj+bzj+pj+qt+3),(short)6));
//            ws.addMergedRegion(new Region((short)(9+dzj+bzj+pj+qt+3),(short)7,(short)(9+dzj+bzj+pj+qt+3),(short)8));
//            ws.addMergedRegion(new Region((short)(9+dzj+bzj+pj+qt+3),(short)9,(short)(9+dzj+bzj+pj+qt+3),(short)10));
                ws.addMergedRegion(new Region((short) (9 + dzj + bzj + pj + qt + 3), (short) 11, (short) (9 + dzj + bzj + pj + qt + 3), (short) 12));
                ws.addMergedRegion(new Region((short) (9 + dzj + bzj + pj + qt + 3), (short) 13, (short) (9 + dzj + bzj + pj + qt + 3), (short) 14));
                inserCell(ws, (short) (9 + dzj + bzj + pj + qt + 3), (short) 1, styleNull, new HSSFRichTextString(""), (short) 20);
                inserCell(ws, (short) (9 + dzj + bzj + pj + qt + 3), (short) 3, styleNull, new HSSFRichTextString(""), (short) 20);
                inserCell(ws, (short) (9 + dzj + bzj + pj + qt + 3), (short) 4, styleNull, new HSSFRichTextString(""), (short) 20);
                inserCell(ws, (short) (9 + dzj + bzj + pj + qt + 3), (short) 5, styleNull, new HSSFRichTextString(""), (short) 20);
                inserCell(ws, (short) (9 + dzj + bzj + pj + qt + 3), (short) 6, styleNull, new HSSFRichTextString(""), (short) 20);
                inserCell(ws, (short) (9 + dzj + bzj + pj + qt + 3), (short) 7, styleNull, new HSSFRichTextString(""), (short) 20);
                inserCell(ws, (short) (9 + dzj + bzj + pj + qt + 3), (short) 8, styleNull, new HSSFRichTextString(""), (short) 20);
                inserCell(ws, (short) (9 + dzj + bzj + pj + qt + 3), (short) 9, styleNull, new HSSFRichTextString(""), (short) 20);
                inserCell(ws, (short) (9 + dzj + bzj + pj + qt + 3), (short) 10, styleNull, new HSSFRichTextString(""), (short) 20);
                inserCell(ws, (short) (9 + dzj + bzj + pj + qt + 3), (short) 11, styleBigTitle, new HSSFRichTextString("完整款项"), (short) 20);
                inserCell(ws, (short) (9 + dzj + bzj + pj + qt + 3), (short) 12, styleBigTitle, new HSSFRichTextString(""), (short) 20);
                inserCell(ws, (short) (9 + dzj + bzj + pj + qt + 3), (short) 13, styleNull, new HSSFRichTextString(((Dto) (((List) getExcelData().getFieldsList().get(0)).get(0))).getAsString("allMoney_" + n).toString()), (short) 20);
                inserCell(ws, (short) (9 + dzj + bzj + pj + qt + 3), (short) 14, styleNull, new HSSFRichTextString(""), (short) 20);
                ws.addMergedRegion(new Region((short) (9 + dzj + bzj + pj + qt + 4), (short) 0, (short) (9 + dzj + bzj + pj + qt + 4), (short) 1));
                ws.addMergedRegion(new Region((short) (9 + dzj + bzj + pj + qt + 4), (short) 2, (short) (9 + dzj + bzj + pj + qt + 4), (short) 14));
                inserCell(ws, (short) (9 + dzj + bzj + pj + qt + 4), (short) 0, styleBigbigTitle, new HSSFRichTextString("备注"), (short) 20);
                inserCell(ws, (short) (9 + dzj + bzj + pj + qt + 4), (short) 1, styleBigTitle, new HSSFRichTextString(""), (short) 20);

                ws.addMergedRegion(new Region((short) (9 + dzj + bzj + pj + qt + 5), (short) 1, (short) (9 + dzj + bzj + pj + qt + 5), (short) 14));
                ws.addMergedRegion(new Region((short) (9 + dzj + bzj + pj + qt + 6), (short) 1, (short) (9 + dzj + bzj + pj + qt + 6), (short) 14));
                ws.addMergedRegion(new Region((short) (9 + dzj + bzj + pj + qt + 7), (short) 1, (short) (9 + dzj + bzj + pj + qt + 7), (short) 14));
                ws.addMergedRegion(new Region((short) (9 + dzj + bzj + pj + qt + 8), (short) 1, (short) (9 + dzj + bzj + pj + qt + 8), (short) 14));
                ws.addMergedRegion(new Region((short) (9 + dzj + bzj + pj + qt + 9), (short) 1, (short) (9 + dzj + bzj + pj + qt + 9), (short) 14));

                inserCell(ws, (short) (9 + dzj + bzj + pj + qt + 5), (short) 0, styleBeiZhu, new HSSFRichTextString("注"), (short) 0);
                inserCell(ws, (short) (9 + dzj + bzj + pj + qt + 6), (short) 1, styleBeiZhu, new HSSFRichTextString("1.因实际尺寸有可能与图纸有偏差，我方承诺最终以卖场内实际尺寸结算，我方将以多还少补的原则进行结算。因此造成的诸多不便，还请贵方谅解。"), (short) 0);
                inserCell(ws, (short) (9 + dzj + bzj + pj + qt + 7), (short) 1, styleBeiZhu, new HSSFRichTextString("2.低柜表面可按甲方要求免费提供丝印,其他添加及更改工艺费用另计,本报价不含未报项目，如有增改另行补报，追加预算"), (short) 0);
                inserCell(ws, (short) (9 + dzj + bzj + pj + qt + 8), (short) 1, styleBeiZhu, new HSSFRichTextString("3.本报价仅供参考，具体货柜数量以实际为准。"), (short) 0);
                inserCell(ws, (short) (9 + dzj + bzj + pj + qt + 9), (short) 1, styleBeiZhu, new HSSFRichTextString("5.此报价为合同附件，作为具体施工项目的依据。"), (short) 0);

                ws.addMergedRegion(new Region((short) (9 + dzj + bzj + pj + qt + 11), (short) 11, (short) (9 + dzj + bzj + pj + qt + 11), (short) 14));
                inserCell(ws, (short) (9 + dzj + bzj + pj + qt + 11), (short) 11, styleBeiZhu, new HSSFRichTextString("甲方签认"), (short) 0);

                for (int index = 9; index <= (9 + dzj + bzj + pj + qt + 4); index++) {
                    HSSFRow rowIn = ws.createRow(index);
                    HSSFCell cellIn = row.createCell((short) 14);
                    inserCell(ws, (short) index, (short) 14, styleRight, cellIn.getRichStringCellValue(), (short) 0);
                }
                for (int w = 2; w <= 14; w++) {

                    inserCell(ws, (short) (9 + dzj + bzj + pj + qt + 4), (short) w, styleBottom, new HSSFRichTextString(""), (short) 0);
                }
            }
            List<Dto> allclassifydescribe = getExcelData().getParametersDto().getAsList("AllClassifyDescribe");//获取产品分类，该数据将写入到第二个excel工作空间
            Integer CountMaxOfSubClassify = getExcelData().getParametersDto().getAsInteger("CountMaxOfSubClassify");//获取产品分类最大子类数量
            if (pageCount + 1 > 2) {
                wb.createSheet();
            }
            HSSFSheet sheet2 = wb.getSheetAt(pageCount + 1);//获取excel第三个工作空间
            wb.setSheetName(0, "宏页，空白页");
            wb.setSheetName(pageCount + 1, "产品编码规则");
            if (pageCount == 1) {
                wb.setSheetName(1, "报价明细");
            } else {
                for (int m = 0; m < pageCount; m++) {
                    wb.setSheetName(m + 1, ((Dto) (((List) getExcelData().getFieldsList().get(0)).get(0))).getAsString(String.valueOf(m)).toString());
                }
            }
            sheet2.setColumnWidth((short) 0, (short) (17 * 256));
            sheet2.setColumnWidth((short) 1, (short) (17 * 256));
            int startpoi_out = 1;
            if (G4Utils.isNotEmpty(allclassifydescribe)) {
                inserCell(sheet2, (short) 0, (short) 0, styleTop, new HSSFRichTextString("产品分类名称"), (short) 0);
                sheet2.addMergedRegion(new Region((short) 0, (short) 1, (short) 0, (short) CountMaxOfSubClassify.intValue()));
                inserCell(sheet2, (short) 0, (short) 1, styleTop, new HSSFRichTextString("产品子类名称"), (short) 0);
                for (int j = 0; j < allclassifydescribe.size(); j++) {
                    Dto temp = allclassifydescribe.get(j);
                    String p_classify_id = temp.getAsString("p_classify_id");
                    if (G4Utils.isEmpty(p_classify_id)) {
                        int rowtemp = startpoi_out++;
                        inserCell(sheet2, (short) (rowtemp), (short) 0, styleTop, new HSSFRichTextString(temp.getAsString("classifytype")), (short) 0);
                        boolean start_ = false;
                        int startpoi_in = 1;
                        for (int m = 0; m < allclassifydescribe.size(); m++) {
                            Dto temp_in = allclassifydescribe.get(m);
                            if (temp_in.getAsString("p_classify_id").equals(temp.getAsString("classify_id"))) {
                                start_ = true;
                                inserCell(sheet2, (short) (rowtemp), (short) (startpoi_in++), styleVar, new HSSFRichTextString(temp_in.getAsString("classifytype")), (short) 0);
                            }
                        }
                        for (int n = 0; n < CountMaxOfSubClassify - (startpoi_in - 1); n++) {

                            inserCell(sheet2, (short) (rowtemp), (short) (startpoi_in + n), styleVar, new HSSFRichTextString(""), (short) 0);

                        }
                    }

                }
                inserCell(sheet2, (short) (startpoi_out + 2), (short) 0, styleBeiZhu, new HSSFRichTextString("注："), (short) 0);
                inserCell(sheet2, (short) (startpoi_out + 3), (short) 0, styleBeiZhu, new HSSFRichTextString("以E和W开头的是定制件"), (short) 0);
                inserCell(sheet2, (short) (startpoi_out + 4), (short) 0, styleBeiZhu, new HSSFRichTextString("E表示根据标准件基础上进行修改的定制件（如拉长、缩短、变更颜色等）"), (short) 0);
                inserCell(sheet2, (short) (startpoi_out + 5), (short) 0, styleBeiZhu, new HSSFRichTextString("W表示完全定制件，根据客户特殊需求的制作，需打样"), (short) 0);

                inserCell(sheet2, (short) (startpoi_out + 6), (short) 0, styleBeiZhu, new HSSFRichTextString("例如："), (short) 0);
                inserCell(sheet2, (short) (startpoi_out + 7), (short) 0, styleBeiZhu, new HSSFRichTextString("ZG-GG就表示是展柜下的高柜"), (short) 0);

            }

//            for(int w=0;w<=19;w++){
//                HSSFRow rowIn = ws.createRow(8);
//                HSSFCell cellIn = row.createCell((short)w);
//                inserCell(ws,(short)8,(short)w,styleTop,cellIn.getRichStringCellValue());
//            }


//            for(int index=0;index<=19;index++){
//                HSSFRow rowIn = ws.createRow(8);
//                HSSFCell cellIn = row.createCell((short)index);
//                inserCell(ws,(short)(9+dzj+bzj+pj+qt+4),(short)(index),styleTop,cellIn.getRichStringCellValue());
//            }


//
//            WritableFont nameFormat = new WritableFont(WritableFont.createFont("宋体") , 14, WritableFont.BOLD);
//            WritableCellFormat WxcffName = new WritableCellFormat(nameFormat);
//            WxcffName.setAlignment(Alignment.CENTRE);
//            WxcffName.setVerticalAlignment(VerticalAlignment.CENTRE);
//            ws.mergeCells(14,9+dzj+bzj+pj+qt+11,15,9+dzj+bzj+pj+qt+11);
//            label = new Label(14,9+dzj+bzj+pj+qt+11, "甲方签认：", WxcffName);
//            ws.addCell(label);


//            newWwb.copySheet(0,"copy",0);
            // newWwb.importSheet("宏",1,from_sheet1);
//            newWwb.write();
            // wwb.write();
//            newWwb.close();
            //  wwb.close();
            //  wb.close();
            wb.write(bos);

        } catch (Exception e) {
            log.error(G4Constants.Exception_Head + "基于模板生成可写工作表出错了!");
            e.printStackTrace();
        }
        return bos;
    }


    /**
     * 获取模板键名
     *
     * @param pKey 模板元标记
     * @return 键名
     */
    private static String getKey(String pKey) {
        String key = null;
        int index = pKey.indexOf(":");
        if (index == -1) {
            key = pKey.substring(3, pKey.length() - 1);
        } else {
            key = pKey.substring(3, index);
        }
        return key;
    }

    /**
     * 获取模板单元格标记数据类型
     *
     * @param pType 模板元标记
     * @return 数据类型
     */
    private static String getType(String pType) {
        String type = G4Constants.ExcelTPL_DataType_Label;
        if (pType.indexOf(":n") != -1 || pType.indexOf(":N") != -1) {
            type = G4Constants.ExcelTPL_DataType_Number;
        }
        return type;
    }

    public ExcelTemplate getExcelTemplate() {
        return excelTemplate;
    }

    public void setExcelTemplate(ExcelTemplate excelTemplate) {
        this.excelTemplate = excelTemplate;
    }

    public ExcelData getExcelData() {
        return excelData;
    }

    public void setExcelData(ExcelData excelData) {
        this.excelData = excelData;
    }

    /**
     * 新增小计
     *
     * @param wSheet
     * @param fields
     * @throws WriteException
     */
    public void MakeSubtotalRow(WritableSheet wSheet, List fields, String CurGroupName, Dto parametersDto, boolean showprice) throws WriteException {
        int mergeRow = 0;
        Integer curCount = new Integer(0);
        String CurTotalPrice = "";
        String curtype = "";
        //新增一行小计后再新增一行分组头
        if (CurGroupName.equals("柜台")) {
            CurTotalPrice = parametersDto.getAsString("CounterPrice");
            curCount = parametersDto.getAsInteger("CounterCount");
            curtype = "款柜台";
        } else if (CurGroupName.equals("现场成品")) {
            CurTotalPrice = parametersDto.getAsString("CustomscencePrice");
            curCount = parametersDto.getAsInteger("CustomscenceCount");
            curtype = "款现场成品";
        } else if (CurGroupName.equals("其他费用")) {
            CurTotalPrice = parametersDto.getAsString("totalotherPrice");
            curCount = parametersDto.getAsInteger("totalotherCount");
            curtype = "项其他费用";
        } else if (CurGroupName.equals("成品件部件费用(不参与打折)")) {
            CurTotalPrice = parametersDto.getAsString("totalProductAdditionalCostPrice");
            curCount = parametersDto.getAsInteger("totalProductAdditionalCostCount");
            curtype = "项成品件部件费用";
        }
        Label Mer = (Label) wSheet.getWritableCell(0, mergeRow);
        //新增一行小计
        for (int i = 0; i < fields.size(); i++) {
            Cell cell = (Cell) fields.get(i);
            mergeRow = cell.getRow() + curRow;
            Label label = new Label(cell.getColumn(), cell.getRow() + curRow, "");
            wSheet.addCell(label);
        }
        if (showprice) {
            wSheet.mergeCells(4, mergeRow, 5, mergeRow);////合并单元格，参数格式（开始列，开始行，结束列，结束行）
            wSheet.mergeCells(6, mergeRow, fields.size() - 1, mergeRow);////合并单元格，参数格式（开始列，开始行，结束列，结束行）
        } else {
            wSheet.mergeCells(4, mergeRow, fields.size() - 1, mergeRow);////合并单元格，参数格式（开始列，开始行，结束列，结束行）
        }

        Mer = (Label) wSheet.getWritableCell(0, mergeRow);
        WritableCellFormat RwcfF_ = new WritableCellFormat();
        RwcfF_.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);
        RwcfF_.setAlignment(Alignment.CENTRE);
        Mer.setCellFormat(RwcfF_);
        Mer.setString("小计");

        Mer = (Label) wSheet.getWritableCell(1, mergeRow);
        WritableCellFormat RwcfF1_ = new WritableCellFormat();
        RwcfF1_.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);
        RwcfF1_.setAlignment(Alignment.CENTRE);
        Mer.setCellFormat(RwcfF1_);
        Mer.setString("共");

        Mer = (Label) wSheet.getWritableCell(2, mergeRow);
        WritableCellFormat RwcfF2_ = new WritableCellFormat();
        RwcfF2_.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);
        RwcfF2_.setAlignment(Alignment.CENTRE);
        Mer.setCellFormat(RwcfF2_);
        Mer.setString(curCount.toString());

        Mer = (Label) wSheet.getWritableCell(3, mergeRow);
        WritableCellFormat RwcfF3_ = new WritableCellFormat();
        RwcfF3_.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);
        RwcfF3_.setAlignment(Alignment.CENTRE);
        Mer.setCellFormat(RwcfF3_);
        Mer.setString(curtype);
        if (showprice) {
            Mer = (Label) wSheet.getWritableCell(4, mergeRow);
            WritableCellFormat RwcfF4_ = new WritableCellFormat();
            RwcfF4_.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);
            RwcfF4_.setAlignment(Alignment.CENTRE);
            Mer.setCellFormat(RwcfF4_);
            Mer.setString("合计：");
            Mer = (Label) wSheet.getWritableCell(6, mergeRow);
            WritableCellFormat RwcfF5_ = new WritableCellFormat();
            RwcfF5_.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);
            RwcfF5_.setAlignment(Alignment.LEFT);
            Mer.setCellFormat(RwcfF5_);
            Mer.setString(CurTotalPrice.toString());
        } else {
            Mer = (Label) wSheet.getWritableCell(4, mergeRow);
            WritableCellFormat RwcfF4_ = new WritableCellFormat();
            RwcfF4_.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);
            RwcfF4_.setAlignment(Alignment.CENTRE);
            Mer.setCellFormat(RwcfF4_);
            Mer.setString("");
        }

        curRow++;
    }

    /**
     * 新增列头  比如“序号，费用，金额”等列头
     *
     * @param fieldNameList
     * @param wSheet
     * @param fields
     * @throws WriteException
     */
    public void MakeColumnHeader(List<Dto> fieldNameList, WritableSheet wSheet, List fields, Colour colour) throws WriteException {
        if (colour == null) {
            colour = Colour.WHITE;
        }
        int mergeRow = 0;
        Label Mer = (Label) wSheet.getWritableCell(0, mergeRow);
        for (int i = 0; i < fields.size(); i++) {
            Cell cell = (Cell) fields.get(i);
            mergeRow = cell.getRow() + curRow;
            Label label = new Label(cell.getColumn(), cell.getRow() + curRow, "");
            wSheet.addCell(label);
        }
        if (fieldNameList.size() != 0 && fieldNameList.size() != fields.size()) {
            int margeCellCount = (fields.size() - 1) / (fieldNameList.size() - 1);//求取要多少个单元格合并，排除第一个单元格，默认为“序号”
            int LastmargeCellCount = margeCellCount + ((fields.size() - 1) % (fieldNameList.size() - 1));//求取最后一个合并单元格要多少个单元格合并
            int curcell = 1;
            int curWriteCell = 0;
            //合并该合并的单元格
            for (int m = 1; m < fieldNameList.size(); m++) {
                if (m == fieldNameList.size() - 1) {
                    wSheet.mergeCells(curcell, mergeRow, curcell + LastmargeCellCount - 1, mergeRow);////合并单元格，参数格式（开始列，开始行，结束列，结束行）
                } else {
                    wSheet.mergeCells(curcell, mergeRow, curcell + margeCellCount - 1, mergeRow);////合并单元格，参数格式（开始列，开始行，结束列，结束行）
                }
                curcell = curcell + margeCellCount;

            }
            //写入该写入的行头，“序号，费用名称，费用金额”
            for (int j = 0; j < fieldNameList.size(); j++) {

                Mer = (Label) wSheet.getWritableCell(curWriteCell, mergeRow);
                WritableCellFormat RwcfF = new WritableCellFormat();
                RwcfF.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);
                RwcfF.setAlignment(Alignment.CENTRE);
                RwcfF.setBackground(colour);
                Mer.setCellFormat(RwcfF);
                Mer.setString(fieldNameList.get(j).getAsString("header"));
                if (j == 0) {
                    curWriteCell++;
                } else {
                    curWriteCell += margeCellCount;
                }

            }
        } else {
            for (int j = 0; j < fieldNameList.size(); j++) {
                Mer = (Label) wSheet.getWritableCell(j, mergeRow);
                WritableCellFormat RwcfF = new WritableCellFormat();
                RwcfF.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);
                RwcfF.setAlignment(Alignment.CENTRE);
                RwcfF.setBackground(colour);
                Mer.setCellFormat(RwcfF);
                Mer.setString(fieldNameList.get(j).getAsString("header"));
            }
        }
        curRow++;
    }

    /**
     * 新增分组行，比如“一：xxx   二：xxx”
     *
     * @param wSheet
     * @param fields
     * @param CurGroupName
     * @throws WriteException
     */
    public void MakeGroupRow(WritableSheet wSheet, List fields, String CurGroupName) throws WriteException {
        int mergeRow = 0;
        Label Mer = (Label) wSheet.getWritableCell(0, mergeRow);
        for (int i = 0; i < fields.size(); i++) {
            Cell cell = (Cell) fields.get(i);
            mergeRow = cell.getRow() + curRow;
            Label label = new Label(cell.getColumn(), cell.getRow() + curRow, "");
            wSheet.addCell(label);
        }
        wSheet.mergeCells(1, mergeRow, fields.size() - 1, mergeRow);////合并单元格，参数格式（开始列，开始行，结束列，结束行）
        Mer = (Label) wSheet.getWritableCell(0, mergeRow);
        WritableCellFormat RwcfF = new WritableCellFormat();
        RwcfF.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);
        RwcfF.setAlignment(Alignment.CENTRE);
        Mer.setCellFormat(RwcfF);
        Mer = (Label) wSheet.getWritableCell(1, mergeRow);
        WritableCellFormat RwcfF2 = new WritableCellFormat();
        RwcfF2.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);
        RwcfF2.setAlignment(Alignment.LEFT);
        Mer.setCellFormat(RwcfF2);
        Mer.setString(CurGroupName);
        cur_num++;
        curRow++;
    }

    /**
     * 写入数据
     */
    public void WriteData(List<Dto> fieldNameList, WritableSheet wSheet, List fields, Dto dataDto) throws WriteException {
        int mergeRow = 0;
        Label Mer = (Label) wSheet.getWritableCell(0, mergeRow);
        for (int i = 0; i < fields.size(); i++) {
            Cell cell = (Cell) fields.get(i);
            mergeRow = cell.getRow() + curRow;
            Label label = new Label(cell.getColumn(), cell.getRow() + curRow, "");
            wSheet.addCell(label);
        }
        if (fieldNameList.size() != 0 && fieldNameList.size() != fields.size()) {
            int margeCellCount = (fields.size() - 1) / (fieldNameList.size() - 1);//求取要多少个单元格合并，排除第一个单元格，默认为“序号”
            int LastmargeCellCount = margeCellCount + ((fields.size() - 1) % (fieldNameList.size() - 1));//求取要多少个单元格合并
            int curcell = 1;
            int curWriteCell = 0;
            //合并该合并的单元格
            for (int m = 0; m < fieldNameList.size(); m++) {
                if (m != 0) {
                    if (m == fieldNameList.size() - 1) {
                        wSheet.mergeCells(curcell, mergeRow, curcell + LastmargeCellCount - 1, mergeRow);////合并单元格，参数格式（开始列，开始行，结束列，结束行）
                    } else {
                        wSheet.mergeCells(curcell, mergeRow, curcell + margeCellCount - 1, mergeRow);////合并单元格，参数格式（开始列，开始行，结束列，结束行）
                    }
                    curcell = curcell + margeCellCount;
                }
            }
            for (int j = 0; j < fieldNameList.size(); j++) {
                Mer = (Label) wSheet.getWritableCell(curWriteCell, mergeRow);
                WritableCellFormat RwcfF = new WritableCellFormat();
                RwcfF.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);
                RwcfF.setAlignment(Alignment.CENTRE);
                Mer.setCellFormat(RwcfF);
                Mer.setString(dataDto.getAsString(fieldNameList.get(j).getAsString("value")));
                if (j == 0) {
                    curWriteCell++;
                } else {
                    curWriteCell += margeCellCount;
                }

            }
        } else {
            for (int i = 0; i < fields.size(); i++) {
                Cell cell = (Cell) fields.get(i);
                String key = getKey(cell.getContents().trim());
                Label label = new Label(cell.getColumn(), cell.getRow() + curRow, dataDto.getAsString(key));
                label.setCellFormat(cell.getCellFormat());
                wSheet.addCell(label);
            }
//            for(int j=0;j<fields.size();j++)
//            {
//                Mer=(Label)wSheet.getWritableCell(j,mergeRow);
//                Cell cell = (Cell) fields.get(j);
//                String key = getKey(cell.getContents().trim());
//                WritableCellFormat RwcfF = new  WritableCellFormat();
//                RwcfF.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);
//                RwcfF.setAlignment(Alignment.CENTRE);
//                Mer.setCellFormat(RwcfF);
//                Mer.setString(dataDto.getAsString(key));
//            }
        }
        curRow++;
    }

    /**
     * 新增excel结尾
     */
    public void MakeFootData(WritableSheet wSheet, List fields, Dto parametersDto, boolean isInFlow) throws WriteException {
        int mergeRow = 0;
        Label Mer = (Label) wSheet.getWritableCell(0, mergeRow);
        //新增一行小计
        for (int i = 0; i < fields.size(); i++) {
            Cell cell = (Cell) fields.get(i);
            mergeRow = cell.getRow() + curRow;
            Label label = new Label(cell.getColumn(), cell.getRow() + curRow, "");
            wSheet.addCell(label);
        }
        Mer = (Label) wSheet.getWritableCell(0, mergeRow);
        WritableFont font = new WritableFont(WritableFont.ARIAL, 12, WritableFont.BOLD, false, UnderlineStyle.NO_UNDERLINE, Colour.BLACK);
        WritableCellFormat RwcfF0_ = new WritableCellFormat(font);
        RwcfF0_.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);
        RwcfF0_.setAlignment(Alignment.CENTRE);
        Mer.setCellFormat(RwcfF0_);
        Mer.setString("合计:");
        Mer = (Label) wSheet.getWritableCell(1, mergeRow);
        WritableCellFormat RwcfF01_ = new WritableCellFormat(font);
        RwcfF01_.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);
        RwcfF01_.setAlignment(Alignment.CENTRE);
        Mer.setCellFormat(RwcfF01_);
        Mer.setString("共");
        Mer = (Label) wSheet.getWritableCell(2, mergeRow);
        WritableCellFormat RwcfF02_ = new WritableCellFormat(font);
        RwcfF02_.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);
        RwcfF02_.setAlignment(Alignment.CENTRE);
        Mer.setCellFormat(RwcfF02_);
        Mer.setString(parametersDto.getAsString("CounterCount"));
        Mer = (Label) wSheet.getWritableCell(3, mergeRow);
        WritableCellFormat RwcfF03_ = new WritableCellFormat(font);
        RwcfF03_.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);
        RwcfF03_.setAlignment(Alignment.CENTRE);
        Mer.setCellFormat(RwcfF03_);
        Mer.setString("款柜台");
        Mer = (Label) wSheet.getWritableCell(4, mergeRow);
        WritableCellFormat RwcfF04_ = new WritableCellFormat(font);
        RwcfF04_.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);
        RwcfF04_.setAlignment(Alignment.CENTRE);
        Mer.setCellFormat(RwcfF04_);
        Mer.setString(parametersDto.getAsString("CustomscenceCount"));
        Mer = (Label) wSheet.getWritableCell(5, mergeRow);
        WritableCellFormat RwcfF05_ = new WritableCellFormat(font);
        RwcfF05_.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);
        RwcfF05_.setAlignment(Alignment.CENTRE);
        Mer.setCellFormat(RwcfF05_);
        Mer.setString("款现场成品");
        if (isInFlow) {
            Mer = (Label) wSheet.getWritableCell(6, mergeRow);
            WritableCellFormat RwcfF06_ = new WritableCellFormat(font);
            RwcfF06_.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);
            RwcfF06_.setAlignment(Alignment.CENTRE);
            Mer.setCellFormat(RwcfF06_);
            Mer.setString("总计：");
            Mer = (Label) wSheet.getWritableCell(7, mergeRow);
            WritableCellFormat RwcfF07_ = new WritableCellFormat(font);
            RwcfF07_.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);
            RwcfF07_.setAlignment(Alignment.CENTRE);
            Mer.setCellFormat(RwcfF07_);
            Mer.setString(parametersDto.getAsString("allprice"));
            Mer = (Label) wSheet.getWritableCell(8, mergeRow);
            WritableCellFormat RwcfF08_ = new WritableCellFormat(font);
            RwcfF08_.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);
            RwcfF08_.setAlignment(Alignment.CENTRE);
            Mer.setCellFormat(RwcfF08_);
            Mer.setString(parametersDto.getAsString("totalotherPrice_"));
            Mer = (Label) wSheet.getWritableCell(9, mergeRow);
            WritableCellFormat RwcfF09_ = new WritableCellFormat(font);
            RwcfF09_.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);
            RwcfF09_.setAlignment(Alignment.CENTRE);
            Mer.setCellFormat(RwcfF09_);
            Mer.setString(parametersDto.getAsString("totalProductAdditionalCostPrice_"));
            wSheet.mergeCells(9, mergeRow, fields.size() - 1, mergeRow);////合并单元格，参数格式（开始列，开始行，结束列，结束行）
        }
        curRow++;
        //新增一行小计
        for (int i = 0; i < fields.size(); i++) {
            Cell cell = (Cell) fields.get(i);
            mergeRow = cell.getRow() + curRow;
            Label label = new Label(cell.getColumn(), cell.getRow() + curRow, "");
            wSheet.addCell(label);
        }
        wSheet.mergeCells(0, mergeRow, fields.size() - 1, mergeRow);////合并单元格，参数格式（开始列，开始行，结束列，结束行）
        Mer = (Label) wSheet.getWritableCell(0, mergeRow);
        font = new WritableFont(WritableFont.ARIAL, 12, WritableFont.BOLD, false, UnderlineStyle.NO_UNDERLINE, Colour.RED);
        WritableCellFormat RwcfF10_ = new WritableCellFormat(font);
        RwcfF10_.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);
        RwcfF10_.setAlignment(Alignment.LEFT);
        Mer.setCellFormat(RwcfF10_);
        Mer.setString("备注：以E和W开头的是定制件");
        curRow++;
        for (int i = 0; i < fields.size(); i++) {
            Cell cell = (Cell) fields.get(i);
            mergeRow = cell.getRow() + curRow;
            Label label = new Label(cell.getColumn(), cell.getRow() + curRow, "");
            wSheet.addCell(label);
        }
        wSheet.mergeCells(0, mergeRow, fields.size() - 1, mergeRow);////合并单元格，参数格式（开始列，开始行，结束列，结束行）
        Mer = (Label) wSheet.getWritableCell(0, mergeRow);
        WritableCellFormat RwcfF12_ = new WritableCellFormat(font);
        RwcfF12_.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);
        RwcfF12_.setAlignment(Alignment.LEFT);
        Mer.setCellFormat(RwcfF12_);
        Mer.setString("E表示根据标准件基础上进行修改的定制件（如拉长、缩短、变更颜色等）");
        curRow++;
        for (int i = 0; i < fields.size(); i++) {
            Cell cell = (Cell) fields.get(i);
            mergeRow = cell.getRow() + curRow;
            Label label = new Label(cell.getColumn(), cell.getRow() + curRow, "");
            wSheet.addCell(label);
        }
        wSheet.mergeCells(0, mergeRow, fields.size() - 1, mergeRow);////合并单元格，参数格式（开始列，开始行，结束列，结束行）
        Mer = (Label) wSheet.getWritableCell(0, mergeRow);
        WritableCellFormat RwcfF13_ = new WritableCellFormat(font);
        RwcfF13_.setBorder(Border.ALL, BorderLineStyle.THIN, Colour.BLACK);
        RwcfF13_.setAlignment(Alignment.LEFT);
        Mer.setCellFormat(RwcfF13_);
        Mer.setString("W表示完全定制件，根据客户特殊需求的制作，需打样");
    }

    public ByteArrayOutputStream fillSheets(HttpServletRequest request, List<ExcelData> sheetDatas, Dto dto) {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        try {
            InputStream is = request.getSession().getServletContext().getResourceAsStream(getExcelTemplate().getTemplatePath());
            Workbook wb = Workbook.getWorkbook(is);
            WritableWorkbook wwb = Workbook.createWorkbook(bos, wb);
            for (int i = 0; i < sheetDatas.size(); i++) {
                excelTemplate.parse(request, i);
                WritableSheet wSheet = wwb.getSheet(i);
                ExcelData temp = sheetDatas.get(i);
                setExcelData(G4Utils.isNotEmpty(temp) ? temp : new ExcelData(null, null));
                fillStatics(wSheet);
                fillParameters(wSheet);
                fillFields(wSheet, dto);

            }
            wwb.write();
            wwb.close();
            wb.close();
        } catch (Exception e) {
            log.error(G4Constants.Exception_Head + "基于模板生成可写工作表出错了!");
            e.printStackTrace();
        }
        return bos;
    }

    public void insertRow(List fields, int j, Dto dataDto, WritableSheet wSheet) {
        for (int i = 0; i < fields.size(); i++) {
            Cell cell = (Cell) fields.get(i);
            String key = getKey(cell.getContents().trim());
            String type = getType(cell.getContents().trim());
            try {
                if (type.equalsIgnoreCase(G4Constants.ExcelTPL_DataType_Number)) {
                    Number number = new Number(cell.getColumn(), cell.getRow() + j, dataDto.getAsBigDecimal(key)
                            .doubleValue());
                    number.setCellFormat(cell.getCellFormat());
                    wSheet.addCell(number);
                } else {
                    Label label = new Label(cell.getColumn(), cell.getRow() + j, dataDto.getAsString(key));
                    label.setCellFormat(cell.getCellFormat());
                    wSheet.addCell(label);
                }
            } catch (Exception e) {
                log.error(G4Constants.Exception_Head + "写入表格字段对象发生错误!");
                e.printStackTrace();
            }
        }

    }

    /**
     * @param subFieldList
     * @param fields
     * @param wSheet
     * @return
     */
    public Dto getGroupData(List subFieldList, List fields, WritableSheet wSheet,String GroupField) {
        String sheetname = wSheet.getName();
        Dto dto = new BaseDto();
        int index = sheetnames.indexOf(sheetname);
        if((index==1||index==3)&&"course_name".equals(GroupField))
        {
            index=-1;
        }
        if (index >= 0) {
            List<String> lv_fields = new ArrayList<String>();//概率的字段，
            for (int j = 0; j < subFieldList.size(); j++) {
                Dto temp = (Dto) subFieldList.get(j);
                for (int i = 0; i < fields.size(); i++) {
                    Cell cell = (Cell) fields.get(i);
                    String key = getKey(cell.getContents().trim());
                    if (EX_field.contains(key)) {
                        continue;
                    }
                    String value = temp.getAsString(key);
                    if (key.contains("zql") || key.contains("ycl")) {
                        if (j == 0) {
                            lv_fields.add(key);
                        }
                        value = value.replace("%", "");
                    }
                    Double D_Value = Double.valueOf(value);
                    if (dto.containsKey(key)) {
                        dto.put(key, (dto.getAsLong(key) + D_Value));
                    } else {
                        dto.put(key, D_Value);
                    }
                }
            }
            if (G4Utils.isNotEmpty(lv_fields)) {
                for (int i = 0; i < lv_fields.size(); i++) {
                    String field = lv_fields.get(i);
                    dto.put(field, (dto.getAsLong(field) / subFieldList.size()) + "%");
                }
            }
            dto.put("deptname","小计");
        } else {
            dto = null;
        }

        return dto;

    }
}
