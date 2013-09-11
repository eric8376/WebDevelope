<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="<%=request.getContextPath()%>/style/touch/touchui_unicom.css" type="text/css" media="screen">
<title>系统公告</title>
<script  type="text/javascript">
var contextPath='<%=request.getContextPath()%>';
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/touchui_debug.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/pagegrid.js"></script>
<style type="text/css">
.noticecontent
{
	background-image:url(../../style/touch/images/unicom/bg/noticebg.png);
	height:600;
}
.noticename
{
	 background-image: url(../../style/touch/imgs/horizontal_repeat_bgs.png);

    background-repeat: repeat-x;

    background-position: 0 -45px;

    font-weight: bold;

    font-size: 20px;

    text-decoration: none;

    color: #3A3A3A;
    padding:10;
	
}
</style>
</head>
<body>

</body>
<script  type="text/javascript">
var profile_html = dhx.Template('\<div class="user_profile">\<div class="noticename" style="text-align:center;font-weight:bold">#NOTICENAME#\</div>\<div class="noticecontent">#NOTICECONTENT#\</div>\</div>');

 
var sysnoticePanel=
{
		id:"sysnoticePanel",
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
{ view:"pagegrid", 
    id:"noticeList", 
    url:'<%=request.getContextPath()%>/notice.spr?action=queryNotice', 
    datatype:"json",
    fields:[
			{
				id:"NOTICENAME",
				label:"标题",
				width:document.width,
				template:'<img height="20"  src="../../style/touch/images/unicom/botice.png"/>#NOTICENAME#'
			}
			
	],
    select:true,
    header:false, 
    type: { width: document.width },
    click: 'load_details',
    defaults:{ 
		
		limit:15,
		page:1
		
	}
}
		]
};

var detailPanel={
		id:"detailPanel",
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
	},
	{
		type : "button",
		label : "返回",
		id : 'back',
		align : 'right',
		click: "doBack"	
	}
	]
},		
{id:"user_view", view:"template", template: profile_html}]
};

dhx.ui({
    view:"multiview",
    cells:
	[
sysnoticePanel,
detailPanel
	
	]
	});
function load_details(id)
{
	var data = $$('noticeList').item(id);
	$$('user_view').parse(data, "json");
	$$('detailPanel').show();
}
$$("noticeList").attachEvent("onitemclick",load_details);
function doBack()
{
	$$("sysnoticePanel").show();
}


</script>


</html>