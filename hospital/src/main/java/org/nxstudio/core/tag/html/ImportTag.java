package org.nxstudio.core.tag.html;

import java.io.File;
import java.io.IOException;
import java.io.StringWriter;

import javax.servlet.http.HttpServletRequest;
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
 * Import标签<br>
 * 导入CSS、JS资源
 *
 * @author XiongChun
 * @since 2010-01-30
 */
public class ImportTag extends TagSupport {

    private static Log log = LogFactory.getLog(ImportTag.class);
    private String src;

    /**
     * 标签开始
     */
    public int doStartTag() throws JspException {
        HttpServletRequest request = (HttpServletRequest) pageContext.getRequest();
        String tpl = "#if($type==*css*)<link rel=*stylesheet* type=*text/css* href=*$src*/>#elseif($type==*js*)<script type=*text/javascript* src=*$src* ></script>#end";
        Dto dto = new BaseDto();
        dto.put("type", src.indexOf(".css") == -1 ? "js" : "css");
        String filePath = request.getContextPath() + src;

        File file = new File("src\\main\\webapp" + src);
        if (file.exists())
            filePath += "?t=" + file.lastModified();
        dto.put("src", filePath);
        TemplateEngine engine = TemplateEngineFactory.getTemplateEngine(TemplateType.VELOCITY);
        DefaultTemplate template = new StringTemplate(TagHelper.replaceStringTemplate(tpl));
        StringWriter writer = engine.mergeTemplate(template, dto);
        try {
            pageContext.getOut().write(writer.toString());
        } catch (IOException e) {
            log.error(G4Constants.Exception_Head + e.getMessage());
            e.printStackTrace();
        }
        return super.SKIP_BODY;
    }

    /**
     * 标签结束
     */
    public int doEndTag() throws JspException {
        return super.EVAL_PAGE;
    }

    /**
     * 释放资源
     */
    public void release() {
        src = null;
        super.release();
    }

    public void setSrc(String src) {
        this.src = src;
    }
}
