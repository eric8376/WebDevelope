package org.nxstudio.plugin.rtx;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Iterator;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【RTX服务】
 * 时间: 2013-06-10 下午4:36
 */
public class RTXServer {

    /**
     * 通过RTX HTTP服务发送通知
     *
     * @param host RTX服务器主机
     * @param port RTX服务器端口号
     * @param map  数据集合 目前数据key有(title|标题,msg|消息,receiver|接收者多人用,分隔)
     * @返回负2 出现异常
     * @返回负1 IP受限
     * @返回0 0 未知状态
     * @返回1 1正确发送
     */
    public int sendNotifyByHttp(String host, int port, Map map) {
        //未知状态
        int res = 0;

        String file = "/SendNotify.cgi?";
        try {
            //整合发送参数+到file
            Iterator keys = map.keySet().iterator();
            while (keys.hasNext()) {
                String key = (String) keys.next();
                String value = URLEncoder.encode((String) map.get(key), "gb2312");
                file += key + "=" + value;
                if (keys.hasNext()) {
                    file += "&";
                }
            }

            //拼凑url并发送
            URL url = new URL("http", host, port, file);

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            StringBuffer sb = new StringBuffer();
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            //读取返回
            String result = "";
            while ((result = br.readLine()) != null) {
                sb.append(result);
            }

            //-1 Ip受限
            result = sb.toString();
            Pattern pattern = Pattern.compile("IP");
            Matcher matcher = pattern.matcher(result);
            Pattern pattern2 = Pattern.compile("alert");
            Matcher matcher2 = pattern2.matcher(result);
            if (matcher.find()) {
                res = -1;
            }
            //1发送成功
            else if (matcher2.find()) {
                res = 1;
            }
        } catch (Exception e) {
            res = -2;
            e.printStackTrace();
        }

        return res;
    }

}
