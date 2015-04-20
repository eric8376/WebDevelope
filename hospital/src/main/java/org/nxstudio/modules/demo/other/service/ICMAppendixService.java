package org.nxstudio.modules.demo.other.service;

import org.nxstudio.core.model.Dto;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【公共附件管理】
 * 时间: 2013-06-10 下午4:36
 */
public interface ICMAppendixService {

    /**
     * 保存文件
     *
     * @throws Exception
     */
    public Dto addAppendix(MultipartFile formFile, Dto pDto) throws Exception;

    /**
     * 保存文件
     *
     * @throws Exception
     */
    public Dto addAppendix(byte[] formFile, Dto pDto, String filename, String savePath) throws Exception;

    /**
     * 删除中间表，如果所对应的附件没用再被引用，将连同附件一并删除
     */
    public Dto delAppendix(Dto pDto);

    /**
     * 根据to_id删除中间表，如果所对应的附件没用再被引用，将连同附件一并删除
     */
    public Dto delAppendixByToId(Dto pDto);

    /**
     * 删除中间表 (需要temp_id)
     */
    public Dto delTempAppendix(Dto pDto);

    /**
     * 修改文件名或者描述
     */
    public Dto updAppendix(Dto pDto);

    /**
     * 修改临时表文件名或者描述
     */
    public Dto updTempAppendix(Dto pDto);

    /**
     * 让指定附件与（某个域）关联
     *
     * @return 影响的行数
     */
    public int copyAppendix(String fileKey, String to_id, String temp_to_id);

    /**
     * 让临时附件与（某个域）关联
     *
     * @param temp_to_id 临时id码
     * @param to_id      目标id码
     * @return 影响的行数
     */
    public int makeAppendixToArea(String temp_to_id, String to_id);

    /**
     * 添加绑定
     */
    public int addBind(String temp_to_id, String to_id);

    /**
     * 解除绑定
     */
    public Dto removeBind(String fileKey, String to_id);

    /**
     * 获取某临时id的所有附件
     */
    public List<Dto> getAllAppendixesByTmpId(String temp_to_id);

    /**
     * 下载附件
     *
     * @param pDto
     * @return
     */
    public File downAppendixFile(Dto pDto);
}
