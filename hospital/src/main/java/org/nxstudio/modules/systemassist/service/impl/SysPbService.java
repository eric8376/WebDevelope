package org.nxstudio.modules.systemassist.service.impl;

import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.modules.systemassist.dao.SysPbDao;
import org.nxstudio.modules.systemassist.service.ISysPbService;
import org.nxstudio.util.g4.G4Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【系统排班业务实现层】
 * 时间: 2013-06-10 下午4:36
 */
@Service("sysPbService")
public class SysPbService implements ISysPbService {

    @Autowired
    private SysPbDao sysPbDao;

    @Override
    public Dto addCalendarDeptR(Dto pDto) {
        // 查询该部门是否已经拥有日历
        List list = sysPbDao.queryForList("sysPb.queryT_SB_DEPT_CALENDAR_R",
                pDto);
        if (list.size() != 0) {
            pDto.put("success", false);
            pDto.put("msg", "该部门已经匹配好了行事历了~");
            return pDto;
        }

        // 查询最大的编号
        String str_tmp = (String) sysPbDao
                .queryForObject("sysPb.maxT_SB_DEPT_CALENDAR_R");
        int maxNo = str_tmp == null ? 1 : Integer.parseInt(str_tmp) + 1;
        pDto.put("dcr_no", maxNo);
        // 加入关系
        sysPbDao.insert("sysPb.insertT_SB_DEPT_CALENDAR_R", pDto);
        pDto.put("success", true);
        pDto.put("msg", "已添加~");

        return pDto;
    }

    @Override
    public Dto delCalendarDeptR(Dto pDto) {
        sysPbDao.insert("sysPb.deleteT_SB_DEPT_CALENDAR_R", pDto);
        return pDto;
    }

    @Override
    public Dto addRegPbInfo(Dto pDto) {
        // 查询最大的编号
        String str_tmp = (String) sysPbDao
                .queryForObject("sysPb.maxT_SB_PB_MGR");
        int maxNo = str_tmp == null ? 1 : Integer.parseInt(str_tmp) + 1;
        pDto.put("pb_no", maxNo);
        str_tmp = (String) sysPbDao.queryForObject("sysPb.maxT_SB_PB_MGR_EMP");
        int maxNo2 = str_tmp == null ? 1 : Integer.parseInt(str_tmp) + 1;

        // 添加规律排班
        sysPbDao.insert("sysPb.insertT_SB_PB_MGR", pDto);

        // 添加引用该排班信息的人员
        String[] users = pDto.getAsString("users").split(",");
        for (int i = 0; i < users.length; i++) {
            pDto.put("emp_no", users[i]);
            pDto.put("pb_emp_no", maxNo2++);// 编号逐级加1
            sysPbDao.insert("sysPb.insertT_SB_PB_MGR_EMP", pDto);
        }

        // 添加成功操作信息
        pDto.put("success", true);
        pDto.put("msg", "已添加~");

        return pDto;
    }

    @Override
    public Dto delRegPbInfo(Dto pDto) {
        sysPbDao.delete("sysPb.deleteT_SB_PB_MGR_EMP", pDto);
        sysPbDao.delete("sysPb.deleteT_SB_PB_MGR", pDto);
        return pDto;
    }

    @Override
    public Dto updRegPbInfo(Dto pDto) {

        // 更新规律排班信息
        sysPbDao.update("sysPb.updateT_SB_PB_MGR", pDto);

        // 删除引用该排班信息的成员
        sysPbDao.delete("sysPb.deleteT_SB_PB_MGR_EMP", pDto);

        // 查询最大的编号
        String str_tmp = (String) sysPbDao.queryForObject("sysPb.maxT_SB_PB_MGR_EMP");
        int maxNo2 = str_tmp == null ? 1 : Integer.parseInt(str_tmp) + 1;
        // 添加引用该排班信息的人员
        String[] users = pDto.getAsString("users").split(",");
        for (int i = 0; i < users.length; i++) {
            pDto.put("emp_no", users[i]);
            pDto.put("pb_emp_no", maxNo2++);// 编号逐级加1
            sysPbDao.insert("sysPb.insertT_SB_PB_MGR_EMP", pDto);
        }

        // 添加成功操作信息
        pDto.put("success", true);
        pDto.put("msg", "已添加~");

        return pDto;
    }

    @Override
    public Dto createPbInfo(Dto pDto) {
        String setup = pDto.getAsString("setup");// 当前步骤数

        // 第一步获取部门信息和对应的日历信息
        if (setup.equals("1")) {
            // 如果需要重新排班
            if (pDto.getAsBoolean("isRecreate")) {
                int year = pDto.getAsInteger("year");
                int month = pDto.getAsInteger("month");
                // 计算时间范围
                int minDate, maxDate;// 最小日期和最大日期
                Calendar dateNow = Calendar.getInstance();
                if (dateNow.get(dateNow.YEAR) == year
                        && dateNow.get(dateNow.MONTH) == month - 1) {
                    minDate = dateNow.get(dateNow.DATE) + 1;
                    maxDate = dateNow.getActualMaximum(dateNow.DAY_OF_MONTH);
                } else {
                    dateNow.set(year, month - 1, 1);
                    minDate = 1;
                    maxDate = dateNow.getActualMaximum(dateNow.DAY_OF_MONTH);
                }
                pDto.put("minDate", year + "-" + month + "-" + minDate);
                pDto.put("maxDate", year + "-" + month + "-" + maxDate);

                sysPbDao.delete("sysPb.deleteT_SB_JOB_MGR_INFOS", pDto);
            }

            // 获取所有部门信息
            List list = sysPbDao
                    .queryForList("sysPb.queryT_SB_DEPT_CALENDAR_R2");

            pDto.put("data", list);
        }
        // 第二步获取部门人员并根据所匹配日历的排班
        else if (setup.equals("2")) {
            int year = pDto.getAsInteger("year");
            int month = pDto.getAsInteger("month");
            String dept_no = pDto.getAsString("dept_no");
            String cal_no = pDto.getAsString("cal_no");

            // 计算时间范围
            int minDate, maxDate;// 最小日期和最大日期
            Calendar dateNow = Calendar.getInstance();
            if (dateNow.get(dateNow.YEAR) == year
                    && dateNow.get(dateNow.MONTH) == month - 1) {
                minDate = dateNow.get(dateNow.DATE) + 1;
                maxDate = dateNow.getActualMaximum(dateNow.DAY_OF_MONTH);
            } else {
                dateNow.set(year, month - 1, 1);
                minDate = 1;
                maxDate = dateNow.getActualMaximum(dateNow.DAY_OF_MONTH);
            }
            pDto.put("minDate", year + "-" + month + "-" + minDate);
            pDto.put("maxDate", year + "-" + month + "-" + maxDate);

            // 获取该日历的设置参数和时间设定
            Dto pCal = (Dto) sysPbDao.queryForList("sysCalendar.selectT_SB_CALENDAR",
                    pDto).get(0);
            List pCalTime = sysPbDao.queryForList(
                    "sysCalendar.queryT_SB_CALENDAR_TIME", pDto);
            String workSet = pCal.getAsString("cal_work_set");// 工作日设置
            String paySet = pCal.getAsString("cal_pay_set");// 有薪日设置

            // 获取部门人员列表
            pDto.put("deptid", dept_no);
            List list = sysPbDao.queryForList("EAOrg.queryEaUser", pDto);

            // 查询排班信息表最大编号
            String str_tmp = (String) sysPbDao
                    .queryForObject("sysPb.maxT_SB_JOB_MGR_INFOS");
            Long maxNo = str_tmp == null ? 1 : Long.parseLong(str_tmp) + 1;

            // 查询每个人员在该月份日历生成的最后一天，并生成未生成完毕的数据
            for (int i = 0; i < list.size(); i++) {
                int startNo = minDate;// 开始日期
                Dto tmpDto = (Dto) list.get(i);
                pDto.put("emp_no", tmpDto.getAsString("userid"));// 员工号
                String lastDay = (String) sysPbDao.queryForObject(
                        "sysPb.max1T_SB_JOB_MGR_INFOS", pDto);

                // 如果当月已经设置好了，则跳过
                if (lastDay != null && lastDay.equals("" + maxDate)) {
                    tmpDto.put("okFlag", "0");
                    list.set(i, tmpDto);
                    continue;
                }

                // 防止增加一半的时候服务器停电...- -!
                if (lastDay != null) {
                    startNo = Integer.parseInt(lastDay) + 1;
                    startNo = startNo > minDate ? startNo : minDate;
                }

                // 增加该员工该月排班(日期必须>=今天)
                int weekNow = 0;// 当前星期几(1~7:日~六)
                for (int j = startNo; j <= maxDate; j++) {
                    pDto.put("info_no", maxNo++);// 编号
                    pDto.put("info_date", year + "-" + month + "-" + j);// 日期
                    pDto.put("cal_no", cal_no);// 日历编号
                    pDto.put("create_setup", "1");// 生成步骤(1代表着日历生成步骤)

                    // 引用日历规则设置上班信息
                    dateNow.set(dateNow.DATE, j);
                    weekNow = dateNow.get(dateNow.DAY_OF_WEEK);
                    pDto.put("date_type",
                            workSet.charAt(weekNow - 1) == '1' ? 1 : 2);
                    pDto.put("is_pay", paySet.charAt(weekNow) == '1' ? 1 : 0);
                    Dto tmp_time = (Dto) pCalTime.get(weekNow - 1);
                    pDto.put("begin_work_time",
                            tmp_time.getAsString("begin_work_time"));
                    pDto.put("end_work_time",
                            tmp_time.getAsString("end_work_time"));
                    pDto.put("begin_wuxiu_time",
                            tmp_time.getAsString("begin_wuxiu_time"));
                    pDto.put("end_wuxiu_time",
                            tmp_time.getAsString("end_wuxiu_time"));
                    sysPbDao.insert("sysPb.insertT_SB_JOB_MGR_INFOS", pDto);
                }
                tmpDto.put("okFlag", "1");
                list.set(i, tmpDto);
            }
            pDto.put("data", list);
        }
        // 第三步节假日设定
        else if (setup.equals("3")) {
            // 参数
            int year = pDto.getAsInteger("year");
            int month = pDto.getAsInteger("month");
            Calendar dateNow = Calendar.getInstance();
            dateNow.set(year, month - 1, 1);
            int maxDate = dateNow.getActualMaximum(dateNow.DAY_OF_MONTH);

            // 设定月份查询条件
            pDto.put("month", month);
            // 设定新历查询条件
            pDto.put("hol_islunar", 0);
            // 获取该月的所有新历节假日
            List list = sysPbDao.queryForList(
                    "sysCalendar.queryT_SB_CALENDAR_HOLIDAY1", pDto);

            // 设定新历节假日
            for (int i = 0; i < list.size(); i++) {
                Dto tmpDto = (Dto) list.get(i);
                String theDate = tmpDto.getAsString("hol_day").split("/")[1];

                // 获取所有该该日的记录
                pDto.put("create_setup", 1);
                pDto.put("info_date", year + "-" + month + "-" + theDate);
                List infoList = sysPbDao.queryForList(
                        "sysPb.queryT_SB_JOB_MGR_INFOS", pDto);

                for (int j = 0; j < infoList.size(); j++) {
                    Dto tmpInfo = (Dto) infoList.get(j);
                    // 查询所对应的日历设定
                    Dto pCal = (Dto) sysPbDao.queryForList(
                            "sysCalendar.selectT_SB_CALENDAR", tmpInfo).get(0);
                    List pCalTime = sysPbDao.queryForList(
                            "sysCalendar.queryT_SB_CALENDAR_TIME", tmpInfo);

                    // 开始设置
                    pDto.put("hol_no", tmpDto.getAsString("hol_no"));// 节假日编号（用于记录）
                    pDto.put("create_setup", "12");// 生成步骤(12代表着日历->节假日生成步骤)
                    pDto.put("date_type", pCal.getAsString("cal_work_set")
                            .charAt(7) == '1' ? 4 : 3);
                    pDto.put("is_pay", pCal.getAsString("cal_pay_set")
                            .charAt(7) == '1' ? 1 : 0);
                    Dto tmp_time = (Dto) pCalTime.get(7);
                    pDto.put("begin_work_time",
                            tmp_time.getAsString("begin_work_time"));
                    pDto.put("end_work_time",
                            tmp_time.getAsString("end_work_time"));
                    pDto.put("begin_wuxiu_time",
                            tmp_time.getAsString("begin_wuxiu_time"));
                    pDto.put("end_wuxiu_time",
                            tmp_time.getAsString("end_wuxiu_time"));
                    // 条件设置
                    pDto.put("info_no", tmpInfo.getAsString("info_no"));

                    sysPbDao.update("sysPb.updateT_SB_JOB_MGR_INFOS1", pDto);
                }
            }
            // 获取农历（未完成）
            // 设定农历节假日（未完成）

            pDto.put("data", list);
        }
        // 第四步该月份基础明细设定
        else if (setup.equals("4")) {
            // 参数
            int year = pDto.getAsInteger("year");
            int month = pDto.getAsInteger("month");
            Calendar dateNow = Calendar.getInstance();
            dateNow.set(year, month - 1, 1);
            int maxDate = dateNow.getActualMaximum(dateNow.DAY_OF_MONTH);
            pDto.put("cal_no", "");

            // 获取该月份基础明细设置
            pDto.put("minDate", year + "-" + month + "-1");
            pDto.put("maxDate", year + "-" + month + "-" + maxDate);
            pDto.put("cal_isbase", 1);
            List list = sysPbDao.queryForList("sysCalendar.queryT_SB_CALENDAR_MX2",
                    pDto);

            // 更新所有未设置过基础明细设置
            for (int i = 0; i < list.size(); i++) {
                Dto tmpMx = (Dto) list.get(i);
                pDto.put("info_date", tmpMx.getAsDate("mx_date"));
                pDto.put("after_create_setup", "3");// 生成步骤(3代表着基础日历)
                pDto.put("is_pay", tmpMx.getAsInteger("mx_ispay"));
                pDto.put("begin_work_time",
                        tmpMx.getAsString("begin_work_time"));
                pDto.put("end_work_time", tmpMx.getAsString("end_work_time"));
                pDto.put("begin_wuxiu_time",
                        tmpMx.getAsString("begin_wuxiu_time"));
                pDto.put("end_wuxiu_time", tmpMx.getAsString("end_wuxiu_time"));

                // 如果是工作日的话
                if (tmpMx.getAsInteger("mx_iswork") == 1) {
                    // 更新非节假日
                    pDto.put("date_type", 1);
                    pDto.put("p_create_setup", "1");
                    sysPbDao.update("sysPb.updateT_SB_JOB_MGR_INFOS", pDto);
                    // 更新节假日
                    pDto.put("date_type", 4);
                    pDto.put("p_create_setup", "12");
                    sysPbDao.update("sysPb.updateT_SB_JOB_MGR_INFOS", pDto);
                }
                // 如果是休息日的话
                else {
                    // 更新非节假日
                    pDto.put("date_type", 2);
                    pDto.put("p_create_setup", "1");
                    sysPbDao.update("sysPb.updateT_SB_JOB_MGR_INFOS", pDto);
                    // 更新节假日
                    pDto.put("date_type", 3);
                    pDto.put("p_create_setup", "12");
                    sysPbDao.update("sysPb.updateT_SB_JOB_MGR_INFOS", pDto);

                }
            }

            pDto.put("data", list);
        }
        // 第五步该月份日历明细设定
        else if (setup.equals("5")) {
            // 参数
            int year = pDto.getAsInteger("year");
            int month = pDto.getAsInteger("month");
            Calendar dateNow = Calendar.getInstance();
            dateNow.set(year, month - 1, 1);
            int maxDate = dateNow.getActualMaximum(dateNow.DAY_OF_MONTH);
            pDto.put("cal_no", "");

            // 获取该月份日历明细设置
            pDto.put("minDate", year + "-" + month + "-1");
            pDto.put("maxDate", year + "-" + month + "-" + maxDate);
            List list = sysPbDao.queryForList("sysCalendar.queryT_SB_CALENDAR_MX2",
                    pDto);

            // 更新所有未设置过基础明细设置
            for (int i = 0; i < list.size(); i++) {
                Dto tmpMx = (Dto) list.get(i);
                pDto.put("info_date", tmpMx.getAsDate("mx_date"));
                pDto.put("after_create_setup", "4");// 生成步骤(4代表着日历明细)
                pDto.put("is_pay", tmpMx.getAsInteger("mx_ispay"));
                pDto.put("begin_work_time",
                        tmpMx.getAsString("begin_work_time"));
                pDto.put("end_work_time", tmpMx.getAsString("end_work_time"));
                pDto.put("begin_wuxiu_time",
                        tmpMx.getAsString("begin_wuxiu_time"));
                pDto.put("end_wuxiu_time", tmpMx.getAsString("end_wuxiu_time"));

                // 如果是工作日的话
                if (tmpMx.getAsInteger("mx_iswork") == 1) {
                    // 更新非节假日
                    pDto.put("date_type", 1);
                    pDto.put("p_create_setup", "1");
                    sysPbDao.update("sysPb.updateT_SB_JOB_MGR_INFOS", pDto);
                    pDto.put("p_create_setup", "13");
                    sysPbDao.update("sysPb.updateT_SB_JOB_MGR_INFOS", pDto);
                    // 更新节假日
                    pDto.put("date_type", 4);
                    pDto.put("p_create_setup", "12");
                    sysPbDao.update("sysPb.updateT_SB_JOB_MGR_INFOS", pDto);
                    pDto.put("p_create_setup", "123");
                    sysPbDao.update("sysPb.updateT_SB_JOB_MGR_INFOS", pDto);
                }
                // 如果是休息日的话
                else {
                    // 更新非节假日
                    pDto.put("date_type", 2);
                    pDto.put("p_create_setup", "1");
                    sysPbDao.update("sysPb.updateT_SB_JOB_MGR_INFOS", pDto);
                    // 更新节假日
                    pDto.put("date_type", 3);
                    pDto.put("p_create_setup", "12");
                    sysPbDao.update("sysPb.updateT_SB_JOB_MGR_INFOS", pDto);
                }
            }

            pDto.put("data", list);
        }
        // 第六步排班规则设定->完成
        else if (setup.equals("6")) {
            // 参数
            int year = pDto.getAsInteger("year");
            int month = pDto.getAsInteger("month");
            Calendar dateNow = Calendar.getInstance();
            dateNow.set(year, month - 1, 1);
            int maxDate = dateNow.getActualMaximum(dateNow.DAY_OF_MONTH);
            pDto.put("cal_no", "");

            // 获取该月份排班规则设置
            pDto.put("minDate", year + "-" + month + "-1");
            pDto.put("maxDate", year + "-" + month + "-" + maxDate);
            List list = sysPbDao.queryForList("sysPb.queryT_SB_PB_MGR1", pDto);

            // 设置排班规则
            for (int i = 0; i < list.size(); i++) {
                Dto tmpDto = (Dto) list.get(i);
                // 查询成员
                List empList = sysPbDao.queryForList(
                        "sysPb.queryT_SB_PB_MGR_EMP1", tmpDto);
                String tmpStr = "";// 用户群
                for (int j = 0; j < empList.size(); j++) {
                    tmpStr += ((Dto) empList.get(j)).getAsString("emp_no");
                    if (j != empList.size() - 1) {
                        tmpStr += ",";
                    }
                }
                // 无人员跳到下一次
                if (tmpStr == "") {
                    continue;
                }
                pDto.put("pb_no", tmpDto.getAsString("pb_no"));
                pDto.put("emp_no", tmpStr);
                pDto.put("info_date", tmpDto.getAsDate("pb_date"));
                // 设置参数并更新
                pDto.put("after_create_setup", "5");// 生成步骤(5代表着排班规则)
                pDto.put("is_pay", tmpDto.getAsInteger("pb_ispay"));
                pDto.put("begin_work_time",
                        tmpDto.getAsString("pb_start_work_time"));
                pDto.put("end_work_time",
                        tmpDto.getAsString("pb_end_work_time"));
                pDto.put("begin_wuxiu_time",
                        tmpDto.getAsString("pb_start_wuxiu_time"));
                pDto.put("end_wuxiu_time",
                        tmpDto.getAsString("pb_end_wuxiu_time"));

                // 如果是工作日的话
                if (tmpDto.getAsInteger("pb_iswork") == 1) {
                    // 更新非节假日
                    pDto.put("date_type", 1);
                    pDto.put("p_create_setup2", "%2%");
                    pDto.put("p_create_setup3", "%5%");
                    sysPbDao.update("sysPb.updateT_SB_JOB_MGR_INFOS", pDto);
                    // 更新节假日
                    pDto.put("date_type", 4);
                    pDto.put("p_create_setup2", "");
                    pDto.put("p_create_setup", "%2%");
                    sysPbDao.update("sysPb.updateT_SB_JOB_MGR_INFOS", pDto);
                }
                // 如果是休息日的话
                else {
                    // 更新非节假日
                    pDto.put("date_type", 2);
                    pDto.put("p_create_setup2", "%2%");
                    pDto.put("p_create_setup3", "%5%");
                    sysPbDao.update("sysPb.updateT_SB_JOB_MGR_INFOS", pDto);
                    // 更新节假日
                    pDto.put("date_type", 3);
                    pDto.put("p_create_setup2", "");
                    pDto.put("p_create_setup", "%2%");
                    sysPbDao.update("sysPb.updateT_SB_JOB_MGR_INFOS", pDto);
                }
            }

            pDto.put("data", list);
        }

        // 后续(调休|请假)|加班
        return pDto;
    }

    @Override
    public List getPbInfoByTwoTime(Date beginDate, Date endDate, String userAccount) {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
//      	DateFormat df=DateFormat.getDateInstance(DateFormat.MEDIUM);
        Dto pDto = new BaseDto();
        pDto.put("minDate", df.format(beginDate));
        pDto.put("maxDate", df.format(endDate));
        pDto.put("account", userAccount);
        List list = sysPbDao.queryForList("sysPb.queryT_SB_JOB_MGR_INFOS2", pDto);
        try {
            GregorianCalendar[] ga = G4Utils.getBetweenDate(df.format(beginDate), df.format(endDate));
            int count = list.size();
            int fact = ga.length;
            if (count < fact) {
                List<Dto> baseList = sysPbDao.queryForList("sysPb.queryT_SB_CALENDARByIsBase");
                if (0 < baseList.size()) {
                    Dto base = baseList.get(0);
                    String work_set = base.getAsString("cal_work_set");
                    GregorianCalendar e = null;
                    Dto info = null;
                    Dto inDto = new BaseDto();
                    inDto.put("cal_no", base.getAsString("cal_no"));
                    for (int i = count; i < fact; i++) {
                        e = ga[i];
                        int week = G4Utils.getWeekDayByDateToInt(e.get(Calendar.YEAR) + "-" + (e.get(Calendar.MONTH) + 1) + "-" + e.get(Calendar.DAY_OF_MONTH));
                        info = new BaseDto();
                        String weekType = work_set.substring(week, week + 1);
                        String day = e.getTime().getMonth() + "/" + e.getTime().getDate();
                        inDto.put("hol_day", day);
                        List<Dto> holidays = sysPbDao.queryForList("sysCalendar.queryT_SB_CALENDAR_HOLIDAYByDate", inDto);
                        info.put("date_type", holidays.size() == 0 ? weekType : "0");
                        inDto.put("week_type", weekType);
                        //info.put("")
                        List<Dto> weekList = sysPbDao.queryForList("sysPb.queryT_SB_CALENDAR_TIMEByWeekType", inDto);
                        if (weekList.size() != 0) {
                            Dto weekDto = weekList.get(0);
                            info.put("begin_work_time", weekDto.getAsString("begin_work_time"));
                            info.put("end_work_time", weekDto.getAsString("end_work_time"));
                            info.put("begin_wuxiu_time", weekDto.getAsString("begin_wuxiu_time"));
                            info.put("end_wuxiu_time", weekDto.getAsString("end_wuxiu_time"));
                            list.add(info);
                        }
                    }
                }
            }
        } catch (ParseException pe) {

        }
        return list;
    }

    /**
     * 获取工作时间差
     *
     * @param beginDate
     * @param endDate
     * @param userAccount
     * @return
     */
    public int WorkTimeDiff(Date beginDate, Date endDate, String userAccount) {
        List<Dto> list = null;
        Date time = new Date();
        time.setTime(beginDate.getTime());
        Date starttime = beginDate;
        Date endtime = new Date();
        int surplusDiff = 0;
        SimpleDateFormat dfs = new SimpleDateFormat("yyyy/MM/dd HH:mm");
        SimpleDateFormat ymdf = new SimpleDateFormat("yyyy/MM/dd");
        while (true) {
            list = getPbInfoByTwoTime(time, time, userAccount);
            if (0 == list.size())
                return 0;
            try {
                Date amStart = dfs.parse(ymdf.format(time) + " " + list.get(0).getAsString("begin_work_time"));
                Date amEnd = dfs.parse(ymdf.format(time) + " " + list.get(0).getAsString("begin_wuxiu_time"));
                Date pmStart = dfs.parse(ymdf.format(time) + " " + list.get(0).getAsString("end_wuxiu_time"));
                Date pmEnd = dfs.parse(ymdf.format(time) + " " + list.get(0).getAsString("end_work_time"));
                int type = 0;
                time = GetDateDiff(starttime, amStart, amEnd);
                if (null == time) {
                    time = GetDateDiff(starttime, pmStart, pmEnd);
                    if (null == time) {
                        time = pmEnd;
                        AddDateByDay(time, 1);
                        continue;
                    }
                    type = 1;
                }
                long timeDiff = 0;
                if (type <= 0) {
                    if (0 > G4Utils.DateCompare(endDate, amEnd)) {
                        surplusDiff += endDate.getTime() - amStart.getTime();
                        break;
                    } else {
                        surplusDiff += amEnd.getTime() - amStart.getTime();
                    }
                    time = pmStart;
                }
                if (0 < G4Utils.DateCompare(endDate, pmStart))
                    break;
                if (type <= 1) {
                    if (0 > G4Utils.DateCompare(endDate, pmStart)) {
                        surplusDiff += endDate.getTime() - pmStart.getTime();
                        break;
                    } else {
                        surplusDiff += pmEnd.getTime() - pmStart.getTime();
                    }
                    time = pmEnd;
                }
                endtime.setTime(time.getTime() + timeDiff);
            } catch (ParseException e) {
                return 0;
            }
        }
        return surplusDiff / 60000;
    }

    public Date EndTimeByWork(Date start, int diffSecond, String account) {
        List<Dto> list = null;
        Date time = new Date();
        time.setTime(start.getTime());
        Date starttime = start;
        Date endtime = new Date();
        int surplusDiff = diffSecond * 1000;
        SimpleDateFormat dfs = new SimpleDateFormat("yyyy/MM/dd HH:mm");
        SimpleDateFormat ymdf = new SimpleDateFormat("yyyy/MM/dd");
        while (true) {
            list = getPbInfoByTwoTime(time, time, account);
            if (0 == list.size())
                return null;
            try {
                Date amStart = dfs.parse(ymdf.format(time) + " " + list.get(0).getAsString("begin_work_time"));
                Date amEnd = dfs.parse(ymdf.format(time) + " " + list.get(0).getAsString("begin_wuxiu_time"));
                Date pmStart = dfs.parse(ymdf.format(time) + " " + list.get(0).getAsString("end_wuxiu_time"));
                Date pmEnd = dfs.parse(ymdf.format(time) + " " + list.get(0).getAsString("end_work_time"));
                int type = 0;
                time = GetDateDiff(starttime, amStart, amEnd);
                if (null == time) {
                    time = GetDateDiff(starttime, pmStart, pmEnd);
                    if (null == time) {
                        time = pmEnd;
                        AddDateByDay(time, 1);
                        continue;
                    }
                    type = 1;
                }
                long timeDiff = 0;
                if (type <= 0) {
                    timeDiff += amEnd.getTime() - time.getTime();
                    if (surplusDiff <= timeDiff) {
                        endtime.setTime(time.getTime() + surplusDiff);
                        break;
                    }
                    time = pmStart;
                }
                if (type <= 1) {
                    timeDiff += pmEnd.getTime() - time.getTime();
                    if (surplusDiff <= timeDiff) {
                        endtime.setTime(time.getTime() + surplusDiff);
                        break;
                    }
                    time = pmEnd;
                }
                endtime.setTime(time.getTime() + timeDiff);
            } catch (ParseException e) {
                return null;
            }
        }
        return endtime;
    }

    private Date GetDateDiff(Date time, Date s, Date e) {
        if (G4Utils.DateCompare(time, s) <= 0)
            return s;
        else if (G4Utils.DateCompare(time, e) < 0)
            return time;
        else
            return null;
    }

    private void AddDateByDay(Date time, int day) {
        Date now = new Date(time.getTime() + day * 86400000);
        SimpleDateFormat dfs = new SimpleDateFormat("yyyy/MM/dd HH:mm");
        SimpleDateFormat ymdf = new SimpleDateFormat("yyyy/MM/dd");
        try {
            time.setTime(dfs.parse(ymdf.format(now) + " 00:00").getTime());
        } catch (ParseException e) {
        }
    }
}
