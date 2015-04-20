/**
 * CommonHeader.java
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
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;


/**
 * <pre>功能描述: 公共报文头</pre>
 * <br>JDK版本：1.5+
 * @author 林邵诚
 * @version 1.0.1 创建于 Aug 11, 2010
 * @since 1.0
 * 修改日期：Aug 11, 2010 林邵诚
 */
@XmlRootElement(name = "comm_head")
@XmlAccessorType(XmlAccessType.FIELD)
public class CommonHeader implements Serializable {

    /**
     * UID
     */
    private static final long serialVersionUID = -2394248816482720141L;

    /**
     * 版本号
     * <pre>
     * 备用
     * </pre>
     */
    private String ver_no = null;

    /**
     * 机构号
     */
    private String bank_id = null;

    /**
     * 发送方渠道代码
     * <pre>
     * 13-信贷系统
     * 15-电话银行
     * 17-网上银行
     * 24-国际结算
     * 23-大前置
     * 25-事后监督
     * </pre>
     */
    private String snd_chnl_no = null;

    /**
     * 接收方渠道代码
     * <pre>
     * 13-信贷系统
     * 15-电话银行
     * 17-网上银行
     * 24-国际结算
     * 23-大前置
     * 25-事后监督
     * </pre>
     */
    private String rcv_chnl_no = null;

    /**
     * 外部交易码
     * <pre>
     * 同样的报文代码对于不同的渠道应分配不同的外部报文类别码，根据这个来确定附加域的特殊处理。
     * 如无特殊要求则不填，若有特殊要求，则填“特殊处理代码
     * </pre>
     */
    private String ext_txn_no = null;

    /**
     * 渠道日期
     * <pre>
     * 	内接系统的日期，日期格式为:yyyyMMdd
     * </pre>
     */
    private String chnl_dt = null;

    /**
     * 主机日期
     * <pre>
     * 内接系统的日期，日期格式为:yyyyMMdd
     * </pre>
     */
    private String host_dt = null;

    /**
     * 渠道时间
     * <pre>
     * 	内接系统的时间，格式为:hhmmss
     * </pre>
     */
    private String chnl_tm = null;

    /**
     * 主机时间
     * <pre>
     * 	内接系统的时间，格式为:hhmmss
     * </pre>
     */
    private String host_tm = null;

    /**
     * 渠道流水号
     * <pre>
     * 内接系统的流水号，每笔交易每天唯一
     * </pre>
     */
    private String chnl_seq = null;

    /**
     * 主机流水号
     * <pre>
     * 后台回应的流水号，每笔交易每天唯一
     * </pre>
     */
    private String host_seq = null;

    /**
     * 返回码
     * <pre>
     * 	SUCCESS代表成功
     * </pre>
     */
    private String rsp_no = null;

    /**
     * 返回信息
     * <pre>
     * 	中文信息
     * </pre>
     */
    private String rsp_msg = null;

    /**
     * 交易编号
     */
    private String busiCode = null;

    /**
     * @return the ver_no
     */
    public String getVer_no() {
        return ver_no;
    }

    /**
     * @param ver_no the ver_no to set
     */
    public void setVer_no(String ver_no) {
        this.ver_no = ver_no;
    }

    /**
     * @return the bank_id
     */
    public String getBank_id() {
        return bank_id;
    }

    /**
     * @param bank_id the bank_id to set
     */
    public void setBank_id(String bank_id) {
        this.bank_id = bank_id;
    }

    /**
     * @return the snd_chnl_no
     */
    public String getSnd_chnl_no() {
        return snd_chnl_no;
    }

    /**
     * @param snd_chnl_no the snd_chnl_no to set
     */
    public void setSnd_chnl_no(String snd_chnl_no) {
        this.snd_chnl_no = snd_chnl_no;
    }

    /**
     * @return the rcv_chnl_no
     */
    public String getRcv_chnl_no() {
        return rcv_chnl_no;
    }

    /**
     * @param rcv_chnl_no the rcv_chnl_no to set
     */
    public void setRcv_chnl_no(String rcv_chnl_no) {
        this.rcv_chnl_no = rcv_chnl_no;
    }

    /**
     * @return the ext_txn_no
     */
    public String getExt_txn_no() {
        return ext_txn_no;
    }

    /**
     * @param ext_txn_no the ext_txn_no to set
     */
    public void setExt_txn_no(String ext_txn_no) {
        this.ext_txn_no = ext_txn_no;
    }

    /**
     * @return the chnl_dt
     */
    public String getChnl_dt() {
        return chnl_dt;
    }

    /**
     * @param chnl_dt the chnl_dt to set
     */
    public void setChnl_dt(String chnl_dt) {
        this.chnl_dt = chnl_dt;
    }

    /**
     * @return the host_dt
     */
    public String getHost_dt() {
        return host_dt;
    }

    /**
     * @param host_dt the host_dt to set
     */
    public void setHost_dt(String host_dt) {
        this.host_dt = host_dt;
    }

    /**
     * @return the chnl_tm
     */
    public String getChnl_tm() {
        return chnl_tm;
    }

    /**
     * @param chnl_tm the chnl_tm to set
     */
    public void setChnl_tm(String chnl_tm) {
        this.chnl_tm = chnl_tm;
    }

    /**
     * @return the host_tm
     */
    public String getHost_tm() {
        return host_tm;
    }

    /**
     * @param host_tm the host_tm to set
     */
    public void setHost_tm(String host_tm) {
        this.host_tm = host_tm;
    }

    /**
     * @return the chnl_seq
     */
    public String getChnl_seq() {
        return chnl_seq;
    }

    /**
     * @param chnl_seq the chnl_seq to set
     */
    public void setChnl_seq(String chnl_seq) {
        this.chnl_seq = chnl_seq;
    }

    /**
     * @return the host_seq
     */
    public String getHost_seq() {
        return host_seq;
    }

    /**
     * @param host_seq the host_seq to set
     */
    public void setHost_seq(String host_seq) {
        this.host_seq = host_seq;
    }

    /**
     * @return the rsp_no
     */
    public String getRsp_no() {
        return rsp_no;
    }

    /**
     * @param rsp_no the rsp_no to set
     */
    public void setRsp_no(String rsp_no) {
        this.rsp_no = rsp_no;
    }

    /**
     * @return the rsp_msg
     */
    public String getRsp_msg() {
        return rsp_msg;
    }

    /**
     * @param rsp_msg the rsp_msg to set
     */
    public void setRsp_msg(String rsp_msg) {
        this.rsp_msg = rsp_msg;
    }

    /**
     * @return the busiCode
     */
    public String getBusiCode() {
        return busiCode;
    }

    /**
     * @param busiCode the busiCode to set
     */
    public void setBusiCode(String busiCode) {
        this.busiCode = busiCode;
    }

}
