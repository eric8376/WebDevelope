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
Ext.define('Ext4.SB.Model.RegPbInfo', {
    extend: 'Ext.data.Model',
    fields: [{name: 'pb_no'}, {name: 'pb_name'}, {name: 'pb_date'}, {name: 'pb_iswork'}, {name: 'pb_ispay'}, {name: 'pb_start_work_time'},
        {name: 'pb_end_work_time'}, {name: 'pb_start_wuxiu_time'}, {name: 'pb_end_wuxiu_time'}, {name: 'pb_explain'}]
});