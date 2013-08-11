package com.microwill.framework.rpc.help;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;
import java.io.StringReader;
import java.io.UnsupportedEncodingException;
import java.util.List;

import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.DocumentFactory;
import org.dom4j.Element;
import org.dom4j.QName;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;


public final class XMLParse {

	public static final String DEFAULT_ENCODING = "UTF-8";
	
	public static Document createDocument() {
		return DocumentFactory.getInstance().createDocument();
	}

	/**
	 * 
	 * @param name
	 *            String
	 * @return Element
	 */
	public static Element createElement(String name) {
		return DocumentFactory.getInstance().createElement(name);
	}

	/**
	 * �õ�attribute
	 * 
	 * @param element
	 *            Element
	 * @param attributeName
	 *            String
	 * @return String
	 */
	public static String getAttribute(Element element, String attributeName) {
		return element.attributeValue(attributeName);
	}

	/**
	 * 
	 * @param owner
	 *            Element
	 * @param name
	 *            String
	 * @param value
	 *            String
	 */
	public static void setAttribute(Element owner, String name, String value) {

		Attribute attribute = owner.attribute(name);
		if (attribute == null) {
			attribute = createAttribute(owner, name, value);
			owner.add(attribute);
		} else {
			attribute.setValue(value);
		}
	}

	/**
	 * 
	 * @param owner
	 *            Element
	 * @param name
	 *            String
	 * @param value
	 *            String
	 * @return Attribute
	 */
	public static Attribute createAttribute(Element owner, String name,
			String value) {
		return DocumentFactory.getInstance()
				.createAttribute(owner, name, value);
	}

	/**
	 * 
	 * @param element
	 *            Element
	 * @param nodeName
	 *            String
	 * @return List
	 */
	public static List getChildElements(Element element, String nodeName) {
		return element.elements(nodeName);
	}

	/**
	 * 
	 * @param element
	 *            Element
	 * @param nodeName
	 *            String
	 * @return List
	 */
	public static List getChildElements(Element element) {
		return element.elements();
	}


	
    /**
     * ���������ȡXML��Document��
     * ���encodingStrΪnull����""����ô����ȱʡ����GB2312
     * @param inputSource ����Դ
     * @param encoding ������
     * @return document
     * @throws XMLDocException
     */
    public static Document fromXML(InputStream inputSource, String encoding) throws
    Exception {
        try {
            if (encoding == null || encoding.equals("")) {
                encoding = DEFAULT_ENCODING;
            }
            SAXReader reader = new SAXReader();
            Document document = reader.read(inputSource, encoding);
            return document;
        } catch (Exception ex) {
            throw new Exception(ex);
        }
    }

    /**
     * ֱ�Ӵ��ַ�õ�XML��Document
     * @param source ��һ���ַ��ı�ת��ΪXML��Document����
     * @param encoding ������
     * @return <code>Document</code>
     * @throws XMLDocException
     */
    public static Document fromXML(String source, String encoding) throws
    Exception {
        return fromXML(new StringReader(source), encoding);
    }	
	


	
    /**
     * ͨ��Reader��ȡDocument�ĵ�
     * ���encodingStrΪnull����""����ô����ȱʡ����GB2312
     * @param in Reader��
     * @param encoding ������
     * @return documment
     * @throws XMLDocException
     */
    public static Document fromXML(Reader in, String encoding) throws
    Exception {
        try {
            if (encoding == null || encoding.equals("")) {
                encoding = DEFAULT_ENCODING;
            }
            SAXReader reader = new SAXReader();
            Document document = reader.read(in, encoding);
            return document;
        } catch (Exception ex) {
            throw new Exception(ex);
        }
    }	
	


	   /**
     * ��XML��Documentת��Ϊjava.io.Writer�����
     * ��֧�ָ�Schema�ļ���У��
     * @param document XML�ĵ�
     * @param outStream ���д����
     * @param encoding ��������
     * @throws XMLDocException ������κ��쳣ת��Ϊ���쳣���
     */
    public static void toXML(Document document, java.io.OutputStream outStream,
                             String encoding) throws Exception {
        //
        OutputFormat outformat = OutputFormat.createPrettyPrint();
        if (encoding == null || encoding.trim().equals("")) {
            encoding = DEFAULT_ENCODING;
        }
        //���ñ�������
        outformat.setEncoding(encoding);
        XMLWriter xmlWriter = null;
        try {
            xmlWriter = new XMLWriter(outStream, outformat);
            xmlWriter.write(document);
            xmlWriter.flush();
        } catch (java.io.IOException ex) {
            throw new Exception(ex);
        } finally {
            if (xmlWriter != null) {
                try {
                    xmlWriter.close();
                } catch (java.io.IOException ex) {
                }
            }
        }
    }	
	
    /**
     * ��XML��Documentת��Ϊjava.io.Writer�����
     * ��֧�ָ�Schema�ļ���У��
     * @param document XML�ĵ�
     * @param outWriter ���д����
     * @param encoding ��������
     * @throws XMLDocException ������κ��쳣ת��Ϊ���쳣���
     */
    public static void toXML(Document document, java.io.Writer outWriter,
                             String encoding) throws Exception {
        //
        OutputFormat outformat = OutputFormat.createPrettyPrint();
        if (encoding == null || encoding.trim().equals("")) {
            encoding = DEFAULT_ENCODING;
        }
        //���ñ�������
        outformat.setEncoding(encoding);
        XMLWriter xmlWriter = null;
        try {
            xmlWriter = new XMLWriter(outWriter, outformat);
            xmlWriter.write(document);
            xmlWriter.flush();
        } catch (java.io.IOException ex) {
            throw new Exception(ex);
        } finally {
            if (xmlWriter != null) {
                try {
                    xmlWriter.close();
                } catch (java.io.IOException ex) {
                }
            }
        }
    }
	/**
	 * ���XML��
	 * 
	 * @param document
	 * @param encoding
	 * @return
	 * @throws XMLDocException
	 * @throws UnsupportedEncodingException
	 * @throws IOException
	 */
	public static String toXML(Document document, String encoding)
			throws Exception {
		ByteArrayOutputStream stream = new ByteArrayOutputStream();
		toXML(document, stream, encoding);
		if (stream != null) {
			try {
				stream.close();
			} catch (java.io.IOException ex) {
			}
		}
		return stream.toString();
	}

	public static Element appendChild(Element parent, String name) {
		return parent.addElement(new QName(name, parent.getNamespace()));
	}
}
