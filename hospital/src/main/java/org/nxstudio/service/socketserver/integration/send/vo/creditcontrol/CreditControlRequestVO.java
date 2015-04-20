/**
 * CreditControlRequestVO.java
 * 版权声明 力铭科技版权所有
 * 项目组：广州农村商业银行电子商业汇票系统
 * 修订记录：
 * 1)创建者：林邵诚
 * 时 间：Aug 11, 2010
 * 描 述：创建
 */
package org.nxstudio.service.socketserver.integration.send.vo.creditcontrol;

import org.nxstudio.service.socketserver.integration.send.vo.CommonMessageVO;
import org.apache.commons.lang.StringUtils;


/**
 * <pre>功能描述: 额度控制请求接口，该接口封装了额度占用/恢复/</pre>
 * <br>JDK版本：1.5+
 * @author 林邵诚
 * @version 1.0.1 创建于 Aug 11, 2010
 * @since 1.0
 * 修改日期：Aug 11, 2010 林邵诚
 */
public class CreditControlRequestVO extends CommonMessageVO {

    /**
     * UID
     */
    private static final long serialVersionUID = -4857799337363531833L;

    /**
     * 操作标记，必输
     * <pre>
     * 	0-使用额度
     *  1-归还额度
     *  2-查询额度
     * </pre>
     */
    private String CAOZBZ = null;

    /**
     * 票据借据号，必输
     */
    private String JIEJUH = null;

    /**
     * 借据币种，必输
     */
    private String JEJUBZ = null;

    /**
     * 交易金额，必输
     */
    private Double JIOYJE = null;

    /**
     * 摘要
     */
    private String ZHYONR = null;

    /**
     * 授信额度编号
     */
    private String SXEDBH = null;

    /**
     * 额度层，必输
     * <pre>
     * 	1-客户层（默认）
     *  2-产品组层
     *  3-产品层
     * </pre>
     */
    private String EDCENG = null;

    /**
     * 核心客户号，必输
     */
    private String KEHHAO = null;

    /**
     * 产品组编号
     */
    private String CHAZDM = null;

    /**
     * 产品号
     */
    private String CHAPDM = null;

    /**
     * 额度币种，必输
     */
    private String EDUBIZ = null;

    @Override
    public String validate() {
        if (StringUtils.isBlank(CAOZBZ)) {
            return "额度操作标记不能为空！";
        }
        if (StringUtils.isBlank(JIEJUH)) {
            return "票据借据号不能为空！";
        }
        if (StringUtils.isBlank(JEJUBZ)) {
            return "借据币种不能为空！";
        }
        if (JIOYJE == null || JIOYJE.doubleValue() <= 0) {
            return "交易金额[" + JIOYJE + "]值不合法！";
        }
        if (StringUtils.isBlank(EDCENG)) {
            return "额度层不能为空！";
        }
        if (StringUtils.isBlank(KEHHAO)) {
            return "核心客户号不能为空！";
        }
        if (StringUtils.isBlank(EDUBIZ)) {
            return "额度币种不能为空！";
        }
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
     * @return the jIEJUH
     */
    public String getJIEJUH() {
        return JIEJUH;
    }

    /**
     * @param jiejuh the jIEJUH to set
     */
    public void setJIEJUH(String jiejuh) {
        JIEJUH = jiejuh;
    }

    /**
     * @return the jEJUBZ
     */
    public String getJEJUBZ() {
        return JEJUBZ;
    }

    /**
     * @param jejubz the jEJUBZ to set
     */
    public void setJEJUBZ(String jejubz) {
        JEJUBZ = jejubz;
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
     * @return the zHYONR
     */
    public String getZHYONR() {
        return ZHYONR;
    }

    /**
     * @param zhyonr the zHYONR to set
     */
    public void setZHYONR(String zhyonr) {
        ZHYONR = zhyonr;
    }

    /**
     * @return the sXEDBH
     */
    public String getSXEDBH() {
        return SXEDBH;
    }

    /**
     * @param sxedbh the sXEDBH to set
     */
    public void setSXEDBH(String sxedbh) {
        SXEDBH = sxedbh;
    }

    /**
     * @return the eDCENG
     */
    public String getEDCENG() {
        return EDCENG;
    }

    /**
     * @param edceng the eDCENG to set
     */
    public void setEDCENG(String edceng) {
        EDCENG = edceng;
    }

    /**
     * @return the kEHHAO
     */
    public String getKEHHAO() {
        return KEHHAO;
    }

    /**
     * @param kehhao the kEHHAO to set
     */
    public void setKEHHAO(String kehhao) {
        KEHHAO = kehhao;
    }

    /**
     * @return the cHAZDM
     */
    public String getCHAZDM() {
        return CHAZDM;
    }

    /**
     * @param chazdm the cHAZDM to set
     */
    public void setCHAZDM(String chazdm) {
        CHAZDM = chazdm;
    }

    /**
     * @return the cHAPDM
     */
    public String getCHAPDM() {
        return CHAPDM;
    }

    /**
     * @param chapdm the cHAPDM to set
     */
    public void setCHAPDM(String chapdm) {
        CHAPDM = chapdm;
    }

    /**
     * @return the eDUBIZ
     */
    public String getEDUBIZ() {
        return EDUBIZ;
    }

    /**
     * @param edubiz the eDUBIZ to set
     */
    public void setEDUBIZ(String edubiz) {
        EDUBIZ = edubiz;
    }

}
