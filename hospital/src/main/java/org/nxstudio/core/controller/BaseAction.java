package org.nxstudio.core.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.nxstudio.core.dao.Reader;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.json.JsonHelper;
import org.nxstudio.util.properties.PropertiesFactory;
import org.nxstudio.util.properties.PropertiesFile;
import org.nxstudio.util.properties.PropertiesHelper;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.core.listeners.SessionContainer;
import org.nxstudio.util.base.WebUtils;
import org.nxstudio.core.model.CommonActionForm;
import org.nxstudio.util.spring.SpringContextHolder;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * DispatchAction基类
 *
 * @author XiongChun
 * @see org.apache.struts.actions.DispatchAction
 * @since 2009-09-03
 */

public class BaseAction {
    public CommonActionForm form = new CommonActionForm();
    @Autowired
    public ServletContext servletContext;

    @Autowired
    protected Reader g4Reader;

    protected static PropertiesHelper g4PHelper = PropertiesFactory.getPropertiesHelper(PropertiesFile.G4);

    /**
     * 从服务容器中获取服务组件
     *
     * @param pBeanId
     * @return
     */
    protected Object getService(String pBeanId) {
        Object springBean = SpringContextHolder.getBean(pBeanId);
        return springBean;
    }

    /**
     * 获取一个Session属性对象
     *
     * @param request
     * @return
     */
    protected Object getSessionAttribute(HttpServletRequest request, String sessionKey) {
        Object objSessionAttribute = null;
        HttpSession session = request.getSession(false);
        if (session != null) {
            objSessionAttribute = session.getAttribute(sessionKey);
        }
        return objSessionAttribute;
    }

    /**
     * 设置一个Session属性对象
     *
     * @param request
     * @return
     */
    protected void setSessionAttribute(HttpServletRequest request, String sessionKey, Object objSessionAttribute) {
        HttpSession session = request.getSession();
        if (session != null)
            session.setAttribute(sessionKey, objSessionAttribute);
    }

    /**
     * 移除Session对象属性值
     *
     * @param request
     * @return
     */
    protected void removeSessionAttribute(HttpServletRequest request, String sessionKey) {
        HttpSession session = request.getSession();
        if (session != null)
            session.removeAttribute(sessionKey);
    }

    /**
     * 获取一个SessionContainer容器,如果为null则创建之
     */
    protected SessionContainer getSessionContainer(HttpServletRequest request) {
        SessionContainer sessionContainer = (SessionContainer) this.getSessionAttribute(request, "SessionContainer");
        if (sessionContainer == null) {
            sessionContainer = new SessionContainer();
            HttpSession session = request.getSession(true);
            session.setAttribute("SessionContainer", sessionContainer);
        }
        return sessionContainer;
    }

    /**
     * 将请求参数封装为Dto
     *
     * @param request
     * @return
     */
    protected static Dto getParamAsDto(HttpServletRequest request) {
        return WebUtils.getParamAsDto(request);
    }

    /**
     * 获取代码对照值
     *
     * @param request
     * @return
     */
    protected String getCodeDesc(String pField, String pCode, HttpServletRequest request) {
        return WebUtils.getCodeDesc(pField, pCode, request);
    }

    /**
     * 根据代码类别获取代码表列表
     *
     * @param request
     * @return
     */
    protected List getCodeListByField(String pField, HttpServletRequest request) {
        return WebUtils.getCodeListByField(pField, request);
    }

    /**
     * 获取全局参数值
     *
     * @param pParamKey 参数键名
     * @return
     */
    protected String getParamValue(String pParamKey, HttpServletRequest request) {
        return WebUtils.getParamValue(pParamKey, request);
    }

    /**
     * 输出响应
     *
     * @param str
     * @throws java.io.IOException
     */
    protected void write(String str, HttpServletResponse response) throws IOException {
        response.getWriter().write(str);
        response.getWriter().flush();
        response.getWriter().close();
    }

    /**
     * 直接将List转为分页所需要的Json资料格式
     *
     * @param list       需要编码的List对象
     * @param totalCount 记录总数
     */
    protected String encodeList2PageJson(List list, Integer totalCount, String dataFormat) {
        return JsonHelper.encodeList2PageJson(list, totalCount, dataFormat);
    }

    /**
     * 将数据系列化为表单数据填充所需的Json格式
     *
     * @param pFormatString 日期时间格式化,如果为null则认为没有日期时间型字段
     * @return
     */
    protected String encodeDto2FormLoadJson(Dto pDto, String pFormatString) {
        return JsonHelper.encodeDto2FormLoadJson(pDto, pFormatString);
    }

    /**
     * 将数据系列化为Json格式
     *
     * @param pObject       待系列化的对象
     * @param pFormatString 日期时间格式化,如果为null则认为没有日期时间型字段
     * @return
     */
    protected String encodeObject2Json(Object pObject, String pFormatString) {
        return JsonHelper.encodeObject2Json(pObject, pFormatString);
    }

    /**
     * 将数据系列化为Json格式
     *
     * @param pObject 待系列化的对象
     * @return
     */
    protected String encodeObjectJson(Object pObject) {
        return JsonHelper.encodeObject2Json(pObject);
    }

    /**
     * 交易成功提示信息
     *
     * @param pMsg 提示信息
     * @return
     * @throws java.io.IOException
     */

    protected void setOkTipMsg(String pMsg, HttpServletResponse response) throws IOException {
        Dto outDto = new BaseDto(G4Constants.TRUE, pMsg);
        write(outDto.toJson(), response);
    }

    /**
     * 交易失败提示信息(特指：业务交易失败并不是请求失败)<br>
     * 和Form的submit中的failur回调对应,Ajax.request中的failur回调是指请求失败
     *
     * @param pMsg 提示信息
     * @return
     * @throws java.io.IOException
     */
    protected void setErrTipMsg(String pMsg, HttpServletResponse response) throws IOException {
        Dto outDto = new BaseDto(G4Constants.FALSE, pMsg);
        write(outDto.toJson(), response);
    }


}
