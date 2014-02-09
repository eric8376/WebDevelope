package com.microwill.framework.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.microwill.framework.enums.SysLogEnum;


/**
 * 标记指定日记记录的类型
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface SysLog {

	/**
	 * 允许访问的角色
	 * @return
	 */
	public abstract SysLogEnum value();
}
