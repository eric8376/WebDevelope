/**
 * 
 */
package com.microwill.project.hospital.web;

import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.microwill.framework.web.BaseMultiActionController;
import com.microwill.framework.web.util.LoginHelper;
import com.microwill.project.hospital.bo.RoleType;

/**
 * @author Administrator
 * 
 */
@Controller("hospital.manageoperation.controller")
@RequestMapping("/hospital/manageOperation.spr")
public class ManageOperactionController extends BaseMultiActionController {
	@Autowired
	private JdbcTemplate jdbcTemplate;
	//用户管理
	private static String ADD_USER_SQL = "insert into t_per_user(user_id,user_name,password,real_name,regdate,ks,bm,jb,hosp_id) values(?,?,?,?,now(),?,?,?,?)";
	private static String UPDATE_USER_SQL="update t_per_user set user_name=? ,real_name=?,ks=?,bm=?,jb=? where user_id=?";
	private static String DELETE_USER_SQL="delete from t_per_user where user_id=?";
	//记录管理
	private static String ADD_RECORD_SQL = "insert into t_per_record(record_id,ks_id,xm_id,user_name,check_time,result,dianping,kaohe,beizhu,hosp_id,zb_id,hj_id,ejzb_id,post,jiance) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
	private static String UPDATE_RECORD_SQL = "update t_per_record set ks_id=?,xm_id=?,user_name=?,check_time=?,result=?,dianping=?,kaohe=?,beizhu=?,zb_id=?,hj_id=?,ejzb_id=?,post=?,jiance=? where record_id=?";
	private static String DELETE_RECORD_SQL = "delete from t_per_record where record_id=?";
	//字典管理
	private static String ADD_DICT_SQL = "insert into hospital.t_dict_table(dict_id,group_id,dict_text,group_code,hosp_id,creator_id,creator_dep_id,permission,createtime) values(?,?,?,?,?,?,?,?,now())";
	private static String DELETE_DICT_SQL = "delete from hospital.t_dict_table where dict_id= ?";
	//字典关联
	private static String DELETE_DICT_MAP_SQL = "delete from hospital.t_per_dict_map where parent_id=? and son_id=?";
	private static String ADD_DICT_MAP_SQL = "insert into hospital.t_per_dict_map(parent_id,son_id,map_id) values(?,?,?)" ;
	//其他
	private static String DELETE_USER_ROLE_MAP_SQL = "delete from T_PER_USER_ROLE where role_id=?";
	private static String ADD_USER_ROLE_MAP_SQL = "insert into T_PER_USER_ROLE(user_id,role_id) values(?,?)";
	private static String DELETE_ROLE_XM_MAP_SQL = "delete from T_PER_ROLE_XM where ksxm_id=? ";
	private static String ADD_ROLE_XM_MAP_SQL = "insert into T_PER_ROLE_XM(role_id,ksxm_id) values(?,?)";
	private static String QUERY_RECORD_OF_PROJRCT = "select count(1) from t_per_record t1,t_per_dict_map t2 where t1.ksxm_id= t2.ksxm_id and t2.xm_id =? and t2.ks_id=?";
	private static String UPDATE_PASSWORD_SQL = "update t_per_user set password=? where user_id=? and password=?";

	@RequestMapping(params = "action=updateUser")
	public ModelAndView updateUser(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String username = request.getParameter("userName");
		String password = request.getParameter("pass");
		String repassword = request.getParameter("repass");
		String realName = request.getParameter("realName");
		String bm = request.getParameter("bm");
		String ks = request.getParameter("ks");
		String rank = request.getParameter("rank");
		String user_id = request.getParameter("userId");
		int result = 0;
		try {
			result = jdbcTemplate.update(
					UPDATE_USER_SQL,
					new Object[] { username,realName, ks, bm, rank, user_id
							 });
		} catch (DataAccessException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (result > 0) {
			outputJSON(response, "{\"result\":\"success\",\"on\":\"yes\"}");
		} else {
			outputJSON(response, "{result:false}");
		}
		return null;

	}
	@RequestMapping(params = "action=addUser")
	public ModelAndView addUser(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String username = request.getParameter("userName");
		String password = request.getParameter("pass");
		String repassword = request.getParameter("repass");
		String realName = request.getParameter("realName");
		String bm = request.getParameter("bm");
		String ks = request.getParameter("ks");
		String rank = request.getParameter("rank");
		String user_id = getUUID();
		int result = 0;
		try {
			result = jdbcTemplate.update(
					ADD_USER_SQL,
					new Object[] { user_id, username, password, realName, ks,
							bm, rank ,getHospIdFromSession(request)});
		} catch (DataAccessException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (result > 0) {
			outputJSON(response, "{\"result\":\"success\",\"on\":\"yes\"}");
		} else {
			outputJSON(response, "{result:false}");
		}
		return null;

	}
	@RequestMapping(params = "action=deleteUser")
	public ModelAndView deleteUser(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String userId = request.getParameter("userId");
		int result = 0;
		try {
			result = jdbcTemplate.update(DELETE_USER_SQL,
					new Object[] { userId });
		} catch (DataAccessException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (result > 0) {
			outputJSON(response, "{\"result\":\"success\",\"on\":\"yes\"}");
		} else {
			outputJSON(response, "{result:false}");
		}
		return null;


	}
	@RequestMapping(params = "action=addRecord")
	public ModelAndView addRecord(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String xm_id = request.getParameter("xm");
		String ks_id = request.getParameter("ks");
		String owner = request.getParameter("owner");
		String checktime = request.getParameter("checktime");
		String hospid = request.getParameter("hospid");
		String results = request.getParameter("results");
		String dianping = request.getParameter("dianping");
		String kaohe = request.getParameter("kaohe");
		String beizhu = request.getParameter("beizhu");
		String zb_id = request.getParameter("zb");
		String ejzb_id = request.getParameter("ejzb");
		String post = request.getParameter("post");
		String jiance = request.getParameter("jiance");
		String hj_id = request.getParameter("hj");
		String record_id = getUUID();
		int result = 0;
		try {
			result = jdbcTemplate.update(
					ADD_RECORD_SQL,
					new Object[] { record_id,ks_id,xm_id, owner, checktime, results,
							dianping, kaohe,beizhu,getHospIdFromSession(request),zb_id ,hj_id,ejzb_id,post,jiance});
		} catch (DataAccessException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (result > 0) {
			outputJSON(response, "{\"result\":\"success\",\"on\":\"yes\"}");
		} else {
			outputJSON(response, "{result:false}");
		}
		return null;

	}
	@RequestMapping(params = "action=updateRecord")
	public ModelAndView updateRecord(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String xm_id = request.getParameter("xm");
		String ks_id = request.getParameter("ks");
		String owner = request.getParameter("owner");
		String checktime = request.getParameter("checktime");
		String hospid = request.getParameter("hospid");
		String results = request.getParameter("results");
		String dianping = request.getParameter("dianping");
		String kaohe = request.getParameter("kaohe");
		String beizhu = request.getParameter("beizhu");
		String record_id = request.getParameter("recordId");
		String zb_id = request.getParameter("zb");
		String hj_id = request.getParameter("hj");
		String ejzb_id = request.getParameter("ejzb");
		String post = request.getParameter("post");
		String jiance = request.getParameter("jiance");
		int result = 0;
		try {
			result = jdbcTemplate.update(
					UPDATE_RECORD_SQL,
					new Object[] { ks_id,xm_id, owner, checktime, results,
							dianping, kaohe,beizhu,zb_id,hj_id,ejzb_id,post,jiance,record_id });
		} catch (DataAccessException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (result > 0) {
			outputJSON(response, "{\"result\":\"success\",\"on\":\"yes\"}");
		} else {
			outputJSON(response, "{result:false}");
		}
		return null;

	}
	@RequestMapping(params = "action=deleteRecord")
	public ModelAndView deleteRecord(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String recordId = request.getParameter("recordId");
		int result = 0;
		try {
			result = jdbcTemplate.update(DELETE_RECORD_SQL,
					new Object[] { recordId });
		} catch (DataAccessException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (result > 0) {
			outputJSON(response, "{\"result\":\"success\",\"on\":\"yes\"}");
		} else {
			outputJSON(response, "{result:false}");
		}
		return null;


	}
	@RequestMapping(params = "action=addDictItem")
	public ModelAndView addDictItem(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String dictText = request.getParameter("dictText");
		String groupId = request.getParameter("groupId");
		String groupCode = request.getParameter("groupCode");
		String dictId = getUUID();
//		String checkExistSql="select count(1) as count from hospital.t_dict_table where hosp_id='"+getHospIdFromSession(request)+"' and group_code='"+groupCode+"' and dict_text='"+dictText+"'";
//		if(jdbcTemplate.queryForInt(checkExistSql)>0){
//			outputJSON(response, "{result:'false',errorType:'exist'}");
//			return null;
//		}
		int result = 0;
		try {
			result = jdbcTemplate.update(ADD_DICT_SQL,
					new Object[] { dictId, groupId, dictText,
							groupCode,getHospIdFromSession(request),
							getUserIdFromSession(request),
							getDeptIdFromSession(request),
							getPermissionFromSession(request)});
		} catch (DataAccessException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (result > 0) {
			outputJSON(response, "{\"result\":\"success\",\"on\":\"yes\"}");
		} else {
			outputJSON(response, "{result:false}");
		}
		return null;

	}
	@RequestMapping(params = "action=deleteDictItem")
	public ModelAndView deleteDictItem(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String dictId = request.getParameter("dictId");
		int result = 0;
		try {
			result = jdbcTemplate.update(DELETE_DICT_SQL,
					new Object[] { dictId });
		} catch (DataAccessException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (result > 0) {
			outputJSON(response, "{\"result\":\"success\",\"on\":\"yes\"}");
		} else {
			outputJSON(response, "{result:false}");
		}
		return null;

	}
	@RequestMapping(params = "action=mapProject")
	public ModelAndView mapProject(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String addChecklist = request.getParameter("addChecklist");
		String deleteChecklist = request.getParameter("deleteChecklist");
		String parentId = request.getParameter("parentId");
		String mapType = request.getParameter("mapType");
		try {
			// add ksxm
			String[] addsonIdList = addChecklist.split(",");
			for (String sonId : addsonIdList) {
				if (!StringUtils.isEmpty(sonId)) {
					String map_id = getUUID();
					jdbcTemplate.update(ADD_DICT_MAP_SQL,
							new Object[] { parentId, sonId, map_id });
				}

			}
			// delete ksxm
			String[] deletesonIdList = deleteChecklist.split(",");
			for (String sonId : deletesonIdList) {
				if (!StringUtils.isEmpty(sonId)) {

					jdbcTemplate.update(DELETE_DICT_MAP_SQL,
							new Object[] { parentId, sonId });
				}

			}

		} catch (DataAccessException e) {
			e.printStackTrace();
		} catch (Exception e) {
			outputJSON(response, "{result:false}");
		}

		outputJSON(response, "{\"result\":\"success\",\"on\":\"yes\"}");

		return null;

	}
	@RequestMapping(params = "action=mapRole")
	public ModelAndView mapRole(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String addChecklist = request.getParameter("addChecklist");
		String deleteChecklist = request.getParameter("deleteChecklist");
		String roleId = request.getParameter("roleId");
		try {
			// add ksxm
			String[] addksxmIdList = addChecklist.split(",");
			for (String ksxmId : addksxmIdList) {
				if (!StringUtils.isEmpty(ksxmId)) {
					
					jdbcTemplate.update(ADD_ROLE_XM_MAP_SQL,
							new Object[] { roleId, ksxmId });
				}

			}
			// delete ksxm
			String[] deleteksxmIdList = deleteChecklist.split(",");
			for (String ksxmId : deleteksxmIdList) {
				if (!StringUtils.isEmpty(ksxmId)) {

					jdbcTemplate.update(DELETE_ROLE_XM_MAP_SQL,
							new Object[] { ksxmId });
				}

			}

		} catch (DataAccessException e) {
			e.printStackTrace();
		} catch (Exception e) {
			outputJSON(response, "{result:false}");
		}

		outputJSON(response, "{\"result\":\"success\",\"on\":\"yes\"}");

		return null;

	}
	@RequestMapping(params = "action=doAuthorise")
	public ModelAndView doAuthorise(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String addChecklist = request.getParameter("addChecklist");
		String deleteChecklist = request.getParameter("deleteChecklist");
		String userId = request.getParameter("userId");
		try {
			// add ksxm
			String[] addroleIdList = addChecklist.split(",");
			for (String roleId : addroleIdList) {
				if (!StringUtils.isEmpty(roleId)) {
					jdbcTemplate.update(ADD_USER_ROLE_MAP_SQL,
							new Object[] { userId, roleId });
				}

			}
			// delete ksxm
			String[] deleteroleIdList = deleteChecklist.split(",");
			for (String roleId : deleteroleIdList) {
				
				if (!StringUtils.isEmpty(roleId)) {

					jdbcTemplate.update(DELETE_USER_ROLE_MAP_SQL,
							new Object[] { roleId });
				}

			}

		} catch (DataAccessException e) {
			e.printStackTrace();
		} catch (Exception e) {
			outputJSON(response, "{result:false}");
		}

		outputJSON(response, "{\"result\":\"success\",\"on\":\"yes\"}");

		return null;

	}
	@RequestMapping(params = "action=changePassword")
	public ModelAndView changePassword(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String oldpass = request.getParameter("oldpass");
		String newpass = request.getParameter("newpass");
		String userId = (String)getToken(request).get("user_id");
		int result = 0;
		try {
			result = jdbcTemplate.update(UPDATE_PASSWORD_SQL,
					new Object[] { newpass, userId ,oldpass});
		} catch (DataAccessException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (result > 0) {
			outputJSON(response, "{\"result\":\"success\",\"on\":\"yes\"}");
		} else {
			outputJSON(response, "{result:false}");
		}
		return null;

	}
	private String getHospIdFromSession(HttpServletRequest request){
		
		return(String)LoginHelper.getToken(request).get("hosp_id");
	}
	private String getUserIdFromSession(HttpServletRequest request){
		
		return(String)LoginHelper.getToken(request).get("user_id");
	}
	private String getDeptIdFromSession(HttpServletRequest request){
		
		return(String)LoginHelper.getToken(request).get("ks");
	}
	private Integer getPermissionFromSession(HttpServletRequest request){
		String role=(String)LoginHelper.getToken(request).get("role_name");
		if(RoleType.ADMIN.getRole().equals(role)){
			return 0;
		}
		return null;
	}
	private String getUUID() {
		UUID uuid = UUID.randomUUID();
		return uuid.toString();
	}

}
