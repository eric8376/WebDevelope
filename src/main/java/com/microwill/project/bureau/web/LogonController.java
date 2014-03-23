/**
 * 
 */
package com.microwill.project.bureau.web;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.microwill.framework.annotation.NotLogin;
import com.microwill.framework.vo.Result;
import com.microwill.framework.web.BaseMultiActionController;
import com.microwill.framework.web.util.LoginHelper;
import com.microwill.project.bureau.bo.UserType;

/**
 * @author Administrator
 * 
 */
@Controller("bureau.logon.controller")
@RequestMapping("/bureau")
public class LogonController extends BaseMultiActionController {
	@Autowired
	private JdbcTemplate jdbcTemplate;
	@RequestMapping("")
	@NotLogin
	public String handleDefault(){
		return "/performance/bureau/index";
	}
	@RequestMapping("/logon.spr")
	@NotLogin
	public String logon(String username, String password, String hospital,String type,Model model) throws Exception {
		Result result=new Result();
		String hosp_name="";
		String sql = "select t.* from bureau.t_per_USER t  where user_name=? and password=?";
		List param=new ArrayList();
		param.add(username);
		param.add(password);
		
		if("center".equals(type)&&!StringUtils.isEmpty(hospital))
		{
			hosp_name=jdbcTemplate.queryForObject("select hosp_name from bureau.t_per_hosp where hosp_id=?", 
					String.class,new Object[]{hospital});
			sql+="and t.hosp_id=?";
			param.add(hospital);
		}else if("bureau".equals(type)){
			sql+=" and jb=4";
		}
		List results = jdbcTemplate.queryForList(sql,param.toArray());
		if (results.size() > 0) {
			Map loginedUserInfo = (Map) results.get(0);
			String userTypeCode = (String) loginedUserInfo.get("jb");
			UserType userType = UserType.fromCode(userTypeCode);
			loginedUserInfo.put("hosp_name", hosp_name);
			loginedUserInfo.put("jb_text", userType.getDesc());
			LoginHelper.initSession(getRequest(),loginedUserInfo);
			result.setSuccess(true);
		} else {
			result.setSuccess(false);
		}
		model.addAttribute("result", result);
		return "jsonview";

	}
	
	@RequestMapping("/signout.spr")
	public ModelAndView signout(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		LoginHelper.doLogout(request);
		return null;

	}

}
