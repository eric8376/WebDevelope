/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ext4.Com.Model.CustomService_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'username' // 数据索引:和Store模型对应
        },
        {
            name: 'useraccount' // 数据索引:和Store模型对应
        }
    ]
});