package com.rwy.hospitalManage.entity;

import org.nxstudio.core.model.AbstractModel;
import org.nxstudio.util.idgenerator.annotation.CommonIDGenerator;
import org.springframework.stereotype.Component;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * <pre></pre>
 * <br>
 * <pre>所属模块：</pre>
 *
 * @author 黄琦鸿
 *         创建于  2014/12/28 19:25.
 */
@Component
@Entity
@Table(name = "course_checkrecord_hisDetail")
public class CheckRecordHistoryDetailInfo extends AbstractModel {
    @Id
    @CommonIDGenerator(name = "CODEIDSEQUENCES", setIDMethoName = "setDetail_id", fieldClass = Long.class)
    private Long detail_id;
    private String completed;
    private Date check_time;
    private String course_id;
    private String checker;
    private String remark;
    private String deptid;
    private String litigant;
    private String litigantrole;
    private String checknorm;
    private String check_type;
    private String verify_statu;
    private String history_id;
    private String validity;

    public Long getDetail_id() {
        return detail_id;
    }

    public void setDetail_id(Long detail_id) {
        this.detail_id = detail_id;
    }

    public String getCompleted() {
        return completed;
    }

    public void setCompleted(String completed) {
        this.completed = completed;
    }

    public Date getCheck_time() {
        return check_time;
    }

    public void setCheck_time(Date check_time) {
        this.check_time = check_time;
    }

    public String getCourse_id() {
        return course_id;
    }

    public void setCourse_id(String course_id) {
        this.course_id = course_id;
    }

    public String getChecker() {
        return checker;
    }

    public void setChecker(String checker) {
        this.checker = checker;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getDeptid() {
        return deptid;
    }

    public void setDeptid(String deptid) {
        this.deptid = deptid;
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

    public String getCheck_type() {
        return check_type;
    }

    public void setCheck_type(String check_type) {
        this.check_type = check_type;
    }

    public String getVerify_statu() {
        return verify_statu;
    }

    public void setVerify_statu(String verify_statu) {
        this.verify_statu = verify_statu;
    }

    public String getHistory_id() {
        return history_id;
    }

    public void setHistory_id(String history_id) {
        this.history_id = history_id;
    }

    public String getValidity() {
        return validity;
    }

    public void setValidity(String validity) {
        this.validity = validity;
    }
}
