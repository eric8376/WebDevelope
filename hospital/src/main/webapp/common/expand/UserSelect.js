Ext.define('UserSelect_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'userid'},
        {name: 'username'},
        {name: 'deptid'},
        {name: 'account'},
        {name: 'usertype'},
        {name: 'deptname'},
        {name: 'sex'}
    ]
});
function UserSelect(info) {
    this.defaultInfo = {deptId: "001", deptName: '厦门迈微科技发展有限公司', mode: "0"};
    this.findParameter = {start: 0};
    this.store = null;
    this.userGrid = null;
    this.currentPanel = null;
    var info_ = null;
    var item = null;
    //初始化
    this.init = function () {
        this.info = Ext.apply(this.defaultInfo, info);
        if (!Ext.isEmpty(info.findParameter)) {
            this.findParameter = info.findParameter
        }
        item = this;
    };
    //生成面板
    this.makePanel = function () {
        switch (item.info.mode) {
            case "0":
                item.currentPanel = item.makeDefaultPanel();
        }
        item.reload();
        return item.currentPanel;
    };
    //生成面板for win
    this.makePanelForWindow = function (info) {
        var def = {title: "人员选择"};
        info = Ext.apply(def, info);
        info_ = info;
        var userWin = new Ext.window.Window({
            title: info.title,
            width: 850,
            height: 468,
            layout: 'fit',
            resizable: false,
            closeAction: "destroy",
            autoScroll: true,
            plain: true,
            modal: true,
            buttonAlign: 'right',
            defaultType: 'textfield',
            bodyStyle: 'background-color:#FFF',
            items: [item.makePanel()],
            buttons: [
                {
                    text: '确认', handler: function () {
                    item.setUserInfoToCmp(info);
                    userWin.close();
                }
                },
                {
                    text: '取消', handler: function () {
                    userWin.close();
                }
                }
            ]
        });
        info_.winid = userWin.id;
        userWin.show();
    }
    //生成默认面板
    this.makeDefaultPanel = function () {
        var tree = this.getDeptTreePanel();
        var grid = this.getUserGrid();
        var productPanel = new Ext.panel.Panel({
            layout: 'border',
            width: 725,
            border: false,
            height: 400,
            items: [
                {
                    title: "组织机构",
                    region: 'west',
                    layout: 'fit',
                    items: [tree],
                    width: 230,
                    autoScroll: true,
                    border: true
                },
                {title: "人员列表", region: 'center', layout: 'fit', border: true, items: [grid]}
            ]
        });
        return productPanel;
    };
    //获取userGrid
    this.getUserGrid = function () {
        var me = this;
        me.findParameter.deptid = item.info.deptId;
        var cm = [
            {
                xtype: 'rownumberer',
                text: '序号',
                width: 32
            },
            {text: '名称', dataIndex: 'username'},
            {text: '所属部门', dataIndex: 'deptname'},
            {
                text: '性别', dataIndex: 'sex', renderer: function (value) {
                if (value == '0') return '未知';
                if (value == '1') return '男';
                if (value == '2') return '女'; else return value;
            }
            },
            {text: '工号', dataIndex: 'account'}
        ];
        /**
         * 数据存储
         */
        var store = this.getStore();
        // 翻页排序时带上查询条件
        store.on('beforeload', function () {
            Ext.apply(this.proxy.extraParams, me.findParameter);
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
            item.findParameter.pageSize = parseInt(comboBox.getValue());
            bbar.pageSize = parseInt(comboBox.getValue());
            var number = parseInt(comboBox.getValue());
            item.reload();
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
        item.userGrid = new Ext.grid.Panel({
            layout: "fit",
            autoScroll: true,
            //region : 'center',
            store: store,
            loadMask: {
                msg: '正在加载表格数据,请稍等...'
            },
            stripeRows: true,
            border: false,
            frame: false,
            columns: cm,
            //sm : sm,
            tbar: [new Ext.form.TextField({
                id: 'userNameQueryParam',
                name: 'userNameQueryParam',
                emptyText: '请输入人员名称',
                enableKeyEvents: true,
                listeners: {
                    specialkey: function (field, e) {
                        if (e.getKey() == Ext.EventObject.ENTER) {
                            item.reload();
                        }
                    }
                },
                width: 130
            }), {
                text: '查询',
                iconCls: 'previewIcon',
                handler: function () {
                    item.reload();
                }
            }, '-', {
                text: '刷新',
                iconCls: 'arrow_refreshIcon',
                handler: function () {
                    item.reload();
                }
            }],
            bbar: bbar,
            listeners: {
                'itemdblclick': function (pGrid, record, items, index, e, eOpts) {
                    if (Ext.isEmpty(record)) {
                        Ext.MessageBox.alert('提示', '请选择人员');
                        return;
                    }
                    item.setUserInfoToCmp(info_);
                    var userwin = Ext.getCmp(info_.winid)
                    if (userwin) {
                        userwin.hide();
                    }

                }

            }

        });
        return item.userGrid;
    };
    //获取部门树
    this.getDeptTreePanel = function () {
        var root = {text: item.info.deptName, expanded: true, id: item.info.deptId};
        var rdiv = document.getElementById("userselectdepttreediv");
        if (rdiv) {
            rdiv.parentNode.removeChild(rdiv);
            //document.body.remove(rdiv);
        }
        rdiv = document.createElement("div");
        rdiv.id = "userselectdepttreediv";
        rdiv.style.display = "none";
        document.body.appendChild(rdiv);
        var deptTree = new Ext.tree.Panel({
            layout: "fit",
            store: new Ext.data.TreeStore({
                preloadChildren: true,
                root: root,
                proxy: {
                    type: 'ajax', url: './organization.ered?reqCode=departmentTreeInit'
                }
            }),
            title: '',
            autoScroll: false,
            animate: false,
            useArrows: false,
            border: false,
            applyTo: 'userselectdepttreediv',
            listeners: {
                load: function () {
                    rdiv.style.display = "block";
                }
            }
        });
        deptTree.getSelectionModel().select(root);
        deptTree.on('cellclick', function (treeview, htmltext, index, node) {
            var deptid = node.data.id;
            item.findParameter.deptid = deptid;
            item.reload({
                params: item.findParameter
            });
        });
        Ext.Ajax.request({
            url: "./organization.ered?reqCode=getDept",
            method: 'post',
            params: {"deptid": item.info.deptId},
            success: function (response, options) {
                var o = Ext.JSON.decode(response.responseText);
                if (o != []) {
                    root.text = o[0].deptname;
                }
                else {
                    Ext.MessageBox.alert('提示', "获取部门信息失败");
                }
            },
            failure: function (response, options) {
                Ext.MessageBox.alert('提示', Ext.decode(response.responseText).msg);
            }
        });
        return deptTree;
    };
    //获取数据源
    this.getStore = function () {
        this.store = Ext.create('Ext.data.Store', {
            model: 'UserSelect_Model',
            pageSize: '20',
            proxy: {
                type: 'ajax',
                url: './user.ered?reqCode=queryUsers',
                reader: {
                    type: 'json',
                    totalProperty: 'TOTALCOUNT', // 记录总数
                    root: 'ROOT' // Json中的列表数据根节点
                }
            }
        });
        return this.store;
    };
    //重新加载数据源
    this.reload = function () {
        if (this.store) {
            var userNameQueryParam = Ext.getCmp("userNameQueryParam").getValue();
            item.findParameter.username = userNameQueryParam;
            this.store.reload({
                params: item.findParameter
            });
        }
    };
    //设置用户信息至页面控件
    this.setUserInfoToCmp = function (info) {
        var userInfo = item.getSelected();
        if (!userInfo)
            Ext.MessageBox.alert('提示', '未选择人员!');
        if (!info)
            Ext.MessageBox.alert('提示', '无效的赋值对象!');
        if (info.foruseridCmpId) {
            Ext.getCmp(info.foruseridCmpId).setValue(userInfo.userid);
        }
        if (info.forusernameCmpId) {
            Ext.getCmp(info.forusernameCmpId).setValue(userInfo.username);
        }
        if (info.foraccountCmpId) {
            Ext.getCmp(info.foraccountCmpId).setValue(userInfo.account);
        }
        if (info.foruseridCmp) {
            info.foruseridCmp.setValue(userInfo.userid);
        }
        if (info.forusernameCmp) {
            info.forusernameCmp.setValue(userInfo.username);
        }
        if (info.foraccountCmp) {
            info.foraccountCmp.setValue(userInfo.account);
        }
    }
    //获取选中人员
    this.getSelected = function () {
        var record = item.userGrid.getSelectionModel().getSelection()[0];
        if (!record)
            return null;
        return {
            'username': record.get('username'),
            'userid': record.get('userid'),
            'deptname': record.get('deptname'),
            'deptid': record.get('deptid'),
            'account': record.get('account')
        };
    }
    this.init();
}