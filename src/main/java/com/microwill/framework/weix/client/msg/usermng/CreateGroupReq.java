package com.microwill.framework.weix.client.msg.usermng;

/**
 * 创建用户组请求
 * 
 * 
 * 
 * 
 *
 */
public class CreateGroupReq
{	
	public GroupMin group;

	public CreateGroupReq(GroupMin group)
	{
		super();
		this.group = group;
	}
}
