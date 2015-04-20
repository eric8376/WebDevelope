/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
/**
 *意见数据模型
 */
Ext.define('Ext4.Com.Model.Opinion_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'depict_message' // 数据索引:和Store模型对应
        },
        {
            name: 'opinionid' // 数据索引:和Store模型对应
        },
        {
            name: 'approval_username'
        },
        {
            name: 'opinion_type'
        },
        {
            name: 'fromid'
        },
        {
            name: 'approval_datetime'
        },
        {name: 'account'}
    ]
});