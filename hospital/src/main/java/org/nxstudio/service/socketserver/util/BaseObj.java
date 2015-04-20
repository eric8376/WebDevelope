package org.nxstudio.service.socketserver.util;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.lang.reflect.Method;

public abstract class BaseObj {
    private static Log log = LogFactory.getLog(BaseObj.class);

    private String busi_code = "";

    private String requestDate = "";

    private String requestTime = "";

    private String system_flag = "";

    private String city_flag = "";

    private String busi_flow = "";

    private String errorMsg = "";

    private String returnCode = "000000";

    public String[] inArea = null;

    protected int[] inAreaLen = null;

    protected String[] inAreaType = null;

    protected String[] outArea = null;

    protected int[] outAreaLen = null;

    protected String[] outAreaType = null;

    public static int busi_code_length = 4;

    private int[] headAreaLen = {4, 8, 6, 1, 1, 14};

    private String[] headArea = {"busi_code", "requestDate", "requestTime", "system_flag", "city_flag", "busi_flow"};

    private String[] headAreaType = {"x", "9", "9", "9", "9", "x"};

    protected int[] speHeadAreaLen = null;

    protected String[] speHeadArea = null;

    protected String[] speHeadAreaType = null;

    // public BaseObj(String[] inArea,String[] inAreaType,int[] inAreaLen
    // ,String[] outArea,String[] outAreaType,int[] outAreaLen){
    // this.inArea=inArea;
    // this.inAreaType=inAreaType;
    // this.inAreaLen=inAreaLen;
    // this.outArea=outArea;
    // this.outAreaType=outAreaType;
    // this.outAreaLen=outAreaLen;
    // }

    public String getBusi_code() {
        return busi_code;
    }

    public void setBusi_code(String busi_code) {
        this.busi_code = busi_code;
    }

    public String getBusi_flow() {
        return busi_flow;
    }

    public void setBusi_flow(String busi_flow) {
        this.busi_flow = busi_flow;
    }

    public String getCity_flag() {
        return city_flag;
    }

    public void setCity_flag(String city_flag) {
        this.city_flag = city_flag;
    }

    public String getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(String requestDate) {
        this.requestDate = requestDate;
    }

    public String getRequestTime() {
        return requestTime;
    }

    public void setRequestTime(String requestTime) {
        this.requestTime = requestTime;
    }

    public String getSystem_flag() {
        return system_flag;
    }

    public void setSystem_flag(String system_flag) {
        this.system_flag = system_flag;
    }

    public abstract String[] getSpeHeadArea();

    public abstract void setSpeHeadArea(String[] speHeadArea);

    public abstract int[] getSpeHeadAreaLen();

    public abstract void setSpeHeadAreaLen(int[] speHeadAreaLen);

    public abstract String[] getSpeHeadAreaType();

    public abstract void setSpeHeadAreaType(String[] speHeadAreaType);

    public abstract String[] getInArea();

    public abstract void setInArea(String[] inArea);

    public abstract int[] getInAreaLen();

    public abstract void setInAreaLen(int[] inAreaLen);

    public abstract String[] getInAreaType();

    public abstract void setInAreaType(String[] inAreaType);

    public void setValues(String key, String value) throws Exception {
        String leader = key.substring(0, 1).toUpperCase();
        String content = key.substring(1);
        String methodName = "set" + leader + content;
        Class type[] = {String.class};
        Method runMethod = this.getClass().getMethod(methodName, type);
        Object t[] = {value};
        runMethod.invoke(this, t);
    }

    public String getValues(String key) throws Exception {
        String rs = "";
        String leader = key.substring(0, 1).toUpperCase();
        String content = key.substring(1, key.length());
        String methodName = "get" + leader + content;
        try {
            Method runMethod = this.getClass().getMethod(methodName, null);
            Object value = runMethod.invoke(this, new Class[0]);
            if (value == null) {
                rs = "";
            } else {
                rs = value.toString();
            }
        } catch (Exception e) {
            log.error("XXX", e);
            // e.printStackTrace();
            throw new Exception("错误的输出项" + key);
        }
        return rs;
    }

    public abstract int[] getOutAreaLen();

    public abstract void setOutAreaLen(int[] outAreaLen);

    public abstract String[] getOutAreaType();

    public abstract void setOutAreaType(String[] outAreaType);

    public int getHeadTotalLength() {
        int num = 0;
        for (int i = 0; i < headAreaLen.length; i++) {
            num = num + headAreaLen[i];
        }
        return num;
    }

    public abstract int getBusiTotalLength();

    public int[] getHeadAreaLen() {
        return headAreaLen;
    }

    public void setHeadAreaLen(int[] headAreaLen) {
        this.headAreaLen = headAreaLen;
    }

    public String[] getHeadAreaType() {
        return headAreaType;
    }

    public void setHeadAreaType(String[] headAreaType) {
        this.headAreaType = headAreaType;
    }

    public String[] getHeadArea() {
        return headArea;
    }

    public void setHeadArea(String[] headArea) {
        this.headArea = headArea;
    }

    public abstract String[] getOutArea();

    public abstract void setOutArea(String[] outArea);

    public String getErrorMsg() {
        return errorMsg;
    }

    public void setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
    }

    public String getReturnCode() {
        return returnCode;
    }

    public void setReturnCode(String returnCode) {
        this.returnCode = returnCode;
    }
}
