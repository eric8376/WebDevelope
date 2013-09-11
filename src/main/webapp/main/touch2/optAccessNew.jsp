<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>接入点拓扑图</title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/style/touch/touchui_unicom.css" type="text/css" media="screen">

<script  type="text/javascript">
var contextPath='<%=request.getContextPath()%>';
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/touchui_debug.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/pagegrid.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/app/optAccessNew.js"></script>

<body>

</body>
<script  type="text/javascript">
var currentList;
dhx.ui({
	view : "multiview", /* this parameter can be amitted */
	cells : [
	searchView,
	topoView]
});
 $$("queryTabber").attachEvent("onBeforeTabClick",function(button,id){

                currentList=$$(id);
                currentList.show();
                return true

            });
function doSearch()
{
	var siteName = $$('searchbar').getValues()['searchText'];
	if(siteName!="") 
	{
		currentList.param="&siteName="+siteName;
	}else {currentList.param="";}
	var url=currentList.config.url;
	currentList.clearAll();
	currentList.load(url);
}
function doTopoView()
{
	var epqTpye=currentList.config.epqTpye;
	var seletedId=currentList.getSelected();
	if(seletedId=="")
	{
		dhx.alert({title:"提示",message:"请选中一条记录"});
		return;
	}
	var rootId=currentList.item(seletedId).ID;
	var url="<%=request.getContextPath()%>/ajaxParam.spr?action=queryOpticalMaplayer&topoDefId=430016&hierarchy=1&typeId="+epqTpye+"&rootId="+rootId;
	dhx.ajax(url,function(text,xml)
			{
		var selectMAPLAYER_ID=text;
		if(selectMAPLAYER_ID=="")
		{
			dhx.alert({title:"提示",message:"拓扑图不存在"});
			return;
		}
		url="/main/touch/testTwaverOptAccessTopo.jsp?maplayerId=";
		var src=window.location.protocol+"//"+window.location.host+contextPath+url+selectMAPLAYER_ID;
		
		//src="http://10.45.28.33:7001/shResWeb2/main/touch/testTwaverOptAccessTopo.jsp?maplayerId=000100130000000007394181";
		$$('topoFrame').src_setter(src);
		$$('topoView').show();
			});
	
	
}
currentList=$$("houseView_list");
function doBack()
{
	$$('mainview').show();
}
            

</script>
</html>