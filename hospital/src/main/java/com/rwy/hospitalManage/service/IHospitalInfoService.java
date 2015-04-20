package com.rwy.hospitalManage.service;


import org.hibernate.annotations.Synchronize;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.vo.UserInfoVo;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

/**
 * <pre></pre>
 * <br>
 * <pre>所属模块：</pre>
 *
 * @author 黄琦鸿
 *         创建于  2014/12/28 19:15.
 */

public interface IHospitalInfoService {
    /**
     * 保存医院信息
     *
     * @param dto
     */
    public void saveHospitalInfo(Dto dto) throws Exception;

    /**
     * 修改医院信息
     *
     * @param dto
     */
    public void updateHospitalInfo(Dto dto) throws Exception;

    /**
     * 删除医院信息
     *
     * @param dto
     */
    public void deleteHospitalInfo(Dto dto);

    /**
     * 查询医院信息
     *
     * @param dto
     * @return
     */
    public String queryHospitalInfo(Dto dto) throws SQLException;


    /**
     * 查询部门科目信息
     *
     * @return
     */
    public String queryDeptCourseInfo(Dto pDto) throws SQLException;

    /**
     * 保存科目信息
     *
     * @param pDto
     * @throws Exception
     */
    public void saveCourseInfo(Dto pDto) throws Exception;

    /**
     * 更新科目信息
     *
     * @param pDto
     * @throws Exception
     */
    public void updateCourseInfo(Dto pDto) throws Exception;

    /**
     * 删除科目信息
     *
     * @param pDto
     * @throws Exception
     */
    public void deleteCourseInfo(Dto pDto);

    /**
     * 删除部门科目信息
     *
     * @param pDto
     * @throws Exception
     */
    public void deleteDeptCourseInfo(Dto pDto);

    /**
     * 保存部门科目信息
     *
     * @param pDto
     * @throws Exception
     */
    public void saveDeptCourseInfo(Dto pDto) throws Exception;

    /**
     * 查询科目信息
     *
     * @param pDto
     * @return
     */
    public String queryCourseInfo(Dto pDto) throws SQLException;

    /**
     * 查询检查记录
     *
     * @param pDto
     * @param user
     * @return
     */
    public String queryCheckInfo(Dto pDto, UserInfoVo user) throws SQLException;

    /**
     * 查询检查记录
     *
     * @param pDto
     * @param user
     * @return
     */
    public String getRunningTaskForCheckRecord(Dto pDto, UserInfoVo user) throws SQLException;
    /**
     * 保存检查记录
     *
     * @param pDto
     * @return
     */
    public void saveCheckRecordInfo(Dto pDto) throws Exception;

    /**
     * 修改检查记录
     *
     * @param pDto
     * @return
     */
    public void updateCheckRecordInfo(Dto pDto) throws Exception;

    /**
     * 删除检查记录
     *
     * @param pDto
     * @return
     */
    public void deleteCheckRecordInfo(Dto pDto) throws Exception;

    /**
     * 审核检查记录
     *
     * @param pDto
     */
    public void doVerifyCheckRecordInfo(Dto pDto) throws Exception;

    void doBatchVerifyCheckRecordInfo(Dto pDto) throws Exception;

    /**
     * 科目下拉树初始化
     *
     * @param dto
     * @return
     */
    public Dto CourseTreeManage(Dto dto);

    /**
     * 录入检查信息获取科室信息
     *
     * @param pDto
     * @return
     */
    public List<Dto> queryDeptInfoForList(Dto pDto);

    /**
     * 录入检查记录时获取科目信息
     *
     * @param pDto
     * @return
     */
    public List<Dto> queryCourseInfoForList(Dto pDto);

    /**
     * 通过部门id获取医院信息
     *
     * @param pDto
     * @return
     */
    public List<Dto> getHospitalInfoByDept(Dto pDto);

    /**
     * 获取检查记录报表数据
     *
     * @param pDto
     * @return
     */
    public List<Dto> GetCheckReportData(Dto pDto);

    /**
     * 获取全院图表数据
     * @param pDto
     * @return
     */
    public List<Dto> getQuanCheckYuanReportData(Dto pDto);

    /**
     * 导出手卫报表
     *
     * @param request
     * @param response
     * @param pDto
     */

    public void getReportDataForExcel(HttpServletRequest request,
                                      HttpServletResponse response, Dto pDto) throws IOException;

    /**
     * 查询检查记录标准信息
     *
     * @param pDto
     * @return
     */
    public List<Dto> queryCheckStandardInfo(Dto pDto) throws SQLException;

    /**
     * 查询检查记录的历史数据
     *
     * @param pDto
     * @param user
     * @return
     */
    public String queryHistoryCheckDetailInfo(Dto pDto, UserInfoVo user) throws SQLException;

    /**
     * 查询历史修改记录
     *
     * @param pDto
     * @return
     */
    public String queryHistoryCheckInfo(Dto pDto) throws SQLException;

    /**
     * 获取检查记录简单信息
     *
     * @param pDto
     * @return
     */
    public List<Dto> querySimbleCheckInfo(Dto pDto) throws SQLException;

    /**
     * 导出原始数据
     *
     * @param request
     * @param response
     * @param pDto
     */
    public void getReport_HIS_DataForExcel(HttpServletRequest request, HttpServletResponse response, Dto pDto) throws IOException;

    /**
     * 获取图表数据
     * @param pDto
     * @return
     */
    public List GetChartData(Dto pDto);

    /**
     * 导出报表查询列表数据
     * @param request
     * @param response
     * @param pDto
     */
    public void getGridData2Excel(HttpServletRequest request, HttpServletResponse response, Dto pDto) throws IOException;

    /**
     * 导出检查记录查询列表数据
     * @param request
     * @param response
     * @param pDto
     */
    public void getQueryGridData2Excel(HttpServletRequest request, HttpServletResponse response, Dto pDto) throws IOException, SQLException;
}
