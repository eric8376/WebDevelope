/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【任务到达提醒设置窗体】
 * 时间: 2013-08-22  下午7:35
 */
    //--------------------导入包语句--------------------
    //importJs("")


    //--------------------定义类--------------------
Ext.define('sunShine.SB.operWin.mx2_addWin', {
    extend: 'sunShine.common.UXWindow2',
    alias: 'widget.mx2_addWin',

    title: '任务到达提醒设置',
    layout: 'fit',
    pWin: '',
    width: 600,
    height: 169,
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
                    {xtype: 'textfield', name: 'mx2_no', hidden: true},
                    {xtype: 'textfield', name: 'urge_no', hidden: true},
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
                        allowBlank: false,
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
        var methodName = this.isInsert ? "saveUrgeMx2" : "updateUrgeMx2";
        if (this.isInsert) {
            form.getForm().findField('urge_no').setValue(this.pWin.down('tabpanel[tabFlag=rightTab]').P_urge_no);
        }
        submitForm(form, 'flowUrge2Service', methodName, {}, function () {
            me.pWin.mx2Store.load();
            if (btn.btnFlag == 1) {
                me.hide();
            }
        });
    }
});
