package com.rwy.httpService.entity.request;

import org.hibernate.validator.constraints.NotEmpty;
import org.nxstudio.core.model.Dto;
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
 * 查询用户记录
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class QueryUserInfo extends RequestMessageVO {
    @NotEmpty(message = "登录用户id不能为空")
    private String loginuserid;
    /**
     * 是否不显示自己
     */
    private String notShowSelf;
    /**
     * 部门id
     */
    private String deptid;
    /**
     * 用户id
     */
    private String userid;
    /**
     * 用户帐号
     */
    private String account;

    /**
     * 用户名称
     */
    private String username;
    @Override
    public void verifyParams( Dto result) {
        {
            ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
            Validator validator = factory.getValidator();
            Set<ConstraintViolation<QueryUserInfo>> violations = validator.validate(this);
            if (violations.size() != 0) {
                StringBuilder volidationFailureSB = new StringBuilder();
                for (ConstraintViolation<QueryUserInfo> violation : violations) {
                    volidationFailureSB.append(violation.getPropertyPath().toString());
                    volidationFailureSB.append(violation.getMessage() );
                    result.put("code",-1);
                    result.put("msg",volidationFailureSB.toString());
                    break;
                }
            }
        };
    }

    public String getLoginuserid() {
        return loginuserid;
    }

    public void setLoginuserid(String loginuserid) {
        this.loginuserid = loginuserid;
    }

    public String getNotShowSelf() {
        return notShowSelf;
    }

    public void setNotShowSelf(String notShowSelf) {
        this.notShowSelf = notShowSelf;
    }

    public String getDeptid() {
        return deptid;
    }

    public void setDeptid(String deptid) {
        this.deptid = deptid;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
