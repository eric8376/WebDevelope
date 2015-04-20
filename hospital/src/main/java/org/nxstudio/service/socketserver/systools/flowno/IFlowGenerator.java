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
 * 流水号生成器接口
 *
 * @author 夏兵 (mailto:xiabing@leadmind.com.cn)
 */
public interface IFlowGenerator {
    /**
     * 生成流水号
     *
     * @return 流水号
     */
    public String getFlowNo();

    /**
     * 生成流水号
     *
     * @param key 键值
     * @return 流水号
     */
    public String getFlowNo(String key);

    /**
     * 生成流水号
     *
     * @param key 键值
     * @param size 序列号长度
     * @return 流水号
     */
    public String getFlowNo(String key, int size);
}