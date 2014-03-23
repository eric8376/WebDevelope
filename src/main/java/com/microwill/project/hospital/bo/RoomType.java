/**
 * 
 */
package com.microwill.project.hospital.bo;

/**
 * @author Administrator
 *
 */
public enum RoomType {
	MANAGE("bm", "管理科室"), OPERATE("ks", "临床科室");
	private RoomType(String code, String desc) {
		this.code = code;
		this.desc = desc;
	}

	private String code;
	public String getCode() {
		return code;
	}

	public String getDesc() {
		return desc;
	}

	private String desc;

	public static RoomType fromCode(String code) {
		for (RoomType name : RoomType.values()) {
			if (name.code.equals(code)) {
				return name;
			}
		}
		throw new IllegalArgumentException();
	}

}
