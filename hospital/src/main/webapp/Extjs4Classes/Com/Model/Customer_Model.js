/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
/**
 *自定义现场成品数据模型
 */
Ext.define('Ext4.Com.Model.Customer_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'cmno' // 数据索引:和Store模型对应
        },
        {
            name: 'tlong' // 数据索引:和Store模型对应
        },
        {
            name: 'high'
        },
        {
            name: 'description'
        },
        {
            name: 'num'
        },
        {
            name: 'material_name'
        },
        {
            name: 'material_color'
        },
        {
            name: 'material_id'
        },
        {
            name: 'classify_name'
        }
    ]
});