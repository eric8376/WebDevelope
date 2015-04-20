/**
 * Created by Administrator on 14-1-22.
 */
var grid = new Ext.CommonGridPanel({
    border: false,
    region: 'center',
    curnode: null,
    title: '下属人员',
    DataStore: new Ext.data.Store({
        storeId: 'UserRelationData',
        baseParams: {
            p_user_id: ''
        },
        autoLoad: false,
        proxy: new Ext.data.HttpProxy({
            url: 'SystemBaseAction.ered?reqCode=queryUserRelationData'
        }),
        reader: new Ext.data.JsonReader({
            totalProperty: 'TOTALCOUNT',
            root: 'ROOT'
        }, [
            {
                name: 'relation_id' // 数据索引:和store模型对应
            },
            {
                name: 'user_id' // 数据索引:和store模型对应
            },
            {
                name: 'p_user_id' // 数据索引:和store模型对应
            },
            {
                name: 'username'
            },
            {
                name: 'p_username'
            },
            {
                name: 'notifytype'
            }
        ])
    }),
    DataCM: [new Ext.grid.RowNumberer({
        header: '序号',
        width: 32
    }), {
        header: '人员名称', // 列标题resizable:false,
        menuDisabled: true,
        sortable: true,
        dataIndex: 'username' // 数据索引:和Store模型对应
    }, {
        header: '所属领导名称',
        menuDisabled: true,
        sortable: true,
        dataIndex: 'p_username',
        renderer: function (value, cellmeta, record, rowIndex) {
            if (Ext.isEmpty(value)) {
                return "迈微科技发展有限公司";
            } else {
                return value;
            }

        }
    }, {
        header: '提醒方式',
        menuDisabled: true,
        sortable: true,
        dataIndex: 'notifytype',
        renderer: function (value, cellmeta, record, rowIndex) {
            if (value == 0) {
                return "RTX";
            } else if (value == 1) {
                return "短信"
            } else if (value == 2) {
                return "RTX和短信"
            }
        }
    }
    ],
    createFlag: true,
    delFlag: true,
    updateFlag: true,
    createTitle: '添加下属人员',
    delUrl: 'SystemBaseAction.ered?reqCode=saveOrUpdateOrDelUserRelation',
    createUrl: 'SystemBaseAction.ered?reqCode=saveOrUpdateOrDelUserRelation',
    updateUrl: 'SystemBaseAction.ered?reqCode=saveOrUpdateOrDelUserRelation',
    searchFlag: true,
    searchFieldEmptyText: '请输入员工名称',
    beforeDeleteMethod: function (rec, backfun) {
        Ext.Msg.confirm('请确认', '<span style="color:red">请再次确认删除操作</span><br>',
            function (btn, text) {
                if (btn == 'yes') {
                    backfun(true);
                }
            });
    },
    afterDeleteMethod: function () {
        var me = this;
        me.afterCreateMethod();
    },
    beforeCreateMethod: function (rec, backfun) {
        var me = this;
        delete me.params.RTX;
        delete me.params.PhoneMSG;

        this.CU_FormPanel.getForm().findField('RTX').setValue(true);
        this.CU_FormPanel.getForm().findField('PhoneMSG').setValue(false);
        var checknode = UserRelationTree.getSelectionModel().getSelection()[0];
        if (Ext.isEmpty(checknode) || checknode.data.id == 'root') {
            me.specialData = {p_username: '无'}
            me.params.p_user_id = '';

            Ext.Msg.confirm('请确认', '<span style="color:red">当前未选中任何领导，将添加最高领导人员，请确认操作</span><br>',
                function (btn, text) {
                    if (btn == 'yes') {
                        me.CU_FormPanel.getForm().loadRecord(new Ext.data.Record(me.params));
                        backfun(true);
                    }
                });
        }
        else {
            me.specialData = {p_username: checknode.data.username};
            me.params.p_user_id = checknode.data.user_id
            backfun(true);
        }
    },
    afterCreateMethod: function () {
        var me = this;
        if (me.params) {
            me.params.p_user_id = '';
            delete me.params.RTX;
            delete me.params.PhoneMSG;
        }
        if (Ext.isEmpty(me.curnode)) {
            UserRelationTree.getRootNode().reload()
        } else {
            if (me.curnode.parentNode) {
                me.curnode.parentNode.reload();
            } else {
                me.curnode.reload();
            }
        }


    },
    beforeCreateSubmitMethod: function (params, backfun) {
        if (this.CU_FormPanel.getForm().findField('PhoneMSG').checked == false && this.CU_FormPanel.getForm().findField('RTX').checked == false) {
            Ext.Msg.alert('提示', '请勾选提醒方式');
            backfun(false);
        } else {
            backfun(true)
        }

    },
    beforeUpdateMethod: function (rec, backfun) {
        delete this.params.RTX;
        delete this.params.PhoneMSG;
        if (rec.data.notifytype == 2) {
            this.CU_FormPanel.getForm().findField('PhoneMSG').setValue(true);
            this.CU_FormPanel.getForm().findField('RTX').setValue(true);
        }
        else if (rec.data.notifytype == 0) {
            this.CU_FormPanel.getForm().findField('RTX').setValue(true);
            this.CU_FormPanel.getForm().findField('PhoneMSG').setValue(false);
        } else if (rec.data.notifytype == 1) {
            this.CU_FormPanel.getForm().findField('PhoneMSG').setValue(true);
            this.CU_FormPanel.getForm().findField('RTX').setValue(false);
        }
        backfun(true);
    },
    beforeUpdateSubmitMethod: function (params, backfun) {
        if (this.CU_FormPanel.getForm().findField('PhoneMSG').checked == false && this.CU_FormPanel.getForm().findField('RTX').checked == false) {
            Ext.Msg.alert('提示', '请勾选提醒方式');
            backfun(false);
        } else {
            backfun(true)
        }

    },
    afterUpdateMethod: function () {
        UserRelationTree.getRootNode().reload();
    },
    extendTopBtn: [
        {
            xtype: 'button', text: '内存同步', iconCls: 'arrow_refreshIcon', handler: function () {
            Ext.Ajax.request({
                url: 'SystemBaseAction.ered?reqCode=synMemory',
                success: function (response) {
                    var resultArray = Ext.JSON
                        .decode(response.responseText);
                    Ext.Msg.alert('提示', resultArray.msg);
                },
                failure: function (response) {
                    Ext.Msg.alert('提示', '内存同步失败');
                }
            });
        }
        }
    ],
    CU_Window_Width: 350,
    CU_Window_Height: 180,
    formPanelVerify: true,
    paging: true,
    CU_FormPanel: new Ext.form.FormPanel({
        labelWidth: 90, labelAlign: 'right', items: [
            {xtype: 'textfield', name: 'p_username', fieldLabel: '领导名称', style: 'background:none;border:none;'},
            {
                layout: 'table',
                // columnWidth : .50,
                anchor: '100%',
                border: false,
                layoutConfig: {
                    columns: 2
                },
                items: [
                    {
                        layout: 'form',
                        border: false,
                        labelWidth: 90,
                        items: [
                            {
                                fieldLabel: '下属',
                                name: 'username',
                                allowBlank: false,
                                xtype: 'textfield',
                                readOnly: true,
                                anchor: '100%'
                            }
                        ]
                    },
                    {
                        border: false,
                        xtype: 'button',
                        text: '选择人员',
                        anchor: '100%',
                        iconCls: 'addIcon',
                        handler: function () {
                            var userwindow = getUserwindow(
                                this.ownerCt.items.items[0].items.items[0],
                                this.ownerCt.ownerCt.items.items[3], '', 'userid'
                            );
                            userwindow.show();
                        }

                    }
                ]
            },
            {
                border: false, bodyStyle: 'padding:3 40', items: [{
                xtype: 'fieldset',
                title: '提醒方式',
                height: 45,
                layout: 'column',
                items: [
                    {
                        layout: 'form', labelWidth: 20, border: false, columnWidth: 0.3, items: [
                        {xtype: 'checkbox', fieldLabel: 'RTX', checked: true, name: 'RTX'}
                    ]
                    },
                    {
                        layout: 'form', labelWidth: 35, border: false, columnWidth: 0.3, items: [
                        {xtype: 'checkbox', fieldLabel: '短信', name: 'PhoneMSG'}
                    ]
                    }
                    ,
                    {layout: 'form', border: false, columnWidth: 0.4}
                ]

            }]
            },
            {xtype: 'textfield', allowBlank: false, hidden: true, name: 'user_id'}
        ]
    })

})
var root = new Ext.tree.AsyncTreeNode({
    text: '世纪阳光实业有限公司',
    expanded: true,
    iconCls: 'groupIcon',
    id: 'root'
});
// 定义一个树面板
var UserRelationTree = new Ext.tree.TreePanel({
    loader: new Ext.tree.TreeLoader({
        dataUrl: 'SystemBaseAction.ered?reqCode=queryUserRelationData&curnodeid=',
        listeners: {
            'beforeload': function () {
                if (!Ext.isEmpty(grid.curnode)) {
                    this.dataUrl = 'SystemBaseAction.ered?reqCode=queryUserRelationData&curnodeid=' + grid.curnode.attributes.user_id + ''
                }

            }
        }
    }),
    root: root, // 根节点
    autoScroll: true, // 内容溢出时产生滚动条
    animate: true,
    listeners: {
        'expandnode': function (node) {
            if (!Ext.isEmpty(node.attributes.isselectednode)) {
                node.fireEvent('click', node);
            }

        }

    }
});

UserRelationTree.root.expand();
UserRelationTree.on('click', function (node) {
    var store = Ext.StoreMgr.lookup('UserRelationData');
    if (Ext.isEmpty(store)) {
        Ext.Msg.alert('提示', '页面出错了，亲联系it部解决');
        return;
    }
    var user_id = node.attributes.user_id;
    grid.curnode = node;
    store.baseParams.p_user_id = user_id;
    if (node.attributes.id == 'root') {
        store.baseParams.isroot = true
    } else {
        store.baseParams.isroot = '';
    }
    store.reload();
});

new Ext.Viewport({
    layout: 'border',
    items: [
        {
            title: '<span class="commoncss">功能菜单</span>',
            iconCls: 'layout_contentIcon',
            tbar: [
                {
                    xtype: 'textfield', name: 'username_search', emptyText: '请输入用户名称', listeners: {
                    specialkey: function (field, e) {
                        if (e.getKey() == Ext.EventObject.ENTER) {
                            var username_search = this.getValue();
                            var haschoice = false;

                            UserRelationTree.getRootNode().cascade(function (n) {
                                if (!n.isLeaf() && !n.isLoaded()) {
                                    n.reload();
                                    return true;
                                }
                                if (n.attributes['text'] == username_search) {
                                    n.select();
                                    haschoice = true;
                                    n.fireEvent('click', n)
                                    return false;
                                }
                                return true;
                            });
                            if (!haschoice) {
                                Ext.Msg.alert('提示', '未找到相应人员');
                                return
                            }
                        }
                    }
                }
                },
                {
                    xtype: 'button', text: '定位', iconCls: 'previewIcon', handler: function () {
                    var username_search = this.ownerCt.items.items[0].getValue();
                    var haschoice = false;

                    UserRelationTree.getRootNode().cascade(function (n) {
                        if (!n.isLeaf() && !n.isLoaded()) {
                            n.reload();
                            return true;
                        }
                        if (n.attributes['text'] == username_search) {
                            haschoice = true;
                            n.fireEvent('click', n)
                            return false;
                        }
                        return true;
                    });
                    if (!haschoice) {
                        Ext.Msg.alert('提示', '未找到相应人员');
                        return
                    }

                }
                }
            ],
            tools: [
                {
                    id: 'refresh',
                    handler: function () {
                        UserRelationTree.getRootNode().reload();
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
            items: [UserRelationTree]
        },
        grid
    ]

})