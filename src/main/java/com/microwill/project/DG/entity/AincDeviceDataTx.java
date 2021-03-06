package com.microwill.project.DG.entity;

// Generated 2014-5-6 23:15:18 by Hibernate Tools 3.4.0.CR1

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * AincDeviceDataTx generated by hbm2java
 */
@Entity
@Table(name = "ainc_device_data_tx", catalog = "netctrl")
public class AincDeviceDataTx implements java.io.Serializable {

	private String nddtId;
	private String nddtTypeId;
	private String nddtData;
	private String nddtDataUnit;
	private Date nddtReceiveDate;
	private String nddtReceiveAdress;
	private String nddtReceiveUser;

	public AincDeviceDataTx() {
	}

	public AincDeviceDataTx(String nddtId, String nddtTypeId, String nddtData,
			String nddtDataUnit, Date nddtReceiveDate) {
		this.nddtId = nddtId;
		this.nddtTypeId = nddtTypeId;
		this.nddtData = nddtData;
		this.nddtDataUnit = nddtDataUnit;
		this.nddtReceiveDate = nddtReceiveDate;
	}

	public AincDeviceDataTx(String nddtId, String nddtTypeId, String nddtData,
			String nddtDataUnit, Date nddtReceiveDate,
			String nddtReceiveAdress, String nddtReceiveUser) {
		this.nddtId = nddtId;
		this.nddtTypeId = nddtTypeId;
		this.nddtData = nddtData;
		this.nddtDataUnit = nddtDataUnit;
		this.nddtReceiveDate = nddtReceiveDate;
		this.nddtReceiveAdress = nddtReceiveAdress;
		this.nddtReceiveUser = nddtReceiveUser;
	}

	@Id
	@Column(name = "nddt_id", unique = true, nullable = false, length = 12)
	public String getNddtId() {
		return this.nddtId;
	}

	public void setNddtId(String nddtId) {
		this.nddtId = nddtId;
	}

	@Column(name = "nddt_type_id", nullable = false, length = 12)
	public String getNddtTypeId() {
		return this.nddtTypeId;
	}

	public void setNddtTypeId(String nddtTypeId) {
		this.nddtTypeId = nddtTypeId;
	}

	@Column(name = "nddt_data", nullable = false, length = 100)
	public String getNddtData() {
		return this.nddtData;
	}

	public void setNddtData(String nddtData) {
		this.nddtData = nddtData;
	}

	@Column(name = "nddt_data_unit", nullable = false, length = 20)
	public String getNddtDataUnit() {
		return this.nddtDataUnit;
	}

	public void setNddtDataUnit(String nddtDataUnit) {
		this.nddtDataUnit = nddtDataUnit;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "nddt_receive_date", nullable = false, length = 19)
	public Date getNddtReceiveDate() {
		return this.nddtReceiveDate;
	}

	public void setNddtReceiveDate(Date nddtReceiveDate) {
		this.nddtReceiveDate = nddtReceiveDate;
	}

	@Column(name = "nddt_receive_adress", length = 100)
	public String getNddtReceiveAdress() {
		return this.nddtReceiveAdress;
	}

	public void setNddtReceiveAdress(String nddtReceiveAdress) {
		this.nddtReceiveAdress = nddtReceiveAdress;
	}

	@Column(name = "nddt_receive_user", length = 12)
	public String getNddtReceiveUser() {
		return this.nddtReceiveUser;
	}

	public void setNddtReceiveUser(String nddtReceiveUser) {
		this.nddtReceiveUser = nddtReceiveUser;
	}

}
