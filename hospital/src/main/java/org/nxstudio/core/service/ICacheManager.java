package org.nxstudio.core.service;

/**
 * Created with IntelliJ IDEA.
 * User: zhangwei
 * Date: 13-8-30
 * Time: 下午4:23
 * =================================
 */

/**
 * 工作流缓存接口
 */
public interface ICacheManager {
    public Object getCache(Object key);

    public void setCache(Object key, Object value) throws Exception;

    public void setCache(Object key, Object value, boolean isCover) throws Exception;

    public boolean containsKey(Object key);
}
