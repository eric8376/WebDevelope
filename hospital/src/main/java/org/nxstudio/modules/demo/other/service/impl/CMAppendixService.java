package org.nxstudio.modules.demo.other.service.impl;

import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.modules.demo.other.dao.CMAppendixDao;
import org.nxstudio.modules.demo.other.service.ICMAppendixService;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.util.idgenerator.IDHelper;
import org.nxstudio.util.properties.PropertiesFactory;
import org.nxstudio.util.properties.PropertiesFile;
import org.nxstudio.util.properties.PropertiesHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.imageio.stream.ImageInputStream;
import java.awt.image.BufferedImage;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【公共附件管理实现】
 * 时间: 2013-06-10 下午4:36
 */
@Service("CmAppendixService")
public class CMAppendixService implements ICMAppendixService {

    @Autowired
    private CMAppendixDao cmAppendixDao;
    PropertiesHelper pHelper = PropertiesFactory.getPropertiesHelper(PropertiesFile.APP);
    private static SimpleDateFormat TimeFormate = new SimpleDateFormat(
            "yyyy-MM-dd HH:mm:ss");

    /**
     * 保存文件
     *
     * @throws java.io.FileNotFoundException
     */
    public Dto addAppendix(MultipartFile formFile, Dto pDto) throws Exception {
        if (formFile.getSize() == 0) {
            return null;
        }
        pDto.put("upload_date", TimeFormate.format(new Date()));
        if (G4Utils.isNotEmpty(pDto.getAsString("fileKey"))) {
            pDto.put("save_key", pDto.getAsString("fileKey"));
        }
        // 检查参数完整性
        if (G4Utils.isEmpty(pDto.getAsString("save_key"))) {
            pDto.put("error", "【文件存储fileKey或者类型save_key不允许为空】");
            return pDto;
        }
        String savePath = pHelper.getValue(pDto.getAsString("save_key"));
        String tableName = pHelper.getValue(pDto.getAsString("save_key") + "_tableName");
        pDto.put("savePath", savePath);
        pDto.put("tableName", tableName);
        // 分析文件类型
        String[] file_names = formFile.getOriginalFilename().split("[.]");
        String file_type = "none";
        if (file_names.length > 1
                && file_names[file_names.length - 1].length() < 18) {
            file_type = file_names[file_names.length - 1];
        }

        // ---------保存物理附件表数据
        String appdendix_id = IDHelper.getCodeID();
        String save_file_name = appdendix_id + "." + file_type;
        String from_id = IDHelper.getCodeID();
        pDto.put("appendix_id", appdendix_id);
        pDto.put("from_id", from_id);
        pDto.put("file_type", file_type);
        pDto.put("file_size", formFile.getSize());
        pDto.put("save_file_name", save_file_name);
        cmAppendixDao.insert("CMAppendix.insertAppendix", pDto);

        // ---------保存临时中间表数据
        String temp_id = IDHelper.getCodeID();
        String file_name = formFile.getOriginalFilename()/*.length() <= 20 ? formFile
                .getFileName() : "未命名文件"*/;
        pDto.put("temp_id", temp_id);
        pDto.put("file_name", file_name);
        pDto.put("explain", "无");
        pDto.put("is_copy", 0);
        cmAppendixDao.insert("CMAppendix.insertRelation", pDto);

        // ---------保存文件表数据
        // 检查路径是否存在,如果不存在则创建之
        File file = new File(savePath);
        if (!file.exists()) {
            file.mkdirs();
        }

        // 文件写入磁盘
        File fileToCreate = new File(savePath, save_file_name);
        // 检查同名文件是否存在,不存在则将文件流写入文件磁盘系统
        if (!fileToCreate.exists()) {
            FileOutputStream os = new FileOutputStream(fileToCreate);
            os.write(formFile.getBytes());
            os.flush();
            os.close();
            if (isImage(fileToCreate)) {
                Map<String, Long> map = getImgInfo(fileToCreate);
                if (map != null) {
                    pDto.put("photoHeight", map.get("h"));
                    pDto.put("photoWidth", map.get("w"));
                }

            }

        } else {
            pDto.put("error", "此路径下已存在同名文件,请开发人员检查仔细检查!!!");
            // 此路径下已存在同名文件,服务器报错
            throw new Exception("此路径下已存在同名文件,请开发人员检查仔细检查!!!");
        }
        if (!file.exists()) {
            pDto.put("error", "附件保存失败");
            throw new Exception("保存附件失败。");
        }
        return pDto;
    }

    /**
     * 保存文件
     *
     * @throws java.io.FileNotFoundException
     */
    public Dto addAppendix(byte[] formFile, Dto pDto, String filename, String savePath) throws Exception {
        if (formFile.length == 0) {
            return null;
        }
        pDto.put("upload_date", TimeFormate.format(new Date()));
        if (G4Utils.isNotEmpty(pDto.getAsString("fileKey"))) {
            pDto.put("save_key", pDto.getAsString("fileKey"));
        }
        // 检查参数完整性
        if (G4Utils.isEmpty(pDto.getAsString("save_key"))) {
            pDto.put("error", "【文件存储fileKey或者类型save_key不允许为空】");
            return pDto;
        }
        String tableName = pHelper.getValue(pDto.getAsString("save_key") + "_tableName");
        pDto.put("savePath", savePath);
        pDto.put("tableName", tableName);
        // 分析文件类型
        String[] file_names = filename.split("[.]");
        String file_type = "none";
        if (file_names.length > 1
                && file_names[file_names.length - 1].length() < 18) {
            file_type = file_names[file_names.length - 1];
        }

        // ---------保存物理附件表数据
        String appdendix_id = IDHelper.getCodeID();
        String save_file_name = filename;
        String from_id = IDHelper.getCodeID();
        pDto.put("appendix_id", appdendix_id);
        pDto.put("from_id", from_id);
        pDto.put("file_type", file_type);
        pDto.put("file_size", formFile.length);
        pDto.put("save_file_name", save_file_name);
        cmAppendixDao.insert("CMAppendix.insertAppendix", pDto);

        // ---------保存临时中间表数据
        String temp_id = IDHelper.getCodeID();
        String file_name = filename/*.length() <= 20 ? formFile
                .getFileName() : "未命名文件"*/;
        pDto.put("temp_id", temp_id);
        pDto.put("file_name", file_name);
        pDto.put("explain", "无");
        pDto.put("is_copy", 0);
        cmAppendixDao.insert("CMAppendix.insertRelation", pDto);

        // ---------保存文件表数据
        // 检查路径是否存在,如果不存在则创建之
        File file = new File(savePath);
        if (!file.exists()) {
            file.mkdirs();
        }

        // 文件写入磁盘
        File fileToCreate = new File(savePath, save_file_name);
        // 检查同名文件是否存在,不存在则将文件流写入文件磁盘系统
        if (!fileToCreate.exists()) {

            FileOutputStream os = new FileOutputStream(fileToCreate);
            os.write(formFile);
            os.flush();
            os.close();
        } else {
            // 此路径下已存在同名文件,服务器报错
            throw new Exception("此路径下已存在同名文件,请开发人员检查仔细检查!!!");
        }

        return pDto;
    }

    /**
     * 删除中间表，如果所对应的附件没用再被引用，将连同附件一并删除
     */
    public Dto delAppendix(Dto pDto) {
        // 查询中间表
        Dto outDto = (Dto) cmAppendixDao.queryForObject(
                "CMAppendix.selectRelation", pDto);
        if (outDto == null) {
            outDto.put("success", false);
            outDto.put("msg", "该文件记录不存在,请刷新后重试!");
            return outDto;
        }

        // 删除中间表
        cmAppendixDao.delete("CMAppendix.deleteRelation", pDto);

        // 查询附件被中间表使用总数
        outDto.put("tableName", pDto.getAsString("tableName"));
        int count2 = (Integer) cmAppendixDao.queryForObject("CMAppendix.countRelation", outDto);

        // 如果该 附件不再被 中间表关联，则删除
        if (count2 == 0) {
            // 查询附件表(根据from_id)
            Dto outDto2 = (Dto) cmAppendixDao.queryForObject(
                    "CMAppendix.selectAppendix", outDto);

            if (outDto2 != null) {
                // 删除附件表(根据from_id)
                outDto2.put("tableName", pDto.getAsString("tableName"));
                cmAppendixDao.delete("CMAppendix.deleteAppendix", outDto);

                // 删除文件
                File file = new File(pDto.getAsString("savePath"), outDto2.getAsString("save_file_name"));

                if (file.exists()) {
                    file.delete();
                }
            }
        }

        // 返回成功
        outDto.put("success", true);
        outDto.put("msg", "已删除!");
        return outDto;
    }

    /**
     * 删除中间表，如果所对应的附件没用再被引用，将连同附件一并删除
     *
     * @tableName 表名
     * @to_id 域使用id
     */
    public Dto delAppendixByToId(Dto pDto) {
        // 查询所有此to_id的中间表
        List<Dto> list = cmAppendixDao.queryForList("CMAppendix.queryRelation3",
                pDto);

        // 逐个检测并删除
        for (int i = 0; i < list.size(); i++) {
            pDto.put("appendix_id", list.get(i).getAsString("appendix_id"));
            delAppendix(pDto);
        }

        // 返回成功
        pDto.put("success", true);
        pDto.put("msg", "已删除!");
        return pDto;
    }

    /**
     * 删除中间表 (需要temp_id)
     */
    public Dto delTempAppendix(Dto pDto) {
        // 查询中间表
        Dto outDto = (Dto) cmAppendixDao.queryForObject(
                "CMAppendix.selectTempRelation", pDto);
        if (outDto == null) {
            outDto = new BaseDto();
            outDto.put("success", false);
            outDto.put("msg", "该文件记录不存在,请刷新后重试!");
            return outDto;
        }

        // 删除中间表
        cmAppendixDao.delete("CMAppendix.deleteTempRelation", pDto);

        // 如果不是复制的，删除
        if (outDto.getAsInteger("is_copy") == 0) {
            // 查询附件表(根据from_id)
            Dto outDto2 = (Dto) cmAppendixDao.queryForObject(
                    "CMAppendix.selectAppendix", outDto);

            if (outDto2 != null) {
                // 删除附件表(根据from_id)
                outDto2.put("tableName", pDto.getAsString("tableName"));
                cmAppendixDao.delete("CMAppendix.deleteAppendix", outDto);

                // 删除文件
                File file = new File(pDto.getAsString("savePath"), outDto2.getAsString("save_file_name"));

                if (file.exists()) {
                    file.delete();
                }
            }
        }

        // 返回成功
        outDto.put("success", true);
        outDto.put("msg", "已删除!");
        return outDto;
    }

    /**
     * 修改中间表文件名或者描述
     */
    public Dto updAppendix(Dto pDto) {
        int count = cmAppendixDao.update("CMAppendix.updateRelation", pDto);
        pDto.put("success", count != 0);
        return pDto;
    }

    /**
     * 修改临时表文件名或者描述
     */
    public Dto updTempAppendix(Dto pDto) {
        int count = cmAppendixDao.update("CMAppendix.updateTempRelation", pDto);
        pDto.put("success", count != 0);
        return pDto;
    }

    /**
     * 复制文件（只复制中间表数据至临时表数据）
     *
     * @param temp_to_id 临时id码
     * @param to_id      目标id码
     * @return 影响的行数
     */
    public int copyAppendix(String fileKey, String to_id, String temp_to_id) {
        int count = 0;

        PropertiesHelper pHelper = PropertiesFactory.getPropertiesHelper(PropertiesFile.APP);
        String tableName = pHelper.getValue(fileKey + "_tableName");
        Dto queryDto = new BaseDto();
        queryDto.put("tableName", tableName);
        queryDto.put("to_id", to_id);

        //复制数据
        List<Dto> list = cmAppendixDao.queryForList("CMAppendix.queryRelation3", queryDto);

        for (int i = 0; i < list.size(); i++) {
            Dto tmpDto = list.get(i);
            String temp_id = IDHelper.getCodeID();
            tmpDto.put("temp_id", temp_id);
            tmpDto.put("is_copy", 1);
            tmpDto.put("to_id", temp_to_id);
            cmAppendixDao.insert("CMAppendix.insertTempRelation", tmpDto);
            count++;
        }

        return count;
    }

    /**
     * 让临时附件与（某个域）关联
     *
     * @param temp_to_id 临时id码
     * @param to_id      目标id码
     * @return 影响的行数
     */
    public int makeAppendixToArea(String temp_to_id, String to_id) {
        int count = 0;

        //获取所有该临时编码的临时附件
        List<Dto> list = getAllAppendixesByTmpId(temp_to_id);

        // 搬数据
        PropertiesHelper pHelper = PropertiesFactory.getPropertiesHelper(PropertiesFile.APP);
        for (int i = 0; i < list.size(); i++) {
            Dto tmpDto = list.get(i);
            String tableName = pHelper.getValue(tmpDto.getAsString("save_key") + "_tableName");
            tmpDto.put("tableName", tableName);
            tmpDto.put("appendix_id", tmpDto.getAsString("temp_id"));
            tmpDto.put("to_id", to_id);
            tmpDto.put("upload_date", new Date());
            cmAppendixDao.insert("CMAppendix.insertRelation", tmpDto);
            cmAppendixDao.delete("CMAppendix.deleteTempRelation", tmpDto);
            count++;
        }

        return count;
    }

    /**
     * 解除绑定
     */
    public Dto removeBind(String fileKey, String to_id) {
        // 根据key值获取保存路径与表名
        PropertiesHelper pHelper = PropertiesFactory.getPropertiesHelper(PropertiesFile.APP);
        String savePath = pHelper.getValue(fileKey);
        String tableName = pHelper.getValue(fileKey + "_tableName");

        Dto pDto = new BaseDto();
        pDto.put("savePath", savePath);
        pDto.put("tableName", tableName);

        return delAppendixByToId(pDto);
    }

    /**
     * 添加绑定
     */
    public int addBind(String temp_to_id, String to_id) {
        return makeAppendixToArea(temp_to_id, to_id);
    }

    /**
     * 获取某临时id的所有附件
     */
    public List<Dto> getAllAppendixesByTmpId(String temp_to_id) {
        Dto queryDto = new BaseDto();
        queryDto.put("temp_to_id", temp_to_id);

        //获取所有该临时编码的临时附件
        List<Dto> list = cmAppendixDao.queryForList("CMAppendix.queryTempRelation2", queryDto);

        return list;
    }

    /**
     * 计算图片尺寸大小等信息：w宽、h高、s大小。异常时返回null。
     *
     * @return 图片信息map
     */
    public static Map<String, Long> getImgInfo(File imgfile) {
        Map<String, Long> map = new HashMap<String, Long>(3);
        try {
            FileInputStream fis = new FileInputStream(imgfile);
            BufferedImage buff = ImageIO.read(imgfile);
            if (G4Utils.isEmpty(buff)) {
                return null;
            }
            map.put("w", buff.getWidth() * 1L);
            map.put("h", buff.getHeight() * 1L);
            map.put("s", imgfile.length());
            fis.close();
        } catch (FileNotFoundException e) {
            System.err.println("所给的图片文件" + imgfile.getPath() + "不存在！计算图片尺寸大小信息失败！");
            map = null;
        } catch (IOException e) {
            System.err.println("计算图片" + imgfile.getPath() + "尺寸大小信息失败！");
            map = null;
        }
        return map;
    }

    /**
     * 判断文件是否是图片文件
     *
     * @param file
     * @return
     */
    private boolean isImage(File file) {
        boolean flag = false;
        try {
            ImageInputStream is = ImageIO.createImageInputStream(file);
            if (null == is) {
                return flag;
            }
            is.close();
            flag = true;
        } catch (Exception e) {
            //e.printStackTrace();
        }
        return flag;
    }

    @Override
    public File downAppendixFile(Dto pDto) {
        if (!pDto.containsKey("appendix_id") && !pDto.containsKey("from_id")) {
            List<Dto> qppendixlist = cmAppendixDao.queryForList(
                    "CMAppendix.getRelation", pDto);
            if (G4Utils.isNotEmpty(qppendixlist)) {
                pDto.put("from_id", qppendixlist.get(0).getAsString("from_id"));
            } else {
                return null;
            }
        }

        File file = null;
        // 查询附件表
        Dto outDto = (Dto) cmAppendixDao.queryForObject(
                "CMAppendix.DynamicSelectAppendix", pDto);
        if (outDto == null) {
            return null;
        }
        pDto.put("file_type", outDto.getAsString("file_type"));
        String path = pHelper.getValue(pDto.getAsString("fileKey"));
        file = new File(path, outDto.getAsString("save_file_name"));
        pDto.put("file_name", outDto.getAsString("save_file_name"));
        return file;
    }
}
