/**
 * 部门管理
 *
 * @author XiongChun
 * @since 2010-04-11
 */
Ext.require('Ext4.Com.Model.Depts_Model');
Ext.onReady(function () {
    var root = {
        text: root_deptname,
        expanded: true,
        id: root_deptid
    };
    var deptTree = new Ext.tree.Panel({
        store: new Ext.data.TreeStore({
            preloadChildren: true,
            root: root,
            proxy: {
                type: 'ajax', url: './organization.ered?reqCode=departmentTreeInit'
            }
        }),
//        title: '',
//        applyTo: 'deptTreeDiv',
        autoScroll: false,
        animate: false,
        useArrows: false,
        border: false
    });
    deptTree.getSelectionModel().select(root);
    deptTree.on('cellclick', function (treeview, htmltext, index, node) {
        var deptid = node.data.id;
        store.proxy.extraParams.deptid = deptid;
        store.loadPage(1);
    });

    var contextMenu = new Ext.menu.Menu({
        items: [
            {
                text: '新增部门',
                iconCls: 'page_addIcon',
                handler: function () {
                    addInit();
                }
            },
            {
                text: '修改部门',
                iconCls: 'page_edit_1Icon',
                handler: function () {
                    editInit();
                }
            },
            {
                text: '删除部门',
                iconCls: 'page_delIcon',
                handler: function () {
                    var selectModel = deptTree.getSelectionModel();
                    var selectNode = selectModel.getSelection()[0];
                    deleteDeptItems('2', selectNode.data.id);
                }
            },
            {
                text: '扩展设置',
                iconCls: 'page_edit_1Icon',
                handler: function () {
                    var selectModel = deptTree.getSelectionModel();
                    var selectNode = selectModel.getSelection()[0];
                    manageRoleSet(selectNode.data.id);
                    //deleteDeptItems('2', selectNode.attributes.id);
                }
            },
            {
                text: '刷新节点',
                iconCls: 'page_refreshIcon',
                handler: function () {
                    var selectModel = deptTree.getSelectionModel();
                    var selectNode = selectModel.getSelection();
                    if (selectNode[0].data.leaf) {
                        refreshNode(selectNode[0].parentNode.data.id);
                    } else {
                        refreshNode(selectNode[0].data.id);
                    }
                }
            }
        ]
    });
    deptTree.on('cellcontextmenu', function (treeview, td, cellIndex, node, tr, rowIndex, e, eOpts) {
        e.preventDefault();
        var deptid = node.data.id;
        var deptname = node.data.text;
        Ext.getCmp('parentdeptname').setValue(deptname);
        Ext.getCmp('parentid').setValue(deptid);

        store.proxy.extraParams.deptid = deptid;
        store.loadPage(1, {
            callback: function (r, options, success) {
                for (var i = 0; i < r.length; i++) {
                    var record = r[i];
                    var deptid_g = record.data.deptid;
                    if (deptid_g == deptid) {
                        grid.getSelectionModel().select(record);
                    }
                }
            }

        });
        deptTree.getSelectionModel().select(node);
        contextMenu.showAt(e.getXY());
    });

    var selModel = Ext.create('Ext.selection.CheckboxModel');
    var columns = [
        {
            xtype: 'rownumberer',
            text: '序号',
            width: 32
        },
        {
            text: '部门名称',
            dataIndex: 'deptname',
            width: 130
        },
        {
            text: '业务对照码',
            dataIndex: 'customid',
            width: 100
        },
        {
            text: '上级部门',
            dataIndex: 'parentdeptname',
            width: 130
        },
        {
            text: '排序号',
            dataIndex: 'sortno',
            sortable: true,
            width: 50
        },
        {
            text: '节点类型',
            dataIndex: 'leaf',
            hidden: true,
            renderer: LEAFRender
        },
        {
            text: '父节点编号',
            hidden: true,
            dataIndex: 'parentid'
        },
        {
            text: '下属用户数目',
            hidden: true,
            dataIndex: 'usercount'
        },
        {
            text: '下属角色数目',
            hidden: true,
            dataIndex: 'rolecount'
        },
        {
            text: '部门编号',
            dataIndex: 'deptid',
            hidden: false,
            width: 130,
            sortable: true
        },
        {
            text: '备注',
            dataIndex: 'remark'
        }
    ];

    /**
     * 数据存储
     */
    var store = Ext.create('Ext.data.Store', {
        model: 'Ext4.Com.Model.Depts_Model',
        pageSize: '20',
        proxy: {
            type: 'ajax',
            url: './organization.ered?reqCode=queryDeptsForManage',
            reader: {
                type: 'json',
                totalProperty: 'TOTALCOUNT', // 记录总数
                root: 'ROOT' // Json中的列表数据根节点
            }
        }
    });

    // 翻页排序时带上查询条件
    store.on('beforeload', function () {
        Ext.apply(store.proxy.extraParams, {queryParam: Ext.getCmp('queryParam').getValue()});
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
        var number = parseInt(comboBox.getValue());
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
        title: '<span class="commoncss">部门信息表</span>',
        height: 500,
        // width:600,
        autoScroll: true,
        region: 'center',
        store: store,
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
                    addInit();
                }
            },
            '-',
            {
                text: '修改',
                iconCls: 'page_edit_1Icon',
                handler: function () {
                    editInit();
                }
            },
            '-',
            {
                text: '删除',
                iconCls: 'page_delIcon',
                handler: function () {
                    deleteDeptItems('1', '');
                }
            },
            '->',
            new Ext.form.TextField({
                id: 'queryParam',
                name: 'queryParam',
                emptyText: '请输入部门名称',
                enableKeyEvents: true,
                listeners: {
                    specialkey: function (field, e) {
                        if (e.getKey() == Ext.EventObject.ENTER) {
                            queryDeptItem();
                        }
                    }
                },
                width: 130
            }),
            {
                text: '查询',
                iconCls: 'previewIcon',
                handler: function () {
                    queryDeptItem();
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
    store.loadPage(1, {
        params: {
            firstload: 'true'
        }
    });
    grid.on('itemdblclick', function (pGrid, record, item, index, e, eOpts) {
        editInit();
    });
    grid.on('sortchange', function () {
        // grid.getSelectionModel().selectFirstRow();
    });


    var addRoot = {
        text: root_deptname,
        expanded: true,
        id: root_deptid
    };
    var comboxWithTree =
        Ext.create('Ext.ux.TreePicker', {
            id: 'parentdeptname',
            anchor: '99%',
            displayField: 'text',//这个地方也需要注意一下，这个是告诉源码tree用json数据里面的什么字段来显示，我测试出来是只能写'text'才有效果
            fieldLabel: '上级部门',
            forceSelection: true,// 只能选择下拉框里面的内容
            editable: false,// 不能编辑
            maxHeight: 390,
            allowBlank: false,
            store: new Ext.data.TreeStore({
                preloadChildren: true,
                root: addRoot,
                autoLoad: true,
                proxy: {
                    type: 'ajax', url: './organization.ered?reqCode=departmentTreeInit'
                }
            }), listeners: {
                'select': function (picker, record, eOpts) {
                    Ext.getCmp("addDeptFormPanel").getForm().findField('parentid')
                        .setValue(record.data.id);
                }
            }
        })

    var addDeptFormPanel = new Ext.form.Panel({
        id: 'addDeptFormPanel',
        name: 'addDeptFormPanel',
        defaultType: 'textfield',
        labelAlign: 'right',
        labelWidth: 70,
        frame: false,
        bodyStyle: 'padding:5 5 0',
        items: [
            {
                fieldLabel: '部门名称',
                name: 'deptname',
                id: 'deptname',
                allowBlank: false,
                labelStyle: micolor,
                anchor: '99%'
            },
            comboxWithTree,
            {
                fieldLabel: '业务对照码',
                name: 'customid',
                allowBlank: true,
                anchor: '99%'
            },
            {
                fieldLabel: '排序号',
                name: 'sortno',
                allowBlank: true,
                anchor: '99%'
            },
            {
                fieldLabel: '备注',
                name: 'remark',
                allowBlank: true,
                anchor: '99%'
            },
            {
                id: 'parentid',
                name: 'parentid',
                hidden: true
            },
            {
                id: 'windowmode',
                name: 'windowmode',
                hidden: true
            },
            {
                id: 'deptid',
                name: 'deptid',
                hidden: true
            },
            {
                id: 'parentid_old',
                name: 'parentid_old',
                hidden: true
            }
        ]
    });
    var addDeptWindow = new Ext.window.Window({
        layout: 'fit',
        width: 400,
        height: 205,
        resizable: false,
        draggable: true,
        closable: true,
        modal: true,
        closeAction: 'hide',
        title: '<span class="commoncss">新增部门</span>',
        // iconCls : 'page_addIcon',
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
        items: [addDeptFormPanel],
        buttons: [
            {
                text: '保存',
                iconCls: 'acceptIcon',
                id: 'btn_id_save_update',
                handler: function () {
                    if (runMode == '0') {
                        Ext.Msg.alert('提示',
                            '系统正处于演示模式下运行,您的操作被取消!该模式下只能进行查询操作!');
                        return;
                    }
                    var mode = Ext.getCmp('windowmode').getValue();
                    if (mode == 'add')
                        saveDeptItem();
                    else
                        updateDeptItem();
                }
            },
            {
                text: '重置',
                id: 'btnReset',
                iconCls: 'tbar_synchronizeIcon',
                handler: function () {
                    clearForm(addDeptFormPanel.getForm());
                }
            },
            {
                text: '关闭',
                iconCls: 'deleteIcon',
                handler: function () {
                    addDeptWindow.hide();
                }
            }
        ]
    });
    /**
     * 布局
     */
    var viewport = new Ext.Viewport({
        layout: 'border',
        items: [
            {
                title: '<span class="commoncss">组织机构</span>',
                iconCls: 'chart_organisationIcon',
                tools: [
                    {
                        id: 'refresh',
                        handler: function () {
                            refreshNode(root.id);
                        }
                    }
                ],
                collapsible: true,
                width: 210,
                minSize: 160,
                maxSize: 280,
                split: true,
                region: 'west',
                autoScroll: true,
                // collapseMode:'mini',
                items: [deptTree]
            },
            {
                region: 'center',
                layout: 'fit',
                border: false,
                items: [grid]
            }
        ]
    });

    /**
     * 根据条件查询部门
     */
    function queryDeptItem() {
        store.loadPage(1);
    }

    /**
     * 新增部门初始化
     */
    function addInit() {
        Ext.getCmp('btnReset').hide();
        // clearForm(addDeptFormPanel.getForm());
        var flag = Ext.getCmp('windowmode').getValue();
        if (typeof (flag) != 'undefined') {
            addDeptFormPanel.getForm().reset();
        } else {
            clearForm(addDeptFormPanel.getForm());
        }
        var selectModel = deptTree.getSelectionModel();
        var selectNode = selectModel.getSelection()[0];
        if (Ext.isEmpty(selectNode)) {
            Ext.Msg.alert('提示', '没有选择上级部门，无法新增');
            return;
        }
        Ext.getCmp('parentdeptname').setRawValue(selectNode.data.text);
        Ext.getCmp('parentid').setValue(selectNode.data.id);
        addDeptWindow.show();
        addDeptWindow
            .setTitle('<span class="commoncss">新增部门</span>');
        Ext.getCmp('windowmode').setValue('add');
        comboxWithTree.setDisabled(false);
        //Ext.getCmp('btnReset').show();
    }

    /**
     * 保存部门数据
     */
    function saveDeptItem() {
        if (!addDeptFormPanel.form.isValid()) {
            return;
        }
        addDeptFormPanel.form.submit({
            url: './organization.ered?reqCode=saveDeptItem',
            waitTitle: '提示',
            method: 'POST',
            waitMsg: '正在处理数据,请稍候...',
            success: function (form, action) {
                addDeptWindow.hide();
                store.reload();
                refreshNode(Ext.getCmp('parentid').getValue());
                form.reset();
                Ext.MessageBox.alert('提示', action.result.msg);
            },
            failure: function (form, action) {
                var msg = action.result.msg;
                Ext.MessageBox.alert('提示', '部门数据保存失败:<br>' + msg);
            }
        });
    }

    /**
     * 刷新指定节点
     */
    function refreshNode(nodeid) {
        var treestore = deptTree.getStore();
        var node = treestore.getNodeById(nodeid);
        /* 异步加载树在没有展开节点之前是获取不到对应节点对象的 */
        if (Ext.isEmpty(node)) {
            treestore.reload();
            return;
        }
        if (node.data.leaf) {
            treestore.load({node: node.parentNode});
        } else {
            treestore.load({node: node});
        }
    }

    /**
     * 修改部门初始化
     */
    function editInit() {
        var record = grid.getSelectionModel().getSelection()[0];
        if (Ext.isEmpty(record)) {
            Ext.MessageBox.alert('提示', '请先选择要修改的部门!');
            return;
        }
        if (record.get('leaf') == '0' || record.get('usercount') != '0'
            || record.get('rolecount') != '0') {
            comboxWithTree.setDisabled(true);
        } else {
            comboxWithTree.setDisabled(false);
        }
        if (record.get('deptid') == '001') {
            var a = Ext.getCmp('parentdeptname');
            a.emptyText = '已经是顶级部门';
        } else {
        }
        addDeptFormPanel.getForm().loadRecord(record);
        Ext.getCmp('parentdeptname').setRawValue(record.data.parentdeptname);
        Ext.getCmp('parentid').setValue(record.data.parentid);
        addDeptWindow.show();
        addDeptWindow
            .setTitle('<span style="font-weight:normal">修改部门</span>');
        Ext.getCmp('windowmode').setValue('edit');
        Ext.getCmp('parentid_old').setValue(record.get('parentid'));
        Ext.getCmp('btnReset').hide();
    }

    /**
     * 修改部门数据
     */
    function updateDeptItem() {
        if (!addDeptFormPanel.form.isValid()) {
            return;
        }
        update();
    }

    /**
     * 更新
     */
    function update() {
        var parentid = Ext.getCmp('parentid').getValue();
        var parentid_old = Ext.getCmp('parentid_old').getValue();
        addDeptFormPanel.form.submit({
            url: './organization.ered?reqCode=updateDeptItem',
            waitTitle: '提示',
            method: 'POST',
            waitMsg: '正在处理数据,请稍候...',
            success: function (form, action) {
                addDeptWindow.hide();
                store.reload();
                refreshNode(parentid);
                if (parentid != parentid_old) {
                    refreshNode(parentid_old);
                }
                form.reset();
                Ext.MessageBox.alert('提示', action.result.msg);
            },
            failure: function (form, action) {
                var msg = action.result.msg;
                Ext.MessageBox.alert('提示', '部门数据修改失败:<br>' + msg);
            }
        });
    }

    /**
     * 删除部门
     */
    function deleteDeptItems(pType, pDeptid) {
        var rows = grid.getSelectionModel().getSelection();
        var fields = '';
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].get('deptid') == '001') {
                fields = fields + rows[i].get('deptname') + '<br>';
            }
        }
        if (fields != '') {
            Ext.Msg
                .alert(
                '提示',
                '<b>您选中的项目中包含如下系统内置的只读项目</b><br>' + fields + '<font color=red>只读项目不能删除!</font>');
            return;
        }
        if (Ext.isEmpty(rows)) {
            if (pType == '1') {
                Ext.Msg.alert('提示', '请先选中要删除的项目!');
                return;
            }
        }
        var strChecked = jsArray2JsString(rows, 'deptid');
        Ext.Msg
            .confirm(
            '请确认',
            '<span style="color:red"><b>提示:</b>删除部门将同时删除部门下属人员和角色以及它们的权限信息,请慎重.</span><br>继续删除吗?',
            function (btn, text) {
                if (btn == 'yes') {
                    if (runMode == '0') {
                        Ext.Msg
                            .alert('提示',
                            '系统正处于演示模式下运行,您的操作被取消!该模式下只能进行查询操作!');
                        return;
                    }
                    showWaitMsg();
                    Ext.Ajax
                        .request({
                            url: './organization.ered?reqCode=deleteDeptItems',
                            success: function (response) {
                                var resultArray = Ext.JSON
                                    .decode(response.responseText);
                                store.reload();
                                var treestore = deptTree.getStore();
                                if (pType == '1') {
                                    treestore.load()
                                } else {
                                    treestore.load()
                                }
                                Ext.Msg.alert('提示',
                                    resultArray.msg);
                            },
                            failure: function (response) {
                                var resultArray = Ext.JSON
                                    .decode(response.responseText);
                                Ext.Msg.alert('提示',
                                    resultArray.msg);
                            },
                            params: {
                                strChecked: strChecked,
                                type: pType,
                                deptid: pDeptid
                            }
                        });
                }
            });
    }

});