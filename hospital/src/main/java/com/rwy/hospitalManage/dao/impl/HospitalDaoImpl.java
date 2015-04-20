package com.rwy.hospitalManage.dao.impl;

import com.rwy.hospitalManage.dao.IHospitalDao;
import com.rwy.hospitalManage.entity.*;
import org.apache.commons.beanutils.BeanUtils;
import org.nxstudio.core.dao.impl.GeneralDaoImpl;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.modules.systemmanager.privilege.service.RoleService;
import org.nxstudio.service.socketserver.systools.DateTimeUtil;
import org.nxstudio.util.AutowireVoAtt;
import org.nxstudio.util.BeanCloneHelper;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.util.json.JsonHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * <pre></pre>
 * <br>
 * <pre>所属模块：</pre>
 *
 * @author 黄琦鸿
 *         创建于  2014/12/28 19:36.
 */
@Component
public class HospitalDaoImpl extends GeneralDaoImpl implements IHospitalDao {
    private BeanCloneHelper beanclonehelper = new BeanCloneHelper();
    private static SimpleDateFormat DateFormate = new SimpleDateFormat("yyyy-MM-dd");
    private static SimpleDateFormat TimeFormate = new SimpleDateFormat(
            "yyyy-MM-dd HH:mm:ss");
    private static List<String> methodname = Arrays.asList(new String[]{"java.lang.Integer",
            "java.lang.Long",
            "java.lang.String",
            "java.math.BigDecimal",
            "java.util.Date",
            "java.sql.Timestamp",
            "java.lang.Boolean",
            "java.lang.Double"
    });
    @Autowired
    private RoleService roleService;

    public HospitalDaoImpl() {
        beanclonehelper.getException().add(javax.persistence.Id.class);
        beanclonehelper.getException().add(javax.persistence.ManyToOne.class);
        beanclonehelper.getException().add(javax.persistence.ManyToMany.class);
        beanclonehelper.getException().add(javax.persistence.OneToMany.class);
    }

    @Override
    public void saveHospitalInfo(Dto dto) throws Exception {
        Date today = new Date();
        Integer end_of_valid = dto.getAsInteger("end_of_valid");
        if (end_of_valid == 0) {
            dto.remove("end_of_valid");
        } else {
            today = DateTimeUtil.getDate(today, Calendar.YEAR, end_of_valid);
            dto.put("end_of_valid", today);
        }
        HospitalBaseInfo hospitalBaseInfo = AutowireVoAtt.newAddValue(HospitalBaseInfo.class, dto);
        hospitalBaseInfo.setCreate_time(new Date());
        hospitalBaseInfo.setDelete_status("0");
        save(hospitalBaseInfo);
        dto.put("hospital_id", hospitalBaseInfo.getHospital_id());
        Hospital_ExtendInfo hospitalExtendInfo = AutowireVoAtt.newAddValue(Hospital_ExtendInfo.class, dto);
        save(hospitalExtendInfo);
    }

    @Override
    public void updateHospitalInfo(Dto dto) throws Exception {
        HospitalBaseInfo old_hospitalBaseInfo = get(HospitalBaseInfo.class, dto.getAsLong("hospital_id"));
        Date today = old_hospitalBaseInfo.getCreate_time();
        Integer end_of_valid = dto.getAsInteger("end_of_valid");
        if (end_of_valid == 0) {
            dto.remove("end_of_valid");
        } else {
            today = DateTimeUtil.getDate(today, Calendar.YEAR, end_of_valid);
            dto.put("end_of_valid", today);
        }
        HospitalBaseInfo new_hospitalBaseInfo = AutowireVoAtt.newAddValue(HospitalBaseInfo.class, dto);
        beanclonehelper.setSource(new_hospitalBaseInfo);
        beanclonehelper.setTarget(old_hospitalBaseInfo);
        beanclonehelper.beginClone();
        update(old_hospitalBaseInfo);
        Hospital_ExtendInfo old_hospital_extendinfo = get(Hospital_ExtendInfo.class, dto.getAsLong("extend_id"));
        Hospital_ExtendInfo new_hospital_extendinfo = AutowireVoAtt.newAddValue(Hospital_ExtendInfo.class, dto);
        beanclonehelper.setSource(new_hospital_extendinfo);
        beanclonehelper.setTarget(old_hospital_extendinfo);
        beanclonehelper.beginClone();
        update(old_hospitalBaseInfo);
    }

    @Override
    public void deleteHospitalInfo(Dto dto) {
        HospitalBaseInfo hospitalBaseInfo = get(HospitalBaseInfo.class, dto.getAsLong("hospital_id"));
        hospitalBaseInfo.setDelete_status("1");
        update(hospitalBaseInfo);
    }

    @Override
    public List<HospitalBaseInfo> CheckHospitalUnion(String hospital_name) {
        return listAllByHql("from HospitalBaseInfo b where b.hospital_name=\'" + hospital_name + "\'");
    }

    @Override
    public List<Dto> queryHospitalInfo(Dto dto) throws SQLException {
        List<Dto> list = new ArrayList<Dto>();
        if (dto.containsKey("limit")) {
            list = queryForPage("HospitalManage.getHospitalInfo", dto);
        } else {
            list = queryForList("HospitalManage.getHospitalInfo", dto);
        }

        return list;
    }

    @Override
    public Integer queryHospitalInfoCount(Dto dto) {
        return (Integer) queryForObject("HospitalManage.getHospitalInfoCount", dto);
    }

    @Override
    public List<Dto> queryDeptCourseInfo(Dto dto) throws SQLException {
        List<Dto> list = new ArrayList<Dto>();
        if (dto.containsKey("limit")) {
            list = queryForPage("HospitalManage.queryDeptCourseInfo", dto);
        } else {
            list = queryForList("HospitalManage.queryDeptCourseInfo", dto);
        }

        return list;
    }

    @Override
    public Integer queryDeptCourseInfoCount(Dto dto) {
        return (Integer) queryForObject("HospitalManage.queryDeptCourseInfoCount", dto);
    }

    @Override
    public void saveCourseInfo(Dto dto) throws Exception {
        DeptCourseInfo deptCourseInfo = AutowireVoAtt.newAddValue(DeptCourseInfo.class, dto);
        deptCourseInfo.setCreate_time(new Date());
        deptCourseInfo.setDelete_status("0");
        save(deptCourseInfo);
    }

    @Override
    public void updateCourseInfo(Dto dto) throws Exception {
        DeptCourseInfo old_CourseInfo = get(DeptCourseInfo.class, dto.getAsLong("course_id"));
        DeptCourseInfo new_CourseInfo = AutowireVoAtt.newAddValue(DeptCourseInfo.class, dto);
        beanclonehelper.setSource(new_CourseInfo);
        beanclonehelper.setTarget(old_CourseInfo);
        beanclonehelper.beginClone();
        update(old_CourseInfo);
    }

    @Override
    public void deleteCourseInfo(Dto dto) {
        DeptCourseInfo CourseInfo = get(DeptCourseInfo.class, dto.getAsLong("course_id"));
        CourseInfo.setDelete_status("1");
        update(CourseInfo);
    }

    @Override
    public void deleteDeptCourseInfo(Dto pDto) {
        DeptCourseLinkInfo courseLinkInfo = get(DeptCourseLinkInfo.class, pDto.getAsLong("link_id"));
        deleteObject(courseLinkInfo);
    }

    @Override
    public void saveDeptCourseInfo(Dto pDto) throws Exception {
        DeptCourseLinkInfo deptCourseInfo = AutowireVoAtt.newAddValue(DeptCourseLinkInfo.class, pDto);
        save(deptCourseInfo);
    }

    @Override
    public List<Dto> queryCourseInfo(Dto dto) throws SQLException {
        List<Dto> list = new ArrayList<Dto>();
        if (dto.containsKey("limit")) {
            list = queryForPage("HospitalManage.queryCourseInfo", dto);
        } else {
            list = queryForList("HospitalManage.queryCourseInfo", dto);
        }

        return list;
    }

    @Override
    public Integer queryCourseInfoCount(Dto dto) {
        return (Integer) queryForObject("HospitalManage.queryCourseInfoCount", dto);
    }

    @Override
    public List<Dto> queryCheckInfo(Dto pDto) throws SQLException {
        List<Dto> list = new ArrayList<Dto>();
        if (pDto.containsKey("limit")) {
            list = queryForPage("HospitalManage.queryCheckInfo", pDto);
        } else {
            list = queryForList("HospitalManage.queryCheckInfo", pDto);
        }

        return list;
    }

    @Override
    public Integer queryCheckInfoCount(Dto pDto) {
        return (Integer) queryForObject("HospitalManage.queryCheckInfoCount", pDto);
    }

    @Override
    public void deleteCheckRecordInfo(Dto pDto) {
        CheckRecordInfo checkRecordInfo = get(CheckRecordInfo.class, pDto.getAsLong("record_id"));
        deleteObject(checkRecordInfo);
    }

    @Override
    public void updateCheckRecordInfo(Dto pDto) throws Exception {
        CheckRecordInfo old_CheckRecordInfo = get(CheckRecordInfo.class, pDto.getAsLong("record_id"));
        //判断检查记录审核状态。如果已审核。就不能修改
        String verify_statu = old_CheckRecordInfo.getVerify_statu();
        pDto.put("rolename", "医院管理员");
        List<Dto> role = roleService.queryUserRole(pDto);
        boolean ismepty = G4Utils.isEmpty(role);
        //如果不是医院管理员就，就要对审核状态进行判断。
        if (ismepty && "VS00101".equals(verify_statu)) {
            pDto.put("error", "记录已审核。无法修改");
            return;
        }
        CheckRecordInfo new_CheckRecordInfo = AutowireVoAtt.newAddValue(CheckRecordInfo.class, pDto);
        beanclonehelper.setSource(new_CheckRecordInfo);
        beanclonehelper.setTarget(old_CheckRecordInfo);
        beanclonehelper.beginClone();
        update(old_CheckRecordInfo);
    }

    @Override
    public void saveCheckRecordInfo(Dto pDto) throws Exception {
        CheckRecordInfo checkRecordInfo = AutowireVoAtt.newAddValue(CheckRecordInfo.class, pDto);
        checkRecordInfo.setCheck_time(new Date());
        save(checkRecordInfo);
        pDto.put("record_id", checkRecordInfo.getRecord_id());
    }

    @Override
    public void saveCheckHis(Dto pDto) throws Exception {
        CheckRecordHisInfo checkRecordHisInfo = AutowireVoAtt.newAddValue(CheckRecordHisInfo.class, pDto);
        checkRecordHisInfo.setOperate_time(new Date());
        save(checkRecordHisInfo);
        if (!"OT00103".equals(checkRecordHisInfo.getOperate_type())) {
            pDto.put("history_id", checkRecordHisInfo.getHistory_id());
            saveCheckHisDetail(pDto);
        }

    }

    @Override
    public void saveCheckHisDetail(Dto pDto) throws Exception {
        CheckRecordHistoryDetailInfo checkRecordHistoryDetailInfo = AutowireVoAtt.newAddValue(CheckRecordHistoryDetailInfo.class, pDto);
        save(checkRecordHistoryDetailInfo);
        pDto.put("detail_id", checkRecordHistoryDetailInfo.getDetail_id());
    }

    @Override
    public void saveCheckStandardInfo(Dto pDto) throws Exception {
        CheckStandardInfo checkStandardInfo = AutowireVoAtt.newAddValue(CheckStandardInfo.class, pDto);
        save(checkStandardInfo);
    }

    @Override
    public void deleteCheckStandardInfo(Dto pDto) throws Exception {
        updateByHql("delete from CheckStandardInfo c where c.formid=\'" + pDto.getAsString("record_id") + "\'");
    }

    @Override
    public Dto CourseTreeManage(Dto dto) {
        Dto outDto = new BaseDto();
        List CourseList = queryForList("HospitalManage.CourseTreeManage", dto);
        Dto CourseDto = new BaseDto();
        for (int i = 0; i < CourseList.size(); i++) {
            CourseDto = (BaseDto) CourseList.get(i);
            CourseDto.put("leaf", true);
//			if (deptDto.getAsString("deptid").length() == 6)
//				deptDto.put("expanded", true);
        }
        outDto.put("jsonString", JsonHelper.encodeObject2Json(CourseList));
        return outDto;
    }

    @Override
    public List<Dto> queryDeptInfoForList(Dto dto) {
        List<Dto> depts = queryForList("HospitalManage.queryDeptInfoForList", dto);
        return depts;
    }

    @Override
    public List<Dto> queryCourseInfoForList(Dto dto) {
        List<Dto> depts = queryForList("HospitalManage.queryCourseInfoForList", dto);
        return depts;
    }

    @Override
    public List<Dto> getHospitalInfoByDept(Dto pDto) {
        return queryForList("HospitalManage.getHospitalInfoByDept", pDto);
    }


    @Override
    public void doVerifyCheckRecordInfo(Dto pDto) {
        CheckRecordInfo CheckRecordInfo = get(CheckRecordInfo.class, pDto.getAsLong("record_id"));
        CheckRecordInfo.setVerify_statu(pDto.getAsString("verify_statu"));
        update(CheckRecordInfo);
    }

    @Override
    public List<Dto> queryCheckStandardInfo(Dto pDto) throws SQLException {
        List<Dto> list = new ArrayList<Dto>();
        if (pDto.containsKey("limit")) {
            list = queryForPage("HospitalManage.queryCheckStandardInfo", pDto);
        } else {
            list = queryForList("HospitalManage.queryCheckStandardInfo", pDto);
        }
        return list;
    }

    /**
     * 查询历史修改记录
     *
     * @param pDto
     */
    public List<Dto> queryHistoryCheckInfo(Dto pDto) throws SQLException {
        return queryForPage("HospitalManage.queryHistoryCheckInfo", pDto);
    }

    /**
     * 查询历史修改记录数
     *
     * @param pDto
     */
    public Integer queryHistoryCheckInfoCount(Dto pDto) throws SQLException {
        return (Integer) queryForObject("HospitalManage.queryHistoryCheckInfoCount", pDto);
    }

    @Override
    public List<Dto> queryHistoryCheckDetailInfo(Dto pDto) throws SQLException {
        List<Dto> list = new ArrayList<Dto>();
        if (pDto.containsKey("limit")) {
            list = queryForPage("HospitalManage.queryHistoryCheckDetailInfo", pDto);
        } else {
            list = queryForList("HospitalManage.queryHistoryCheckDetailInfo", pDto);
        }
        return list;
    }

    @Override
    public List<Dto> getRunningTaskForCheckRecord(Dto pDto) throws SQLException {
        List<Dto> list = new ArrayList<Dto>();
        if (pDto.containsKey("limit")) {
            list = queryForPage("HospitalManage.getRunningTaskForCheckRecord", pDto);
        } else {
            list = queryForList("HospitalManage.getRunningTaskForCheckRecord", pDto);
        }
        return list;

    }

    @Override
    public Integer getRunningTaskForCheckRecordCount(Dto dto) {
        return (Integer) queryForObject("HospitalManage.getRunningTaskForCheckRecordCount", dto);
    }

    @Override
    public Integer queryHistoryCheckDetailInfoCount(Dto dto) {
        return (Integer) queryForObject("HospitalManage.queryHistoryCheckDetailInfoCount", dto);
    }

    @Override
    public List<Dto> GetCheckReportData(Dto pDto) {
        return queryForList("HospitalManage.GetCheckReportData", pDto);
    }


    @Override
    public void getConditionSql(Class objclass, Dto dto) {
        StringBuffer sql = new StringBuffer();
        Field[] fs = objclass.getDeclaredFields(); // 得到所有的fields
        String start_date = dto.getAsString("start_date");
        String end_date = dto.getAsString("end_date");
        sql.append(G4Utils.isNotEmpty(start_date) ? "  and c.check_time  >=  str_to_date('" + start_date + "','%Y-%m-%d %H:%i:%S')" : "");
        sql.append(G4Utils.isNotEmpty(end_date) ? (G4Utils.isNotEmpty(start_date) ? " and " : "") + "  c.check_time  <=  str_to_date('" + end_date + "','%Y-%m-%d %H:%i:%S')" : "");
        for (int i = 0; i < fs.length; i++) {
            Field f = fs[i];
            String FieldName = f.getName();
            Object value = dto.getAsString(FieldName);
            sql.append(G4Utils.isNotEmpty(value) ? " and  c." + FieldName + " ='" + value + "'" : "");
        }
        dto.put("conditionsql", sql);

    }

    @Override
    public List GetChartData(Dto pDto) {
        String checkType = pDto.getAsString("checkType");
        List<Dto> result = new ArrayList<Dto>();
        if ("CT00101".equals(checkType)) {
            result = queryForList("HospitalManage.getZQXCheckReportData", pDto);
        } else if ("CT00102".equals(checkType)) {
            result = queryForList("HospitalManage.getZSKHCheckReportData", pDto);
        } else if ("CT00103".equals(checkType)) {
            result = queryForList("HospitalManage.getYCXCheckReportData", pDto);
        }
        return result;
    }

    @Override
    public List getQuanCheckYuanReportData(Dto pDto) {
        return queryForList("HospitalManage.getQuanCheckYuanReportData", pDto);
    }

    public Object getValue(Dto dto, String FieldName, boolean addAndStr) throws ParseException {
        return dto.getAsString(FieldName) + (addAndStr ? "and " : "");

    }
}
