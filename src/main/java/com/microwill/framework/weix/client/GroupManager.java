package com.microwill.framework.weix.client;

import com.microwill.framework.weix.client.msg.BaseResp;
import com.microwill.framework.weix.client.msg.usermng.CreateGroupResp;
import com.microwill.framework.weix.client.msg.usermng.GroupBasic;
import com.microwill.framework.weix.client.msg.usermng.GetGroupsResp;
import com.microwill.framework.weix.client.msg.usermng.UpdateUserGroupReq;

/**
 * 用户分组管理接口。
 * 
 * 
 * 
 * 
 *
 */
public interface GroupManager
{
	/**
	 * 查询用户分组信息
	 * 
	 * @return
	 */
	GetGroupsResp getGroups();
	

	/**
	 * 创建用户分组
	 * @param name 分组名
	 * @return
	 */
	CreateGroupResp createGroup(String name);
	

	/**
	 * 修改分组信息
	 * @param group 新的分组信息
	 * @return
	 */
	BaseResp updateGroup(GroupBasic group);
	
	/**
	 * 修改用户分组
	 * 
	 * @param req
	 * @return
	 */
	BaseResp updateUserGroup(UpdateUserGroupReq req);
	
}
