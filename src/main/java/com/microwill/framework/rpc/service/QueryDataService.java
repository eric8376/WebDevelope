/**
 * 
 */
package com.microwill.framework.rpc.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;

/**
 * @author Administrator
 *
 */
public class QueryDataService {
	private JdbcTemplate jdbcTemplate;

	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	public Map<String,Object> query(String sql){
		Map<String,Object> map=new HashMap<String,Object>();
		map.put("list", jdbcTemplate.queryForList(sql));
		return map;
	}

}
