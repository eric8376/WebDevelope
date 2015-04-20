package org.nxstudio.core.tag.ext;

import java.io.IOException;
import java.io.StringWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.core.tag.tpl.tplengine.DefaultTemplate;
import org.nxstudio.core.tag.tpl.tplengine.FileTemplate;
import org.nxstudio.core.tag.tpl.tplengine.TemplateEngine;
import org.nxstudio.core.tag.tpl.tplengine.TemplateEngineFactory;
import org.nxstudio.core.tag.tpl.tplengine.TemplateType;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.core.constant.TagConstant;
import org.nxstudio.core.tag.util.TagHelper;
import org.nxstudio.util.base.WebUtils;

/**
 * CodeRenderTag标签<br>
 * 导入Ext扩展组件的CSS、JS资源
 *
 * @author XiongChun
 * @since 2010-01-30
 */
public class CodeRenderTag extends TagSupport {

    private static Log log = LogFactory.getLog(CodeRenderTag.class);
    private String fields;

    /**
     * 标签开始
     */
    public int doStartTag() throws JspException {
        HttpServletRequest request = (HttpServletRequest) pageContext.getRequest();
        StringBuffer sb = new StringBuffer();
        sb.append(TagConstant.SCRIPT_START);
        Dto dto = new BaseDto();
        String[] arrayFields = fields.split(",");
        TemplateEngine engine = TemplateEngineFactory.getTemplateEngine(TemplateType.VELOCITY);
        DefaultTemplate template = new FileTemplate();
        template.setTemplateResource(TagHelper.getTemplatePath(getClass().getName()));
        for (int i = 0; i < arrayFields.length; i++) {
            List codeList = WebUtils.getCodeListByField(arrayFields[i], request);
            dto.put("codeList", codeList);
            dto.put("field", arrayFields[i]);
            StringWriter writer = engine.mergeTemplate(template, dto);
            sb.append(writer.toString());
        }
        sb.append(TagConstant.SCRIPT_END);
        try {
            pageContext.getOut().write(sb.toString());
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
        fields = null;
        super.release();
    }

    public void setFields(String fields) {
        this.fields = fields;
    }

}
