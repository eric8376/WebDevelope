package com.rwy.httpService.entity.request;

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
@Table(name = "co_auditprocess")
public class Co_AuditProcess extends AbstractModel {
    @Id
    @CommonIDGenerator(name = "CODEIDSEQUENCES", setIDMethoName = "setProcessid", fieldClass = Long.class)
    private Long processid;
    private byte[] reqdata;
    private Date reqdate;
    private Date resdate;
    private String business_code;
    private byte[] resdata;

    public Long getProcessid() {
        return processid;
    }

    public void setProcessid(Long processid) {
        this.processid = processid;
    }


    public Date getReqdate() {
        return reqdate;
    }

    public void setReqdate(Date reqdate) {
        this.reqdate = reqdate;
    }

    public Date getResdate() {
        return resdate;
    }

    public void setResdate(Date resdate) {
        this.resdate = resdate;
    }

    public String getBusiness_code() {
        return business_code;
    }

    public void setBusiness_code(String business_code) {
        this.business_code = business_code;
    }

    public byte[] getReqdata() {
        return reqdata;
    }

    public void setReqdata(byte[] reqdata) {
        this.reqdata = reqdata;
    }

    public byte[] getResdata() {
        return resdata;
    }

    public void setResdata(byte[] resdata) {
        this.resdata = resdata;
    }
}
