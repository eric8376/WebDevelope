/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
/**
 * 拆单图和下单图历史
 */
Ext.define('Ext4.Com.Model.CdtHis_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'version'
        },
        {
            name: 'upload_account'
        },
        {
            name: 'upload_time'
        },
        {
            name: 'examine_account'
        },
        {
            name: 'examine_time'
        }, {
            name: 'id_'
        }

    ]
});