package com.microwill.project.DG.entity;

// Generated 2014-5-6 23:15:18 by Hibernate Tools 3.4.0.CR1

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * AincDeviceCfgMr generated by hbm2java
 */
@Entity
@Table(name = "ainc_device_cfg_mr", catalog = "netctrl")
public class AincDeviceCfgMr implements java.io.Serializable {

	private String ndcmDeviceId;
	private String ndcmName;
	private String ndcmCfg1;
	private String ndcmCfg2;
	private String ndcmCfg3;

	public AincDeviceCfgMr() {
	}

	public AincDeviceCfgMr(String ndcmDeviceId) {
		this.ndcmDeviceId = ndcmDeviceId;
	}

	public AincDeviceCfgMr(String ndcmDeviceId, String ndcmName,
			String ndcmCfg1, String ndcmCfg2, String ndcmCfg3) {
		this.ndcmDeviceId = ndcmDeviceId;
		this.ndcmName = ndcmName;
		this.ndcmCfg1 = ndcmCfg1;
		this.ndcmCfg2 = ndcmCfg2;
		this.ndcmCfg3 = ndcmCfg3;
	}

	@Id
	@Column(name = "ndcm_device_id", unique = true, nullable = false, length = 12)
	public String getNdcmDeviceId() {
		return this.ndcmDeviceId;
	}

	public void setNdcmDeviceId(String ndcmDeviceId) {
		this.ndcmDeviceId = ndcmDeviceId;
	}

	@Column(name = "ndcm_name", length = 100)
	public String getNdcmName() {
		return this.ndcmName;
	}

	public void setNdcmName(String ndcmName) {
		this.ndcmName = ndcmName;
	}

	@Column(name = "ndcm_cfg1", length = 50)
	public String getNdcmCfg1() {
		return this.ndcmCfg1;
	}

	public void setNdcmCfg1(String ndcmCfg1) {
		this.ndcmCfg1 = ndcmCfg1;
	}

	@Column(name = "ndcm_cfg2", length = 50)
	public String getNdcmCfg2() {
		return this.ndcmCfg2;
	}

	public void setNdcmCfg2(String ndcmCfg2) {
		this.ndcmCfg2 = ndcmCfg2;
	}

	@Column(name = "ndcm_cfg3", length = 50)
	public String getNdcmCfg3() {
		return this.ndcmCfg3;
	}

	public void setNdcmCfg3(String ndcmCfg3) {
		this.ndcmCfg3 = ndcmCfg3;
	}

}
