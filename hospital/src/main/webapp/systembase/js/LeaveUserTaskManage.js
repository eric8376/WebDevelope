/**
 * Created by Administrator on 2014年2月24日.
 */
new Ext.Viewport({
    layout: 'fit',
    items: [
        new Ext.CommonGridPanel({
            border: false,
            region: 'center',
            curnode: null,
            title: '离职人员列表',
            DataStore: new Ext.data.Store({
                autoLoad: true,
                proxy: new Ext.data.HttpProxy({
                    url: 'SystemBaseAction.ered?reqCode=getAllLeaveUsers'
                }),
                reader: new Ext.data.JsonReader({
                    totalProperty: 'TOTALCOUNT',
                    root: 'ROOT'
                }, [
                    {
                        name: 'leavelUsersid' // 数据索引:和store模型对应
                    },
                    {
                        name: 'leaveltime' // 数据索引:和store模型对应
                    },
                    {
                        name: 'leaveluser' // 数据索引:和store模型对应
                    },
                    {
                        name: 'agentuser'
                    }
                ])
            }),
            DataCM: [new Ext.grid.RowNumberer({
                header: '序号',
                width: 32
            }), {
                header: '离职人员', // 列标题resizable:false,
                menuDisabled: true,
                sortable: true,
                dataIndex: 'leaveluser' // 数据索引:和Store模型对应
            }, {
                header: '代理人员',
                menuDisabled: true,
                sortable: true,
                dataIndex: 'agentuser'
            }, {
                header: '离职时间',
                menuDisabled: true,
                sortable: true,
                dataIndex: 'leaveltime'
            }
            ],
            createFlag: true,
            createTitle: '新增离职人员',
            createUrl: 'SystemBaseAction.ered?reqCode=saveLeaveUserTask',
            searchFlag: true,
            searchFieldEmptyText: '请输入员工名称',
            beforeCreateMethod: function (rec, backfun) {
                var me = this;
                delete me.params.leavel_user_account;
                delete me.params.agent_user_account;
                this.CU_FormPanel.getForm().findField('designer').setValue(false);
                this.CU_FormPanel.getForm().findField('customer').setValue(false);
                backfun(true);
            },


            CU_Window_Width: 350,
            CU_Window_Height: 180,
            formPanelVerify: true,
            paging: true,
            CU_FormPanel: new Ext.form.FormPanel({
                labelWidth: 90, labelAlign: 'right', items: [
                    {
                        layout: 'table',
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
                                        fieldLabel: '离职人员',
                                        name: 'leavel_username',
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
                                    var show = this.ownerCt.items.items[0].items.items[0];
                                    var send = this.ownerCt.ownerCt.items.items[2];
                                    var us = new UserSelect();
                                    us.makePanelForWindow({title: "离职人员选择", foraccountCmp: send, forusernameCmp: show});
                                }

                            },
                            {
                                layout: 'form',
                                border: false,
                                labelWidth: 90,
                                items: [
                                    {
                                        fieldLabel: '代理人员',
                                        name: 'agent_username',
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
                                    var show = this.ownerCt.items.items[2].items.items[0];
                                    var send = this.ownerCt.ownerCt.items.items[3];
                                    var us = new UserSelect();
                                    us.makePanelForWindow({title: "代理人员选择", foraccountCmp: send, forusernameCmp: show});
                                }

                            }
                        ]
                    },
                    {
                        border: false, bodyStyle: 'padding:3 40', items: [{
                        xtype: 'fieldset',
                        title: '用户类型',
                        height: 45,
                        layout: 'column',
                        items: [
                            {
                                layout: 'form', labelWidth: 35, border: false, columnWidth: 0.3, items: [
                                {xtype: 'checkbox', fieldLabel: '客服', name: 'customer'}
                            ]
                            },
                            {
                                layout: 'form', labelWidth: 45, border: false, columnWidth: 0.3, items: [
                                {xtype: 'checkbox', fieldLabel: '设计师', name: 'designer'}
                            ]
                            }
                            ,
                            {layout: 'form', border: false, columnWidth: 0.4}
                        ]

                    }]
                    },
                    {xtype: 'textfield', allowBlank: false, hidden: true, name: 'leaveluser'},
                    {xtype: 'textfield', allowBlank: false, hidden: true, name: 'agentuser'}
                ]
            })

        })
    ]
})