/**
 * CreditControlResponseVO.java
 * 版权声明 力铭科技版权所有
 * 项目组：广州农村商业银行电子商业汇票系统
 * 修订记录：
 * 1)创建者：林邵诚
 * 时 间：Aug 11, 2010
 * 描 述：创建
 */
package org.nxstudio.service.socketserver.integration.send.vo.creditcontrol;


import org.nxstudio.service.socketserver.integration.send.vo.CommonMessageVO;

/**
 * <pre>功能描述: </pre>
 * <br>JDK版本：1.5+
 * @author 林邵诚
 * @version 1.0.1 创建于 Aug 11, 2010
 * @since 1.0
 * 修改日期：Aug 11, 2010 林邵诚
 */
public class CreditControlResponseVO extends CommonMessageVO {

    /**
     * UID
     */
    private static final long serialVersionUID = 5819329700756960708L;

    /**
     * 操作标识
     * <pre>
     * 0-使用额度
     * 1-归还额度
     * 2-额度查询
     * </pre>
     */
    private String CAOZBZ = null;

    /**
     * 交易金额
     * <pre>
     * 	操作标志为2时，返回单笔有效额度。
     * </pre>
     */
    private Double JIOYJE = null;

    /**
     * 可用额度金额
     */
    private Double KEYEDU = null;

    /**
     * 备注信息
     */
    private String BEIZHU = null;

    /* (non-Javadoc)
     * @see com.leadmind.bbsp.integration.send.vo.CommonMessageVO#validate()
     */
    @Override
    public String validate() {
        return null;
    }

    @Override
    public Object getMaindata() {
        return null;
    }

    /**
     * @return the cAOZBZ
     */
    public String getCAOZBZ() {
        return CAOZBZ;
    }

    /**
     * @param caozbz the cAOZBZ to set
     */
    public void setCAOZBZ(String caozbz) {
        CAOZBZ = caozbz;
    }

    /**
     * @return the jIOYJE
     */
    public Double getJIOYJE() {
        return JIOYJE;
    }

    /**
     * @param jioyje the jIOYJE to set
     */
    public void setJIOYJE(Double jioyje) {
        JIOYJE = jioyje;
    }

    /**
     * @return the kEYEDU
     */
    public Double getKEYEDU() {
        return KEYEDU;
    }

    /**
     * @param keyedu the kEYEDU to set
     */
    public void setKEYEDU(Double keyedu) {
        KEYEDU = keyedu;
    }

    /**
     * @return the bEIZHU
     */
    public String getBEIZHU() {
        return BEIZHU;
    }

    /**
     * @param beizhu the bEIZHU to set
     */
    public void setBEIZHU(String beizhu) {
        BEIZHU = beizhu;
    }


}
