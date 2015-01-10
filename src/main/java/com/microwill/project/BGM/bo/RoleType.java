/**
 * 
 */
package com.microwill.project.BGM.bo;

/**
 * @author Administrator
 *
 */
public enum RoleType {
	ADMIN("1", "管理员"), 
	STAFF("2", "职员");
	private RoleType(String role, String desc) {
		this.role = role;
		this.desc = desc;
	}

	private String role;
	
	private String desc;

	public String getRole() {
		return role;
	}

	public String getDesc() {
		return desc;
	}

	public static RoleType fromCode(String code) {
		for (RoleType name : RoleType.values()) {
			if (name.role.equals(code)) {
				return name;
			}
		}
		throw new IllegalArgumentException();
	}

	public static RoleType fromCode(String jb,String bm) {
		if(jb.equals("1")){//管理员
			return RoleType.ADMIN;
		}else if(jb.equals("2")){
			return RoleType.STAFF;
		}
		throw new IllegalArgumentException();
	}

}
