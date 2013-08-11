/**
 * 
 */
package com.microwill.prfrmn.hospital.bo;

/**
 * @author Administrator
 *
 */
public enum UserType {
	ADMIN("0", "管理员"), STAFF("1", "员工"), MANEGER("2", "领导");
	private UserType(String code, String desc) {
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

	public static UserType fromCode(String code) {
		for (UserType name : UserType.values()) {
			if (name.code.equals(code)) {
				return name;
			}
		}
		throw new IllegalArgumentException();
	}

}
