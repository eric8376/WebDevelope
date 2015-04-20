/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
/**
 *库存生产明细数据模型
 */
Ext.define('Ext4.Com.Model.MTSDetailByGroup_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'allproducenum'},
        {name: 'design_no'},
        {name: 'design_id'},
        {name: 'design_name'}
    ]
});