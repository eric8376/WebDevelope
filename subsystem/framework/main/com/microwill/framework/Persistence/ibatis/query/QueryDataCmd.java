package com.microwill.framework.Persistence.ibatis.query;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.MapUtils;
import org.apache.commons.collections.map.ListOrderedMap;
import org.apache.commons.lang.StringUtils;

import com.microwill.framework.command.DaoSupportCmd;
import com.microwill.framework.context.Context;
import com.microwill.framework.context.util.ContextParamUtils;
//import com.microwill.framework.Persistence.help.QueryUtils;
import com.microwill.framework.util.PaginationSupport;

public class QueryDataCmd extends DaoSupportCmd {
	public boolean execute(Context context)throws Exception{
		Map contextMap = ContextParamUtils.getParamMap(context, 1);

		try {
			if(contextMap.containsKey("viewName")){
				String viewName = MapUtils.getString(contextMap,"viewName");
				String sql = "select * from "+viewName;
				contextMap.put("sql",sql);
			}
			StringBuffer tempSql = new StringBuffer();
			tempSql.append(MapUtils.getString(contextMap, "sql"));

			if(contextMap.containsKey("advQueryC")){
				if(tempSql.toString().toLowerCase().indexOf(" where ")>=0){
				   tempSql.append(" and ");
				}else{
				   tempSql.append(" where ");
				}
				tempSql.append(MapUtils.getString(contextMap,"advQueryC"));
			}
			if(contextMap.containsKey("orderBy")){
				tempSql.append(MapUtils.getString(contextMap,"orderBy"));
			}
			
			contextMap.put("sql",tempSql.toString());
			
			Map resultMap = new HashMap();
			if(contextMap.containsKey("pageIndex")){
				String pageIndex = MapUtils.getString(contextMap,"pageIndex");
				String pageSize = MapUtils.getString(contextMap,"pageSize");
	    		int pSize = Integer.parseInt(pageSize);
	    		int pIndex = Integer.parseInt(pageIndex);
	    		int rIndex = (pIndex-1)*pSize+1;
	    		resultMap.put("recordIndex", String.valueOf(rIndex));
	    		
			    if(contextMap.containsKey("pageCount")){
			    	String pageCount = MapUtils.getString(contextMap,"pageCount");
			    	if(pageCount.equalsIgnoreCase("-1") ||pageIndex.equalsIgnoreCase("1")){
			    		int recordCount = getJdbcTemplate().queryForInt("select count(*) from ("+tempSql.toString()+")");	
			    		resultMap.put("recordCount",String.valueOf(recordCount));
			    		int pCount = (recordCount-1+pSize) / pSize;
			    		pageCount = String.valueOf(pCount);
			    	}
			    	resultMap.put("pageCount", pageCount);
			    }
			    contextMap.put("sql","select * from(select rownum RESULT_INDEX,a.* from ("+tempSql.toString()+") a )"+"where RESULT_INDEX between "+rIndex+" and "+(pIndex*pSize)+" ");
			}
			 
			String querySql = MapUtils.getString(contextMap, "sql");
			resultMap.put("querySql", querySql);
			List list = null;
			list = getJdbcTemplate().queryForList(querySql);
			resultMap.put("list", listConvert(list));
			ContextParamUtils.putResult(context, resultMap);
		} catch (Exception ex) {
			throw new Exception(ex);
		}		
		return false;
	}
	private List listConvert(List list) {
		List resultList = new ArrayList();
		if (list == null || list.size() == 0) {
			return null;
		} else {
			for (int i = 0; i < list.size(); i++) {
				resultList.add(convert((Map) list.get(i)));
			}
		}
		return resultList;
	}

	public static Map convert(Map arg0) {
		Map map = null;
		if (arg0 != null && arg0.size() > 0) {
			map = new ListOrderedMap();
			Iterator ir = arg0.keySet().iterator();
			while (ir.hasNext()) {
				String key = (String) ir.next();
				//Object value = QueryUtils.getResultSetValue(arg0.get(key));
				Object value = arg0.get(key);
				if (value == null) {
					value = "";
				}
				key = convertStr(key);
				map.put(key, value);
			}
		}
		return map;
	}

	private static String convertStr(String arg0) {
		String sa[] = StringUtils.split(arg0, "_");
		int len = sa.length;
		for (int i = 0; i < len; i++)
		  sa[i] = StringUtils.capitalise(StringUtils.lowerCase(sa[i]));
		
		sa[0] = StringUtils.lowerCase(sa[0]);
		 
		return StringUtils.join(sa, null);
	}
	public PaginationSupport query(String sql,int pageSize,int pageIndex)
	{
		
		int recordCount = getJdbcTemplate().queryForInt("select count(*) from ("+sql.toString()+")");
		int start=pageSize*(pageIndex-1)+1;
		int end=pageSize*pageIndex;
		sql="select * from(select rownum RESULT_INDEX,xxx.* from ("+sql.toString()+") xxx )"+"where RESULT_INDEX between "+start+" and "+end+" ";
		System.out.println(sql);
		List items=getJdbcTemplate().queryForList(sql);
	    return new PaginationSupport(items, recordCount, pageIndex, pageSize, false);
	
	}
}
