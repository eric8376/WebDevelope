/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
/**
 *库存生产计划数据模型
 */
Ext.define('Ext4.Com.Model.Mts_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'username' // 数据索引:和store模型对应
        },
        {
            name: 'name' // 数据索引:和store模型对应
        },
        {
            name: 'createtime' // 数据索引:和store模型对应
        },
        {
            name: 'producetype' // 数据索引:和store模型对应
        },
        {
            name: 'statue' // 数据索引:和store模型对应
        },
        {
            name: 'statuedesc' // 数据索引:和store模型对应
        },
        {
            name: 'suretime'
        },
        {
            name: 'producerecord_mtsid'
        },
        {
            name: 'planefinishtime'
        },
        {
            name: 'planestarttime'
        },
        {
            name: 'factstarttime'
        },
        {
            name: 'factfinishtime'
        },
        {
            name: 'remark' // 数据索引:和store模型对应
        }
    ]
});