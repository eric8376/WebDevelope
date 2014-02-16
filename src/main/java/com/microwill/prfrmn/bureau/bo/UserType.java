/**
 * 
 */
package com.microwill.prfrmn.bureau.bo;

/**
 * @author Administrator
 *
 */
public enum UserType {
	ADMIN("0", "管理员"), LEADER("1", "质控中心领导"), STAFF("2", "质控中心职员"),ORGANIZATION("3", "医疗机构"),BUREAULEADER("4","局领导");
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
