/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
/**
 *订单生产计划数据模型
 */
Ext.define('Ext4.Com.Model.MtoDetail_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'producerecord_mtoid' // 数据索引:和store模型对应
        },
        {
            name: 'ordernumber' // 数据索引:和store模型对应
        },
        {
            name: 'orderstatue' // 数据索引:和store模型对应
        },
        {
            name: 'deliverordertime' // 数据索引:和store模型对应
        },
        {
            name: 'ordertime' // 数据索引:和store模型对应
        },
        {
            name: 'creater'
        },
        {
            name: 'factfinishtime'
        },
        {
            name: 'planestarttime'
        },
        {
            name: 'factstarttime'
        },
        {
            name: 'planefinishtime'
        },
        {
            name: 'remark'
        },
        {
            name: 'drawing_id'
        },
        {
            name: 'projectid'
        }
    ]
});