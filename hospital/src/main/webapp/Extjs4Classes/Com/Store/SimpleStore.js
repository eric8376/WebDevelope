/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-4-8
 * Time: 上午10:43
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ext4.Com.Store.SimpleStore', {
    extend: 'Ext.data.Store',
    requires: ['Ext4.Com.Model.SimpleStoreModel'],
    model: 'Ext4.Com.Model.SimpleStoreModel'
})