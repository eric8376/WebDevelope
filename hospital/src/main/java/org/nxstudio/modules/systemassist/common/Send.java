package org.nxstudio.modules.systemassist.common;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * @author Administrator
 */
public class Send {

    private static Logger logger = LoggerFactory.getLogger(Send.class);

    public static String SMS(String postData, String postUrl) {
        try {
            // 发送POST请求
            URL url = new URL(postUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            conn.setRequestProperty("Connection", "Keep-Alive");
            conn.setUseCaches(false);
            conn.setDoOutput(true);

            byte[] data = postData.getBytes("UTF-8");
            conn.setRequestProperty("Content-Length", "" + data.length);
            //OutputStreamWriter out = new OutputStreamWriter(conn.getOutputStream(), );
            conn.getOutputStream().write(data);
            conn.getOutputStream().flush();
            conn.getOutputStream().close();

            // 获取响应状态
            if (conn.getResponseCode() != HttpURLConnection.HTTP_OK) {
                logger.error("send sms error, connect failed!");
                return "";
            }
            // 获取响应内容体
            String line, result = "";
            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));
            while ((line = in.readLine()) != null) {
                result += line + "\n";
            }
            IOUtils.closeQuietly(in);
            return result;
        } catch (IOException e) {
            logger.error("send sms error", e);
        }
        return "";
    }

//	public static void main(String[] args) throws UnsupportedEncodingException {
//		// String PostData =
//		// "sname=dlxmrwy0&spwd=RwYabc123&scorpid=&sprdid=1012818&sdst=18659255016&smsg=replication_error" +
//		// java.net.URLEncoder.encode("黄哥发的短信，收到了回qq信息【任我游】", "utf-8");
//		// // out.println(PostData);
//		// String ret = Send.SMS(PostData, "http://cf.lmobile.cn/submitdata/Service.asmx/g_Submit");
//		// System.out.println(ret);
//
//		System.out.println(java.net.URLEncoder.encode("【芝麻游】", "utf-8"));
//	}
}
