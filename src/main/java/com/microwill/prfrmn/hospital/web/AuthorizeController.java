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
import com.microwill.framework.web.util.LoginHelper;
import com.microwill.prfrmn.hospital.logic.AuthorizeQueryStrategy;
import com.microwill.prfrmn.hospital.logic.UserTypeLogic;
import com.microwill.prfrmn.hospital.logic.UserTypeLogicFactory;

/**
 * @author Administrator
 * 
 */
@Controller("hospital.authorize.controller")
@RequestMapping("/hospital/authorize.spr")
public class AuthorizeController extends BaseMultiActionController {
	@Autowired
	private JdbcTemplate jdbcTemplate;

	@RequestMapping(params = "action=query")
	public ModelAndView query(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String conditionSql = request.getParameter("conditionSql");
		String pageSql = request.getParameter("pageSql");
		Map loginedUserContext = getToken(request);
		AuthorizeQueryStrategy strategy = new AuthorizeQueryStrategy(
				loginedUserContext, jdbcTemplate);

		outputJSON(response, strategy.query(conditionSql, pageSql));
		return null;
	}
	@RequestMapping(params = "action=queryAnalysis")
	public ModelAndView queryAnalysis(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String condition = request.getParameter("condition");
		String keyIndex = request.getParameter("keyIndex");
		Map loginedUserContext = getToken(request);
		AuthorizeQueryStrategy strategy = new AuthorizeQueryStrategy(
				loginedUserContext, jdbcTemplate);

		outputJSON(response, strategy.queryAnalysis(condition, keyIndex));
		return null;
	}
	@RequestMapping(params = "action=getKSList")
	public ModelAndView getKSList(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map loginedUserContext=(Map)request.getSession().getAttribute(LoginHelper.TOKEN); 
		UserTypeLogic userTypeLogic=UserTypeLogicFactory.createUserTypeLogic(loginedUserContext, jdbcTemplate);
		outputJSON(response, userTypeLogic.getKSList());
		return null;
	}
	@RequestMapping(params = "action=getXMList")
	public ModelAndView getXMList(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map loginedUserContext=(Map)request.getSession().getAttribute(LoginHelper.TOKEN); 
		UserTypeLogic userTypeLogic=UserTypeLogicFactory.createUserTypeLogic(loginedUserContext, jdbcTemplate);
		outputJSON(response, userTypeLogic.getXMList());
		return null;
	}
	@RequestMapping(params = "action=getPriviageMap")
	public ModelAndView getPriviageMap(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map loginedUserContext=(Map)request.getSession().getAttribute(LoginHelper.TOKEN); 
		UserTypeLogic userTypeLogic=UserTypeLogicFactory.createUserTypeLogic(loginedUserContext, jdbcTemplate);
		responseOutWithJson(response, userTypeLogic.getPriviageMap());
		return null;
	}
}
