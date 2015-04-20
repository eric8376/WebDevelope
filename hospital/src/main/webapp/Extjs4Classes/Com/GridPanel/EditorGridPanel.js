/**
 * Created with IntelliJ IDEA.
 * User: 黄琦鸿
 * Date: 14-1-20
 * Time: 上午9:49
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ext4.Com.GridPanel.EditorGridPanel', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.Panel',
        'Ext.grid.plugin.CellEditing'],
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1,
            listeners: {
                validateedit: function (e) {
                    e.cancel = true;
                    e.record.data[e.field] = e.value;
                }
            }
        })
    ],
    initComponent: function (config) {
        this.callParent(arguments);
    }
});
