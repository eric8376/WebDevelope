/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-18
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */


/**
 *日历
 */
Ext.define('Ext4.SB.Model.Calendar', {
    extend: 'Ext.data.Model',
    fields: [{name: 'cal_no'}, {name: 'cal_name'}, {name: 'cal_explain'}, {name: 'cal_isbase'}, {name: 'cal_work_set'}, {name: 'cal_pay_set'},
        {name: 'work_w6'}, {name: 'work_w7'}, {name: 'work_h'}, {name: 'pay_w6'}, {name: 'pay_w7'}, {name: 'pay_h'}]
});