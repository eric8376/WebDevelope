package org.nxstudio.modules.demo.other.controller;

import org.nxstudio.core.controller.BaseAction;
import org.nxstudio.core.model.CommonActionForm;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.modules.demo.other.service.ICMAppendixService;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.util.io.FileUpload;
import org.nxstudio.util.properties.PropertiesFactory;
import org.nxstudio.util.properties.PropertiesFile;
import org.nxstudio.util.properties.PropertiesHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【公共附件上传(中间关系表管理)】
 * 时间: 2013-06-10 下午4:36
 */
@Controller
@RequestMapping("/CMAppendixAction")
public class CMAppendixAction extends BaseAction {
    @Autowired
    // 附件服务类
    private ICMAppendixService appendixService;
    //读取配置文件
    private PropertiesHelper pHelper = PropertiesFactory.getPropertiesHelper(PropertiesFile.APP);


    /**
     * 上传附件
     */
    @RequestMapping(params = "reqCode=addAppendix")
    public String addAppendix(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 取表单
        List<MultipartFile> UploadFileInfo = FileUpload.getUploadFile(request);

        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);
        String fileKey = pDto.getAsString("fileKey");
        String upload_user = super.getSessionContainer(request).getUserInfo().getUserid();

        pDto.put("upload_user", upload_user);
        pDto.put("upload_date", new Date());
        pDto.put("save_key", fileKey);

        // 检查参数完整性
        if (fileKey == "" || pDto.getAsString("type") == "") {
            setErrTipMsg("【文件存储fileKey或者类型type不允许为空】", response);
            throw new Exception("【文件存储fileKey或者类型type不允许为空】");
        }

        // 根据key值获取保存路径与表名
        String savePath = pHelper.getValue(fileKey);
        String tableName = pHelper.getValue(fileKey + "_tableName");
        pDto.put("savePath", savePath);
        pDto.put("tableName", tableName);
        if (G4Utils.isNotEmpty(UploadFileInfo)) {
            for (MultipartFile multipartfile : UploadFileInfo) {
                appendixService.addAppendix(multipartfile, pDto);
            }
        }
        setOkTipMsg("上传成功", response);
        return null;
    }

    /**
     * 删除中间表，如果所对应的附件没用再被引用，将连同附件一并删除
     */
    @RequestMapping(params = "reqCode=delAppendix")
    public String delAppendix(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // 根据key值获取保存路径与表名
        String savePath = pHelper.getValue(pDto.getAsString("fileKey"));
        String tableName = pHelper.getValue(pDto.getAsString("fileKey") + "_tableName");
        pDto.put("savePath", savePath);
        pDto.put("tableName", tableName);

        // service

        Dto outDto = new BaseDto();
        if (pDto.getAsString("temp_id") == null || pDto.getAsString("temp_id").equals("")) {
            outDto = appendixService.delAppendix(pDto);
        } else {
            outDto = appendixService.delTempAppendix(pDto);
        }

        if (outDto.getAsBoolean("success")) {
            setOkTipMsg("临时文件已删除!", response);
        } else {
            setErrTipMsg("删除文件删除失败...", response);
        }

        return null;
    }

    /**
     * 根据to_id删除中间表，如果所对应的附件没用再被引用，将连同附件一并删除
     */
    @RequestMapping(params = "reqCode=delAppendixByToId")
    public String delAppendixByToId(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // 根据key值获取保存路径与表名
        String savePath = pHelper.getValue(pDto.getAsString("fileKey"));
        String tableName = pHelper.getValue(pDto.getAsString("fileKey") + "_tableName");
        pDto.put("savePath", savePath);
        pDto.put("tableName", tableName);

        // service
        Dto outDto = appendixService.delAppendixByToId(pDto);
        if (outDto.getAsBoolean("success")) {
            setOkTipMsg("删除该附件关联成功!", response);
        } else {
            setErrTipMsg("删除附件关联失败...", response);
        }

        return null;
    }

    /**
     * 修改附件的名字和描述
     */
    @RequestMapping(params = "reqCode=updAppendix")
    public String updAppendix(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // 获得表名
        String tableName = pHelper.getValue(pDto.getAsString("fileKey") + "_tableName");
        pDto.put("tableName", tableName);

        // service
        Dto outDto = new BaseDto();
        if (pDto.getAsString("temp_id") == null || pDto.getAsString("temp_id").equals("")) {
            outDto = appendixService.updAppendix(pDto);
        } else {
            outDto = appendixService.updTempAppendix(pDto);
        }
        if (outDto.getAsBoolean("success")) {
            setOkTipMsg("已保存!", response);
        } else {
            setErrTipMsg("修改文件描述 失败...", response);
        }

        return null;
    }

    /**
     * 查询 某to_id|temp_to_id、某种类型 的所有附件
     */
    @RequestMapping(params = "reqCode=queryAppendix")
    public String queryAppendix(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        if (pDto.containsKey("HaveTemp") && !"".equals("HaveTemp")) {
            Dto tableDto = new BaseDto();
            tableDto.put("tableName", pDto.getAsString("HaveTemp"));
            tableDto.put("to_id", pDto.getAsString("to_id"));
            List<Dto> list = g4Reader.queryForList("CMAppendix.queryTempTable", tableDto);
            if (list.size() != 0) {
                pDto.put("to_id", list.get(0).getAsString("id_"));
            }
//            pDto.put("to_id")
        }

        // 获得表名
        String tableName = pHelper.getValue(pDto.getAsString("fileKey") + "_tableName");
        pDto.put("tableName", tableName);

        // 查询
        List list = new ArrayList();
        if (pDto.getAsBoolean("upLoadFlag")) {
            list = g4Reader.queryForList("CMAppendix.queryRelation2", pDto);
            if (pDto.getAsString("tmp_id") != null && (!pDto.getAsString("tmp_id").equals(""))) {
                pDto.put("temp_to_id", pDto.getAsString("tmp_id"));
                List list2 = g4Reader.queryForList("CMAppendix.queryTempRelation", pDto);
                list.addAll(list2);
            }
        } else {
            list = g4Reader.queryForList("CMAppendix.queryRelation2", pDto);
        }

        String jsonString = encodeList2PageJson(list, list.size(),
                G4Constants.FORMAT_Date);
        super.write(jsonString, response);

        return null;
    }

    /**
     * 根据from_id下载文件
     */
    @RequestMapping(params = "reqCode=downAppendix")
    public String downAppendix(
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // 获得表名
        String tableName = pHelper.getValue(pDto.getAsString("fileKey") + "_tableName");
        pDto.put("tableName", tableName);
//如果不含from_id，但是含to_id，那么通过to_id查询form_id
        if (!pDto.containsKey("form_id")) {
            if (!pDto.containsKey("to_id")) {
                setErrTipMsg("to_id和form_id必须含一个", response);
                return null;
            } else {
                List<Dto> qppendixlist = g4Reader.queryForList(
                        "CMAppendix.getRelation", pDto);
                if (G4Utils.isEmpty(qppendixlist)) {
                    setErrTipMsg("数据库找不到附件信息", response);
                    return null;
                } else {
                    pDto.put("from_id", qppendixlist.get(0).getAsString("from_id"));
                }
            }
        }
        // 查询附件表
        Dto outDto = (Dto) g4Reader.queryForObject(
                "CMAppendix.selectAppendix", pDto);

        if (outDto == null) {
            setErrTipMsg("数据库找不到附件信息,建议刷新后重试！", response);
            return null;
        }
        String path = pHelper.getValue(pDto.getAsString("fileKey"));
        File file = new File(path, outDto.getAsString("save_file_name"));
        String filename = G4Utils.encodeChineseDownloadFileName(request,
                outDto.getAsString("save_file_name"));
        response.setHeader("Content-Disposition", "attachment; filename="
                + filename + ";");

        if (file.exists()) {
            BufferedInputStream in = new BufferedInputStream(
                    new FileInputStream(file));
            ByteArrayOutputStream out = new ByteArrayOutputStream(1024);
            byte[] temp = new byte[1024];
            int size = 0;
            while ((size = in.read(temp)) != -1) {
                out.write(temp, 0, size);
            }
            in.close();
            ServletOutputStream os = response.getOutputStream();
            os.write(out.toByteArray());
            os.flush();
            os.close();
        } else {
            setErrTipMsg("找不到附件文件,建议刷新后重试！", response);
        }
        return null;
    }

    /**
     * 让表格内空指向域的附件与域id关联起来
     */
    @RequestMapping(params = "reqCode=makeAppendixToArea")
    public String makeAppendixToArea(HttpServletRequest request,
                                     HttpServletResponse response) throws Exception {
        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // service
        int num = appendixService.makeAppendixToArea(pDto.getAsString("temp_to_id"), pDto.getAsString("to_id"));

        if (num > 0) {
            setOkTipMsg("成功绑定", response);
        } else {
            setErrTipMsg("错误绑定", response);
        }
        return null;
    }

    /**
     * 复制文件（只复制中间表数据至临时表数据）
     */
    @RequestMapping(params = "reqCode=copyAppendix")
    public String copyAppendix(HttpServletRequest request,
                               HttpServletResponse response) throws Exception {
        // 取参
        CommonActionForm aForm = new CommonActionForm();
        Dto pDto = aForm.getParamAsDto(request);

        // service
        int num = appendixService.copyAppendix(pDto.getAsString("fileKey"), pDto.getAsString("to_id"), pDto.getAsString("temp_to_id"));

        if (num > 0) {
            setOkTipMsg("成功绑定", response);
        } else {
            setErrTipMsg("错误绑定", response);
        }
        return null;
    }

}
