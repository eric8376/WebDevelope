/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-18
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */


/**
 *排班管理
 */
Ext.define('Ext4.SB.Model.PbInfo', {
    extend: 'Ext.data.Model',
    fields: [{name: 'info_no'}, {name: 'emp_no'}, {name: 'info_date'}, {name: 'cal_no'}, {name: 'hol_no'}, {name: 'pb_no'},
        {name: 'create_setup'}, {name: 'date_type'}, {name: 'is_pay'}, {name: 'begin_work_time'}, {name: 'end_work_time'}, {name: 'begin_wuxiu_time'}, {name: 'end_wuxiu_time'},
        {name: 'username'}, {name: 'deptname'}, {name: 'deptid'}]
});