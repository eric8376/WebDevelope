/**
 * 
 */
package com.microwill.framework.web;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.microwill.project.hospital.service.HospitalService;
import com.microwill.project.hospital.util.HospitalHelper;

/**
 * @author Administrator
 * 
 */
@Controller("import.controller")
@RequestMapping("/hospital/import.spr")
public class ImportController extends BaseMultiActionController {
	@Autowired
	private JdbcTemplate jdbcTemplate;
	@Autowired
	private HospitalService hospitalService;

	@RequestMapping
	public String handleDefault(Model model, @RequestParam MultipartFile excel,
			HttpServletRequest request,HttpServletResponse response) throws Exception {
		InputStream inp = excel.getInputStream();
		List objList=new ArrayList();
		try {

			Workbook wb = WorkbookFactory.create(inp);
			Sheet sheet = wb.getSheetAt(0);
			
			
			for (int i = 1; i <= sheet.getLastRowNum(); i++) {
				Row row = sheet.getRow(i);
				if (row == null) {
					continue;
				}
				Object[] objs=new Object[row.getLastCellNum()];
				for (int j = 0; j < row.getLastCellNum(); j++) {
					Cell cell = row.getCell(j);
					objs[j]=ConvertCellStr(cell);;
				}
				if(!ArrayUtils.isEmpty(objs)){
					for(int k=0;k<objs.length;k++){
						if(objs[k]==null){
							objs[k]="";
						}
					}
				objList.add(objs);
				}
			}
			String hosp_id = HospitalHelper.getHospIdFromSession(request);
			hospitalService.importTable(objList, hosp_id);
			request.setAttribute("result", "success");
		} catch (InvalidFormatException e) {
			e.printStackTrace();
			request.setAttribute("result", "failure");
		} catch (IOException e) {
			e.printStackTrace();
			request.setAttribute("result", "failure");
		} catch(Exception e){
			e.printStackTrace();
			request.setAttribute("result", "failure");
		}finally {
			if (inp != null) {
				try {
					inp.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			} else {
				logger.info("没有数据流");
			}
		}
		return "/performance/include/uploadForm";
	}

	
	@RequestMapping(params = "action=showUploadFrom")
	public String uploadForm(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		return "/performance/include/uploadForm";

	}

	/*
	 * 把单元格内的类型转换至String类型
	 */
	private String ConvertCellStr(Cell cell) {
		String cellStr="";
		if(cell==null){
			return null;
		}
		switch (cell.getCellType()) {

		case Cell.CELL_TYPE_STRING:
			// 读取String
			cellStr = cell.getStringCellValue().toString();
			break;

		case Cell.CELL_TYPE_BOOLEAN:
			// 得到Boolean对象的方法
			cellStr = String.valueOf(cell.getBooleanCellValue());
			break;

		case Cell.CELL_TYPE_NUMERIC:

			// 先看是否是日期格式
			if (DateUtil.isCellDateFormatted(cell)) {

				// 读取日期格式
				Date da=cell.getDateCellValue();
				cellStr = DateFormatUtils.format(da, "yyyy-MM-dd");

			} else {

				// 读取数字
				cellStr = String.valueOf(cell.getNumericCellValue());
			}
			break;

		case Cell.CELL_TYPE_FORMULA:
			// 读取公式
			cellStr = cell.getCellFormula().toString();
			break;
		}
		return cellStr;
	}
}
