package org.nxstudio.util.idgenerator.annotation;


import javax.persistence.UniqueConstraint;
import javax.sound.sampled.TargetDataLine;
import java.lang.annotation.*;

/**
 * <pre></pre>
 * <br>
 * <pre>所属模块：</pre>
 *
 * @author 黄琦鸿
 *         创建于  2015/1/2 16:19.
 */
@Documented//说明该注解将被包含在javadoc中
@Target({ElementType.TYPE, ElementType.METHOD, ElementType.FIELD})//定义注解的作用目标**作用范围字段、枚举的常量/方法
@Retention(RetentionPolicy.RUNTIME)// 注解会在class字节码文件中存在，在运行时可以通过反射获取到
public @interface CommonIDGenerator {
    //序列名称
    String name() default "";

    //序列名称
    String setIDMethoName() default "";

    Class fieldClass() default Object.class;
}
