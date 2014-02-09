/**
 * 
 */
package com.microwill.prfrmn.BGM.web;

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
@Controller("BGM.authorize.controller")
@RequestMapping("/BGM/authorize.spr")
public class AuthorizeController extends BaseMultiActionController {
	@Autowired
	private JdbcTemplate jdbcTemplate;


	@RequestMapping(params = "action=getPriviageMap")
	public ModelAndView getPriviageMap(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map loginedUserContext=(Map)request.getSession().getAttribute(LoginHelper.TOKEN); 
		UserTypeLogic userTypeLogic=UserTypeLogicFactory.createUserTypeLogic(loginedUserContext, jdbcTemplate);
		responseOutWithJson(response, userTypeLogic.getPriviageMap());
		return null;
	}
}
