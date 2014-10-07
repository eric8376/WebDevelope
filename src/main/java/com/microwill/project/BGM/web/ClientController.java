/**
 * 
 */
package com.microwill.project.BGM.web;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.microwill.framework.annotation.NotLogin;
import com.microwill.framework.util.IDGenerator;
import com.microwill.framework.vo.Result;
import com.microwill.framework.web.BaseMultiActionController;
import com.microwill.framework.web.util.LoginHelper;
import com.microwill.project.BGM.entity.TPatient;
import com.microwill.project.BGM.entity.TResult;

/**
 * @author Administrator
 * 
 */
@Controller("BGM.invoke.controller")
@RequestMapping("/BGM/invoke.spr")
public class ClientController extends BaseMultiActionController {
	@Autowired
	private SessionFactory sessionFactory;
	@Autowired
	private JdbcTemplate jdbcTemplate;

	/**
	 * 登录
	 *http://localhost/hospital/BGM/invoke.spr?action=login&username=admin&password=111
	 * @param model
	 * @param request
	 * @param response
	 * @param username
	 * @param password
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("action=login")
	@NotLogin
	public String login(Model model, HttpServletRequest request,
			HttpServletResponse response, String username, String password)
			throws Exception {
		Result result = new Result();
		result.setSuccess(false);
		try {

			String sql = "select * from bgm.t_user where user_name=? and password=?";
			List results = jdbcTemplate.queryForList(sql, new Object[] {
					username, password });
			if (results.size() > 0) {
				Map loginedUserInfo = (Map) results.get(0);
				LoginHelper.initSession(request, loginedUserInfo);
				result.setSuccess(true);
				result.setContent(loginedUserInfo);
			} else {
				result.setSuccess(false);
				result.setMsg("用户名不存在或者密码错误.");
			}
		} catch (Exception ex) {
			result.setSuccess(false);
			result.setMsg(ex.getMessage());

		}
		model.addAttribute("result", result);
		return "jsonview";// 返回用户信息

	}

	/**
	 * 获取病患讯息
	 *http://localhost/hospital/BGM/invoke.spr?action=getPatient&patientId=20131216091200501
	 * @param model
	 * @param request
	 * @param response
	 * @param patientId
	 * @return
	 * @throws Exception
	 */
	@NotLogin
	@RequestMapping(params = "action=getPatient")
	public String getPatient(Model model, HttpServletRequest request,
			HttpServletResponse response, String patientId) throws Exception {
		Result result = new Result();
		result.setSuccess(false);
		try {

			String sql = "select * from bgm.t_patient where patient_id=?";
			List results = jdbcTemplate.queryForList(sql,
					new Object[] { patientId });
			if (results.size() > 0) {
				Map patientInfo = (Map) results.get(0);
				result.setSuccess(true);
				result.setContent(patientInfo);
			} else {
				result.setSuccess(false);
				result.setMsg("病患信息不存在");
			}
		} catch (Exception ex) {
			result.setSuccess(false);
			result.setMsg(ex.getMessage());

		}
		model.addAttribute("result", result);
		return "jsonview";// 返回 该病患的所有信息

	}

	/**
	 * 获取当天的检验计划
	 * http://localhost/hospital/BGM/invoke.spr?action=getTodayPlanByUser&userId=4028818842f17d9b0142f5ee954f0001
	 * @param model
	 * @param request
	 * @param response
	 * @param userId
	 * @return
	 * @throws Exception
	 */
	@NotLogin
	@RequestMapping(params = "action=getTodayPlanByUser")
	public String getTodayPlanByUser(Model model,
			HttpServletRequest request, HttpServletResponse response,
			String userId) throws Exception {
		Result result = new Result();
		result.setSuccess(false);
		try {
			String today=DateFormatUtils.format(new Date(), "yyyy-MM-dd");
			String sql = "select * from bgm.t_plan where user_id=? and begin_time<? and end_time>?";
			List results = jdbcTemplate.queryForList(sql,
					new Object[] { userId ,today,today});
			if (results.size() > 0) {
				
				result.setSuccess(true);
				result.setContent(results);
			} else {
				result.setSuccess(false);
				result.setMsg("不存在检测计划");
			}
		} catch (Exception ex) {
			result.setSuccess(false);
			result.setMsg(ex.getMessage());

		}
		model.addAttribute("result", result);
		return "jsonview";// 返回 该用户今天的所有需要检测的病患的信息

	}

	/**
	 * 新增病患
	 * @param model
	 * @param request
	 * @param response
	 * @param patient
	 * @return
	 * @throws Exception
	 */
	@NotLogin
	@RequestMapping(params = "action=addPatient")
	public String addPatient(Model model, HttpServletRequest request,
			HttpServletResponse response, TPatient patient) throws Exception {
		
		try {
			patient.setPatientId(IDGenerator.getCommonID());
			Session session=sessionFactory.openSession();
			session.saveOrUpdate(patient);
			session.flush();
			session.close();
		} catch (DataAccessException e) {
			outputJSON(response, "{result:false}");
			e.printStackTrace();
		} catch (Exception e) {
			outputJSON(response, "{result:false}");
			e.printStackTrace();
		}

		outputJSON(response, "{\"result\":\"success\",\"on\":\"yes\"}");

		return "jsonview";

	}

	/**
	 * 上传检测结果
	 * @param model
	 * @param request
	 * @param response
	 * @param result
	 * @return
	 * @throws Exception
	 */
	@NotLogin
	@RequestMapping(params = "action=addResult")
	public String addResult(Model model, HttpServletRequest request,
			HttpServletResponse response, TResult result) throws Exception {
		try {
			result.setCheckId(IDGenerator.UUIDgenerate());
			Session session=sessionFactory.openSession();
			session.saveOrUpdate(result);
			session.flush();
			session.close();
		} catch (DataAccessException e) {
			outputJSON(response, "{result:false}");
			e.printStackTrace();
		} catch (Exception e) {
			outputJSON(response, "{result:false}");
			e.printStackTrace();
		}

		outputJSON(response, "{\"result\":\"success\",\"on\":\"yes\"}");

		return "jsonview";

	}

}
