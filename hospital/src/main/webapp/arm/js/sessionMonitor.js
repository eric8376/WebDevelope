/**
 * 会话监控
 *
 * @author XiongChun
 * @since 2010-09-03
 */
Ext.require('Ext4.Com.Model.Session_Model');
Ext.onReady(function () {
    var selModel = Ext.create('Ext.selection.CheckboxModel');
    var columns = [
        {
            xtype: 'rownumberer',
            text: '序号',
            width: 32
        },
        {
            text: '用户编号',
            dataIndex: 'userid',
            width: 75,
            hidden: true,
            sortable: true
        }, {
            text: '会话创建时间',
            dataIndex: 'sessionCreatedTime',
            width: 140
        }, {
            text: '登录账户',
            dataIndex: 'account',
            width: 150
        }, {
            text: '姓名',
            dataIndex: 'username',
            width: 90
        }, {
            text: '客户端IP',
            dataIndex: 'loginIP',
            width: 100
        }, {
            text: '客户端浏览器',
            dataIndex: 'explorer',
            width: 120
        }, {
            text: '会话ID',
            dataIndex: 'sessionID',
            width: 250
        }, {
            dataIndex: '_blank'
        }];

    var store = Ext.create('Ext.data.Store', {
        pageSize: '50',
        model: 'Ext4.Com.Model.Session_Model',

        proxy: {
            extraParams: {},
            type: 'ajax',
            url: 'sessionMonitor.ered?reqCode=getSessionList',
            reader: {
                type: 'json',
                totalProperty: 'TOTALCOUNT', // 记录总数
                root: 'ROOT' // Json中的列表数据根节点
            }
        }
    });

    store.on('beforeload', function () {
        Ext.apply(this.proxy.extraParams, {
            username: Ext.getCmp('username').getValue(),
            account: Ext.getCmp('account').getValue()
        })

    });

    var pagesize_combo = new Ext.form.field.ComboBox({
        name: 'pagesize',
        hiddenName: 'pagesize',
        triggerAction: 'all',
        lazyRender: true,
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
        items: ['-', '&nbsp;&nbsp;', pagesize_combo]
    });

    var grid = new Ext.grid.Panel({
        title: '<span class="commoncss">会话监控</span>',
        height: 510,
        store: store,
        region: 'center',
        loadMask: {
            msg: '正在加载数据,请稍等...'
        },
        frame: true,
        autoExpandColumn: '_blank',
        columns: columns,
        selModel: selModel,
        tbar: [{
            text: '杀死会话',
            iconCls: 'deleteIcon',
            handler: function () {
                if (runMode == '0') {
                    Ext.Msg
                        .alert('提示',
                        '系统正处于演示模式下运行,您的操作被取消!该模式下只能进行查询操作!');
                    return;
                }
                killSession();
            }
        }, '->', {
            id: 'account',
            name: 'account',
            xtype: 'textfield',
            emptyText: '登录帐户',
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
            id: 'username',
            name: 'username',
            xtype: 'textfield',
            emptyText: '姓名',
            enableKeyEvents: true,
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == Ext.EventObject.ENTER) {
                        query();
                    }
                }
            },
            width: 120
        }, {
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


    /**
     * 布局
     */
    var viewport = new Ext.Viewport({
        layout: 'fit',
        items: [grid]
    });

    /**
     * 杀死会话
     */
    function killSession() {
        var rows = grid.getSelectionModel().getSelection();
        if (Ext.isEmpty(rows)) {
            Ext.Msg.alert('提示', '请先选中杀死的会话!');
            return;
        }
        var strChecked = jsArray2JsString(rows, 'sessionID');
        showWaitMsg('正在杀死会话,请等待...');
        Ext.Ajax.request({
            url: 'sessionMonitor.ered?reqCode=killSession',
            success: function (response) {
                var resultArray = Ext.JSON
                    .decode(response.responseText);
                store.reload();
                Ext.Msg.alert('提示', resultArray.msg);
            },
            failure: function (response) {
                var resultArray = Ext.JSON
                    .decode(response.responseText);
                Ext.Msg.alert('提示', resultArray.msg);
            },
            params: {
                strChecked: strChecked
            }
        });
    }

    function query() {
        store.proxy.extraParams.username = Ext.getCmp('username').getValue();
        store.proxy.extraParams.account = Ext.getCmp('account').getValue();
        store.loadPage(1);

    }

});