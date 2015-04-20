package org.nxstudio.core.model;

import org.nxstudio.core.model.AbstractModel;
import org.nxstudio.util.idgenerator.annotation.CommonIDGenerator;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: Chao
 * Date: 07/09/13
 * Time: 下午 12:09
 * To change this template use File | Settings | File Templates.
 */
@Component("TEMP_AUDITLOG")
@Entity
@Table(name = "TEMP_AUDITLOG")
public class TempAuditlog extends AbstractModel implements Serializable {
    @Id
    @CommonIDGenerator(name = "AUDITLOGSEQUENCES", setIDMethoName = "setLog_id", fieldClass = Long.class)
    private Long log_id;

    private String req_context;
    private String res_context;
    private Date savetime;

    public TempAuditlog() {
        this.savetime = new Date();
    }

    public Long getLog_id() {
        return log_id;
    }

    public void setLog_id(Long log_id) {
        this.log_id = log_id;
    }

    public String getReq_context() {
        return req_context;
    }

    public void setReq_context(String req_context) {
        this.req_context = req_context;
    }

    public String getRes_context() {
        return res_context;
    }

    public void setRes_context(String res_context) {
        this.res_context = res_context;
    }

    public Date getSavetime() {
        return savetime;
    }

    public void setSavetime(Date savetime) {
        this.savetime = savetime;
    }
}
