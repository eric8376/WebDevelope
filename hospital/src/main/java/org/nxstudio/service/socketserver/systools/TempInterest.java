package org.nxstudio.service.socketserver.systools;

import java.util.Date;


public class TempInterest {

    private Long fromId;//对映登记中心ID
    private Date startDate;//计息开始日
    private Date galeDate;//计息到期日
    private Long interestCalDays = new Long(0);//计息天数
    private Long postponeDays = new Long(0);//顺延天数
    private Double rate;//贴现利率
    private String rateType;//利率类型
    private Double payMoney = 0.00;//实付金额
    private Double discInterest = 0.00;//贴现付息金额
    private Double redeemInterest = 0.00;//赎回利息金额
    private Double interest = 0.00;//利息总额
    private String flagName;//试算结果
    private String flag = "1";//试算标志。1：为不一致。0：为一致。

    public String getFlagName() {
        return flagName;
    }

    public void setFlagName(String flagName) {
        this.flagName = flagName;
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    public Long getFromId() {
        return fromId;
    }

    public void setFromId(Long fromId) {
        this.fromId = fromId;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getGaleDate() {
        return galeDate;
    }

    public void setGaleDate(Date galeDate) {
        this.galeDate = galeDate;
    }

    public Long getInterestCalDays() {
        return interestCalDays;
    }

    public void setInterestCalDays(Long interestCalDays) {
        this.interestCalDays = interestCalDays;
    }

    public Long getPostponeDays() {
        return postponeDays;
    }

    public void setPostponeDays(Long postponeDays) {
        this.postponeDays = postponeDays;
    }

    public Double getRate() {
        return rate;
    }

    public void setRate(Double rate) {
        this.rate = rate;
    }

    public String getRateType() {
        return rateType;
    }

    public void setRateType(String rateType) {
        this.rateType = rateType;
    }

    public Double getPayMoney() {
        return payMoney;
    }

    public void setPayMoney(Double payMoney) {
        this.payMoney = payMoney;
    }

    public Double getInterest() {
        return interest;
    }

    public void setInterest(Double interest) {
        this.interest = interest;
    }

    public Double getRedeemInterest() {
        return redeemInterest;
    }

    public void setRedeemInterest(Double redeemInterest) {
        this.redeemInterest = redeemInterest;
    }

    public Double getDiscInterest() {
        return discInterest;
    }

    public void setDiscInterest(Double discInterest) {
        this.discInterest = discInterest;
    }


}
