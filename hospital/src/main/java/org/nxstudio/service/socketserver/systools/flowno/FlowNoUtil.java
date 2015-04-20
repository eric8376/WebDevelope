/**
 * ****************************************************************************
 * Copyright (c) 2003-2008 leadmind Technologies, Ltd.
 * All rights reserved.
 * <p/>
 * Created on Nov 28, 2008
 * *****************************************************************************
 */


package org.nxstudio.service.socketserver.systools.flowno;

import java.util.Date;
import java.util.HashMap;

import org.nxstudio.service.socketserver.systools.DateTimeUtil;
import org.apache.commons.lang.StringUtils;


/**
 *
 * 流水号工具类
 *
 * @author 夏兵 (mailto:xiabing@leadmind.com.cn)
 */
public class FlowNoUtil {
    private static volatile HashMap map = new HashMap();

    /**
     * 生成流水号
     *
     * @param key 设定键值
     * @param size 设定序列号长度
     * @return 流水号
     */
    public static synchronized String getTimeFlowNo(String key, int size) {
        Object[] obj = (Object[]) map.get(key);
        String curTime = DateTimeUtil.getTime(new Date(), "yyyyMMddHHmmss");
        if (obj == null) {
            obj = new Object[2];
            obj[0] = curTime;
            obj[1] = new Long(1);
            map.put(key, obj);
        } else {
            if (curTime.compareTo((String) obj[0]) > 0) {
                obj[0] = curTime;
                obj[1] = new Long(1);
            } else {
                obj[1] = new Long(((Long) obj[1]).longValue() + 1);
            }
        }

        String flowNo = StringUtils.leftPad(obj[1].toString(), size, '0');
        if (flowNo.length() > size) {
            flowNo = flowNo.substring(flowNo.length() - size);
        }
        return key + obj[0] + flowNo;
    }
}