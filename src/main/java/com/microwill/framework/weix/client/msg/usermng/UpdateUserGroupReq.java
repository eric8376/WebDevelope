package com.microwill.framework.weix.client.msg.usermng;

/**
 * 修改用户分组请求
 * 
 * 
 * 
 * 
 *
 */
public class UpdateUserGroupReq
{
	// 用户唯一标识符
	public String openid;
	// 分组id
	public long to_groupid;
	
	public UpdateUserGroupReq(String openid, long to_groupid)
	{
		this.openid = openid;
		this.to_groupid = to_groupid;
	}  
}
