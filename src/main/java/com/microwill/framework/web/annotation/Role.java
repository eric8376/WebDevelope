package com.microwill.framework.web.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


/**
 * 标记指定control下的指定方法只允许登录的指定角色可以访问
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Role {

	/**
	 * 允许访问的角色
	 * @return
	 */
//	public abstract RoleType[] value();
}
