package org.nxstudio.util;

import org.nxstudio.core.model.Dto;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.*;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【将Dto转向实体】
 * 时间: 2013-06-24 上午11:35
 * <p/>
 * ---------------规则说明------------------
 * 1、Dto里面的需要转换成实体属性的 key值必须和属性名一样，不需要转换的key随意
 * 2、转换时，遍历所有实体类的属性，查询dto
 * 如果dto不存在key值不进行转换
 * 如果dto存在key值，则根据属性值类型进行转换，转换出现 异常时抛出
 * 3、转换只对普通属性进行转换，不转换list,map等集合类型的属性
 * 4、转换时 调用 set+属性名方法进行赋值
 * 5、【该规则只适用于Hibernate实体类属性的转换】
 */
public class ConvertDtoToEntity {
    /**
     * 将Dto转向实体
     *
     * @param objclass 转换的实体class
     * @param dto      需要转换的Dto
     * @param <T>
     */
    public static <T extends Object> T Convert(Class<T> entityClass, Dto dto) throws Exception {
        Field[] fields = entityClass.getDeclaredFields();
        T obj = entityClass.newInstance();
        for (Field field : fields) {
            String fieldName = field.getName();
            //如果存在key值 进行转换
            if (dto.containsKey(fieldName)) {
                String typeName = field.getType().getName();
                String first = fieldName.substring(0, 1).toUpperCase();
                String last = fieldName.substring(1);
                Method method = entityClass.getDeclaredMethod("set" + first + last, field.getType());

                //--------数字类型--------
                if (typeName.equals("java.lang.Integer")) {
                    method.invoke(obj, dto.getAsInteger(fieldName));
                } else if (typeName.equals("int")) {
                    method.invoke(obj, (int) dto.getAsInteger(fieldName));
                } else if (typeName.equals("java.lang.Long")) {
                    method.invoke(obj, dto.getAsLong(fieldName));
                } else if (typeName.equals("java.lang.Double")) {
                    method.invoke(obj, (Double) dto.get(fieldName));
                } else if (typeName.equals("double")) {
                    method.invoke(obj, Double.parseDouble(dto.get(fieldName).toString()));
                } else if (typeName.equals("java.math.BigDecimal")) {
                    method.invoke(obj, dto.getAsBigDecimal(fieldName));
                } else if (typeName.equals("java.lang.String")) {
                    //--------字符类型--------
                    method.invoke(obj, dto.getAsString(fieldName));
                } else if (typeName.equals("java.util.Date")) {
                    //--------日期类型--------
                    method.invoke(obj, (Date) dto.get(fieldName));
                } else if (typeName.equals("java.sql.Date")) {
                    method.invoke(obj, dto.get(fieldName));
                } else if (typeName.equals("java.sql.Timestamp")) {
                    method.invoke(obj, dto.getAsTimestamp(fieldName));
                } else if (typeName.equals("java.lang.Boolean")) {
                    //--------布尔值类型--------
                    method.invoke(obj, dto.getAsBoolean(fieldName));
                }
            }
        }

        return obj;
    }
}

