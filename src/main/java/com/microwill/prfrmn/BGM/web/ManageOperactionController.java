/**
 * 
 */
package com.microwill.prfrmn.BGM.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.microwill.framework.util.IDGenerator;
import com.microwill.framework.web.BaseMultiActionController;
import com.microwill.prfrmn.BGM.entity.TDict;
import com.microwill.prfrmn.BGM.entity.TPatient;
import com.microwill.prfrmn.BGM.entity.TPlan;
import com.microwill.prfrmn.BGM.entity.TUser;

/**
 * @author Administrator
 * 
 */
@Controller("BGM.manageoperation.controller")
@RequestMapping("/BGM/manageOperation.spr")
public class ManageOperactionController extends BaseMultiActionController {
	@Autowired
	private SessionFactory sessionFactory;

	@RequestMapping(params = "action=addOrUpdatePatient")
	public ModelAndView addOrUpdatePatient(HttpServletRequest request,
			HttpServletResponse response, TPatient patient) throws Exception {
		if (StringUtils.isEmpty(patient.getPatientId())) {
			patient.setPatientId(IDGenerator.getCommonID());
		}
		try {
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

		return null;

	}
	@RequestMapping(params = "action=deletePatient")
	public ModelAndView deletePatient(HttpServletRequest request,
			HttpServletResponse response, TPatient patient) throws Exception {
		try {
			Session session=sessionFactory.openSession();
			session.delete(patient);
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

		return null;
	}
	
	@RequestMapping(params = "action=addOrUpdateUser")
	public ModelAndView addOrUpdateUser(HttpServletRequest request,
			HttpServletResponse response, TUser user) throws Exception {
		if (StringUtils.isEmpty(user.getUserId())) {
			user.setUserId((IDGenerator.UUIDgenerate()));
		}
		try {
			Session session=sessionFactory.openSession();
			session.saveOrUpdate(user);
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

		return null;

	}
	@RequestMapping(params = "action=deleteUser")
	public ModelAndView deleteUser(HttpServletRequest request,
			HttpServletResponse response, TUser user) throws Exception {
		try {
			Session session=sessionFactory.openSession();
			session.delete(user);
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

		return null;
	}
	
	@RequestMapping(params = "action=addOrUpdatePlan")
	public ModelAndView addOrUpdatePlan(HttpServletRequest request,
			HttpServletResponse response, TPlan plan) throws Exception {
		if (StringUtils.isEmpty(plan.getPlanId())) {
			plan.setPlanId((IDGenerator.UUIDgenerate()));
		}
		try {
			Session session=sessionFactory.openSession();
			session.saveOrUpdate(plan);
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

		return null;

	}
	@RequestMapping(params = "action=deletePlan")
	public ModelAndView deletePlan(HttpServletRequest request,
			HttpServletResponse response, TPlan plan) throws Exception {
		try {
			Session session=sessionFactory.openSession();
			session.delete(plan);
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

		return null;
	}
	@RequestMapping(params = "action=addOrUpdateDict")
	public ModelAndView addOrUpdateDict(HttpServletRequest request,
			HttpServletResponse response, TDict dict) throws Exception {
		if (StringUtils.isEmpty(dict.getDictId())) {
			dict.setDictId((IDGenerator.UUIDgenerate()));
		}
		try {
			Session session=sessionFactory.openSession();
			session.saveOrUpdate(dict);
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

		return null;

	}
	@RequestMapping(params = "action=deleteDict")
	public ModelAndView deleteDict(HttpServletRequest request,
			HttpServletResponse response, TDict dict) throws Exception {
		try {
			Session session=sessionFactory.openSession();
			session.delete(dict);
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

		return null;
	}
	


}
