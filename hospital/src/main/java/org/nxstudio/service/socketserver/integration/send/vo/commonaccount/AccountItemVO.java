/**
 * AccountItemVO.java
 * 版权声明 力铭科技版权所有
 * 项目组：广州农村商业银行电子商业汇票系统
 * 修订记录：
 * 1)创建者：林邵诚
 * 时 间：Aug 12, 2010
 * 描 述：创建
 */
package org.nxstudio.service.socketserver.integration.send.vo.commonaccount;

import java.io.Serializable;


/**
 * <pre>功能描述: 封装记账分录信息</pre>
 * <br>JDK版本：1.5+
 * @author 林邵诚
 * @version 1.0.1 创建于 Aug 12, 2010
 * @since 1.0
 * 修改日期：Aug 12, 2010 林邵诚
 */
public class AccountItemVO implements Serializable {

    /**
     * UID
     */
    private static final long serialVersionUID = -2595883530445622515L;

    /**
     * 业务序号
     */
    private String XUHAOO = null;

    /**
     * 账号类型
     */
    private String ZHHOLX = null;

    /**
     * 产品编号
     */
    private String CHAPBH = null;

    /**
     * 账号
     */
    private String ZHANGH = null;

    /**
     * 账户中文名
     */
    private String ZHUZWM = null;

    /**
     * 客户号
     */
    private String KEHHAO = null;

    /**
     * 借贷标记
     */
    private String JIEDBZ = null;

    /**
     * 交易金额
     */
    private Double JIOYJE = null;

    /**
     * 货币代号
     */
    private String HUOBDH = null;

    /**
     * 机构号
     */
    private String YNGYJG = null;

    /**
     * 业务代号
     */
    private String YEWUDH = null;

    /**
     * 业务分类
     */
    private String YEWUFL = null;

    /**
     * 钞汇标志
     */
    private String CHUIBZ = null;

    /**
     * @return the xUHAOO 业务序号
     */
    public String getXUHAOO() {
        return XUHAOO;
    }

    /**
     * @param xuhaoo 业务序号 the xUHAOO to set
     */
    public void setXUHAOO(String xuhaoo) {
        XUHAOO = xuhaoo;
    }

    /**
     * @return the zHHOLX 账号类型
     */
    public String getZHHOLX() {
        return ZHHOLX;
    }

    /**
     * @param zhholx 账号类型 the zHHOLX to set
     */
    public void setZHHOLX(String zhholx) {
        ZHHOLX = zhholx;
    }

    /**
     * @return the cHAPBH 产品编号
     */
    public String getCHAPBH() {
        return CHAPBH;
    }

    /**
     * @param chapbh 产品编号 the cHAPBH to set
     */
    public void setCHAPBH(String chapbh) {
        CHAPBH = chapbh;
    }

    /**
     * @return the zHANGH 账号
     */
    public String getZHANGH() {
        return ZHANGH;
    }

    /**
     * @param zhangh 账号 the zHANGH to set
     */
    public void setZHANGH(String zhangh) {
        ZHANGH = zhangh;
    }

    /**
     * @return the zHUZWM 账户中文名
     */
    public String getZHUZWM() {
        return ZHUZWM;
    }

    /**
     * @param zhuzwm 账户中文名 the zHUZWM to set
     */
    public void setZHUZWM(String zhuzwm) {
        ZHUZWM = zhuzwm;
    }

    /**
     * @return the kEHHAO 客户号
     */
    public String getKEHHAO() {
        return KEHHAO;
    }

    /**
     * @param kehhao 客户号 the kEHHAO to set
     */
    public void setKEHHAO(String kehhao) {
        KEHHAO = kehhao;
    }

    /**
     * @return the jIEDBZ 借贷标记
     */
    public String getJIEDBZ() {
        return JIEDBZ;
    }

    /**
     * @param jiedbz 借贷标记 the jIEDBZ to set
     */
    public void setJIEDBZ(String jiedbz) {
        JIEDBZ = jiedbz;
    }

    /**
     * @return the jIOYJE 交易金额
     */
    public Double getJIOYJE() {
        return JIOYJE;
    }

    /**
     * @param jioyje 交易金额 the jIOYJE to set
     */
    public void setJIOYJE(Double jioyje) {
        JIOYJE = jioyje;
    }

    /**
     * @return the hUOBDH 货币代号
     */
    public String getHUOBDH() {
        return HUOBDH;
    }

    /**
     * @param huobdh 货币代号 the hUOBDH to set
     */
    public void setHUOBDH(String huobdh) {
        HUOBDH = huobdh;
    }

    /**
     * @return the yNGYJG 机构号
     */
    public String getYNGYJG() {
        return YNGYJG;
    }

    /**
     * @param yngyjg 机构号 the yNGYJG to set
     */
    public void setYNGYJG(String yngyjg) {
        YNGYJG = yngyjg;
    }

    /**
     * @return the yEWUDH 业务代号
     */
    public String getYEWUDH() {
        return YEWUDH;
    }

    /**
     * @param yewudh 业务代号 the yEWUDH to set
     */
    public void setYEWUDH(String yewudh) {
        YEWUDH = yewudh;
    }

    /**
     * @return the yEWUFL 业务分类
     */
    public String getYEWUFL() {
        return YEWUFL;
    }

    /**
     * @param yewufl 业务分类 the yEWUFL to set
     */
    public void setYEWUFL(String yewufl) {
        YEWUFL = yewufl;
    }

    /**
     * @return the cHUIBZ 钞汇标志
     */
    public String getCHUIBZ() {
        return CHUIBZ;
    }

    /**
     * @param chuibz 钞汇标志 the cHUIBZ to set
     */
    public void setCHUIBZ(String chuibz) {
        CHUIBZ = chuibz;
    }

}
