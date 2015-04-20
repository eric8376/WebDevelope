package org.nxstudio.core.controller;

import org.nxstudio.util.g4.G4Utils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * <pre>获取系统信息</pre>
 * <br>
 * <pre>所属模块：获取系统信息控制层</pre>
 *
 * @author 黄琦鸿
 *         创建于  2014/10/22 18:14.
 */

@Controller
@RequestMapping("/G4utilAction")
public class G4utilAction extends BaseAction {
    /**
     * 获取系统当前时间
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=getCurDate")
    public String getCurDate(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String curDate = G4Utils.getCurDate("yyyy/MM/dd HH:mm:ss");
        write(curDate, response);
        return null;
    }

    /**
     * 获取GUID
     *
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=getGUID")
    public String getGUID(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String GUID = G4Utils.GenerateGUID();
        GUID = GUID.replaceAll("-", "");
        write(GUID, response);
        return null;
    }
}
