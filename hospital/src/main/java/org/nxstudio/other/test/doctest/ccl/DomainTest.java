package org.nxstudio.other.test.doctest.ccl;

import org.nxstudio.util.g4.G4Constants;

/**
 * 技术白皮书随书代码示例
 *
 * @author XiongChun
 * @since 2011-03-29
 */
public class DomainTest {

    public static void main(String[] args) {
        StudentDomain studentDomain = new StudentDomain();
        studentDomain.setStudentid("001");
        //省略其实属性赋值
        // 将PO对象转为Dto对象
        studentDomain.toDto();
        // 将PO对象转换为JSON资料格式
        studentDomain.toJson();
        // 将PO对象转换为XML资料格式
        studentDomain.toXml(G4Constants.XML_Node);
    }

}
