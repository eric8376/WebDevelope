package com.microwill.framework.weix.client;

import com.microwill.framework.weix.client.msg.BaseResp;
import com.microwill.framework.weix.client.msg.menu.GetMenuResp;
import com.microwill.framework.weix.client.msg.menu.Menu;

/**
 * 菜单管理接口
 * 
 * 
 * 
 * 
 *
 */
public interface MenuManager
{
	/**
	 * 创建菜单
	 * @param menu
	 * @return
	 */
	BaseResp createMenu(Menu menu);
	/**
	 * 删除菜单
	 * @return
	 */
	BaseResp deleteMenu();
	/**
	 * 获取菜单信息
	 * @return
	 */
	GetMenuResp getMenu();
}
