/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-18
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */

/**
 *当前队列（一般任务）
 */
Ext.define('Ext4.SB.Model.STQue', {
    extend: 'Ext.data.Model',
    fields: [{name: 'serial'}, {name: 'begin_datetime'}, {name: 'repeat_count'}, {name: 'repeat_interval'}, {name: 'class_name'}, {name: 'explain'}]
});