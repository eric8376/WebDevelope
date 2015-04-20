package org.nxstudio.service.socketserver.util;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class Constant {
    private static Log log = LogFactory.getLog(Constant.class);

    // 与核心通讯时的编码类型 ISO-8859-1/GBK/UTF-8
    private static String charsetName = "GBK";

    public static String getCharsetStr(byte[] str) {
        if (charsetName == null || charsetName.trim().equals("")) {
            return new String(str);
        } else {
            try {
                return new String(str, charsetName);
            } catch (Exception e) {
                log.error("XXX", e);
                return new String(str);
            }
        }
    }

    public static byte[] getByteArr(String str) {
        if (charsetName == null || charsetName.trim().equals("")) {
            return str.getBytes();
        } else {
            try {
                return str.getBytes(charsetName);
            } catch (Exception e) {
                log.error("XXX", e);
                return str.getBytes();
            }
        }
    }

}
