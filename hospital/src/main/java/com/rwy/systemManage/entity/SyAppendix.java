package com.rwy.systemManage.entity;

import org.nxstudio.core.model.AbstractModel;
import org.nxstudio.util.idgenerator.annotation.CommonIDGenerator;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.io.Serializable;

/**
 * <pre>系统附件关联实体</pre>
 * <pre>所属模块：财务结算</pre>
 *
 * @author 黄琦鸿
 * @version 1.0.0 创建于 2014/5/5.
 */
@Component
@Entity
@Table(name = "sy_appendix")
public class SyAppendix extends AbstractModel implements Serializable {
    /**
     * 附件id
     */
    private Long appendix_id;
    /**
     * 附件和中间表关联的字段，及中间表和真实表是通过这个字段关联的
     */
    private String from_id;
    /**
     * 附件的保存key，从这个key可以去properties查看附件保存路径
     */
    private String save_key;
    /**
     * 文件类型
     */
    private String file_type;
    /**
     * 保存文件名
     */
    private String save_file_name;
    /**
     * 删除状态
     */
    private String delete_status;
    /**
     * 文件尺寸
     */
    private Integer file_size;

    public String getFrom_id() {
        return from_id;
    }

    public void setFrom_id(String from_id) {
        this.from_id = from_id;
    }

    @Id
    @CommonIDGenerator(name = "SYSEQUENCES", setIDMethoName = "setAppendix_id", fieldClass = Long.class)
    @Column(name = "APPENDIX_ID", nullable = false)
    public Long getAppendix_id() {
        return appendix_id;
    }

    public void setAppendix_id(Long appendix_id) {
        this.appendix_id = appendix_id;
    }

    public String getSave_key() {
        return save_key;
    }

    public void setSave_key(String save_key) {
        this.save_key = save_key;
    }

    public String getFile_type() {
        return file_type;
    }

    public void setFile_type(String file_type) {
        this.file_type = file_type;
    }

    public String getSave_file_name() {
        return save_file_name;
    }

    public void setSave_file_name(String save_file_name) {
        this.save_file_name = save_file_name;
    }

    public String getDelete_status() {
        return delete_status;
    }

    public void setDelete_status(String delete_status) {
        this.delete_status = delete_status;
    }

    public Integer getFile_size() {
        return file_size;
    }

    public void setFile_size(Integer file_size) {
        this.file_size = file_size;
    }
}
