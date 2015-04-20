package org.nxstudio.modules.demo.other.controller;

import org.apache.struts.upload.FormFile;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.ftp.FtpHelper;
import org.nxstudio.util.json.JsonHelper;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.modules.demo.other.service.DemoService;
import org.nxstudio.core.controller.BaseAction;
import org.nxstudio.core.model.CommonActionForm;
import org.nxstudio.util.io.FileUpload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;

/**
 * 其他标准范例暨教程Action 文件管理、
 *
 * @author XiongChun
 * @see org.nxstudio.core.controller.BaseAction
 * @since 2011-04-09
 */
@Controller
@RequestMapping("/otherDemo")
public class OtherAction extends BaseAction {
    @Autowired
    private DemoService demoService;

    /**
     * 文件操作页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=uploadInit")
    public String uploadInit(HttpServletRequest request,
                             HttpServletResponse response) throws Exception {

        return "fileUploadView";
    }


    @RequestMapping(params = "reqCode=uploadMiniInit")
    public String uploadMiniInit(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        return "/demo/other/fileUploadMini";
    }


    /**
     * 查询文件列表
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=queryFileDatas")
    public String queryFileDatas(HttpServletRequest request,
                                 HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        List list = g4Reader.queryForPage("Demo.queryFiles", dto);
        Integer countInteger = (Integer) g4Reader.queryForObject("Demo.countFiles", dto);
        String jsonString = JsonHelper.encodeList2PageJson(list, countInteger, null);
        super.write(jsonString, response);
        return null;
    }

    /**
     * Web表单文件上传 单个/批量同理
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=doUpload")
    public String doUpload(HttpServletRequest request,
                           HttpServletResponse response) throws Exception {
        CommonActionForm cForm = (CommonActionForm) form;
        List<MultipartFile> UploadFileInfo = FileUpload.getUploadFile(request);
        // 获取web应用根路径,也可以直接指定服务器任意盘符路径
        String savePath = servletContext.getRealPath("/") + "uploaddata/";
        // 文件按天归档
        savePath = savePath + G4Utils.getCurDate() + "/";

        if (G4Utils.isNotEmpty(UploadFileInfo)) {
            for (MultipartFile multipartfile : UploadFileInfo) {
                String resFileName = multipartfile.getOriginalFilename();
                FileUpload.fileUpload(multipartfile, savePath, resFileName);
                // 我们通常还会把这个文件的相关信息持久化到数据库
                Dto inDto = cForm.getParamAsDto(request);
                inDto.put("title", G4Utils.isEmpty(inDto.getAsString("title")) ? resFileName : inDto.getAsString("title"));
                inDto.put("filesize", multipartfile.getSize());
                inDto.put("path", savePath + resFileName);
                demoService.doUpload(inDto);
            }
        }
        setOkTipMsg("文件上传成功", response);
        return null;
    }

    /**
     * 删除文件
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=delFiles")
    public String delFiles(HttpServletRequest request,
                           HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        String[] strChecked = dto.getAsString("strChecked").split(",");
        for (int i = 0; i < strChecked.length; i++) {
            String fileid = strChecked[i];
            Dto fileDto = (BaseDto) g4Reader.queryForObject("Demo.queryFileByFileID", fileid);
            String path = fileDto.getAsString("path");
            File file = new File(path);
            file.delete();
            demoService.delFile(fileid);
        }
        setOkTipMsg("文件删除成功", response);
        return null;
    }

    /**
     * 下载文件
     *
     * @param mapping
     * @param form
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(params = "reqCode=downloadFile")
    public String downloadFile(HttpServletRequest request,
                               HttpServletResponse response) throws Exception {
        CommonActionForm aForm = (CommonActionForm) form;
        Dto dto = aForm.getParamAsDto(request);
        String fileid = dto.getAsString("fileid");
        Dto fileDto = (BaseDto) g4Reader.queryForObject("Demo.queryFileByFileID", fileid);
        // 这里可稍做优化,根据文件类型动态设置此属性
        // response.setContentType("application/vnd.ms-excel");
        String filename = G4Utils.encodeChineseDownloadFileName(request, fileDto.getAsString("title"));
        response.setHeader("Content-Disposition", "attachment; filename=" + filename + ";");
        String path = fileDto.getAsString("path");
        File file = new File(path);
        BufferedInputStream in = new BufferedInputStream(new FileInputStream(file));
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
        return null;
    }

    /**
     * Flash组件文件上传 如果是批量则客户端的SWF会循环来调用这个方法
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=doUploadBasedFlah")
    public String doUploadBasedFlah(HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        CommonActionForm cForm = (CommonActionForm) form;
        FormFile myFile = cForm.getSwfUploadFile();
        // 获取web应用根路径,也可以直接指定服务器任意盘符路径
        String savePath = servletContext.getRealPath("/") + "uploaddata/";
        // String savePath = "d:/upload/";
        // 检查路径是否存在,如果不存在则创建之
        File file = new File(savePath);
        if (!file.exists()) {
            file.mkdir();
        }
        // 文件按天归档
        savePath = savePath + G4Utils.getCurDate() + "/";
        File file1 = new File(savePath);
        if (!file1.exists()) {
            file1.mkdir();
        }
        // 文件真实文件名
        String fileName = myFile.getFileName();
        // 我们一般会根据某种命名规则对其进行重命名
        // String fileName = ;
        File fileToCreate = new File(savePath, fileName);
        // 检查同名文件是否存在,不存在则将文件流写入文件磁盘系统
        if (!fileToCreate.exists()) {
            FileOutputStream os = new FileOutputStream(fileToCreate);
            os.write(myFile.getFileData());
            os.flush();
            os.close();
        } else {
            // 此路径下已存在同名文件,是否要覆盖或给客户端提示信息由你自己决定
            FileOutputStream os = new FileOutputStream(fileToCreate);
            os.write(myFile.getFileData());
            os.flush();
            os.close();
        }
        // 我们通常还会把这个文件的相关信息持久化到数据库
        Dto inDto = cForm.getParamAsDto(request);
        inDto.put("title", G4Utils.isEmpty(inDto.getAsString("title")) ? fileName : inDto.getAsString("title"));
        inDto.put("filesize", myFile.getFileSize());
        inDto.put("path", savePath + fileName);
        demoService.doUpload(inDto);
        setOkTipMsg("文件上传成功", response);
        return null;
    }

    /**
     * FTP上传
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=doUploadByFTP")
    public String doUploadByFTP(HttpServletRequest request,
                                HttpServletResponse response) throws Exception {
        CommonActionForm cForm = (CommonActionForm) form;
        boolean b = true;

        FormFile myFile = cForm.getFile1();
        // FTP开始
        // 封装的FTP还有其他处理方式,这只是其中一种,更多API请查看FtpHelper.java
        FtpHelper ftpHelper = new FtpHelper();
        ftpHelper.createConnection("127.0.0.1", "anonymous", "", 21);
        ftpHelper.useWorkingDir("/files/中文路劲支持");
        b = ftpHelper.storeFile(myFile.getInputStream(), "中文名支持" + myFile.getFileName());
        // 释放连接非常重要
        ftpHelper.disconnect();

        String msg = "";
        if (b) {
            msg = "文件上传成功,此操作需要FTP服务器配合,请查看后台代码";
        } else {
            msg = "文件上传失败";
        }
        setOkTipMsg(msg, response);
        return null;
    }

    /**
     * 异常处理页面初始化
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=exceptionInit")
    public String exceptionInit(HttpServletRequest request,
                                HttpServletResponse response) throws Exception {

        return "exceptionView";
    }

    /**
     * 产生异常
     *
     * @param
     * @return
     */
    @RequestMapping(params = "reqCode=doError")
    public String doError(HttpServletRequest request,
                          HttpServletResponse response) throws Exception {
        demoService.doError();
        setOkTipMsg("交易成功", response);
        return "exceptionView";
    }
}
