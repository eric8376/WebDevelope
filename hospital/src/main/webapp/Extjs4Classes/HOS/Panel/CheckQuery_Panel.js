/**
 *<pre>CheckQuery_Panel</pre>
 *<br>
 *<pre>所属模块：</pre>
 * @author 黄琦鸿
 *创建于  2014/12/28 18:51.
 */
Ext.define('Ext4.HOS.Panel.CheckQuery_Panel',
    {
        extend: 'Ext.form.Panel',
        requires: ['Ext4.HOS.Model.CourseInfo_Model', 'Ext4.Com.Model.Depts_Model'],
        border: false,
        region: 'north',
        ismanager: false,
        deptId: '001',
        deptName: '厦门迈微科技发展有限公司',
        layout: {
            type: 'vbox', align: 'stretch', pack: 'center'
        },
        defaults: {
            margin: '0 10 2 0',
            border: false
        },
        buttonAlign: 'right',
        //重置按钮是否可用
        enableResetBtn: false,
        //查询按钮是否可用
        enableQueryBtn: false,
        //导出报表按钮是否可用
        enableExportBtn: false,
        //检查类型按钮是否可用
        enableCheckType: true,
        resetFunction: '',
        queryFunction: '',
        excelUrl: 'HospitalManageAction.ered?reqCode=getReportDataForExcel',
        EX_Params: {},
        exportExcelFunction: function (values, hasvalue) {
            var me = this;
            if (hasvalue) {
            me.justExportExcelFun(values)
            } else {
                me.defaultExportExcelFun(values);
            }
        },
        //导出查询结果数据到excel
        justExportExcelFun: function () {

        },
        //默认导出报表格式excel数据
        defaultExportExcelFun: function (values) {
            var me = this;
            var dynamicItem = new Ext.form.Panel({
                autoScroll: true,
                bodyPadding: '5 5 5 5'
            });
            var RTFieldSet = new Ext.form.FieldSet({
                height: 100,
                title: '报表类型',
                layout: {
                    type: 'fit'

                }

            })
            var checkgroup = new Ext.form.CheckboxGroup({
                submitValue: false,
                // Arrange checkboxes into two columns, distributed vertically
                columns: 2
            })
            //循环报表类型，动态添加组建
            RT001Store.each(function (Record) {
                checkgroup.add({
                    boxLabel: Record.data.text,
                    name: 'ReportType',
                    inputValue: Record.data.value
                })
            })
            RTFieldSet.add(checkgroup)
            dynamicItem.add(RTFieldSet)
            //添加分组方式
            dynamicItem.add({
                border: false,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                }, items: [
                    {
                        border: false, flex: 1,
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        }, items: [
                        {
                            xtype: 'checkboxfield',
                            flex: 1,
                            boxLabel: '是否分组',
                            name: 'needGroup',
                            inputValue: 1,
                            listeners: {
                                'change': function (checkbox, newValue, oldValue, eOpts) {
                                    var GroupSummation = dynamicItem.down('#GroupSummation')
                                    var GroupType = dynamicItem.down('#GroupType')
                                    GroupType.setValue('');
                                    GroupSummation.setValue('');
                                    if (newValue == "1") {
                                        GroupType.allowBlank = false
                                        GroupType.show();
                                        GroupSummation.show();
                                    } else {
                                        GroupType.allowBlank = true
                                        GroupType.hide();
                                        GroupSummation.hide();
                                    }

                                }

                            }
                        },
                        {
                            xtype: 'checkboxfield',
                            hidden: true,
                            flex: 1,
                            itemId: 'GroupSummation',
                            boxLabel: '是否分组合计',
                            name: 'GroupSummation',
                            inputValue: 1
                        }

                    ]

                    }
                    ,
                    new Ext.form.field.ComboBox({
                        flex: 1,
                        hidden: true,
                        itemId: 'GroupType',
                        name: 'GroupType', labelWidth: 60,
                        hiddenName: 'GroupType', labelAlign: 'right',
                        store: RGT001Store,
                        queryMode: 'local',
                        triggerAction: 'all',
                        valueField: 'value',
                        displayField: 'text',
                        fieldLabel: '分组方式',
                        forceSelection: true
                    })
                ]

            })

            //是否合并一个文件
            dynamicItem.add({
                xtype: 'checkboxfield',
                anchor: '100%',
                boxLabel: '合并文件',
                name: 'MergeFile'
            })

            new Ext.window.Window({
                modal: true,
                width: 300,
                height: 320,
                center: true,
                resizable: false,
                closeAction: 'destroy',
                layout: {
                    type: 'fit'
                },
                title: '导出设置',
                items: [
                    dynamicItem
                ],
                buttons: [
                    {
                        text: '导出',
                        iconCls: 'window_caise_listIcon',
                        handler: function () {
                            if (dynamicItem.getForm().isValid()) {
                                var panelvalues = dynamicItem.getForm().getValues();
                                var ReportType = panelvalues.ReportType;
                                if (Ext.isEmpty(ReportType)) {
                                    Ext.Msg.show({
                                        title: '提示',
                                        msg: '请选择要导出的报表类型',
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.MessageBox.WARNING
                                    });
                                    return;
                                }
                                panelvalues.ReportType = Ext.JSON.encode(panelvalues.ReportType)
                                Ext.apply(panelvalues, values);
                                Ext.apply(panelvalues, me.EX_Params);
                                //如果不需要合并文件，就循环调用后台
                                if (Ext.isEmpty(panelvalues.MergeFile)) {
                                    for (var i = 0; i < ReportType.length; i++) {
                                        panelvalues.ReportType = Ext.JSON.encode(new Array(ReportType[i]));
                                        exportExcelByAjax(me.excelUrl, panelvalues, i);
                                    }
                                } else {
                                    exportExcelByAjax(me.excelUrl, panelvalues);
                                }


                            } else {
                                Ext.Msg.show({
                                    title: '提示',
                                    msg: '表单数据不全',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.MessageBox.WARNING
                                });
                            }

                        }

                    }
                ]

            }).show()

        },
        //查询的数据是否是检查记录的历史数据
        isHisQuery: false,
        initComponent: function () {
            var me = this;
            CheckTypeStore.insert(0, {text: '全部', value: ''});
            me.items = [
                {
                    layout: {type: 'hbox', align: 'middle'},
                    defaults: {
                        labelWidth: 80,
                        labelAlign: 'right'

                    },
                    items: [
                        Ext.create('Ext.form.field.ComboBox', {
                            hiddenName: 'course_id', flex: 1, labelWidth: 80,
                            name: 'course_id', labelAlign: 'right',
                            fieldLabel: '操作',
                            triggerAction: 'all',
                            queryMode: 'local',
                            store: Ext.create('Ext.data.Store', {
                                model: 'Ext4.HOS.Model.CourseInfo_Model',
                                autoLoad: true,
                                proxy: {

                                    type: 'ajax',
                                    url: 'HospitalManageAction.ered?reqCode=queryCourseInfoForList',
                                    reader: {
                                        type: 'json'
                                    }
                                }
                            }),
                            loadingText: '正在加载数据...',
                            forceSelection: true,
                            displayField: 'course_name', valueField: 'course_id'
                        }),
                        Ext.create('Ext.form.field.ComboBox', {
                            hiddenName: 'deptid', labelWidth: 80,
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
                            name: 'completed', labelWidth: 80,
                            hiddenName: 'completed', labelAlign: 'right',
                            store: COM001Store,
                            queryMode: 'local', flex: 1,
                            triggerAction: 'all',
                            valueField: 'value',
                            displayField: 'text',
                            fieldLabel: '正确性',
                            forceSelection: true
                        }),
                        {
                            flex: 2, border: false,
                            defaults: {labelAlign: 'right', labelWidth: 80},
                            layout: {type: 'hbox', align: 'middle'}, items: [
                            Ext.create('Ext.form.field.ComboBox', {
                                labelWidth: 80,
                                hiddenName: 'check_type',
                                name: 'check_type', labelAlign: 'right',
                                fieldLabel: '检查类型',
                                hidden: !me.enableCheckType,
                                disabled: !me.enableCheckType,
                                flex: 1,
                                triggerAction: 'all',
                                queryMode: 'local',
                                store: CheckTypeStore,
                                loadingText: '正在加载数据...',
                                forceSelection: true,
                                displayField: 'text', valueField: 'value'
                            }),
                            {
                                border: false, flex: 1,
                                xtype: 'container',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                }, items: [
                                {
                                    xtype: 'textfield', labelWidth: 80,
                                    fieldLabel: '录入人员',
                                    name: 'checker_name',
                                    readOnly: true,
                                    labelAlign: 'right',
                                    itemId: 'checker_name',
                                    flex: 1
                                },
                                {
                                    xtype: 'button',
                                    text: '点击选择',
                                    iconCls: 'acceptIcon',
                                    handler: function () {
                                        var us = new UserSelect({
                                            deptId: me.deptId,
                                            deptName: me.deptName
                                        });
                                        us.makePanelForWindow({
                                            title: "人员选择", foruseridCmpId: me.userid.getId(),
                                            forusernameCmpId: me.checker_name.getId()
                                        });


                                    }
                                }

                            ]

                            },
                            {
                                flex: 1, border: false,
                                hidden: me.enableCheckType,
                                disabled: me.enableCheckType
                            }

                        ]
                        }


                    ]
                },
                {
                    layout: {type: 'hbox', align: 'middle'},
                    defaults: {
                        labelWidth: 80,
                        labelAlign: 'right'
                    },
                    items: [
                        {
                            border: false, flex: 1,
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            }, items: [
                            {
                                xtype: 'textfield', labelWidth: 80,
                                fieldLabel: '当事人',
                                name: 'litigant_name',
                                readOnly: true,
                                labelAlign: 'right',
                                itemId: 'litigant_name',
                                flex: 1
                            },
                            {
                                xtype: 'button',
                                text: '点击选择',
                                iconCls: 'acceptIcon',
                                handler: function () {
                                    var us = new UserSelect({
                                        deptId: me.deptId,
                                        deptName: me.deptName
                                    });
                                    us.makePanelForWindow({
                                        title: "人员选择", foruseridCmpId: me.litigant.getId(),
                                        forusernameCmpId: me.litigant_name.getId()
                                    });


                                }
                            }

                        ]

                        }
                        ,
                        new Ext.form.field.ComboBox({
                            name: 'litigantrole', labelWidth: 80,
                            hiddenName: 'litigantrole',
                            store: LitigantRoleStore, flex: 1,
                            queryMode: 'local', triggerAction: 'all',
                            valueField: 'value',
                            displayField: 'text', labelAlign: 'right',
                            value: '1',
                            fieldLabel: '当事人角色',
                            forceSelection: true
                        }),
                        new Ext.form.field.ComboBox({
                            labelWidth: 80,
                            name: 'checknorm', flex: 1, triggerAction: 'all',
                            hiddenName: 'checknorm', labelAlign: 'right',
                            store: CheckNormStore,
                            queryMode: 'local',
                            valueField: 'value',
                            displayField: 'text',
                            fieldLabel: '调查指标',
                            forceSelection: true,
                            typeAhead: true
                        }),
                        {
                            flex: 2, border: false,
                            defaults: {labelAlign: 'right', labelWidth: 80},
                            layout: {type: 'hbox', align: 'middle'}, items: [
                            {xtype: 'datefield', fieldLabel: '开始时间', format: 'Y-m-d', flex: 1, name: 'start_date'},
                            {xtype: 'datefield', fieldLabel: '结束时间', format: 'Y-m-d', flex: 1, name: 'end_date'}

                        ]
                        }
                    ]
                },

                {
                    xtype: 'hiddenfield',
                    name: 'userid',
                    itemId: 'userid'
                },

                {
                    xtype: 'hiddenfield',
                    name: 'operater',
                    itemId: 'operater'
                },

                {
                    xtype: 'hiddenfield',
                    name: 'litigant',
                    itemId: 'litigant'
                }
            ]
            if (me.isHisQuery) {
                me.items.push(
                    {
                        layout: {type: 'hbox', align: 'middle'},
                        hidden: !me.isHisQuery,
                        defaults: {
                            labelWidth: 80,
                            labelAlign: 'right'

                        },
                        items: [
                            {
                                flex: 2, border: false,
                                defaults: {labelAlign: 'right', labelWidth: 80},
                                layout: {type: 'hbox', align: 'middle'}, items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: '操作开始时间',
                                    format: 'Y-m-d',
                                    flex: 1,
                                    name: 'start_operate_time'
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: '操作结束时间',
                                    format: 'Y-m-d',
                                    flex: 1,
                                    name: 'end_operate_time'
                                }
                            ]
                            },
                            new Ext.form.field.ComboBox({
                                labelWidth: 80,
                                name: 'operate_type', flex: 1, triggerAction: 'all',
                                hiddenName: 'operate_type', labelAlign: 'right',
                                store: OT001Store,
                                queryMode: 'local',
                                valueField: 'value',
                                itemId: 'operate_type',
                                displayField: 'text',
                                fieldLabel: '操作类型',
                                forceSelection: true,
                                typeAhead: true
                            }),
                            {
                                border: false, flex: 1,
                                xtype: 'container',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                }, items: [
                                {
                                    xtype: 'textfield', labelWidth: 80, hidden: !me.ismanager,
                                    fieldLabel: '操作人员',
                                    name: 'operate_name',
                                    readOnly: true,
                                    labelAlign: 'right',
                                    itemId: 'operate_name',
                                    flex: 1
                                },
                                {
                                    xtype: 'button', hidden: !me.ismanager,
                                    text: '点击选择',
                                    iconCls: 'acceptIcon',
                                    handler: function () {
                                        var us = new UserSelect({
                                            deptId: me.deptId,
                                            deptName: me.deptName

                                        });
                                        us.makePanelForWindow({
                                            title: "人员选择", foruseridCmpId: me.operater.getId(),
                                            forusernameCmpId: me.operate_name.getId()
                                        });

                                    }
                                }

                            ]

                            },
                            {
                                flex: 1, border: false

                            }

                        ]
                    })
            }
            me.buttons = [
                {
                    text: '重置',
                    hidden: !me.enableResetBtn,
                    iconCls: 'arrow_refreshIcon',
                    handler: function () {
                        me.resetFunction()
                    }
                },

                {
                    text: '查询',
                    hidden: !me.enableQueryBtn,
                    iconCls: 'zoomIcon',
                    handler: function () {
                        me.queryFunction(me.getForm().getValues())
                    }
                }
                ,
                {
                    text: '导出数据',
                    hidden: !me.enableExportBtn,
                    iconCls: 'window_caise_listIcon',
                    handler: function () {
                        var form = me.getForm();
                        var values = form.getValues();
                        var hasvalue = false;
                        form.getFields().each(function (item, index, len) {
                            if (!Ext.isEmpty(item.getValue())) {
                                hasvalue = true;
                                return false;
                            } else {
                                return true;
                            }
                        })
                        me.exportExcelFunction(values, hasvalue)
                    }
                }

            ]
            //_____________初始化结束_____________
            me.callParent(arguments);
            me.checker_name = me.down('#checker_name');
            me.userid = me.down('#userid');
            me.litigant_name = me.down('#litigant_name');
            me.litigant = me.down('#litigant');
            me.operate_name = me.down('#operate_name');
            me.operater = me.down('#operater');
            me.operate_type = me.down('#operate_type');
        }

    })
