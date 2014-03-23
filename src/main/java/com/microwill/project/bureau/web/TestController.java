/**
 * 
 */
package com.microwill.project.bureau.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.microwill.framework.web.BaseMultiActionController;

/**
 * @author Administrator
 * 
 */
@Controller("bureau.test.controller")
@RequestMapping("/bureau/test.spr")
public class TestController extends BaseMultiActionController {
	@Autowired
	private JdbcTemplate jdbcTemplate;

//	@RequestMapping(params="action=test")
//	public String query(@NotNull @RequestParam("UserId") String userId) throws Exception {
//		System.out.println(userId);
//		return "aaaaaaaaaa";
//	}

}
