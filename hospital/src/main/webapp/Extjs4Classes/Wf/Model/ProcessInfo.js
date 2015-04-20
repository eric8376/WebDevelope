/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-18
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */

/**
 * 流程信息
 */
Ext.define('Ext4.Wf.Model.ProcessInfo', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'name_' // 数据索引:和Store模型对应
        },
        {
            name: 'wf_title' // 数据索引:和Store模型对应
        },
        {
            name: 'customername' // 数据索引:和Store模型对应
        },
        {
            name: 'applyuserid'
        },
        {
            name: 'taskname' // 数据索引:和Store模型对应
        },
        {
            name: 'proc_inst_id_'
        },
        {
            name: 'assignee_'
        },
        {
            name: 'create_time_'
        },
        {
            name: 'start_time_'
        },
        {
            name: 'business_key_'
        },
        {
            name: 'id_'
        },
        {
            name: 'taskid'
        },
        {
            name: 'task_def_key_'
        }
    ]
});