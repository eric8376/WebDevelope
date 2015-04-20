package org.nxstudio.core.model.T_SB;

import org.nxstudio.core.model.AbstractModel;
import org.nxstudio.util.idgenerator.annotation.CommonIDGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by 黄琦鸿 on 14-1-6.
 */
@Entity
@Table(name = "T_SB_LEAVELUSERS")
public class TSbLeavelUsers extends AbstractModel implements Serializable {
    @Id
    @CommonIDGenerator(name = "CODEIDSEQUENCES", setIDMethoName = "setLeavelUsersid", fieldClass = Long.class)
    @Column(name = "LEAVELUSERSID", nullable = false)
    private Long leavelUsersid;
    private Date leaveltime;
    private String leaveluser;
    private String agentuser;

    public TSbLeavelUsers() {
        this.leaveltime = new Date();
    }

    public TSbLeavelUsers(String leaveluser, String agentuser) {
        this.leaveluser = leaveluser;
        this.agentuser = agentuser;
        this.leaveltime = new Date();
    }

    public Long getLeavelUsersid() {
        return leavelUsersid;
    }

    public void setLeavelUsersid(Long leavelUsersid) {
        this.leavelUsersid = leavelUsersid;
    }

    public Date getLeaveltime() {
        return leaveltime;
    }

    public void setLeaveltime(Date leaveltime) {
        this.leaveltime = leaveltime;
    }

    public String getLeaveluser() {
        return leaveluser;
    }

    public void setLeaveluser(String leaveluser) {
        this.leaveluser = leaveluser;
    }

    public String getAgentuser() {
        return agentuser;
    }

    public void setAgentuser(String agentuser) {
        this.agentuser = agentuser;
    }
}
