package com.microwill.project.BGM.entity;

// Generated 2013-12-14 14:53:46 by Hibernate Tools 4.0.0

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * TPatient generated by hbm2java
 */
@Entity
@Table(name = "t_patient", catalog = "BGM")
public class TPatient implements java.io.Serializable {

	private String patientId;
	private String recordNo;
	private String idNo;
	private String insuranceId;
	private String name;
	private Integer sex;
	private Integer age;
	private String bornDate;
	private String contact1;
	private String contact2;
	private String address;
	private Integer type;
	private String checkinTime;
	private String checkoutTime;
	private String creator;
	private String source;
	private String memo;

	public TPatient() {
	}

	public TPatient(String patientId) {
		this.patientId = patientId;
	}

	public TPatient(String patientId, String recordNo, String idNo,
			String insuranceId, String name, Integer sex, Integer age,
			String bornDate, String contact1, String contact2, String address,
			Integer type, String checkinTime, String checkoutTime, String memo,String creator,String source) {
		this.patientId = patientId;
		this.recordNo = recordNo;
		this.idNo = idNo;
		this.insuranceId = insuranceId;
		this.name = name;
		this.sex = sex;
		this.age = age;
		this.bornDate = bornDate;
		this.contact1 = contact1;
		this.contact2 = contact2;
		this.address = address;
		this.type = type;
		this.checkinTime = checkinTime;
		this.checkoutTime = checkoutTime;
		this.memo = memo;
		this.creator=creator;
		this.source=source;
	}

	@Id
	@Column(name = "patient_id", unique = true, nullable = false, length = 32)
	public String getPatientId() {
		return this.patientId;
	}

	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}

	@Column(name = "record_no", length = 32)
	public String getRecordNo() {
		return this.recordNo;
	}

	public void setRecordNo(String recordNo) {
		this.recordNo = recordNo;
	}

	@Column(name = "id_no", length = 18)
	public String getIdNo() {
		return this.idNo;
	}

	public void setIdNo(String idNo) {
		this.idNo = idNo;
	}

	@Column(name = "insurance_id", length = 16)
	public String getInsuranceId() {
		return this.insuranceId;
	}

	public void setInsuranceId(String insuranceId) {
		this.insuranceId = insuranceId;
	}

	@Column(name = "name", length = 12)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "sex")
	public Integer getSex() {
		return this.sex;
	}

	public void setSex(Integer sex) {
		this.sex = sex;
	}

	@Column(name = "age")
	public Integer getAge() {
		return this.age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	@Column(name = "born_date", length = 16)
	public String getBornDate() {
		return this.bornDate;
	}

	public void setBornDate(String bornDate) {
		this.bornDate = bornDate;
	}

	@Column(name = "contact1", length = 30)
	public String getContact1() {
		return this.contact1;
	}

	public void setContact1(String contact1) {
		this.contact1 = contact1;
	}

	@Column(name = "contact2", length = 30)
	public String getContact2() {
		return this.contact2;
	}

	public void setContact2(String contact2) {
		this.contact2 = contact2;
	}

	@Column(name = "address", length = 50)
	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@Column(name = "type")
	public Integer getType() {
		return this.type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	@Column(name = "checkin_time", length = 16)
	public String getCheckinTime() {
		return this.checkinTime;
	}

	public void setCheckinTime(String checkinTime) {
		this.checkinTime = checkinTime;
	}

	@Column(name = "checkout_time", length = 16)
	public String getCheckoutTime() {
		return this.checkoutTime;
	}

	public void setCheckoutTime(String checkoutTime) {
		this.checkoutTime = checkoutTime;
	}
	@Column(name = "creator", length = 150)
	public String getCreator() {
		return creator;
	}

	public void setCreator(String creator) {
		this.creator = creator;
	}
	@Column(name = "source", length = 150)
	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	@Column(name = "memo", length = 150)
	public String getMemo() {
		return this.memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

}
