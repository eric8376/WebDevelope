
package com.microwill.framework.vo.mobile;

import java.util.Date;

/**
 * 登录的mobile用户令牌
 * @author lizhen
 */
public class MobileToken {

	/**
	 * 创建一个登录用户的令牌
	 * @param userId		登录用户的用户主键
	 * @param supplyName		借款人企业名称-供应商
	 * @param loginFirstTime	第一次登陆时间
	 */
	public MobileToken(String userId,String supplyName,Date loginFirstTime,String supplyId) {
		super();
		this.userId = userId;
		this.supplyName=supplyName;
		this.loginFirstTime=loginFirstTime;
		this.supplyId=supplyId;
	}

	/**
	 * 登录用户的用户主键
	 */
	private final String userId;
	
	/**
	 * 供应商名称(企业名称)-供应商角色时
	 */
	private final String supplyName;
	
	/**
	 * 供应商第一次登陆App的时间
	 */
	private final Date loginFirstTime;
	
	/**
	 * 供应商的编号
	 */
	private final String supplyId;

	public String getSupplyId() {
		return supplyId;
	}

	public String getUserId() {
		return userId;
	}

	public String getSupplyName() {
		return supplyName;
	}

	public Date getLoginFirstTime() {
		return loginFirstTime;
	}
	
}
