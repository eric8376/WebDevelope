/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
/**
 *设计件数据模型
 */
Ext.define('Ext4.Com.Model.RunningProcess_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'id_' // 数据索引:和Store模型对应
        },
        {
            name: 'taskid' // 数据索引:和Store模型对应
        },
        {
            name: 'proc_inst_id_' // 数据索引:和Store模型对应
        },
        {
            name: 'wf_title' // 数据索引:和Store模型对应
        },
        {
            name: 'proc_def_id_'
        },
        {
            name: 'name_'
        },
        {
            name: 'suspension_state_'
        },
        {
            name: 'applyuserid'
        },
        {
            name: 'create_time_'
        },
        {
            name: 'curassignee'
        }
    ]
});