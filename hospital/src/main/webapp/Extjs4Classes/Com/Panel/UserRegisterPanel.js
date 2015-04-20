/**
 * Created by 黄琦鸿
 * 用户注册面板
 *Date 2014年7月23日
 *Time 14:20:59
 */
Ext.define('Ext4.Com.Panel.UserRegisterPanel', {
    extend: 'Ext.form.Panel',
    requires: ['Ext4.Com.Other.DiyTextField'],
    /*   layout: {
     type: 'vbox',
     padding: '5',
     align: 'center',
     pack: 'top'
     },*/
    autoScroll: true,
    captcha_value: '',
    company_name: '',
    fieldDefaults: {
        labelWidth: 80,
        labelAlign: 'left',
        margin: '4 0 20 ' + (642 - 260) * 0.5
    },
    defaults: {
        style: 'font-size:14px;margin-left:' + (642 - 260) * 0.5,
        fieldStyle: 'font-size:14px;',
        labelStyle: 'font-size:18px;padding:1 0 0 0;',
        width: 260,
        height: 25
    },
    defaultType: 'textfield',
    initComponent: function () {
        var me = this;
        if (Ext.isEmpty(me.company_name) || me.company_name == 'null') {
            me.company_name = null;
        }
        if (Ext.isEmpty(me.captcha_value) || me.captcha_value == 'null') {
            me.captcha_value = null;
        }
        me.items = [
            {
                value: me.company_name,
                emptyText: '无上级企业',
                readOnly: true, fieldStyle: 'font-size:18px; background:none;border:none;',
                fieldLabel: '上级企业'
            },
            {xtype: 'label', html: '昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称:'},
            new Ext4.Com.Other.DiyTextField({
                itemId: 'username',
                maxLength: 15,
                allowBlank: false, emptyText: '请输入用户昵称',
                name: 'username'
            }),
            {xtype: 'label', html: '登录账户:'},
            new Ext4.Com.Other.DiyTextField({
                itemId: 'account',
                allowBlank: false, emptyText: '请输入登陆账户', validator: me.validateAccount,
                name: 'account'
            }),
            {xtype: 'label', html: '密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:'},
            new Ext4.Com.Other.DiyTextField({
                itemId: 'password',
                allowBlank: false, emptyText: '请输入密码', inputType: 'password',
                name: 'password'
            }),

            {
                xtype: 'label', html: '确认密码:',
                msgTarget: 'side'
            },
            new Ext4.Com.Other.DiyTextField({
                itemId: 'confirm_password',
                allowBlank: false, emptyText: '请输入确认密码', inputType: 'password',

                name: 'confirm_password'
            }),
            {xtype: 'label', html: '注&nbsp;&nbsp;册&nbsp;码:'},
            {
                name: 'captcha_value',
                allowBlank: false, value: me.captcha_value,
                readOnly: true, /*fieldStyle: ' background:none;border:none;',*/
                itemId: 'captcha_value'
            }
            ,
            {
                border: false,
                width: 260, height: 40,
                xtype: 'panel',
                layout: {type: 'hbox', align: 'center', pack: 'center'},
                items: [
                    {
                        html: '<span style="color: white">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</span>',
                        width: 260,
                        height: 40,
                        xtype: 'button',
                        style: 'background-image:url(./resource/image/ZMUY-3.png)',
                        handler: function () {
                            var userregisterpanel = this.ownerCt.ownerCt;
                            if (!userregisterpanel.isValid()) {
                                Ext.Msg.show({
                                    title: '提示',
                                    msg: '表单数据不全',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.MessageBox.WARNING
                                });
                                return;
                            }
                            if (userregisterpanel.passwordVerify()) {
                                var params = userregisterpanel.getForm().getValues();
                                Ext.apply(params, {
                                    sex: '0'
                                });
                                Ext.Ajax.request({
                                    url: 'user.ered?reqCode=saveUserItem',
                                    params: params,
                                    success: function (response, opts) {
                                        //产品名称
                                        var result = Ext.decode(response.responseText);
                                        if (result.error) {
                                            Ext.Msg.show({
                                                title: '提示',
                                                msg: result.error,
                                                buttons: Ext.Msg.OK,
                                                icon: Ext.MessageBox.WARNING
                                            });
                                        } else {
                                            Ext.Msg.show({
                                                title: '提示',
                                                msg: '您已经注册成功，请登录并提交资料',
                                                buttons: Ext.Msg.OK,
                                                fn: function () {
                                                    window.location.href = result.contextPath + '/login.ered?reqCode=init'
                                                },
                                                icon: Ext.MessageBox.WARNING
                                            });
                                            userregisterpanel.getForm().reset();

                                        }


                                    },
                                    failure: function (response, opts) {
                                        Ext.Msg.show({
                                            title: '提示',
                                            msg: '人员数据保存失败:<br>',
                                            buttons: Ext.Msg.OK,
                                            icon: Ext.MessageBox.WARNING
                                        });
                                        return;
                                    },
                                    timeout: 30000
                                });

                            } else {
                                Ext.Msg.show({
                                    title: '提示',
                                    msg: '确认密码不正确',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.MessageBox.WARNING
                                });
                                return;
                            }
                        }
                    }

                ]

            }
        ]
        //_____________初始化结束_____________
        this.callParent(arguments);
        me.password = me.down('#password');
        me.confirm_password = me.down('#confirm_password');
    },
    validateAccount: function (value) {
        var verifyResult = true;
        Ext.Ajax.request({
            async: false,
            url: 'user.ered?reqCode=checkAccount',
            params: {
                account: value
            },
            success: function (response, opts) {
                //产品名称
                var result = Ext.decode(response.responseText);
                if (result.count != 0) {
                    verifyResult = "账户已存在"
                }
            },
            failure: function (response, opts) {
                return "账户检测失败"
            },
            timeout: 30000
        });
        return verifyResult;
//        return new Date().getTime()
//        return value==''?'': value=='www'?true:'自定义校验';
    },
    passwordVerify: function () {
        var me = this;
        var isVerify = true;
        if (me.password.getValue() != me.confirm_password.getValue()) {
            isVerify = false;
//            me.confirm_password.setValue('');
        }
        return isVerify;
    }
})