package org.nxstudio.service.socketserver.restools;

import java.io.InputStream;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;

public class XmlParser {
    private final static Logger logger = Logger.getLogger(XmlParser.class.getName());

    public static Document parse(String fileName) throws Exception {
        InputStream is = Thread.currentThread().getContextClassLoader().getResourceAsStream(fileName);
        return parse(is);
    }

    public static Document parse(InputStream is) throws Exception {
        DocumentBuilder builder = DocumentBuilderFactory.newInstance()
                .newDocumentBuilder();
        Document doc = builder.parse(is);
        return doc;
    }

    public static org.jdom.Document getXmlDoc(String fileName) throws Exception {
        org.jdom.Document doc = null;
        org.jdom.input.SAXBuilder sb = new org.jdom.input.SAXBuilder();
//		创建文档

        doc = sb.build(XmlParser.class.getClassLoader().getResourceAsStream(fileName));

        return doc;
    }

    public static String getNodeAttribute(Node n, String name) throws Exception {
        logger.log(Level.INFO, "node name:" + n.getNodeName() + " attribute name:" + name);
        NamedNodeMap attr = n.getAttributes();
        Node tmp = attr.getNamedItem(name);
        if (tmp == null) {
            return "";
        }
        String value = tmp.getNodeValue();

        return value;
    }
}
