/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【未命题】
 * 时间: 2013-06-29  下午2:35
 */
    //--------------------导入包语句--------------------
    //importJs("")


    //--------------------定义类--------------------
Ext.define('sunShine.test.testOperWin', {
    extend: 'sunShine.common.UXWindow2',

    width: 866,
    height: 480,
    title: '测试窗口',
    layout: 'fit',

    initComponent: function () {
        var me = this;
        //_____________初始化开始_____________
        me.items = [
            {
                xtype: 'panel',
                //bodyStyle:{background:'url('+webContext+'/resource/image/error/404-02.jpg)'},
                html: '<img src="' + webContext + '/resource/image/error/404-02.jpg' + '" style="width:100%;height:100%;display:block">'
            },
            {
                xtype: 'form',
                style: {position: 'absolute'},
                bodyStyle: {background: 'transparent'},
                items: [

                    {
                        fieldLabel: '测试编号',
                        xtype: 'textfield',
                        name: 'sql_no',
                        anchor: '100% 25%'
                    },
                    {
                        fieldLabel: '测试名字',
                        xtype: 'textfield',
                        name: 'name',
                        anchor: '100% 25%'
                    },
                    {
                        fieldLabel: '测试备注',
                        xtype: 'textarea',
                        name: 'explain',
                        anchor: '100% 50%'
                    }
                ]
            }
        ];

        me.buttons = [
            {text: '快捷ajax提交', iconCls: 'acceptIcon', handler: this.submitForm, scope: me},
            {text: '快捷表单提交', iconCls: 'acceptIcon', handler: this.submitForm2, scope: me}
        ];

        //_____________初始化结束_____________
        me.callParent(arguments);
    },
    submitForm: function () {
        submitAjax("xx1", "xx2");
    },
    submitForm2: function () {
        submitForm(this.down('form'), "xx1", "xx2");
    }
});
