/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
/**
 *增补需求数据模型
 */
Ext.define('Ext4.Com.Model.AdditionalNeeds_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'additionalneedscontext' // 数据索引:和Store模型对应
        },
        {
            name: 'additionalneedsid' // 数据索引:和Store模型对应
        },
        {
            name: 'needtype'
        },
        {
            name: 'additioner'
        },
        {
            name: 'addtime'
        },
        {name: 'userid'}
    ]
});