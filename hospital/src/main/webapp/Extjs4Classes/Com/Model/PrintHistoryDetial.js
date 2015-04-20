/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
/**
 * 打印历史明细
 */
Ext.define('Ext4.Com.Model.PrintHistoryDetial', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'print_barcode' // 数据索引:和store模型对应
        },
        {
            name: 'case_seqno' // 数据索引:和store模型对应
        }, {
            name: 'barcodestatuedesc' // 数据索引:和store模型对应
        }, {
            name: 'printid' // 数据索引:和store模型对应
        }
    ]
});