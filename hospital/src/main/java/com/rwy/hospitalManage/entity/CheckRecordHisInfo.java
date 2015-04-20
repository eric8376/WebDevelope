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
@Table(name = "course_checkrecord_his")
public class CheckRecordHisInfo extends AbstractModel {
    @Id
    @CommonIDGenerator(name = "CODEIDSEQUENCES", setIDMethoName = "setHistory_id", fieldClass = Long.class)
    private Long history_id;
    private String operater;
    private Date operate_time;
    private String record_id;
    private String operate_type;

    public Long getHistory_id() {
        return history_id;
    }

    public void setHistory_id(Long history_id) {
        this.history_id = history_id;
    }

    public String getOperater() {
        return operater;
    }

    public void setOperater(String operater) {
        this.operater = operater;
    }

    public Date getOperate_time() {
        return operate_time;
    }

    public void setOperate_time(Date operate_time) {
        this.operate_time = operate_time;
    }

    public String getRecord_id() {
        return record_id;
    }

    public void setRecord_id(String record_id) {
        this.record_id = record_id;
    }

    public String getOperate_type() {
        return operate_type;
    }

    public void setOperate_type(String operate_type) {
        this.operate_type = operate_type;
    }
}
