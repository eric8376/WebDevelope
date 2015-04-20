package com.rwy.systemManage.entity;

import org.nxstudio.core.model.AbstractModel;
import org.nxstudio.util.idgenerator.annotation.CommonIDGenerator;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * <pre>系统附件中间表实体</pre>
 * <pre>所属模块：财务结算</pre>
 *
 * @author 黄琦鸿
 * @version 1.0.0 创建于 2014/5/5.
 */
@Component
@Entity
@Table(name = "sy_midappendix")
public class SyMidAppendix extends AbstractModel implements Serializable {
    /**
     * 附件中间表id
     */
    private Long appendix_id;
    /**
     * 和附件表的form_id一个意义
     */
    private String from_id;
    /**
     * 附件绑定的对象id
     */
    private String to_id;
    /**
     * 附件类型
     */
    private Integer type;
    /**
     * 附件名称
     */
    private String file_name;
    /**
     * 附件描述
     */
    private String explain;
    /**
     * 附件上传者
     */
    private String upload_user;
    /**
     * 附件上传时间
     */
    private Date upload_date;

    @Id
    @CommonIDGenerator(name = "SYSEQUENCES", setIDMethoName = "setAppendix_id", fieldClass = Long.class)
    @Column(name = "APPENDIX_ID", nullable = false)
    public Long getAppendix_id() {
        return appendix_id;
    }

    public void setAppendix_id(Long appendix_id) {
        this.appendix_id = appendix_id;
    }

    public String getFrom_id() {
        return from_id;
    }

    public void setFrom_id(String from_id) {
        this.from_id = from_id;
    }

    public String getTo_id() {
        return to_id;
    }

    public void setTo_id(String to_id) {
        this.to_id = to_id;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getFile_name() {
        return file_name;
    }

    public void setFile_name(String file_name) {
        this.file_name = file_name;
    }

    public String getExplain() {
        return explain;
    }

    public void setExplain(String explain) {
        this.explain = explain;
    }

    public String getUpload_user() {
        return upload_user;
    }

    public void setUpload_user(String upload_user) {
        this.upload_user = upload_user;
    }

    public Date getUpload_date() {
        return upload_date;
    }

    public void setUpload_date(Date upload_date) {
        this.upload_date = upload_date;
    }
}
