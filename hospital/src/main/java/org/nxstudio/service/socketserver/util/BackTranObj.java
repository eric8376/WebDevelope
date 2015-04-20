package org.nxstudio.service.socketserver.util;

import java.io.Serializable;
import java.util.HashMap;

/**
 * @author Admin
 *         <p/>
 *         TODO To change the template for this generated type comment go to Window -
 *         Preferences - Java - Code Style - Code Templates
 */
public class BackTranObj implements Serializable {

    private StringBuffer logs = new StringBuffer();

    private Object obj;// 返回对象当

    private String busi_code;// 交易码

    private int logClick = 0;// 添加log的次数

    private String brch_id_core;// 后台机构号

    private boolean isPrintLog = true;// 日志开关

    private String oper_id;// 柜员编号

    private String user_id;// 柜员号

    private String user_name;// 柜员名

    private String deal_oper; // 复核记账柜员ID

    private String oper; // 授权柜员ID

    private String oper1; // 授权柜员ID2

    private String errorCode;// 没有 错误

    private String noticeMsg;// 由配置文件指定

    private String errormsg; // 错误信息

    private String brch_id;// 机构编号号

    private String brch_no;// 内部机构号

    private String brch_name;// 机构名称

    private String flow_no;// 前台记帐流水号

    private String oper_level;// 柜员等级

    private String terminal_no;// 终端号

    private String bufl_no;// 票据系统交易流水主键

    private String cust_id;

    private String prvo_id;

    private String resc_id; // 托收批次id add wm

    public String getResc_id() {
        return resc_id;
    }

    public void setResc_id(String resc_id) {
        this.resc_id = resc_id;
    }

    public String getPrvo_id() {
        return prvo_id;
    }

    public void setPrvo_id(String prvo_id) {
        this.prvo_id = prvo_id;
    }

    public String getCust_id() {
        return cust_id;
    }

    public void setCust_id(String cust_id) {
        this.cust_id = cust_id;
    }

    public String getBufl_no() {
        return bufl_no;
    }

    public void setBufl_no(String bufl_no) {
        this.bufl_no = bufl_no;
    }

    public String getFlow_no() {
        return flow_no;
    }

    public void setFlow_no(String flow_no) {
        this.flow_no = flow_no;
    }

    public String getBrch_no() {
        return brch_no;
    }

    public void setBrch_no(String brch_no) {
        this.brch_no = brch_no;
    }

    public String getBrch_id() {
        return brch_id;
    }

    public void setBrch_id(String brch_id) {
        this.brch_id = brch_id;
    }

    /**
     * 用户记帐传入相关判断辅助参数的MAP*
     */
    private HashMap subMp = new HashMap();

    public HashMap getSubMp() {
        return subMp;
    }

    public void setSubMp(HashMap subMp) {
        this.subMp = subMp;
    }

    /**
     * @return Returns the errorCode.
     */
    public String getErrorCode() {
        return errorCode;
    }

    /**
     * @param errorCode The errorCode to set.
     */
    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    /**
     * @return Returns the errormsg.
     */
    public String getErrormsg() {
        return errormsg;
    }

    /**
     * @param errormsg The errormsg to set.
     */
    public void setErrormsg(String errormsg) {
        this.errormsg = errormsg;
    }

    /**
     * @return Returns the noticeMsg.
     */
    public String getNoticeMsg() {
        return noticeMsg;
    }

    /**
     * @param noticeMsg The noticeMsg to set.
     */
    public void setNoticeMsg(String noticeMsg) {
        this.noticeMsg = noticeMsg;
    }

    /**
     * @return Returns the busi_code.
     */
    public String getBusi_code() {
        return busi_code;
    }

    /**
     * @param busi_code The busi_code to set.
     */
    public void setBusi_code(String busi_code) {
        this.busi_code = busi_code;
    }

    public String getBrch_id_core() {
        return brch_id_core;
    }

    public void setBrch_id_core(String brch_id_core) {
        this.brch_id_core = brch_id_core;
    }

    /**
     * @return Returns the obj.
     */
    public Object getObj() {
        return obj;
    }

    /**
     * @param obj The obj to set.
     */
    public void setObj(Object obj) {
        this.obj = obj;
    }

    public void addLog(String str) {
        if (isPrintLog) {
            if (logClick == 0) {
                logClick++;
                logs.append("\n\n\n");
                logs.append("****************************************[busi-start]*****交易号为:[" + busi_code + "]**************************************\n");

            }
            logs.append(str + "\n");
        }
    }

    public String printlog() {
        return logs.toString();
    }

    public void notneedback() {
        obj = null;
    }

    // *********************************************************************************

    private String clineNoticeLevel;

    /**
     * @return Returns the clineNoticeLevel.
     */
    public String getClineNoticeLevel() {
        return clineNoticeLevel;
    }

    /**
     * @param clineNoticeLevel The clineNoticeLevel to set.
     */
    public void setClineNoticeLevel(String clineNoticeLevel) {
        this.clineNoticeLevel = clineNoticeLevel;
    }

    public String getOper_id() {
        return oper_id;
    }

    public void setOper_id(String oper_id) {
        this.oper_id = oper_id;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getBrch_name() {
        return brch_name;
    }

    public void setBrch_name(String brch_name) {
        this.brch_name = brch_name;
    }

    public boolean isPrintLog() {
        return isPrintLog;
    }

    public void setPrintLog(boolean isPrintLog) {
        this.isPrintLog = isPrintLog;
    }

    public int getLogClick() {
        return logClick;
    }

    public void setLogClick(int logClick) {
        this.logClick = logClick;
    }

    public StringBuffer getLogs() {
        return logs;
    }

    public void setLogs(StringBuffer logs) {
        this.logs = logs;
    }

    public String getOper_level() {
        return oper_level;
    }

    public void setOper_level(String oper_level) {
        this.oper_level = oper_level;
    }

    public String getTerminal_no() {
        return terminal_no;
    }

    public void setTerminal_no(String terminal_no) {
        this.terminal_no = terminal_no;
    }

    public String getOper() {
        return oper;
    }

    public void setOper(String oper) {
        this.oper = oper;
    }

    public String getOper1() {
        return oper1;
    }

    public void setOper1(String oper1) {
        this.oper1 = oper1;
    }

    public String getDeal_oper() {
        return deal_oper;
    }

    public void setDeal_oper(String deal_oper) {
        this.deal_oper = deal_oper;
    }

}
