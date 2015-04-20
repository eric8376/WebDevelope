package org.nxstudio.core.model.T_SB;

import org.nxstudio.core.model.AbstractModel;
import org.nxstudio.util.idgenerator.annotation.CommonIDGenerator;

import javax.persistence.*;
import java.io.Serializable;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【环节任务超时提醒设置】
 * 时间: 2013-08-21 下午4:32
 */
@Entity
@Table(name = "T_SB_FLOW_URGE_MX")
public class FlowUrgeMx extends AbstractModel implements Serializable {

    @Id
    @CommonIDGenerator(name = "CODEIDSEQUENCES", setIDMethoName = "setMx_no", fieldClass = Long.class)
    private Long mx_no;

    private Long urge_no;

    private String urge_type;

    private String interval_time;

    private Long repeat_urge_count;

    private String repeat_urge_interval;

    private String activity;

    private String receive_man;

    private String tpl_no;

    private String pre_interval_time;


    //--------------- getter and setter ---------------

    public Long getMx_no() {
        return mx_no;
    }

    public void setMx_no(Long mx_no) {
        this.mx_no = mx_no;
    }

    public Long getUrge_no() {
        return urge_no;
    }

    public void setUrge_no(Long urge_no) {
        this.urge_no = urge_no;
    }

    public String getUrge_type() {
        return urge_type;
    }

    public void setUrge_type(String urge_type) {
        this.urge_type = urge_type;
    }

    public String getInterval_time() {
        return interval_time;
    }

    public void setInterval_time(String interval_time) {
        this.interval_time = interval_time;
    }

    public Long getRepeat_urge_count() {
        return repeat_urge_count;
    }

    public void setRepeat_urge_count(Long repeat_urge_count) {
        this.repeat_urge_count = repeat_urge_count;
    }

    public String getRepeat_urge_interval() {
        return repeat_urge_interval;
    }

    public void setRepeat_urge_interval(String repeat_urge_interval) {
        this.repeat_urge_interval = repeat_urge_interval;
    }

    public String getActivity() {
        return activity;
    }

    public void setActivity(String activity) {
        this.activity = activity;
    }

    public String getReceive_man() {
        return receive_man;
    }

    public void setReceive_man(String receive_man) {
        this.receive_man = receive_man;
    }

    public String getTpl_no() {
        return tpl_no;
    }

    public void setTpl_no(String tpl_no) {
        this.tpl_no = tpl_no;
    }

    public String getPre_interval_time() {
        return pre_interval_time;
    }

    public void setPre_interval_time(String pre_interval_time) {
        this.pre_interval_time = pre_interval_time;
    }
}
