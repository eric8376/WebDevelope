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
Ext.define('Ext4.Com.Model.Ad_design_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'product_name' // 数据索引:和Store模型对应
        },
        {
            name: 'attmapid' // 数据索引:和Store模型对应
        },
        {
            name: 'product_no' // 数据索引:和Store模型对应
        },
        {
            name: 'product_id' // 数据索引:和Store模型对应
        },
        {
            name: 'num'
        },
        {
            name: 'classify_name'
        },
        {
            name: 'username'
        },
        {
            name: 'design_no'
        },
        {
            name: 'materialcount'
        },
        {
            name: 'packagecount'
        },
        {
            name: 'remark'
        },
        {
            name: 'stocknumber'
        },
        {
            name: 'takestocknumber'
        }
    ]
});