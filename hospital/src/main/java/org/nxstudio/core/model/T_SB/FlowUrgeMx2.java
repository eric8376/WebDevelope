package org.nxstudio.core.model.T_SB;

import org.nxstudio.core.model.AbstractModel;
import org.nxstudio.util.idgenerator.annotation.CommonIDGenerator;

import javax.persistence.*;
import java.io.Serializable;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【环节任务到达提醒设置】
 * 时间: 2013-08-21 下午4:32
 */

@Entity
@Table(name = "T_SB_FLOW_URGE_MX2")
public class FlowUrgeMx2 extends AbstractModel implements Serializable {

    @Id
    @CommonIDGenerator(name = "CODEIDSEQUENCES", setIDMethoName = "setMx2_no", fieldClass = Long.class)
    private Long mx2_no;
    private Long urge_no;

    private String receive_man;

    private String activity;

    private String tpl_no;


    //--------------- getter and setter ---------------

    public Long getMx2_no() {
        return mx2_no;
    }

    public void setMx2_no(Long mx2_no) {
        this.mx2_no = mx2_no;
    }

    public Long getUrge_no() {
        return urge_no;
    }

    public void setUrge_no(Long urge_no) {
        this.urge_no = urge_no;
    }

    public String getReceive_man() {
        return receive_man;
    }

    public void setReceive_man(String receive_man) {
        this.receive_man = receive_man;
    }

    public String getActivity() {
        return activity;
    }

    public void setActivity(String activity) {
        this.activity = activity;
    }

    public String getTpl_no() {
        return tpl_no;
    }

    public void setTpl_no(String tpl_no) {
        this.tpl_no = tpl_no;
    }
}
