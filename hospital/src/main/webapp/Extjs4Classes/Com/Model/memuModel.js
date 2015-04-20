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
Ext.define('Ext4.Com.Model.memuModel', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'text' // 数据索引:和Store模型对应
        },
        {
            name: 'iconCls' // 数据索引:和Store模型对应
        },
        {
            name: 'id' // 数据索引:和Store模型对应
        }
    ]
});