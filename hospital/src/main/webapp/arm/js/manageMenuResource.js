/**
 * 代码表管理
 *
 * @author XiongChun
 * @since 2010-02-13
 */

Ext.require('Ext4.Com.Model.MenuItems_Model');
Ext.require('Ext4.Com.Model.none_Model');

Ext.onReady(function () {
    var root = {
        text: root_menuname,
        expanded: true,
        id: '01'
    };
    var menuTree =
        Ext.create('Ext.tree.Panel', {
            store: new Ext.data.TreeStore({
                preloadChildren: true,
                root: root,
                proxy: {
                    type: 'ajax', url: './resource.ered?reqCode=queryMenuItems'
                }
            }),
            rootVisible: true,
            autoScroll: false,
            animate: false,
            useArrows: false,
            border: false,
            applyTo: 'menuTreeDiv'
        });

    menuTree.on('cellclick', function (treeview, htmltext, index, node) {
        var menuid = node.data.id;
        var menuname = node.data.text;
        Ext.getCmp('parentmenuname').setValue(menuname);
        Ext.getCmp('parentid').setValue(menuid);
        store.proxy.extraParams.menuid = menuid;
        store.loadPage(1);
    });
    menuTree.getSelectionModel().select(root);
    var contextMenu = Ext.create('Ext.menu.Menu', {
        items: [
            {
                text: '新增菜单',
                iconCls: 'page_addIcon',
                handler: function () {
                    addInit();
                }
            },
            {
                text: '修改菜单',
                iconCls: 'page_edit_1Icon',
                handler: function () {
                    editInit();
                }
            },
            {
                text: '删除菜单',
                iconCls: 'page_delIcon',
                handler: function () {
                    deleteMenuItems('2');
                }
            },
            {
                text: '刷新节点',
                iconCls: 'page_refreshIcon',
                handler: function () {
                    var selectModel = menuTree.getSelectionModel();
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
    menuTree.on('cellcontextmenu', function (treeview, td, cellIndex, node, tr, rowIndex, e, eOpts) {
        e.preventDefault();
        var menuid = node.data.id;
        var menuname = node.data.text;
        Ext.getCmp('parentmenuname').setValue(menuname);
        Ext.getCmp('parentid').setValue(menuid);
        store.getProxy().extraParams.menuid = menuid;
        store.loadPage(1, {
            callback: function (r, options, success) {
                for (var i = 0; i < r.length; i++) {
                    var record = r[i];
                    var menuid_g = record.data.menuid;
                    if (menuid_g == menuid) {
                        grid.getSelectionModel().select(record);
                    }
                }
            }
        });
        menuTree.getSelectionModel().select(node);
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
            header: '菜单名称',
            dataIndex: 'menuname',
            width: 130
        },
        {
            header: '请求路径',
            dataIndex: 'request',
            width: 200
        },
        {
            header: '排序号',
            dataIndex: 'sortno',
            sortable: true,
            width: 50
        },
        {
            header: '上级菜单',
            dataIndex: 'parentmenuname',
            width: 130
        },
        {
            header: '菜单类型',
            dataIndex: 'menutype',
            renderer: MENUTYPERender
        },
        {
            header: '节点类型',
            dataIndex: 'leaf',
            hidden: true,
            renderer: LEAFRender
        },
        {
            header: '节点图标CSS类名',
            dataIndex: 'iconcls',
            width: 120
        },
        {
            header: '节点图标文件名',
            dataIndex: 'icon',
            width: 120
        },
        {
            header: '展开状态',
            dataIndex: 'expanded',
            renderer: EXPANDRender,
            width: 60
        },
        {
            header: '授权状态',
            dataIndex: 'count',
            hidden: true,
            renderer: function (value) {
                if (value == '0')
                    return '未授权';
                else
                    return '已授权';
            }
        },
        {
            header: '菜单编号',
            dataIndex: 'menuid',
            hidden: false,
            width: 130,
            sortable: true
        },
        {
            header: '备注',
            dataIndex: 'remark'
        },
        {
            header: '父节点编号',
            hidden: true,
            dataIndex: 'parentid'
        }
    ];

    /**
     * 数据存储
     */
    var store = Ext.create('Ext.data.Store', {
        model: 'Ext4.Com.Model.MenuItems_Model',
        pageSize: '20',
        proxy: {
            extraParams: {},
            type: 'ajax',
            url: './resource.ered?reqCode=queryMenuItemsForManage',
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
        store.loadPage(1)
    });

    var bbar = new Ext.PagingToolbar({
        store: store,
        pageSize: '20',
        displayInfo: true,
        displayMsg: '显示{0}条到{1}条,共{2}条',
        plugins: [Ext.create('Ext.ux.ProgressBarPager')], // 分页进度条
        emptyMsg: "没有符合条件的记录",
        items: ['-', '&nbsp;&nbsp;', pagesize_combo]
    });

    var grid = new Ext.grid.Panel({
        title: '<span style="font-weight:normal">菜单信息表</span>',
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
                    deleteMenuItems('1');
                }
            },
            '->',
            new Ext.form.TextField({
                id: 'queryParam',
                name: 'queryParam',
                emptyText: '请输入菜单名称',
                enableKeyEvents: true,
                listeners: {
                    specialkey: function (field, e) {
                        if (e.getKey() == Ext.EventObject.ENTER) {
                            queryMenuItem();
                        }
                    }
                },
                width: 130
            }),
            {
                text: '查询',
                iconCls: 'previewIcon',
                handler: function () {
                    queryMenuItem();
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
    store.loadPage(1)
    grid.on('itemdblclick', function (pGrid, record, item, index, e, eOpts) {
        editInit();
    });
    grid.on('sortchange', function () {
        // grid.getSelectionModel().selectFirstRow();
    });

    bbar.on("change", function () {
        // grid.getSelectionModel().selectFirstRow();
    });

    var addMenuWindow, addMenuFormPanel;
    var comboxWithTree;
    var addRoot = {
        text: root_menuname,
        expanded: true,
        id: '01'
    };

    comboxWithTree =
        Ext.create('Ext.ux.TreePicker', {
            id: 'parentmenuname',
            anchor: '99%',
            displayField: 'text',//这个地方也需要注意一下，这个是告诉源码tree用json数据里面的什么字段来显示，我测试出来是只能写'text'才有效果
            fieldLabel: '上级菜单',
            forceSelection: true,// 只能选择下拉框里面的内容
            editable: false,// 不能编辑
            maxHeight: 390,
            allowBlank: false,
            store: new Ext.data.TreeStore({
                preloadChildren: true,
                root: addRoot,
                autoLoad: true,
                proxy: {
                    type: 'ajax', url: './resource.ered?reqCode=queryMenuItems'
                }
            }), listeners: {
                'select': function (picker, record, eOpts) {
                    Ext.getCmp("addMenuFormPanel").getForm().findField('parentid')
                        .setValue(record.data.id);
                }
            }
        })
    var expandedCombo = Ext.create('Ext.form.field.ComboBox', {
        fieldLabel: '节点初始',
        queryMode: 'local',
        valueField: 'value',
        displayField: 'text',
        triggerAction: 'all',
        store: EXPANDStore,
        value: '0',
        name: 'expanded',
        emptyText: '请选择...',
        labelStyle: micolor,
        allowBlank: false,
        forceSelection: true,
        editable: false,
        hiddenName: 'expanded',
        anchor: "99%"
    });

    addMenuFormPanel = new Ext.form.Panel({
        id: 'addMenuFormPanel',
        name: 'addMenuFormPanel',
        defaultType: 'textfield',
        labelAlign: 'right',
        labelWidth: 65,
        frame: false,
        bodyStyle: 'padding:5 5 0',
        items: [
            {
                fieldLabel: '菜单名称',
                name: 'menuname',
                id: 'menuname',
                allowBlank: false,
                labelStyle: micolor,
                anchor: '99%'
            },
            comboxWithTree,
            {
                fieldLabel: '请求地址',
                name: 'request',
                allowBlank: true,
                anchor: '99%'
            },
            expandedCombo,
            {
                fieldLabel: '图标CSS类',
                name: 'iconcls',
                allowBlank: true,
                anchor: '99%'
            },
            {
                fieldLabel: '图标文件',
                name: 'icon',
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
                id: 'menuid',
                name: 'menuid',
                hidden: true
            },
            {
                id: 'parentid_old',
                name: 'parentid_old',
                hidden: true
            },
            {
                id: 'count',
                name: 'count',
                hidden: true
            }
        ]
    });
    addMenuWindow = new Ext.window.Window({
        layout: 'fit',
        width: 420,
        height: 285,
        resizable: false,
        draggable: true,
        closeAction: 'hide',
        title: '<span class="commoncss">新增菜单</span>',
        // iconCls : 'page_addIcon',
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
        items: [addMenuFormPanel],
        buttons: [
            {
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
                        saveMenuItem();
                    else
                        updateMenuItem();
                }
            },
            {
                text: '重置',
                id: 'btnReset',
                iconCls: 'tbar_synchronizeIcon',
                handler: function () {
                    clearForm(addMenuFormPanel.getForm());
                }
            },
            {
                text: '关闭',
                iconCls: 'deleteIcon',
                handler: function () {
                    addMenuWindow.hide();
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
                title: '<span class="commoncss">功能菜单</span>',
                iconCls: 'layout_contentIcon',
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
                items: [menuTree]
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
     * 保存菜单数据
     */
    function saveMenuItem() {
        if (!addMenuFormPanel.form.isValid()) {
            return;
        }
        addMenuFormPanel.form.submit({
            url: './resource.ered?reqCode=saveMenuItem',
            waitTitle: '提示',
            method: 'POST',
            waitMsg: '正在处理数据,请稍候...',
            success: function (form, action) {
                addMenuWindow.hide();
                store.reload();
                refreshNode(Ext.getCmp('parentid').getValue());
                form.reset();
                Ext.MessageBox.alert('提示', action.result.msg);
            },
            failure: function (form, action) {
                var msg = action.result.msg;
                Ext.MessageBox.alert('提示', '菜单数据保存失败:<br>' + msg);
            }
        });
    }

    /**
     * 刷新指定节点
     */
    function refreshNode(nodeid) {
        var treestore = menuTree.getStore();
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
     * 根据条件查询菜单
     */
    function queryMenuItem() {
        store.proxy.extraParams.queryParam = Ext.getCmp('queryParam').getValue()
        store.loadPage(1);
    }

    /**
     * 删除菜单
     */
    function deleteMenuItems(pType) {
        var pMenuid = '';
        var selectNode;
        if (pType == '2') {
            var selectModel = menuTree.getSelectionModel();
            selectNode = selectModel.getSelection()[0];
            pMenuid = selectNode.data.id;
        }


        var rows = grid.getSelectionModel().getSelection();
        var fields = '';
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].get('menutype') == '1') {
                fields = fields + rows[i].get('menuname') + '<br>';
            }
        }
        if (fields != '') {
            Ext.Msg.alert('提示', '<b>您选中的项目中包含如下系统内置的只读项目</b><br>' + fields
            + '<font color=red>只读项目不能删除!</font>');
            return;
        }
        if (Ext.isEmpty(rows)) {
            if (pType == '1') {
                Ext.Msg.alert('提示', '请先选中要删除的项目!');
                return;
            }
        }
        var strChecked = jsArray2JsString(rows, 'menuid');
        Ext.Msg.confirm('请确认', '你真的要删除选中菜单及其包含的所有子菜单吗?', function (btn, text) {
            if (btn == 'yes') {
                if (runMode == '0') {
                    Ext.Msg.alert('提示',
                        '系统正处于演示模式下运行,您的操作被取消!该模式下只能进行查询操作!');
                    return;
                }
                showWaitMsg();
                Ext.Ajax.request({
                    url: './resource.ered?reqCode=deleteMenuItems',
                    success: function (response) {
                        var resultArray = Ext.JSON
                            .decode(response.responseText);
                        store.reload();
                        var treestore = menuTree.getStore();
                        if (pType == '1') {
                            treestore.load()
                        } else {
                            treestore.load()
                        }
                        Ext.Msg.alert('提示', resultArray.msg);
                    },
                    failure: function (response) {
                        var resultArray = Ext.JSON
                            .decode(response.responseText);
                        Ext.Msg.alert('提示', resultArray.msg);
                    },
                    params: {
                        strChecked: strChecked,
                        type: pType,
                        menuid: pMenuid
                    }
                });
            }
        });
    }

    /**
     * 修改菜单初始化
     */
    function editInit() {
        var record = grid.getSelectionModel().getSelection()[0];
        if (Ext.isEmpty(record)) {
            Ext.Msg.alert('提示', '请先选择您要修改的菜单项目');
            return;
        }
        if (record.get('menutype') == '1') {
            Ext.Msg.alert('提示', '您选中的记录为系统内置菜单,不允许修改');
            return;
        }
        if (record.get('leaf') == '0') {
            comboxWithTree.setDisabled(true);
        } else {
            comboxWithTree.setDisabled(false);
        }
        addMenuFormPanel.getForm().loadRecord(record);
        Ext.getCmp('parentmenuname').setRawValue(record.data.parentmenuname);
        Ext.getCmp('parentid').setValue(record.data.parentid);
        addMenuWindow.show();
        addMenuWindow.setTitle('<span style="font-weight:normal">修改菜单</span>');
        Ext.getCmp('windowmode').setValue('edit');
        Ext.getCmp('parentid_old').setValue(record.get('parentid'));
        Ext.getCmp('count').setValue(record.get('count'));
        Ext.getCmp('btnReset').hide();
    }

    /**
     * 新增菜单初始化
     */
    function addInit() {
        Ext.getCmp('btnReset').hide();
        // clearForm(addMenuFormPanel.getForm());
        var flag = Ext.getCmp('windowmode').getValue();
        if (typeof(flag) != 'undefined') {
            addMenuFormPanel.getForm().reset();
        } else {
            clearForm(addMenuFormPanel.getForm());
        }
        var selectModel = menuTree.getSelectionModel();
        var selectNode = selectModel.getSelection();
        if (Ext.isEmpty(selectNode)) {
            Ext.MessageBox.alert('提示', '请选择节点');
            return;
        }
        Ext.getCmp('parentmenuname').setRawValue(selectNode[0].data.text);
        Ext.getCmp('parentid').setValue(selectNode[0].data.id);
        expandedCombo.setValue('0');
        addMenuWindow.show();
        addMenuWindow.setTitle('<span style="font-weight:normal">新增菜单</span>');
        Ext.getCmp('windowmode').setValue('add');
        // Ext.getCmp('btnReset').show();
    }

    /**
     * 修改菜单数据
     */
    function updateMenuItem() {
        if (!addMenuFormPanel.form.isValid()) {
            return;
        }
        var parentid = Ext.getCmp('parentid').getValue();
        var parentid_old = Ext.getCmp('parentid_old').getValue();
        var count = Ext.getCmp('count').getValue();
        if (parentid != parentid_old) {
            if (count != '0') {
                Ext.Msg.confirm('请确认', '此菜单已经做过权限分配,修改上级菜单属性将导致其权限信息丢失,继续保存吗?',
                    function (btn, text) {
                        if (btn == 'yes') {
                            update();
                        } else {
                            return;
                        }
                    });
            } else {
                update();
            }
        } else {
            update();
        }

    }

    /**
     * 更新
     */
    function update() {
        var parentid = Ext.getCmp('parentid').getValue();
        var parentid_old = Ext.getCmp('parentid_old').getValue();
        addMenuFormPanel.form.submit({
            url: './resource.ered?reqCode=updateMenuItem',
            waitTitle: '提示',
            method: 'POST',
            waitMsg: '正在处理数据,请稍候...',
            success: function (form, action) {
                addMenuWindow.hide();
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
                Ext.MessageBox.alert('提示', '菜单数据修改失败:<br>' + msg);
            }
        });
    }
})