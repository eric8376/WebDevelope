/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-18
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */


/**
 *任务操作日志
 */
Ext.define('Ext4.Wf.Model.job_oper_log', {
    extend: 'Ext.data.Model',
    fields: [{name: 'log_no'}, {name: 'mgr_no'}, {name: 'oper_type'}, {name: 'oper_date'}, {name: 'oper_man'}, {name: 'explain'}]
});