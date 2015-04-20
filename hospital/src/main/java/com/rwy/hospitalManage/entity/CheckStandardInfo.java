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
@Table(name = "course_check_standard")
public class CheckStandardInfo extends AbstractModel {
    @Id
    @CommonIDGenerator(name = "CODEIDSEQUENCES", setIDMethoName = "setStandard_id", fieldClass = Long.class)
    private Long standard_id;
    private String standard_name;
    private String standard_code;
    private String check_result;
    private String formid;

    public Long getStandard_id() {
        return standard_id;
    }

    public void setStandard_id(Long standard_id) {
        this.standard_id = standard_id;
    }

    public String getStandard_name() {
        return standard_name;
    }

    public void setStandard_name(String standard_name) {
        this.standard_name = standard_name;
    }

    public String getStandard_code() {
        return standard_code;
    }

    public void setStandard_code(String standard_code) {
        this.standard_code = standard_code;
    }

    public String getCheck_result() {
        return check_result;
    }

    public void setCheck_result(String check_result) {
        this.check_result = check_result;
    }

    public String getFormid() {
        return formid;
    }

    public void setFormid(String formid) {
        this.formid = formid;
    }
}
