/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
/**
 * 订单打印历史明细
 */
Ext.define('Ext4.Com.Model.OrderPrintHistoryDetial', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'formid' // 数据索引:和store模型对应
        },
        {
            name: 'printid' // 数据索引:和store模型对应
        }, {
            name: 'barcodestatuedesc' // 数据索引:和store模型对应
        },
        {
            name: 'case_seqno' // 数据索引:和store模型对应
        },
        {
            name: 'print_barcode' // 数据索引:和store模型对应
        },
        {
            name: 'barcodestatue' // 数据索引:和store模型对应
        },
        {
            name: 'print_time'
        }
    ]
});