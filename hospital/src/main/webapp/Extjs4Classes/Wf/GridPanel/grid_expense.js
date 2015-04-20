/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 上午9:13
 * To change this template use File | Settings | File Templates.
 */


Ext.define('Ext4.Wf.GridPanel.grid_expense', {
    extend: 'Ext.grid.Panel',
    require: ['Ext4.Wf.Store.store_expense'],
    collapsed: false,
    anchor: "100%",
    border: false,
    autoHeight: true,
    animateTarget: Ext.getBody(),
    // 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体
    autoScroll: true,
    frame: true,

    viewConfig: {
        stripeRows: true, // 斑马线
        // 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
        forceFit: false
    },
    loadMask: {
        msg: '正在加载表格数据,请稍等...'
    },
    store: Ext.create('Ext4.Wf.Store.store_expense'),
    initComponent: function () {
        this.tbar = [
            {
                text: '花费项目:'
            },
            {
                xtype: 'textfield',
                id: 'expense',
                emptyText: '请输入花费项目',
                width: 150
            },
            {
                text: '花费金额:'
            },
            {
                xtype: 'numberfield',
                id: 'expenseMoney',
                emptyText: '请输入花费金额(元为单位)',
                width: 150
            },
            {
                text: '添加',
                iconCls: 'page_findIcon',
                handler: function () {
                    var row = new Ext.data.Record();
                    row.set('expens', Ext.getCmp('expense').getValue());
                    row.set('expenseMoney', Ext.getCmp('expenseMoney').getValue());
                    Ext.StoreMgr.lookup('store_expense').addSorted(row);
                }
            }
        ];
        this.columns = new Ext.grid.ColumnModel([
            {
                xtype: 'rownumberer',
                text: '序号',
                width: 32
            },
            {
                text: '花费项目',
                dataIndex: 'expens',
                sortable: true,
                autoWidth: true
            },
            {
                text: '花费金额',
                dataIndex: 'expenseMoney',
                autoWidth: true
            },
            {
                xtype: 'actioncolumn',
                resizable: true,
                text: '删除',
                align: "center",
                width: 50,
                menuDisabled: true,
                items: [
                    {
                        icon: './resource/image/ext/magnifier.png',
                        tooltip: me.editText,
                        handler: function (grid, rowIndex, colIndex) {
                            deleteExpens(rowIndex)


                        },
                        scope: this
                    }
                ]
            }
        ]);
        this.callParent(arguments);
    }
});
