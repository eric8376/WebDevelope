/**
 *<pre>HospitalInfo_Panel</pre>
 *<br>
 *<pre>所属模块：</pre>
 * @author 黄琦鸿
 *创建于  2014/12/28 18:51.
 */
Ext.define('Ext4.HOS.Panel.HospitalInfo_Panel', {
    extend: 'Ext.form.Panel',
    border: false,
    isupdate: false,
    layout: 'form',
    requires: ['Ext4.Com.Model.ValueText_Model'],
    bodyStyle: 'padding:5 5 5 5 ',
    isReadOnly: false,//只能查看明细时用
    initComponent: function () {
        var me = this;
        var readonlystyle = '';
        if (me.isReadOnly) {
            readonlystyle = 'background:none;border:none;';
        }

        me.items = [
            {
                xtype: 'fieldset', title: '医院信息', layout: {type: 'column', columns: 2}, items: [

                {
                    layout: 'form', defaults: {labelAlign: 'right'}, columnWidth: 0.5, border: false,
                    items: [
                        {
                            xtype: 'textfield',
                            maxLengthText: '医院名称过长',
                            fieldLabel: '医院名称',
                            anchor: '99%',
                            tabIndex: 1,
                            fieldStyle: readonlystyle,
                            readOnly: me.isReadOnly,
                            allowBlank: false,
                            name: 'hospital_name',
                            maxLength: 20
                        },
                        new Ext.form.field.ComboBox({
                            name: 'hospitallevel',
                            hiddenName: 'hospitallevel',
                            labelAlign: 'right',
                            readOnly: me.isReadOnly, fieldStyle: readonlystyle,
                            store: HospitalLevelStore,
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'value',
                            displayField: 'text',
                            fieldLabel: '医院等级',
                            emptyText: '请选择...',
                            allowBlank: false,
                            forceSelection: true,
                            editable: false,
                            anchor: "99%"
                        }),
                        Ext.create('Ext.form.field.ComboBox', {
                            flex: 3,
                            hiddenName: 'city', tabIndex: 3,
                            name: 'city',
                            fieldLabel: '州、市',
                            labelAlign: 'right',
                            readOnly: me.isReadOnly, fieldStyle: readonlystyle,
                            emptyText: '请选择州市...',
                            triggerAction: 'all',
                            disabled: true,
                            queryMode: 'local',
                            itemId: 'cityCombo',
                            store: Ext.create('Ext.data.Store', {
                                model: 'Ext4.Com.Model.ValueText_Model',
                                proxy: {
                                    extraParams: {areacodelength: '6'},
                                    type: 'ajax',
                                    url: 'formDemo.ered?reqCode=queryAreaDatas',
                                    reader: {
                                        type: 'json'/*,
                                         totalProperty : 'TOTALCOUNT', // 记录总数
                                         root : 'ROOT' // Json中的列表数据根节点*/
                                    }
                                }
                            }),
                            loadingText: '正在加载数据...',
                            forceSelection: true,
                            displayField: 'text', valueField: 'value',
                            editable: false, resizable: false,
                            allowBlank: false, anchor: '100%', listeners: {
                                'select': function (combo, records, eOpts) {
                                    me.countyCombo.reset();
                                    var value = combo.getValue();
                                    if (Ext.isEmpty(value)) {
                                        me.countyCombo.setDisabled(true)
                                    } else {
                                        me.countyCombo.getStore().proxy.extraParams.areacode = (value.substr(0, 4) + '%');
                                        me.countyCombo.getStore().proxy.extraParams.unareacode = (value);
                                        me.countyCombo.getStore().load({
                                            callback: function (records, operation, success) {
                                                if (Ext.isEmpty(records)) {
                                                    me.countyCombo.setDisabled(true)
                                                } else {
                                                    me.countyCombo.setDisabled(false)
                                                }
                                            }
                                        })
                                    }

                                }
                            }
                        })
                    ]

                },
                {
                    layout: 'form', columnWidth: 0.5, border: false, defaults: {labelAlign: 'right'},
                    items: [
                        /* {layout: {type: 'hbox', align: 'middle'}, border: false, items: [
                         {flex: 0.9, border: false, layout: 'form', items: [
                         {
                         itemId: 'p_hospital_name', labelAlign: 'right',
                         xtype: 'textfield',
                         name: 'p_hospital_name',
                         readOnly: true,
                         fieldLabel: '所属医院名称'
                         }
                         ]},
                         {xtype: 'button', text: '点击选择', iconCls: 'acceptIcon', handler: function () {
                         var hospitalgrid = new Ext4.HOS.GridPanel.HospitalInfo_Grid({
                         title: '医院列表',
                         autoloaddata: true,
                         height: document.body.clientHeight * 0.4,
                         width: document.body.clientWidth * 0.8,
                         forChoice: true,
                         paging: true,
                         canMultiChoice: false,
                         showSelModel: me.showSelModel,
                         backFunctionForChoice: function (rec) {
                         if (Ext.isEmpty(rec)) {
                         Ext.Msg.show({
                         title: '提示',
                         msg: '请选择所属的父级医院',
                         buttons: Ext.Msg.OK,
                         icon: Ext.MessageBox.WARNING
                         });
                         return;
                         }
                         me.p_hospital_name.setValue(rec[0].get('hospital_name'));
                         choiceWin.close();
                         }, listeners: {
                         'itemdblclick': function (gridpanel, record, item, index, e, eOpts) {
                         hospitalgrid.backFunctionForChoice([record])
                         }

                         }
                         });
                         var choiceWin = new Ext.window.Window({
                         title: '选择父级医院',
                         modal: true,
                         closeAction: 'destroy', resiable: false,
                         layout: 'fit',
                         draggable: true,
                         width: document.body.clientWidth * 0.8,
                         height: document.body.clientHeight,
                         items: [
                         hospitalgrid
                         ]
                         }).show()
                         }}


                         ]},*/
                        {
                            xtype: 'numberfield',
                            fieldLabel: '开通年限',
                            value: '1',
                            minValue: 0,
                            allowBlank: false,
                            itemId: 'end_of_valid',
                            name: 'end_of_valid'
                        },
                        Ext.create('Ext.form.field.ComboBox', {
                            tabIndex: 2,
                            hiddenName: 'province',
                            name: 'province',
                            fieldLabel: '省',
                            flex: 3, labelAlign: 'right',
                            emptyText: '请选择省份...',
                            triggerAction: 'all',
                            readOnly: me.isReadOnly,
                            fieldStyle: readonlystyle,
                            queryMode: 'remote',
                            itemId: 'provinceCombo',
                            store: Ext.create('Ext.data.Store', {
                                model: 'Ext4.Com.Model.ValueText_Model',
//                                                    autoLoad: true,
                                proxy: {
                                    extraParams: {areacodelength: '2'},
                                    type: 'ajax',
                                    url: 'formDemo.ered?reqCode=queryAreaDatas',
                                    reader: {
                                        type: 'json'/*,
                                         totalProperty : 'TOTALCOUNT', // 记录总数
                                         root : 'ROOT' // Json中的列表数据根节点*/
                                    }
                                }
                            }),
                            loadingText: '正在加载数据...',
                            forceSelection: true,
                            displayField: 'text', valueField: 'value',
                            editable: false, resizable: false,
                            allowBlank: false, anchor: '100%', listeners: {
                                'select': function (combo, records, eOpts) {
                                    me.cityCombo.reset();
                                    me.countyCombo.reset();
                                    me.countyCombo.setDisabled(true);
                                    var value = combo.getValue();
                                    if (Ext.isEmpty(value)) {
                                        me.cityCombo.setDisabled(true);
                                        me.countyCombo.setDisabled(true);
                                    } else {
                                        me.cityCombo.getStore().proxy.extraParams.areacode = (value + '%00');
                                        me.cityCombo.getStore().load({
                                            callback: function (records, operation, success) {
                                                if (Ext.isEmpty(records)) {
                                                    me.cityCombo.setDisabled(true)
                                                    me.countyCombo.setDisabled(true)
                                                } else {
                                                    me.cityCombo.setDisabled(false)
                                                }
                                            }
                                        })
                                    }

                                }
                            }
                        }),
                        Ext.create('Ext.form.field.ComboBox', {
                            hiddenName: 'area', flex: 3, tabIndex: 4,
                            name: 'area', labelAlign: 'right',
                            fieldLabel: '县、区', fieldStyle: readonlystyle,
                            disabled: true,
                            emptyText: '请选择县区...',
                            triggerAction: 'all',
                            queryMode: 'local',
                            readOnly: me.isReadOnly,
                            store: Ext.create('Ext.data.Store', {
                                model: 'Ext4.Com.Model.ValueText_Model',
//                                                    autoLoad: true,
                                proxy: {
                                    extraParams: {areacodelength: '6'},
                                    type: 'ajax',
                                    url: 'formDemo.ered?reqCode=queryAreaDatas',
                                    reader: {
                                        type: 'json'/*,
                                         totalProperty : 'TOTALCOUNT', // 记录总数
                                         root : 'ROOT' // Json中的列表数据根节点*/
                                    }
                                }
                            }),
                            loadingText: '正在加载数据...',
                            itemId: 'countyCombo',
                            forceSelection: true,
                            displayField: 'text', valueField: 'value',
                            editable: false, resizable: false,
                            allowBlank: false, anchor: '100%'
                        })
                    ]
                },
                {
                    layout: 'form', defaults: {labelAlign: 'right'}, columnWidth: 1, border: false,
                    items: [
                        {
                            xtype: 'textfield',
                            maxLengthText: '医院地址过长',
                            fieldLabel: '医院地址',
                            anchor: '99%',
                            tabIndex: 5,
                            fieldStyle: readonlystyle,
                            readOnly: me.isReadOnly,
                            allowBlank: false,
                            name: 'address',
                            maxLength: 20
                        }
                    ]

                }

            ]

            },
            {
                xtype: 'fieldset',
                title: '管理员信息',
                hidden: me.isupdate,
                disabled: me.isupdate,
                layout: {type: 'column', columns: 2},
                items: [
                    {
                        layout: 'form', defaults: {labelAlign: 'right'}, columnWidth: 0.5, border: false,
                        items: [
                            {
                                xtype: 'textfield', tabIndex: 6,
                                allowBlank: false,
                                fieldLabel: '管理员名称', // 标签
                                name: 'username', // name:后台根据此name属性取值
                                anchor: '100%' // 宽度百分比
                            },
                            {
                                xtype: 'textfield', name: 'password', tabIndex: 8,
                                itemId: 'password', inputType: 'password',
                                allowBlank: false,
                                anchor: "99%", fieldLabel: '用户密码'
                            }
                        ]

                    },
                    {
                        layout: 'form', defaults: {labelAlign: 'right'}, columnWidth: 0.5, border: false,
                        items: [
                            {
                                xtype: 'textfield', tabIndex: 7,
                                allowBlank: false,
                                fieldLabel: '登陆账户', // 标签
                                name: 'account', // name:后台根据此name属性取值
                                anchor: '100%' // 宽度百分比
                            },
                            {
                                xtype: 'textfield',
                                inputType: 'password', allowBlank: false,
                                itemId: 'confirm_password', tabIndex: 9,
                                fieldLabel: '确认密码', // 标签
                                name: 'confirm_password', // name:后台根据此name属性取值
                                anchor: '99%'// 宽度百分比
                            }
                        ]

                    }

                ]

            }
        ]
        //_____________初始化结束_____________
        me.callParent(arguments);
        me.provinceCombo = me.down('#provinceCombo');
        me.countyCombo = me.down('#countyCombo');
        me.cityCombo = me.down('#cityCombo');
        me.p_hospital_name = me.down('#p_hospital_name');
        me.end_of_valid = me.down('#end_of_valid');
        me.provinceCombo.store.load();
    },
    loadComboboxValue: function (rec) {
        var me = this;
        me.provinceCombo.setValue(rec.province);
        me.provinceCombo.fireEvent('select', me.provinceCombo, rec.province);
        me.cityCombo.setValue(rec.city)
        me.cityCombo.fireEvent('select', me.cityCombo, rec.city);
        me.countyCombo.setValue(rec.area)
        me.countyCombo.fireEvent('select', me.countyCombo, rec.area);
    }
})
