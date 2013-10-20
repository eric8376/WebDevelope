/**
 * 
 */
package com.microwill.framework.rpc.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

/**
 * @author Administrator
 * 
 */
@Service("queryDataSvc")
public class QueryDataService {
	@Autowired
	private JdbcTemplate jdbcTemplate;
	@Autowired
	private SessionFactory sessionFactory;

	public Map<String, Object> query(Map<String, String> sqlMap) {
		String sql = sqlMap.get("sql");
		String paging = sqlMap.get("paging");
		Map<String, Object> map = new HashMap<String, Object>();//包含结果集和页数
		if (StringUtils.isNotEmpty(paging) && "true".equals(paging)) {

			int endindex = sql.indexOf("limit");
			String countSql = "select count(1) from ("
					+ sql.substring(0, endindex) + " ) alltable";
			int totalCount = jdbcTemplate.queryForInt(countSql);
			map.put("totalCount", totalCount);
		}
		;
		List<Map<String, Object>> list = jdbcTemplate.queryForList(sql);
		list = (list == null) ? new ArrayList<Map<String, Object>>() : list;
		map.put("list", list);
		return map;
	}

	public Map<String, Object> queryH(Map<String, String> sqlMap) {
		String sql = sqlMap.get("hql");
		Map<String, Object> map = new HashMap<String, Object>();
		return map;
	}

}
