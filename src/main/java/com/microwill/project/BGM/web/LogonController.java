/**
 * 
 */
package com.microwill.project.BGM.web;

import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.microwill.framework.annotation.NotLogin;
import com.microwill.framework.vo.Result;
import com.microwill.framework.web.BaseMultiActionController;
import com.microwill.framework.web.util.LoginHelper;

/**
 * @author Administrator
 * 
 */
@Controller("BGM.logon.controller")
@RequestMapping("/BGM")
public class LogonController extends BaseMultiActionController {
	@Autowired
	private JdbcTemplate jdbcTemplate;
	@RequestMapping("")
	@NotLogin
	public String handleDefault(){
		return "/performance/BGM/index";
	}
	@RequestMapping("/logon.spr")
	@NotLogin
	public ModelAndView logon(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		Result result = new Result();
		try {

			String sql = "select * from bgm.t_user where user_name=? and password=?";
			List results = jdbcTemplate.queryForList(sql, new Object[] {
					username, password });
			if (results.size() > 0) {
				Map loginedUserInfo = (Map) results.get(0);
				LoginHelper.initSession(request, loginedUserInfo);
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setMsg("用户名不存在或者密码错误.");
			}
		} catch (Exception ex) {
			result.setSuccess(false);
			result.setMsg(ex.getMessage());

		}
	
		responseOutWithJson(response, result);
		return null;

	}

	@RequestMapping("/signout.spr")
	public ModelAndView signout(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		LoginHelper.doLogout(request);
		return null;

	}

}
