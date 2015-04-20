/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
/**
 *平面布局图数据模型
 */
Ext.define('Ext4.Com.Model.LayoutAppendixHistory_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'layoutplaneid' // 数据索引:和Store模型对应
        },
        {
            name: 'addtime' // 数据索引:和Store模型对应
        },
        {
            name: 'adduser'
        },
        {
            name: 'layoutplaneverifiertime'
        },
        {
            name: 'examiner'
        }
    ]
});