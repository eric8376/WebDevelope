package com.microwill.framework.weix.svc.msg;


import java.io.StringReader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.input.SAXBuilder;

import com.microwill.framework.weix.svc.msg.MsgType.EventType;
import com.microwill.framework.weix.svc.msg.MsgType.ReqType;
import com.thoughtworks.xstream.XStream;
/**
 * XML消息工具类,负责XML与JAVA BEAN之间的转换
 * 对于XML解析工具，考察过DOM4J与JDOM，JDOM性能比DOM4J好很多，使用也更方便。
 * 对于XML序列化与反序列化工具，考察过JAXB2与XSTREAM。XSTREAM性能更好，也更方便使用。而JAXB2为JDK6自带的，无需再加入其它库。
 * 其中对于XSTREAM的构造方式，可选默认（需要xmlpull包）、StaxDriver，、DomDriver，性能依次递减。
 * 最终选用JDOM作为反序列化工具，XSTREAM作为序列化工具。
 * 之所以不全部使用XSTREAM,在于反序列化时，必须根据消息类型来确定具体的消息类，
 * 这意味着要么对消息解析两次（首先解析出消息头，再针对具体消息解析一次），这样有性能影响；
 * 要么创建一个包含所有消息字段的类，解析完毕后再将其属性COPY到具体类，这样又不好扩展。
 * 使用JDOM则可以在完成XML解析后，再根据消息类型COPY到具体的类。
 */
public class XmlMsgUtil
{
	private static XStream xs;
	
	static
	{
		//启用CDATA数据填充，同时，配置不需要填充的字段。
		CDataDriver cDataDriver = new CDataDriver();
		cDataDriver.addExcluded("CreateTime");
		cDataDriver.addExcluded("ArticleCount");
		
		xs = new XStream(cDataDriver);
		xs.autodetectAnnotations(true);
	}
	
	/**
	 * 将应答消息转成XML。
	 * 
	 * @param bean
	 * @return
	 */
	public static String bean2Xml(Object bean)
	{
		return xs.toXML(bean);
	}
	
	public static Map<String, Object> xml2Map(String xml)
	{
		try
		{
			SAXBuilder builder = new SAXBuilder();
			Document doc = builder.build(new StringReader(xml));
			Element root = doc.getRootElement();
			Map<String, Object> result = new HashMap<String, Object>();
 
			//将XML消息转换为MAP形式,其中的key值需转换为小写开头,以方便Java BEAN的处理.
			List<Element> elements = root.getChildren();
			for (Element element : elements)
			{
				String name = element.getName();
				result.put(name.substring(0,1).toLowerCase()+ name.substring(1), element.getText());
			}
			
			return result;
		}
		catch (Exception e) 
		{
			throw new RuntimeException("error while converting xml to map", e);
		}
	}
	
	
	/**
	 * 将XML请求消息转成JAVA BEAN.
	 * 
	 * @param xml
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static <T> T xml2Bean(String xml)
	{

    	try
    	{
    		Map<String, Object> props = xml2Map(xml);
    		Class<?> targetCls = null;
    		
    		String msgType = (String) props.get("msgType");
    		if("event".equalsIgnoreCase(msgType))
    		{//是事件消息
    			String event = (String) props.get("event");
    			EventType eventType = EventType.valueOf(event);
    			targetCls = eventType.getMsgCls();
    		}
    		else
    		{//是用户请求消息
    			ReqType reqType = ReqType.valueOf(msgType);
    			targetCls = reqType.getMsgCls();
    		}
    		
			//实例化后将MAP的值COPY到 BEAN里面
    		Object result = targetCls.newInstance();
    		BeanUtils.populate(result, props);
    		
    		return (T)result;	
    	}
    	catch (Exception e) 
    	{
    		throw new RuntimeException("error while converting xml message to java bean", e);
		}
	}
}
