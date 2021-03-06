/**
 * 
 */
package com.microwill.project.hospital.web;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.microwill.framework.web.BaseMultiActionController;
import com.microwill.framework.web.util.LoginHelper;
import com.microwill.project.hospital.logic.UserTypeLogic;
import com.microwill.project.hospital.logic.UserTypeLogicFactory;

/**
 * @author Administrator
 * 
 */
@Controller("hospital.workbench.controller")
@RequestMapping("/hospital/workbench.spr")
public class WorkBenchController extends BaseMultiActionController {
	@Autowired
	private JdbcTemplate jdbcTemplate;
	@RequestMapping
	public ModelAndView handleDefault(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return new ModelAndView("/performance/hospital/workbench");
	}
	

}
