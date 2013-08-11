/**
 * 
 */
package com.microwill.prfrmn.bureau.web;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.microwill.framework.Persistence.ibatis.query.QueryDataCmd;
import com.microwill.framework.web.BaseMultiActionController;
import com.microwill.prfrmn.bureau.logic.AuthorizeQueryStrategy;
import com.sun.istack.NotNull;

/**
 * @author Administrator
 * 
 */
@Controller("bureau.test.controller")
@RequestMapping("/bureau/test.spr")
public class TestController extends BaseMultiActionController {
	@Autowired
	private QueryDataCmd queryDataCmd;

	@RequestMapping(params="action=test")
	public String query(@NotNull @RequestParam("UserId") String userId) throws Exception {
		System.out.println(userId);
		return "aaaaaaaaaa";
	}

}
