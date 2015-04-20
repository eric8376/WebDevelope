/**
 * 字典管理
 *
 * @author XiongChun
 * @since 2010-02-13
 */
Ext.require('Ext4.Com.Model.CodeItems_Model');
Ext.onReady(function () {
    var selModel = Ext.create('Ext.selection.CheckboxModel');
    var columns = [
        {
            xtype: 'rownumberer',
            text: '序号',
            width: 32
        },
        {
            text: '对照字段',
            dataIndex: 'field',
            sortable: true,
            width: 130
        },
        {
            text: '字段名',
            dataIndex: 'fieldname'
        },
        {
            text: '代码',
            dataIndex: 'code',
            width: 50
        },
        {
            text: '代码描述',
            dataIndex: 'codedesc'
        },
        {
            text: '启用状态',
            dataIndex: 'enabled',
            renderer: ENABLEDRender
        },
        {
            text: '编辑模式',
            dataIndex: 'editmode',
            renderer: EDITMODERender
        },
        {
            text: '字段编号',
            dataIndex: 'codeid',
            hidden: false,
            width: 80,
            sortable: true
        },
        {
            text: '备注',
            dataIndex: 'remark'
        }
    ];

    var store = Ext.create('Ext.data.Store', {
        model: 'Ext4.Com.Model.CodeItems_Model',
        pageSize: '20',
        proxy: {
            type: 'ajax',
            url: './resource.ered?reqCode=queryCodeItems',
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
        displayMsg: '显示{0}条到{1}条,共{2}条',
        plugins: [Ext.create('Ext.ux.ProgressBarPager')], // 分页进度条
        emptyMsg: "没有符合条件的记录",
        items: ['-', '&nbsp;&nbsp;', pagesize_combo]
    })

    var grid = new Ext.grid.Panel({
        title: '<span class="commoncss">字典数据列表</span>',
        height: 510,
        store: store,
        region: 'center',
        loadMask: {
            msg: '正在加载表格数据,请稍等...'
        },
        frame: true,
        autoExpandColumn: 'remark',
        columns: columns,
        selModel: selModel,
        tbar: [
            {
                text: '新增',
                iconCls: 'page_addIcon',
                handler: function () {
                    codeWindow.show();
                }
            },
            '-',
            {
                text: '修改',
                iconCls: 'page_edit_1Icon',
                handler: function () {
                    ininEditCodeWindow();
                }
            },
            '-',
            {
                text: '删除',
                iconCls: 'page_delIcon',
                handler: function () {
                    deleteCodeItems();
                }
            },
            '-',
            {
                text: '内存同步',
                iconCls: 'arrow_refreshIcon',
                handler: function () {
                    synMemory('要对字典数据进行内存同步操作吗?', '1');
                }
            },
            '-',
            '提示:维护字典后必须执行内存同步',
            '->',
            new Ext.form.TextField({
                id: 'queryParam',
                name: 'queryParam',
                emptyText: '字段|字段名|代码描述',
                enableKeyEvents: true,
                listeners: {
                    specialkey: function (field, e) {
                        if (e.getKey() == Ext.EventObject.ENTER) {
                            queryCodeItem();
                        }
                    }
                },
                width: 130
            }),
            {
                text: '查询',
                iconCls: 'previewIcon',
                handler: function () {
                    queryCodeItem();
                }
            },
            '-',
            {
                text: '刷新',
                iconCls: 'arrow_refreshIcon',
                handler: function () {
                    store.reload();
                }
            }
        ],
        bbar: bbar
    });

    store.loadPage(1);

    grid.addListener('rowdblclick', ininEditCodeWindow);
    grid.on('sortchange', function () {
        // grid.getSelectionModel().selectFirstRow();
    });

    bbar.on("change", function () {
        // grid.getSelectionModel().selectFirstRow();
    });
    /**
     * 新增代码对照表
     */
    var codeWindow;
    var formPanel;
    var enabledCombo = new Ext.form.field.ComboBox({
        name: 'enabled',
        hiddenName: 'enabled',
        store: ENABLEDStore,
        queryMode: 'local',
        triggerAction: 'all',
        valueField: 'value',
        displayField: 'text',
        value: '1',
        fieldLabel: '启用状态',
        emptyText: '请选择...',
        allowBlank: false,
        labelStyle: micolor,
        forceSelection: true,
        editable: false,
        anchor: "99%"
    });

    var editmodeCombo = new Ext.form.field.ComboBox({
        name: 'editmode',
        hiddenName: 'editmode',
        store: EDITMODEStore,
        queryMode: 'local',
        triggerAction: 'all',
        valueField: 'value',
        displayField: 'text',
        value: '1',
        fieldLabel: '编辑模式',
        emptyText: '请选择...',
        allowBlank: false,
        labelStyle: micolor,
        forceSelection: true,
        editable: false,
        anchor: "99%"
    });

    formPanel = new Ext.form.Panel({
        id: 'codeForm',
        name: 'codeForm',
        defaultType: 'textfield',
        labelAlign: 'right',
        labelWidth: 60,
        frame: false,
        bodyStyle: 'padding:5 5 0',
        items: [
            {
                fieldLabel: '对照字段',
                name: 'field',
                anchor: '100%',
                labelStyle: micolor,
                allowBlank: false
            },
            {
                fieldLabel: '字段名',
                name: 'fieldname',
                anchor: '100%',
                labelStyle: micolor,
                allowBlank: false
            },
            {
                xtype: 'textfield',
                fieldLabel: '代码',
                name: 'code',
                anchor: '100%',
                labelStyle: micolor,
                allowBlank: false
            },
            {
                fieldLabel: '代码描述',
                name: 'codedesc',
                anchor: '100%',
                labelStyle: micolor,
                allowBlank: false
            },
            enabledCombo,
            editmodeCombo,
            {
                fieldLabel: '备注',
                name: 'remark',
                anchor: '100%',
                allowBlank: true
            }
        ]
    });

    codeWindow = new Ext.window.Window({
        layout: 'fit',
        width: 300,
        height: 260,
        resizable: false,
        draggable: true,
        closeAction: 'hide',
        title: '<span class="commoncss">新增字典</span>',
        // iconCls : 'page_addIcon',
        modal: true,
        collapsible: true,
        titleCollapse: true,
        maximizable: false,
        buttonAlign: 'right',
        border: false,
        animCollapse: true,
        animateTarget: Ext.getBody(),
        constrain: true,
        items: [formPanel],
        buttons: [
            {
                text: '保存',
                iconCls: 'acceptIcon',
                handler: function () {
                    if (runMode == '0') {
                        Ext.Msg.show({
                            title: '提示',
                            msg: '系统正处于演示模式下运行,您的操作被取消!该模式下只能进行查询操作!',
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.WARNING
                        });
                        return;
                    }
                    if (codeWindow.getComponent('codeForm').form.isValid()) {
                        codeWindow.getComponent('codeForm').form.submit({
                            url: './resource.ered?reqCode=saveCodeItem',
                            waitTitle: '提示',
                            method: 'POST',
                            waitMsg: '正在处理数据,请稍候...',
                            success: function (form, action) {
                                store.reload();
                                Ext.Msg.confirm('请确认', '代码对照新增成功,您要继续添加代码对照吗?',
                                    function (btn, text) {
                                        if (btn == 'yes') {

                                        } else {
                                            codeWindow.getComponent('codeForm').form
                                                .reset();
                                            codeWindow.hide();
                                            synMemory('要立即进行内存同步吗？');
                                        }
                                    });
                            },
                            failure: function (form, action) {
                                var msg = action.result.msg;
                                Ext.Msg.show({
                                    title: '提示',
                                    msg: '代码对照表保存失败:<br>' + msg,
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.MessageBox.WARNING
                                });
                                codeWindow.getComponent('codeForm').getForm().reset();
                            }
                        });
                    } else {
                        // 表单验证失败
                    }
                }
            },
            {
                text: '关闭',
                iconCls: 'deleteIcon',
                handler: function () {
                    codeWindow.hide();
                }
            }
        ]
    });

    /** *****************修改代码对照*********************** */
    var enabledCombo_E = new Ext.form.field.ComboBox({
        name: 'enabled',
        hiddenName: 'enabled',
        store: ENABLEDStore,
        queryMode: 'local',
        triggerAction: 'all',
        valueField: 'value',
        displayField: 'text',
        value: '1',
        fieldLabel: '启用状态',
        emptyText: '请选择...',
        allowBlank: false,
        labelStyle: micolor,
        forceSelection: true,
        editable: false,
        anchor: "99%"
    });

    var editmodeCombo_E = new Ext.form.field.ComboBox({
        name: 'editmode',
        hiddenName: 'editmode',
        store: EDITMODEStore,
        queryMode: 'local',
        triggerAction: 'all',
        fieldClass: 'x-custom-field-disabled',
        valueField: 'value',
        displayField: 'text',
        value: '1',
        fieldLabel: '编辑模式',
        disabled: true,
        emptyText: '请选择...',
        allowBlank: false,
        labelStyle: micolor,
        forceSelection: true,
        editable: false,
        anchor: "99%"
    });

    var editCodeWindow, editCodeFormPanel;
    editCodeFormPanel = new Ext.form.Panel({
        labelAlign: 'right',
        labelWidth: 60,
        defaultType: 'textfield',
        frame: false,
        bodyStyle: 'padding:5 5 0',
        id: 'editCodeFormPanel',
        name: 'editCodeFormPanel',
        items: [
            {
                fieldLabel: '对照字段',
                name: 'field',
                anchor: '100%',
                labelStyle: micolor,
                allowBlank: false
            },
            {
                fieldLabel: '字段名',
                name: 'fieldname',
                anchor: '100%',
                labelStyle: micolor,
                allowBlank: false
            },
            {
                xtype: 'textfield',
                fieldLabel: '代码',
                name: 'code',
                anchor: '100%',
                labelStyle: micolor,
                allowBlank: false
            },
            {
                fieldLabel: '代码描述',
                name: 'codedesc',
                anchor: '100%',
                labelStyle: micolor,
                allowBlank: false
            },
            enabledCombo_E,
            editmodeCombo_E,
            {
                fieldLabel: '备注',
                name: 'remark',
                anchor: '100%',
                allowBlank: true
            },
            {
                fieldLabel: '代码编号',
                name: 'codeid',
                anchor: '100%',
                hidden: true,
                hideLabel: true
            }
        ]
    });

    editCodeWindow = new Ext.window.Window({
        layout: 'fit',
        width: 300,
        height: 260,
        resizable: false,
        draggable: true,
        closeAction: 'hide',
        title: '<span class="commoncss">修改字典</span>',
        modal: true,
        collapsible: true,
        titleCollapse: true,
        maximizable: false,
        buttonAlign: 'right',
        border: false,
        animCollapse: true,
        animateTarget: Ext.getBody(),
        constrain: true,
        items: [editCodeFormPanel],
        buttons: [
            {
                text: '保存',
                iconCls: 'acceptIcon',
                handler: function () {
                    if (runMode == '0') {
                        Ext.Msg.show({
                            title: '提示',
                            msg: '系统正处于演示模式下运行,您的操作被取消!该模式下只能进行查询操作!',
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.WARNING
                        });
                        return;
                    }
                    updateCodeItem();
                }
            },
            {
                text: '关闭',
                iconCls: 'deleteIcon',
                handler: function () {
                    editCodeWindow.hide();
                }
            }
        ]

    });
    /**
     * 布局
     */
    var viewport = new Ext.Viewport({
        layout: 'border',
        items: [grid]
    });

    /**
     * 初始化代码修改出口
     */
    function ininEditCodeWindow() {
        var record = grid.getSelectionModel().getSelection()[0];
        if (Ext.isEmpty(record)) {
            Ext.Msg.show({
                title: '提示',
                msg: '请先选中要修改的项目',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return;
        }
        record = grid.getSelectionModel().getSelection()[0];
        if (record.get('editmode') == '0') {
            Ext.Msg.show({
                title: '提示',
                msg: '您选中的记录为系统内置的代码对照,不允许修改',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return;
        }
        editCodeWindow.show();
        editCodeFormPanel.getForm().loadRecord(record);
    }

    /**
     * 修改字典
     */
    function updateCodeItem() {
        if (!editCodeFormPanel.form.isValid()) {
            return;
        }
        editCodeFormPanel.form.submit({
            url: './resource.ered?reqCode=updateCodeItem',
            waitTitle: '提示',
            method: 'POST',
            waitMsg: '正在处理数据,请稍候...',
            success: function (form, action) {
                editCodeWindow.hide();
                store.reload();
                synMemory('字典修改成功,要立即进行内存同步吗？');
            },
            failure: function (form, action) {
                var msg = action.result.msg;
                Ext.Msg.show({
                    title: '提示',
                    msg: '代码对照表保存失败:<br>' + msg,
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
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
                    url: 'resource.ered?reqCode=synMemory',
                    success: function (response) {
                        if (flag == '1') {
                            store.reload();
                        }
                        var resultArray = Ext.JSON
                            .decode(response.responseText);
                        Ext.MessageBox.alert('提示', resultArray.msg);
                    },
                    failure: function (response) {
                        Ext.Msg.show({
                            title: '提示',
                            msg: '内存同步失败',
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.WARNING
                        });
                    }
                });
            }
        });
    }

    /**
     * 删除代码对照
     */
    function deleteCodeItems() {
        if (runMode == '0') {
            Ext.Msg.show({
                title: '提示',
                msg: '系统正处于演示模式下运行,您的操作被取消!该模式下只能进行查询操作!',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return;
        }
        var rows = grid.getSelectionModel().getSelection();
        if (Ext.isEmpty(rows)) {
            return;
        }
        var fields = '';
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].get('editmode') == '0') {
                fields = fields + rows[i].get('fieldname') + '->'
                + rows[i].get('codedesc') + '<br>';
            }
        }
        if (fields != '') {
            Ext.Msg.show({
                title: '提示',
                msg: '<b>您选中的项目中包含如下系统内置的只读项目</b><br>' + fields
                + '<font color=red>只读项目不能删除!</font>',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return;
        }
        if (Ext.isEmpty(rows)) {
            Ext.Msg.show({
                title: '提示',
                msg: '请先选中要删除的项目!',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return;
        }
        var strChecked = jsArray2JsString(rows, 'codeid');
        Ext.Msg.confirm('请确认', '你真的要删除字典吗?', function (btn, text) {
            if (btn == 'yes') {
                showWaitMsg();
                Ext.Ajax.request({
                    url: './resource.ered?reqCode=deleteCodeItem',
                    success: function (response) {
                        store.reload();
                        synMemory('字典删除成功,要立即进行内存同步吗？');
                    },
                    failure: function (response) {
                        var resultArray = Ext.JSON
                            .decode(response.responseText);
                        Ext.Msg.show({
                            title: '提示',
                            msg: resultArray.msg,
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.WARNING
                        });
                    },
                    params: {
                        strChecked: strChecked
                    }
                });
            }
        });
    }

    /**
     * 根据条件查询字典
     */
    function queryCodeItem() {
        store.getProxy().extraParams.queryParam = Ext.getCmp('queryParam').getValue();
        store.loadPage(1);
    }

    /**
     * 刷新字典
     */
    function refreshCodeTable() {
        store.loadPage(1);
    }
});