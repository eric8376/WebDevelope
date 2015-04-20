/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-18
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */

/**
 *当前队列（高级任务）
 */
Ext.define('Ext4.SB.Model.CTQue', {
    extend: 'Ext.data.Model',
    fields: [{name: 'serial'}, {name: 'create_date'}, {name: 'cron_exp'}, {name: 'class_name'}, {name: 'explain'}]
});