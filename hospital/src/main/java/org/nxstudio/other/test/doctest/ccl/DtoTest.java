package org.nxstudio.other.test.doctest.ccl;

import java.util.ArrayList;
import java.util.List;

import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;

/**
 * 技术白皮书随书代码示例
 *
 * @author XiongChun
 * @since 2011-03-29
 */
public class DtoTest {

    public static void main(String[] args) {
        Dto dto = new BaseDto(); //实例化dto对象
        dto.setDefaultAList(new ArrayList()); //压入第一个缺省List数据对象
        dto.setDefaultBList(new ArrayList()); //压入第二个缺省List数据对象
        List aList = dto.getDefaultAList(); //取出一个缺省List数据对象
        List bList = dto.getDefaultBList(); //取出二个缺省List数据对象
        dto.put("cList", new ArrayList()); //压入任意List数据对象
        List cList = dto.getAsList("cList"); //取出任意List数据对象
        dto.put("name", "xiongchun"); //压入字符串
        String name = dto.getAsString("name"); //以String类型返回键值
        dto.put("age", 20); //压入年龄
        Integer age = dto.getAsInteger("age"); //以Integer类型返回键值
        //以此类推,还提供了如下一些取法
        dto.getAsLong("key");  //以Long类型返回键值
        dto.getAsBigDecimal("key");  //以BigDecimal类型返回键值
        dto.getAsDate("key");  //以Date类型返回键值
        dto.getAsTimestamp("key");  //以Timestamp类型返回键值
        String xml = dto.toXml(); //dto转为XML资料格式
        String json = dto.toJson();//dto转为JSON资料格式
        dto.println();//打印dto对象
    }
}
