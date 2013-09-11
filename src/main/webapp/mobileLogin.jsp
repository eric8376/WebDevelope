<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<title>系统登入</title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/style/touch/ext-touch.css" type="text/css" media="screen">
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/ext-touch.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/cookies.js"></script>
</head>
<body>

</body>
<script  type="text/javascript">
function loadCookie()
{
	var userName=getCookie("userName");
	var password=getCookie("password");
	var isRemember=getCookie("isRemember");
	
	if(userName!="")
	{
		
	Ext.getCmp('userName').setValue(userName);
	}
	
	//Ext.getCmp('isRemember').setValue(1);
	if(isRemember==1)
	{
	Ext.getCmp('password').setValue(password);
	}
	
}
function saveCookie()
{
	var userName=Ext.getCmp('userName').getValue();
	var password=Ext.getCmp('password').getValue();
	var isRemember=Ext.getCmp('isRemember').getValue();
	setCookie("userName",userName,10);
	setCookie("password",password,10);
	setCookie("isRemember",isRemember,10);
}
Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function() {
        Ext.regModel('User', {
            fields: [
                {name: 'name',     type: 'string'},
                {name: 'password', type: 'password'}
            ]
        });

        var formBase = {
            scroll: 'vertical',
            url   : ' ',
            standardSubmit : false,
            items: [
                {
                    xtype: 'fieldset',
                    title: '用户登入',
                    defaults: {
                        required: true,
                        labelAlign: 'left'
                    },
                    items: [{
                        xtype: 'textfield',
                        id : 'userName',
                        name : 'userName',
                        label: '用户名',
                        showClear: true,
                        required:true,
                        autoCapitalize : false
                    }, {
                        xtype: 'passwordfield',
                        id : 'password',
                        name : 'password',
                        required:true,
                        label: '密码'
                    },{
                        xtype: 'togglefield',
                        name: 'isRemember',
                        id:'isRemember',
                        label: '记住密码',
                        checked:true,
                        listeners : {
                       
                    }
                    },
                    
                    ]
                }
            ],
            listeners : {
                submit : function(form, result){
                    console.log('success', Ext.toArray(arguments));
                },
                exception : function(form, result){
                    console.log('failure', Ext.toArray(arguments));
                },
                afterrender :function()
                {
                	loadCookie();
                }
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {xtype: 'spacer'},
                        {
                            text: '登入',
                            ui: 'confirm',
                            handler: function() {
                            	var username = Ext.getCmp('userName').getValue();
                            	var password = Ext.getCmp('password').getValue();
                            	if(username==""){
                            		Ext.Msg.alert('提示', '请输入用户名！', Ext.emptyFn);
									return ;
                                }
                            	if(password==""){
                            		Ext.Msg.alert('提示', '请输入密码！', Ext.emptyFn);
                            		return ;
                                }
                            	saveCookie();
                            	form.setLoading(true)
                        		Ext.Ajax.request({
                        			url: '<%=request.getContextPath()%>/login.spr?action=queryLogin',
                        			params:{'userName':username,'password':password},
                        	        success: function(response, opts) {
                            	        if(response.responseText=='0'){
                        					window.location = '<%=request.getContextPath()%>/main/touch/mainMenu.jsp';
                        				}else{
                        					form.setLoading(false);
                        					Ext.Msg.alert('提示', '用户名密码错误或者不存在！', Ext.emptyFn);
                            			}
                        			}

                            	});
                        		
                                
                            }
                        }, {
                            text: '取消',
                            handler: function() {
                                form.reset();
                            }
                        },
                        {xtype: 'spacer'},
                    ]
                }
            ]
        };
        
        if (Ext.is.AndroidOS) {
            formBase.items.unshift({
                xtype: 'component',
                styleHtmlContent: true,
                html: '<span style="color: red">Forms on Android are currently under development. We are working hard to improve this in upcoming releases.</span>'
            });
        }
        
        if (Ext.is.Phone) {
            formBase.fullscreen = true;
        } else {
            Ext.apply(formBase, {
                autoRender: true,
                floating: true,
                modal: true,
                centered: true,
                hideOnMaskTap: false,
                height: 385,
                width: 480
            });
        }
        
        form = new Ext.form.FormPanel(formBase);
        form.show();
    }
});

</script>


</html>