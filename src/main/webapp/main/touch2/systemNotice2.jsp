<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="<%=request.getContextPath()%>/style/touch/touchui.css" type="text/css" media="screen">
<title>系统公告</title>
<script  type="text/javascript">
var contextPath='<%=request.getContextPath()%>';
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/touchui_debug.js"></script>

</head>
<body>

</body>
<script  type="text/javascript">
var profile_html = dhx.Template('\<div class="user_profile">\<div class="value" style="text-align:center;font-weight:bold">#NOTICENAME#\</div>\<hr>\<div class="noticecontent">#NOTICECONTENT#\</div>\</div>');

 
var sysnoticePanel= {
		view: 'layout',
		type: 'wide',
		rows:[
		      {
		  		view : "toolbar",
				id : "mainbar",
				type : "MainBar",
				data : [

				{
					type : "label",
					label : "公告栏",
					id : 'logo',
					align : 'center'
				}]
			},	
		{cols: [
                      { view:"list", 
                	    id:"noticeList", 
                        url:'<%=request.getContextPath()%>/notice.spr?action=queryNotice', 
                        datatype:"json",
                        template:"#NOTICENAME#",
                        select:true, 
                        type: { width: 300 },
                        click: 'load_details'},
					{ id:"user_view", view:"template", template: profile_html }
			]}
			]
		};
dhx.ui(sysnoticePanel);
function load_details(id)
{
	var data = $$('noticeList').item(id);
	$$('user_view').parse(data, "json");
}
$$("noticeList").attachEvent("onitemclick",load_details);
$$("noticeList").attachEvent("onafterrender",function()
		{
	var selectid=$$("noticeList").last();
	$$("noticeList").select(selectid);
	load_details(selectid);
	})


</script>


</html>