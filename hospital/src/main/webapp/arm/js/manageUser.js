/**
 * 用户管理与授权
 *
 * @author XiongChun
 * @since 2010-04-20
 */
Ext.require('Ext4.Com.Model.Users_Model');
Ext.require('Ext4.Com.Model.none_Model');
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
                type: 'ajax', url: './user.ered?reqCode=departmentTreeInit'
            }
        }),

        title: '',
        applyTo: 'deptTreeDiv',
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
                text: '新增人员',
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
            dataIndex: 'userid',
            renderer: function (value, cellmeta, record) {
                if (login_account == parent.DEFAULT_DEVELOP_ACCOUNT
                    || login_account == parent.DEFAULT_ADMIN_ACCOUNT) {
                    if (record.data['usertype'] == '1') {
                        return '<img src="./resource/image/ext/edit2.png"/>';
                    }
                }
                return '<a href="javascript:void(0);"><img src="./resource/image/ext/edit1.png"/></a>';
            },
            width: 35
        },
        {
            text: '姓名',
            dataIndex: 'username',
            width: 80
        },
        {
            text: '登录帐户',
            dataIndex: 'account',
            width: 130
        },
        {
            text: '人员类型',
            dataIndex: 'usertype',
            width: 80,
            renderer: USERTYPERender
        },
        {
            text: '所属部门',
            dataIndex: 'deptname',
            width: 130
        },
        {
            text: '性别',
            dataIndex: 'sex',
            width: 60,
            renderer: SEXRender
        },
        {
            text: '人员状态',
            dataIndex: 'locked',
            width: 60,
            renderer: LOCKEDRender
        },
        {
            text: '人员编号',
            dataIndex: 'userid',
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
        model: 'Ext4.Com.Model.Users_Model',
        pageSize: '50',
        proxy: {
            extraParams: {},
            type: 'ajax',
            url: './user.ered?reqCode=queryUsersForManage',
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
        title: '<span class="commoncss">人员信息表</span>',
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
                    deleteUserItems();
                }
            },
            '->',
            new Ext.form.TextField({
                id: 'queryParam',
                name: 'queryParam',
                emptyText: '请输入人员名称',
                enableKeyEvents: true,
                listeners: {
                    specialkey: function (field, e) {
                        if (e.getKey() == Ext.EventObject.ENTER) {
                            queryUserItem();
                        }
                    }
                },
                width: 130
            }),
            {
                text: '查询',
                iconCls: 'previewIcon',
                handler: function () {
                    queryUserItem();
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
    grid.on("cellclick", function (gridpanel, td, columnIndex, record, tr, rowIndex, e, eOpts) {
        if (columnIndex == 0) {
            return;
        }
        var fieldName = grid.columns[columnIndex - 1].dataIndex;
        if (fieldName == 'userid' && columnIndex == 2) {
            var userid = record.get('userid');
            var deptid = record.get('deptid');
            var usertype = record.get('usertype');
            if (login_account == parent.DEFAULT_DEVELOP_ACCOUNT
                || login_account == parent.DEFAULT_ADMIN_ACCOUNT) {
                if (usertype == '1') {
                    Ext.MessageBox.alert('提示',
                        '超级管理员和开发人员不能对业务经办员授权<br>'
                        + '业务经办员只能被其所属部门或上级部门的管理员授予权限');
                    return;
                }
            }
            userGrantInit(userid, deptid, usertype);
        }
    });

    bbar.on("change", function () {
        // grid.getSelectionModel().selectFirstRow();
    });
    var comboxWithTree;
    var addRoot = {
        text: root_deptname,
        expanded: true,
        id: root_deptid
    };
    comboxWithTree =
        Ext.create('Ext.ux.TreePicker', {
            id: 'deptname',
            anchor: '99%',
            displayField: 'text',//这个地方也需要注意一下，这个是告诉源码tree用json数据里面的什么字段来显示，我测试出来是只能写'text'才有效果
            fieldLabel: '所属部门',
//            labelStyle: micolor,
//            emptyText: '请选择...',
            forceSelection: true,// 只能选择下拉框里面的内容
            editable: false,// 不能编辑
            maxHeight: 390,
            allowBlank: false,
            store: new Ext.data.TreeStore({
                preloadChildren: true,
                root: addRoot,
                autoLoad: true,
                proxy: {
                    type: 'ajax', url: './user.ered?reqCode=departmentTreeInit'
                }
            }), listeners: {
                'select': function (picker, record, eOpts) {
                    Ext.getCmp("addUserFormPanel").getForm().findField('deptid')
                        .setValue(record.data.id);
                }
            }
        })


    var sexCombo = new Ext.form.field.ComboBox({
        name: 'sex',
        hiddenName: 'sex',
        store: SEXStore,
        queryMode: 'local',
        triggerAction: 'all',
        valueField: 'value',
        displayField: 'text',
        value: '0',
        fieldLabel: '性别',
        emptyText: '请选择...',
        labelStyle: micolor,
        allowBlank: false,
        forceSelection: true,
        editable: false,
        anchor: "99%"
    });

    var usertypeCombo = new Ext.form.field.ComboBox({
        name: 'usertype',
        hiddenName: 'usertype',
        store: USERTYPEStore,
        queryMode: 'local',
        triggerAction: 'all',
        valueField: 'value',
        displayField: 'text',
        value: '1',
        fieldLabel: '人员类型',
        emptyText: '请选择...',
        allowBlank: false,
        labelStyle: micolor,
        forceSelection: true,
        editable: false,
        readOnly: true,
        anchor: "99%"
    });

    var lockedCombo = new Ext.form.field.ComboBox({
        name: 'locked',
        hiddenName: 'locked',
        store: LOCKEDStore,
        queryMode: 'local',
        triggerAction: 'all',
        valueField: 'value',
        displayField: 'text',
        value: '0',
        fieldLabel: '人员状态',
        emptyText: '请选择...',
        allowBlank: false,
        labelStyle: micolor,
        forceSelection: true,
        editable: false,
        anchor: "99%"
    });

    var addUserFormPanel = new Ext.form.Panel({
        id: 'addUserFormPanel',
        name: 'addUserFormPanel',
        defaultType: 'textfield',
        labelAlign: 'right',
        labelWidth: 65,
        frame: false,
        bodyStyle: 'padding:5 5 0',
        items: [
            {
                fieldLabel: '人员名称',
                name: 'username',
                id: 'username',
                allowBlank: false,
                labelStyle: micolor,
                anchor: '99%'
            },
            comboxWithTree,
            {
                fieldLabel: '登录帐户',
                name: 'account',
                id: 'account',
                labelStyle: micolor,
                allowBlank: false,
                anchor: '99%'
            },
            {
                fieldLabel: '密码',
                name: 'password',
                id: 'password',
                labelStyle: micolor,
                inputType: 'password',
                allowBlank: false,
                listeners: {
                    focus: function () {
                        this.setValue('')
                    }
                },
                anchor: '99%'
            },
            {
                fieldLabel: '确认密码',
                name: 'password1',
                id: 'password1',
                inputType: 'password',
                labelStyle: micolor,
                allowBlank: false,
                listeners: {
                    focus: function () {
                        this.setValue('')
                    }
                },
                anchor: '99%'
            },
            usertypeCombo,
            lockedCombo,
            sexCombo,
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
                id: 'userid',
                name: 'userid',
                hidden: true
            },
            {
                id: 'updatemode',
                name: 'updatemode',
                hidden: true
            }
        ]
    });

    var addUserWindow = new Ext.window.Window({
        layout: 'fit',
        width: 400,
        height: 315,
        resizable: false,
        draggable: true,
        closeAction: 'hide',
        modal: true,
        title: '<span class="commoncss">新增人员</span>',
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
        items: [addUserFormPanel],
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
                        saveUserItem();
                    else
                        updateUserItem();
                }
            },
            {
                text: '重置',
                id: 'btnReset',
                iconCls: 'tbar_synchronizeIcon',
                handler: function () {
                    clearForm(addUserFormPanel.getForm());
                }
            },
            {
                text: '关闭',
                iconCls: 'deleteIcon',
                handler: function () {
                    addUserWindow.hide();
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
     * 根据条件查询人员
     */
    function queryUserItem() {
        var deptid = '';
        var selectModel = deptTree.getSelectionModel();
        if (!Ext.isEmpty(selectModel.getSelection())) {
            var selectNode = selectModel.getSelection()[0];
            deptid = selectNode.data.id;
        }
        store.proxy.extraParams.queryParam = Ext.getCmp('queryParam').getValue();
        store.proxy.extraParams.deptid = deptid;
        store.loadPage(1);
    }

    /**
     * 新增人员初始化
     */
    function addInit() {
        Ext.getCmp('btnReset').hide();
        if (login_account == parent.DEFAULT_DEVELOP_ACCOUNT) {
            usertypeCombo.setReadOnly(false);
        }
        if (login_account == parent.DEFAULT_ADMIN_ACCOUNT) {
            usertypeCombo.setReadOnly(false);
        }
        // clearForm(addUserFormPanel.getForm());
        var flag = Ext.getCmp('windowmode').getValue();
        if (typeof(flag) != 'undefined') {
            // addUserFormPanel.getForm().reset();
        } else {
            clearForm(addUserFormPanel.getForm());
        }
        var selectModel = deptTree.getSelectionModel();
        var selectNode = selectModel.getSelection()[0];
        if (Ext.isEmpty(selectNode)) {
            selectNode = deptTree.getRootNode();
        }
        Ext.getCmp('deptname').setRawValue(selectNode.data.text);
        Ext.getCmp('deptid').setValue(selectNode.data.id);
        addUserWindow.show();
        addUserWindow.setTitle('<span class="commoncss">新增人员</span>');
        Ext.getCmp('windowmode').setValue('add');
        comboxWithTree.setDisabled(false);
        // Ext.getCmp('btnReset').show();
        lockedCombo.setValue('0');
        usertypeCombo.setValue('1');
        sexCombo.setValue('0');
    }

    /**
     * 保存人员数据
     */
    function saveUserItem() {
        if (!addUserFormPanel.form.isValid()) {
            return;
        }
        var password1 = Ext.getCmp('password1').getValue();
        var password = Ext.getCmp('password').getValue();
        if (password1 != password) {
            Ext.Msg.alert('提示', '两次输入的密码不匹配,请重新输入!');
            Ext.getCmp('password').setValue('');
            Ext.getCmp('password1').setValue('');
            return;
        }
        addUserFormPanel.form.submit({
            url: './user.ered?reqCode=saveUserItem',
            waitTitle: '提示',
            method: 'POST',
            waitMsg: '正在处理数据,请稍候...',
            success: function (form, action) {
                addUserWindow.hide();
                store.reload();
                form.reset();
                Ext.MessageBox.alert('提示', action.result.msg);
            },
            failure: function (form, action) {
                var msg = action.result.msg;
                Ext.MessageBox.alert('提示', '人员数据保存失败:<br>' + msg);
            }
        });
    }

    /**
     * 删除人员
     */
    function deleteUserItems() {
        var rows = grid.getSelectionModel().getSelection();
        var fields = '';
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].get('usertype') == '3') {
                fields = fields + rows[i].get('username') + '<br>';
            }
        }
        if (fields != '') {
            Ext.Msg.alert('提示', '<b>您选中的项目中包含如下系统内置的只读项目</b><br>' + fields
            + '<font color=red>系统内置人员不能删除!</font>');
            return;
        }
        if (Ext.isEmpty(rows)) {
            Ext.Msg.alert('提示', '请先选中要删除的项目!');
            return;
        }
        var strChecked = jsArray2JsString(rows, 'userid');
        Ext.Msg
            .confirm(
            '请确认',
            '<span style="color:red"><b>提示:</b>删除人员将同时删除和人员相关的权限信息,请慎重.</span><br>继续删除吗?',
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
                        url: './user.ered?reqCode=deleteUserItems',
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
     * 修改人员初始化
     */
    function editInit() {
        var record = grid.getSelectionModel().getSelection()[0];
        if (Ext.isEmpty(record)) {
            Ext.MessageBox.alert('提示', '请先选择要修改的项目!');
            return;
        }
        if (record.get('usertype') == '3') {
            Ext.MessageBox.alert('提示', '系统内置人员,不能修改!');
            return;
        }
        addUserFormPanel.getForm().loadRecord(record);
        Ext.getCmp('deptname').setRawValue(record.data.deptname);
        Ext.getCmp('deptid').setValue(record.data.deptid);
        addUserWindow.show();
        addUserWindow.setTitle('<span class="commoncss">修改人员</span>');
        Ext.getCmp('windowmode').setValue('edit');
        Ext.getCmp('deptid_old').setValue(record.get('deptid'));
        Ext.getCmp('password').setValue('@@@@@@');
        Ext.getCmp('password1').setValue('@@@@@@');
        Ext.getCmp('userid').setValue(record.get('userid'));
        Ext.getCmp('btnReset').hide();
    }

    /**
     * 修改人员数据
     */
    function updateUserItem() {
        if (!addUserFormPanel.form.isValid()) {
            return;
        }
        var password1 = Ext.getCmp('password1').getValue();
        var password = Ext.getCmp('password').getValue();
        if (password == '@@@@@@' && password1 == '@@@@@@') {
            // Ext.getCmp('updatemode').setValue('1');
        } else {
            Ext.getCmp('updatemode').setValue('2');
            if (password1 != password) {
                Ext.Msg.alert('提示', '两次输入的密码不匹配,请重新输入!');
                Ext.getCmp('password').setValue('');
                Ext.getCmp('password1').setValue('');
                return;
            }
        }
        var deptid = Ext.getCmp('deptid').getValue();
        var deptid_old = Ext.getCmp('deptid_old').getValue();
        if (deptid != deptid_old) {
            Ext.Msg.confirm('确认', '修改所属部门将导致人员/角色映射、人员/菜单映射数据丢失! 继续保存吗?',
                function (btn, text) {
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
        addUserFormPanel.form.submit({
            url: './user.ered?reqCode=updateUserItem',
            waitTitle: '提示',
            method: 'POST',
            waitMsg: '正在处理数据,请稍候...',
            success: function (form, action) {
                addUserWindow.hide();
                store.reload();
                form.reset();
                Ext.MessageBox.alert('提示', action.result.msg);
            },
            failure: function (form, action) {
                var msg = action.result.msg;
                Ext.MessageBox.alert('提示', '人员数据修改失败:<br>' + msg);
            }
        });
    }

    /**
     * 人员授权窗口初始化
     */
    function userGrantInit(userid, deptid, usertype) {

        var selectRoleTab = new Ext.panel.Panel({
            title: '<img src="./resource/image/ext/award_star_silver_3.png" align="top" class="IEPNG"> 选择角色',
            // iconCls: 'user_femaleIcon',
            loader: {
                url: './user.ered?reqCode=userGrantInit',
                params: {
                    userid: userid,
                    deptid: deptid,
                    usertype: usertype
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

        var selectMenuTab = new Ext.panel.Panel({
            title: '<img src="./resource/image/ext/config.png" align="top" class="IEPNG"> 选择菜单',
            // iconCls: 'user_femaleIcon',
            loader: {
                url: './user.ered?reqCode=selectMenuInit',
                params: {
                    userid: userid,
                    deptid: deptid,
                    usertype: usertype
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

        var userGrantTabPanel = new Ext.TabPanel({
            activeTab: 0,
            width: 600,
            height: 250,
            border: false,
            plain: true,// True表示为不渲染tab候选栏上背景容器图片
            defaults: {
                autoScroll: true
            },
            items: [selectRoleTab, selectMenuTab]
        });
        var userGrantWindow = new Ext.window.Window({
            layout: 'fit',
            width: 400,
            height: document.body.clientHeight,
            resizable: true,
            draggable: true,
            closeAction: 'destroy',
            title: '<span class="commoncss">人员授权</span>',
            iconCls: 'group_linkIcon',
            modal: true,
            pageY: 15,
            pageX: document.body.clientWidth / 2 - 420 / 2,
            collapsible: true,
            maximizable: false,
            // animateTarget: document.body,
            // //如果使用autoLoad,建议不要使用动画效果
            buttonAlign: 'right',
            constrain: true,
            items: [userGrantTabPanel],
            buttons: [
                {
                    text: '关闭',
                    iconCls: 'deleteIcon',
                    handler: function () {
                        userGrantWindow.close();
                    }
                }
            ]
        });
        userGrantWindow.show();
    }

    /**
     * 刷新指定节点
     */
    function refreshNode(nodeid) {
        var treestore = deptTree.getStore();
        var node = treestore.getNodeById(nodeid);
        if (nodeid == '01') {
            treestore.reload();
            return;
        }

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
});