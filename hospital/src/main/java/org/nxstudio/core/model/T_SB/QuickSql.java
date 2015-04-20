package org.nxstudio.core.model.T_SB;

import org.nxstudio.core.model.AbstractModel;
import org.nxstudio.util.idgenerator.annotation.CommonIDGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【快捷查询sql语句收集】
 * 时间: 2013-06-15 下午4:46
 */

@Entity
@Table(name = "T_SB_QUICK_SQL")
public class QuickSql extends AbstractModel implements Serializable {

    @Id
    @CommonIDGenerator(name = "CODEIDSEQUENCES", setIDMethoName = "setSql_no", fieldClass = Long.class)
    private Long sql_no;

    private String name;

    private String explain;

    private String columns;

    private String after_sql;

    @Column(updatable = false)
    private Date create_date;

    @Column(updatable = false)
    private String create_user;

    @Column(insertable = false)
    private Date last_upd_date;

    @Column(insertable = false)
    private String last_upd_user;

    @Column(unique = true)
    private String ref_no;


    //--------------- getter and setter ---------------
    public Long getSql_no() {
        return sql_no;
    }

    public void setSql_no(Long sql_no) {
        this.sql_no = sql_no;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getExplain() {
        return explain;
    }

    public void setExplain(String explain) {
        this.explain = explain;
    }

    public String getColumns() {
        return columns;
    }

    public void setColumns(String columns) {
        this.columns = columns;
    }

    public String getAfter_sql() {
        return after_sql;
    }

    public void setAfter_sql(String after_sql) {
        this.after_sql = after_sql;
    }

    public Date getCreate_date() {
        return create_date;
    }

    public void setCreate_date(Date create_date) {
        this.create_date = create_date;
    }

    public String getCreate_user() {
        return create_user;
    }

    public void setCreate_user(String create_user) {
        this.create_user = create_user;
    }

    public Date getLast_upd_date() {
        return last_upd_date;
    }

    public void setLast_upd_date(Date last_upd_date) {
        this.last_upd_date = last_upd_date;
    }

    public String getLast_upd_user() {
        return last_upd_user;
    }

    public void setLast_upd_user(String last_upd_user) {
        this.last_upd_user = last_upd_user;
    }

    public String getRef_no() {
        return ref_no;
    }

    public void setRef_no(String ref_no) {
        this.ref_no = ref_no;
    }
}
