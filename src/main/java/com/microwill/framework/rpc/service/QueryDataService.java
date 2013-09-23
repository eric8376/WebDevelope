/**
 * 
 */
package com.microwill.framework.rpc.service;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
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
	public Map<String,Object> query(Map<String, String> sqlMap){
		String sql = sqlMap.get("sql");
		String paging = sqlMap.get("paging");
		Map<String, Object> map = new HashMap<String, Object>();
		if (StringUtils.isNotEmpty(paging) && "true".equals(paging)) {
		
			int endindex = sql.indexOf("limit");
			String countSql = "select count(1) from ("
					+ sql.substring(0, endindex)+" ) alltable";
			map.put("totalCount", jdbcTemplate.queryForInt(countSql));
		}
		map.put("list", jdbcTemplate.queryForList(sql));

		return map;
	}

}
