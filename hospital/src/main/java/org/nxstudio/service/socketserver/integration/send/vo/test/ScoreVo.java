/**
 * AccountItemVO.java
 * 版权声明 力铭科技版权所有
 * 项目组：广州农村商业银行电子商业汇票系统
 * 修订记录：
 * 1)创建者：林邵诚
 * 时 间：Aug 12, 2010
 * 描 述：创建
 */
package org.nxstudio.service.socketserver.integration.send.vo.test;


import javax.xml.bind.annotation.*;


/**
 * <pre>功能描述: 封装记账分录信息</pre>
 * <br>JDK版本：1.5+
 *
 * @author 林邵诚
 * @version 1.0.1 创建于 Aug 12, 2010
 * @since 1.0
 * 修改日期：Aug 12, 2010 林邵诚
 */
@XmlRootElement(name = "Score")
@XmlAccessorType(XmlAccessType.FIELD)
public class ScoreVo {
    private String subject;
    private Integer score;

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }
}
