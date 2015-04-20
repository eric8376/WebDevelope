package org.nxstudio.core.tag;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.nxstudio.core.dao.base.GeneralDao;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.core.tag.tpl.tplengine.*;
import org.nxstudio.core.tag.util.TagHelper;
import org.nxstudio.core.vo.DeptVo;
import org.nxstudio.core.vo.RoleVo;
import org.nxstudio.util.base.WebUtils;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.util.spring.SpringContextHolder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;
import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

/**
 * ArmSelectRoleTreeTag标签:eRedG4_ARM专用
 *
 * @author XiongChun
 * @since 2010-05-22
 */
public class ArmSelectRoleTreeTag extends TagSupport {

    private static Log log = LogFactory.getLog(ArmSelectRoleTreeTag.class);

    /**
     * 标签开始
     */
    public int doStartTag() throws JspException {
        GeneralDao generalDao = SpringContextHolder.getBean("generalDao");
        HttpServletRequest request = (HttpServletRequest) this.pageContext.getRequest();
        String deptid = request.getParameter("deptid");
        String usertype = request.getParameter("usertype");
        Dto deptDto = new BaseDto();
        deptDto.put("deptid", deptid);
        List deptList = generalDao.queryForList("ArmTagSupport.queryDeptsForUserGrant", deptDto);
        List roleList = new ArrayList();
        Dto roleDto = new BaseDto();
        //角色类型和用户类型代码是对应的
        //经办员和注册人员属于业务经办角色
        if (usertype.equals("4")) {
            //usertype = "1";
        }
        roleDto.put("roletype", usertype);
        for (int i = 0; i < deptList.size(); i++) {
            DeptVo deptVo = (DeptVo) deptList.get(i);
            if (deptVo.getDeptid().equals(deptid)) {
                deptVo.setIsroot("true");
            }
            roleDto.put("deptid", deptVo.getDeptid());
            List tempList = generalDao.queryForList("ArmTagSupport.queryRolesForUserGrant", roleDto);
            roleList.addAll(tempList);
        }
        Dto grantDto = new BaseDto();
        grantDto.put("userid", request.getParameter("userid"));
        List grantList = generalDao.queryForList("ArmTagSupport.queryGrantedRolesByUserId", grantDto);
        for (int i = 0; i < roleList.size(); i++) {
            RoleVo roleVo = (RoleVo) roleList.get(i);
            String roletypeString = WebUtils.getCodeDesc("ROLETYPE", roleVo.getRoletype(), request);
            String rolenameString = roleVo.getRolename();
            rolenameString += "[" + roletypeString + "]";
            roleVo.setRolename(rolenameString);
            if (checkGrant(grantList, roleVo.getRoleid())) {
                roleVo.setChecked("true");
            }
        }
        Dto dto = new BaseDto();
        dto.put("deptList", deptList);
        dto.put("roleList", roleList);
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
     * @param pRoleid
     * @return
     */
    private boolean checkGrant(List grantList, String pRoleid) {
        Boolean result = new Boolean(false);
        for (int i = 0; i < grantList.size(); i++) {
            Dto dto = (BaseDto) grantList.get(i);
            if (pRoleid.equals(dto.getAsString("roleid"))) {
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
