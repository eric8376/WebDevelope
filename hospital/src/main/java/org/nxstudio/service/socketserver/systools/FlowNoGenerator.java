/**
 * ****************************************************************************
 * Copyright (c) 2003-2008 leadmind Technologies, Ltd.
 * All rights reserved.
 * <p/>
 * Created on Oct 30, 2008
 * *****************************************************************************
 */

package org.nxstudio.service.socketserver.systools;


import org.nxstudio.service.socketserver.restools.SourceTemplate;
import org.nxstudio.service.socketserver.systools.flowno.IFlowGenerator;

public class FlowNoGenerator {
    public static final String KEY_ACCOUNT = "AC"; // 记账前台流水号
    public static final String KEY_BACK_ACCOUNT = "BAC"; // 记账后台流水号
    public static final String KEY_TRUST = "TR"; // 额度前台流水号
    public static final String KEY_ACCT_RECORD = "ACL"; // 记账分录流水
    public static final String KEY_IMPAWN = "IM"; // 质押流水
    public static final String KEY_UNIMPAWN = "UIM"; // 解质押流水
    /**
     * 额度管理前台流水号
     */
    public static final String KEY_CREDIT = "CR";

    /**
     * 生成记账前台流水号
     *
     * @return 记账前台流水号
     */
    public static String getAccountFlowNo() {
        return getGenerator().getFlowNo(KEY_ACCOUNT);
    }

    /**
     * 生成记账后台流水号
     *
     * @return 记账后台流水号
     */
    public static String getAccountBackFlowNo() {
        return getGenerator().getFlowNo(KEY_BACK_ACCOUNT);
    }

    /**
     * 生成额度前台流水号
     *
     * @return 额度前台流水号
     */
    public static String getTrustFlowNo() {
        return getGenerator().getFlowNo(KEY_TRUST);
    }

    /**
     * 生成流水号
     *
     * @return 流水号
     */
    public static String getFlowNo() {
        return getGenerator().getFlowNo();
    }

    /**
     * 生成流水号
     *
     * @param key 键值
     * @return 流水号
     */
    public static String getFlowNo(String key) {
        return getGenerator().getFlowNo(key);
    }

    /**
     * 生成流水号
     *
     * @param key 键值
     * @param size 序列号长度
     * @return 流水号
     */
    public static String getFlowNo(String key, int size) {
        return getGenerator().getFlowNo(key, size);
    }

    private static final String Flow_Generator = "FlowGenerator";

    public static IFlowGenerator getGenerator() {
        return (IFlowGenerator) SourceTemplate.getSpringContextInstance().getBean(Flow_Generator);
    }
}