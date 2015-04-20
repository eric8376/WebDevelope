package com.rwy.httpService.entity.request;

import org.hibernate.validator.constraints.NotEmpty;
import org.nxstudio.core.model.Dto;
import org.nxstudio.service.httpService.entity.RequestMessageVO;
import org.nxstudio.util.g4.G4Utils;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import java.util.Set;

/**
 * Created by Administrator on 2015/4/12.
 * 查询字典记录
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class CheckRecordInfo extends RequestMessageVO {
    @NotEmpty(message = "登录用户id不能为空")
    private String loginuserid;
    /**
     * 检查类型
     */
    @NotEmpty(message = "记录类型不能为空")
    private String check_type;
    /**
     * 备注
     */
    private String remark;
    /**
     * 当事人角色
     */
    @NotEmpty(message = "当事人角色不能为空")
    private String litigantrole;
    /**
     * 检查时间
     */
    @NotEmpty(message = "检查时间不能为空")
    private String check_time;
    /**
     * 录入人员
     */
    @NotEmpty(message = "录入人员不能为空")
    private String checker;
    /**
     * 当事人
     */
    @NotEmpty(message = "当事人不能为空")
    private String litigant;
    /**
     * 科室
     */
    @NotEmpty(message = "科室不能为空")
    private String deptid;
    /**
     * 是否正确揉搓/（洗手+手消）
     */
    private String standard3;
    /**
     * 是否正确手消/原则
     */
    private String standard1;
    /**
     * 是否有饰品/指征
     */
    private String standard2;
    /**
     * 含知识考核/含正确性
     */
    private String validity;
    /**
     *  操作类型。新增就是create 修改就是update删除就是delete
     */
    @NotEmpty(message = "操作类型不能为空")
    private String operate;
    /**
     *  洗手时机，当检查类型为依从性时，不能为空
     */
    private String course_id;
    /**
     *  洗手类型，当检查类型为依从性时，不能为空
     */
    private String checknorm;
    /**
     * 检查记录id
     */
    private String record_id;

    @Override
    public void verifyParams(  Dto result) {
        {
            ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
            Validator validator = factory.getValidator();
            Set<ConstraintViolation<CheckRecordInfo>> violations = validator.validate(this);
            if (violations.size() != 0) {
                StringBuilder volidationFailureSB = new StringBuilder();
                for (ConstraintViolation<CheckRecordInfo> violation : violations) {
                    volidationFailureSB.append(violation.getPropertyPath().toString());
                    volidationFailureSB.append(violation.getMessage() );
                    result.put("code", -1);
                    result.put("msg",volidationFailureSB.toString());
                    break;
                }
            }else
            {
                if(this.check_type.equals("CT00103")&&(G4Utils.isEmpty(course_id)|| G4Utils.isEmpty(checknorm)))
                {
                    result.put("code",   -1 );
                    result.put("msg", G4Utils.isEmpty(course_id)? "洗手时机不能为空":"洗手类型不能为空");
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

    public String getCheck_type() {
        return check_type;
    }

    public void setCheck_type(String check_type) {
        this.check_type = check_type;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getLitigantrole() {
        return litigantrole;
    }

    public void setLitigantrole(String litigantrole) {
        this.litigantrole = litigantrole;
    }

    public String getCheck_time() {
        return check_time;
    }

    public void setCheck_time(String check_time) {
        this.check_time = check_time;
    }

    public String getChecker() {
        return checker;
    }

    public void setChecker(String checker) {
        this.checker = checker;
    }

    public String getLitigant() {
        return litigant;
    }

    public void setLitigant(String litigant) {
        this.litigant = litigant;
    }

    public String getDeptid() {
        return deptid;
    }

    public void setDeptid(String deptid) {
        this.deptid = deptid;
    }

    public String getStandard3() {
        return standard3;
    }

    public void setStandard3(String standard3) {
        this.standard3 = standard3;
    }

    public String getStandard1() {
        return standard1;
    }

    public void setStandard1(String standard1) {
        this.standard1 = standard1;
    }

    public String getStandard2() {
        return standard2;
    }

    public void setStandard2(String standard2) {
        this.standard2 = standard2;
    }

    public String getValidity() {
        return validity;
    }

    public void setValidity(String validity) {
        this.validity = validity;
    }

    public String getOperate() {
        return operate;
    }

    public void setOperate(String operate) {
        this.operate = operate;
    }

    public String getCourse_id() {
        return course_id;
    }

    public void setCourse_id(String course_id) {
        this.course_id = course_id;
    }

    public String getChecknorm() {
        return checknorm;
    }

    public void setChecknorm(String checknorm) {
        this.checknorm = checknorm;
    }

    public String getRecord_id() {
        return record_id;
    }

    public void setRecord_id(String record_id) {
        this.record_id = record_id;
    }
}
