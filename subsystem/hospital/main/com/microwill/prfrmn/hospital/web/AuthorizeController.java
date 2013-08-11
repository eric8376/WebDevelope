/**
 * 
 */
package com.microwill.prfrmn.hospital.web;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.microwill.framework.Persistence.ibatis.query.QueryDataCmd;
import com.microwill.framework.web.BaseMultiActionController;
import com.microwill.prfrmn.hospital.logic.AuthorizeQueryStrategy;

/**
 * @author Administrator
 * 
 */
@Controller("hospital.authorize.controller")
@RequestMapping("/hospital/authorize.spr")
public class AuthorizeController extends BaseMultiActionController {
	@Autowired
	private QueryDataCmd queryDataCmd;

	@RequestMapping(params = "action=query")
	public ModelAndView query(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String conditionSql = request.getParameter("conditionSql");
		String pageSql = request.getParameter("pageSql");
		Map loginedUserContext = (Map) request.getSession().getAttribute(
				"loginedUser");
		AuthorizeQueryStrategy strategy = new AuthorizeQueryStrategy(
				loginedUserContext, queryDataCmd);

		outputJSON(response, strategy.query(conditionSql, pageSql));
		return null;
	}

}
