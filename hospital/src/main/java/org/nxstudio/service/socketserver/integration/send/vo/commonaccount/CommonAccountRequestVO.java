/**
 * CommonAccountRequestVO.java
 * 版权声明 力铭科技版权所有
 * 项目组：广州农村商业银行电子商业汇票系统
 * 修订记录：
 * 1)创建者：林邵诚
 * 时 间：Aug 11, 2010
 * 描 述：创建
 */
package org.nxstudio.service.socketserver.integration.send.vo.commonaccount;

import org.nxstudio.service.socketserver.integration.send.vo.CommonMessageVO;

import java.util.ArrayList;
import java.util.List;


/**
 * <pre>功能描述: 封装通用记账信息</pre>
 * <br>JDK版本：1.5+
 * @author 林邵诚
 * @version 1.0.1 创建于 Aug 11, 2010
 * @since 1.0
 * 修改日期：Aug 11, 2010 林邵诚
 */
public class CommonAccountRequestVO extends CommonMessageVO {

    /**
     * UID
     */
    private static final long serialVersionUID = -7964487562266276898L;

    /**
     * 总金额
     */
    private Double ZONGJE = null;

    /**
     * 总笔数
     */
    private Integer ZBISHU = null;

    /**
     * 延迟记账标识，默认为1：延迟记账，批处理
     * <pre>
     * 0:实时记账
     * 1:延迟记账,批处理
     * 2:延迟记账，守护进程
     * </pre>
     */
    private String JIZBZZ = null;

    /**
     * 传输方式
     * <pre>
     * 0-	报文方式（默认）
     * 1-	文件方式
     * </pre>
     */
    private String DIOYFS = null;

    /**
     *
     * <pre>
     * 0-不清算
     * 1-批量清算（默认）
     * 2-实时清算
     * </pre>
     */
    private String QNGSFS = null;

    /**
     * 头寸检查标志
     * <pre>
     * 0-	不检查
     * 1-	检查
     * </pre>
     */
    private String SHFOBZ = null;

    /**
     * 渠道标志
     */
    private String JIOYQD = null;

    /**
     * 交易流水号
     */
    private String YEWLSH = null;

    /**
     * 文件名称
     * <pre>
     *  传输方式为文件时，必输
     * </pre>
     */
    private String WENJMC = null;

    /**
     * 摘要代码
     */
    private String ZHYODM = null;

    /**
     * 分录信息
     */
    private List<AccountItemVO> items = new ArrayList<AccountItemVO>();

    @Override
    public String validate() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Object getMaindata() {
        return null;
    }

    /**
     * @return the zONGJE 总金额
     */
    public Double getZONGJE() {
        return ZONGJE;
    }

    /**
     * @param zongje 总金额 the zONGJE to set
     */
    public void setZONGJE(Double zongje) {
        ZONGJE = zongje;
    }

    /**
     * @return the zBISHU 总笔数
     */
    public Integer getZBISHU() {
        return ZBISHU;
    }

    /**
     * @param zbishu 总笔数 the zBISHU to set
     */
    public void setZBISHU(Integer zbishu) {
        ZBISHU = zbishu;
    }

    /**
     * @return the jIZBZZ 延迟记账标识
     */
    public String getJIZBZZ() {
        return JIZBZZ;
    }

    /**
     * @param jizbzz 延迟记账标识 the jIZBZZ to set
     */
    public void setJIZBZZ(String jizbzz) {
        JIZBZZ = jizbzz;
    }

    /**
     * @return the dIOYFS 传输方式
     */
    public String getDIOYFS() {
        return DIOYFS;
    }

    /**
     * @param dioyfs 传输方式 the dIOYFS to set
     */
    public void setDIOYFS(String dioyfs) {
        DIOYFS = dioyfs;
    }

    /**
     * @return the qNGSFS 清算方式
     */
    public String getQNGSFS() {
        return QNGSFS;
    }

    /**
     * @param qngsfs 清算方式 the qNGSFS to set
     */
    public void setQNGSFS(String qngsfs) {
        QNGSFS = qngsfs;
    }

    /**
     * @return the sHFOBZ 头寸检查标志
     */
    public String getSHFOBZ() {
        return SHFOBZ;
    }

    /**
     * @param shfobz 头寸检查标志 the sHFOBZ to set
     */
    public void setSHFOBZ(String shfobz) {
        SHFOBZ = shfobz;
    }

    /**
     * @return the jIOYQD 渠道标志
     */
    public String getJIOYQD() {
        return JIOYQD;
    }

    /**
     * @param jioyqd 渠道标志 the jIOYQD to set
     */
    public void setJIOYQD(String jioyqd) {
        JIOYQD = jioyqd;
    }

    /**
     * @return the yEWLSH 交易流水号
     */
    public String getYEWLSH() {
        return YEWLSH;
    }

    /**
     * @param yewlsh 交易流水号 the yEWLSH to set
     */
    public void setYEWLSH(String yewlsh) {
        YEWLSH = yewlsh;
    }

    /**
     * @return the wENJMC 文件名称
     */
    public String getWENJMC() {
        return WENJMC;
    }

    /**
     * @param wenjmc 文件名称 the wENJMC to set
     */
    public void setWENJMC(String wenjmc) {
        WENJMC = wenjmc;
    }

    /**
     * @return the zHYODM 摘要代码
     */
    public String getZHYODM() {
        return ZHYODM;
    }

    /**
     * @param zhyodm 摘要代码 the zHYODM to set
     */
    public void setZHYODM(String zhyodm) {
        ZHYODM = zhyodm;
    }

    /**
     * @return the items 分录信息
     */
    public List<AccountItemVO> getItems() {
        return items;
    }

    /**
     * @param items 分录信息 the items to set
     */
    public void setItems(List<AccountItemVO> items) {
        this.items = items;
    }

}
