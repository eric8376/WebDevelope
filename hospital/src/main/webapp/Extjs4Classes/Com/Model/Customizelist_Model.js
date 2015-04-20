/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */

/**
 *定制件数据模型
 */
Ext.define('Ext4.Com.Model.Customizelist_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'customize_id' // 数据索引:和Store模型对应
        },
        {
            name: 'customize_no' // 数据索引:和Store模型对应
        },
        {
            name: 'customize_breed'
        },
        {
            name: 'customize_breed_'
        },
        {
            name: 'approval_username'
        },
        {
            name: 'product_id'
        },
        {
            name: 'approval_status'
        },
        {
            name: 'customize_name'
        },
        {
            name: 'product_no'
        },
        {
            name: 'description'
        },
        {
            name: 'approval_datetime'
        },
        {
            name: 'is_expand'
        },
        {
            name: 'tlong'
        },
        {
            name: 'wide'
        },
        {
            name: 'high'
        },
        {
            name: 'designers_offer'
        },
        {
            name: 'approval_estimate'
        },
        {
            name: 'drawing_id'
        },
        {
            name: 'num'
        },
        {
            name: 'materialcount'
        },
        {
            name: 'remark'
        },
        {
            name: 'stocknumber'
        },
        {
            name: 'xdtcount'
        }/*,
         {
         name: 'takestocknumber'
         }*/
    ]
});