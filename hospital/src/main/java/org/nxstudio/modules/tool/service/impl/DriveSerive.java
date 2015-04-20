package org.nxstudio.modules.tool.service.impl;

import org.nxstudio.modules.tool.service.IDriveService;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.springframework.beans.factory.annotation.Autowired;

import java.lang.reflect.Method;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【驱动Service,集中管理Service-实现类】
 * 时间: 2013-06-21 上午10:12
 */

public abstract class DriveSerive implements IDriveService {

    /**
     * 代理执行本Service的某个方法
     */
    public Dto dobatch(String method, Dto pDto) throws Exception {
        Method executeMethod = this.getClass().getDeclaredMethod(method, Dto.class);
        Dto returnObj = (Dto) executeMethod.invoke(this, pDto);
        return returnObj;
    }

    /**
     * 获取成功返回时的Ext Json 形式
     *
     * @param success 是否成功
     */
    public Dto getResDto(boolean success) {
        Dto outDto = new BaseDto();
        outDto.put("success", success);
        outDto.put("msg", success ? "成功" : "失败");

        return outDto;
    }

    /**
     * 获取成功返回时的Ext Json 形式 (会话)
     *
     * @param success 是否成功
     * @param msg     返回的消息
     */
    public Dto getResDto(boolean success, String msg) {
        Dto outDto = new BaseDto();
        outDto.put("success", success);
        outDto.put("msg", msg);

        return outDto;
    }

    /**
     * 获取成功返回时的 Ext Json 形式  （表单形式）
     *
     * @param success 是否成功
     * @param data    返回的消息
     */
    public Dto getDataDto(boolean success, Object data) {
        Dto outDto = new BaseDto();
        outDto.put("success", success);
        outDto.put("msg", success ? "已保存..." : "未保存成功!");
        outDto.put("data", data);
        return outDto;
    }

    /**
     * 获取成功返回时的 Ext Json 形式  （表格形式）
     *
     * @param data 返回的消息
     */
    public Dto getGridDto(Object data) {
        Dto outDto = new BaseDto();
        outDto.put("gridFlag_", true);
        outDto.put("data", data);
        return outDto;
    }


}
