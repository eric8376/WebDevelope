package org.nxstudio.core.model;

import org.apache.commons.lang.builder.ToStringBuilder;

/**
 * 所有hibernate的实体类都继承这个抽象类
 *
 * @author Zhang Kaitao
 */
public abstract class AbstractModel implements java.io.Serializable {

    private static final long serialVersionUID = 2035013017939483936L;


    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }


}
