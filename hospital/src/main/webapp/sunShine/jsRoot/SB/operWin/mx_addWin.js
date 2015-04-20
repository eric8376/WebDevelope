/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【任务超时提醒设置窗体】
 * 时间: 2013-08-22  下午7:36
 */
    //--------------------导入包语句--------------------
    //importJs("")


    //--------------------定义类--------------------
Ext.define('sunShine.SB.operWin.mx_addWin', {
    extend: 'sunShine.common.UXWindow2',
    alias: 'widget.mx_addWin',

    title: '任务超时提醒设置',
    layout: 'fit',
    pWin: '',
    width: 600,
    height: 310,
    userArray: '',
    tplArray: '',

    initComponent: function () {
        var me = this;
        //_____________初始化开始_____________
        this.items = [
            {
                xtype: 'form',
                bodyPadding: 8,
                items: [
                    {xtype: 'textfield', name: 'mx_no', hidden: true},
                    {xtype: 'textfield', name: 'urge_no', hidden: true},
                    {
                        xtype: 'combo',
                        name: 'urge_type',
                        fieldLabel: '提醒方式',
                        store: [['0', '定时提醒'], ['1', '周期提醒'], ['2', '组织结构递归提醒']],
                        value: '0',
                        editable: false,
                        allowBlank: false,
                        anchor: '100%',
                        listeners: {
                            "select": function (t) {
                                if (t.getValue() == "2") {
                                    Ext.getCmp("pre_interval_time").setVisible(true);
                                } else {
                                    Ext.getCmp("pre_interval_time").setValue("0");
                                    Ext.getCmp("pre_interval_time").setVisible(false);
                                }
                            }
                        }
                    },
                    {
                        xtype: 'textfield',
                        id: 'pre_interval_time',
                        name: 'pre_interval_time',
                        hidden: true,
                        fieldLabel: '前置间隔分钟(el/cron)',
                        value: 0,
                        maxLength: 500,
                        allowBlank: false,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        name: 'interval_time',
                        fieldLabel: '间隔分钟(el/cron)',
                        value: 0,
                        maxLength: 500,
                        allowBlank: false,
                        anchor: '100%'
                    },
                    {
                        xtype: 'numberfield',
                        name: 'repeat_urge_count',
                        fieldLabel: '重复提醒次数',
                        maxValue: 10000,
                        minValue: 0,
                        value: 0,
                        allowBlank: false,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        name: 'repeat_urge_interval',
                        fieldLabel: '重复提醒间隔(el)',
                        value: 0,
                        maxLength: 500,
                        allowBlank: false,
                        anchor: '100%'
                    },
                    {
                        xtype: 'combo',
                        name: 'activity',
                        fieldLabel: '动作',
                        store: [['0', '无'], ['1', '短信'], ['2', '邮件'], ['3', 'RTX']],
                        value: '0',
                        editable: false,
                        allowBlank: false,
                        anchor: '100%'
                    },
                    {
                        xtype: 'combo',
                        name: 'receive_man',
                        fieldLabel: '接收人',
                        store: me.userArray,
                        forceSelection: true,
                        allowBlank: true,
                        anchor: '100%'
                    },
                    {
                        xtype: 'combo',
                        name: 'tpl_no',
                        fieldLabel: '引用模板',
                        store: me.tplArray,
                        forceSelection: true,
                        allowBlank: false,
                        anchor: '100%'
                    }
                ]
            }
        ];

        this.buttons = [
            {text: '保存', iconCls: 'acceptIcon', btnFlag: 1, handler: this.event_save, scope: this},
            {text: '保存,但不退出', iconCls: 'acceptIcon', btnFlag: 2, handler: this.event_save, scope: this}
        ];
        //_____________初始化结束_____________
        me.callParent(arguments);
    },
    //保存表单
    event_save: function (btn) {
        var me = this;
        var form = this.down('form');
        var methodName = this.isInsert ? "saveUrgeMx" : "updateUrgeMx";
        if (this.isInsert) {
            form.getForm().findField('urge_no').setValue(this.pWin.down('tabpanel[tabFlag=rightTab]').P_urge_no);
        }
        submitForm(form, 'flowUrge2Service', methodName, {}, function () {
            me.pWin.mxStore.load();
            if (btn.btnFlag == 1) {
                me.hide();
            }
        });
    }
});
