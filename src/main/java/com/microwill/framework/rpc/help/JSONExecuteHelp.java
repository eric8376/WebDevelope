package com.microwill.framework.rpc.help;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsonorg.JsonOrgModule;


public class JSONExecuteHelp {
	public static String SERVICE_NAME = "serviceName";

	public static String METHOD_NAME = "methodName";

	public static String PARAMETER = "para";

	public static String EXCEPTION = "exception";
	public static String parseJSONText(Object obj) throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		mapper.registerModule(new JsonOrgModule());
		return mapper.writeValueAsString(obj);

	}
	public static List analyzeJSONArray(JSONArray para) {
		ObjectMapper mapper = new ObjectMapper();
		mapper.registerModule(new JsonOrgModule());
		return mapper.convertValue(para, ArrayList.class);
	}

}
