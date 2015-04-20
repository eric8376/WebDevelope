package org.nxstudio.core.model.T_WF;

import org.nxstudio.core.model.AbstractModel;
import org.nxstudio.util.idgenerator.annotation.CommonIDGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【任务操作日志】
 * 时间: 2013-06-21 下午2:55
 */

@Entity
@Table(name = "t_wf_user_tasks_log")
public class UserTasksLog extends AbstractModel implements Serializable {

    @Id
    @CommonIDGenerator(name = "CODEIDSEQUENCES", setIDMethoName = "setLog_no", fieldClass = Long.class)
    private Long log_no;
    private Long mgr_no;
    private int oper_type;
    private Date oper_date;
    private String oper_man;
    private String explain;


    //-------------------------getter & setter-------------------------------
    public Long getLog_no() {
        return log_no;
    }

    public void setLog_no(Long log_no) {
        this.log_no = log_no;
    }

    public Long getMgr_no() {
        return mgr_no;
    }

    public void setMgr_no(Long mgr_no) {
        this.mgr_no = mgr_no;
    }

    public int getOper_type() {
        return oper_type;
    }

    public void setOper_type(int oper_type) {
        this.oper_type = oper_type;
    }

    public Date getOper_date() {
        return oper_date;
    }

    public void setOper_date(Date oper_date) {
        this.oper_date = oper_date;
    }

    public String getOper_man() {
        return oper_man;
    }

    public void setOper_man(String oper_man) {
        this.oper_man = oper_man;
    }

    public String getExplain() {
        return explain;
    }

    public void setExplain(String explain) {
        this.explain = explain;
    }
}
