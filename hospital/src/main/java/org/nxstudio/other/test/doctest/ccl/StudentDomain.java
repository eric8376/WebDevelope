package org.nxstudio.other.test.doctest.ccl;

import java.sql.Date;

import org.nxstudio.core.model.PKey;
import org.nxstudio.core.model.impl.BaseDomain;
import org.nxstudio.core.model.impl.BasePKey;

/**
 * 一个学生信息领域实体对象
 * 技术白皮书随书代码示例
 *
 * @author XiongChun
 * @since 2011-03-29
 */
public class StudentDomain extends BaseDomain {

    private String studentid;

    private String name;

    private Integer age;

    private Date birthday;

    public PKey getPk() {
        PKey pKey = new BasePKey();
        pKey.put("studentid", studentid);
        return pKey;
    }

    public String getStudentid() {
        return studentid;
    }

    public void setStudentid(String studentid) {
        this.studentid = studentid;
    }

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

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

}
