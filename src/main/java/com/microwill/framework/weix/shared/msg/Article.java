package com.microwill.framework.weix.shared.msg;

import com.thoughtworks.xstream.annotations.XStreamAlias;

/**
 * 图文消息的一项
 * 
 * 
 * 
 * 
 *
 */
@XStreamAlias("item")
public class Article extends FreeMedia
{
    // 图片链接，支持JPG、PNG格式，较好的效果为大图640*320，小图80*80，限制图片链接的域名需要与开发者填写的基本资料中的Url一致   
	@XStreamAlias("PicUrl")
	public String picurl;
    
    // 点击图文消息跳转链接
	@XStreamAlias("URL")
    public String url;

	public Article( String title, String description,
			String picurl, String url)
	{
		super(title, description);
		this.picurl = picurl;
		this.url = url;
	}
}
