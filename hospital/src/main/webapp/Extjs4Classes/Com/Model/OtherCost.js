/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */

/**
 * 其他费用
 */
Ext.define('Ext4.Com.Model.OtherCost', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'cost_name'
        },
        {
            name: 'cost_describe'
        },
        {
            name: 'cost_time'
        },
        {
            name: 'cost_money'
        }
    ]
});