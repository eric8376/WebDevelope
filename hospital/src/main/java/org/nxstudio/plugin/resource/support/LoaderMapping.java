package org.nxstudio.plugin.resource.support;

import org.nxstudio.plugin.resource.ResourceException;
import org.nxstudio.plugin.resource.ResourceLoader;

/**
 * LoaderMapping
 *
 * @author HuangYunHui|XiongChun
 * @since 2010-2-5
 */
public interface LoaderMapping {
    public ResourceLoader mapping(String pName) throws ResourceException;
}
