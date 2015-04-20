package org.nxstudio.core.model.T_WF;

import org.nxstudio.core.model.AbstractModel;
import org.nxstudio.util.idgenerator.annotation.CommonIDGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【用户任务表】
 * 时间: 2013-06-20 下午15:49
 */

@Entity
@Table(name = "t_wf_user_tasks_mgr")
public class UserTasks extends AbstractModel implements Serializable {

    @Id
    @CommonIDGenerator(name = "CODEIDSEQUENCES", setIDMethoName = "setMgr_no", fieldClass = Long.class)
    private Long mgr_no;
    private String task_id;
    private String key;
    private String flow_no;
    private String point_no;
    private String job_name;
    private Date create_date;
    private String assignee;
    private int status;
    private int is_finish;
    private int pause_minutes;
    private int run_minutes;
    private Date last_pause_date;
    private String last_pause_man;
    private Date last_resume_date;
    private String last_resume_man;
    private int job_level;
    private Date finish_date;


    //-------------------------getter & setter-------------------------------
    public Long getMgr_no() {
        return mgr_no;
    }

    public void setMgr_no(Long mgr_no) {
        this.mgr_no = mgr_no;
    }

    public String getTask_id() {
        return task_id;
    }

    public void setTask_id(String task_id) {
        this.task_id = task_id;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getFlow_no() {
        return flow_no;
    }

    public void setFlow_no(String flow_no) {
        this.flow_no = flow_no;
    }

    public String getPoint_no() {
        return point_no;
    }

    public void setPoint_no(String point_no) {
        this.point_no = point_no;
    }

    public String getJob_name() {
        return job_name;
    }

    public void setJob_name(String job_name) {
        this.job_name = job_name;
    }

    public Date getCreate_date() {
        return create_date;
    }

    public void setCreate_date(Date create_date) {
        this.create_date = create_date;
    }

    public String getAssignee() {
        return assignee;
    }

    public void setAssignee(String assignee) {
        this.assignee = assignee;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getIs_finish() {
        return is_finish;
    }

    public void setIs_finish(int is_finish) {
        this.is_finish = is_finish;
    }

    public int getPause_minutes() {
        return pause_minutes;
    }

    public void setPause_minutes(int pause_minutes) {
        this.pause_minutes = pause_minutes;
    }

    public int getRun_minutes() {
        return run_minutes;
    }

    public void setRun_minutes(int run_minutes) {
        this.run_minutes = run_minutes;
    }

    public Date getLast_pause_date() {
        return last_pause_date;
    }

    public void setLast_pause_date(Date last_pause_date) {
        this.last_pause_date = last_pause_date;
    }

    public String getLast_pause_man() {
        return last_pause_man;
    }

    public void setLast_pause_man(String last_pause_man) {
        this.last_pause_man = last_pause_man;
    }

    public Date getLast_resume_date() {
        return last_resume_date;
    }

    public void setLast_resume_date(Date last_resume_date) {
        this.last_resume_date = last_resume_date;
    }

    public String getLast_resume_man() {
        return last_resume_man;
    }

    public void setLast_resume_man(String last_resume_man) {
        this.last_resume_man = last_resume_man;
    }

    public int getJob_level() {
        return job_level;
    }

    public void setJob_level(int job_level) {
        this.job_level = job_level;
    }

    public Date getFinish_date() {
        return finish_date;
    }

    public void setFinish_date(Date finish_date) {
        this.finish_date = finish_date;
    }
}
