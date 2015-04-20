/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
/**
 *新设计件数据模型
 */
Ext.define('Ext4.Com.Model.initDesign_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'design_id'
        },
        {
            name: 'design_name' // 数据索引:和store模型对应
        },
        {
            name: 'design_no' // 数据索引:和store模型对应
        },
        {
            name: 'submit_user'
        },
        {
            name: 'submit_datetime'
        },
        {
            name: 'design_breed'
        }
    ]
});