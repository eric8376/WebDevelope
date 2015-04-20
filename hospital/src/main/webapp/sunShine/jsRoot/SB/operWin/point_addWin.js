/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【环节信息设置窗体】
 * 时间: 2013-08-22  下午7:35
 */
    //--------------------导入包语句--------------------
    //importJs("")


    //--------------------定义类--------------------
Ext.define('sunShine.SB.operWin.point_addWin', {
    extend: 'sunShine.common.UXWindow2',
    alias: 'widget.point_addWin',

    title: '环节信息设置',
    layout: 'fit',
    pWin: '',
    width: 600,
    height: 169,

    initComponent: function () {
        var me = this;
        //_____________初始化开始_____________
        this.items = [
            {
                xtype: 'form',
                bodyPadding: 8,
                items: [
                    {xtype: 'textfield', name: 'source_type', hidden: true},
                    {xtype: 'textfield', name: 'urge_no', hidden: true},
                    {xtype: 'textfield', name: 'flow_no', hidden: true},
                    {xtype: 'textfield', name: 'point_no', hidden: true},
                    {
                        xtype: 'textfield',
                        name: 'use_time',
                        fieldLabel: '环节时长(el)',
                        maxLength: 500,
                        allowBlank: false,
                        anchor: '100%'
                    },
                    {xtype: 'textfield', name: 'urge_count', hidden: true},
                    {
                        xtype: 'combo',
                        name: 'is_urge',
                        fieldLabel: '是否催办',
                        store: [['1', '是'], ['0', '否']],
                        value: '1',
                        editable: false,
                        allowBlank: false,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        name: 'explain',
                        fieldLabel: '备注',
                        maxLength: 20,
                        allowBlank: false,
                        anchor: '100%'
                    }
                ]
            }
        ];

        this.buttons = [
            {text: '保存', iconCls: 'acceptIcon', handler: this.event_save, scope: this}
        ];
        //_____________初始化结束_____________
        me.callParent(arguments);
    },
    //保存表单
    event_save: function () {
        var me = this;
        var form = this.down('form');
        var methodName = this.down('textfield[name=source_type]').getValue() == 0 ? "saveUrge" : "updateUrge";
        submitForm(form, 'flowUrge2Service', methodName, {}, function () {
            me.pWin.pointStore.load();
            me.hide();
        });
    }
});
