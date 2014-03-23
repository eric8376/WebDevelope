package com.microwill.framework.weix.client.msg.usermng;

/**
 * 修改分组名称请求
 * 
 * 
 * 
 * 
 *
 */
public class UpdateGroupReq
{
	public GroupBasic group;

	public UpdateGroupReq(GroupBasic group)
	{
		super();
		this.group = group;
	}

}
