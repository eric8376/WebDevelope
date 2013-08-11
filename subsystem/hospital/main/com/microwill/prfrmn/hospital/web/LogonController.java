/**
 * 
 */
package com.microwill.prfrmn.hospital.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.microwill.framework.Persistence.ibatis.query.QueryDataCmd;
import com.microwill.framework.web.BaseMultiActionController;
import com.microwill.prfrmn.hospital.bo.UserType;

/**
 * @author Administrator
 * 
 */
@Controller("hospital.logon.controller")
@RequestMapping("/hospital/logon.spr")
public class LogonController extends BaseMultiActionController {
	@Autowired
	private QueryDataCmd queryDataCmd;

	@RequestMapping
	public ModelAndView handleDefault(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		String hospital = request.getParameter("hospital");
		String sql="select hosp_id from t_per_hosp where hosp_name=?";
		String hosp_id=queryDataCmd.getJdbcTemplate().queryForObject(sql, String.class,new Object[]{hospital});
		//查询关联科室和部门，没有科室和部门的将通不过验证
		sql = "select t.*,ks.DICT_TEXT as ks_text from T_PER_USER t left join (select * from t_per_ks union select * from t_per_bm)  ks on t.ks=ks.DICT_ID where user_name=? and password=? and t.hosp_id=?";
		List result = queryDataCmd.getJdbcTemplate().queryForList(sql,
				new Object[] { username, password,hosp_id });
		if (result.size() > 0) {
			Map loginedUserInfo = (Map) result.get(0);
			String userTypeCode = (String) loginedUserInfo.get("jb");
			UserType userType = UserType.fromCode(userTypeCode);
			if(UserType.ADMIN.equals(userType)){
				loginedUserInfo.put("ks_text", "");
			}
			loginedUserInfo.put("hosp_name", hospital);
			loginedUserInfo.put("jb_text", userType.getDesc());
			request.getSession().setAttribute("isLogin", "true");
			request.getSession().setAttribute("loginedUser", loginedUserInfo);
			outputJSON(response, "{\"result\":\"success\",\"on\":\"yes\"}");
		} else {
			outputJSON(response, "{result:'false'}");
		}
		return null;

	}

	@RequestMapping(params = "action=signout")
	public ModelAndView signout(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		request.getSession().setAttribute("isLogin", "false");
		return null;

	}

}
