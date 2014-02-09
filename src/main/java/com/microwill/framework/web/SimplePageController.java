/**
 * 
 */
package com.microwill.framework.web;

import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.microwill.framework.annotation.NotLogin;
import com.microwill.framework.util.IDGenerator;
import com.microwill.framework.vo.Result;

/**
 * @author Administrator
 * 
 */
@Controller("base.simplepage.controller")
@RequestMapping("/{context}/p.spr")
public class SimplePageController extends BaseMultiActionController {
	@Autowired
	private JdbcTemplate jdbcTemplate;

	@RequestMapping
	public String handleDefault(@PathVariable("context") String context,
			String page, Model model) throws Exception {
		AtomicInteger inte=new AtomicInteger();
		return "/performance/" + context + "/" + page;

	}
	@RequestMapping("action=test")
	public String test(@PathVariable("context") String context,
			String page, Model model) throws Exception {
		return "jsonview";

	}

	
}
