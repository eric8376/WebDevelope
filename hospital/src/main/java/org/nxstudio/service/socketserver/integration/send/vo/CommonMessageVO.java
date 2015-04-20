/**
 * CommonMessageVO.java
 * 版权声明 力铭科技版权所有
 * 项目组：广州农村商业银行电子商业汇票系统
 * 修订记录：
 * 1)创建者：林邵诚
 * 时 间：Aug 11, 2010
 * 描 述：创建
 */
package org.nxstudio.service.socketserver.integration.send.vo;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import java.io.Serializable;


/**
 * <pre>功能描述: </pre>
 * <br>JDK版本：1.5+
 * @author 林邵诚
 * @version 1.0.1 创建于 Aug 11, 2010
 * @since 1.0
 * 修改日期：Aug 11, 2010 林邵诚
 */

@XmlAccessorType(XmlAccessType.FIELD)
public abstract class CommonMessageVO implements Serializable {

    /**
     * UID
     */
    private static final long serialVersionUID = 7201876896209737237L;

    /**
     * 公共报文头
     */
    @XmlElement(name = "comm_head")
    private CommonHeader messageHeader /*= new CommonHeader()*/;

    /**
     * @return the messageHeader
     */

    public CommonHeader getMessageHeader() {
        return messageHeader;
    }

    /**
     * @param messageHeader the messageHeader to set
     */
    public void setMessageHeader(CommonHeader messageHeader) {
        this.messageHeader = messageHeader;
    }

    /**
     * 功能说明：判断交易是否成功
     * @return 通过报文头的返回码来判断，返回码为SUCCESS时表示交易成功
     * @author: 林邵诚
     * @version: 1.0.1
     * 创建于Aug 11, 2010
     */
    public boolean isSuccess() {
        return "SUCCESS".equals(messageHeader.getRsp_no());
    }

    /**
     * 功能说明：校验输入项是否符合接口规范，由各接口自行实现
     * @return 校验通过返回null，否则返回校验失败信息
     * @author: 林邵诚
     * @version: 1.0.1
     * 创建于Aug 11, 2010
     */
    public abstract String validate();

    public abstract Object getMaindata();
}
