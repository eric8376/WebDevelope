/**
 * 角色管理与授权
 *
 * @author XiongChun
 * @since 2010-04-20
 */

Ext.require('Ext4.Com.Model.Roles_Model');
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
                type: 'ajax', url: './role.ered?reqCode=departmentTreeInit'
            }
        }),
        title: '',
        renderTo: 'deptTreeDiv',
        autoScroll: false,
        animate: false,
        useArrows: false,
        border: false
    });

    deptTree.on('cellclick', function (treeview, htmltext, index, node) {
        var deptid = node.data.id;
        store.proxy.extraParams.deptid = deptid;
        store.loadPage(1);
    });

    var contextMenu = new Ext.menu.Menu({
        items: [
            {
                text: '新增角色',
                iconCls: 'page_addIcon',
                handler: function () {
                    addInit();
                }
            },
            {
                text: '刷新节点',
                iconCls: 'page_refreshIcon',
                handler: function () {
                    var selectModel = deptTree.getSelectionModel();
                    var selectNode = selectModel.getSelection();
                    if (selectNode[0].data.leaf) {
                        selectNode[0].parentNode.reload();
                    } else {
                        selectNode[0].reload();
                    }
                }
            }
        ]
    });
    deptTree.on('cellcontextmenu', function (treeview, td, cellIndex, node, tr, rowIndex, e, eOpts) {
        e.preventDefault();
        var deptid = node.data.id;
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
            text: '授权',
            dataIndex: 'roleid',
            renderer: function (value, cellmeta, record) {
                if (login_account == parent.DEFAULT_DEVELOP_ACCOUNT
                    || login_account == parent.DEFAULT_ADMIN_ACCOUNT) {
                    if (record.data['roletype'] == '1') {
                        return '<img src="./resource/image/ext/edit2.png"/>';
                    }
                }
                return '<a href="javascript:void(0);"><img src="./resource/image/ext/edit1.png"/></a>';
            },
            width: 35
        },
        {
            text: '角色名称',
            dataIndex: 'rolename',
            width: 250
        },
        {
            text: '角色类型',
            dataIndex: 'roletype',
            width: 80,
            renderer: ROLETYPERender
        },
        {
            text: '所属部门',
            dataIndex: 'deptname',
            width: 150
        },
        {
            text: '角色状态',
            dataIndex: 'locked',
            width: 60,
            renderer: LOCKEDRender
        },
        {
            text: '角色编号',
            dataIndex: 'roleid',
            hidden: false,
            width: 80,
            sortable: true
        },
        {
            text: '备注',
            dataIndex: 'remark'
        },
        {
            text: '所属部门编号',
            dataIndex: 'deptid',
            hidden: true
        }
    ];

    /**
     * 数据存储
     */
    var store = Ext.create('Ext.data.Store', {
        model: 'Ext4.Com.Model.Roles_Model',
        pageSize: '50',
        proxy: {
            extraParams: {},
            type: 'ajax',
            url: './role.ered?reqCode=queryRolesForManage',
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
        name: 'pagesize',
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
        var number = parseInt(comboBox.getValue());
        store.pageSize = number;
        bbar.pageSize = number;
        store.loadPage(1);

    });

    var bbar = new Ext.PagingToolbar({
        pageSize: '50',
        store: store,
        displayInfo: true,
        displayMsg: '显示{0}条到{1}条,共{2}条',
        plugins: [Ext.create('Ext.ux.ProgressBarPager')], // 分页进度条
        emptyMsg: "没有符合条件的记录",
        items: ['-', '&nbsp;&nbsp;', pagesize_combo]
    })
    var grid = new Ext.grid.Panel({
        title: '<span style="font-weight:normal">角色信息</span>',
        height: 500,
        // width:600,
        autoScroll: true,
        region: 'center',
        store: store,
        loadMask: {
            msg: '正在加载表格数据,请稍等...'
        },
        frame: true,
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
                    deleteRoleItems();
                }
            },
            '->',
            new Ext.form.TextField({
                id: 'queryParam',
                name: 'queryParam',
                emptyText: '请输入角色名称',
                enableKeyEvents: true,
                listeners: {
                    specialkey: function (field, e) {
                        if (e.getKey() == Ext.EventObject.ENTER) {
                            queryRoleItem();
                        }
                    }
                },
                width: 130
            }),
            {
                text: '查询',
                iconCls: 'previewIcon',
                handler: function () {
                    queryRoleItem();
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
    })
    grid.on('itemdblclick', function (pGrid, record, item, index, e, eOpts) {
        editInit();
    });
    grid.on('sortchange', function () {
        // grid.getSelectionModel().selectFirstRow();
    });
    grid.on("cellclick", function (gridpanel, td, cellIndex, record, tr, rowIndex, e, eOpts) {
            if (cellIndex == 0) {
                return;
            }
            var fieldName = grid.columns[cellIndex - 1].dataIndex;
            if (fieldName == 'roleid' && cellIndex == 2) {
                var roleid = record.get(fieldName);
                var deptid = record.get('deptid');
                var roletype = record.get('roletype');
                if (login_account == parent.DEFAULT_DEVELOP_ACCOUNT
                    || login_account == parent.DEFAULT_ADMIN_ACCOUNT) {
                    if (roletype == '1') {
                        Ext.MessageBox.alert('提示',
                            '超级管理员和开发人员不能对业务角色授权<br>'
                            + '业务角色只能被其所属部门或上级部门的管理员授予经办权限');
                        return;
                    }
                }
                roleGrantInit(roleid, deptid, roletype);
            }
        }
    )
    ;
    var addRoot = {
        text: root_deptname,
        expanded: true,
        id: root_deptid
    };
    var comboxWithTree = Ext.create('Ext.ux.TreePicker', {
        id: 'deptname',
        anchor: '100%',
        displayField: 'text',//这个地方也需要注意一下，这个是告诉源码tree用json数据里面的什么字段来显示，我测试出来是只能写'text'才有效果
        fieldLabel: '所属部门',
        emptyText: '请选择...',
        forceSelection: true,// 只能选择下拉框里面的内容
        editable: false,// 不能编辑
        store: new Ext.data.TreeStore({
            preloadChildren: true,
            root: addRoot,
            autoLoad: true,
            proxy: {
                type: 'ajax', url: './role.ered?reqCode=departmentTreeInit'
            }
        }), listeners: {
            'select': function (picker, record, eOpts) {
                Ext.getCmp("addRoleFormPanel").getForm().findField('deptid')
                    .setValue(record.data.id);
            }
        }

    })

    var lockedCombo = Ext.create('Ext.form.field.ComboBox', {
        fieldLabel: '角色状态',
        queryMode: 'local',
        valueField: 'value',
        displayField: 'text',
        triggerAction: 'all',
        store: LOCKEDStore,
        value: '0',
        name: 'locked',
        emptyText: '请选择...',
        labelStyle: micolor,
        allowBlank: false,
        readOnly: true,
        forceSelection: true,
        editable: false,
        anchor: "99%"
    });

    var roletypeCombo = Ext.create('Ext.form.field.ComboBox', {
        fieldLabel: '角色类型',
        queryMode: 'local',
        valueField: 'value',
        displayField: 'text',
        triggerAction: 'all',
        store: ROLETYPEStore,
        value: '1',
        name: 'roletype',
        emptyText: '请选择...',
        labelStyle: micolor,
        allowBlank: false,
        readOnly: true,
        forceSelection: true,
        editable: false,
        anchor: "99%"
    });
    var addRoleFormPanel = new Ext.form.Panel({
        id: 'addRoleFormPanel',
        name: 'addRoleFormPanel',
        defaultType: 'textfield',
        fieldDefaults: {
            labelWidth: 58,
            labelAlign: 'right'
        },
        frame: false,
        bodyStyle: 'padding:5 5 0',
        items: [
            {
                fieldLabel: '角色名称',
                name: 'rolename',
                id: 'rolename',
                allowBlank: false,
                labelStyle: micolor,
                anchor: '99%'
            },
            comboxWithTree,
            roletypeCombo,
            lockedCombo,
            {
                fieldLabel: '备注',
                name: 'remark',
                allowBlank: true,
                anchor: '99%'
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
                id: 'deptid_old',
                name: 'deptid_old',
                hidden: true
            },
            {
                id: 'roleid',
                name: 'roleid',
                hidden: true
            }
        ]
    });

    var addRoleWindow = new Ext.window.Window({
        layout: 'fit',
        width: 400,
        height: 205,
        resizable: false,
        draggable: true,
        closable: true,
        modal: true,
        closeAction: 'hide',
        title: '<span class="commoncss">新增角色</span>',
        // iconCls : 'page_addIcon',
        collapsible: true,
        titleCollapse: true,
        maximizable: false,
        buttonAlign: 'right',
        fbar: [{
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
                    saveRoleItem();
                else
                    updateRoleItem();
            }
        },
            {
                text: '重置',
                id: 'btnReset',
                iconCls: 'tbar_synchronizeIcon',
                handler: function () {
                    clearForm(addRoleFormPanel.getForm());
                }
            },
            {
                text: '关闭',
                iconCls: 'deleteIcon',
                handler: function () {
                    addRoleWindow.hide();
                }
            }],
        border: false,
        animCollapse: true,
        pageY: 20,
        pageX: document.body.clientWidth / 2 - 420 / 2,
        animateTarget: Ext.getBody(),
        constrain: true,
        items: [addRoleFormPanel]
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
                            var treestore = deptTree.getStore();
                            treestore.load({node: treestore.getRootNode()});
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
     * 根据条件查询角色
     */
    function queryRoleItem() {
        var deptid = '';
        var selectModel = deptTree.getSelectionModel();
        if (!Ext.isEmpty(selectModel.getSelection())) {
            var selectNode = selectModel.getSelection()[0];
            deptid = selectNode.id;
        }
        store.proxy.extraParams.queryParam = Ext.getCmp('queryParam').getValue()
        store.loadPage(1);

    }

    /**
     * 新增角色初始化
     */
    function addInit() {
        Ext.getCmp('btnReset').hide();
        if (login_account == parent.DEFAULT_DEVELOP_ACCOUNT) {
            roletypeCombo.setReadOnly(false);
        }
        if (login_account == parent.DEFAULT_ADMIN_ACCOUNT) {
            roletypeCombo.setReadOnly(false);
        }
        // clearForm(addRoleFormPanel.getForm());
        var flag = Ext.getCmp('windowmode').getValue();
        if (typeof(flag) != 'undefined') {
            addRoleFormPanel.getForm().reset();
        } else {
            clearForm(addRoleFormPanel.getForm());
        }
        var selectModel = deptTree.getSelectionModel();
        var selectNode = selectModel.getSelection()[0];
        if (Ext.isEmpty(selectNode)) {
            selectNode = deptTree.getRootNode();
        }
        Ext.getCmp('deptname').setRawValue(selectNode.data.text);
        Ext.getCmp('deptid').setValue(selectNode.data.id);
        addRoleWindow.show();
        addRoleWindow.setTitle('<span class="commoncss">新增角色</span>');
        Ext.getCmp('windowmode').setValue('add');
        comboxWithTree.setDisabled(false);
        lockedCombo.setValue('0');
        roletypeCombo.setValue('1');
        // Ext.getCmp('btnReset').show();
    }

    /**
     * 保存角色数据
     */
    function saveRoleItem() {
        if (!addRoleFormPanel.form.isValid()) {
            return;
        }
        addRoleFormPanel.form.submit({
            url: './role.ered?reqCode=saveRoleItem',
            waitTitle: '提示',
            method: 'POST',
            waitMsg: '正在处理数据,请稍候...',
            success: function (form, action) {
                addRoleWindow.hide();
                deptid = Ext.getCmp('deptid').getValue();
                store.reload();
                form.reset();
                Ext.MessageBox.alert('提示', action.result.msg);
            },
            failure: function (form, action) {
                var msg = action.result.msg;
                Ext.MessageBox.alert('提示', '角色数据保存失败:<br>' + msg);
            }
        });
    }

    /**
     * 删除角色
     */
    function deleteRoleItems() {
        var rows = grid.getSelectionModel().getSelection();
        var fields = '';
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].get('roletype') == '3') {
                fields = fields + rows[i].get('rolename') + '<br>';
            }
        }
        if (fields != '') {
            Ext.Msg.alert('提示', '<b>您选中的项目中包含如下系统内置的只读项目</b><br>' + fields
            + '<font color=red>系统内置角色不能删除!</font>');
            return;
        }
        if (Ext.isEmpty(rows)) {
            Ext.Msg.alert('提示', '请先选中要删除的项目!');
            return;
        }
        var strChecked = jsArray2JsString(rows, 'roleid');
        Ext.Msg
            .confirm(
            '请确认',
            '<span style="color:red"><b>提示:</b>删除角色将同时删除和角色相关的权限信息,请慎重.</span><br>继续删除吗?',
            function (btn, text) {
                if (btn == 'yes') {
                    if (runMode == '0') {
                        Ext.Msg
                            .alert('提示',
                            '系统正处于演示模式下运行,您的操作被取消!该模式下只能进行查询操作!');
                        return;
                    }
                    showWaitMsg();
                    Ext.Ajax.request({
                        url: './role.ered?reqCode=deleteRoleItems',
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
            });
    }

    /**
     * 修改角色初始化
     */
    function editInit() {
        var record = grid.getSelectionModel().getSelection()[0];
        if (Ext.isEmpty(record)) {
            Ext.MessageBox.alert('提示', '请先选择要修改的角色!');
            return;
        }
        if (record.get('roletype') == '3') {
            Ext.MessageBox.alert('提示', '系统内置角色,不能修改!');
            return;
        }
        addRoleFormPanel.getForm().loadRecord(record);
        Ext.getCmp('deptname').setRawValue(record.data.deptname);
        Ext.getCmp('deptid').setValue(record.data.deptid);
        addRoleWindow.show();
        addRoleWindow.setTitle('<span class="commoncss">修改角色</span>');
        Ext.getCmp('windowmode').setValue('edit');
        Ext.getCmp('deptid_old').setValue(record.get('deptid'));
        Ext.getCmp('roleid').setValue(record.get('roleid'));
        Ext.getCmp('btnReset').hide();

    }

    /**
     * 修改角色数据
     */
    function updateRoleItem() {
        if (!addRoleFormPanel.form.isValid()) {
            return;
        }
        var deptid = Ext.getCmp('deptid').getValue();
        var deptid_old = Ext.getCmp('deptid_old').getValue();
        if (deptid != deptid_old) {
            Ext.Msg.confirm('确认', '修改所属部门将导致角色-人员映射关系丢失! 继续保存吗?', function (btn, text) {
                if (btn == 'yes') {
                    update();
                } else {
                    return;
                }
            });
            return;
        } else {
            update();
        }
    }

    /**
     * 更新
     */
    function update() {
        addRoleFormPanel.form.submit({
            url: './role.ered?reqCode=updateRoleItem',
            waitTitle: '提示',
            method: 'POST',
            waitMsg: '正在处理数据,请稍候...',
            success: function (form, action) {
                addRoleWindow.hide();
                store.reload();
                form.reset();
                Ext.MessageBox.alert('提示', action.result.msg);
            },
            failure: function (form, action) {
                var msg = action.result.msg;
                Ext.MessageBox.alert('提示', '角色数据修改失败:<br>' + msg);
            }
        });
    }

    /**
     * 角色授权窗口初始化
     */
    function roleGrantInit(roleid, deptid, roletype) {
        var operatorTab = new Ext.panel.Panel({
            title: '<img src="./resource/image/ext/config.png" align="top" class="IEPNG"> 经办权限授权',
            // iconCls: 'user_femaleIcon',
            loader: {
                url: './role.ered?reqCode=operatorTabInit',
                params: {
                    roleid: roleid,
                    deptid: deptid,
                    roletype: roletype
                },
                scripts: true
            }, listeners: {
                'beforerender': function () {
                    var loader = this.getLoader();
                    if (loader) {
                        loader.load();
                    }
                }
            }
        });

        var selectUserTab = new Ext.panel.Panel({
            title: '<img src="./resource/image/ext/group.png" align="top" class="IEPNG"> 选择人员',
            // iconCls:'chart_organisationIcon',
            loader: {
                url: './role.ered?reqCode=selectUserTabInit',
                params: {
                    roleid: roleid,
                    deptid: deptid,
                    roletype: roletype
                },
                scripts: true
            }, listeners: {
                'beforerender': function () {
                    var loader = this.getLoader();
                    if (loader) {
                        loader.load();
                    }
                }
            }
        });

        var managerTab = new Ext.panel.Panel({
            title: '<img src="./resource/image/ext/wrench.png" align="top" class="IEPNG"> 授权权限授权',
            // iconCls: 'status_onlineIcon',
            loader: {
                url: './role.ered?reqCode=managerTabInit',
                params: {
                    roleid: roleid,
                    deptid: deptid,
                    roletype: roletype
                },
                scripts: true
            }, listeners: {
                'beforerender': function () {
                    var loader = this.getLoader();
                    if (loader) {
                        loader.load();
                    }
                }
            }
        });

        var roleGrantTabPanel = Ext.create('Ext.tab.Panel', {
            activeTab: 0,
            width: 600,
            height: 250,
            plain: true,// True表示为不渲染tab候选栏上背景容器图片
            defaults: {
                autoScroll: true
            }
        });
        roleGrantTabPanel.add(operatorTab);
        if (login_account == parent.DEFAULT_DEVELOP_ACCOUNT) {
            roleGrantTabPanel.add(managerTab);
        }
        if (login_account == parent.DEFAULT_ADMIN_ACCOUNT) {
            roleGrantTabPanel.add(managerTab);
        }
        roleGrantTabPanel.add(selectUserTab);
        var roleGrantWindow = new Ext.window.Window({
            layout: 'fit',
            width: 400,
            height: document.body.clientHeight,
            resizable: true,
            draggable: true,
            closeAction: 'destroy',
            closable: true,
            title: '<span class="commoncss">角色授权</span>',
            // iconCls : 'award_star_silver_3Icon',
            modal: true,
            pageY: 15,
            pageX: document.body.clientWidth / 2 - 420 / 2,
            collapsible: true,
            titleCollapse: true,
            maximizable: false,
            buttonAlign: 'right',
            // animateTarget: document.body,
            // //如果使用autoLoad,建议不要使用动画效果
            fbar: [{
                text: '关闭',
                iconCls: 'deleteIcon',
                handler: function () {
                    roleGrantWindow.close();
                }
            }],
            constrain: true,
            items: [roleGrantTabPanel]
        });
        roleGrantWindow.show();
        if (roletype == '2') {
            // operatorTab.disable();
        } else if (roletype == '1') {
            managerTab.disable();
        }
    }

});