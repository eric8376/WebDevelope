/**
 * 
 */
package com.microwill.project.nursing.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.microwill.framework.web.BaseMultiActionController;

/**
 * @author Administrator
 *
 */
@Controller("nursing.manage.controller")
@RequestMapping("/nursing/manage.spr")
public class ManageController extends BaseMultiActionController {
	@RequestMapping(params = "action=addRecord")
	public ModelAndView addRecord(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return new ModelAndView("/performance/nursing/addRecord");
	}
	@RequestMapping(params = "action=addUser")
	public ModelAndView addUser(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return new ModelAndView("/performance/nursing/addUser");
	}
	@RequestMapping(params = "action=searchRecord")
	public ModelAndView searchRecord(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return new ModelAndView("/performance/nursing/searchRecord");
	}
	@RequestMapping(params = "action=changePassword")
	public ModelAndView changePassword(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return new ModelAndView("/performance/nursing/changePassword");
	}
	@RequestMapping(params = "action=userManage")
	public ModelAndView userManage(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return new ModelAndView("/performance/nursing/userManage");
	}
	@RequestMapping(params = "action=roleManage")
	public ModelAndView roleManage(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return new ModelAndView("/performance/nursing/roleManage");
	}
	@RequestMapping(params = "action=roomManage")
	public ModelAndView roomManage(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return new ModelAndView("/performance/nursing/roomManage");
	}
	@RequestMapping(params = "action=projectManage")
	public ModelAndView projectManage(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return new ModelAndView("/performance/nursing/projectManage");
	}
	@RequestMapping
	public ModelAndView handleDefault(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return new ModelAndView("/performance/nursing/workbench"); 
	}
	@RequestMapping(params = "action=recordAnalysis")
	public ModelAndView recordAnalysis(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return new ModelAndView("/performance/nursing/recordAnalysis");
	}
	@RequestMapping(params = "action=recordManage")
	public ModelAndView recordManage(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return new ModelAndView("/performance/nursing/recordManage");
	}
	@RequestMapping(params = "action=projectMap")
	public ModelAndView projectMap(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return new ModelAndView("/performance/nursing/projectMap");
	}
	@RequestMapping(params = "action=roleMap")
	public ModelAndView roleMap(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return new ModelAndView("/performance/nursing/roleMap");
	}
	@RequestMapping(params = "action=authorise")
	public ModelAndView authorise(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return new ModelAndView("/performance/nursing/authorise");
	}
	@RequestMapping(params = "action=welcome")
	public ModelAndView welcome(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return new ModelAndView("/performance/nursing/welcome");
	}
	
	
	
}
