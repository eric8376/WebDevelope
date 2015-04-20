package org.nxstudio.core.model.T_SB;

import org.nxstudio.core.model.AbstractModel;
import org.nxstudio.util.idgenerator.annotation.CommonIDGenerator;

import javax.persistence.*;
import java.io.Serializable;

/**
 * @author 黄琦鸿
 */

@Entity
@Table(name = "EAUSERRELATION")
public class EauserRelation extends AbstractModel implements Serializable {

    @Id
    @CommonIDGenerator(name = "CODEIDSEQUENCES", setIDMethoName = "setRelation_id", fieldClass = Long.class)
    @Column(name = "RELATION_ID", nullable = false)
    private Long relation_id;
    private String user_id;

    private String p_user_id;

    private String deletestatus;
    private Integer notifytype;

    public EauserRelation() {
    }

    public EauserRelation(String user_id, String p_user_id, Integer notifytype) {
        this.user_id = user_id;
        this.p_user_id = p_user_id;
        this.deletestatus = "0";
        this.notifytype = notifytype;
    }

    public Long getRelation_id() {
        return relation_id;
    }

    public void setRelation_id(Long relation_id) {
        this.relation_id = relation_id;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getP_user_id() {
        return p_user_id;
    }

    public void setP_user_id(String p_user_id) {
        this.p_user_id = p_user_id;
    }

    public String getDeletestatus() {
        return deletestatus;
    }

    public void setDeletestatus(String deletestatus) {
        this.deletestatus = deletestatus;
    }

    public Integer getNotifytype() {
        return notifytype;
    }

    public void setNotifytype(Integer notifytype) {
        this.notifytype = notifytype;
    }
}
