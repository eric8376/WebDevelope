package com.microwill.framework.weix.shared.msg;

import com.thoughtworks.xstream.annotations.XStreamAlias;

/**
 * 音乐消息
 * 
 * 
 * 
 * 
 *
 */
public class Music extends FreeMedia
{

	@XStreamAlias("MusicURL")
	public String musicurl;
    // 高质量音乐链接，WIFI环境优先使用该链接播放音乐
    @XStreamAlias("HQMusicUrl")
    public String hqmusicurl;
    // 缩略图的媒体id，通过上传多媒体文件，得到的id 
    @XStreamAlias("ThumbMediaId")
    public String thumb_media_id;
    
	public Music(String title, String description,
			String musicurl, String hqmusicurl, String thumb_media_id)
	{
		super(title, description);
		
		this.musicurl = musicurl;
		this.hqmusicurl = hqmusicurl;
		this.thumb_media_id = thumb_media_id;
	}
}
