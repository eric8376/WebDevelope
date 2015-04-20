package org.nxstudio.modules.tool.controller;

import org.nxstudio.core.controller.BaseAction;
import org.nxstudio.core.dao.base.GeneralDao;
import org.nxstudio.plugin.pagination.Page;
import org.nxstudio.modules.tool.service.IDriveService;
import org.nxstudio.util.code.CodeHelper;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.json.JsonHelper;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.core.model.CommonActionForm;
import org.nxstudio.util.spring.SpringContextUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【未命题】
 * 时间: 2013-06-15 下午2:20
 */
@Controller
@RequestMapping("/Quick")
public class CommonAction extends BaseAction {
    //公共service
    //驱动service
    private IDriveService driveService;

    @Autowired
    @Qualifier("generalDao")
    private GeneralDao generalDao;

    /**
     * 插入数据
     */
    @RequestMapping(params = "reqCode=addData")
    public String addData(HttpServletRequest request, HttpServletResponse response) throws Exception {
        if (getSessionContainer(request).getUserInfo() == null) {
            response.sendError(999);
            return "null";
        }

        //取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);
        pDto = build(request, pDto);

        //service
        Object obj = generalDao.save(getClass(pDto.getAsString("entityClass")), pDto);
        String jsonString = JsonHelper.encodeObject2Json(obj, G4Constants.FORMAT_DateTime);

        setOkTipMsg(jsonString, response);
        return "null";
    }

    /**
     * 删除数据
     */
    @RequestMapping(params = "reqCode=delData")
    public String delData(HttpServletRequest request, HttpServletResponse response) throws Exception {
        if (getSessionContainer(request).getUserInfo() == null) {
            response.sendError(999);
            return "null";
        }

        //取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);
        pDto = build(request, pDto);

        //service
        generalDao.deleteObject(getClass(pDto.getAsString("entityClass")), pDto);

        setOkTipMsg("已删除！", response);
        return "null";
    }

    /**
     * 修改数据
     */
    @RequestMapping(params = "reqCode=updData")
    public String updData(HttpServletRequest request, HttpServletResponse response) throws Exception {
        if (getSessionContainer(request).getUserInfo() == null) {
            response.sendError(999);
            return "null";
        }

        //取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);
        pDto = build(request, pDto);

        //service
        generalDao.update(getClass(pDto.getAsString("entityClass")), pDto);

        setOkTipMsg("已更新！", response);
        return "null";
    }

    /**
     * 查询.
     */
    @RequestMapping(params = "reqCode=listAll")
    public String listAll(HttpServletRequest request, HttpServletResponse response) throws Exception {
        if (getSessionContainer(request).getUserInfo() == null) {
            response.sendError(999);
            return "null";
        }


        //取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);
        pDto = build(request, pDto);

        //分页Dto设置
        Dto pageDto = null;
        if (pDto.get("start") != null & pDto.get("limit") != null && (pDto.get("isPage") == null || pDto.getAsBoolean("isPage"))) {
            pageDto = new BaseDto();
            pageDto.put("start", pDto.getAsInteger("start"));
            pageDto.put("limit", pDto.getAsInteger("limit"));
            pDto.remove("start");
            pDto.remove("limit");
        }

        //设置前后sql
        Dto quickSql = generalDao.getBySql("columns,after_sql", "from t_sb_quick_sql where ref_no='" + pDto.getAsString("ref_no") + "'");
        pDto.remove("ref_no");
        String columns = quickSql.getAsString("columns");
        String afterSql = build(quickSql.getAsString("after_sql"), pDto);

        //查询并输出Json
        Page page = generalDao.listPageBySql(columns, afterSql, pageDto);
        String jsonString = JsonHelper.encodeList2PageJson(page.getItems(), page.getContext().getTotal(), G4Constants.FORMAT_DateTime);
        super.write(jsonString, response);

        return "null";
    }

    /**
     * 扩展功能（驱动Service动态加载方法)
     * 直接执行Service,起到批处理业务时 同步事务的效果
     */
    @RequestMapping(params = "reqCode=exec")
    public String exec(HttpServletRequest request, HttpServletResponse response) throws Exception {
        if (getSessionContainer(request).getUserInfo() == null) {
            response.sendError(999);
            return "null";
        }

        //取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);
        pDto = build(request, pDto);

        //实例化驱动Service
        driveService = (IDriveService) SpringContextUtil.getBean(pDto.getAsString("exec_target"));

        //调用某个方法
        String method = pDto.getAsString("exec_method");
        Dto outDto = driveService.dobatch(method, pDto);

        //格式化返回字符串
        String jsonString = "";
        if (outDto == null) {
            super.write(jsonString, response);
            return null;
        }
        if (outDto.containsKey("gridFlag_")) {
            //表格数据形式
            jsonString = JsonHelper.encodeObject2Json(outDto.get("data"), G4Constants.FORMAT_DateTime);
        } else if (outDto.containsKey("PublishStatue")) {
            jsonString = outDto.getAsString("PublishStatue");
        } else if (!outDto.containsKey("gridFlag_")) {
            //其它数据形式
            jsonString = JsonHelper.encodeObject2Json(outDto, G4Constants.FORMAT_DateTime);
        }

        super.write(jsonString, response);

        //只做业务处理，所以不返回页面
        return null;
    }

    /**
     * 获取条形码、或者矩形码图片
     */
    @RequestMapping(params = "reqCode=getCodeImg")
    public String getCodeImg(HttpServletRequest request, HttpServletResponse response) throws Exception {
        if (getSessionContainer(request).getUserInfo() == null) {
            response.sendError(999);
            return "null";
        }

        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        response.setHeader("Content-Disposition", "attachment; filename=" + pDto.getAsString("code") + ";");
        response.setContentType("image");
        ByteArrayOutputStream out = CodeHelper.generateByteArray(pDto.getAsInteger("model"), pDto.getAsString("code") + "&" + getSessionContainer(request).getUserInfo().getAccount());
        ServletOutputStream os = response.getOutputStream();
        os.write(out.toByteArray());
        os.flush();
        os.close();

        return null;
    }


    //-------------------本类私有方法--------------------

    /**
     * 仿Ibatis 编译参数
     * 替换规则如下
     * #xx#      'xx'
     * $xx$       xx
     * {dd}       yyyy-mm-dd
     * [DD]       yyyy-mm-dd hh24:mi:ss
     */
    private String build(String targetString, Dto refDto) {
        if (targetString.toUpperCase().indexOf("SEARCHKEY") != -1 && G4Utils.isEmpty(refDto.getAsString("searchKey"))) {
            targetString = targetString.replaceAll("#searchKey#", "'%%'");
        }
        Iterator iterator = refDto.keySet().iterator();
        //替换参数
        while (iterator.hasNext()) {
            String key = iterator.next().toString();
            targetString = targetString.replaceAll("#" + key + "#", "'" + refDto.getAsString(key) + "'");
            targetString = targetString.replaceAll("[$]" + key + "[$]", refDto.getAsString(key));
            targetString = targetString.replaceAll("[{]" + key + "[}]", "to_date('" + refDto.getAsString(key) + "','yyyy-mm-dd')");
            targetString = targetString.replaceAll("\\[" + key + "\\]", "to_date('" + refDto.getAsString(key) + "','yyyy-mm-dd hh24:mi:ss')");
        }

        return targetString;
    }

    /**
     * 引用服务器参数
     * {userid}             用户id
     * {useraccount}        用户登录账号
     * {sysdate}            系统当前时间
     */
    private Dto build(HttpServletRequest request, Dto refDto) {
        List params = Arrays.asList("{userid}", "{sysdate}", "{useraccount}");
        Iterator iterator = refDto.keySet().iterator();

        //替换参数
        while (iterator.hasNext()) {
            String key = iterator.next().toString();
            switch (params.indexOf(refDto.getAsString(key))) {
                case 0:
                    refDto.put(key, getSessionContainer(request).getUserInfo().getUserid());
                    break;
                case 1:
                    refDto.put(key, new Date());
                    break;
                case 2:
                    refDto.put(key, getSessionContainer(request).getUserInfo().getAccount());
                    break;
            }
        }

        return refDto;
    }

    /**
     * 根据类全名加载该类
     */
    private Class getClass(String className) throws ClassNotFoundException {
        try {
            return Class.forName(className);
        } catch (ClassNotFoundException e) {
            throw new ClassNotFoundException("系统找不到该对象【" + className + "】");
        }
    }


}
