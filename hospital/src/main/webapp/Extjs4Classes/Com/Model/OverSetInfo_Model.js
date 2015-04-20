/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
/**
 * 平面图超套餐信息数据模型
 */
Ext.define('Ext4.Com.Model.OverSetInfo_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'set_id'
        },
        {
            name: 'codedesc'
        },
        {
            name: 'product_id'
        },
        {
            name: 'product_name'
        },
        {
            name: 'classify_name'
        },
        {
            name: 'product_no'
        },
        {
            name: 'design_no'
        }
    ]
});