package org.nxstudio.plugin.resource.support;

import org.nxstudio.plugin.resource.ResourceException;

/**
 * ResourceConfigMapping
 *
 * @author HuangYunHui|XiongChun
 * @since 2010-2-5
 */
public interface ResourceConfigMapping {
    public ResourceConfig mapping(String pUri) throws ResourceException;
}
