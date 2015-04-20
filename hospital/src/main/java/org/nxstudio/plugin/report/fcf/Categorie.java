package org.nxstudio.plugin.report.fcf;

import java.util.HashMap;

import org.nxstudio.core.controller.BaseAction;

/**
 * FlashReport种类元对象<br>
 * <b>只适用与组合图
 *
 * @author XiongChun
 * @see BaseAction
 * @since 2010-07-04
 */
public class Categorie extends HashMap {

    public Categorie(String pName) {
        setName(pName);
    }

    /**
     * 设置名称属性
     *
     * @param pName
     */
    public void setName(String pName) {
        this.put("name", pName);
    }

    /**
     * 设置鼠标悬停时候追加的文本
     *
     * @param pName
     */
    public void setHoverText(String pHoverText) {
        this.put("hoverText", pHoverText);
    }
}
