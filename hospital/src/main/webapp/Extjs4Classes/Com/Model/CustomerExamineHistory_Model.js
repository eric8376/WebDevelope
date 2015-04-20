/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
/**
 * 定制件审核历史
 */
Ext.define('Ext4.Com.Model.CustomerExamineHistory_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'customize_no' // 数据索引:和Store模型对应
        },
        {
            name: 'customize_breed'
        },
        {
            name: 'approval_username'
        },
        {
            name: 'approval_status'
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
            name: 'approval_estimate'
        }
    ]
});