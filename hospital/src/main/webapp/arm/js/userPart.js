/**
 * UI组件人员授权
 *
 * @author XiongChun
 * @since 2011-04-20
 */
Ext.require('Ext4.Com.Model.Users_Model');
Ext.require('Ext4.Com.Model.Parts_Model');
Ext.onReady(function () {
    var menuid;
    var userid;

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
                type: 'ajax', url: 'userPart.ered?reqCode=departmentTreeInit'
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

    var columns = [
        {
            xtype: 'rownumberer',
            text: '序号',
            width: 32
        }, {
            text: '授权',
            dataIndex: 'userid',
            renderer: function (value, cellmeta, record) {
                return '<a href="javascript:void(0);"><img src="./resource/image/ext/edit1.png"/></a>';
            },
            width: 35
        }, {
            text: '姓名',
            dataIndex: 'username',
            width: 80
        }, {
            text: '登录帐户',
            dataIndex: 'account',
            width: 130
        }, {
            id: 'deptname',
            text: '所属部门',
            dataIndex: 'deptname',
            width: 130
        }, {
            text: '性别',
            dataIndex: 'sex',
            width: 60,
            renderer: function (value) {
                if (value == '1')
                    return '男';
                else if (value == '2')
                    return '女';
                else if (value == '0')
                    return '未知';
                else
                    return value;
            }
        }, {
            text: '人员状态',
            dataIndex: 'locked',
            width: 60,
            renderer: function (value) {
                if (value == '1')
                    return '锁定';
                else if (value == '0')
                    return '正常';
                else
                    return value;
            }
        }, {
            text: '人员类型',
            dataIndex: 'usertype',
            width: 60,
            renderer: function (value) {
                if (value == '1')
                    return '经办员';
                else if (value == '2')
                    return '管理员';
                else if (value == '3')
                    return '系统人员';
                else if (value == '4')
                    return '项目主页注册用户';
                else
                    return value;
            }
        }, {
            text: '人员编号',
            dataIndex: 'userid',
            hidden: false,
            width: 80,
            sortable: true
        }, {
            text: '备注',
            dataIndex: 'remark'
        }, {
            text: '所属部门编号',
            dataIndex: 'deptid',
            hidden: true
        }];

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
        columns: columns,
        tbar: [new Ext.form.TextField({
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
            width: 150
        }), {
            text: '查询',
            iconCls: 'previewIcon',
            handler: function () {
                queryUserItem();
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
    store.loadPage(1, {
        params: {
            firstload: 'true'
        }
    });

    grid.on("cellclick", function (pGrid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var fieldName = grid.columns[cellIndex].dataIndex;
        if (fieldName == 'userid' && cellIndex == 1) {
            userid = record.get('userid');
            userGrantWindow.show();
            // menuTreePanel.root.select();
        }
    });


    var viewport = new Ext.Viewport({
        layout: 'border',
        items: [{
            title: '<span class="commoncss">组织机构</span>',
            iconCls: 'chart_organisationIcon',
            tools: [{
                id: 'refresh',
                handler: function () {
                    var treestore = deptTree.getStore();
                    treestore.load({node: treestore.getRootNode()});
                }
            }],
            collapsible: true,
            width: 210,
            minSize: 160,
            maxSize: 280,
            split: true,
            region: 'west',
            autoScroll: true,
            // collapseMode:'mini',
            items: [deptTree]
        }, grid]
    });

    /**
     * 根据条件查询人员
     */
    function queryUserItem() {
        var selectModel = deptTree.getSelectionModel();
        var selectNode = selectModel.getSelection()[0];
        if (!Ext.isEmpty(selectNode)) {
            var deptid = selectNode.data.id;
            store.proxy.extraParams.deptid = deptid;
        }
        store.proxy.extraParams.queryParam = Ext.getCmp('queryParam').getValue();
        store.loadPage(1);
    }

    var cm_part = [
        {
            xtype: 'rownumberer',
            text: '序号',
            width: 32
        }, {
            text: '<span style="color:blue">授权</span>',
            dataIndex: 'partauthtype',
            width: 80,
            renderer: PARTAUTHTYPERender,
            editor: {
                xtype: 'combobox',
                queryMode: 'local',
                valueField: 'value',
                displayField: 'text',
                triggerAction: 'all',
                store: PARTAUTHTYPEStore,
                listWidth: 408,
                value: '0',
                name: 'locked',
                emptyText: '请选择...',
                allowBlank: false,
                forceSelection: true,
                editable: false,
                anchor: "99%"
            }
        }, {
            text: '元素Dom标识',
            dataIndex: 'cmpid',
            sortable: true,
            width: 130

        }, {
            text: '元素类型',
            dataIndex: 'cmptype',
            width: 100,
            renderer: CMPTYPERender
        }, {
            text: '托管页面功能菜单',
            dataIndex: 'menuname',
            width: 160
        }, {
            text: '元素编号',
            dataIndex: 'partid',
            hidden: true
        }, {
            text: '元素描述',
            dataIndex: 'remark',
            width: 200
        }, {
            text: '菜单编号',
            dataIndex: 'menuid',
            hidden: true
        }, {
            text: '人员编号',
            dataIndex: 'userid',
            hidden: true
        }, {
            text: '授权编号',
            dataIndex: 'authorizeid',
            hidden: true
        }];

    var store_part = Ext.create('Ext.data.Store', {
        model: 'Ext4.Com.Model.Parts_Model',
        proxy: {
            extraParams: {},
            type: 'ajax',
            url: 'userPart.ered?reqCode=queryParts',
            reader: {
                type: 'json',
                totalProperty: 'TOTALCOUNT', // 记录总数
                root: 'ROOT' // Json中的列表数据根节点
            }
        }
    });

    store_part.on('load', function () {
        if (store_part.getTotalCount() == 0) {
            Ext.getCmp('id_save').setDisabled(true);
        } else {
            Ext.getCmp('id_save').setDisabled(false);
        }

    });

    var grid_part = Ext.create('Ext.grid.Panel', {
        title: '<span class="commoncss">托管UI元素列表</span>',
        height: 500,
        autoScroll: true,
        region: 'center',
        viewConfig: {
            enableTextSelection: true
        },
        store: store_part,
        loadMask: {
            msg: '正在加载表格数据,请稍等...'
        },
        frame: true,
        columns: cm_part,
        plugins: [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ],
        tbar: [{
            text: '保存',
            iconCls: 'acceptIcon',
            id: 'id_save',
            handler: function () {
                if (runMode == '0') {
                    Ext.Msg.alert('提示',
                        '系统正处于演示模式下运行,您的操作被取消!该模式下只能进行查询操作!');
                    return;
                }
                saveData();
            }
        }, '-', {
            text: '刷新',
            iconCls: 'arrow_refreshIcon',
            handler: function () {
                store_part.reload();
            }
        }, '-', '提示:挂起状态=取消授权']
    });
    var dept_root = {
        text: root_menuname,
        expanded: true,
        id: '01'
    };

    var menuTreePanel = new Ext.tree.Panel({
        store: new Ext.data.TreeStore({
            autoLoad: true,
            preloadChildren: true,
            root: dept_root,
            proxy: {
                type: 'ajax', url: 'part.ered?reqCode=queryMenuItems'
            }
        }),
        title: '<span class="commoncss">功能菜单</span>',
        region: 'west',
        autoScroll: false,
        split: true,
        width: 220,
        minSize: 180,
        maxSize: 300,
        animate: false,
        collapsible: true,
        useArrows: false,
        border: false
    });

    menuTreePanel.on('cellclick', function (treeview, htmltext, index, node) {
        if (!node.isLeaf()) {
            return;
        }
        menuid = node.data.id
        store_part.proxy.extraParams.userid = userid;
        store_part.proxy.extraParams.menuid = menuid;
        store_part.loadPage(1);
    });

    var userGrantWindow = new Ext.window.Window({
        layout: 'border',
        width: document.body.clientWidth - 100,
        height: document.body.clientHeight - 50,
        resizable: true,
        draggable: true,
        closeAction: 'hide',
        title: '<span class="commoncss">UI元素角色授权</span>',
        iconCls: 'app_rightIcon',
        modal: true,
        collapsible: true,
        maximizable: true,
        animateTarget: document.body,
        // //如果使用autoLoad,建议不要使用动画效果
        buttonAlign: 'right',
        constrain: true,
        border: false,
        items: [menuTreePanel, grid_part],
        buttons: [{
            text: '关闭',
            iconCls: 'deleteIcon',
            handler: function () {
                userGrantWindow.hide();
            }
        }]
    });

    userGrantWindow.on('show', function () {
        menuTreePanel.getSelectionModel().select(dept_root);
        store_part.removeAll();
        Ext.getCmp('id_save').setDisabled(true);
    });


    function saveData() {
        var m = store_part.getModifiedRecords();
        if (Ext.isEmpty(m)) {
            Ext.MessageBox.alert('提示', '没有数据需要保存!');
            return;
        }
        for (var i = 0; i < m.length; i++) {
            var record = m[i];
            var rowIndex = store.indexOfId(record.data.id);
            if (Ext.isEmpty(record.get('userid'))) {
                record.set('userid', userid);
            }
        }
        var jsonArray = [];
        Ext.each(m, function (item) {
            jsonArray.push(item.getData());
        });

        Ext.Ajax.request({
            url: 'userPart.ered?reqCode=savePartUserGrantDatas',
            success: function (response) {
                var resultArray = Ext.JSON
                    .decode(response.responseText);
                store_part.reload();
                Ext.Msg.alert('提示', resultArray.msg);
            },
            failure: function (response) {
                Ext.MessageBox.alert('提示', '数据保存失败');
            },
            params: {
                dirtydata: Ext.encode(jsonArray)
            }
        });
    }

});