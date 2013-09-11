//package com.microwill.framework.rpc.help;
//
//import java.io.InputStream;
//import java.io.OutputStream;
//import java.io.Reader;
//import java.math.BigDecimal;
//import java.math.BigInteger;
//import java.text.ParseException;
//import java.text.SimpleDateFormat;
//import java.util.ArrayList;
//import java.util.Collection;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.Iterator;
//import java.util.List;
//import java.util.Map;
//
//import net.sf.cglib.beans.BeanMap;
//
//import org.dom4j.Document;
//import org.dom4j.Element;
//
//public class ExecuteHelp {
//	public static void main(String[] arg) {
//	}
//
//
//	public static String getXmlForTreeList(List list) throws Exception {
//		Document doc = XMLParse.createDocument();
//		Element ele = XMLParse.createElement("items");
//		if (list != null && list.size() > 0) {
//			for (int i = 0; i < list.size(); i++) {
//				Element childE = XMLParse.createElement("item");
//				Map formD = (Map) list.get(i);
//				Iterator ir = formD.keySet().iterator();
//				while (ir.hasNext()) {
//					String key = (String) ir.next();
//					String value = formD.get(key) == null ? "" : formD.get(key)
//							.toString();
//					XMLParse.setAttribute(childE, key, value);
//				}
//				ele.add(childE);
//			}
//		}
//		doc.add(ele);
//		return XMLParse.toXML(doc, "UTF-8");
//	}
//
//	public static Element getItemsForTreeList(Map map) throws Exception {
//		String pageIndex = (String) map.get("pageIndex");
//		String pageSize = (String) map.get("pageSize");
//		String pageCount = (String) map.get("pageCount");
//		String recordCount = (String) map.get("recordCount");
//		List list = (List) map.get("list");
//		Element root = XMLParse.createElement("list");
//		Element ele = XMLParse.createElement("items");
//		;
//		if (list != null && list.size() > 0) {
//			for (int i = 0; i < list.size(); i++) {
//				Element childE = XMLParse.createElement("item");
//				Map formD = (Map) list.get(i);
//				Iterator ir = formD.keySet().iterator();
//				while (ir.hasNext()) {
//					String key = (String) ir.next();
//					String value = formD.get(key) == null ? "" : formD.get(key)
//							.toString();
//					XMLParse.setAttribute(childE, key, value);
//				}
//				ele.add(childE);
//			}
//		}
//		Element items = XMLParse.createElement("param");
//		XMLParse.setAttribute(items, "type", "c");
//		XMLParse.setAttribute(items, "name", "list");
//		items.add(ele);
//		root.add(items);
//		Element pageIndexEle = XMLParse.createElement("param");
//		XMLParse.setAttribute(pageIndexEle, "type", "s");
//		XMLParse.setAttribute(pageIndexEle, "name", "pageIndex");
//		XMLParse.setAttribute(pageIndexEle, "value", pageIndex);
//		root.add(pageIndexEle);
//		Element pageSizeE = XMLParse.createElement("param");
//		XMLParse.setAttribute(pageSizeE, "type", "s");
//		XMLParse.setAttribute(pageSizeE, "name", "pageSize");
//		XMLParse.setAttribute(pageSizeE, "value", pageSize);
//		root.add(pageSizeE);
//		Element pageCountE = XMLParse.createElement("param");
//		XMLParse.setAttribute(pageCountE, "type", "s");
//		XMLParse.setAttribute(pageCountE, "name", "pageCount");
//		XMLParse.setAttribute(pageCountE, "value", pageCount);
//		root.add(pageCountE);
//		Element recordCountE = XMLParse.createElement("param");
//		XMLParse.setAttribute(recordCountE, "type", "s");
//		XMLParse.setAttribute(recordCountE, "name", "recordCount");
//		XMLParse.setAttribute(recordCountE, "value", recordCount);
//		root.add(recordCountE);
//		return root;
//	}
//
//	/**
//	 * xml�������//
//	 * 
//	 * @param ele
//	 *            Element
//	 * @return Object
//	 */
//	private static Object convetToObject(Element ele) throws ParseException {
//		String type = XMLParse.getAttribute(ele, "type");
//		String temp = XMLParse.getAttribute(ele, "value");
//		Object value = null;
//		if (type.equalsIgnoreCase("i")) {
//			value = temp == "" ? null : new Integer(temp);
//		} else if (type.equalsIgnoreCase("f")) {
//			value = temp == "" ? null : new Float(temp);
//		} else if (type.equalsIgnoreCase("t") || type.equalsIgnoreCase("t2")) {
//			value = temp == "" ? null : parse(temp);
//		} else if (type.equalsIgnoreCase("b")) {
//			value = temp == "" ? null : new Boolean(temp);
//		} else if (type.equalsIgnoreCase("s")) {
//			value = XMLParse.getAttribute(ele, "value");
//		} else if (type.equalsIgnoreCase("m")) {
//			Map params = new HashMap();
//			List list = XMLParse.getChildElements(ele);
//			for (int i = 0; i < list.size(); i++) {
//				Element childE = (Element) list.get(i);
//				params.put(XMLParse.getAttribute(childE, "name"),
//						convetToObject(childE));
//			}
//			value = params;
//		} else if (type.equalsIgnoreCase("c")) {
//			List params = new ArrayList();
//			List list = XMLParse.getChildElements(ele);
//			for (int i = 0; i < list.size(); i++) {
//				Element childE = (Element) list.get(i);
//				params.add(convetToObject(childE));
//			}
//			value = params;
//		}
//		return value;
//	}
//
//	/**
//	 * ҳ��xml���������Map
//	 * 
//	 * @param insReader
//	 * @return
//	 */
//	public static Map convetToMap(String xml) throws Exception {
//		Document doc = XMLParse.fromXML(xml, "utf-8");
//		return convetToMap(doc);
//	}
//
//	/**
//	 * ҳ��xml���������Map
//	 * 
//	 * @param insReader
//	 * @return
//	 * @throws Exception
//	 */
//	public static Map convetToMap(Reader insReader) throws Exception {
//		Document doc = XMLParse.fromXML(insReader, "utf-8");
//		return convetToMap(doc);
//	}
//
//	/**
//	 * ҳ��xml���������Map
//	 * 
//	 * @param inputStream
//	 *            InputStream
//	 * @return Map
//	 * @throws Exception
//	 */
//	public static Map convetToMap(InputStream inputStream) throws Exception {
//		Document doc = XMLParse.fromXML(inputStream, "utf-8");
//		return convetToMap(doc);
//	}
//
//	/**
//	 * 
//	 * @param doc
//	 * @return
//	 * @throws Exception
//	 */
//	private static Map convetToMap(Document doc) throws Exception {
//		System.out.println("doc:" + XMLParse.toXML(doc, "utf-8"));
//		Map map = null;
//		if (doc != null) {
//			map = new HashMap();
//			Element root = doc.getRootElement();
//			List list = XMLParse.getChildElements(root, "param");
//			int size = list.size();
//			if (list != null && size > 0) {
//				Object o[] = new Object[size];
//				for (int i = 0; i < list.size(); i++) {
//					Element ele = (Element) list.get(i);
//					o[i] = convetToObject(ele);
//				}
//				map.put("objects", o);
//			} else {
//				map.put("objects", new Object[0]);
//			}
//			map.put("service", XMLParse.getAttribute(root, "service"));
//			map.put("meth", XMLParse.getAttribute(root, "meth"));
//		}
//		return map;
//	}
//
//	/**
//	 * ˢ�������//
//	 * 
//	 * @param obj
//	 * @param outputS
//	 * @throws Exception
//	 */
//	public static void flushOutputStream(Object obj, OutputStream outputS)
//			throws Exception {
//		Document doc = XMLParse.createDocument();
//		Element root = XMLParse.createElement("output");
//		doc.add(root);
//		objectToXml(root, null, obj);
//		XMLParse.toXML(doc, outputS, "utf-8");
//	}
//
//	private static String getObjectType(Object obj) {
//		// n=null,b,i,f,s,t,o,a,e=exception
//		if (obj == null) {
//			return "n";
//		}
//
//		if (obj instanceof Exception) {
//			return "e";
//		}
//
//		if (obj instanceof Integer || obj instanceof BigInteger
//				|| obj instanceof BigDecimal) {
//			return "i";
//		} else if (obj instanceof Float || obj instanceof Double) {
//			return "f";
//		} else if (obj instanceof Long) {
//			return "l";
//		} else if (obj instanceof Boolean) {
//			return "b";
//		} else if (obj instanceof Date) {
//			return "t";
//		} else if (obj instanceof String) {
//			return "s";
//		} else if (obj instanceof Collection) {
//			return "c";
//		} else if (obj instanceof List) {
//			return "c2";
//		} else if (obj instanceof Map) {
//			return "m";
//		} else if (obj.getClass().isArray()) {
//			return "a";
//		} else if (obj instanceof Element) {
//			return "ele";
//		} else {
//			return "o";
//		}
//	}
//
//	private static void setEleFromM(Element ele, Map map) throws Exception {
//		XMLParse.setAttribute(ele, "type", "m");
//		Iterator ir = map.keySet().iterator();
//		while (ir.hasNext()) {
//			Element childE = XMLParse.createElement("param");
//			ele.add(childE);
//			Object key = ir.next();
//			Object obj = map.get(key);
//			objectToXml(childE, (String) key, obj);
//		}
//	}
//
//	private static void setEleFromC(Element ele, Collection col)
//			throws Exception {
//		XMLParse.setAttribute(ele, "type", "c");
//		Iterator ir = col.iterator();
//		while (ir.hasNext()) {
//			Element childE = XMLParse.createElement("param");
//			ele.add(childE);
//			objectToXml(childE, null, ir.next());
//		}
//	}
//
//	private static void setEleFromL(Element ele, List list) throws Exception {
//		XMLParse.setAttribute(ele, "type", "c");
//		for (int i = 0; i < list.size(); i++) {
//			Element childE = XMLParse.createElement("param");
//			ele.add(childE);
//			objectToXml(childE, null, list.get(i));
//		}
//	}
//
//	private static void setEleFromA(Element ele, Object[] obj) throws Exception {
//		XMLParse.setAttribute(ele, "type", "c");
//		for (int i = 0; i < obj.length; i++) {
//			Element childE = XMLParse.createElement("param");
//			ele.add(childE);
//			objectToXml(childE, null, obj[i]);
//		}
//	}
//
//	private static void exceptionToStr(Throwable ex, StringBuffer strB) {
//		StackTraceElement[] em = ex.getStackTrace();
//		strB.append("the cause:" + ex + "\n");
//		for (int i = 0; i < em.length; i++) {
//			strB.append("\tat... " + em[i] + "\n");
//		}
//		strB.append("\t... more:" + em.length + "\n");
//		Throwable nEx = ex.getCause();
//		if (nEx != null) {
//			exceptionToStr(nEx, strB);
//		}
//	}
//
//	/**
//	 * ���󷴽���xml
//	 * 
//	 * @param ele
//	 * @param name
//	 * @param value
//	 * @throws Exception
//	 */
//	final private static void objectToXml(Element ele, String name, Object value)
//			throws Exception {
//		String type = getObjectType(value);
//		if (name != null && name.trim().length() > 0) {
//			XMLParse.setAttribute(ele, "name", name);
//		}
//		if (type.equalsIgnoreCase("n")) {
//			return;
//		}
//		if (type.equalsIgnoreCase("ele")) {
//			XMLParse.setAttribute(ele, "type", type);
//			ele.add((Element) value);
//		} else if (type.equalsIgnoreCase("b") || type.equalsIgnoreCase("i")
//				|| type.equalsIgnoreCase("l") || type.equalsIgnoreCase("f")
//				|| type.equalsIgnoreCase("s")) {
//			XMLParse.setAttribute(ele, "type", type);
//			ele.addCDATA(value.toString());
//		} else if (type.equalsIgnoreCase("e")) {
//			Throwable ex = (Throwable) value;
//			StringBuffer strB = new StringBuffer();
//			exceptionToStr(ex, strB);
//			XMLParse.setAttribute(ele, "type", type);
//			ele.addCDATA(strB.toString());
//		} else if (type.equalsIgnoreCase("t")) {
//			XMLParse.setAttribute(ele, "type", type);
//			ele.addCDATA(value.toString());
//		} else if (type.equalsIgnoreCase("c")) {
//			setEleFromC(ele, (Collection) value);
//		} else if (type.equalsIgnoreCase("c2")) {
//			setEleFromL(ele, (List) value);
//		} else if (type.equalsIgnoreCase("m")) {
//			setEleFromM(ele, (Map) value);
//		} else if (type.equalsIgnoreCase("a")) {
//			setEleFromA(ele, (Object[]) value);
//		} else if (type.equalsIgnoreCase("o")) {
//			Map map = BeanMap.create(value);
//			System.out.println("map:" + map);
//			setEleFromM(ele, map);
//		}
//	}
//
//	private static Date parse(String str) throws ParseException {
//		SimpleDateFormat dateFormat = null;
//		if (str.length() == 10) {
//			dateFormat = new SimpleDateFormat("yyyy-MM-dd");
//		} else {
//			dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//		}
//		return dateFormat.parse(str);
//	}
//
//	public static String getString(Map map, String key) {
//		String rtS = null;
//		if (map.get(key) != null) {
//			rtS = map.get(key).toString();
//		}
//		return rtS;
//	}
//
//	public static boolean isEmpty(String methName) {
//		if (methName == null || methName.equalsIgnoreCase("")) {
//			return true;
//		} else
//			return false;
//	}
//}
