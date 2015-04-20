/**
 * SocketClient.java
 * 版权声明 力铭科技版权所有
 * 项目组：广州农村商业银行电子商业汇票系统
 * 修订记录：
 * 1)创建者：林邵诚
 * 时 间：Aug 11, 2010
 * 描 述：创建
 */
package org.nxstudio.service.socketserver.integration.send.tool;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.Serializable;
import java.io.StringReader;
import java.io.UnsupportedEncodingException;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Properties;

import org.nxstudio.service.socketserver.integration.send.vo.CommonMessageVO;
import org.nxstudio.service.socketserver.integration.util.XMLUtil;
import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.apache.log4j.Logger;
import org.hibernate.service.spi.ServiceException;
import org.springframework.util.ResourceUtils;
import org.xml.sax.SAXException;


/**
 * <pre>功能描述: </pre>
 * <br>JDK版本：1.5+
 * @author 林邵诚
 * @version 1.0.1 创建于 Aug 11, 2010
 * @since 1.0
 * 修改日期：Aug 11, 2010 林邵诚
 */
public class SocketClient implements Serializable {

    /**
     * UID
     */
    private static final long serialVersionUID = 2935253885891192074L;

    /**
     * 日志记录器
     */
    private static final Logger logger = Logger.getLogger(SocketClient.class);

    /**
     * 配置信息
     */
    private static Properties config = new Properties();

    /**
     * 配置文件路径信息
     */
    private static final String CONFIG_FILE = "classpath:messageconfig.properties";

    /**
     * 功能说明：初始化配置信息
     * @author: 林邵诚
     * @version: 1.0.1
     * 创建于Aug 11, 2010
     */
    private void initConfig() {
        if (config == null || config.isEmpty()) {
            InputStream in = null;
            try {
                in = ResourceUtils.getURL(CONFIG_FILE).openStream();
                config.load(in);
            } catch (FileNotFoundException e) {
                logger.error("配置文件[" + CONFIG_FILE + "]找不到：" + e.getMessage(), e);
                throw new ServiceException("配置文件[" + CONFIG_FILE + "]找不到!");
            } catch (IOException e) {
                logger.error("加载配置文件[" + CONFIG_FILE + "]时发生异常：" + e.getMessage(), e);
                throw new ServiceException("加载配置文件[" + CONFIG_FILE + "]时发生异常：" + e.getMessage());
            } finally {
                if (in != null) {
                    try {
                        in.close();
                    } catch (IOException e) {
                        logger.error("关闭配置文件[" + CONFIG_FILE + "]时发生异常：" + e.getMessage(), e);
                    }
                }
            }
        }
    }

    /**
     * 功能说明：发送报文并返回响应结果
     * @param message 请求报文
     * @return 返回响应报文
     * @author: 林邵诚
     * @version: 1.0.1
     * 创建于Aug 11, 2010
     */
    public byte[] sendMessage(String message) {
        initConfig();
        Socket socket = null;
        try {
            socket = new Socket(config.getProperty("IP"), Integer.parseInt(config.getProperty("PORT")));
            OutputStream out = socket.getOutputStream();
            byte[] requestMessage = message.getBytes("UTF-8");
            logger.error("发送报文-->" + message);
            out.write(requestMessage);
            out.flush();
            InputStream in = socket.getInputStream();
            StringBuffer sb = new StringBuffer();
            int length = 0;
            byte[] buffer = null;
            while ((length = in.available()) > 0) {
                buffer = new byte[length];
                in.read(buffer);
                sb.append(new String(buffer, "UTF-8"));
            }
            logger.error("收到响应报文-->" + sb.toString());
            return sb.toString().getBytes("UTF-8");
        } catch (NumberFormatException e) {
            logger.error("端口号[" + config.getProperty("PORT") + "]非法: " + e.getMessage(), e);
            throw new ServiceException("端口号[" + config.getProperty("PORT") + "]非法！");
        } catch (UnknownHostException e) {
            logger.error("发送报文时发生异常：" + e.getMessage(), e);
            throw new ServiceException("发送报文时发生异常：" + e.getMessage());
        } catch (IOException e) {
            logger.error("发送报文时发生异常：" + e.getMessage(), e);
            throw new ServiceException("发送报文时发生异常：" + e.getMessage());
        } finally {
            if (socket != null) {
                try {
                    socket.close();
                } catch (IOException e) {
                    logger.error("关闭Socket连接时发生异常：" + e.getMessage(), e);
                }
            }
        }
    }

    /**
     * 功能说明：模拟发送报文并接收到响应报文
     * @param message
     * @return
     * @author: 林邵诚
     * @version: 1.0.1
     * 创建于Aug 11, 2010
     */
    public CommonMessageVO sendTestMessage(String message) {
        logger.error("发送报文-->" + message);
        String msg;
        try {
            msg = message;
            String busiCode = msg.substring(6, 10);
            String xml = msg.substring(31);
            CommonMessageVO response = null;
            response = (CommonMessageVO) XMLUtil.fetchDigester(busiCode).parse(new StringReader(xml));
            response.getMessageHeader().setRcv_chnl_no(String.valueOf(System.currentTimeMillis()));
            response.getMessageHeader().setRsp_no("SUCCESS");
            response.getMessageHeader().setRsp_msg("交易成功");
            logger.error("收到模拟响应信息-->" + ReflectionToStringBuilder.toString(response) +
                    "\n其中报文头内容为：" + ReflectionToStringBuilder.toString(response.getMessageHeader()));
            return response;
        } catch (UnsupportedEncodingException e) {
            throw new ServiceException("模拟失败：" + e.getMessage());
        } catch (IOException e) {
            throw new ServiceException("模拟失败：" + e.getMessage());
        } catch (SAXException e) {
            throw new ServiceException("模拟失败：" + e.getMessage());
        }
    }
}
