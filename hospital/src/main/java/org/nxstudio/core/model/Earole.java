package org.nxstudio.core.model;

import org.springframework.stereotype.Component;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * Created with IntelliJ IDEA.
 * User: Chao
 * Date: 07/09/13
 * Time: 下午 12:09
 * To change this template use File | Settings | File Templates.
 */
@Component("earole")
@Entity
@Table(name = "earole")
public class Earole extends AbstractModel implements Serializable {
    @Id
    @Column(name = "ROLEID", nullable = false)
    private Long roleid;
    private String rolename;
    private String deptid;
    private String roletype;
    private String remark;
    private String locked;

    public Long getRoleid() {
        return roleid;
    }

    public void setRoleid(Long roleid) {
        this.roleid = roleid;
    }

    public String getRolename() {
        return rolename;
    }

    public void setRolename(String rolename) {
        this.rolename = rolename;
    }

    public String getDeptid() {
        return deptid;
    }

    public void setDeptid(String deptid) {
        this.deptid = deptid;
    }

    public String getRoletype() {
        return roletype;
    }

    public void setRoletype(String roletype) {
        this.roletype = roletype;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getLocked() {
        return locked;
    }

    public void setLocked(String locked) {
        this.locked = locked;
    }
}
