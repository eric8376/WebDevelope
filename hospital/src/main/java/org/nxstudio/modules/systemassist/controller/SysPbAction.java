package org.nxstudio.modules.systemassist.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.nxstudio.core.controller.BaseAction;
import org.nxstudio.modules.systemassist.service.ISysPbService;
import org.nxstudio.core.model.Dto;
import org.nxstudio.util.json.JsonHelper;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.core.model.CommonActionForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【排班】
 * 时间: 2013-06-10 下午4:36
 */
@Controller
@RequestMapping("/SysPbAction")
public class SysPbAction extends BaseAction {
    @Autowired
    // 排班业务层
    private ISysPbService sysPbService;

    /**
     * 查询部门树（普通树）
     */
    @RequestMapping(params = "reqCode=queryDeptTree")
    public String queryDeptTree(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 参数
        CommonActionForm cForm = new CommonActionForm();
        Dto pDto = cForm.getParamAsDto(request);
        String node = pDto.getAsString("node");

        //增加可以设置根目录部门 设置规则  root-【部门id】
        String[] parseStrs = node.split("-");
        if (parseStrs.length == 2 && parseStrs[0].equals("root")) {
            pDto.put("deptid", parseStrs[1]);
            Dto rootDto = (Dto) g4Reader.queryForObject("EAOrg.selectEADEPT", pDto);
            rootDto.put("id", rootDto.getAsString("deptid"));
            rootDto.put("text", rootDto.getAsString("deptname"));
            rootDto.put("expanded", false);
            rootDto.put("leaf", rootDto.getAsInteger("leaf") == 1);

            String jsonString = JsonHelper.encodeObject2Json(rootDto);
            super.write("[" + jsonString + "]", response);
            return "null";
        }

        if (node.equals("root")) {
            pDto.put("parentid", "0");
        } else {
            pDto.put("parentid", node);
        }

        // 查询
        List list = g4Reader.queryForList("EAOrg.queryEADEPT", pDto);

        // 转换成树数据...
        for (int i = 0; i < list.size(); i++) {
            Dto dto = (Dto) list.get(i);
            dto.put("id", dto.getAsString("deptid"));
            dto.put("text", dto.getAsString("deptname"));
            dto.put("expanded", false);
            dto.put("leaf", dto.getAsInteger("leaf") == 1);
            list.set(i, dto);
        }

        // 转换成json
        String jsonString = JsonHelper.encodeObject2Json(list);
        super.write(jsonString, response);

        return "null";
    }

    /**
     * 查询部门树包括部门下的用户（无复选框普通树）
     */
    @RequestMapping(params = "reqCode=queryDeptTreeWithUser1")
    public String queryDeptTreeWithUser1(HttpServletRequest request,
                                         HttpServletResponse response) throws Exception {
        // 参数
        CommonActionForm cForm = new CommonActionForm();
        Dto pDto = cForm.getParamAsDto(request);
        String node = pDto.getAsString("node");

        // dao
        List list = new ArrayList();
        if (node.equals("root")) {
            pDto.put("parentid", "0");
        } else {
            pDto.put("parentid", node);
        }

        // 查询部门
        list = g4Reader.queryForList("EAOrg.queryEADEPT", pDto);

        // 查询用户
        if (list.size() == 0) {
            pDto.put("deptid", node);
            list = g4Reader.queryForList("EAOrg.queryEaUser", pDto);
            // 转换成树数据...
            for (int i = 0; i < list.size(); i++) {
                Dto dto = (Dto) list.get(i);
                dto.put("id", dto.getAsString("userid"));
                dto.put("text", dto.getAsString("username"));
                dto.put("expanded", false);
                dto.put("leaf", true);
                list.set(i, dto);
            }
        } else {
            // 转换成树数据...
            for (int i = 0; i < list.size(); i++) {
                Dto dto = (Dto) list.get(i);
                dto.put("id", dto.getAsString("deptid"));
                dto.put("text", dto.getAsString("deptname"));
                dto.put("expanded", node.equals("root"));
                dto.put("leaf", false);
                list.set(i, dto);
            }
        }

        // 转换成json
        String jsonString = JsonHelper.encodeObject2Json(list);
        super.write(jsonString, response);

        return "null";
    }

    /**
     * 查询部门树包括部门下的用户（复选框）
     */
    @RequestMapping(params = "reqCode=queryDeptTreeWithUser")
    public String queryDeptTreeWithUser(HttpServletRequest request,
                                        HttpServletResponse response) throws Exception {
        // 参数
        CommonActionForm cForm = new CommonActionForm();
        Dto pDto = cForm.getParamAsDto(request);
        String node = pDto.getAsString("node");

        // dao
        List list = new ArrayList();
        if (node.equals("root")) {
            pDto.put("parentid", "0");
        } else {
            pDto.put("parentid", node);
        }

        // 查询部门
        list = g4Reader.queryForList("EAOrg.queryEADEPT", pDto);

        // 查询用户
        if (list.size() == 0) {
            pDto.put("deptid", node);
            list = g4Reader.queryForList("EAOrg.queryEaUser", pDto);
            // 转换成树数据...
            for (int i = 0; i < list.size(); i++) {
                Dto dto = (Dto) list.get(i);
                dto.put("id", dto.getAsString("userid"));
                dto.put("text", dto.getAsString("username"));
                dto.put("expanded", false);
                dto.put("leaf", true);
                dto.put("checked", false);
                list.set(i, dto);
            }
        } else {
            // 转换成树数据...
            for (int i = 0; i < list.size(); i++) {
                Dto dto = (Dto) list.get(i);
                dto.put("id", dto.getAsString("deptid"));
                dto.put("text", dto.getAsString("deptname"));
                dto.put("expanded", true);
                dto.put("leaf", false);
                list.set(i, dto);
            }
        }

        // 转换成json
        String jsonString = JsonHelper.encodeObject2Json(list);
        super.write(jsonString, response);

        return "null";
    }

    /**
     * 查询部门树包括部门下的用户（用户和部门均用复选框）
     */
    @RequestMapping(params = "reqCode=queryDeptTreeWithUser2")
    public String queryDeptTreeWithUser2(HttpServletRequest request,
                                         HttpServletResponse response) throws Exception {
        // 参数
        CommonActionForm cForm = new CommonActionForm();
        Dto pDto = cForm.getParamAsDto(request);
        String node = pDto.getAsString("node");

        // dao
        List list = new ArrayList();
        if (node.equals("root")) {
            pDto.put("parentid", "0");
        } else {
            pDto.put("parentid", node);
        }

        // 查询部门
        list = g4Reader.queryForList("EAOrg.queryEADEPT", pDto);

        // 查询用户
        if (list.size() == 0) {
            pDto.put("deptid", node);
            list = g4Reader.queryForList("EAOrg.queryEaUser", pDto);
            // 转换成树数据...
            for (int i = 0; i < list.size(); i++) {
                Dto dto = (Dto) list.get(i);
                dto.put("id", dto.getAsString("userid"));
                dto.put("text", dto.getAsString("username"));
                dto.put("expanded", false);
                dto.put("leaf", true);
                dto.put("checked", false);
                list.set(i, dto);
            }
        } else {
            // 转换成树数据...
            for (int i = 0; i < list.size(); i++) {
                Dto dto = (Dto) list.get(i);
                dto.put("id", dto.getAsString("deptid"));
                dto.put("text", dto.getAsString("deptname"));
                dto.put("expanded", false);
                if (dto.getAsString("leaf").equals("1")) {
                    dto.put("checked", false);
                }
                dto.put("leaf", false);
                list.set(i, dto);
            }
        }

        // 转换成json
        String jsonString = JsonHelper.encodeObject2Json(list);
        super.write(jsonString, response);

        return "null";
    }

    /**
     * 查询部门所使用的日历
     */
    @RequestMapping(params = "reqCode=queryCalendarOfDept")
    public String queryCalendarOfDept(HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {
        // 获取参数
        CommonActionForm cForm = new CommonActionForm();
        Dto pDto = cForm.getParamAsDto(request);

        // dao直接 查询
        List list = g4Reader.queryForList("sysPb.queryT_SB_DEPT_CALENDAR_R",
                pDto);

        // 转换成json
        String jsonString = JsonHelper.encodeList2PageJson(list, list.size(),
                G4Constants.FORMAT_Date);
        super.write(jsonString, response);

        return "null";
    }

    /**
     * 添加部门日历关系
     */
    @RequestMapping(params = "reqCode=addCalendarDeptR")
    public String addCalendarDeptR(HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        // 获取参数
        CommonActionForm cForm = new CommonActionForm();
        Dto pDto = cForm.getParamAsDto(request);

        // service
        Dto outDto = sysPbService.addCalendarDeptR(pDto);

        // 判断是否已添加
        if (outDto.getAsBoolean("success")) {
            setOkTipMsg("已添加", response);
        } else {
            setErrTipMsg("该部门已匹配好了日历，不需要再次进行匹配~", response);
        }

        return "null";
    }

    /**
     * 删除部门日历关系
     */
    @RequestMapping(params = "reqCode=delCalendarDeptR")
    public String delCalendarDeptR(HttpServletRequest request,
                                   HttpServletResponse response) throws Exception {
        // 获取参数
        CommonActionForm cForm = new CommonActionForm();
        Dto pDto = cForm.getParamAsDto(request);

        // service
        Dto outDto = sysPbService.delCalendarDeptR(pDto);

        setOkTipMsg("已删除", response);

        return "null";
    }

    /**
     * 查询规律排班信息
     */
    @RequestMapping(params = "reqCode=queryRegPbInfo")
    public String queryRegPbInfo(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 获取参数
        CommonActionForm cForm = new CommonActionForm();
        Dto pDto = cForm.getParamAsDto(request);

        // dao直接 查询(分页)
        List list = g4Reader.queryForPage("sysPb.queryT_SB_PB_MGR", pDto);
        int total = (Integer) g4Reader
                .queryForObject("sysPb.countT_SB_PB_MGR");

        // 转换成json
        String jsonString = JsonHelper.encodeList2PageJson(list, total,
                G4Constants.FORMAT_Date);
        super.write(jsonString, response);

        return "null";
    }

    /**
     * 查询某规律排班的对象信息
     */
    @RequestMapping(params = "reqCode=queryRegPbInfoMX")
    public String queryRegPbInfoMX(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 获取参数
        CommonActionForm cForm = new CommonActionForm();
        Dto pDto = cForm.getParamAsDto(request);

        // dao 查询
        List list = g4Reader.queryForList("sysPb.queryT_SB_PB_MGR_EMP", pDto);

        // 转换成json
        String jsonString = JsonHelper.encodeList2PageJson(list, list.size(), G4Constants.FORMAT_Date);
        super.write(jsonString, response);

        return "null";
    }

    /**
     * 添加规律排班信息
     */
    @RequestMapping(params = "reqCode=addRegPbInfo")
    public String addRegPbInfo(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 获取参数
        CommonActionForm cForm = new CommonActionForm();
        Dto pDto = cForm.getParamAsDto(request);

        // service
        Dto outDto = sysPbService.addRegPbInfo(pDto);

        // 判断是否已添加
        if (outDto.getAsBoolean("success")) {
            setOkTipMsg("已添加!", response);
        } else {
            setErrTipMsg("该日已经存在排班信息~", response);
        }

        return "null";
    }

    /**
     * 删除规律排班信息
     */
    @RequestMapping(params = "reqCode=delRegPbInfo")
    public String delRegPbInfo(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 获取参数
        CommonActionForm cForm = new CommonActionForm();
        Dto pDto = cForm.getParamAsDto(request);

        // service
        Dto outDto = sysPbService.delRegPbInfo(pDto);

        setOkTipMsg("已删除!", response);

        return "null";
    }

    /**
     * 更新规律排班信息
     */
    @RequestMapping(params = "reqCode=updRegPbInfo")
    public String updRegPbInfo(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 获取参数
        CommonActionForm cForm = new CommonActionForm();
        Dto pDto = cForm.getParamAsDto(request);

        // service
        Dto outDto = sysPbService.updRegPbInfo(pDto);

        setOkTipMsg("已保存!", response);

        return "null";
    }

    /**
     * 查询排班信息情况
     */
    @RequestMapping(params = "reqCode=queryPbInfo")
    public String queryPbInfo(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 获取参数
        CommonActionForm cForm = new CommonActionForm();
        Dto pDto = cForm.getParamAsDto(request);

        //查询
        List list = g4Reader.queryForPage("sysPb.queryT_SB_JOB_MGR_INFOS1", pDto);
        int total = (Integer) g4Reader.queryForObject("sysPb.countT_SB_JOB_MGR_INFOS", pDto);

        //转换json
        String jsonString = JsonHelper.encodeList2PageJson(list, total, G4Constants.FORMAT_Date);
        super.write(jsonString, response);

        return "null";
    }

    /**
     * 生成排班信息
     */
    @RequestMapping(params = "reqCode=createPbInfo")
    public String createPbInfo(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 获取参数
        CommonActionForm cForm = new CommonActionForm();
        Dto pDto = cForm.getParamAsDto(request);
        String userid = getSessionContainer(request).getUserInfo().getUserid();
        pDto.put("create_emp_no", userid);

        // service
        Dto outDto = sysPbService.createPbInfo(pDto);

        String jsonString = JsonHelper.encodeObject2Json(outDto,
                G4Constants.FORMAT_Date);

        // 返回生成信息
        setOkTipMsg(jsonString, response);

        return "null";
    }

}
