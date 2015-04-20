package org.nxstudio.other.test.doctest.ccl;

import org.nxstudio.util.properties.PropertiesFactory;
import org.nxstudio.util.properties.PropertiesFile;
import org.nxstudio.util.properties.PropertiesHelper;

public class PropertiesTest {

    /**
     * 技术白皮书随书代码示例
     * 测试properties处理器
     *
     * @author XiongChun
     * @since 2011-03-29
     */
    public static void main(String[] args) {
        PropertiesHelper pHelper = PropertiesFactory.getPropertiesHelper(PropertiesFile.APP);
        pHelper.printAllVlue();
        //String value1 = pHelper.getValue("key1");
        //System.out.println(value1);

    }

}
