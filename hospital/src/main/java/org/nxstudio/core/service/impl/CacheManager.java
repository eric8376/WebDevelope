package org.nxstudio.core.service.impl;

import org.nxstudio.core.service.ICacheManager;
import org.springframework.stereotype.Component;

import java.util.HashMap;

/**
 * Created with IntelliJ IDEA.
 * User: zhangwei
 * Date: 13-8-30
 * Time: 下午3:21
 * =================================
 */
@Component
/**
 * 工作流缓存
 */
public class CacheManager implements ICacheManager {
    private HashMap Caches = new HashMap();

    public Object getCache(Object key) {
        return Caches.get(key);
    }

    public void setCache(Object key, Object value) throws Exception {
        setCache(key, value, true);
    }

    public void setCache(Object key, Object value, boolean isCover) throws Exception {
        if (this.containsKey(key) && !isCover) {
            throw new Exception("已存在相同的Key");
        }
        Caches.put(key, value);
    }

    public boolean containsKey(Object key) {
        return Caches.containsKey(key);
    }
}
