package org.nxstudio.core.tag.tpl.tplengine;

/**
 * 字符串模板
 *
 * @author XiongChun
 * @see DefaultTemplate
 * @since 2009-07-28
 */
public class StringTemplate implements DefaultTemplate {
    /**
     * 字符串模板内容
     */
    private String resource;

    /**
     * 构造函数
     *
     * @param pResource 字符串模板内容
     */
    public StringTemplate(String pResource) {
        this.resource = pResource;
    }

    /**
     * 缺省构造函数
     */
    public StringTemplate() {
    }

    /**
     * 获取字符串模板内容
     */
    public String getTemplateResource() {
        return getResource();
    }

    /**
     * 设置字符串模板内容
     */
    public void setTemplateResource(String pResource) {
        this.resource = pResource;
    }

    public String getResource() {
        return resource;
    }

    public void setResource(String resource) {
        this.resource = resource;
    }

}
