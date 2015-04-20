package org.nxstudio.core.model.T_SB;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【发送信息模板JPA配置】
 * 时间: 2013-06-11 下午3:43
 */

import org.nxstudio.core.model.AbstractModel;
import org.nxstudio.util.idgenerator.annotation.CommonIDGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "T_SB_MESSAGE_TPL")
public class MessageTpl extends AbstractModel implements Serializable {

    @Id
    @CommonIDGenerator(name = "CODEIDSEQUENCES", setIDMethoName = "setTpl_no", fieldClass = Long.class)
    private Long tpl_no;

    private String tpl_name;

    private String title;

    private String content;

    private String tpl_explain;

    @Column(updatable = false)
    private Date create_date;


    //--------------- getter and setter ---------------
    public Long getTpl_no() {
        return tpl_no;
    }

    public void setTpl_no(Long tpl_no) {
        this.tpl_no = tpl_no;
    }

    public String getTpl_name() {
        return tpl_name;
    }

    public void setTpl_name(String tpl_name) {
        this.tpl_name = tpl_name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTpl_explain() {
        return tpl_explain;
    }

    public void setTpl_explain(String tpl_explain) {
        this.tpl_explain = tpl_explain;
    }

    public Date getCreate_date() {
        return create_date;
    }

    public void setCreate_date(Date create_date) {
        this.create_date = create_date;
    }

}
