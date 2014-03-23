package com.microwill.framework.weix.client;

import com.microwill.framework.weix.client.msg.usermng.UserInfoResp;

/**
 * 用户管理
 * 
 * 
 * 
 * 
 *
 */
public interface UserManager extends GroupManager
{
	/**
	 * 获取用户信息
	 * 
	 * 在关注者与公众号产生消息交互后，公众号可获得关注者的OpenID
	 * （加密后的微信号，每个用户对每个公众号的OpenID是唯一的。对于不同公众号，同一用户的openid不同）。
	 * 公众号可通过本接口来根据OpenID获取用户基本信息，包括昵称、头像、性别、所在城市、语言和关注时间。
	 * 
	 * @param openid 用户的OPENID
	 * @return
	 */
	UserInfoResp getUserInfo(String openid);
}
