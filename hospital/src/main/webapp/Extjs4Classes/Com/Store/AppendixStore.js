/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-4-8
 * Time: 上午11:15
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ext4.Com.Store.AppendixStore', {
    extend: 'Ext.data.Store',
    requires: ['Ext4.AD.Model.Appendix_Model'],
    proxy: {
        type: 'ajax',
        url: 'CMAppendixAction.ered?reqCode=queryAppendix',
        reader: {
            type: 'json',
            root: 'ROOT',
            totalProperty: 'TOTALCOUNT'
        }
    },
    model: 'Ext4.AD.Model.Appendix_Model'
})