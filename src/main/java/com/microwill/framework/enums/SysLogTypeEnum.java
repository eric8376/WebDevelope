package com.microwill.framework.enums;

public enum SysLogTypeEnum {
	/**
	 * web后台
	 */
	WebAdmin(0),
	/**
	 * 壮壮贷款-供应商
	 */
	WebFrontForSupply(1),
	/**
	 * 壮壮贷款-零售商
	 */
	WebFrontForBizstore(2),
	/**
	 * 胖胖理财
	 */
	WebFrontForPersonalLender(3),
	/**
	 * 壮壮贷款，胖胖理财
	 */
	WebCommonFront(4),
	/**
	 * 后台，壮壮贷款，胖胖理财
	 */
	WebCommon(5),
	/**
	 * 手机app
	 */
	MobileApp(6),
	/**
	 * 手机web
	 */
	MobileWeb(7),
	/**
	 * 其他
	 */
	Other(8);

	private SysLogTypeEnum(Integer logType) {
		this.logType = logType;
	}

	/**
	 * 操作类型
	 */
	private final Integer logType;

	public Integer getLogType() {
		return logType;
	}
	
	
}
