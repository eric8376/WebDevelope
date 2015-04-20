/**
 *<pre>CheckInfo_Panel</pre>
 *<br>
 *<pre>所属模块：</pre>
 * @author 黄琦鸿
 *创建于  2014/12/28 18:51.
 */
Ext.define('Ext4.HOS.Panel.CheckInfo_Panel',
    {
        extend: 'Ext.form.Panel',
        border: false,
        isupdate: false,
        autoScroll: true,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        requires: ['Ext4.Com.Model.Depts_Model', 'Ext4.HOS.Model.CheckInfo_Model', 'Ext.ux.DateTime', 'Ext4.HOS.Model.CourseInfo_Model'],
        isReadOnly: false,//只能查看明细时用
        defaults: {
            labelAlign: 'right'
        },
        check_type: '',
        forVerify: false,
        deptId: '001',
        deptName: '厦门迈微科技发展有限公司',
        initComponent: function () {
            var me = this;
            var readonlystyle = '';
            if (me.isReadOnly) {
                readonlystyle = 'background:none;border:none;';
            }
            var column1 = Ext.create('Ext.container.Container', {
                border: false,
                layout: {
                    type: 'form',
                    align: 'stretch'
                },
                defaults: {
                    labelWidth: 65
                },
                items: [
                    Ext.create('Ext.form.field.ComboBox', {
                        hiddenName: 'deptid', labelWidth: 65,
                        itemId: 'deptid',
                        name: 'deptid', labelAlign: 'right',
                        fieldLabel: '科室', fieldStyle: readonlystyle,
                        triggerAction: 'all',
                        queryMode: 'local',
                        readOnly: me.isReadOnly,
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
                        displayField: 'deptname', valueField: 'deptid',
                        resizable: false,
                        allowBlank: false,
                        listeners: {
                            'focus': function (com, The, eOpts) {
                                if (me.isReadOnly) {
                                    return true
                                } else {
                                    com.expand()
                                }

                            }
                        }
                    }),
                    {
                        border: false,
                        xtype: 'container',
                        layout: {
                            type: 'column'
                        },
                        items: [
                            {
                                xtype: 'textfield', labelWidth: 65,
                                fieldLabel: '当事人', fieldStyle: readonlystyle,
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
                                hidden: me.isReadOnly,
                                handler: function () {
                                    var us = new UserSelect({
                                        findParameter: {start: 0, notShowSelf: true},
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
                    },
                    {
                        border: false,
                        xtype: 'container',
                        layout: {
                            type: 'column'
                        }, items: [
                        {
                            xtype: 'textfield', labelWidth: 65,
                            fieldLabel: '录入人员', fieldStyle: readonlystyle,
                            name: 'checker_name',
                            readOnly: true,
                            allowBlank: false,
                            labelAlign: 'right',
                            itemId: 'checker_name', columnWidth: 1
                        },
                        {
                            xtype: 'button',
                            text: '点击选择',
                            iconCls: 'acceptIcon',
                            hidden: me.isReadOnly,
                            handler: function () {
                                var us = new UserSelect({
                                    deptId: me.deptId,
                                    deptName: me.deptName
                                });
                                us.makePanelForWindow({
                                    title: "人员选择", foruseridCmpId: me.checker.getId(),
                                    forusernameCmpId: me.checker_name.getId()
                                });
                            }
                        }

                    ]

                    }
                ],
                columnWidth: 0.5

            })
            var column2 = Ext.create('Ext.container.Container', {
                border: false,
                defaults: {
                    labelWidth: 65
                },
                layout: {
                    type: 'form',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'datetimefield',
                        fieldLabel: '调查时间', fieldStyle: readonlystyle, readOnly: me.isReadOnly,
                        labelAlign: 'right',
                        allowBlank: false,
                        name: 'check_time'
                    },
                    new Ext.form.field.ComboBox({
                        labelWidth: 65,
                        hiddenName: 'litigantrole',
                        name: 'litigantrole', labelAlign: 'right',
                        fieldLabel: '当事人角色', fieldStyle: readonlystyle,
                        triggerAction: 'all',
                        queryMode: 'local',
                        readOnly: me.isReadOnly,
                        store: LitigantRoleStore,
                        loadingText: '正在加载数据...',
                        forceSelection: true,
                        displayField: 'text', valueField: 'value',
                        resizable: false,
                        allowBlank: false,
                        listeners: {
                            'focus': function (com, The, eOpts) {
                                if (me.isReadOnly) {
                                    return true
                                } else {
                                    com.expand()
                                }

                            }
                        }
                    })
                ],
                columnWidth: 0.5
            })
            var ycx = {
                xtype: 'fieldset', columnWidth: 1,
                itemId: 'ycx', style: 'padding:0 5 5 5',
                layout: {type: 'hbox', pack: 'start', align: 'middle'},
                items: [
                    Ext.create('Ext.form.field.ComboBox', {
                        hiddenName: 'course_id', labelWidth: 65, flex: 1,
                        itemId: 'course_id',
                        name: 'course_id', labelAlign: 'right',
                        fieldLabel: '洗手时机', fieldStyle: readonlystyle,
                        triggerAction: 'all',
                        queryMode: 'local',
                        readOnly: me.isReadOnly,
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
                        hidden: me.check_type == 'CT00102' ? true : false,
                        disabled: me.check_type == 'CT00102' ? true : false,
                        displayField: 'course_name', valueField: 'course_id',
                        resizable: false,
                        listeners: {
                            'focus': function (com, The, eOpts) {
                                if (me.isReadOnly) {
                                    return true
                                } else {
                                    com.expand()
                                }

                            }
                        },
                        allowBlank: false
                    }),
                    new Ext.form.field.ComboBox({
                        name: 'checknorm', labelWidth: 65, flex: 1,
                        hiddenName: 'checknorm', labelAlign: 'right',
                        store: CheckNormStore, fieldStyle: readonlystyle, readOnly: me.isReadOnly,
                        queryMode: 'local',
                        triggerAction: 'all',
                        valueField: 'value', allowBlank: false,
                        displayField: 'text',
                        fieldLabel: '洗手类型',
                        forceSelection: true,
                        listeners: {
                            'focus': function (com, The, eOpts) {
                                if (me.isReadOnly) {
                                    return true
                                } else {
                                    com.expand()
                                }

                            }
                        }
                    })
                ],
                title: '依从性'

            };
            var Standard1 = new Ext.form.field.ComboBox({
                labelWidth: 80,
                hiddenName: 'standard1',
                name: 'standard1', labelAlign: 'right',
                itemId: 'standard1',
                fieldLabel: me.check_type == 'CT00101' ? '是否正确手消' : '原则',
                fieldStyle: readonlystyle,
                triggerAction: 'all',
                queryMode: 'local',
                readOnly: me.isReadOnly,
                store: me.check_type == 'CT00101' ? COM001Store : COM003Store,
                loadingText: '正在加载数据...',
                forceSelection: true,
                displayField: 'text', valueField: 'value',
                resizable: false,
                allowBlank: false
            });
            var Standard2 = new Ext.form.field.ComboBox({
                labelWidth: 80,
                hiddenName: 'standard2',
                name: 'standard2', labelAlign: 'right',
                itemId: 'standard2',
                fieldLabel: me.check_type == 'CT00101' ? '是否有饰品' : '指征',
                fieldStyle: readonlystyle,
                triggerAction: 'all',
                queryMode: 'local',
                readOnly: me.isReadOnly,
                store: me.check_type == 'CT00101' ? COM001Store : COM003Store,
                loadingText: '正在加载数据...',
                forceSelection: true,
                displayField: 'text', valueField: 'value',
                resizable: false,
                allowBlank: false
            });
            var Standard3 = new Ext.form.field.ComboBox({
                labelWidth: 80,
                hiddenName: 'standard3',
                name: 'standard3', labelAlign: 'right',
                itemId: 'standard3',
                fieldLabel: me.check_type == 'CT00101' ? '是否正确揉搓' : '洗手+手消',
                fieldStyle: readonlystyle,
                triggerAction: 'all',
                queryMode: 'local',
                readOnly: me.isReadOnly,
                store: me.check_type == 'CT00101' ? COM001Store : COM003Store,
                loadingText: '正在加载数据...',
                forceSelection: true,
                displayField: 'text', valueField: 'value',
                resizable: false,
                allowBlank: false
            });
            var zqx_zskh = {
                xtype: 'fieldset', columnWidth: 1,
                itemId: 'zqx_zskh',
                layout: 'column', style: 'padding:0 5 5 5',
                items: [
                    {
                        border: false, columnWidth: 0.5,
                        xtype: 'form',
                        defaults: {
                            labelWidth: 80
                        },
                        items: [Standard1, Standard3]
                    }, {
                        border: false,
                        xtype: 'form', columnWidth: 0.5,
                        defaults: {
                            labelWidth: 80
                        },
                        items: [
                            Standard2
                        ]
                    }],
                title: me.check_type == 'CT00101' ? '手卫生正确性' : '手卫生知识考核'
            };
            var baseAttribute = {
                xtype: 'fieldset',
                layout: 'column', style: 'padding:0 5 5 5',
                items: [
                    column1, column2,
                    //备注
                    {
                        xtype: 'textarea', maxLengthText: '备注过长', fieldLabel: '备注',
                        labelWidth: 65,
                        readOnly: me.isReadOnly, name: 'remark', maxLength: 200,
                        labelAlign: 'right',
                        columnWidth: 1
                    }
                ], title: '基础属性'
            }
            if (me.check_type != 'CT00103') {
                column2.add(new Ext.form.field.ComboBox({
                    labelWidth: 65,
                    hiddenName: 'validity',
                    name: 'validity', labelAlign: 'right',
                    fieldLabel: me.check_type == 'CT00102' ? "含知识考核" : '含正确性', fieldStyle: readonlystyle,
                    triggerAction: 'all',
                    queryMode: 'local',
                    readOnly: me.isReadOnly,
                    store: COM001Store,
                    loadingText: '正在加载数据...',
                    forceSelection: true,
                    displayField: 'text', valueField: 'value',
                    resizable: false,
                    allowBlank: false,
                    listeners: {
                        'change': function (combo, newValue, oldValue, eOpts) {
                            if (newValue == 'COM00101') {
                                //将三大标准组件显示并不允许未空
                                me.ChangeThreeComStatu(true)
                            } else {
                                //将三大组件设置不可用并隐藏
                                me.ChangeThreeComStatu(false)
                            }

                        }
                    }
                }))
            }
            me.items = [
                baseAttribute
            ]
            if (me.check_type != 'CT00103') {
                me.items.push(zqx_zskh)
            } else {
                me.items.push(ycx)
            }
            me.items.push({
                border: false, xtype: 'container',
                height: 25, columnWidth: 1,
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'middle'
                }, hidden: !me.forVerify,
                items: [
                    new Ext.form.field.ComboBox({
                        store: COM001Store, columnWidth: 0.5,
                        queryMode: 'local', labelWidth: 65,
                        disabled: !me.forVerify,
                        hidden: !me.forVerify,
                        name: 'verify_statu',
                        triggerAction: 'all',
                        valueField: 'value',
                        displayField: 'text',
                        fieldLabel: '是否通过',
                        labelAlign: 'right',
                        emptyText: '请选择...',
                        forceSelection: true,
                        editable: false,
                        allowBlank: false
                    })
                    , {
                        border: false, xtype: 'container',
                        flex: 1
                    }
                ]

            })
            me.items.push({
                xtype: 'hiddenfield',
                name: 'check_type',
                value: me.check_type
            })
            me.items.push({
                xtype: 'hiddenfield',
                name: 'checker',
                itemId: 'checker',
                value: me.checker
            })
            me.items.push({
                xtype: 'hiddenfield',
                name: 'litigant',
                itemId: 'litigant',
                value: me.checker
            })
            //_____________初始化结束_____________
            me.callParent(arguments);
            me.deptid = me.down('#deptid');
            me.course_id = me.down('#course_id');
            me.checker_name = me.down('#checker_name');
            me.checker = me.down('#checker');
            me.litigant_name = me.down('#litigant_name');
            me.litigant = me.down('#litigant');
            me.standard1 = me.down('#standard1');
            me.standard2 = me.down('#standard2');
            me.standard3 = me.down('#standard3');
            me.zqx_zskh = me.down('#zqx_zskh');
            me.ycx = me.down('#ycx');
        },
        loadStoreData: function () {
            var me = this;
            if (me.check_type == 'CT00103') {
                me.course_id.getStore().load();
            }
            me.deptid.getStore().load();
        },
        //formid 表示是检查记录id或者检查记录历史明细id，HIS表示检查记录历史id
        loadDataByFormID: function (FormID, history_id) {
            var me = this;
            me.loadStoreData();
            var isempty = Ext.isEmpty(history_id);
            Ext.Ajax.request({
                url: 'HospitalManageAction.ered?reqCode=' + ((isempty) ? 'queryCheckInfo' : 'queryHistoryCheckDetailInfo'),
                success: function (response) {
                    var result = Ext.JSON.decode(response.responseText);
                    if (result.error) {
                        Ext.Msg.show({
                            title: '提示',
                            msg: result.error,
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.WARNING
                        });
                    }
                    else {
                        result[0].verify_statu = 'COM00101';
                        me.getForm().loadRecord(new Ext4.HOS.Model.CheckInfo_Model(result[0]))
                    }

                },
                failure: function () {
                    Ext.Msg.show({
                        title: '提示',
                        msg: '数据传输失败，请联系相关人员',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                },
                timeout: 3000000,// default 30000 milliseconds
                params: {
                    record_id: FormID,
                    history_id: history_id
                }
            });
        },
        //改变三大组件的状态
        ChangeThreeComStatu: function (show) {
            var me = this;
            me.standard1.setDisabled(!show);
            me.standard1.allowBlank = !show;
            me.standard2.setDisabled(!show);
            me.standard2.allowBlank = !show;
            me.standard3.setDisabled(!show);
            me.standard3.allowBlank = !show;
            if (show) {
                if (me.check_type != 'CT00103') {
                    me.zqx_zskh.show();
                } else {
                    me.ycx.show();
                }

            } else {
                if (me.check_type != 'CT00103') {
                    me.zqx_zskh.hide();
                } else {
                    me.ycx.hide();
                }
            }
        }

    })
