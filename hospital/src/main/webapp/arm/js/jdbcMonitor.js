/**
 * JDBC执行监控
 *
 * @author XiongChun
 * @since 2010-05-20
 */
Ext.require('Ext4.Com.Model.MonitorData_Model');
Ext.require('Ext4.Com.Model.ValueText_Model');
Ext.onReady(function () {
    var expander = new Ext.grid.plugin.RowExpander({
        rowBodyTpl: [
            '<p style=margin-left:70px;><span style=color:Teal;>开始执行时间</span><br><span>{starttime}</span></p>',
            '<p style=margin-left:70px;><span style=color:Teal;>执行耗时</span><br><span>{costtime}毫秒</span></p>',
            '<p style=margin-left:70px;><span style=color:Teal;>执行SQL</span><br><span>{sqltext}</span></p>'],
        // 屏蔽双击事件
        expandOnDblClick: true
    });
    var selModel = Ext.create('Ext.selection.CheckboxModel');
    var columns = [
        {
            xtype: 'rownumberer',
            text: '序号',
            width: 32
        }, {
            text: '激活时间',
            dataIndex: 'starttime',
            width: 140,
            sortable: true
        }, {
            text: '耗时(毫秒)',
            dataIndex: 'costtime',
            width: 70,
            sortable: true
        }, {
            text: '执行SQL',
            dataIndex: 'sqltext',
            id: 'sqltext',
            width: 100
        }, {
            text: '影响行数',
            dataIndex: 'effectrows',
            width: 60,
            sortable: true
        }];

    /**
     * 数据存储
     */
    var store = Ext.create('Ext.data.Store', {
        pageSize: '50',
        model: 'Ext4.Com.Model.MonitorData_Model',
        proxy: {
            type: 'ajax',
            url: 'jdbcMonitor.ered?reqCode=queryMonitorData',
            reader: {
                type: 'json',
                totalProperty: 'TOTALCOUNT', // 记录总数
                root: 'ROOT' // Json中的列表数据根节点
            }
        }
    });

    // 翻页排序时带上查询条件
    store.on('beforeload', function () {
        var ksrq = Ext.getCmp('ksrq').getValue();
        if (!Ext.isEmpty(ksrq)) {
            ksrq = ksrq.format('Y-m-d').toString();
        }
        var jsrq = Ext.getCmp('jsrq').getValue();
        if (!Ext.isEmpty(jsrq)) {
            jsrq = jsrq.format('Y-m-d').toString();
        }
        Ext.apply(this.proxy.extraParams, {
            type: Ext.getCmp('type_id').getValue(),
            costtime: Ext.getCmp('costtime').getValue(),
            effectrows: Ext.getCmp('effectrows').getValue(),
            sql: Ext.getCmp('sql').getValue(),
            jsrq: jsrq,
            ksrq: ksrq
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
        value: '50',
        editable: false,
        width: 85
    });
    pagesize_combo.on("select", function (comboBox) {
        store.pageSize = parseInt(comboBox.getValue());
        bbar.pageSize = parseInt(comboBox.getValue());
        store.loadPage(1);
    });

    var bbar = new Ext.PagingToolbar({
        pageSize: '50',
        store: store,
        displayInfo: true,
        displayMsg: '显示{0}条到{1}条,共{2}条',
        emptyMsg: "没有符合条件的记录",
        plugins: [Ext.create('Ext.ux.ProgressBarPager')], // 分页进度条
        // emptyMsg
        // :
        // "没有符合条件的记录",
        items: ['-', '&nbsp;&nbsp;', pagesize_combo]
    });

    var grid = new Ext.grid.Panel({
        title: '<span class="commoncss">JDBC执行监控</span>',
        height: 500,
        // width:600,
        autoScroll: true,
        region: 'center',
        store: store,
        loadMask: {
            msg: '正在加载表格数据,请稍等...'
        },
        frame: true,
        autoExpandColumn: 'sqltext',
        columns: columns,
        selModel: selModel,
        plugins: expander,
        tbar: [{
            text: '删除',
            iconCls: 'deleteIcon',
            handler: function () {
                if (runMode == '0') {
                    Ext.Msg.alert('提示',
                        '系统正处于演示模式下运行,您的操作被取消!该模式下只能进行查询操作!');
                    return;
                }
                deleteMonitorDatas('del');
            }
        }, '-', {
            text: '清空',
            iconCls: 'tbar_synchronizeIcon',
            handler: function () {
                if (runMode == '0') {
                    Ext.Msg.alert('提示',
                        '系统正处于演示模式下运行,您的操作被取消!该模式下只能进行查询操作!');
                    return;
                }
                deleteMonitorDatas('reset');
            }
        }, '->', new Ext.form.field.ComboBox({
            id: 'type_id',
            hiddenName: 'type',
            triggerAction: 'all',
            store: Ext.create('Ext.data.Store', {
                model: 'Ext4.Com.Model.ValueText_Model',
                data: [
                    {value: 1, text: 'INSERT'}, {value: 2, text: 'UPDATE'}, {value: 3, text: 'DELETE'}, {
                        value: 4,
                        text: 'SELECT'
                    }, {value: 5, text: 'CALLPRC'}]
            }),
            displayField: 'text',
            valueField: 'value',
            mode: 'local',
            listWidth: 120, // 下拉列表的宽度,默认为下拉选择框的宽度
            forceSelection: true,
            emptyText: '操作类型',
            // editable : false,
            resizable: true,
            width: 100
        }), '-', {
            id: 'ksrq',
            name: 'ksrq',
            xtype: 'datefield',
            emptyText: '开始日期',
            format: 'Y-m-d',
            width: 120
        }, '-', {
            id: 'jsrq',
            name: 'jsrq',
            xtype: 'datefield',
            emptyText: '结束日期',
            format: 'Y-m-d',
            width: 120
        }, '-', {
            id: 'costtime',
            name: 'costtime',
            xtype: 'numberfield',
            emptyText: '执行耗时大于',
            enableKeyEvents: true,
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == Ext.EventObject.ENTER) {
                        query();
                    }
                }
            },
            width: 100
        }, '-', {
            id: 'effectrows',
            name: 'effectrows',
            xtype: 'numberfield',
            emptyText: '影响行数大于',
            enableKeyEvents: true,
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == Ext.EventObject.ENTER) {
                        query();
                    }
                }
            },
            width: 100
        }, '-', {
            id: 'sql',
            name: 'sql',
            xtype: 'textfield',
            emptyText: 'SQL关键字',
            enableKeyEvents: true,
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == Ext.EventObject.ENTER) {
                        query();
                    }
                }
            },
            width: 120
        }, '-', {
            text: '查询',
            iconCls: 'previewIcon',
            handler: function () {
                query();
            }
        }, '-', {
            text: '刷新',
            iconCls: 'arrow_refreshIcon',
            handler: function () {
                store.reload();
            }
        }],
        bbar: bbar
    });
    store.loadPage(1);
    grid.on('sortchange', function () {
        grid.getSelectionModel().select(0);
    });

    bbar.on("change", function () {
        grid.getSelectionModel().select(0);
    });

    /**
     * 布局
     */
    var viewport = new Ext.Viewport({
        layout: 'border',
        items: [grid]
    });

    /**
     * 查询
     */
    function query() {
        var ksrq = Ext.getCmp('ksrq').getValue();
        if (!Ext.isEmpty(ksrq)) {
            ksrq = ksrq.format('Y-m-d').toString();
        }
        var jsrq = Ext.getCmp('jsrq').getValue();
        if (!Ext.isEmpty(jsrq)) {
            jsrq = jsrq.format('Y-m-d').toString();
        }
        Ext.apply(store.getProxy().extraParams, {
            type: Ext.getCmp('type_id').getValue(),
            costtime: Ext.getCmp('costtime').getValue(),
            effectrows: Ext.getCmp('effectrows').getValue(),
            sql: Ext.getCmp('sql').getValue(),
            jsrq: jsrq,
            ksrq: ksrq
        })
        store.loadPage(1);

    }

    /**
     * 删除事件
     */
    function deleteMonitorDatas(type) {
        var rows = grid.getSelectionModel().getSelection();
        if (Ext.isEmpty(rows)) {
            Ext.Msg.alert('提示', '请先选中要删除的项目!');
            return;
        }
        var strChecked = jsArray2JsString(rows, 'monitorid');
        var msg = '确认删除选中的记录吗?';
        if (type == 'reset')
            msg = '确认清空所有监控记录吗?';
        Ext.Msg.confirm('请确认', msg, function (btn, text) {
            if (btn == 'yes') {
                showWaitMsg();
                Ext.Ajax.request({
                    url: 'jdbcMonitor.ered?reqCode=deleteMonitorDatas',
                    success: function (response) {
                        var resultArray = Ext.JSON.decode(response.responseText);
                        store.reload();
                        Ext.Msg.alert('提示', resultArray.msg);
                    },
                    params: {
                        strChecked: strChecked,
                        type: type
                    }
                });
            }
        });
    }

    if (runMode == '0') {
        Ext.Msg.alert('提示', '为保障演示系统高速运行,监控功能已关闭.您看到的数据是历史监控数据!');
    }

});