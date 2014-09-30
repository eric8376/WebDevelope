package com.microwill.project.BGM.web.mobile;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.microwill.framework.annotation.NotLogin;
import com.microwill.framework.vo.mobile.MobileResult;
import com.microwill.framework.web.AppBaseController;

@Controller
@RequestMapping("/m/operateAide")
public class BindingController extends AppBaseController {
	@NotLogin
	@RequestMapping(value = "binduser.json")
	public String registerPage(Model model) {
		 MobileResult result = new MobileResult();
	     result.setCode(101);
		 model.addAttribute("result", result);
	     return "jsonview";
	}
}
