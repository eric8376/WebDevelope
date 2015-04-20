package org.nxstudio.core.model;

import java.util.Date;


/**
 * AuditDraftLog entity. @author MyEclipse Persistence Tools
 */

@SuppressWarnings("serial")
public class AuditDraftLog extends AbstractModel implements java.io.Serializable {


    // Fields    

    private Long id;
    private String reqDraft;
    private String respDraft;
    private String type;
    private String filePath;
    private Date reqDate;


    // Constructors

    /**
     * default constructor
     */
    public AuditDraftLog() {
    }


    /**
     * full constructor
     */
    public AuditDraftLog(String reqDraft, String respDraft, String type, String filePath, Date reqDate) {
        this.reqDraft = reqDraft;
        this.respDraft = respDraft;
        this.type = type;
        this.filePath = filePath;
        this.reqDate = reqDate;
    }


    // Property accessors

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReqDraft() {
        return this.reqDraft;
    }

    public void setReqDraft(String reqDraft) {
        this.reqDraft = reqDraft;
    }

    public String getRespDraft() {
        return this.respDraft;
    }

    public void setRespDraft(String respDraft) {
        this.respDraft = respDraft;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getFilePath() {
        return this.filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public Date getReqDate() {
        return this.reqDate;
    }

    public void setReqDate(Date reqDate) {
        this.reqDate = reqDate;
    }


}