package org.nxstudio.service.httpService;

import java.util.HashMap;
import java.util.Map;

import org.apache.tools.ant.PropertyHelper;
import org.nxstudio.service.httpService.util.XmlUtils;
import org.nxstudio.util.properties.PropertiesFactory;
import org.nxstudio.util.properties.PropertiesFile;
import org.nxstudio.util.properties.PropertiesHelper;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

/**
 * Created by Administrator on 2015/4/10.
 */
public class Context {
    private static Map<String, HttpHandler> contextMap = new HashMap<String, HttpHandler>();
    public static String contextPath = "";
    private static PropertiesHelper g4PHelper = PropertiesFactory.getPropertiesHelper(PropertiesFile.APP);
    public static void load() {
        String httpServiceUrl = g4PHelper.getValue("httpServiceUrl");
        String os = System.getProperty("os.name");
        if(os.toLowerCase().startsWith("win")){
            httpServiceUrl= httpServiceUrl.replace("//","\\\\");
        }

        try {
            Document doc = XmlUtils.load(Context.class.getResource("/").getPath() +httpServiceUrl);
            Element root = doc.getDocumentElement();
            contextPath = XmlUtils.getAttribute(root, "context");
            Element[] handlers = XmlUtils.getChildrenByName(root, "handler");
            for (Element ele : handlers) {
                String handle_class = XmlUtils.getChildText(ele, "handler-class");
                String url_pattern = XmlUtils.getChildText(ele, "url-pattern");

                Class<?> cls = Class.forName(handle_class);
                Object newInstance = cls.newInstance();
                if (newInstance instanceof HttpHandler) {
                    contextMap.put(contextPath + url_pattern, (HttpHandler) newInstance);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * @param key
     * @return
     */
    public static HttpHandler getHandler(String key) {
        return contextMap.get(key);
    }

}
