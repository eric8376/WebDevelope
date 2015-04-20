/**
 * ****************************************************************************
 * Copyright (c) 2003-2008 leadmind Technologies, Ltd.
 * All rights reserved.
 * <p/>
 * Created on Nov 26, 2008
 * *****************************************************************************
 */

package org.nxstudio.service.socketserver.systools.flowno;

/**
 * 民生银行流水器实现类
 *
 * @author 夏兵 (mailto:xiabing@leadmind.com.cn)
 */
public class CmbcFlowGenerator implements IFlowGenerator {
    private String sysNo = null;
    private String clusterNo = null;

    public String getFlowNo() {
        return FlowNoUtil.getTimeFlowNo(sysNo + clusterNo, 6);
    }

    public String getFlowNo(String key) {
        return FlowNoUtil.getTimeFlowNo(sysNo + clusterNo, 6);
    }

    public String getFlowNo(String key, int size) {
        return FlowNoUtil.getTimeFlowNo(sysNo + clusterNo, 6);
    }

    public String getSysNo() {
        return sysNo;
    }

    public void setSysNo(String sysNo) {
        this.sysNo = sysNo;
    }

    public String getClusterNo() {
        return clusterNo;
    }

    public void setClusterNo(String clusterNo) {
        this.clusterNo = clusterNo;
    }
}