package com.microwill.framework.weix.client.msg.menu;

import com.microwill.framework.weix.client.msg.BaseResp;

/**
 * 获取菜单消息的应答。
 * 
 * 
 * 
 * 
 *
 */
public class GetMenuResp extends BaseResp
{
	private Menu menu;

	public Menu getMenu()
	{
		return menu;
	}

	public void setMenu(Menu menu)
	{
		this.menu = menu;
	}
}
