package com.rwy.hospitalManage.dao;


import com.rwy.hospitalManage.entity.HospitalBaseInfo;
import org.nxstudio.core.dao.base.GeneralDao;
import org.nxstudio.core.model.Dto;

import java.sql.SQLException;
import java.text.ParseException;
import java.util.List;

/**
 * <pre></pre>
 * <br>
 * <pre>所属模块：</pre>
 *
 * @author 黄琦鸿
 *         创建于  2014/12/28 19:35.
 */

public interface IHospitalDao extends GeneralDao {
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

    public List<HospitalBaseInfo> CheckHospitalUnion(String hospital_name);

    /**
     * 查询医院信息
     *
     * @param dto
     */
    public List<Dto> queryHospitalInfo(Dto dto) throws SQLException;

    /**
     * 查询医院信息总数
     *
     * @param dto
     * @return
     */
    public Integer queryHospitalInfoCount(Dto dto);

    /**
     * 查询部门科目信息
     *
     * @param dto
     */
    public List<Dto> queryDeptCourseInfo(Dto dto) throws SQLException;

    /**
     * 查询部门科目信息总数
     *
     * @param dto
     * @return
     */
    public Integer queryDeptCourseInfoCount(Dto dto);

    /**
     * 保存科目
     *
     * @param dto
     * @return
     */
    public void saveCourseInfo(Dto dto) throws Exception;

    /**
     * 更新科目
     *
     * @param dto
     * @return
     */
    public void updateCourseInfo(Dto dto) throws Exception;

    /**
     * 删除科目
     *
     * @param dto
     * @return
     */
    public void deleteCourseInfo(Dto dto);

    /**
     * 删除部门分配的科目
     *
     * @param pDto
     * @return
     */
    public void deleteDeptCourseInfo(Dto pDto);

    /**
     * 为部门分配科目
     *
     * @param pDto
     * @return
     */
    public void saveDeptCourseInfo(Dto pDto) throws Exception;

    /**
     * 查询科目
     *
     * @param dto
     * @return
     */
    public List<Dto> queryCourseInfo(Dto dto) throws SQLException;

    /**
     * 查询科目总数
     *
     * @param dto
     * @return
     */
    public Integer queryCourseInfoCount(Dto dto);

    /**
     * 查询检查记录
     *
     * @param pDto
     * @return
     */
    public List<Dto> queryCheckInfo(Dto pDto) throws SQLException;

    /**
     * 查询检查记录总数
     *
     * @param pDto
     * @return
     */
    public Integer queryCheckInfoCount(Dto pDto);

    /**
     * 删除检查记录
     *
     * @param pDto
     * @return
     */
    public void deleteCheckRecordInfo(Dto pDto);

    /**
     * 修改检查记录
     *
     * @param pDto
     * @return
     */
    public void updateCheckRecordInfo(Dto pDto) throws Exception;

    /**
     * 保存检查记录
     *
     * @param pDto
     * @return
     */
    public void saveCheckRecordInfo(Dto pDto) throws Exception;

    /**
     * 保存检查记录操作历史
     *
     * @param pDto
     * @return
     */
    public void saveCheckHis(Dto pDto) throws Exception;

    /**
     * 保存修改检查记录明细
     *
     * @param pDto
     * @throws Exception
     */
    public void saveCheckHisDetail(Dto pDto) throws Exception;

    /**
     * 保存检查标准记录
     *
     * @param pDto
     * @return
     */
    public void saveCheckStandardInfo(Dto pDto) throws Exception;

    /**
     * 删除检查标准记录
     *
     * @param pDto
     * @return
     */
    public void deleteCheckStandardInfo(Dto pDto) throws Exception;

    /**
     * 科目下拉树初始化
     *
     * @param dto
     * @return
     */
    public Dto CourseTreeManage(Dto dto);

    public List<Dto> queryDeptInfoForList(Dto dto);

    public List<Dto> queryCourseInfoForList(Dto pDto);

    public List<Dto> getHospitalInfoByDept(Dto pDto);

    public List<Dto> GetCheckReportData(Dto pDto);


    /**
     * 审核录入
     *
     * @param pDto
     */
    public void doVerifyCheckRecordInfo(Dto pDto);

    /**
     * 查询检查记录标准信息
     *
     * @param pDto
     */
    public List<Dto> queryCheckStandardInfo(Dto pDto) throws SQLException;

    /**
     * 查询历史修改记录
     *
     * @param pDto
     */
    public List<Dto> queryHistoryCheckInfo(Dto pDto) throws SQLException;

    /**
     * 查询历史修改记录数
     *
     * @param pDto
     */
    public Integer queryHistoryCheckInfoCount(Dto pDto) throws SQLException;

    /**
     * 查询检查记录历史
     *
     * @param pDto
     * @return
     * @throws SQLException
     */
    public List<Dto> queryHistoryCheckDetailInfo(Dto pDto) throws SQLException;

    List<Dto> getRunningTaskForCheckRecord(Dto pDto) throws SQLException;

    Integer getRunningTaskForCheckRecordCount(Dto dto);

    /**
     * 查询检查记录历史总数
     *
     * @return
     * @throws SQLException
     */
    public Integer queryHistoryCheckDetailInfoCount(Dto dto);

    /**
     * 动态拼接sql
     *
     * @param objclass
     * @param dto
     */
    public void getConditionSql(Class objclass, Dto dto);

    /**
     * 获取图表数据
     * @param pDto
     * @return
     */
    public List GetChartData(Dto pDto);

    /**
     * 获取全院报表数据
     * @param pDto
     * @return
     */
   public  List getQuanCheckYuanReportData(Dto pDto);
}
