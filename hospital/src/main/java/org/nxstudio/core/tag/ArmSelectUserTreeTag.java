package org.nxstudio.core.tag;

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
import org.nxstudio.core.vo.DeptVo;
import org.nxstudio.core.vo.UserVo;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.core.tag.tpl.tplengine.DefaultTemplate;
import org.nxstudio.core.tag.tpl.tplengine.FileTemplate;
import org.nxstudio.core.tag.tpl.tplengine.TemplateEngine;
import org.nxstudio.core.tag.tpl.tplengine.TemplateEngineFactory;
import org.nxstudio.core.tag.tpl.tplengine.TemplateType;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.core.tag.util.TagHelper;
import org.nxstudio.util.base.WebUtils;

/**
 * ArmSelectUserTreeTag标签:eRedG4_ARM专用
 *
 * @author XiongChun
 * @since 2010-05-22
 */
public class ArmSelectUserTreeTag extends TagSupport {

    private static Log log = LogFactory.getLog(ArmSelectUserTreeTag.class);

    /**
     * 标签开始
     */
    public int doStartTag() throws JspException {
        GeneralDao generalDao = SpringContextHolder.getBean("generalDao");
        HttpServletRequest request = (HttpServletRequest) this.pageContext.getRequest();
        String deptid = request.getParameter("deptid");
        String roletype = request.getParameter("roletype");
        Dto deptDto = new BaseDto();
        deptDto.put("deptid", deptid);
        List deptList = generalDao.queryForList("ArmTagSupport.queryDeptsForRoleGrant", deptDto);
        List userList = new ArrayList();
        Dto userDto = new BaseDto();
        //角色类型和用户类型代码是对应的
        userDto.put("usertype", roletype);
        if (roletype.equals("1")) {
            //注册用户
            //userDto.put("usertype4", "4");
        }
        for (int i = 0; i < deptList.size(); i++) {
            DeptVo deptVo = (DeptVo) deptList.get(i);
            if (deptVo.getDeptid().equals(deptid)) {
                deptVo.setIsroot("true");
            }
            userDto.put("deptid", deptVo.getDeptid());
            List tempList = generalDao.queryForList("ArmTagSupport.queryUsersForRoleGrant", userDto);
            userList.addAll(tempList);
        }
        Dto grantDto = new BaseDto();
        grantDto.put("roleid", request.getParameter("roleid"));
        List grantList = generalDao.queryForList("ArmTagSupport.queryGrantedUsersByRoleId", grantDto);
        for (int i = 0; i < userList.size(); i++) {
            UserVo userVo = (UserVo) userList.get(i);
            String usertypeString = WebUtils.getCodeDesc("USERTYPE", userVo.getUsertype(), request);
            String usernameString = userVo.getUsername();
            usernameString += "[" + userVo.getAccount() + ", " + usertypeString + "]";
            userVo.setUsername(usernameString);
            if (checkGrant(grantList, userVo.getUserid())) {
                userVo.setChecked("true");
            }
        }
        Dto dto = new BaseDto();
        dto.put("deptList", deptList);
        dto.put("userList", userList);
        dto.put("deptid", deptid);
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
     * 检查授权
     *
     * @param grantList
     * @param pUserid
     * @return
     */
    private boolean checkGrant(List grantList, String pUserid) {
        Boolean result = new Boolean(false);
        for (int i = 0; i < grantList.size(); i++) {
            Dto dto = (BaseDto) grantList.get(i);
            if (pUserid.equals(dto.getAsString("userid"))) {
                result = new Boolean(true);
            }
        }
        return result.booleanValue();
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
