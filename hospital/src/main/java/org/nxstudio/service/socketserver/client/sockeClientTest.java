package org.nxstudio.service.socketserver.client;

import java.io.*;
import java.net.Socket;

/**
 * Created by 黄琦鸿 on 2014/4/24.
 */
public class sockeClientTest {
    public static void main(String[] args) throws IOException {
        String str = "test  <?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
                "<msg>" +
                "<comm_head>" +
                "<ver_no>6225087698761980</ver_no>" +
                "</comm_head>" +
                "<main_data>" +
                "<request_type>100</request_type>" +
                "<name>黄琦鸿</name>" +
                "<age>25</age>" +
                "<sex>25</sex>" +
                "<Score>" +
                "<subject>1</subject>" +
                "<score>1</score>" +
                "</Score>" +
                "<Score>" +
                "<subject>2</subject>" +
                "<score>2</score>" +
                "</Score>" +
                "</main_data>" +
                "</msg>";
        Socket s = new Socket("127.0.0.1", 8282);
        OutputStream os = s.getOutputStream();
        //向服务端发送内容
        os.write(str.getBytes("UTF-8"));
        os.flush();

        //取回服务端返回的内容
        InputStream is = s.getInputStream();
        BufferedReader isr = new BufferedReader(new InputStreamReader(is, "UTF-8"));
        String line = null;
        while ((line = isr.readLine()) != null) {
            System.out.println(line);
        }

        //释放资源
        isr.close();
        is.close();
        s.close();

    }
}
