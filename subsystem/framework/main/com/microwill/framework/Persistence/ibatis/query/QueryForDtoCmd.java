package com.microwill.framework.Persistence.ibatis.query;

import java.util.Map;

import com.microwill.framework.context.Context;
import com.microwill.framework.context.util.ContextParamUtils;

public class QueryForDtoCmd extends IbatisQuery {
	public boolean execute(Context context) throws Exception {
		Map paramMap = (Map) ContextParamUtils.getParam(context, 1);
		Map dto=null;
		if(paramMap.containsKey("viewName")){
			setNeedConvert(true); 
			dto=queryForDto("defaultQuery.find",paramMap);
		}else if(paramMap.containsKey("tableSqlMap")){
			setNeedConvert(false); 
			dto=queryForDto(paramMap.get("tableSqlMap").toString(),paramMap);
		}
		ContextParamUtils.putResult(context, dto);
		return false;
	}
}
