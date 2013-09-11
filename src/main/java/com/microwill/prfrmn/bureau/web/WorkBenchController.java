/**
 * 
 */
package com.microwill.prfrmn.bureau.web;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.microwill.framework.web.BaseMultiActionController;
import com.microwill.prfrmn.bureau.logic.UserTypeLogic;
import com.microwill.prfrmn.bureau.logic.UserTypeLogicFactory;

/**
 * @author Administrator
 * 
 */
@Controller("bureau.workbench.controller")
@RequestMapping("/bureau/workbench.spr")
public class WorkBenchController extends BaseMultiActionController {
	@Autowired
	private JdbcTemplate jdbcTemplate;
	@RequestMapping
	public ModelAndView handleDefault(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return new ModelAndView("/performance/bureau/workbench");
	}
	@RequestMapping(params = "action=getXMList")
	public ModelAndView getXMList(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map loginedUserInfo=(Map)request.getSession().getAttribute("loginedUser"); 
		Map loginedUserContext=(Map)request.getSession().getAttribute("loginedUser"); 
		UserTypeLogic userTypeLogic=UserTypeLogicFactory.createUserTypeLogic(loginedUserContext, jdbcTemplate);
		outputJSON(response, userTypeLogic.getXMList());
		return null;
	}
	@RequestMapping(params = "action=getHJList")
	public ModelAndView getHJList(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map loginedUserContext=(Map)request.getSession().getAttribute("loginedUser"); 
		UserTypeLogic userTypeLogic=UserTypeLogicFactory.createUserTypeLogic(loginedUserContext, jdbcTemplate);
		outputJSON(response, userTypeLogic.getHJList());
		return null;
	}
	@RequestMapping(params = "action=getZBList")
	public ModelAndView getZBList(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map loginedUserContext=(Map)request.getSession().getAttribute("loginedUser"); 
		UserTypeLogic userTypeLogic=UserTypeLogicFactory.createUserTypeLogic(loginedUserContext, jdbcTemplate);
		outputJSON(response, userTypeLogic.getZBList());
		return null;
	}

}
