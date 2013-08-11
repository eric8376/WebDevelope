/**
 * 
 */
package com.microwill.ws.sample;

import java.util.HashMap;
import java.util.Map;

import javax.jws.WebParam;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Style;

import com.microwill.framework.Persistence.ibatis.query.QueryDataCmd;
import com.microwill.framework.command.impl.DefaultContextImpl;
import com.microwill.framework.context.ContextKey;
import com.microwill.framework.context.util.ContextUtils;
import com.microwill.framework.rpc.help.JSONExecuteHelp;

@WebService
@SOAPBinding(style = Style.RPC)
@SuppressWarnings("deprecation")
public class HospitalService implements IHospitalService {
	private QueryDataCmd queryDataCmd;

	public QueryDataCmd getQueryDataCmd() {
		return queryDataCmd;
	}

	public void setQueryDataCmd(QueryDataCmd queryDataCmd) {
		this.queryDataCmd = queryDataCmd;
	}

	public String queryForList(@WebParam(name = "sql") String sql)
			throws Exception {
		DefaultContextImpl context = new DefaultContextImpl();
		Map map = new HashMap();
		map.put("sql", sql);
		ContextUtils.addToContext(context, ContextKey.COMMAND_PARAM,
				new Object[] { map });
		queryDataCmd.execute(context);
		Object result = ContextUtils.getObject(context,
				ContextKey.COMMAND_RESULT);
		return JSONExecuteHelp.parseJSONText(result);
	}

}