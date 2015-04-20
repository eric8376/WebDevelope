package org.nxstudio.service.socketserver.integration.util;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;

/**
 * 配置文件解析器
 *
 * @author wangliangxun
 */
public class XMLParser {

    private static XMLParser parser = null;
    private static String xmlFileName = "base-config/AsynUpdateProxy.xml";
    private static SAXBuilder builder = new SAXBuilder();
    private static Document dom = null;

    private static final String[] attribates = {"prodNo", "eventNo", "type"};
    private static final String[] elements = {"class-name"};

    private XMLParser() {
        try {
            dom = builder.build(XMLParser.class.getClassLoader().getResourceAsStream(xmlFileName));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static XMLParser getXMLParser() {
        parser = parser != null ? parser : new XMLParser();
        return parser;
    }

    public Map getElementByAttr(String prodNo, String eventNo) {
        Map result = new HashMap();
        Element eRoot = dom.getRootElement();
        List domLit = eRoot.getChildren();
        for (Iterator ite = domLit.iterator(); ite.hasNext(); ) {
            Element el = (Element) ite.next();
            if (el.getAttributeValue(attribates[0]).equals(prodNo) &&
                    el.getAttributeValue(attribates[1]).equals(eventNo)) {
                for (int i = 0; i < elements.length; i++) {
                    result.put(elements[i], el.getChildTextTrim(elements[i]));
                }
                break;
            }
        }
        return result;
    }

    public Map getElementByAttr(String prodNo, String eventNo, String type) {
        Map result = new HashMap();
        Element eRoot = dom.getRootElement();
        List domLit = eRoot.getChildren();
        for (Iterator ite = domLit.iterator(); ite.hasNext(); ) {
            Element el = (Element) ite.next();
            if (el.getAttributeValue(attribates[0]).equals(prodNo) &&
                    el.getAttributeValue(attribates[1]).equals(eventNo) &&
                    el.getAttributeValue(attribates[2]).equals(type)) {
                for (int i = 0; i < elements.length; i++) {
                    result.put(elements[i], el.getChildTextTrim(elements[i]));
                }
                break;
            }
        }
        return result;
    }

    public static void main(String[] args) {
        Map test = XMLParser.getXMLParser().getElementByAttr("009", "002");
        System.out.println(test.get("class-name"));
    }
}
