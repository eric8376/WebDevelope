package org.nxstudio.modules.systemmanager.monitor.service.impl;

import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.core.vo.UserInfoVo;
import org.nxstudio.modules.systemmanager.monitor.dao.MonitorDao;
import org.nxstudio.modules.systemmanager.monitor.service.MonitorService;
import org.nxstudio.util.idgenerator.IDHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 系统监控业务接口
 *
 * @author XiongChun
 * @since 2010-09-13
 */
@Service("monitorService")
public class MonitorServiceImpl implements MonitorService {

    @Autowired
    private MonitorDao monitorDao;

    /**
     * 保存一个HTTP会话
     *
     * @param userInfo
     */
    public void saveHttpSession(UserInfoVo userInfo) {
        monitorDao.insert("Monitor.saveHttpSession", userInfo);
    }

    /**
     * 删除一个托管的会话连接
     */
    public void deleteHttpSession(Dto dto) {
        monitorDao.delete("Monitor.deleteHttpSession", dto);
    }

    /**
     * 创建一个事件
     */
    public void saveEvent(Dto dto) {
        String eventid = IDHelper.getEventID();
        dto.put("eventid", eventid);
        monitorDao.insert("Monitor.saveEvent", dto);
    }

    /**
     * 删除事件
     *
     * @param inDto
     */
    public Dto deleteEvent(Dto inDto) {
        if (inDto.getAsString("type").equalsIgnoreCase("reset")) {
            monitorDao.delete("Monitor.deleteEvent");
        } else {
            String[] checked = inDto.getAsString("strChecked").split(",");
            Dto dto = new BaseDto();
            for (int i = 0; i < checked.length; i++) {
                dto.put("eventid", checked[i]);
                monitorDao.delete("Monitor.deleteEvent", dto);
            }
        }
        return null;
    }

    /**
     * 删除SpringBean监控记录
     *
     * @param inDto
     */
    public Dto deleteMonitorData(Dto inDto) {
        if (inDto.getAsString("type").equalsIgnoreCase("reset")) {
            monitorDao.delete("Monitor.deleteExceptionRecord");
        } else {
            String[] checked = inDto.getAsString("strChecked").split(",");
            Dto dto = new BaseDto();
            for (int i = 0; i < checked.length; i++) {
                dto.put("exceptionid", checked[i]);
                monitorDao.delete("Monitor.deleteExceptionRecord", dto);
            }
        }
        return null;
    }

    /**
     * 删除JDBC监控记录
     *
     * @param inDto
     */
    public Dto deleteJDBCMonitorData(Dto inDto) {
        if (inDto.getAsString("type").equalsIgnoreCase("reset")) {
            monitorDao.delete("Monitor.deleteJdbcMonitorData");
        } else {
            String[] checked = inDto.getAsString("strChecked").split(",");
            Dto dto = new BaseDto();
            for (int i = 0; i < checked.length; i++) {
                dto.put("monitorid", checked[i]);
                monitorDao.delete("Monitor.deleteJdbcMonitorData", dto);
            }
        }
        return null;
    }

}
