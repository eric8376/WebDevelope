package org.nxstudio.plugin.resource.support;

import org.nxstudio.plugin.resource.ResourceException;
import org.nxstudio.plugin.resource.ResourceHandler;

/**
 * HandlerMapping
 *
 * @author HuangYunHui|XiongChun
 * @since 2010-2-5
 */
public interface HandlerMapping {

    public ResourceHandler mapping(String pName) throws ResourceException;

}
