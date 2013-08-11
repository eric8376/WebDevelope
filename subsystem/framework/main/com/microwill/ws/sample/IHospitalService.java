/**
 * 
 */
package com.microwill.ws.sample;

import javax.jws.WebParam;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Style;

import com.microwill.ws.sample.entity.User;

@WebService
@SOAPBinding(style = Style.RPC)
public interface IHospitalService {

	public String queryForList(@WebParam(name = "sql") String sql) throws Exception;

	
}