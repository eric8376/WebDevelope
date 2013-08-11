<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>传输网拓扑图</title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/style/touch/touchui_unicom.css" type="text/css" media="screen">

<script  type="text/javascript">
var contextPath='<%=request.getContextPath()%>';
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/touchui_debug.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/pagegrid.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/app/testTrsSys.js"></script>
</head>
<body>

</body>

<script  type="text/javascript">
dhx.ui(config);
function doSearch()
{
	var trsSysName = $$('searchbar').getValues()['searchText'];
	if(trsSysName!="") 
	{
		$$("trysysView_list").param="&trsSysName="+trsSysName;
	}else {$$("trysysView_list").param="";}
	var url=$$("trysysView_list").config.url;
	
	$$("trysysView_list").clearAll();
	$$("trysysView_list").load(url);
}

function doBack()
{
	$$('mainview').show();
}
function doTopoView()
{
	
	var seletedId=$$("trysysView_list").getSelected();
	if(seletedId=="")
	{
		dhx.alert({title:"提示",message:"请选中一条记录。"});
		return;
	}
	var MAPLAYER_ID=$$("trysysView_list").item(seletedId).MAPLAYER_ID;
	var url="/main/touch/testTwaverTrsSysTopo.jsp?maplayerId=";
	var src=window.location.protocol+"//"+window.location.host+contextPath+url+MAPLAYER_ID;
	$$('topoFrame').src_setter(src);
	$$('topoView').show();
}
</script>
</html>