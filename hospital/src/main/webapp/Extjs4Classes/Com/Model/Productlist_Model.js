/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */

/**
 *查询工程单下的成品件数据模型
 */
Ext.define('Ext4.Com.Model.Productlist_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {

            name: 'product_id' // 数据索引:和Store模型对应
        },
        {
            name: 'submit_datetime'
        },
        {
            name: 'submit_user'
        },
        {
            name: 'product_breed'
        },
        {
            name: 'product_classify'
        },
        {
            name: 'product_type'
        },
        {
            name: 'product_name'
        },
        {
            name: 'product_no'
        },
        {
            name: 'design_id'
        },
        {
            name: 'design_no'
        },
        {
            name: 'price'
        },
        {
            name: 'examine_status'
        },
        {
            name: 'pcolor'
        }, {name: 'remark'}
    ]
});