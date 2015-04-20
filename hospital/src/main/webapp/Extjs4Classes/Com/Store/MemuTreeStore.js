/**
 * Created with IntelliJ IDEA.
 * User: 黄琦鸿
 * Date: 14-4-8
 * Time: 上午10:46
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ext4.Com.Store.MemuTreeStore', {
    extend: 'Ext.data.TreeStore',
    requires: ['Ext4.Com.Model.memuModel'],
    model: 'Ext4.Com.Model.memuModel'
})