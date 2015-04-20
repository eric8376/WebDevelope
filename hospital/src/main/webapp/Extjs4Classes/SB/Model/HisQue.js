/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-18
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */


/**
 *历史队列
 */
Ext.define('Ext4.SB.Model.HisQue', {
    extend: 'Ext.data.Model',
    fields: [{name: 'serial'}, {name: 'begin_datetime'}, {name: 'class_name'}, {name: 'end_type'}, {name: 'end_time'}, {name: 'explain'}, {name: 'param1'}, {name: 'param2'},
        {name: 'param3'}, {name: 'param4'}]
});