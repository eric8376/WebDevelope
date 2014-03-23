package com.microwill.framework.weix.shared.msg;

import com.thoughtworks.xstream.annotations.XStreamAlias;

/**
 * 多媒体扩展消息，包括标题及描述,可对应微消息中的video与voice
 * 
 * 
 * 
 * 
 *
 */
public class MediaEx extends Media
{
	// 多媒体标题 ，可选  
	@XStreamAlias("Title")
    public String title;  
    // 多媒体描述   可选
	@XStreamAlias("Description")
	public String description;
	
	public MediaEx(String media_id, String title, String description)
	{
		super(media_id);
		this.title = title;
		this.description = description;
	}  
}
