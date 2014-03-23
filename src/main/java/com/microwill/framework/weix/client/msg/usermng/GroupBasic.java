package com.microwill.framework.weix.client.msg.usermng;

/**
 * 分组基本信息，用于创建分组应答
 * 
 * 
 * 
 * 
 *
 */
public class GroupBasic extends GroupMin
{
	// 分组id，由微信分配 
	public long id;

	public GroupBasic()
	{
		
	}
	
	public GroupBasic(long id, String name)
	{
		super(name);
		this.id = id;
	}
}
