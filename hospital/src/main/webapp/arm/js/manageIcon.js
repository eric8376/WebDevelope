/**
 * 系统预置图标
 *
 * @author XiongChun
 * @since 2010-05-20
 */
Ext.require('Ext4.Com.Model.IconItems_Model');
Ext.onReady(function () {
    var columns = new Ext.grid.ColumnModel([
        {
            xtype: 'rownumberer',
            text: '序号',
            width: 32
        }, {
            header: '图标编号',
            dataIndex: 'iconid',
            hidden: false,
            width: 80,
            sortable: true
        }, {
            header: '预览',
            dataIndex: 'previewpath',
            renderer: function (value) {
                return '<img src=' + value + ' />';
            },
            width: 50
        }, {
            id: 'cssname',
            header: 'CSS类名',
            dataIndex: 'cssname',
            width: 150
        }, {
            id: 'filename',
            header: '文件名',
            dataIndex: 'filename',
            width: 150
        }, {
            id: 'accesspath',
            header: '访问路径',
            dataIndex: 'accesspath'
        }]);

    /**
     * 数据存储
     */
    var store = Ext.create('Ext.data.Store', {
        model: 'Ext4.Com.Model.IconItems_Model',
        pageSize: '20',
        proxy: {
            type: 'ajax',
            url: './resource.ered?reqCode=queryIconItems',
            reader: {
                type: 'json',
                totalProperty: 'TOTALCOUNT', // 记录总数
                root: 'ROOT' // Json中的列表数据根节点
            }
        }
    });

    // 翻页排序时带上查询条件
    store.on('beforeload', function () {
        Ext.apply(this.proxy.extraParams, {
            queryParam: Ext.getCmp('queryParam').getValue()
        })
    });

    var pagesize_combo = new Ext.form.field.ComboBox({
        name: 'pagesize',
        hiddenName: 'pagesize',
        triggerAction: 'all',
        lazyRender: true,
        mode: 'local',
        store: new Ext.data.ArrayStore({
            fields: ['value', 'text'],
            data: [[10, '10条/页'], [20, '20条/页'],
                [50, '50条/页'], [100, '100条/页'],
                [250, '250条/页'], [500, '500条/页']]
        }),
        valueField: 'value',
        displayField: 'text',
        value: '20',
        editable: false,
        width: 85
    });
    pagesize_combo.on("select", function (comboBox) {
        store.pageSize = parseInt(comboBox.getValue());
        bbar.pageSize = parseInt(comboBox.getValue());
        store.loadPage(1);
    });

    var bbar = new Ext.PagingToolbar({
        pageSize: '20',
        store: store,
        displayInfo: true,
        displayMsg: '共 {2} 条，当前页显示第 {0}条到 {1}条',
        emptyMsg: "没有符合条件的记录",
        plugins: [Ext.create('Ext.ux.ProgressBarPager')], // 分页进度条
        items: ['-', '&nbsp;&nbsp;', pagesize_combo]
    });

    var grid = new Ext.grid.Panel({
        title: '<span style="font-weight:normal">系统预置图标</span>',
        iconCls: 'imagesIcon',
        height: 500,
        autoScroll: true,
        region: 'center',
        store: store,
        loadMask: {
            msg: '正在加载表格数据,请稍等...'
        },
        frame: true,
        autoExpandColumn: 'accesspath',
        columns: columns,
        tbar: ['->', new Ext.form.TextField({
            id: 'queryParam',
            name: 'queryParam',
            emptyText: '请输入文件名|CSS类名',
            enableKeyEvents: true,
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == Ext.EventObject.ENTER) {
                        queryIconItem();
                    }
                }
            },
            width: 150
        }), {
            text: '查询',
            iconCls: 'page_findIcon',
            handler: function () {
                queryIconItem();
            }
        }, '-', {
            text: '刷新',
            iconCls: 'page_refreshIcon',
            handler: function () {
                store.reload();
            }
        }],
        bbar: bbar
    });
    store.loadPage(1);
    grid.on('sortchange', function () {
        grid.getSelectionModel().selectFirstRow();
    });

    bbar.on("change", function () {
        grid.getSelectionModel().selectFirstRow();
    });
    grid.on("celldblclick", function (grid, rowIndex, columnIndex, e) {
        var store = grid.getStore();
        var record = store.getAt(rowIndex);
        var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
        var celldata = record.get(fieldName);
        // copyToClipboard(celldata);
        iconPanel.getForm().loadRecord(record);
        iconWindow.show();
    });

    var iconPanel = new Ext.form.Panel({
        id: 'iconPanel',
        name: 'iconPanel',
        defaultType: 'textfield',
        labelAlign: 'right',
        labelWidth: 65,
        frame: true,
        items: [{
            fieldLabel: 'CSS类名',
            name: 'cssname',
            allowBlank: true,
            anchor: '99%'
        }, {
            fieldLabel: '文件名',
            name: 'filename',
            allowBlank: true,
            anchor: '99%'
        }, {
            fieldLabel: '访问路径',
            name: 'accesspath',
            allowBlank: true,
            anchor: '99%'
        }]
    });

    var iconWindow = new Ext.window.Window({
        layout: 'fit',
        width: 400,
        height: 120,
        resizable: false,
        draggable: true,
        closeAction: 'hide',
        title: '系统图标',
        // iconCls : 'page_addIcon',
        modal: false,
        collapsible: true,
        titleCollapse: true,
        maximizable: false,
        buttonAlign: 'right',
        border: false,
        animCollapse: true,
        // pageY : 20,
        // pageX : document.body.clientWidth / 2 - 400 / 2,
        animateTarget: Ext.getBody(),
        constrain: true,
        items: [iconPanel]
    });

    /**
     * 布局
     */
    var viewport = new Ext.Viewport({
        layout: 'border',
        items: [grid]
    });

    /**
     * 查询参数
     */
    function queryIconItem() {
        var queryParam = Ext.getCmp('queryParam').getValue();
        store.proxy.extraParams.queryParam = queryParam;
        store.loadPage(1);
    }

    /**
     * 显示窗口
     */
    function showWindowInit() {
        var record = grid.getSelectionModel().getSelection()[0];
        if (Ext.isEmpty(record)) {
            grid.getSelectionModel().selectFirstRow();
        }
        iconPanel.getForm().loadRecord(record);
        iconWindow.show();
    }
});