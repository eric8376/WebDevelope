/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-18
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */

/**
 * 流程历史环节
 */
Ext.define('Ext4.Wf.Model.ProcessHistoryInfo', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'add_peo' // 数据索引:和Store模型对应
        }, {
            name: 'add_supply_id' // 数据索引:和Store模型对应
        },
        {
            name: 'add_two_peo' // 数据索引:和Store模型对应
        },
        {
            name: 'add_time' // 数据索引:和Store模型对应
        },
        {
            name: 'require_time'
        },
        {
            name: 'add_supply_type' // 数据索引:和Store模型对应
        },
        {
            name: 'is_designer'
        }
    ]
});