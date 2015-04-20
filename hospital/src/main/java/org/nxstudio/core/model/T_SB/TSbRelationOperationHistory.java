package org.nxstudio.core.model.T_SB;

import org.nxstudio.core.model.AbstractModel;
import org.nxstudio.util.idgenerator.annotation.CommonIDGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * @author 黄琦鸿
 */

@Entity
@Table(name = "T_SB_RelationOperationHistory")
public class TSbRelationOperationHistory extends AbstractModel implements Serializable {

    @Id
    @CommonIDGenerator(name = "CODEIDSEQUENCES", setIDMethoName = "setRelationoperationhistoryid", fieldClass = Long.class)
    @Column(name = "RELATIONOPERATIONHISTORYID", nullable = false)
    private Long relationoperationhistoryid;
    private String operator;
    private Integer operate_type;
    private Date operate_time;

    public TSbRelationOperationHistory() {
        this.operate_time = new Date();
    }

    public TSbRelationOperationHistory(String operator, Integer operate_type, EauserRelation eauserrelation) {
        this.operator = operator;
        this.operate_type = operate_type;
        this.operate_time = new Date();
        this.eauserrelation = eauserrelation;
    }

    public EauserRelation getEauserrelation() {
        return eauserrelation;
    }

    public void setEauserrelation(EauserRelation eauserrelation) {
        this.eauserrelation = eauserrelation;
    }

    public Date getOperate_time() {
        return operate_time;
    }

    public void setOperate_time(Date operate_time) {
        this.operate_time = operate_time;
    }

    public Integer getOperate_type() {
        return operate_type;
    }

    public void setOperate_type(Integer operate_type) {
        this.operate_type = operate_type;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public Long getRelationoperationhistoryid() {
        return relationoperationhistoryid;
    }

    public void setRelationoperationhistoryid(Long relationoperationhistoryid) {
        this.relationoperationhistoryid = relationoperationhistoryid;
    }

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST}, targetEntity = EauserRelation.class)
    @JoinColumn(name = "relation_id", referencedColumnName = "relation_id")
    private EauserRelation eauserrelation;

}
