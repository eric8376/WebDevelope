package org.nxstudio.util.properties;

import java.io.InputStream;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.g4.G4Constants;
import org.springframework.stereotype.Component;

/**
 * Properties文件静态工厂
 *
 * @author XiongChun
 * @since 2009-08-2
 */
@Component
public class PropertiesFactory {
    private static Log log = LogFactory.getLog(PropertiesFactory.class);
    /**
     * 属性文件实例容器
     */
    private static Dto container = new BaseDto();

    static {
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        if (classLoader == null) {
            classLoader = PropertiesFactory.class.getClassLoader();
        }
        // 加载属性文件global.eredbos.properties
        try {
            InputStream is = classLoader.getResourceAsStream("global.g4.properties");
            PropertiesHelper ph = new PropertiesHelper(is);
            container.put(PropertiesFile.G4, ph);
        } catch (Exception e1) {
            log.error(G4Constants.Exception_Head + "加载属性文件global.g4.properties出错!");
            e1.printStackTrace();
        }
        // 加载属性文件global.app.properties
        try {
            InputStream is = classLoader.getResourceAsStream("global.app.properties");
            PropertiesHelper ph = new PropertiesHelper(is);
            container.put(PropertiesFile.APP, ph);
        } catch (Exception e1) {
            log.error(G4Constants.Exception_Head + "加载属性文件global.app.properties出错!");
            e1.printStackTrace();
        }
        // 加载属性文件应用启动文件y
        /*try {
			InputStream is = classLoader.getResourceAsStream("g4server.properties");
			PropertiesHelper ph = new PropertiesHelper(is);
			container.put(PropertiesFile.G4SERVER, ph);
		} catch (Exception e1) {
			log.error(G4Constants.Exception_Head + "加载属性文件g4server.properties出错!");
			e1.printStackTrace();
		}*/
    }

    /**
     * 获取属性文件实例
     *
     * @param pFile 文件类型
     * @return 返回属性文件实例
     */
    public static PropertiesHelper getPropertiesHelper(String pFile) {
        PropertiesHelper ph = (PropertiesHelper) container.get(pFile);
        return ph;
    }
}
