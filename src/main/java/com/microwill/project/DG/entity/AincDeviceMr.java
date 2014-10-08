package com.microwill.project.DG.entity;

// Generated 2014-5-6 23:15:18 by Hibernate Tools 3.4.0.CR1

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * AincDeviceMr generated by hbm2java
 */
@Entity
@Table(name = "ainc_device_mr", catalog = "netctrl")
public class AincDeviceMr implements java.io.Serializable {

	private String ndmId;
	private String ndmDesc;
	private String ndmStatus;
	private String ndmMode;
	private String ndmParentId;
	private String ndmParentCmode;
	private String ndmChildIId;
	private String ndmChildCmode;

	public AincDeviceMr() {
	}

	public AincDeviceMr(String ndmId, String ndmStatus) {
		this.ndmId = ndmId;
		this.ndmStatus = ndmStatus;
	}

	public AincDeviceMr(String ndmId, String ndmDesc, String ndmStatus,
			String ndmMode, String ndmParentId, String ndmParentCmode,
			String ndmChildIId, String ndmChildCmode) {
		this.ndmId = ndmId;
		this.ndmDesc = ndmDesc;
		this.ndmStatus = ndmStatus;
		this.ndmMode = ndmMode;
		this.ndmParentId = ndmParentId;
		this.ndmParentCmode = ndmParentCmode;
		this.ndmChildIId = ndmChildIId;
		this.ndmChildCmode = ndmChildCmode;
	}

	@Id
	@Column(name = "ndm_id", unique = true, nullable = false, length = 12)
	public String getNdmId() {
		return this.ndmId;
	}

	public void setNdmId(String ndmId) {
		this.ndmId = ndmId;
	}

	@Column(name = "ndm_desc", length = 100)
	public String getNdmDesc() {
		return this.ndmDesc;
	}

	public void setNdmDesc(String ndmDesc) {
		this.ndmDesc = ndmDesc;
	}

	@Column(name = "ndm_status", nullable = false, length = 2)
	public String getNdmStatus() {
		return this.ndmStatus;
	}

	public void setNdmStatus(String ndmStatus) {
		this.ndmStatus = ndmStatus;
	}

	@Column(name = "ndm_mode", length = 10)
	public String getNdmMode() {
		return this.ndmMode;
	}

	public void setNdmMode(String ndmMode) {
		this.ndmMode = ndmMode;
	}

	@Column(name = "ndm_parent_id", length = 12)
	public String getNdmParentId() {
		return this.ndmParentId;
	}

	public void setNdmParentId(String ndmParentId) {
		this.ndmParentId = ndmParentId;
	}

	@Column(name = "ndm_parent_cmode", length = 5)
	public String getNdmParentCmode() {
		return this.ndmParentCmode;
	}

	public void setNdmParentCmode(String ndmParentCmode) {
		this.ndmParentCmode = ndmParentCmode;
	}

	@Column(name = "ndm_childI_id", length = 12)
	public String getNdmChildIId() {
		return this.ndmChildIId;
	}

	public void setNdmChildIId(String ndmChildIId) {
		this.ndmChildIId = ndmChildIId;
	}

	@Column(name = "ndm_child_cmode", length = 5)
	public String getNdmChildCmode() {
		return this.ndmChildCmode;
	}

	public void setNdmChildCmode(String ndmChildCmode) {
		this.ndmChildCmode = ndmChildCmode;
	}

}