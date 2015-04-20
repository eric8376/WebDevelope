package org.nxstudio.util.json;

import org.nxstudio.core.model.AbstractModel;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.g4.G4Utils;

import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.*;

/**
 * 根据vo字段名加载值
 * Created with IntelliJ IDEA.
 * User: 黄琦鸿
 * Date: 13-6-6
 * Time: 下午5:19
 * To change this template use File | Settings | File Templates.
 */
public class Auto2DtoFromVo {
    public static <T> Dto Vo2Dto(T model, List<String> ex_files) {
        if (model == null) {
            return null;
        }
        Dto dto = new BaseDto();
        Class Tclass = model.getClass();
        try {
            Field[] fs = Tclass.getDeclaredFields(); // 得到所有的fields
            for (Field field : fs) {
                String FieldName = field.getName();
                if (G4Utils.isNotEmpty(ex_files) && ex_files.indexOf(FieldName) != -1) {
                    continue;
                }
                StringBuffer sb = new StringBuffer();
                sb.append("get");
                sb.append(FieldName.substring(0, 1).toUpperCase());
                sb.append(FieldName.substring(1));
                Method method = Tclass.getMethod(sb.toString());
                Object AttValue = method.invoke(model, null);
                if (G4Utils.isEmpty(AttValue)) {
                    AttValue = "";
                }
                dto.put(FieldName, AttValue);
            }
        } catch (InvocationTargetException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        } catch (IllegalAccessException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        }
        return dto;
    }
}

