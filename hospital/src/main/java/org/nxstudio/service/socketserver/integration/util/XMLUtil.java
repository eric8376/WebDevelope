/**
 * XMLUtil.java
 * 版权声明 力铭科技版权所有
 * 项目组：广州农村商业银行电子商业汇票系统
 * 修订记录：
 * 1)创建者：林邵诚
 * 时 间：Aug 11, 2010
 * 描 述：创建
 */
package org.nxstudio.service.socketserver.integration.util;

import org.apache.commons.digester.Digester;
import org.apache.commons.digester.xmlrules.DigesterLoader;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;
import org.hibernate.service.spi.ServiceException;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.service.socketserver.integration.send.vo.CommonHeader;
import org.nxstudio.service.socketserver.integration.send.vo.CommonMessageVO;
import org.nxstudio.service.socketserver.integration.send.vo.creditcontrol.CreditControlResponseVO;
import org.nxstudio.service.socketserver.restools.XmlParser;
import org.nxstudio.service.socketserver.systools.DateTimeUtil;
import org.nxstudio.util.g4.G4Utils;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;

import javax.servlet.ServletContext;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import java.io.*;
import java.lang.reflect.Field;
import java.net.URL;
import java.text.MessageFormat;
import java.text.NumberFormat;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;


/**
 * <pre>功能描述: </pre>
 * <br>JDK版本：1.5+
 *
 * @author 林邵诚
 * @version 1.0.1 创建于 Aug 11, 2010
 * @since 1.0
 * 修改日期：Aug 11, 2010 林邵诚
 */
@Component
public class XMLUtil implements ApplicationContextAware {

    //上下文
    public static ApplicationContext applicationContext;
    @Autowired
    public static ServletContext servletContext;
    /**
     * 日志记录器
     */
    private static final Logger logger = Logger.getLogger(XMLUtil.class);

    /**
     * 解析器缓存
     */
    private static final Map<String, Digester> cache = new HashMap<String, Digester>();

    /**
     * 规则文件所在目录
     */
    public static final String ruleConfigFolder = "classpath:digesterrule-config/";

    /**
     * 请求报文模板
     */
    private static Document requestTemplate = null;

    /**
     * 功能说明：加载请求报文模板
     *
     * @author: 林邵诚
     * @version: 1.0.1
     * 创建于Aug 11, 2010
     */
    private static void loadRequestTemplate() {
        SAXReader saxReader = new SAXReader();
        URL url = null;
        InputStream in = null;
        try {
            url = ResourceUtils.getURL("classpath:/socket/requestmessage_template.xml");
            in = url.openStream();
            requestTemplate = saxReader.read(in);
        } catch (Exception ex) {
            logger.error("加载请求报文模板时发生异常：" + ex.getMessage(), ex);
            throw new ServiceException("加载请求报文模板时发生异常：" + ex.getMessage());
        } finally {
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                    logger.error("关闭请求报文模板时发生异常：" + e.getMessage(), e);
                }
            }
        }
    }

    /**
     * 功能说明：根据交易代号获取响应的解析器
     *
     * @param busiCode
     * @return 返回XML解析器
     * @author: 林邵诚
     * @version: 1.0.1
     * 创建于Aug 11, 2010
     */
    public static Digester fetchDigester(String busiCode) {
        Digester digester = null;
        if (cache.containsKey(busiCode)) {
            digester = cache.get(busiCode);
        } else {
            URL ruleFile = null;
            try {
                ruleFile = ResourceUtils.getURL(ruleConfigFolder + busiCode + ".xml");
            } catch (FileNotFoundException e) {
                logger.error("交易编号为[" + busiCode + "]的规则配置文件没有找到：" + e, e);
                throw new ServiceException("交易编号为[" + busiCode + "]的规则配置文件没有找到!");
            }
            digester = DigesterLoader.createDigester(ruleFile);
            digester.setUseContextClassLoader(true);
            cache.put(busiCode, digester);
        }
        return digester;
    }

    /**
     * 功能说明：获取请求报文模板
     *
     * @return 返回模板的克隆
     * @author: 林邵诚
     * @version: 1.0.1
     * 创建于Aug 11, 2010
     */
    private static Document getRequestTemplate() {
        if (requestTemplate == null) {
            loadRequestTemplate();
        }
        return (Document) requestTemplate.clone();
    }

    /**
     * 功能说明：设置公共报文头
     *
     * @param head          报文头节点
     * @param messageHeader 报文头信息
     * @author: 林邵诚
     * @version: 1.0.1
     * 创建于Aug 11, 2010
     */
    private static void dealWithRequestMessageHeader(Element head, CommonHeader messageHeader) {
        Element item = null;
        item = head.element("ver_no");
        item.setText(objectToString(messageHeader.getVer_no()));

        item = head.element("bank_id");
        item.setText(objectToString(messageHeader.getBank_id()));

        item = head.element("snd_chnl_no");
        item.setText(objectToString(messageHeader.getSnd_chnl_no()));

        item = head.element("rcv_chnl_no");
        item.setText(objectToString(messageHeader.getRcv_chnl_no()));

        item = head.element("chnl_dt");
        item.setText(objectToString(messageHeader.getChnl_dt()));

        item = head.element("chnl_tm");
        item.setText(objectToString(messageHeader.getChnl_tm()));

        item = head.element("chnl_seq");
        item.setText(objectToString(messageHeader.getChnl_seq()));

    }

    /**
     * 功能说明：迭代报文对象生成报文体信息
     *
     * @param body    报文体节点
     * @param message 报文体信息
     * @author: 林邵诚
     * @version: 1.0.1
     * 创建于Aug 11, 2010
     */
    @SuppressWarnings("unchecked")
    private static void recurseDealMessageBody(Element body, Object message) {
        Element item = null;
        Element child = null;
        Class cl = message.getClass();
        Field[] fields = cl.getDeclaredFields();
        for (Field field : fields) {
            if ("serialVersionUID".equals(field.getName())) {
                continue;
            }
            field.setAccessible(true);
            Object value = null;
            try {
                value = field.get(message);
            } catch (Exception e) {
                logger.error(MessageFormat.format("获取类{0}的对象{1}的{2}字段的值时出现异常!",
                        cl.toString(), message, field.getName()), e);
            }
            if (value instanceof List) {
                item = body;

                List<Object> valueList = (List<Object>) value;
                if (valueList != null) {
                    for (Object valueItem : valueList) {
                        child = item.addElement(field.getName());
                        recurseDealMessageBody(child, valueItem);
                    }
                }
            } else {
                item = body.addElement(field.getName());
                item.setText(objectToString(value));

            }
        }
    }

    /**
     * 功能说明：对象转换为字符串形式
     *
     * @param obj 对象值
     * @return 返回字符形式
     * @author: 林邵诚
     * @version: 1.0.1
     * 创建于Mar 15, 2010
     */
    public static String objectToString(Object obj) {
        if (obj == null) {
            return "";
        } else if (obj instanceof java.util.Date) {
            return DateTimeUtil.get_YYYYMMDD_Date((java.util.Date) obj);
        } else if (obj instanceof Double) {
            NumberFormat numberFormatter = NumberFormat.getNumberInstance();
            numberFormatter.setMaximumFractionDigits(6);
            numberFormatter.setMinimumFractionDigits(2);
            numberFormatter.setGroupingUsed(false);
            return numberFormatter.format((Double) obj);
        }
        return StringUtils.trimToEmpty(obj.toString());
    }

    /**
     * 功能说明：根据报文请求对象生成标准的XML字符串
     *
     * @param vo 报文请求对象
     * @return 标准XML字符串
     * @author: 林邵诚
     * @version: 1.0.1
     * 创建于Aug 11, 2010
     */
    public static String generateRequestMessage(CommonMessageVO vo) {
        String message = null;
        Document template = getRequestTemplate();
        Element root = template.getRootElement();
        Element head = (Element) (root.elements().get(0));
        Element body = (Element) (root.elements().get(1));
        dealWithRequestMessageHeader(head, vo.getMessageHeader());
        recurseDealMessageBody(body, vo);
        OutputFormat format = OutputFormat.createPrettyPrint();
        format.setEncoding("UTF-8");
        format.setTrimText(true);
        XMLWriter out = null;
        StringWriter writer = null;

        writer = new StringWriter();
        try {
            try {
                out = new XMLWriter(format);
                out.setWriter(writer);
                out.write(template);
                out.flush();
                message = writer.toString();
            } finally {
                if (out != null) {
                    out.close();
                }
                if (writer != null) {
                    writer.close();
                }
            }
        } catch (IOException e) {
            logger.error("产生回复报文时发生异常：" + e.getMessage(), e);
        }
        return message;
    }

    /**
     * 通过指定的vo去加载星系模版的xml
     *
     * @param vo
     * @return
     */
    public static String generateRequestVOByName(String classkey) throws Exception {
        //从内存中获取vo映射数据
        Dto classnamesMap = (Dto) servletContext.getAttribute("MSGVOMAPPING");
        Object o = null;
        //如果没有获取到，说明是第一次，就去读取xml，并放到内存中
        if (G4Utils.isEmpty(classnamesMap)) {
            org.jdom.Document doc = XmlParser.getXmlDoc("socket/VoMapping.xml");
            org.jdom.Element rootElement = doc.getRootElement();
            List defineList = rootElement.getChildren("Vo");
            classnamesMap = new BaseDto();
            for (int i = 0; i < defineList.size(); i++) {
                org.jdom.Element tempElement = (org.jdom.Element) defineList.get(i);
                String key = tempElement.getChildText("key");
                String map = tempElement.getChildText("map");
                classnamesMap.put(key, map);
            }
            servletContext.setAttribute("MSGVOMAPPING", classnamesMap);
        }
        //通过映射。获取到类的实力
        String classname = classnamesMap.getAsString(classkey);

        return classname;
    }

    /**
     * 将xml字符串转化为java bean
     *
     * @param objclass
     * @param xml
     * @param <T>
     * @return
     * @throws JAXBException
     * @throws IllegalAccessException
     * @throws InstantiationException
     */
    public static <T> T XMLStringToBean(Class<T> objclass, String xml) throws JAXBException, IllegalAccessException, InstantiationException {
        T object = null;
        JAXBContext jaxbContext = JAXBContext.newInstance(objclass);
        Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
        xml = xml.trim();
        StringReader reader = new StringReader(xml);
        object = (T) unmarshaller.unmarshal(reader);
        return object;
    }

    /**
     * 将javabean转化为xml字符串
     *
     * @param obj
     * @param encoding
     * @param <T>
     * @return
     * @throws JAXBException
     */
    public static <T> String BeanToXMLString(T obj, String encoding) throws JAXBException {
        String result = null;
        JAXBContext context = JAXBContext.newInstance(obj.getClass());
        Marshaller marshaller = context.createMarshaller();
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);//决定是否在转换成xml时同时进行格式化（即按标签自动换行，否则即是一行的xml）
        marshaller.setProperty(Marshaller.JAXB_ENCODING, encoding);//xml的编码方式

        StringWriter writer = new StringWriter();
        marshaller.marshal(obj, writer);
        result = writer.toString();
        return result;
    }

    public static String fetchMsg() {
        BufferedReader reader = null;
        StringBuffer sb = new StringBuffer();
        try {
            reader = new BufferedReader(new FileReader("d:\\s200.xml"));
            String line = null;
            while ((line = reader.readLine()) != null) {
                if (sb.length() > 0) {
                    sb.append("\r\n");
                }
                sb.append(line);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }
        }
        return sb.toString();
    }

    public static void main(String[] args) throws Exception {
        String msg = fetchMsg();
        String busiCode = msg.substring(6, 10);
        String xml = msg.substring(31).trim();
        System.out.println(xml);
        Reader reader = new StringReader(new String(xml.getBytes(), "UTF-8"));
        CreditControlResponseVO vo = (CreditControlResponseVO) fetchDigester(busiCode).parse(reader);
        System.out.println(ReflectionToStringBuilder.toString(vo));
        System.out.println(ReflectionToStringBuilder.toString(vo.getMessageHeader()));
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
        if (servletContext == null) {
            servletContext = (ServletContext) applicationContext.getBean("servletContext");
        }
    }


    public static String MapToXmlString(Map<String, Object> varDto) {
        if (G4Utils.isEmpty(varDto)) {
            return null;
        }
        Document document = DocumentHelper.createDocument();
        Element nodeElement = document.addElement("varList");
        Iterator<String> iterator = varDto.keySet().iterator();
        while (iterator.hasNext()) {
            String key = iterator.next();
            nodeElement.addAttribute("label", key);
            nodeElement.setText(String.valueOf(varDto.get(key)));
        }
        return doc2String(document);
    }

    private static String doc2String(Document document) {
        String reStr = "";
        try {
            //使用输出流来进行转化
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            //使用UTF-8
            OutputFormat outputFormat = new OutputFormat("  ", true, "UTF-8");
            XMLWriter writer = new XMLWriter(out, outputFormat);
            writer.write(document);
            reStr = out.toString("UTF-8");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return reStr;
    }
}
