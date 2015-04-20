/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
/**
 *   取库信息
 */
Ext.define('Ext4.Com.Model.StockTakeInfo', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'produceid' // 数据索引:和Store模型对应
        },
        {
            name: 'takenumber' // 数据索引:和Store模型对应
        },
        {
            name: 'remark' // 数据索引:和Store模型对应
        },
        {
            name: 'design_no' // 数据索引:和Store模型对应
        },
        {
            name: 'design_name' // 数据索引:和Store模型对应
        }
    ]
});