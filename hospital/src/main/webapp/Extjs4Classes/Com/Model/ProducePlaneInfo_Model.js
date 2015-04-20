/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
/**
 *查询平面图数据模型
 */

Ext.define('Ext4.Com.Model.ProducePlaneInfo_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'produceplaneid' // 数据索引:和Store模型对应
        },
        {
            name: 'planename' // 数据索引:和Store模型对应
        },
        {
            name: 'creater'
        },
        {
            name: 'planetype'
        },
        {
            name: 'planetypevalue'
        },
        {
            name: 'planestatue'
        },
        {
            name: 'mtscount'
        },
        {
            name: 'mtocount'
        },
        {
            name: 'remark'
        },
        {
            name: 'publishtime'
        }
    ]
});