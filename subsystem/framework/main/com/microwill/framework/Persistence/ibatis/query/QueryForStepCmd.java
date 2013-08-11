package com.microwill.framework.Persistence.ibatis.query;

import java.util.HashMap;
import java.util.Map;

import com.microwill.framework.context.Context;
import com.microwill.framework.context.util.ContextParamUtils;

public class QueryForStepCmd extends IbatisQuery {
	public boolean execute(Context context) throws Exception {
		Map paramMap = (Map) ContextParamUtils.getParam(context, 1);
		Map resurltMap=new HashMap();
		if(paramMap.containsKey("viewName")){
			setNeedConvert(true); 
			resurltMap=queryForStepList("defaultQuery.findByStep","defaultQuery.findCount",paramMap);
		}else if(paramMap.containsKey("tableSqlMap") && paramMap.containsKey("tableCountSqlMap")){
			if(paramMap.containsKey("needFieldConvert")){
				setNeedConvert(true); 
			}else{
				setNeedConvert(false); 
			}
			resurltMap=queryForStepList(paramMap.get("tableSqlMap").toString(),paramMap.get("tableCountSqlMap").toString(),paramMap);
		}
		ContextParamUtils.putResult(context, resurltMap);
		return false;
	}
}
