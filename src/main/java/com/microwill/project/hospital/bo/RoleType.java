/**
 * 
 */
package com.microwill.project.hospital.bo;

/**
 * @author Administrator
 *
 */
public enum RoleType {
	ADMIN("admin", "管理员"), 
	BMSTAFF("bmstaff", "职能部门员工"), 
	BMMANAGER("bmmanager", "职能部门领导"),
	KSSTAFF("ksstaff", "临床科室员工"), 
	KSMANAGER("ksmanager", "临床科室领导");
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
		if(jb.equals("0")){//管理员
			return RoleType.ADMIN;
		}else if(jb.equals("1")&&bm.equals("bm")){
			return RoleType.BMSTAFF;
		}else if(jb.equals("2")&&bm.equals("bm")){
			return RoleType.BMMANAGER;
		}else if(jb.equals("1")&&bm.equals("ks")){
			return RoleType.KSSTAFF;
		}else if(jb.equals("2")&&bm.equals("ks")){
			return RoleType.KSMANAGER;
		}
		throw new IllegalArgumentException();
	}

}
