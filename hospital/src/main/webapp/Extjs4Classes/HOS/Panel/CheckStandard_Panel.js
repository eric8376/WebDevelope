/**
 *<pre>CheckStandard_Panel</pre>
 *<br>
 *<pre>所属模块：</pre>
 * @author 黄琦鸿
 *创建于  2014/12/28 18:51.
 */
Ext.define('Ext4.HOS.Panel.CheckStandard_Panel',
    {
        extend: 'Ext.form.Panel',
        border: false,
        autoScroll: true,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        defaults: {
            labelAlign: 'right'
        },
        check_type: '',
        initComponent: function () {
            var me = this;
            me.items = [
                new Ext.form.field.ComboBox({
                    name: 'standard_code', labelWidth: 65, itemId: 'standard_code',
                    hiddenName: 'standard_code', labelAlign: 'right',
                    store: me.check_type == 'CT00101' ? CS001Store : CS002Store,
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'value', allowBlank: false,
                    displayField: 'text',
                    fieldLabel: me.check_type == 'CT00101' ? '正确性' : '考核问题',
                    forceSelection: true,
                    listeners: {
                        'select': function (combo, records, eOpts) {
                            me.standard_name.setValue(records[0].data.text)
                        }
                    }
                }),
                new Ext.form.field.ComboBox({
                    name: 'check_result', labelWidth: 65,
                    itemId: 'check_result',
                    hiddenName: 'check_result', labelAlign: 'right',
                    store: COM001Store,
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'value', allowBlank: false,
                    displayField: 'text',
                    fieldLabel: '是否正确',
                    forceSelection: true
                }),
                {
                    xtype: 'hiddenfield',
                    name: 'standard_name', allowBlank: false,
                    itemId: 'standard_name'
                }
            ]
            //_____________初始化结束_____________
            me.callParent(arguments);
            me.standard_code = me.down('#standard_code');
            me.check_result = me.down('#check_result');
            me.standard_name = me.down('#standard_name');
            if (me.check_type == 'CT00102') {
                me.standard_name.setValue("无");
                me.standard_code.setValue('CS00204')
            }
        }

    })
