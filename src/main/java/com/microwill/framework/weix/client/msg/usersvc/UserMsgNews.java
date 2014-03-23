package com.microwill.framework.weix.client.msg.usersvc;

import com.microwill.framework.weix.shared.msg.News;

/**
 * 发送给客户的图文信息
 * 
 * 
 * 
 * 
 * 
 */
public class UserMsgNews extends UserMsg {
    public News news;

    public UserMsgNews(String touser, News news) {
	super(touser, "news");
	this.news = news;
    }

}
