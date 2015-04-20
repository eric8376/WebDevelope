/**
 * 登陆页面
 *
 * @author XiongChun
 * @since 2010-01-13
 */
Ext.onReady(function () {
    /*  var panel = Ext.create('Ext.panel.Panel',{
     autoTabs : true,
     deferredRender : false,
     border : false,
     items :  [{contentEl:'hello-tabs'},{
     xtype : 'tabpanel',
     id : 'loginTabs',
     activeTab : 0,
     height : 180,
     border : false,
     items :[
     {
     title : "身份认证",
     xtype : 'form',
     id : 'loginForm',
     fieldDefaults: {
     labelSeparator : '：',
     labelWidth : 40,
     width : 260
     },
     bodyStyle : 'padding:20 0 0 50',
     defaultType : 'textfield',
     items : [{
     fieldLabel : '帐&nbsp;号',
     name : 'account',
     id : 'account',
     fieldCls  : 'user',
     invalidCls  : '',
     blankText : '帐号不能为空,请输入!',
     maxLength : 30,
     maxLengthText : '账号的最大长度为30个字符',
     allowBlank : false,
     listeners : {
     specialkey : function(field, e) {
     if (e.getKey() == Ext.EventObject.ENTER) {
     Ext.getCmp('password').focus();
     }
     }
     }
     }, {
     fieldLabel : '密&nbsp;码',
     name : 'password',
     id : 'password',

     fieldCls  : 'key',
     invalidCls  : '',
     value:'20121221',
     inputType : 'password',
     blankText : '密码不能为空,请输入!',
     maxLength : 20,
     maxLengthText : '密码的最大长度为20个字符',
     allowBlank : false,
     listeners : {
     specialkey : function(field, e) {
     if (e.getKey() == Ext.EventObject.ENTER) {
     login();
     }
     }
     }
     }, {
     id : 'id_reg_panel',
     xtype : 'panel',
     border : false,
     hidden : true,
     html : '<br>'
     }]
     }, {
     title : '信息公告',
     contentEl : 'infoDiv',
     defaults : {
     width : 230
     }
     }, {
     title : '关于',
     contentEl : 'aboutDiv',
     defaults : {
     width : 230
     }
     }     ]
     }  ]
     });*/

    // 清除按钮上下文菜单
    var mainMenu = Ext.create('Ext.menu.Menu', {
        id: 'mainMenu',
        items: [
            {
                text: '清除记忆',
                iconCls: 'status_awayIcon',
                handler: function () {
                    clearCookie('eredg4.login.account');
                    clearCookie('eredg4.login.password');
                    clearCookie('eredg4.login.userid');
                    clearCookie('eredg4.login.rememberpassword');
                    var account = Ext.getCmp('loginForm')
                        .query('#account');
                    clearForm(Ext.getCmp('loginForm'));
                    account[0].setValue('');
                    account[0].focus();
                }
            },
            {
                text: '切换到全屏模式',
                iconCls: 'imageIcon',
                handler: function () {
                    window.location.href = './fullScreen.htm';
                }
            }
        ]
    });

    Ext.create('Ext.Viewport', {
        title: LOGIN_WINDOW_TITLE,
        layout: {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        },
        style: ' background-image:url(./resource/image/bj.png);background-repeat: no-repeat;filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=\'scale\')";-moz-background-size:100% 100%;background-size:100% 100%;',
        items: [
            {
                xtype: 'panel',
                border: false,
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                    pack: 'center'
                },
                bodyStyle: {
                    background: 'url(./resource/image/dl.png);'
                },

                items: [
                    {xtype: 'container', padding: '20 20 0 20', contentEl: 'hello-tabs'},
                    {
                        border: false,
                        padding: '20 20 0 20',
//                        title : "身份认证",
                        xtype: 'container',
                        id: 'loginForm',
                        width: 290,
                        height: 250,
                        fieldDefaults: {
                            labelStyle: 'font-size:20;margin-top:10',
                            labelWidth: 50,
                            width: 290,
                            height: 40
                        },
//                        bodyStyle : 'padding:20 0 0 50',
                        defaultType: 'textfield',
                        items: [
                            {
//                            fieldLabel : '帐&nbsp;号',
                                name: 'account',
                                id: 'account',
                                fieldCls: 'yhm',
                                invalidCls: '',
                                blankText: '帐号不能为空,请输入!',
                                maxLength: 30,
                                size: 500,
                                height: 45, width: 290,
                                maxLengthText: '账号的最大长度为30个字符',
                                allowBlank: false,
                                listeners: {
                                    specialkey: function (field, e) {
                                        if (e.getKey() == Ext.EventObject.ENTER) {
                                            Ext.getCmp('password').focus();
                                        }
                                    }
                                }
                            },
                            {
//                            fieldLabel : '密&nbsp;码',
                                name: 'password',
                                id: 'password',
                                height: 45, width: 290,
                                fieldCls: 'mima',
                                invalidCls: '',
                                inputType: 'password',
                                blankText: '密码不能为空,请输入!',
                                maxLength: 20,
                                maxLengthText: '密码的最大长度为20个字符',
                                allowBlank: false,
                                listeners: {
                                    specialkey: function (field, e) {
                                        if (e.getKey() == Ext.EventObject.ENTER) {
                                            login();
                                        }
                                    }
                                }
                            },
                            {
                                xtype: 'container',
                                border: false,
                                width: 290,
                                height: 41,
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch',
                                    pack: 'center'
                                },
                                items: [
                                    {
                                        xtype: 'checkboxfield',
                                        itemId: 'remember-password',
                                        padding: '0 20 0 0',
                                        boxLabel: '记住密码',
                                        handler: function (checkbox, checked) {
                                            setCookie("eredg4.login.rememberpassword", checked, 240);
                                        }
                                    }
                                    ,
                                    {
                                        xtype: 'container', border: false, padding: '3 0 0 0',
                                        html: '<a href="#" onclick="alert(\'功能待开发\')">忘记密码</a>'
                                    }
                                ]

                            },
                            {
                                xtype: 'button', width: 290, height: 47,
                                style: {
                                    background: 'url(./resource/image/login_btn.png); no-repeat '
                                },
                                text: '<span style="font-size: 18"  >登&nbsp&nbsp&nbsp陆</scan>',
                                handler: function () {
                                    if (Ext.isIE) {
                                        if (!Ext.isIE8) {
                                            Ext.MessageBox
                                                .alert(
                                                '温馨提示',
                                                '系统检测到您正在使用基于MSIE内核的浏览器<br>我们强烈建议立即切换到<b><a href="http://firefox.com.cn/" target="_blank">FireFox</a></b>或者<b><a href="http://www.google.com/chrome/?hl=zh-CN" target="_blank">GoogleChrome</a></b>浏览器体验飞一般的感觉!'
                                                + '<br>如果您还是坚持使用IE,那么请使用基于IE8内核的浏览器登录!')
                                            return;
                                        }
                                        login();
                                    } else {
                                        login();
                                    }
                                }

                            }
                        ]
                    }
                ]

            }
        ],
        listeners: {
            afterrender: function () {
                setTimeout(function () {
                    var account = Ext.getCmp('loginForm').query("#account");
                    var password = Ext.getCmp('loginForm').query("#password");
                    var rememberpassword = Ext.getCmp('loginForm').down("#remember-password");
                    var c_account = getCookie('eredg4.login.account');
                    var c_password = getCookie('eredg4.login.password');
                    var c_rememberpassword = getCookie('eredg4.login.rememberpassword');
                    rememberpassword.setValue(c_rememberpassword)
                    account[0].setValue(c_account);
                    account[0].focus();
                    if (c_rememberpassword == 'true') {
                        password[0].setValue(c_password);
                    } else {
                        password[0].setValue('');
                    }
                    if (Ext.isEmpty(c_account)) {
                        account[0].focus();
                    } else {
                        password[0].focus();
                    }
                }, 200);

            }

        }
    });

    var addUserFormPanel = Ext.create('Ext.form.Panel', {
        id: 'addUserFormPanel',
        name: 'addUserFormPanel',
        fieldDefaults: {
            labelWidth: 65,
            labelAlign: 'right'
        },
        defaultType: 'textfield',
        bodyStyle: 'padding:5 5 5 5',
        frame: false,
        items: [
            {
                fieldLabel: '登录帐户',
                name: 'account',
                allowBlank: false,
                emptyText: '请使用Email作为G4帐户',
                regex: /^([\w]+)(.[\w]+)*@([\w-]+\.){1,5}([A-Za-z]){2,4}$/,
                regexText: '请以电子邮箱地址作为G4帐户',
                maxLength: 30,
                anchor: '99%'
            },
            {
                fieldLabel: '姓名/昵称',
                name: 'username',
                allowBlank: false,
                anchor: '99%'
            },
            {
                fieldLabel: '密码',
                name: 'password',
                inputType: 'password',
                allowBlank: false,
                anchor: '99%'
            },
            {
                fieldLabel: '确认密码',
                name: 'password1',
                inputType: 'password',
                allowBlank: false,
                anchor: '99%'
            }
        ]
    });

    var addUserWindow = Ext.create('Ext.window.Window', {
        layout: 'fit',
        width: 280,
        height: 185,
        resizable: false,
        draggable: false,
        closeAction: 'hide',
        title: '<span style="font-weight:normal">注册新帐户</span>',
        iconCls: 'group_addIcon',
        modal: true,
        collapsible: false,
        maximizable: false,
        border: false,
        animCollapse: true,
        animateTarget: Ext.getBody(),
        constrain: true,
        items: [addUserFormPanel],
        fbar: {
            layout: {pack: 'right'}, items: [
                {
                    text: '保存',
                    iconCls: 'acceptIcon',
                    handler: function () {
                        regAccount();
                    }
                },
                {
                    text: '重置',
                    id: 'btnReset',
                    iconCls: 'tbar_synchronizeIcon',
                    handler: function () {
                        clearForm(addUserFormPanel.getForm());
                    }
                }
            ]
        }
    });

    /**
     * 提交登陆请求
     */
    function login() {
        var account = Ext.getCmp('loginForm').query('#account');
        var password = Ext.getCmp('loginForm').query('#password');
        if (!Ext.isEmpty(password[0].getValue()) && !Ext.isEmpty(account[0].getValue())) {
            var params = {
                account: account[0].getValue(),
                password: password[0].getValue()
            }
            showWaitMsg('正在验证您的身份,请稍候.....');
            Ext.Ajax.request({
                url: 'login.ered?reqCode=login',
                success: function (response) {
                    var result = Ext.JSON.decode(response.responseText)
                    if (result.success) {
                        setCookie("eredg4.login.account", account[0].getValue(), 240);
                        setCookie("eredg4.login.password", password[0].getValue(), 240);
                        setCookie("eredg4.login.userid", result.userid, 240);
                        setCookie("g4.lockflag", '0', 240);
                        window.location.href = 'index.ered?reqCode=indexInit';
                    } else {
                        var errmsg = result.msg;
                        var errtype = result.errorType;
                        Ext.Msg.alert('提示', errmsg, function () {
                            if (errtype == '1') {
                                clearForm(Ext.getCmp('loginForm'));
                                account[0].focus();
                                account[0].validate();
                            } else if (errtype == '2') {
                                password[0].focus();
                                password[0].setValue('');
                            } else if (errtype == '3') {
                                account[0].focus();
                            }
                        });
                    }

                },
                failure: function (response, options) {
                    alert('数据提交失败，请联系工作人员解决')
                },
                params: params
            });
        } else {
            Ext.Msg.alert('提示', '请输入有效的帐号或密码');
        }
    }

    /**
     * 注册新帐户
     */
    function regAccount() {
        if (!addUserFormPanel.form.isValid()) {
            return;
        }
        var values = addUserFormPanel.getForm().getValues();
        if (values.password1 != values.password) {
            Ext.Msg.alert('提示', '两次输入的密码不匹配,请重新输入!');
            Ext.getCmp('password').setValue('');
            Ext.getCmp('password1').setValue('');
            return;
        }

        addUserFormPanel.form.submit({
            url: 'login.ered?reqCode=regAccount',
            waitTitle: '提示',
            method: 'POST',
            waitMsg: '正在处理数据,请稍候...',
            success: function (form, action) {
                addUserWindow.hide();
                Ext.MessageBox.alert('提示', '帐户注册成功,点击[登录]按钮进入系统!');
                var password = Ext.getCmp('loginForm')
                    .query('#password');
                var account = Ext.getCmp('loginForm')
                    .query('#account');
                password[0].setValue(values.password);
                account[0].setValue(values.account);
            },
            failure: function (form, action) {
                Ext.MessageBox.alert('提示', action.result.msg);
            }
        });
    }


    // 演示模式
    // if (runMode == '0') {
//    Ext.getCmp('id_reg_panel').show();
    // }

});
