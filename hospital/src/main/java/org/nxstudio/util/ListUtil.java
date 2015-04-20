package org.nxstudio.util;


import org.nxstudio.core.model.Dto;
import org.nxstudio.util.g4.G4Utils;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.*;


/**
 * SortUtil.java verson 1.0 Aug 5, 2011
 * list集合排序工具
 *
 * @author 贾世雄
 */
public class ListUtil {

    // 按任意属性进行排序
    static class AnyProperComparator implements Comparator<Object> {

        private String properName;// 根据此关键字属性排序

        private boolean flag;// 为true的时候是正序，为false的时候是倒序

        public AnyProperComparator(String properName, boolean flag) {
            super();
            this.properName = properName;
            this.flag = flag;
        }

        public void setProperName(String properName) {
            this.properName = properName;
        }

        public String getProperName() {
            return properName;
        }

        public boolean isFlag() {
            return flag;
        }

        public void setFlag(boolean flag) {
            this.flag = flag;
        }

        /**
         * 实现Comparator的对比方法
         *
         * @param r1
         * @param r2
         */
        @SuppressWarnings("unchecked")
        public int compare(Object r1, Object r2) {
            Class c = r1.getClass();
            double result = 0;
            try {
                Field field = c.getDeclaredField(properName);
                String classType = field.getType().getSimpleName();
                Method method = null;
                // 这里仅根据方法的返回值类型的名称来判定，比较方便
                if ("String".equals(classType)) {
                    method = c.getMethod("get" + properName.substring(0, 1).toUpperCase() + properName.substring(1), new Class[]{});
                    if (flag) {
                        result = ((String) method.invoke(r1)).compareTo((String) method.invoke(r2));
                    } else {
                        result = ((String) method.invoke(r2)).compareTo((String) method.invoke(r1));
                    }

                } else if ("Integer".equals(classType) || "int".equals(classType)) {
                    method = c.getMethod("get" + properName.substring(0, 1).toUpperCase() + properName.substring(1), new Class[]{});
                    if (flag) {
                        result = ((Integer) method.invoke(r1)) - ((Integer) method.invoke(r2));
                    } else {
                        result = ((Integer) method.invoke(r2)) - ((Integer) method.invoke(r1));
                    }
                } else if ("Double".equals(classType) || "double".equals(classType)) {
                    method = c.getMethod("get" + properName.substring(0, 1).toUpperCase() + properName.substring(1), new Class[]{});
                    if (flag) {
                        result = ((Double) method.invoke(r1)) - ((Double) method.invoke(r2));
                    } else {
                        result = ((Double) method.invoke(r2)) - ((Double) method.invoke(r1));
                    }
                } else if ("Float".equals(classType) || "float".equals(classType)) {
                    method = c.getMethod("get" + properName.substring(0, 1).toUpperCase() + properName.substring(1), new Class[]{});
                    if (flag) {
                        result = ((Float) method.invoke(r1)) - ((Float) method.invoke(r2));
                    } else {
                        result = ((Float) method.invoke(r2)) - ((Float) method.invoke(r1));
                    }
                } else {
                    System.out.println("属性排序只支持数据类型和String类型，其它类型暂不支持。");
                    result = -100;
                }
            } catch (SecurityException e) {
                e.printStackTrace();
            } catch (NoSuchFieldException e) {
                e.printStackTrace();
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            } catch (IllegalArgumentException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }

            // 确定返回值
            if (result > 0) {
                return 1;
            } else if (result < 0) {
                return -1;
            }
            return 0;
        }

    }

    /**
     * 按任意给定的字段进行排序，升序或降序由flag决定
     *
     * @param list
     * @param properName
     * @param flag
     * @return
     */
    @SuppressWarnings("unchecked")
    public static List anyProperSort(List list, String properName, boolean flag) {
        AnyProperComparator comparator = new AnyProperComparator(properName, flag);
        Collections.sort(list, comparator);
        return list;
    }

    /**
     * @param list
     * @param field
     * @param comparetype
     * @return
     */
    public static Set getFieldFromList(List<Dto> list, String field) {
        List temp = new ArrayList();
        if (G4Utils.isNotEmpty(list)) {
            for (int i = 0; i < list.size(); i++) {
                temp.add(list.get(i).get(field));
            }
        }
        Set tempset = new HashSet(temp);
        return tempset;
    }

    /**
     * 将set转成list
     *
     * @param set
     * @param <T>
     * @return
     */
    public static <T> List<T> convertSetToList(Set<T> set) {
        List<T> list = new ArrayList<T>();
        if (set != null && set.size() > 0) {
            for (T t : set) {
                list.add(t);
            }
        }
        return list;
    }

}