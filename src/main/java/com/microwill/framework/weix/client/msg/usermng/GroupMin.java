package com.microwill.framework.weix.client.msg.usermng;

/**
 * 分组基本信息,用于创建分组请求。
 * 
 * 
 * 
 * 
 *
 */
public class GroupMin
{
	// 分组名字（30个字符以内） 
	public String name;
	
	public GroupMin(){}

	public GroupMin(String name)
	{
		super();
		this.name = name;
	}
}
