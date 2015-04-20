package org.nxstudio.demo.net.webservice;

import javax.jws.WebService;

/**
 * WebService接口
 *
 * @author XiongChun
 * @see org.nxstudio.core.model.impl.BaseDomain
 * @since 2010-10-13
 */
@WebService
public interface HelloWorldService {
    /**
     * 需要对外发布的方法
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
    public String queryBalanceInfo(String jsbh);

}
