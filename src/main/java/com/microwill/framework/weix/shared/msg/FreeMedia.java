package com.microwill.framework.weix.shared.msg;

import com.thoughtworks.xstream.annotations.XStreamAlias;

/**
 * 引用外部资源的多媒体消息。
 * 
  * 
 * 
 * 
 *
 */
public abstract class FreeMedia
{
	// 多媒体标题 ，可选  
	@XStreamAlias("Title")
    public String title;  
    // 多媒体描述   可选
	@XStreamAlias("Description")
	public String description;
	
	public FreeMedia(String title, String description)
	{
		this.title = title;
		this.description = description;
	}
	
	
}
