/**
 * ICoreService.java
 * 版权声明 力铭科技版权所有
 * 项目组：广州农村商业银行电子商业汇票系统
 * 修订记录：
 * 1)创建者：林邵诚
 * 时 间：Aug 11, 2010
 * 描 述：创建
 */
package org.nxstudio.service.socketserver.integration.send.service;


import org.nxstudio.service.socketserver.integration.send.vo.commonaccount.CommonAccountRequestVO;
import org.nxstudio.service.socketserver.integration.send.vo.commonaccount.CommonAccountResponseVO;
import org.nxstudio.service.socketserver.integration.send.vo.creditcontrol.CreditControlRequestVO;
import org.nxstudio.service.socketserver.integration.send.vo.creditcontrol.CreditControlResponseVO;
import org.hibernate.service.spi.ServiceException;

/**
 * <pre>功能描述: 核心交易服务接口</pre>
 * <br>JDK版本：1.5+
 * @author 林邵诚
 * @version 1.0.1 创建于 Aug 11, 2010
 * @since 1.0
 * 修改日期：Aug 11, 2010 林邵诚
 */
public interface ICoreService {

    /**
     * 功能说明：额度占用
     * @param req 额度占用相关信息
     * @return 返回额度占用结果，判断规则，响应结果对象的isSuccess()方法返回true则表示交易成功，否则交易失败
     * @throws ServiceException
     * @author: 林邵诚
     * @version: 1.0.1
     * 创建于Aug 11, 2010
     */
    public CreditControlResponseVO engrossCredit(CreditControlRequestVO req) throws ServiceException;

    /**
     * 功能说明：恢复额度
     * @param req 额度恢复相关信息
     * @return 返回额度恢复结果，判断规则，响应结果对象的isSuccess()方法返回true则表示交易成功，否则交易失败
     * @throws ServiceException
     * @author: 林邵诚
     * @version: 1.0.1
     * 创建于Aug 11, 2010
     */
    public CreditControlResponseVO restoreCredit(CreditControlRequestVO req) throws ServiceException;

    /**
     * 功能说明：额度查询
     * @param req 额度查询相关条件信息
     * @return 返回被查询人可用额度，响应结果对象的isSuccess()方法返回true则表示交易成功，否则交易失败
     * @throws ServiceException
     * @author: 林邵诚
     * @version: 1.0.1
     * 创建于Aug 11, 2010
     */
    public CreditControlResponseVO queryCredit(CreditControlRequestVO req) throws ServiceException;

    /**
     * 功能说明：通用记账接口
     * @param req 通用记账请求信息
     * @return 返回记账响应结果，响应结果对象的isSuccess()方法返回true则表示交易成功，否则交易失败
     * @throws ServiceException
     * @author: 林邵诚
     * @version: 1.0.1
     * 创建于Aug 12, 2010
     */
    public CommonAccountResponseVO commonAccount(CommonAccountRequestVO req) throws ServiceException;
}
