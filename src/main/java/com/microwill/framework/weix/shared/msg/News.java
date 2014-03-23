package com.microwill.framework.weix.shared.msg;

import java.util.Arrays;
import java.util.List;

/**
 * 图文消息
 * 
 *
 */
public class News
{
	public List<Article> articles;

	public News(List<Article> articles)
	{
		this.articles = articles;
	}
	
	public News(Article... article)
	{
		this(Arrays.asList(article));
	}

}
