/**
 * 
 */
package com.microwill.project.nursing.web;

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
import com.microwill.project.nursing.logic.UserTypeLogic;
import com.microwill.project.nursing.logic.UserTypeLogicFactory;
import com.microwill.project.nursing.util.NursingHelper;

/**
 * @author Administrator
 * 
 */
@Controller("nursing.workbench.controller")
@RequestMapping(NursingHelper.URL_CONTEXT_NURSING+"/workbench.spr")
public class WorkBenchController extends BaseMultiActionController {
	@Autowired
	private JdbcTemplate jdbcTemplate;
	@RequestMapping
	public ModelAndView handleDefault(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return new ModelAndView("/performance/nursing/workbench");
	}
	

}
