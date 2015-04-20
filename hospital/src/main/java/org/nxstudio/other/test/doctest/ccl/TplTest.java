package org.nxstudio.other.test.doctest.ccl;

import java.io.StringWriter;
import java.util.List;

import org.nxstudio.core.dao.base.GeneralDao;
import org.nxstudio.util.spring.SpringContextHolder;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.core.tag.tpl.tplengine.DefaultTemplate;
import org.nxstudio.core.tag.tpl.tplengine.FileTemplate;
import org.nxstudio.core.tag.tpl.tplengine.StringTemplate;
import org.nxstudio.core.tag.tpl.tplengine.TemplateEngine;
import org.nxstudio.core.tag.tpl.tplengine.TemplateEngineFactory;
import org.nxstudio.core.tag.tpl.tplengine.TemplateType;

public class TplTest {

    /**
     * 技术白皮书随书代码示例
     * 模板引擎
     *
     * @author XiongChun
     * @since 2011-03-29
     */
    public static void main(String[] args) {
        //testTplFIle();
        testTplString();
    }

    /**
     * 文件模版
     */
    private static void testTplFIle() {
        GeneralDao generalDao = SpringContextHolder.getBean("generalDao");
        //List为UserVo对象的集合
        List userList = generalDao.queryForList("Demo.queryUserInfo4Doc");
        Dto dto = new BaseDto();
        dto.put("userList", userList);
        dto.put("title", "UserInfo List");
        TemplateEngine engine = TemplateEngineFactory.
                getTemplateEngine(TemplateType.VELOCITY);
        DefaultTemplate template = new FileTemplate();
        template.setTemplateResource("org/nxstudio/other/test/doctest/ccl/test.tpl");
        StringWriter writer = engine.mergeTemplate(template, dto);
        System.out.println(writer.toString());
    }

    /**
     * 字符串模版
     */
    private static void testTplString() {
        GeneralDao generalDao = (GeneralDao) SpringContextHolder.getBean("generalDao");
        //List为UserVo对象的集合
        List userList = generalDao.queryForList("Demo.queryUserInfo4Doc");
        Dto dto = new BaseDto();
        dto.put("userList", userList);
        dto.put("title", "UserInfo List");
        String tpl = "${title}:{#foreach($user in $userList)[userid:${user.userid}, username:${user.username}]#end}";
        TemplateEngine engine = TemplateEngineFactory.
                getTemplateEngine(TemplateType.VELOCITY);
        DefaultTemplate template = new StringTemplate(tpl);
        StringWriter writer = engine.mergeTemplate(template, dto);
        System.out.println(writer.toString());
    }

}
