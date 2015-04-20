package org.nxstudio.core.model.T_SB;

import org.nxstudio.core.model.AbstractModel;
import org.nxstudio.util.idgenerator.annotation.CommonIDGenerator;

import javax.persistence.*;
import java.io.Serializable;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【流程环节提醒设置】
 * 时间: 2013-08-21 下午4:32
 */

@Entity
@Table(name = "T_SB_FLOW_URGE")
public class FlowUrge extends AbstractModel implements Serializable {

    @Id
    @CommonIDGenerator(name = "CODEIDSEQUENCES", setIDMethoName = "setUrge_no", fieldClass = Long.class)
    private Long urge_no;

    private String flow_no;

    private String point_no;

    private String use_time;

    private int urge_count;

    private String is_urge;

    private String explain;


    //--------------- getter and setter ---------------

    public Long getUrge_no() {
        return urge_no;
    }

    public void setUrge_no(Long urge_no) {
        this.urge_no = urge_no;
    }

    public String getFlow_no() {
        return flow_no;
    }

    public void setFlow_no(String flow_no) {
        this.flow_no = flow_no;
    }

    public String getPoint_no() {
        return point_no;
    }

    public void setPoint_no(String point_no) {
        this.point_no = point_no;
    }

    public String getUse_time() {
        return use_time;
    }

    public void setUse_time(String use_time) {
        this.use_time = use_time;
    }

    public int getUrge_count() {
        return urge_count;
    }

    public void setUrge_count(int urge_count) {
        this.urge_count = urge_count;
    }

    public String getIs_urge() {
        return is_urge;
    }

    public void setIs_urge(String is_urge) {
        this.is_urge = is_urge;
    }

    public String getExplain() {
        return explain;
    }

    public void setExplain(String explain) {
        this.explain = explain;
    }
}
