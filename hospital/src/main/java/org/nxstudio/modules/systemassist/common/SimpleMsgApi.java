/**
 * @(#)SimpleMsgApi.java 2014-3-27
 * <p/>
 * Copyright 2000-2014 by RenWoYou Corporation.
 * <p/>
 * All rights reserved.
 * <p/>
 * This software is the confidential and proprietary information of RenWoYou Corporation
 * ("Confidential Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with
 * RenWoYou.
 */

package org.nxstudio.modules.systemassist.common;

import org.apache.commons.lang3.StringUtils;
import org.nxstudio.util.properties.PropertiesFactory;
import org.nxstudio.util.properties.PropertiesFile;
import org.nxstudio.util.properties.PropertiesHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

/**
 * @author Zhiwei HUANG
 * @date 2014-3-27
 * @version $Revision$
 */
@Component
public class SimpleMsgApi {

    private static Logger logger = LoggerFactory.getLogger(SimpleMsgApi.class);
    private static PropertiesHelper propertiesHelper = PropertiesFactory.getPropertiesHelper(PropertiesFile.APP);


    public static MsgResult sendSms(String mobile, String msg) {
        String sname = propertiesHelper.getValue("lmobile.sname");
        String spwd = propertiesHelper.getValue("lmobile.spwd");
        String sprdid = propertiesHelper.getValue("lmobile.sprdid");
        String PostData = null;

        try {
            PostData = "sname=" + sname + "&spwd=" + spwd + "&scorpid=&sprdid=" + sprdid + "&sdst=" + mobile + "&smsg=" + URLEncoder.encode(msg, "utf-8");
        } catch (UnsupportedEncodingException e) {
            logger.error("send sms, encode error", e);
            return new MsgResult("-1", "编码错误");
        }
        String ret = Send.SMS(PostData, "http://cf.lmobile.cn/submitdata/Service.asmx/g_Submit");
        String state = StringUtils.substringBetween(ret, "<State>", "</State>");
        String msgState = StringUtils.substringBetween(ret, "<MsgState>", "</MsgState>");
        logger.info("send sms, mobile: {}, content: {}, state: {}, msg: {}", new Object[]{mobile, msg, state, msgState});
        return new MsgResult(state, msgState);
    }
}
