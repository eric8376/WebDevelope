package com.microwill.framework.Persistence.ibatis.query;

import java.util.List;
import java.util.Map;

import com.microwill.framework.context.Context;
import com.microwill.framework.context.util.ContextParamUtils;

public class QueryForListCmd extends IbatisQuery{

	public boolean execute(Context context) throws Exception {
		Map paramMap = (Map) ContextParamUtils.getParam(context, 1);
		List rs=null;
		if(paramMap.containsKey("viewName")){
			setNeedConvert(true); 
		  rs=queryForList("defaultQuery.find",paramMap);
		}else if(paramMap.containsKey("tableSqlMap")){
			if(paramMap.containsKey("needFieldConvert")){
				setNeedConvert(true); 
			}else{
				setNeedConvert(false);  
			} 
		  rs=queryForList(paramMap.get("tableSqlMap").toString(),paramMap);
		}
		ContextParamUtils.putResult(context, rs);
		return false;
	}
	

}
