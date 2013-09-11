<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<title>系统登入</title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/style/touch/touchui_unicom.css" type="text/css" media="screen">
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/touchui.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/cookies.js"></script>
<style type="text/css">
.leftBar
{
background-image:url(./style/touch/images/unicom/login/left.pngs);
}
.titleBar
{
width:100%;
background-image:url(./style/touch/images/unicom/login/title.pngs);
}
</style>
</head>
<body>

</body>
<script  type="text/javascript">
var left_html = dhx.Template('\<div class="leftBar" style="width:360;height:207">&nbsp;</div>');
var title_html = dhx.Template('\<div class="titleBar" style="width:700;height:44">&nbsp;</div>');
function loadCookie()
{
	var userName=getCookie("userName");
	var password=getCookie("password");
	var isRemember=getCookie("isRemember");
	
		
	
	
	//Ext.getCmp('isRemember').setValue(1);
	if(isRemember==1)
	{
		$$('loginForm').setValues({'userName':userName,'isRemember':isRemember,'password':password});
	
	}else
	{
		$$('loginForm').setValues({'userName':userName,'isRemember':isRemember});
	}
	
}
function saveCookie()
{
	var values=$$('loginForm').getValues();
	setCookie("userName",values['userName'],10);
	setCookie("password",values['password'],10);
	setCookie("isRemember",values['isRemember'],10);
}
dhx.ui.passive.password = dhx.extend({
	render: dhx.Template(function(config) {
		return dhx.ui.passive.common.render_input(config, "text").replace("type='text'","type='password'");
	})
}, dhx.ui.passive.text);
dhx.ready(function(){ 
    dhx.ui({
       view:"window",
   	   head:{
    	    id:"titlebar", 
            view:"template", 
            template: title_html
         
   		},
       body:{
   	       type:"clean",
   	       cols:[
            { id:"leftbar", 
                view:"template", 
                template: left_html
             },
   	              	       
   			{ view:"form", id:"loginForm", 
   	   			data:[
   	   	   			{type:"text", id:"userName",name:"userName", label: '用户名',align:'center'},
   	   	   	        {type:"password", id:"password",name:"password", label: '密码',align:'center'},
   	   	   	        {type:"checkbox", id:"isRemember", label: '记住密码',align:'center',value:true},
   	   	   	        {type:"formbutton", id:"logon", label: '登录',width:120,align:'center',click:'logon'},
   	   	            {type:"formbutton", id:"reset", label: '重置',sameLine:true,width:120,align:'center',click:'reset'}
   			]
   			}]
   			
   		 },
   	  top:200,
      left:200,
      width:700,
      height:250,
      position:'center',
      move:false
     
           
         
    });
    //$$('loginForm').attachEvent('onafterrender', loadCookie);
    loadCookie();
    
})
function reset()
{
	$$('loginForm').clear();
}
function logon()
{
	saveCookie();
	var values=$$('loginForm').getValues();
	
	 var url='<%=request.getContextPath()%>/login.spr?action=queryLogin';
	 dhx.ajax().get(url,{"userName":values['userName'],"password":values['password']},function(text,xml){
		 if(text=='0'){
				window.location = '<%=request.getContextPath()%>/main/touch2/mainMenu.jsp';
			}else{
				//form.setLoading(false);
				dhx.alert({
					title:"提示",
					message:"用户名和密码不存在"
				});
			}
		
		 });
	 
	 
}
   

</script>


</html>