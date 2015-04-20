/**
 * 操作员事件跟踪
 *
 * @author XiongChun
 * @since 2010-05-20
 */
Ext.require('Ext4.Com.Model.Events_Model');
Ext.onReady(function () {
    var expander = new Ext.grid.plugin.RowExpander({
        rowBodyTpl: [
            '<p style=margin-left:70px;><span style=color:Teal;>描述信息</span><br><span>{description}</span></p>',
            '<p style=margin-left:70px;><span style=color:Teal;>请求路径</span><br><span>{requestpath}</span></p>',
            '<p style=margin-left:70px;><span style=color:Teal;>请求方法</span><br><span>{methodname}</span></p>',
            '<p style=margin-left:70px;><span style=color:Teal;>耗时</span><br><span>{costtime}毫秒</span></p>'],
        // 屏蔽双击事件
        expandOnDblClick: true
    });
    var selModel = Ext.create('Ext.selection.CheckboxModel');
    var columns = [
        {
            xtype: 'rownumberer',
            text: '序号',
            width: 32
        },
        {
            text: '激活时间',
            dataIndex: 'activetime',
            sortable: true,
            width: 130
        }, {
            text: '登录账户',
            dataIndex: 'account',
            width: 80,
            sortable: true
        }, {
            text: '姓名',
            dataIndex: 'username',
            width: 80,
            sortable: true
        }, {
            text: '耗时(毫秒)',
            dataIndex: 'costtime',
            width: 80,
            sortable: true
        }, {
            text: '描述信息',
            dataIndex: 'description',
            width: 350,
            sortable: true
        }, {
            text: '请求路径',
            dataIndex: 'requestpath',
            sortable: true,
            width: 200
        }, {
            text: '请求方法',
            dataIndex: 'methodname',
            sortable: true,
            width: 150
        }, {
            text: '事件编号',
            dataIndex: 'eventid',
            hidden: true,
            width: 120,
            sortable: true
        }, {
            text: '用户ID',
            dataIndex: 'userid',
            hidden: true
        }, {
            dataIndex: '_blank'
        }];

    /**
     * 数据存储
     */
    var store = Ext.create('Ext.data.Store', {
        pageSize: '20',
        model: 'Ext4.Com.Model.Events_Model',
        proxy: {
            extraParams: {},
            type: 'ajax',
            url: 'eventTrack.ered?reqCode=queryEvents',
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
            jsrq: jsrq,
            ksrq: ksrq,
            account: Ext.getCmp('account').getValue(),
            username: Ext.getCmp('username').getValue(),
            keyword: Ext.getCmp('keyword').getValue()
        })
    });

    var pagesize_combo = Ext.create('Ext.form.field.ComboBox', {
        triggerAction: 'all',
        queryMode: 'local',
        store: new Ext.data.ArrayStore({
            fields: ['value', 'text'],
            data: [
                [10, '10条/页'],
                [20, '20条/页'],
                [50, '50条/页'],
                [100, '100条/页'],
                [250, '250条/页'],
                [500, '500条/页']
            ]
        }),
        valueField: 'value',
        displayField: 'text',
        value: '20',
        editable: false,
        width: 85
    });
    pagesize_combo.on("select", function (comboBox) {
        number = parseInt(comboBox.getValue());
        bbar.pageSize = number;
        store.pageSize = number;
        store.loadPage(1);
    });

    var bbar = new Ext.PagingToolbar({
        pageSize: '20',
        store: store,
        displayInfo: true,
        displayMsg: '显示{0}条到{1}条,共{2}条',
        emptyMsg: "没有符合条件的记录",
        plugins: [Ext.create('Ext.ux.ProgressBarPager')], // 分页进度条
        items: ['-', '&nbsp;&nbsp;', pagesize_combo]
    });
    var grid = new Ext.grid.Panel({
        title: '<span class="commoncss">Rquest请求跟踪</span>',
        height: 500,
        // width:600,
        autoScroll: true,
        region: 'center',
        store: store,
        loadMask: {
            msg: '正在加载表格数据,请稍等...'
        },
        frame: true,
        autoExpandColumn: '_blank',
        columns: columns,
        selModel: selModel,
        plugins: expander,
        tbar: [{
            text: '删除',
            iconCls: 'page_delIcon',
            handler: function () {
                if (runMode == '0') {
                    Ext.Msg.alert('提示',
                        '系统正处于演示模式下运行,您的操作被取消!该模式下只能进行查询操作!');
                    return;
                }
                deleteEvents('del');
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
                deleteEvents('reset');
            }
        }, '->', {
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
        }, '-', new Ext.form.TextField({
            id: 'account',
            name: 'account',
            emptyText: '登录帐户',
            enableKeyEvents: true,
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == Ext.EventObject.ENTER) {
                        queryEvents();
                    }
                }
            },
            width: 80
        }), '-', new Ext.form.TextField({
            id: 'username',
            name: 'username',
            emptyText: '姓名',
            enableKeyEvents: true,
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == Ext.EventObject.ENTER) {
                        queryEvents();
                    }
                }
            },
            width: 80
        }), '-', new Ext.form.TextField({
            id: 'keyword',
            name: 'keyword',
            emptyText: '描述信息|请求路径|请求方法',
            enableKeyEvents: true,
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == Ext.EventObject.ENTER) {
                        queryEvents();
                    }
                }
            },
            width: 180
        }), {
            text: '查询',
            iconCls: 'previewIcon',
            handler: function () {
                queryEvents();
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
        // grid.getSelectionModel().selectFirstRow();
    });

    bbar.on("change", function () {
        // grid.getSelectionModel().selectFirstRow();
    });

    /**
     * 布局
     */
    var viewport = new Ext.Viewport({
        layout: 'border',
        items: [grid]
    });

    /**
     * 查询事件
     */
    function queryEvents() {
        var ksrq = Ext.getCmp('ksrq').getValue();
        if (!Ext.isEmpty(ksrq)) {
            ksrq = ksrq.format('Y-m-d').toString();
        }
        var jsrq = Ext.getCmp('jsrq').getValue();
        if (!Ext.isEmpty(jsrq)) {
            jsrq = jsrq.format('Y-m-d').toString();
        }
        Ext.apply(store.getProxy().extraParams, {
            account: Ext.getCmp('account').getValue(),
            username: Ext.getCmp('username').getValue(),
            keyword: Ext.getCmp('keyword').getValue(),
            jsrq: jsrq,
            ksrq: ksrq
        })
        store.loadPage(1);

    }

    /**
     * 删除事件
     */
    function deleteEvents(type) {
        var rows = grid.getSelectionModel().getSelections();
        if (type == 'del') {
            if (Ext.isEmpty(rows)) {
                Ext.Msg.alert('提示', '请先选中要删除的项目!');
                return;
            }
        }
        var strChecked = jsArray2JsString(rows, 'eventid');
        var msg = "确认删除选中的记录吗?";
        if (type == 'reset')
            msg = "确认重置所有的记录吗,记录信息将被清空?";
        Ext.Msg.confirm('请确认', msg, function (btn, text) {
            if (btn == 'yes') {
                showWaitMsg();
                Ext.Ajax.request({
                    url: 'eventTrack.ered?reqCode=deleteEvents',
                    success: function (response) {
                        var resultArray = Ext.JSON
                            .decode(response.responseText);
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
        Ext.Msg.alert('提示', '为保障演示系统高速运行,跟踪功能已关闭.您看到的数据是历史跟踪数据!');
    }

});