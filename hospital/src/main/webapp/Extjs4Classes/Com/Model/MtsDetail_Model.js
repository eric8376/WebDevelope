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
Ext.define('Ext4.Com.Model.MtsDetail_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'producenum'},
        {name: 'produceid'},
        {name: 'formno'},
        {name: 'remark'},
        {name: 'producedetailid'}
    ]
});