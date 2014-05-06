/**
 * 
 */
package com.microwill.project.nursing.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.microwill.framework.annotation.NotLogin;
import com.microwill.framework.annotation.SysLog;
import com.microwill.framework.enums.SysLogEnum;
import com.microwill.framework.vo.Result;
import com.microwill.framework.web.BaseMultiActionController;
import com.microwill.framework.web.util.LoginHelper;
import com.microwill.project.nursing.bo.RoleType;
import com.microwill.project.nursing.util.NursingHelper;

/**
 * @author Administrator
 * 
 */
@Controller("nursing.logon.controller")
@RequestMapping(NursingHelper.URL_CONTEXT_NURSING)
public class LogonController extends BaseMultiActionController {
	@Autowired
	private JdbcTemplate jdbcTemplate;
	@RequestMapping("")
	@NotLogin
	public String handleDefault(){
		return "/performance/nursing/index";
	}
	@RequestMapping("/logon.spr")
	@NotLogin
	public ModelAndView logon(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		//String nursing = request.getParameter("nursing");
		Result result=new Result();
		try{
//		String sql="select hosp_id from t_per_hosp where hosp_name=?";
//		String hosp_id=jdbcTemplate.queryForObject(sql, String.class,new Object[]{""});
		//查询关联科室和部门，没有科室和部门的将通不过验证
		String sql = "select t.*,ks.DICT_TEXT as ks_text from nursing.T_PER_USER t left join (select * from nursing.t_per_ks union select * from nursing.t_per_bm)  ks on t.ks=ks.DICT_ID where user_name=? and password=? and t.hosp_id=?";
		List results = jdbcTemplate.queryForList(sql,
				new Object[] { username, password,"MB" });
		if (results.size() > 0) {
			Map loginedUserInfo = (Map) results.get(0);
			String jb = (String) loginedUserInfo.get("jb");
			String bm = (String) loginedUserInfo.get("bm");
			RoleType roleType = RoleType.fromCode(jb,bm);
			if(RoleType.ADMIN.equals(roleType)){
				loginedUserInfo.put("ks_text", "");
			}
			loginedUserInfo.put("hosp_name", "医院模板");
			loginedUserInfo.put("role_text", roleType.getDesc());
			loginedUserInfo.put("role_name", roleType.getRole());
			LoginHelper.initSession(request,loginedUserInfo);
			result.setSuccess(true);
		}else{
			result.setSuccess(false);
			result.setMsg("用户名不存在或者密码错误.");
		}
		}catch (Exception ex){
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
