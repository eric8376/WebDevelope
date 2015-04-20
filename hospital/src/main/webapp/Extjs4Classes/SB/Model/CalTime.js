/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-18
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */

/**
 *日历time设定
 */
Ext.define('Ext4.SB.Model.CalTime', {
    extend: 'Ext.data.Model',
    fields: [{name: 'time_no'}, {name: 'cal_no'}, {name: 'begin_work_time'}, {name: 'end_work_time'}, {name: 'begin_wuxiu_time'}, {name: 'end_wuxiu_time'}, {name: 'week_typ'}]
});