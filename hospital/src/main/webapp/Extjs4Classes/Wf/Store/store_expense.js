/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-18
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */


/**
 * 其他费用数据存储
 * @type {Ext.data.Store}
 */
Ext.define('Ext4.Wf.Store.store_expense', {
    extend: 'Ext.data.Store',
    storeId: 'store_expense',
    requires: [
        'Ext4.Com.Model.AllUserMoney_Model'],
    model: 'Ext4.Com.Model.AllUserMoney_Model',
    proxy: {
        extraParams: {},
        type: 'ajax',
        url: 'taskslistAction.ered?reqCode=getstore_expense',
        reader: {
            type: 'json',
            root: 'ROOT'
        }
    }
});