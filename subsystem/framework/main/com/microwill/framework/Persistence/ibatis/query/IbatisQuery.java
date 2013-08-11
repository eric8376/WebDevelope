package com.microwill.framework.Persistence.ibatis.query;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.microwill.framework.Persistence.help.MapUtils;
import com.microwill.framework.command.DaoSupportCmd;
import com.microwill.framework.context.Context;

public class IbatisQuery extends DaoSupportCmd {
	private boolean isNeedConvert = false;
	public boolean execute(Context context) throws Exception {
		return false;
	}
	public final List queryForList(String arg0, Object arg1) {
		List rtL = null;
		List list = getSqlMapClientTemplate().queryForList(arg0, arg1);
		
		if (list.size() > 0) {
			if(isNeedConvert){
			rtL = new ArrayList(list.size());
			for (int i = 0; i < list.size(); i++) {
				Map map = MapUtils.convert((Map)list.get(i));
				rtL.add(map);
			}
		  }else{
			  rtL = list;
		  }
		} else {
			rtL = new ArrayList(0);
		}
		return rtL; 
	}

	public final Integer queryForRowNumber(String arg0, Object arg1) {
		return (Integer) getSqlMapClientTemplate().queryForObject(arg0, arg1);
	}

	public final Object queryForObject(String arg0, Object arg1) {
		return getSqlMapClientTemplate().queryForObject(arg0, arg1);
	}

	public final Map queryForDto(String arg0, Object arg1) throws Exception {
		List list = getSqlMapClientTemplate().queryForList(arg0, arg1);
		if (list != null && list.size() > 0) {
			if(isNeedConvert){
				return  MapUtils.convert((Map)list.get(0));	
			}else{
			   return (Map) list.get(0);
			}
		}
		return null;
	}

	public final Map queryForStepList(String querySqlMap,String countSqlMap,Map conditionMap) throws Exception {
		try {
			Map map = new HashMap();
			map = (Map) ((HashMap) conditionMap).clone();
			String pageIndex = map.get("pageIndex").toString();
			String pageSize =  map.get("pageSize").toString();
			String pageCount = (String) map.get("pageCount");
			map.remove("pageIndex");
			map.remove("pageSize");
			map.remove("pageCount");
			int pageCountInit;
			int recordSize = 0;
			if (pageCount != null && !pageIndex.equalsIgnoreCase("1")) {
				pageCountInit = Integer.parseInt(pageCount);
			} else {
				Integer cnt = queryForRowNumber(countSqlMap, map);
				recordSize = cnt.intValue();
				int pageSizeInt = Integer.parseInt(pageSize);
				pageCountInit = (recordSize+pageSizeInt-1) / pageSizeInt;
				
			}
			map.put("startIndex",
					new Integer((Integer.parseInt(pageSize) * (Integer
							.parseInt(pageIndex) - 1)) + 1));
			map.put("endIndex", new Integer(Integer.parseInt(pageSize)
					* Integer.parseInt(pageIndex)));
			List list = queryForList(querySqlMap,map);
			Map rtMap = new HashMap();
			rtMap.put("list", list);
			rtMap.put("pageIndex", String.valueOf(pageIndex));
			rtMap.put("pageSize", String.valueOf(pageSize));
			rtMap.put("pageCount", String.valueOf(pageCountInit));
			rtMap.put("recordCount", String.valueOf(recordSize));
			return rtMap;
		} catch (Exception ex) {
			throw new Exception(querySqlMap, ex);
		}
	}

	public boolean isNeedConvert() {
		return isNeedConvert;
	}

	public void setNeedConvert(boolean isNeedConvert) {
		this.isNeedConvert = isNeedConvert;
	}
}
