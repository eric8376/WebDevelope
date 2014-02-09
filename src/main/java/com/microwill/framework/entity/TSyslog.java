package com.microwill.framework.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.GenericGenerator;

/**
 * TSyslog entity.
 * 
 * @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "t_syslog", schema = "base")
public class TSyslog implements java.io.Serializable {
	private static final long serialVersionUID = 3098865916351598059L;
	// Fields

	private String syslogid;
	private Date logtime;
	private String operatorid;
	private String operator;
	private Integer role;
	private Integer background;
	private Integer logtype;
	private String event;
	private String detail;
	private Integer state;//0 失败 1 成功

	// Constructors

	/** default constructor */
	public TSyslog() {
	}

	/** minimal constructor */
	public TSyslog(Date logtime, String operatorid, String operator,
			Integer role, Integer logtype, String event) {
		this.logtime = logtime;
		this.operatorid = operatorid;
		this.operator = operator;
		this.role = role;
		this.logtype = logtype;
		this.event = event;
	}

	/** full constructor */
	public TSyslog(Date logtime, String operatorid, String operator,
			Integer role, Integer logtype, String event, String detail) {
		this.logtime = logtime;
		this.operatorid = operatorid;
		this.operator = operator;
		this.role = role;
		this.logtype = logtype;
		this.event = event;
		this.detail = detail;
	}

	// Property accessors
	@GenericGenerator(name = "generator", strategy = "uuid.hex")
	@Id
	@GeneratedValue(generator = "generator")
	@Column(name = "syslogid", unique = true, nullable = false, length = 32)
	public String getSyslogid() {
		return this.syslogid;
	}

	public void setSyslogid(String syslogid) {
		this.syslogid = syslogid;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "logtime", nullable = false, length = 29)
	public Date getLogtime() {
		return this.logtime;
	}

	public void setLogtime(Date logtime) {
		this.logtime = logtime;
	}

	@Column(name = "operatorid", nullable = false, length = 32)
	public String getOperatorid() {
		return this.operatorid;
	}

	public void setOperatorid(String operatorid) {
		this.operatorid = operatorid;
	}

	@Column(name = "operator", nullable = false, length = 64)
	public String getOperator() {
		return this.operator;
	}

	public void setOperator(String operator) {
		this.operator = operator;
	}

	@Column(name = "role", nullable = false)
	public Integer getRole() {
		return this.role;
	}

	public void setRole(Integer role) {
		this.role = role;
	}

	@Column(name = "logtype", nullable = false)
	public Integer getLogtype() {
		return this.logtype;
	}

	public void setLogtype(Integer logtype) {
		this.logtype = logtype;
	}

	@Column(name = "event", nullable = false, length = 512)
	public String getEvent() {
		return this.event;
	}

	public void setEvent(String event) {
		this.event = event;
	}

	@Column(name = "detail")
	public String getDetail() {
		return this.detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	@Column(name = "background")
	public Integer getBackground() {
		return background;
	}

	public void setBackground(Integer background) {
		this.background = background;
	}
	
	@Column(name = "state", nullable = false)
	public Integer getState() {
		return this.state;
	}

	public void setState(Integer state) {
		this.state = state;
	}
	
}