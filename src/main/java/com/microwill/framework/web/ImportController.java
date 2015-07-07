/**
 * 
 */
package com.microwill.framework.web;

import java.io.IOException;
import java.io.InputStream;
import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.commons.lang3.time.DateUtils;
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
			handler(objList,request);
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

	private void handler(List objList,HttpServletRequest request) {
		String hosp_id=HospitalHelper.getHospIdFromSession(request);
		String sql="insert into t_per_record(record_id,xm_id,hj_id,zb_id,ejzb_id,ks_id,post,user_name,check_time,result,dianping,jiance,kaohe,beizhu,hosp_id) values(uuid(),?,?,?,?,?,?,?,?,?,?,?,?,?,'"+hosp_id+"')";
		jdbcTemplate.batchUpdate(sql, objList);
		sql="update t_per_record t2, t_dict_table t1 set t2.ks_id=t1.dict_id where t1.dict_text=t2.ks_id and t2.hosp_id='"+hosp_id+"' and t1.hosp_id='"+hosp_id+"' and t1.group_code='ks';";
		jdbcTemplate.update(sql);
		sql="update t_per_record t2, t_dict_table t1 set t2.xm_id=t1.dict_id where t1.dict_text=t2.xm_id and t2.hosp_id='"+hosp_id+"' and t1.hosp_id='"+hosp_id+"' and t1.group_code='xm';";
		jdbcTemplate.update(sql);
		sql="update t_per_record t2, t_dict_table t1 set t2.hj_id=t1.dict_id where t1.dict_text=t2.hj_id and t2.hosp_id='"+hosp_id+"' and t1.hosp_id='"+hosp_id+"' and t1.group_code='hj';";
		jdbcTemplate.update(sql);
		sql="update t_per_record t2, t_dict_table t1 set t2.zb_id=t1.dict_id where t1.dict_text=t2.zb_id and t2.hosp_id='"+hosp_id+"' and t1.hosp_id='"+hosp_id+"' and t1.group_code='zb';";
		jdbcTemplate.update(sql);
		sql="update t_per_record t2, t_dict_table t1 set t2.ejzb_id=t1.dict_id where t1.dict_text=t2.zb_id and t2.hosp_id='"+hosp_id+"' and t1.hosp_id='"+hosp_id+"' and t1.group_code='ejzb';";
		jdbcTemplate.update(sql);
		sql="UPDATE t_per_record SET post= (CASE "
				+ "WHEN post='检验师' THEN 0 WHEN post='药学人员' THEN 1 WHEN post='放射师' THEN 2 WHEN post='实习护士' THEN 3 WHEN post='实习医生' THEN 4 "
				+ "WHEN post='医生' THEN 5 WHEN post='护士' THEN 6 WHEN post='进修医生' THEN 7 WHEN post='规培医生' THEN 8 WHEN post='工勤人员' THEN 9 WHEN post='患者' THEN 10 "
				+ "WHEN post='患者家属' THEN 11 WHEN post='就医者' THEN 12 WHEN post='其他人员' THEN 13  "
				+ "ELSE post END);";
		jdbcTemplate.update(sql);
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
