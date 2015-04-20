package org.nxstudio.plugin.resource.support;

import org.nxstudio.plugin.resource.Cache;
import org.nxstudio.plugin.resource.CacheException;
import org.nxstudio.plugin.resource.Resource;

/**
 * CacheManager
 *
 * @author HuangYunHui|XiongChun
 * @since 2010-2-5
 */
public class CacheManager {
    private final Cache cache;

    public CacheManager(Cache pCache) {
        this.cache = pCache;
    }

    public void put(Resource pResource) throws CacheException {
        cache.put(pResource.getUri(), pResource);
    }

    public Resource get(String pUri) throws CacheException {
        return (Resource) cache.get(pUri);
    }

}
