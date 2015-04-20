package org.nxstudio.service.quartz;

import org.nxstudio.core.model.impl.BaseDto;

import java.util.Iterator;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【job参数收集器】
 * 时间: 2013-06-14 下午7:03
 */

public class ParamsCollection extends BaseDto {
    /**
     * 编译参数
     *
     * @param str 需要进行编辑的参数
     * @return 成功编辑的参数
     */
    public String build(String str) {
        //替换  /【/  /】/  \n
        str = str.replaceAll("/[{]", "/【/");
        str = str.replaceAll("/[}]", "/】/");
        str = str.replaceAll("\\n", "");

        Iterator iterator = this.keySet().iterator();
        //替换参数
        while (iterator.hasNext()) {
            String key = iterator.next().toString();
            str = str.replaceAll("[{]" + key + "[}]", this.getAsString(key));
        }

        //替换{}
        str = str.replaceAll("/【/", "{");
        str = str.replaceAll("/】/", "}");

        return str;
    }
}
