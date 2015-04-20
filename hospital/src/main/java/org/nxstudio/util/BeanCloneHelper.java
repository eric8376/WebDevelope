package org.nxstudio.util;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: zhangwei
 * Date: 13-7-8
 * Time: 下午8:37
 * =================================
 * 用于对Bean进行浅复制
 */
public class BeanCloneHelper<T> {
    public BeanCloneHelper() {
        exception = new ArrayList<Class>();
        exception.add(IsPK.class);
    }

    public BeanCloneHelper(T source, T target) {
        this();
        this.source = source;
        this.target = target;
    }

    /**
     * 开始clone
     */
    public void beginClone() throws IllegalAccessException {
        if (_isEnd)
            return;
        Field[] at = source.getClass().getDeclaredFields();
        for (Field fd : at) {
            if (!isKey(fd) && !isMethodAnnonted(fd)) {
                fd.set(this.target, fd.get(this.source));
            }
        }
        _isEnd = true;
    }

    /**
     * 判断对象是否存在例外的描述
     *
     * @param fd
     * @return
     */
    private boolean isKey(Field fd) {
        fd.setAccessible(true);
        for (Class cls : exception) {
            if (fd.isAnnotationPresent(cls)) {
                return true;
            }
        }
        return false;
    }

    /**
     * 判断Field的Get方法是否有指定的注解
     *
     * @param field
     * @return
     * @author 罗春吉
     */
    private boolean isMethodAnnonted(Field field) {
        String firstLetter = field.getName().substring(0, 1).toUpperCase();
        //获得对应的getXxxxx方法的名子。。。
        String getMethodName = "get" + firstLetter + field.getName().substring(1);
        try {
            for (Class cls : exception) {
                Method method = source.getClass().getMethod(getMethodName, new Class[]{});
                if (method.isAnnotationPresent(cls)) {
                    return true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean _isEnd = false;//是否已结束clone
    private T source;//源对象
    private T target;//目标对象
    private List<Class> exception;//例外描述

    public List<Class> getException() {

        return exception;
    }

    public void setException(List<Class> exception) {
        _isEnd = false;
        this.exception = exception;
    }

    public T getTarget() {
        return target;
    }

    public void setTarget(T target) {
        _isEnd = false;
        this.target = target;
    }

    public T getSource() {
        return source;
    }

    public void setSource(T source) {
        _isEnd = false;
        this.source = source;
    }
}

@Documented
@Retention(RetentionPolicy.RUNTIME)
@interface IsPK {
    boolean value();
}
