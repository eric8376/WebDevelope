package org.nxstudio.util.io;

import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.nxstudio.util.g4.G4Utils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

/**
 * 多文件上传
 *
 * @author liangrui
 */
public class FileUpload {

    //文件信息
    public static final String REALNAME = "realName";  //真实名字
    public static final String STORENAME = "storeName"; //存储名字
    public static final String SIZE = "size";
    // private static final String SUFFIX = "suffix";
    // private static final String CONTENTTYPE = "contentType";
    public static final String CREATETIME = "createTime";
    public static final String UPLOADDIR = "public/certificate/temp/";  //文件所在目录	 uploadDir/
    public static final String ABSOLUTEPATH = "absolutePath";//保存文件 绝对路径  absolute
    public static final String RELATIVEPATH = "relativePath"; //相对 路径	 relative

    /**
     * 获取上传的文件信息
     *
     * @param request
     * @return
     */
    public static List<MultipartFile> getUploadFile(HttpServletRequest request) {
        //上传文件的解析器
        CommonsMultipartResolver mutiparRe = new CommonsMultipartResolver();
        //保存文件信息
        List<MultipartFile> fileList = new ArrayList<MultipartFile>();
        if (mutiparRe.isMultipart(request)) {//如果是文件类型的请求
            MultipartHttpServletRequest mhr = (MultipartHttpServletRequest) request;
            //跌带文件名称
            Iterator<String> it = mhr.getFileNames();
            while (it.hasNext()) {
                //获取一个文件
                MultipartFile mf = mhr.getFile(it.next());
                fileList.add(mf);
            }
        }
        return fileList;

    }

    //多文件上传
    public static List<Map<String, Object>> filedsUpload(HttpServletRequest request, String uploadDir, String fileName) throws IllegalStateException, IOException {

        //上传文件的解析器
        CommonsMultipartResolver mutiparRe = new CommonsMultipartResolver();
        if (mutiparRe.isMultipart(request)) {//如果是文件类型的请求

            //保存文件信息
            List<Map<String, Object>> fileInfo = new ArrayList<Map<String, Object>>();

            MultipartHttpServletRequest mhr = (MultipartHttpServletRequest) request;

            //创建子目录 取当前日期
            DateFormat df = new SimpleDateFormat("yyyyMMdd");
            String dirs = df.format(new Date());

            //获取路径
            if (G4Utils.isEmpty(uploadDir)) {
                uploadDir = request.getSession().getServletContext()
                        .getRealPath("/")
                        + FileUpload.UPLOADDIR + dirs;
            } else {
                uploadDir = request.getSession().getServletContext()
                        .getRealPath("/")
                        + uploadDir;
            }
            //如果目录不存在，创建一个目录
            if (!new File(uploadDir).exists()) {
                File dir = new File(uploadDir);
                dir.mkdirs();
            }

            //跌带文件名称
            Iterator<String> it = mhr.getFileNames();
            while (it.hasNext()) {
                //获取一个文件
                MultipartFile mf = mhr.getFile(it.next());
                if (mf != null) {
                    //获取原文件名
                    String resFileName = mf.getOriginalFilename();
                    //保存的文件名
                    if (G4Utils.isEmpty(fileName)) {
                        fileName = rename(resFileName);
                    }
                    //路径加文件名
                    File outFile = new File(uploadDir + "/" + fileName);
                    //保存到
                    mf.transferTo(outFile);

                    //返回文件信息
                    Map<String, Object> map = new HashMap<String, Object>();
                    map.put(FileUpload.REALNAME, resFileName);
                    map.put(FileUpload.STORENAME, fileName);
                    map.put(FileUpload.SIZE, mf.getSize());  //new File(fileName).length()
                    map.put(FileUpload.CREATETIME, new Date());
//                    map.put(FileUpload.UPLOADDIR, uploadDir);
                    map.put(FileUpload.ABSOLUTEPATH, uploadDir + fileName);//文件的绝对路径
                    map.put(FileUpload.RELATIVEPATH, "/" + FileUpload.UPLOADDIR + fileName);//文件的相对路径
                    fileInfo.add(map);
                }
            }

            return fileInfo;
        }
        return null;
    }

    /**
     * 上传单个文件
     *
     * @param mf
     * @param uploadDir
     * @param fileName
     * @return
     * @throws IOException
     */
    public static Map<String, Object> fileUpload(MultipartFile mf, String uploadDir, String fileName) throws IOException {
        Map<String, Object> map = new HashMap<String, Object>();
        if (!new File(uploadDir).exists()) {
            File dir = new File(uploadDir);
            dir.mkdirs();
        }
        //获取原文件名
        String resFileName = mf.getOriginalFilename();
        //保存的文件名
        if (G4Utils.isEmpty(fileName)) {
            fileName = rename(resFileName);
        }
        //路径加文件名
        File outFile = new File(uploadDir + "/" + fileName);
        //保存到
        mf.transferTo(outFile);

        //返回文件信息
        map.put(FileUpload.REALNAME, resFileName);
        map.put(FileUpload.STORENAME, fileName);
        map.put(FileUpload.SIZE, mf.getSize());  //new File(fileName).length()
        map.put(FileUpload.CREATETIME, new Date());
//                    map.put(FileUpload.UPLOADDIR, uploadDir);
        map.put(FileUpload.ABSOLUTEPATH, uploadDir + fileName);//文件的绝对路径
        map.put(FileUpload.RELATIVEPATH, "/" + FileUpload.UPLOADDIR + fileName);//文件的相对路径
        return map;
    }

    //更改文件名称
    public static String rename(String name) {

        //时分秒
        Long now = Long.parseLong(new SimpleDateFormat("yyyyMMddHHmmss")
                .format(new Date()));
        Long random = (long) (Math.random() * now);
        String fileName = now + "" + random;

        //uuid生成文件名
        UUID uuid = UUID.randomUUID();

        String uustr = uuid.toString();

        if (name.indexOf(".") != -1) {
            uustr += name.substring(name.lastIndexOf("."));
        }

        return uustr;
    }

}