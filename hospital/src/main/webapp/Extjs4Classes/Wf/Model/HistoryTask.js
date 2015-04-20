/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-18
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */

/**
 * 历史任务
 */
Ext.define('Ext4.Wf.Model.HistoryTask', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id_', type: 'string'},
        {name: 'task_def_key_', type: 'string'},
        {name: 'suggestion_desc', type: 'string'},
        {name: 'proc_inst_id_', type: 'string'},
        {name: 'name_', type: 'string'},
        {name: 'description_', type: 'string'},
        {name: 'assignee_', type: 'string'},
        {name: 'end_time_', type: 'string'},
        {name: 'username', type: 'string'},
        {name: 'suggestion_theme', type: 'string'}
    ]
});