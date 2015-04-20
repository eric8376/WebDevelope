/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-18
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */

/**
 * 流程环节
 */
Ext.define('Ext4.Wf.Model.Task', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'process_name' // 数据索引:和Store模型对应
        }, {
            name: 'name_' // 数据索引:和Store模型对应
        },
        {
            name: 'wf_title' // 数据索引:和Store模型对应
        },
        {
            name: 'creat_time' // 数据索引:和Store模型对应
        },
        {
            name: 'servicename'
        }
    ]
});