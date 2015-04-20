package org.nxstudio.core.model.impl;

import java.io.Serializable;

import org.nxstudio.core.model.Dto;
import org.nxstudio.util.g4.G4Utils;

/**
 * 简单值对象<br>
 * 简单值对象和数据库表没有一一对应关系<br>
 * <b>注意：没有特殊需要建议不用VO,对于固定的数据存储结构请使用Domain;对于动态可变的
 * 的数据存储结构请使用Dto来代替.
 *
 * @author XiongChun
 * @see java.io.Serializable
 * @since 2009-06-23
 */
public abstract class BaseVo implements Serializable {

    /**
     * 将值对象转换为Dto对象
     *
     * @return dto 返回的Dto对象
     */
    public Dto toDto() {
        Dto dto = new BaseDto();
        G4Utils.copyPropFromBean2Dto(this, dto);
        return dto;
    }

    /**
     * 将值对象转换为XML字符串
     *
     * @param pStyle XML文档风格
     * @return String 返回的XML格式字符串
     */
    public String toXml(String pStyle) {
        Dto dto = toDto();
        return dto.toXml(pStyle);
    }

    /**
     * 将值对象转换为JSON字符串
     *
     * @return String 返回的JSON格式字符串
     */
    public String toJson() {
        Dto dto = toDto();
        return dto.toJson();
    }
}
