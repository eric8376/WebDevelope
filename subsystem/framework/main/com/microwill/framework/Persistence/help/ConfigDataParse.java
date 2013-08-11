package com.microwill.framework.Persistence.help;

import java.io.InputStream;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.Element;

import com.microwill.framework.rpc.help.XMLParse;

public class ConfigDataParse {

	final static private String translateFile = "./interdatatraslate.xml";

	public ConfigDataParse(String rootPath) {
	}
	//property = ConfigDataParse.getTraslateStr("translateData/property2Name/O"
	//		+ orderType + "_P" + productType, "property", key, "name");
	public static String getTraslateStr(String xPath, String inId,
			String inValue, String retId) {
		/**
		 * @ author d
		 * @param
		 */
		String retValue = "";
		try {

			String url = translateFile;

			InputStream inS = ConfigDataParse.class.getResourceAsStream(url);

			Document document = XMLParse.fromXML(inS, "GBK");

			StringBuffer filter = new StringBuffer();
			filter.append("/" + xPath + "/value");

			filter.append("[@" + inId + "=\"" + inValue + "\"]");

			List list = document.selectNodes(filter.toString());
			if (list.isEmpty()) {
				System.out
						.println("the data of "
								+ filter
								+ " from outSystem may be error!\n or you should update the config xml of :"
								+ url);
				return " ";
			}
			Element ele = (Element) list.get(0);
			retValue = ele.attribute(retId).getValue();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return retValue;
	}
	
	//ȡ��CRM�ӿ�ҵ���ֶ�������Ϣ
	public static List getCRMBusiFieldConfig(String productType) {
		/**
		 * @ author d
		 * @param
		 */
		List  list = new ArrayList();
		try {

			String url = translateFile;

			InputStream inS = ConfigDataParse.class.getResourceAsStream(url);

			Document document = XMLParse.fromXML(inS, "GBK");
			
			Element root = document.getRootElement();
			
			Element property2Name = root.element("property2Name");
			
			Element product = property2Name.element(productType);
			
			List values = product.elements("value");
			//List list = document.selectNodes("/translateData/property2Name/O032_P008/value");
			
			for(int i=0;i<values.size();i++)
			{
				Element ele = (Element)values.get(i);
				Map attrMap = new HashMap();
				attrMap.put("name", ele.attributeValue("name"));
				attrMap.put("property", ele.attributeValue("property"));
				list.add(attrMap);
			}
			return list;
			
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return list;
	}

	public static void main(String[] args) {

		List list = ConfigDataParse.getCRMBusiFieldConfig(
				"/translateData/property2Name");


	}
}
