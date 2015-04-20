package org.nxstudio.util;

import org.nxstudio.core.model.AbstractModel;
import org.apache.commons.beanutils.BeanUtils;
import org.nxstudio.core.model.Dto;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.util.json.JsonHelper;

import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 根据vo字段名加载值
 * Created with IntelliJ IDEA.
 * User: 黄琦鸿
 * Date: 13-6-6
 * Time: 下午5:19
 * To change this template use File | Settings | File Templates.
 */
public class AutowireVoAtt {
    private static SimpleDateFormat DateFormate = new SimpleDateFormat("yyyy-MM-dd");
    private static SimpleDateFormat TimeFormate = new SimpleDateFormat(
            "yyyy-MM-dd HH:mm:ss");
    private static List<String> methodname = Arrays.asList(new String[]{"java.lang.Integer",
            "java.lang.Long",
            "java.lang.String",
            "java.math.BigDecimal",
            "java.util.Date",
            "java.sql.Timestamp",
            "java.lang.Boolean",
            "java.lang.Double"
    });

    public static <T> T newAddValue(Class<T> objclass, Dto dto) throws Exception {
        T object = objclass.newInstance();
        Field[] fs = objclass.getDeclaredFields(); // 得到所有的fields
        for (Field f : fs) {
            Class fieldClazz = f.getType(); // 得到field的class及类型全路径
            String FieldName = f.getName();
            if (fieldClazz.isAssignableFrom(Set.class) || fieldClazz.isAssignableFrom(List.class)) //【2】
            {
                Type fc = f.getGenericType(); // 关键的地方，如果是List类型，得到其Generic的类型

                if (fc == null) continue;
                if (fc instanceof ParameterizedType) // 【3】如果是泛型参数的类型
                {
                    ParameterizedType pt = (ParameterizedType) fc;

                    Class genericClazz = (Class) pt.getActualTypeArguments()[0]; //【4】 得到泛型里的class类型对象。

                    Collection collection;
                    if (fieldClazz.isAssignableFrom(Set.class)) {
                        collection = new HashSet();
                    } else {
                        collection = new ArrayList();
                    }
                    //当前段传过来的数据不为空时，才去转成list/set
                    if (genericClazz.equals("java.lang.String")) {
                        String listdto = dto.getAsString(FieldName);
                        if (!listdto.equals("")) {
                            listdto = listdto.substring(1, listdto.length() - 1);
                            String[] listdtos = listdto.split("},");
                            for (int i = 0; i < listdtos.length; i++) {
                                if (i != listdtos.length - 1) {
                                    listdtos[i] += "}";
                                }
                                Dto tempdto = JsonHelper.parseSingleJson2Dto(listdtos[i]);
                                Class Valueclass = Class.forName(genericClazz.getName());
                                T Value = (T) newAddValue(Valueclass, tempdto);
                                collection.add(Value);
                            }
                            BeanUtils.setProperty(object, FieldName, collection);
                        }
                    } else {
                        Collection c = (Collection) dto.get(FieldName);
                        if (G4Utils.isNotEmpty(c)) {
                            BeanUtils.setProperty(object, FieldName, c);
                        }
                    }

                }

            } else {
                Object valus = getValue(fieldClazz.getName(), dto, FieldName);
                if (valus != null) {
                    BeanUtils.setProperty(object, FieldName, valus);
                }
            }

        }
        return object;
    }

    public static Object getValue(String fieldclass, Dto dto, String FieldName) throws ParseException {

        switch (methodname.lastIndexOf(fieldclass)) {
            case 0:
                return dto.getAsInteger(FieldName);
            case 1:
                return dto.getAsLong(FieldName);
            case 2:
                return dto.getAsString(FieldName);
            case 3:
                return dto.getAsBigDecimal(FieldName);
            case 4:
                if (dto.get(FieldName) instanceof Date) {
                    return (Date) dto.get(FieldName);
                } else {
                    String temp = dto.getAsString(FieldName);
                    Date date = null;
                    if (temp.isEmpty()) {
                        return date;
                    } else if (temp.indexOf(":") == -1) {
                        date = temp.equals("") ? null : DateFormate.parse(temp);
                    } else {
                        date = temp.equals("") ? null :
                                temp.indexOf("CST") == -1 ?
                                        TimeFormate.parse(dto.getAsString(FieldName)) : TimeFormate.parse(TimeFormate.format(new Date(temp)));
                    }
                    return date;
                }
            case 5:
                return dto.getAsTimestamp(FieldName);
            case 6:
                return dto.getAsBoolean(FieldName);
            case 7:
                return G4Utils.isEmpty(dto.getAsString(FieldName)) ? null : new Double(dto.getAsString(FieldName));

        }
        return dto.get(FieldName);
    }

    @Deprecated
    public static <T > T addValue(Class<T> objclass, Dto dto) throws IllegalAccessException, InstantiationException, IntrospectionException {
//        Field Field[]= objclass.getDeclaredFields();
        PropertyDescriptor propertydescriptor[] = Introspector.getBeanInfo(objclass).getPropertyDescriptors();
        T object = objclass.newInstance();
//        for (Field field : Field) {
        for (PropertyDescriptor field : propertydescriptor) {
            String FieldName = field.getName();
            if (dto.containsKey(FieldName)) {
                try {
                    //多对一时，该字段是“一”对象实体类
                    if (/*isDbEntity(field.getPropertyType())*/ field.getPropertyType().isAssignableFrom(Set.class) || field.getPropertyType().isAssignableFrom(List.class)) {
                        Collection collection;
                        if (field.getPropertyType().isAssignableFrom(Set.class)) {
                            collection = new HashSet();
                        } else {
                            collection = new ArrayList();
                        }
                        String listdto = dto.getAsString(field.getName());
                        //当前段传过来的数据不为空时，才去转成list/set
                        if (!listdto.equals("")) {
                            listdto = listdto.substring(1, listdto.length() - 1);
                            String[] listdtos = listdto.split("},");
                            for (int i = 0; i < listdtos.length; i++) {
                                if (i != listdtos.length - 1) {
                                    listdtos[i] += "}";
                                }
                                Dto tempdto = JsonHelper.parseSingleJson2Dto(listdtos[i]);
                                try {
//                                ParameterizedType parameterizedType = (ParameterizedType)  .getGenericType();
//                                Class  Valueclass=  parameterizedType.getActualTypeArguments()[0].getClass();
                                    Class Valueclass = Class.forName("com.rwy.hibernateMapping." + field.getName());
                                    T Value = (T) addValue(Valueclass, tempdto);
                                    collection.add(Value);
                                } catch (ClassNotFoundException e) {
                                    e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                                }
                            }
                            BeanUtils.setProperty(object, FieldName, collection);
                        }
                    } else {
                        Object valus = getValue(field.getPropertyType().getName(), dto, FieldName);
                        if (valus != null) {
                            BeanUtils.setProperty(object, FieldName, valus);
                        }

                    }

                } catch (InvocationTargetException e) {
                    e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                } catch (ParseException e) {
                    e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
                }
            }

        }
        return object;
    }
}

