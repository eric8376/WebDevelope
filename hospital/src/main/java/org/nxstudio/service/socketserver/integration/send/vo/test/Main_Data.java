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

import org.nxstudio.service.socketserver.integration.send.vo.CommonVo.BaseMain_Data;

import javax.xml.bind.annotation.XmlElement;
import java.util.ArrayList;
import java.util.List;


/**
 * <pre>功能描述: 封装记账分录信息</pre>
 * <br>JDK版本：1.5+
 *
 * @author 林邵诚
 * @version 1.0.1 创建于 Aug 12, 2010
 * @since 1.0
 * 修改日期：Aug 12, 2010 林邵诚
 */
public class Main_Data extends BaseMain_Data {
    private String name;
    private Integer age;
    private String sex;
    @XmlElement(name = "Score")
    List<ScoreVo> Score = new ArrayList<ScoreVo>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public List<ScoreVo> getScore() {
        return Score;
    }

    public void setScore(List<ScoreVo> score) {
        Score = score;
    }
}
