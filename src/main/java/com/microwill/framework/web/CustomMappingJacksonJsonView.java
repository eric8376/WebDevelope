package com.microwill.framework.web;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.view.json.MappingJacksonJsonView;

import com.microwill.framework.vo.Result;

public class CustomMappingJacksonJsonView extends MappingJacksonJsonView {

	@Override
	public void render(Map<String, ?> model, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {

			super.render(model, request, response);
		} catch (Exception e) {
			model.clear();
			Result result = new Result();
			result.setSuccess(false);
			result.setMsg("类型转换异常：" + e.getMessage());
			Map<String, Object> theModel = (Map<String, Object>) model;
			theModel.put("result", result);
			super.render(theModel, request, response);

		}
	}

}
