package org.nxstudio.demo.net.httpinvoker.client;

import org.nxstudio.core.model.Dto;

/**
 * Httpinvoker接口
 *
 * @author XiongChun
 * @see org.nxstudio.core.model.impl.BaseDomain
 * @since 2010-10-13
 */
public interface HelloWorldClient {
    /**
     * sayHello
     *
     * @param text
     * @return
     */
    public String sayHello(String text);

    /**
     * 查询一条结算明细测试数据
     *
     * @param jsbh
     * @return XML字符串
     */
    public Dto queryBalanceInfo(String jsbh);

}
