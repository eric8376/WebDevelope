/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
/**
 *材料历史
 */
Ext.define('Ext4.Com.Model.MaterialHistory_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'version' // 数据索引:和Store模型对应
        },
        {
            name: 'materialhistoryid' // 数据索引:和Store模型对应
        },
        {
            name: 'file_name' // 数据索引:和Store模型对应
        },
        {
            name: 'explain' // 数据索引:和Store模型对应
        },
        {
            name: 'upload_user' // 数据索引:和Store模型对应
        },
        {
            name: 'upload_date' // 数据索引:和Store模型对应
        },
        {
            name: 'appendix_id' // 数据索引:和Store模型对应
        },
        {
            name: 'to_id' // 数据索引:和Store模型对应
        },
        {
            name: 'type' // 数据索引:和Store模型对应
        }
    ]
});