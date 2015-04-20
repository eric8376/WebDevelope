package com.rwy.httpService.entity.response;

import org.hibernate.validator.constraints.NotEmpty;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.vo.UserInfoVo;
import org.nxstudio.service.httpService.entity.RequestMessageVO;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import java.util.Set;

/**
 * Created by Administrator on 2015/4/12.
 * app登录校验
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class LoginVerifyResponse {
    @NotEmpty(message = "帐号不能为空")
    private String loginuserid;
    private  String account;
    private String deptname;
    private String username;
    private String usertype;
    /**
     * 用户编号：varchar2(8) <Primary Key>
     */
    private String userid;
    /**
     * 密码：varchar2(20)
     */
    private String password;
    /**
     * 性别(0:未知;1:男;2:女)：varchar2(2)
     */
    private String sex;
    /**
     * 部门编号：varchar2(8)
     */
    private String deptid;
    /**
     * 锁定标志(0:锁定;1:激活)：varchar2(2)
     */
    private String lock;
    public String getLoginuserid() {
        return loginuserid;
    }

    public void setLoginuserid(String loginuserid) {
        this.loginuserid = loginuserid;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getDeptname() {
        return deptname;
    }

    public void setDeptname(String deptname) {
        this.deptname = deptname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsertype() {
        return usertype;
    }

    public void setUsertype(String usertype) {
        this.usertype = usertype;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getDeptid() {
        return deptid;
    }

    public void setDeptid(String deptid) {
        this.deptid = deptid;
    }

    public String getLock() {
        return lock;
    }

    public void setLock(String lock) {
        this.lock = lock;
    }
}
