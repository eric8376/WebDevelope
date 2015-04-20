/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-18
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */

/**
 *节假日
 */
Ext.define('Ext4.SB.Model.CalendarMx', {
    extend: 'Ext.data.Model',
    fields: [{name: 'mx_no'}, {name: 'cal_no'}, {name: 'mx_date'}, {name: 'mx_iswork'}, {name: 'mx_ispay'}, {name: 'mx_explain'}, {name: 'begin_work_time'},
        {name: 'end_work_time'},
        {name: 'begin_wuxiu_time'}, {name: 'end_wuxiu_time'}]
});