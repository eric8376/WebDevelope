/**
 *            showcomponent 要用来显示中文的组件
 *            sendcomponent 用来传输到后台进行保存的组件
 *            departID只显示该部门
 *            field:'要获取选中记录的哪个字段的数据。默认为account'
 */
function getUserwindow(showcomponent, sendcomponent, departID, field) {
    Ext.define('ChoiceUsers_Model', {
        extend: 'Ext.data.Model',
        fields: [
            {
                name: 'userid'
            },
            {
                name: 'username'
            },
            {
                name: 'sex'
            },
            {
                name: 'account'
            },
            {
                name: 'locked'
            },
            {
                name: 'deptid'
            },
            {
                name: 'deptname'
            },
            {
                name: 'remark'
            },
            {
                name: 'usertype'
            }
        ]
    });
    //如果未指定部门，就显示公司所有部门
    if (departID == null || departID == '') {
        departID = '001';
    }
    if (field == null || field == '') {
        field = 'account';
    }
    var pagesize_combo = new Ext.form.field.ComboBox({
        name: 'pagesize',
        hiddenName: 'pagesize',
        typeAhead: true,
        triggerAction: 'all',
        lazyRender: true,
        mode: 'local',
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
    /**
     * 获取每页显示条数下拉选择框的选择值
     */
    var number = parseInt(pagesize_combo.getValue());
    var root = {
        text: '人员选择',
        expanded: true,
        id: departID
    };
    var deptTree = new Ext.tree.Panel({
        store: new Ext.data.TreeStore({
            autoLoad: true,
            preloadChildren: true,
            root: root,
            proxy: {
                type: 'ajax', url: './user.ered?reqCode=departmentTreeInit'
            }
        }),
        // width : 400,
        // useArrows : true, // 箭头节点图标
        root: root, // 根节点
        // height : 768,
        autoScroll: true, // 内容溢出时产生滚动条
        animate: true
    });
    deptTree.on('cellclick', function (treeview, htmltext, index, node) {
        var store = Ext.StoreMgr.lookup('userinfo');
        var deptid = node.data.id;
        store.loadPage(1, {
            params: {
                searchkey: '',
                deptid: deptid
            }
        });
    });


    var grid = new Ext4.Com.GridPanel.CommonGridPanel({
        border: false,
        id: 'usergrid',
        region: 'center',
        height: 500,
        // width:600,
        autoScroll: true,
        title: '<span class="commoncss">人员信息表</span>',
        DataStore: Ext.create('Ext.data.Store', {
            storeId: 'userinfo',
            pageSize: '20',
            model: 'ChoiceUsers_Model',
            proxy: {
                type: 'ajax',
                url: './user.ered?reqCode=queryUsersForManage',
                reader: {
                    type: 'json',
                    totalProperty: 'TOTALCOUNT', // 记录总数
                    root: 'ROOT' // Json中的列表数据根节点
                }
            }
        }),
        DataCM: [
            {
                xtype: 'rownumberer',
                text: '序号',
                width: 32
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
        ],
        extendTopBtn: [
            {
                text: '选择人员',
                iconCls: 'page_addIcon',
                handler: function () {
                    var record = grid.getSelectionModel()
                        .getSelection();
                    if (Ext.isEmpty(record)) {
                        Ext.Msg.alert('提示', '请选择人员');
                        return;
                    }
                    showcomponent.setValue(record[0].get('username'));
                    sendcomponent.setValue(record[0].get(field));
                    PintedWindow.close();
                }
            }
        ],
        listeners: {
            'itemdblclick': function (thisgrid, record, item, index, e, eOpts) {
                var record = thisgrid.getSelectionModel()
                    .getSelection();
                if (Ext.isEmpty(record)) {
                    Ext.Msg.alert('提示', '请选择人员');
                    return;
                }
                showcomponent.setValue(record[0].get('username'));
                sendcomponent.setValue(record[0].get(field));
                PintedWindow.close();
            }

        },
        SM: Ext.create('Ext.selection.CheckboxModel', {mode: 'SINGLE'}),
        paging: true,
        searchFlag: true,
        searchFieldEmptyText: '请输入人员名称'
    })

    var PintedWindow = new Ext.window.Window({
        layout: 'border',
        resizable: true,
        draggable: true,
        closable: true,
        modal: true,
        closeAction: 'close',
        title: '<span class="commoncss">人员选择窗口</span>',
        // iconCls : 'page_addIcon',
        collapsible: true,
        titleCollapse: true,
        maximizable: false,
        maximized: true,
        buttonAlign: 'right',
        border: false,
        animCollapse: true,
        pageY: 20,
        pageX: document.body.clientWidth / 2 - 420 / 2,
        animateTarget: Ext.getBody(),
        constrain: true,
        items: [
            {
                title: '<span class="commoncss">功能菜单</span>',
                iconCls: 'layout_contentIcon',
                tools: [
                    {
                        id: 'refresh',
                        handler: function () {
                            deptTree.root.reload()
                        }
                    }
                ],
                collapsible: true,
                width: 210,
                minSize: 160,
                maxSize: 280,
                split: true,
                layout: 'fit',
                region: 'west',
                autoScroll: true,
                items: [deptTree]
            },
            grid
        ],
        buttons: [
            {
                text: "关闭",
                handler: function () {
                    PintedWindow.close();
                }
            }
        ]
    });
    return PintedWindow;
}


