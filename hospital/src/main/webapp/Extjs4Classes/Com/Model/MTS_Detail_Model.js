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
Ext.define('Ext4.Com.Model.MTS_Detail_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'producenum'},
        {name: 'produceid'},
        {name: 'design_no'},
        {name: 'remark'},
        {name: 'attgroupdescs'},
        {name: 'producedetailid'}
    ]
});