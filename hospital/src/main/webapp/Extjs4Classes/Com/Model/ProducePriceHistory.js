/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
/**
 *产品价格历史
 */
Ext.define('Ext4.Com.Model.ProducePriceHistory', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'newprice' // 数据索引:和store模型对应
        },
        {
            name: 'oldprice' // 数据索引:和store模型对应
        },
        {
            name: 'changer' // 数据索引:和store模型对应
        },
        {
            name: 'changetime'
        }
    ]
});