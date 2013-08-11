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
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/app/siteQuery.js"></script>
<style type="text/css">
.gridTitleCol
{
background-color: #FCF2F0 ; 
 height:32px;   
}
.gridValueCol
{
background-color:  #FFF;  
height:32px;   
}
</style>
</head>
<body>

</body>

<script  type="text/javascript">
dhx.ui(config);
function doSearch()
{
	var siteName = $$('searchbar').getValues()['searchText'];
	if(siteName!="") 
	{
		$$("trysysView_list").param="&siteName="+siteName;
	}else {$$("trysysView_list").param="";}
	var url=$$("trysysView_list").config.url;
	
	$$("trysysView_list").clearAll();
	$$("trysysView_list").load(url);
}
function showDetail()
{
	 var selectId=$$("trysysView_list").getSelected();
	    if(selectId=="")
		{
			dhx.alert({title:"提示",message:"请选中一条记录。"});
			return;
		}
		var selectObj = $$("trysysView_list").item(selectId);
		var fieldsList=$$("trysysView_list").config.fields;
		var data=new Array();
		for(var fieldItem in fieldsList)
		{
			var value=selectObj[fieldItem];
			var key=fieldsList[fieldItem].label;
			data.push({"key":key,"value":value});
		}
		$$("detail_view_list").clearAll();
		$$("detail_view_list").parse(data);
		$$("detail_view").show();
}
function doBack()
{
	$$('mainview').show();
}
</script>
</html>