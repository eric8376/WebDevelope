/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
/**
 * 条码
 */
Ext.define('Ext4.Com.Model.Record_BarCode', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'case_seqno'
    }, {
        name: 'print_barcode' // 数据索引:和store模型对应
    }, {
        name: 'print_time' // 数据索引:和store模型对应
    }, {
        name: 'printer' // 数据索引:和store模型对应
    }]
});