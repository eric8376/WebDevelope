/**
 * 全局参数表管理
 *
 * @author XiongChun
 * @since 2010-05-20
 */
Ext.require('Ext4.Com.Model.Params_Model');
Ext.onReady(function () {
    var expander = new Ext.grid.plugin.RowExpander({
        rowBodyTpl: [
            '<p style=margin-left:70px;><span style=color:Teal;>参数键名</span><br><span>{paramkey}</span></p>',
            '<p style=margin-left:70px;><span style=color:Teal;>参数键值</span><br><span>{paramvalue}</span></p>',
            '<p style=margin-left:70px;><span style=color:Teal;>备注</span><br><span>{remark}</span></p>'],
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
            text: '参数键名',
            dataIndex: 'paramkey',
            width: 200
        }, {
            text: '参数键值',
            dataIndex: 'paramvalue',
            width: 250
        }, {
            text: '参数编号',
            dataIndex: 'paramid',
            width: 80,
            sortable: true
        }, {
            text: '备注',
            dataIndex: 'remark'
        }];

    /**
     * 数据存储
     */
    var store = Ext.create('Ext.data.Store', {
        pageSize: '50',
        model: 'Ext4.Com.Model.Params_Model',
        proxy: {
            extraParams: {},
            type: 'ajax',
            url: './param.ered?reqCode=queryParamsForManage',
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
        store: store,
        pageSize: '50',
        displayInfo: true,
        displayMsg: '显示{0}条到{1}条,共{2}条',
        plugins: [Ext.create('Ext.ux.ProgressBarPager')], // 分页进度条
        emptyMsg: "没有符合条件的记录",
        items: ['-', '&nbsp;&nbsp;', pagesize_combo]
    });

    var grid = new Ext.grid.Panel({
        title: '<span class="commoncss">全局参数表</span>',
        height: 500,
        // width:600,
        autoScroll: true,
        region: 'center',
        store: store,
        loadMask: {
            msg: '正在加载表格数据,请稍等...'
        },
        columns: columns,
        selModel: selModel,
        plugins: expander,

        tbar: [{
            text: '新增',
            iconCls: 'page_addIcon',
            handler: function () {
                addInit();
            }
        }, '-', {
            text: '修改',
            iconCls: 'page_edit_1Icon',
            handler: function () {
                editInit();
            }
        }, '-', {
            text: '删除',
            iconCls: 'page_delIcon',
            handler: function () {
                deleteParamItems();
            }
        }, '-', {
            text: '内存同步',
            iconCls: 'arrow_refreshIcon',
            handler: function () {
                synMemory('要对参数表数据进行内存同步操作吗?', '1');
            }
        }, '-', '提示:维护参数表后必须执行内存同步', '->',
            new Ext.form.TextField({
                id: 'queryParam',
                name: 'queryParam',
                emptyText: '请输入参数键名|参数键值',
                enableKeyEvents: true,
                listeners: {
                    specialkey: function (field, e) {
                        if (e.getKey() == Ext.EventObject.ENTER) {
                            queryParamItem();
                        }
                    }
                },
                width: 150
            }), {
                text: '查询',
                iconCls: 'previewIcon',
                handler: function () {
                    queryParamItem();
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
    grid.on('itemdblclick', function (pGrid, record, item, index, e, eOpts) {
        editInit();
    });
    grid.on('sortchange', function () {
        // grid.getSelectionModel().selectFirstRow();
    });

    bbar.on("change", function () {
        // grid.getSelectionModel().selectFirstRow();
    });

    var addParamFormPanel = new Ext.form.Panel({
        id: 'addParamFormPanel',
        name: 'addParamFormPanel',
        defaultType: 'textfield',
        labelAlign: 'right',
        labelWidth: 60,
        frame: false,
        bodyStyle: 'padding:5 5 0',
        items: [{
            fieldLabel: '参数键名',
            name: 'paramkey',
            id: 'paramkey',
            labelStyle: micolor,
            allowBlank: false,
            anchor: '99%'
        }, {
            fieldLabel: '参数键值',
            name: 'paramvalue',
            id: 'paramvalue',
            allowBlank: false,
            labelStyle: micolor,
            xtype: 'textarea',
            anchor: '99%'
        }, {
            fieldLabel: '备注',
            name: 'remark',
            allowBlank: true,
            anchor: '99%'
        }, {
            id: 'paramid',
            name: 'paramid',
            hidden: true
        }, {
            id: 'windowmode',
            name: 'windowmode',
            hidden: true
        }]
    });

    var addParamWindow = new Ext.window.Window({
        layout: 'fit',
        width: 400,
        height: 200,
        resizable: false,
        draggable: true,
        closeAction: 'hide',
        title: '<span class="commoncss">新增全局参数</span>',
        modal: true,
        collapsible: true,
        titleCollapse: true,
        maximizable: false,
        buttonAlign: 'right',
        border: false,
        animCollapse: true,
        pageY: 20,
        pageX: document.body.clientWidth / 2 - 420 / 2,
        animateTarget: Ext.getBody(),
        constrain: true,
        items: [addParamFormPanel],
        buttons: [{
            text: '保存',
            iconCls: 'acceptIcon',
            handler: function () {
                if (runMode == '0') {
                    Ext.Msg.alert('提示',
                        '系统正处于演示模式下运行,您的操作被取消!该模式下只能进行查询操作!');
                    return;
                }
                var mode = Ext.getCmp('windowmode').getValue();
                if (mode == 'add')
                    saveParamItem();
                else
                    updateParamItem();
            }
        }, {
            text: '重置',
            id: 'btnReset',
            iconCls: 'tbar_synchronizeIcon',
            handler: function () {
                clearForm(addParamFormPanel.getForm());
            }
        }, {
            text: '关闭',
            iconCls: 'deleteIcon',
            handler: function () {
                addParamWindow.hide();
            }
        }]
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
    function queryParamItem() {
        store.proxy.extraParams.queryParam = Ext.getCmp('queryParam').getValue()
        store.loadPage(1);
    }

    /**
     * 新增参数初始化
     */
    function addInit() {
        Ext.getCmp('btnReset').hide();
        // clearForm(addParamFormPanel.getForm());
        var flag = Ext.getCmp('windowmode').getValue();
        if (typeof(flag) != 'undefined') {
            addParamFormPanel.getForm().reset();
        } else {
            clearForm(addParamFormPanel.getForm());
        }
        addParamWindow.show();
        addParamWindow
            .setTitle('<span class="commoncss">新增全局参数</span>');
        Ext.getCmp('windowmode').setValue('add');

    }

    /**
     * 保存参数数据
     */
    function saveParamItem() {
        if (!addParamFormPanel.form.isValid()) {
            return;
        }
        addParamFormPanel.form.submit({
            url: './param.ered?reqCode=saveParamItem',
            waitTitle: '提示',
            method: 'POST',
            waitMsg: '正在处理数据,请稍候...',
            success: function (form, action) {
                addParamWindow.hide();
                store.reload();
                form.reset();
                synMemory('参数新增成功,要对参数表数据进行内存同步操作吗?');
            },
            failure: function (form, action) {
                var msg = action.result.msg;
                Ext.MessageBox.alert('提示', '参数数据保存失败:<br>' + msg);
            }
        });
    }

    /**
     * 内存同步
     */
    function synMemory(msg, flag) {
        Ext.Msg.confirm('请确认', msg, function (btn, text) {
            if (btn == 'yes') {
                showWaitMsg();
                Ext.Ajax.request({
                    url: 'param.ered?reqCode=synMemory',
                    success: function (response) {
                        if (flag == '1') {
                            store.reload();
                        }
                        Ext.Msg.alert('提示', '内存同步成功');
                    },
                    failure: function (response) {
                        Ext.Msg.alert('提示', '内存同步失败');
                    }
                });
            }
        });
    }

    /**
     * 删除参数
     */
    function deleteParamItems() {
        var rows = grid.getSelectionModel().getSelection();
        if (Ext.isEmpty(rows)) {
            Ext.Msg.alert('提示', '请先选中要删除的项目!');
            return;
        }
        var strChecked = jsArray2JsString(rows, 'paramid');
        Ext.Msg.confirm('请确认', '确认删除选中的全局参数吗?', function (btn, text) {
            if (btn == 'yes') {
                if (runMode == '0') {
                    Ext.Msg.alert('提示',
                        '系统正处于演示模式下运行,您的操作被取消!该模式下只能进行查询操作!');
                    return;
                }
                showWaitMsg();
                Ext.Ajax.request({
                    url: './param.ered?reqCode=deleteParamItems',
                    success: function (response) {
                        var resultArray = Ext.JSON
                            .decode(response.responseText);
                        store.reload();
                        synMemory('参数删除成功,要对参数表数据进行内存同步操作吗?');
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
        });
    }

    /**
     * 修改参数初始化
     */
    function editInit() {
        var record = grid.getSelectionModel().getSelection()[0];
        if (Ext.isEmpty(record)) {
            Ext.MessageBox.alert('提示', '请先选中要修改的项目');
            return;
        }
        addParamFormPanel.getForm().loadRecord(record);
        addParamWindow.show();
        addParamWindow
            .setTitle('<span class="commoncss">修改全局参数</span>');
        Ext.getCmp('windowmode').setValue('edit');
        Ext.getCmp('paramid').setValue(record.get('paramid'));
        Ext.getCmp('btnReset').hide();
    }

    /**
     * 修改参数数据
     */
    function updateParamItem() {
        if (!addParamFormPanel.form.isValid()) {
            return;
        }
        update();
    }

    /**
     * 更新
     */
    function update() {
        addParamFormPanel.form.submit({
            url: './param.ered?reqCode=updateParamItem',
            waitTitle: '提示',
            method: 'POST',
            waitMsg: '正在处理数据,请稍候...',
            success: function (form, action) {
                addParamWindow.hide();
                store.reload();
                form.reset();
                synMemory('参数修改成功,要对参数表数据进行内存同步操作吗?');
            },
            failure: function (form, action) {
                var msg = action.result.msg;
                Ext.MessageBox.alert('提示', '数据修改失败:<br>' + msg);
            }
        });
    }
});