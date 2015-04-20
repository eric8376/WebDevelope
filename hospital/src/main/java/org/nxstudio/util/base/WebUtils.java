package org.nxstudio.util.base;

import org.nxstudio.core.dao.base.GeneralDao;
import org.nxstudio.core.listeners.SessionContainer;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.service.httpService.request.Request;
import org.nxstudio.util.g4.G4Utils;

import javax.servlet.ServletContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * 和Web层相关的实用工具类
 *
 * @author 熊春
 * @since 2008-09-22
 */
public class WebUtils {
    /**
     * 获取一个SessionContainer容器,如果为null则创建之
     *
     */
    public static SessionContainer getSessionContainer(
            HttpServletRequest request) {
        SessionContainer sessionContainer = (SessionContainer) request
                .getSession().getAttribute("SessionContainer");
        if (sessionContainer == null) {
            sessionContainer = new SessionContainer();
            HttpSession session = request.getSession(true);
            session.setAttribute("SessionContainer", sessionContainer);
        }
        return sessionContainer;
    }

    /**
     * 获取一个SessionContainer容器,如果为null则创建之
     */
    public static SessionContainer getSessionContainer(HttpSession session) {
        SessionContainer sessionContainer = (SessionContainer) session
                .getAttribute("SessionContainer");
        if (sessionContainer == null) {
            sessionContainer = new SessionContainer();
            session.setAttribute("SessionContainer", sessionContainer);
        }
        return sessionContainer;
    }

    /**
     * 获取一个Session属性对象
     *
     * @param request
     * @return
     */
    public static Object getSessionAttribute(HttpServletRequest request,
                                             String sessionKey) {
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
    public static void setSessionAttribute(HttpServletRequest request,
                                           String sessionKey, Object objSessionAttribute) {
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
    public static void removeSessionAttribute(HttpServletRequest request,
                                              String sessionKey) {
        HttpSession session = request.getSession();
        if (session != null)
            session.removeAttribute(sessionKey);
    }

    /**
     * 将请求参数封装为Dto
     *
     * @param request
     * @return
     */
    public static Dto getParamAsDto(HttpServletRequest request) {
        Dto dto = new BaseDto();
        Map map = request.getParameterMap();
        Iterator keyIterator = (Iterator) map.keySet().iterator();
        while (keyIterator.hasNext()) {
            String key = (String) keyIterator.next();
            String value = ((String[]) (map.get(key)))[0];
            dto.put(key, value);
        }
        return dto;
    }
    /**
     * 将请求参数封装为Dto
     *
     * @param request
     * @return
     */
    public static Dto getParamAsDto(Request request) {
        Dto dto = new BaseDto();
        Map map = request.getParamters();
        Iterator keyIterator = (Iterator) map.keySet().iterator();
        while (keyIterator.hasNext()) {
            String key = (String) keyIterator.next();
            String value = (String) map.get(key);
            dto.put(key, value);
        }
        return dto;
    }
    /**
     * 获取代码对照值
     *
     * @param request
     * @return
     */
    public static String getCodeDesc(String pField, String pCode,
                                     HttpServletRequest request) {
        List codeList = (List) request.getSession().getServletContext()
                .getAttribute("EACODELIST");
        String codedesc = null;
        for (int i = 0; i < codeList.size(); i++) {
            Dto codeDto = (BaseDto) codeList.get(i);
            if (pField.equalsIgnoreCase(codeDto.getAsString("field"))
                    && pCode.equalsIgnoreCase(codeDto.getAsString("code")))
                codedesc = codeDto.getAsString("codedesc");
        }
        return codedesc;
    }

    /**
     * 根据代码类别获取代码表列表
     *
     * @param request
     * @return
     */
    public static List getCodeListByField(String pField,
                                          HttpServletRequest request) {
        List codeList = (List) request.getSession().getServletContext()
                .getAttribute("EACODELIST");
        List lst = new ArrayList();
        if (null != codeList) {
            for (int i = 0; i < codeList.size(); i++) {
                Dto codeDto = (BaseDto) codeList.get(i);
                if (codeDto.getAsString("field").equalsIgnoreCase(pField)) {
                    lst.add(codeDto);
                }
            }
        }
        return lst;
    }


    /**
     * 根据代码类别获取代码表列表
     * 并排除不需要的字典
     *
     * @param request
     * @return
     */
    public static List getCodeListByFieldAndExclude(String pField, String[] excludeFieldId,
                                                    HttpServletRequest request) {
        List codeList = (List) request.getSession().getServletContext()
                .getAttribute("EACODELIST");
        List lst = new ArrayList();
        String fieldId = "";
        for (int m = 0; m < excludeFieldId.length; m++) {
            fieldId += excludeFieldId[m] + ",";
        }
        if (null != codeList) {
            for (int i = 0; i < codeList.size(); i++) {
                Dto codeDto = (BaseDto) codeList.get(i);
                if (fieldId.indexOf(codeDto.getAsString("code")) == -1) {
                    if (codeDto.getAsString("field").equalsIgnoreCase(pField)) {
                        lst.add(codeDto);
                    }
                }
            }
        }
        return lst;
    }

    /**
     * 获取全局参数值
     *
     * @param pParamKey 参数键名
     * @return
     */
    public static String getParamValue(String pParamKey,
                                       HttpServletRequest request) {
        String paramValue = "";
        ServletContext context = request.getSession().getServletContext();
        if (G4Utils.isEmpty(context)) {
            return "";
        }
        List paramList = (List) context.getAttribute("EAPARAMLIST");
        if (null != paramList) {
            for (int i = 0; i < paramList.size(); i++) {
                Dto paramDto = (BaseDto) paramList.get(i);
                if (pParamKey.equals(paramDto.getAsString("paramkey"))) {
                    paramValue = paramDto.getAsString("paramvalue");
                }
            }
        }
        return paramValue;
    }

    /**
     * 获取全局参数
     *
     * @return
     */
    public static List getParamList(HttpServletRequest request) {
        ServletContext context = request.getSession().getServletContext();
        if (G4Utils.isEmpty(context)) {
            return new ArrayList();
        }
        return (List) context.getAttribute("EAPARAMLIST");
    }

    /**
     * 获取指定Cookie的值
     *
     * @param cookies      cookie集合
     * @param cookieName   cookie名字
     * @param defaultValue 缺省值
     * @return
     */
    public static String getCookieValue(Cookie[] cookies, String cookieName,
                                        String defaultValue) {
        if (cookies == null) {
            return defaultValue;
        }
        for (int i = 0; i < cookies.length; i++) {
            Cookie cookie = cookies[i];
            if (cookieName.equals(cookie.getName()))
                return (cookie.getValue());
        }
        return defaultValue;
    }


    /**
     * 通过用户ID获取用户信息
     *
     * @param generalDao
     * @param userId
     * @return
     */
    public static Dto getUserInfoByUserId(GeneralDao generalDao, String userId, String account) {
        Dto dto = new BaseDto();
        if (userId != null) {
            dto.put("userid", userId);
        } else if (account != null) {
            dto.put("account", account);
        } else {
            return null;
        }
        List list = generalDao.queryForList("userSubInfo.getUserInfo", dto);
        if (list.size() != 0) {
            return ((Dto) list.get(0));
        }
        return null;
    }


    /**
     * 更具给定的字段和字段值以及内存属性名，从内存取出数据
     *
     * @param FieldName
     * @param fieldValue
     * @param attributekey
     * @param servletContext
     * @return
     */
    public static List getAttributeListByField(String FieldName, String fieldValue, String attributekey,
                                               ServletContext servletContext) {
        List AttList = (List) servletContext.getAttribute(attributekey);
        List lst = new ArrayList();
        if (null != AttList) {
            for (int i = 0; i < AttList.size(); i++) {
                Dto temp = (BaseDto) AttList.get(i);
                if (temp.getAsString(FieldName).equalsIgnoreCase(fieldValue)) {
                    lst.add(temp);
                }
            }
        }
        return lst;
    }

    /**
     * 通过给定的字段和字段值及内存属性名去获取符合条件的第一个数据
     *
     * @param FieldName
     * @param fieldValue
     * @param attributekey
     * @param servletContext
     * @return
     */
    public static Dto getAttributeDtoByField(String FieldName, String fieldValue, String attributekey,
                                             ServletContext servletContext) {
        List AttList = (List) servletContext.getAttribute(attributekey);
        Dto dto = null;
        if (null != AttList) {
            for (int i = 0; i < AttList.size(); i++) {
                Dto temp = (BaseDto) AttList.get(i);
                if (temp.getAsString(FieldName).equalsIgnoreCase(fieldValue)) {
                    dto = temp;
                    break;
                }
            }
        }
        return dto;
    }

    /**
     * 根据代码类别获取代码表列表,改列表只含指定字段
     *
     * @return
     */
    public static List getAttributeListFieldByField(String FieldName, String fieldValue, String att, String attributekey,
                                                    ServletContext servletContext) {
        List AttList = (List) servletContext.getAttribute(attributekey);
        List lst = new ArrayList();
        if (null != AttList) {
            for (int i = 0; i < AttList.size(); i++) {
                Dto temp = (BaseDto) AttList.get(i);

                if (temp.getAsString(FieldName).equalsIgnoreCase(fieldValue)) {
                    lst.add(temp.getAsString(att));
                }
            }
        }
        return lst;
    }

    /**
     * 根据代码类别和代码描述获取代码值
     *
     * @param request
     * @return
     */
    public static String getCode(String pField, String Desc,
                                 HttpServletRequest request) {
        List codeList = (List) request.getSession().getServletContext()
                .getAttribute("EACODELIST");
        String code = "";
        if (null != codeList) {
            for (int i = 0; i < codeList.size(); i++) {
                Dto codeDto = (BaseDto) codeList.get(i);
                if (codeDto.getAsString("field").equalsIgnoreCase(pField) && codeDto.getAsString("codedesc").equals(Desc)) {
                    code = codeDto.getAsString("code");
                    break;
                }
            }
        }
        return code;
    }
}



