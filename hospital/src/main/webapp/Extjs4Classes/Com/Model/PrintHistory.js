/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
/**
 * 打印历史
 */
Ext.define('Ext4.Com.Model.PrintHistory', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'printer' // 数据索引:和store模型对应
        },
        {
            name: 'packuser' // 数据索引:和store模型对应
        }, {
            name: 'quality_checker' // 数据索引:和store模型对应
        },
        {
            name: 'print_time' // 数据索引:和store模型对应
        },
        {
            name: 'printnumber' // 数据索引:和store模型对应
        },
        {
            name: 'printhistoryid' // 数据索引:和store模型对应
        },
        {
            name: 'package_no'
        },
        {
            name: 'package_name'
        },
        {
            name: 'remark'
        },
        {
            name: 'allsize'
        },
        {
            name: 'printtype'
        }
    ]
});