package org.nxstudio.core.tag.ext;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

import org.nxstudio.core.dao.base.GeneralDao;
import org.nxstudio.util.spring.SpringContextHolder;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.nxstudio.core.vo.UserInfoVo;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.core.tag.tpl.tplengine.DefaultTemplate;
import org.nxstudio.core.tag.tpl.tplengine.FileTemplate;
import org.nxstudio.core.tag.tpl.tplengine.TemplateEngine;
import org.nxstudio.core.tag.tpl.tplengine.TemplateEngineFactory;
import org.nxstudio.core.tag.tpl.tplengine.TemplateType;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.core.tag.util.TagHelper;
import org.nxstudio.util.base.WebUtils;

/**
 * UiGrant标签<br>
 * 实现UI元素授权
 *
 * @author XiongChun
 * @since 2011-09-30
 */
public class UiGrantTag extends TagSupport {

    private static Log log = LogFactory.getLog(UiGrantTag.class);


    /**
     * 标签开始
     */
    public int doStartTag() throws JspException {
        HttpServletRequest request = (HttpServletRequest) pageContext.getRequest();
        GeneralDao generalDao = (GeneralDao) SpringContextHolder.getBean("generalDao");
        Dto qDto = new BaseDto();
        UserInfoVo userInfoVo = WebUtils.getSessionContainer(request).getUserInfo();
        qDto.put("userid", userInfoVo.getUserid());
        qDto.put("menuid", request.getParameter("menuid4Log"));
        List roleGrantList = generalDao.queryForList("ArmTagSupport.getUiRoleGrantInfo", qDto);
        List userGrantList = generalDao.queryForList("ArmTagSupport.getUiUserGrantInfo", qDto);
        List grantList = new ArrayList();
        if (G4Utils.isNotEmpty(roleGrantList)) {
            grantList.addAll(roleGrantList);
        }
        if (G4Utils.isNotEmpty(userGrantList)) {
            grantList.addAll(userGrantList);
        }
        Dto dto = new BaseDto();
        dto.put("grantList", grantList);
        TemplateEngine engine = TemplateEngineFactory.getTemplateEngine(TemplateType.VELOCITY);
        DefaultTemplate template = new FileTemplate();
        template.setTemplateResource(TagHelper.getTemplatePath(getClass().getName()));
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
        super.release();
    }
}
