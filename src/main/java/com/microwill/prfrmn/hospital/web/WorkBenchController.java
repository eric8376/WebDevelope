/**
 * 
 */
package com.microwill.prfrmn.hospital.web;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.microwill.framework.web.BaseMultiActionController;
import com.microwill.prfrmn.hospital.logic.UserTypeLogic;
import com.microwill.prfrmn.hospital.logic.UserTypeLogicFactory;

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
	@RequestMapping(params = "action=getKSList")
	public ModelAndView getKSList(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map loginedUserInfo=(Map)request.getSession().getAttribute("loginedUser"); 
		Map loginedUserContext=(Map)request.getSession().getAttribute("loginedUser"); 
		UserTypeLogic userTypeLogic=UserTypeLogicFactory.createUserTypeLogic(loginedUserContext, jdbcTemplate);
		outputJSON(response, userTypeLogic.getKSList());
		return null;
	}
	@RequestMapping(params = "action=getXMList")
	public ModelAndView getXMList(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map loginedUserContext=(Map)request.getSession().getAttribute("loginedUser"); 
		UserTypeLogic userTypeLogic=UserTypeLogicFactory.createUserTypeLogic(loginedUserContext, jdbcTemplate);
		outputJSON(response, userTypeLogic.getXMList());
		return null;
	}

}
