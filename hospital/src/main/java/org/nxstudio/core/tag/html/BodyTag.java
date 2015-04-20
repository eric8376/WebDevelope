package org.nxstudio.core.tag.html;

import java.io.IOException;
import java.io.StringWriter;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.core.tag.tpl.tplengine.DefaultTemplate;
import org.nxstudio.core.tag.tpl.tplengine.StringTemplate;
import org.nxstudio.core.tag.tpl.tplengine.TemplateEngine;
import org.nxstudio.core.tag.tpl.tplengine.TemplateEngineFactory;
import org.nxstudio.core.tag.tpl.tplengine.TemplateType;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.core.tag.util.TagHelper;

/**
 * Body标签
 *
 * @author XiongChun
 * @since 2010-01-30
 */
public class BodyTag extends TagSupport {

    private static Log log = LogFactory.getLog(BodyTag.class);
    private String onload;
    private String any;
    private String cls;

    /**
     * 标签开始
     */
    public int doStartTag() throws JspException {
        Dto dto = new BaseDto();
        dto.put("onload", TagHelper.checkEmpty(onload));
        dto.put("any", TagHelper.checkEmpty(any));
        dto.put("cls", TagHelper.checkEmpty(cls));
        String tpl = "</head><body #if(${cls}!=*off*)class=*${cls}*#end #if(${onload}!=*off*)onload=*${onload}*#end #if(${any}!=*off*)${any}#end>";
        TemplateEngine engine = TemplateEngineFactory.getTemplateEngine(TemplateType.VELOCITY);
        DefaultTemplate template = new StringTemplate(TagHelper.replaceStringTemplate(tpl));
        StringWriter writer = engine.mergeTemplate(template, dto);
        try {
            pageContext.getOut().write(writer.toString());
        } catch (IOException e) {
            log.error(G4Constants.Exception_Head + e.getMessage());
            e.printStackTrace();
        }
        return super.EVAL_BODY_INCLUDE;
    }

    /**
     * 标签结束
     *
     * @param onload
     */
    public int doEndTag() throws JspException {
        try {
            pageContext.getOut().write("</body>");
        } catch (IOException e) {
            log.error(G4Constants.Exception_Head + e.getMessage());
            e.printStackTrace();
        }
        return super.EVAL_PAGE;
    }

    /**
     * 释放资源
     */
    public void release() {
        any = null;
        cls = null;
        onload = null;
        super.release();
    }

    public void setOnload(String onload) {
        this.onload = onload;
    }

    public void setAny(String any) {
        this.any = any;
    }

    public void setCls(String cls) {
        this.cls = cls;
    }

}
