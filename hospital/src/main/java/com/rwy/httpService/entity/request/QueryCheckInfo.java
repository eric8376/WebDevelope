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
 * 查询检查记录
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class QueryCheckInfo extends RequestMessageVO {
    @NotEmpty(message = "登录用户id不能为空")
    private String loginuserid;
    /**
     * 操作
     */
    private String course_id;
    /**
     * 部门id
     */
    private String deptid;
    /**
     * 正确性
     */
    private String completed;
    /**
     * 检查类型
     */
    private String check_type;
    /**
     * 录入人员id
     */
    private String userid;
    /**
     * 当事人id
     */
    private String litigant;
    /**
     * 当事人角色id
     */
    private String litigantrole;
    /**
     * 调查指标
     */
    private String checknorm;
    /**
     * 记录录入开始时间
     */
    private String start_date;
    /**
     * 记录录入结束时间
     */
    private String end_date;

    @Override
    public void verifyParams(  Dto result) {
        {
            ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
            Validator validator = factory.getValidator();
            Set<ConstraintViolation<QueryCheckInfo>> violations = validator.validate(this);
            if (violations.size() != 0) {
                StringBuilder volidationFailureSB = new StringBuilder();
                for (ConstraintViolation<QueryCheckInfo> violation : violations) {
                    volidationFailureSB.append(violation.getPropertyPath().toString());
                    volidationFailureSB.append(violation.getMessage() );
                    result.put("code", -1);
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

    public String getCourse_id() {
        return course_id;
    }

    public void setCourse_id(String course_id) {
        this.course_id = course_id;
    }

    public String getDeptid() {
        return deptid;
    }

    public void setDeptid(String deptid) {
        this.deptid = deptid;
    }

    public String getCompleted() {
        return completed;
    }

    public void setCompleted(String completed) {
        this.completed = completed;
    }

    public String getCheck_type() {
        return check_type;
    }

    public void setCheck_type(String check_type) {
        this.check_type = check_type;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getLitigant() {
        return litigant;
    }

    public void setLitigant(String litigant) {
        this.litigant = litigant;
    }

    public String getLitigantrole() {
        return litigantrole;
    }

    public void setLitigantrole(String litigantrole) {
        this.litigantrole = litigantrole;
    }

    public String getChecknorm() {
        return checknorm;
    }

    public void setChecknorm(String checknorm) {
        this.checknorm = checknorm;
    }

    public String getStart_date() {
        return start_date;
    }

    public void setStart_date(String start_date) {
        this.start_date = start_date;
    }

    public String getEnd_date() {
        return end_date;
    }

    public void setEnd_date(String end_date) {
        this.end_date = end_date;
    }
}
