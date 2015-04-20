/**
 * CoreServiceImpl.java
 * 版权声明 力铭科技版权所有
 * 项目组：广州农村商业银行电子商业汇票系统
 * 修订记录：
 * 1)创建者：林邵诚
 * 时 间：Aug 11, 2010
 * 描 述：创建
 */
package org.nxstudio.service.socketserver.integration.send.service;

import org.nxstudio.service.socketserver.integration.constants.DealCode;
import org.nxstudio.service.socketserver.integration.send.tool.SocketClient;
import org.nxstudio.service.socketserver.integration.send.vo.CommonHeader;
import org.nxstudio.service.socketserver.integration.send.vo.CommonMessageVO;
import org.nxstudio.service.socketserver.integration.send.vo.commonaccount.CommonAccountRequestVO;
import org.nxstudio.service.socketserver.integration.send.vo.commonaccount.CommonAccountResponseVO;
import org.nxstudio.service.socketserver.integration.send.vo.creditcontrol.CreditControlRequestVO;
import org.nxstudio.service.socketserver.integration.send.vo.creditcontrol.CreditControlResponseVO;
import org.nxstudio.service.socketserver.integration.util.MessageUtil;
import org.nxstudio.service.socketserver.integration.util.XMLUtil;
import org.apache.commons.lang.StringUtils;
import org.hibernate.service.spi.ServiceException;


/**
 * <pre>功能描述: 核心交易服务</pre>
 * <br>JDK版本：1.5+
 * @author 林邵诚
 * @version 1.0.1 创建于 Aug 11, 2010
 * @since 1.0
 * 修改日期：Aug 11, 2010 林邵诚
 */
public class CoreServiceImpl implements ICoreService {

    /* (non-Javadoc)
     * @see com.leadmind.bbsp.integration.send.service.ICoreService#engrossCredit(com.leadmind.bbsp.integration.send.vo.creditcontrol.CreditControlRequestVO)
     */
    @Override
    public CreditControlResponseVO engrossCredit(CreditControlRequestVO req)
            throws ServiceException {
        req.setCAOZBZ("0");
        return (CreditControlResponseVO) sendMessage(req);
    }

    /* (non-Javadoc)
     * @see com.leadmind.bbsp.integration.send.service.ICoreService#queryCredit(com.leadmind.bbsp.integration.send.vo.creditcontrol.CreditControlRequestVO)
     */
    @Override
    public CreditControlResponseVO queryCredit(CreditControlRequestVO req)
            throws ServiceException {
        req.setCAOZBZ("2");
        return (CreditControlResponseVO) sendMessage(req);
    }

    /* (non-Javadoc)
     * @see com.leadmind.bbsp.integration.send.service.ICoreService#restoreCredit(com.leadmind.bbsp.integration.send.vo.creditcontrol.CreditControlRequestVO)
     */
    @Override
    public CreditControlResponseVO restoreCredit(CreditControlRequestVO req)
            throws ServiceException {
        req.setCAOZBZ("1");
        return (CreditControlResponseVO) sendMessage(req);
    }

    /**
     * 功能说明：发送报文
     * @param vo 报文发送对象
     * @return 返回响应结果
     * @author: 林邵诚
     * @version: 1.0.1
     * 创建于Aug 11, 2010
     */
    public CommonMessageVO sendMessage(CommonMessageVO vo) {
        CommonHeader header = vo.getMessageHeader();
        MessageUtil.setMessageHeader(header);
        String xmlMessage = XMLUtil.generateRequestMessage(vo);
        StringBuffer buffer = new StringBuffer();
        buffer.append(StringUtils.leftPad(String.valueOf(xmlMessage.length()), 6, '0')).append(vo.getMessageHeader().getBusiCode())
                .append("12345678901234568888#").append(xmlMessage);

        SocketClient client = new SocketClient();

        //TODO 发送报文 byte[] resp = client.sendMessage(buffer.toString().getBytes("UTF-8"));

        return client.sendTestMessage(buffer.toString());
    }

    /* (non-Javadoc)
     * @see com.leadmind.bbsp.integration.send.service.ICoreService#commonAccount(com.leadmind.bbsp.integration.send.vo.commonaccount.CommonAccountRequestVO)
     */
    @Override
    public CommonAccountResponseVO commonAccount(CommonAccountRequestVO req)
            throws ServiceException {
        req.getMessageHeader().setBusiCode(DealCode.COMMON_ACCOUNT);
        return (CommonAccountResponseVO) sendMessage(req);
    }

}
