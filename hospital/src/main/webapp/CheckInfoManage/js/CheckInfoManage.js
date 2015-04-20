/**
 *<pre></pre>
 *<br>
 *<pre>所属模块：</pre>
 * @author 黄琦鸿
 *创建于  2014/12/28 19:11.
 */
Ext.require('Ext4.HOS.GridPanel.CheckInfo_Grid');
Ext.onReady(function () {

    var queryPanel = new Ext.form.Panel({
        border: false,
        title: '通用属性面板',
        region: 'north',
        height: 85,
        layout: {
            type: 'vbox', align: 'stretch', pack: 'center'
        },
        defaults: {
            margin: '0 10 2 0',
            border: false

        },
        buttonAlign: 'right',
        items: [
            {
                layout: {type: 'hbox', align: 'middle'},
                defaults: {
                    labelAlign: 'right'

                },
                items: [
                    {
                        border: false,  flex: 1,
                        xtype: 'container',
                        layout: {
                            type: 'column'
                        },
                        items: [
                            {
                                xtype: 'textfield', labelWidth: 65,
                                fieldLabel: '当事人',
                                name: 'litigant_name',
                                readOnly: true,
                                labelAlign: 'right',
                                itemId: 'litigant_name', columnWidth: 1,
                                flex: 1
                            },
                            {
                                xtype: 'button',
                                text: '点击选择',
                                iconCls: 'acceptIcon',
                                handler: function () {
                                    var us = new UserSelect({
                                        findParameter: {start: 0, notShowSelf: true},
                                        deptId:  root_deptid.substr(0, 6),
                                        deptName: Hospitaltname
                                    });
                                    us.makePanelForWindow({
                                        title: "人员选择", foruseridCmpId: queryPanel.down('#litigant').getId(),
                                        forusernameCmpId: queryPanel.down('#litigant_name').getId()
                                    });
                                }
                            }

                        ]
                    },
                    Ext.create('Ext.form.field.ComboBox', {
                        hiddenName: 'deptid',
                        itemId: 'outdept',
                        name: 'deptid', labelAlign: 'right',
                        fieldLabel: '科室',
                        flex: 1,
                        triggerAction: 'all',
                        queryMode: 'local',
                        store: Ext.create('Ext.data.Store', {
                            model: 'Ext4.Com.Model.Depts_Model',
                            autoLoad: true,
                            proxy: {
                                type: 'ajax',
                                url: 'HospitalManageAction.ered?reqCode=queryDeptInfoForList',
                                reader: {
                                    type: 'json'
                                }
                            }
                        }),
                        loadingText: '正在加载数据...',
                        forceSelection: true,
                        displayField: 'deptname', valueField: 'deptid'
                    }),
                    new Ext.form.field.ComboBox({
                        name: 'litigantrole',
                        hiddenName: 'litigantrole',
                        store: LitigantRoleStore, flex: 1,
                        queryMode: 'local', triggerAction: 'all',
                        valueField: 'value',
                        displayField: 'text', labelAlign: 'right',
                        value: '1',
                        fieldLabel: '当事人角色',
                        forceSelection: true
                    }),{
                        xtype: 'hiddenfield',
                        name: 'litigant',
                        itemId: 'litigant'
                    }
                ]
            }
        ],
        buttons: [
            {
                text: '重置',
                iconCls: 'arrow_refreshIcon',
                handler: function () {
                    queryPanel.getForm().reset()
                }
            }/*,

             {
             text: '查询',
             iconCls: 'zoomIcon',
             handler: function () {
             Ext.apply(CheckInfo_Grid.getStore().getProxy().extraParams, queryPanel.getForm().getValues())
             CheckInfo_Grid.getStore().reload()
             }
             }*/

        ]
    });
    //正确性检查
    var zqx_CheckInfo_Grid = new Ext4.HOS.GridPanel.CheckInfo_Grid({
        createFlag: true,
        autoloaddata: false,
        flex: 1,
        check_type: 'CT00101',
        checker_name: checker_name,
        checker: checker,
        deptId: root_deptid.substr(0, 6),
        deptName: Hospitaltname,
        title: '正确性检查',
        queryPanel: queryPanel,
        region: 'center',
        verify_statu: 'VS00101',
//        deptid: root_deptid,
        delFlag: ismanager == 'true' ? true : false,
        updateFlag: ismanager == 'true' ? true : false,
        paging: true,
        extra_Params: {}
    })

    //依从性检查
    var ycx_CheckInfo_Grid = new Ext4.HOS.GridPanel.CheckInfo_Grid({
        createFlag: true,
        autoloaddata: true,
        flex: 1,
        check_type: 'CT00103',
        checker_name: checker_name,
        checker: checker,
        deptId: root_deptid.substr(0, 6),
        deptName: Hospitaltname,
        title: '依从性检查',
        queryPanel: queryPanel,
        region: 'center',
        verify_statu: 'VS00101',
//        deptid: root_deptid,
        delFlag: ismanager == 'true' ? true : false,
        updateFlag: ismanager == 'true' ? true : false,
        paging: true,
        extra_Params: {}
    })
    //知识考核检查
    var zskh_CheckInfo_Grid = new Ext4.HOS.GridPanel.CheckInfo_Grid({
        createFlag: true, flex: 1,
        title: '知识点考核',
        queryPanel: queryPanel,
        autoloaddata: false,
        deptId: root_deptid.substr(0, 6),
        deptName: Hospitaltname,
        verify_statu: 'VS00101',
        check_type: 'CT00102',
        checker_name: checker_name,
        checker: checker,
        region: 'center',
        delFlag: ismanager == 'true' ? true : false,
        updateFlag: ismanager == 'true' ? true : false,
        paging: true,
        extra_Params: {}
    })
    var check_tab_panel = Ext.create('Ext.tab.Panel', {
        region: 'center',
        items: [
            ycx_CheckInfo_Grid,   zqx_CheckInfo_Grid,zskh_CheckInfo_Grid
        ],
        layout: 'fit',
        listeners: {
            'tabchange': function (tabPanel, newCard, oldCard, eOpts) {
                newCard.getStore().reload()
            }

        }

    });
    // 布局模型
    new Ext.Viewport({
        layout: {type: 'border'},
        items: [
            queryPanel, check_tab_panel]
    });

})