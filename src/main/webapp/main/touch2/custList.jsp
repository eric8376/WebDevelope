<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>大客户视图</title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/style/touch/touchui_unicom.css" type="text/css" media="screen">

<script  type="text/javascript">
var contextPath='<%=request.getContextPath()%>';
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/touchui_debug.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/pagegrid.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/app/custList.js"></script>
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
var toolBarItem=[{
	type : "button",
	label : "详细信息",
	align : "right",
	id : 'circuit_view_showDetail',
	click : "showDetail"
},
{
	type : "button",
	label : "光纤拓扑图",
	align : "right",
	id : 'circuit_view_topo',
	click : "showGQtopo"
}];
//列表
dhx.ui({
	    id:"parentView",
	    view:"multiview",
	    cells:
		[
		custView,
		topoView,
		getGridView('circuit_view',"电路/光路列表",circuit_view_list,toolBarItem),
		getGridDetailView('bothDevice_view',"两端设备列表",bothDevice_view_list),
		getGridDetailView('netdesc_view',"网络描述",netdesc_view_list),
		getGridView('custinfo_view',"客户信息",custinfo_view_list),
		getGridView('detail_view',"详细信息",detail_view_list)
		
		]
		});
//弹出菜单
dhx.ui({
	view:"popup",
	id:"saveMenu",
	body:{
		view:"list",
		id:"saveMenuList",
		url:"custListMenu.xml", datatype:"xml",
		select:true, yCount:8,
        type: {
            width: 160
        }
	}
}).hide();
var currentId="custList1";
var lastView=new Array();
//事件处理
$$("saveMenuList").attachEvent("onitemclick",menuHandler);
//$$("listMode").attachEvent("onitemclick",listModeHandler);
function listModeHandler(id,evt,trg)
{
	var value=evt.srcElement.defaultValue;
	var targetObj,sourceObj;
	if(value=="列表模式")
	{
		if(currentId=="custList1") return;
		currentId="custList1";
		targetObj=$$("custList1");	
	}
	else if(value=="图标模式")
	{
		if(currentId=="custList2") return;
		currentId="custList2";
		targetObj=$$("custList2")?$$("custList2"):dhx.ui._view(custList2);	
	}
	var layoutObj=$$("custView");
	layoutObj.replace(layoutObj._cells[2],targetObj);
}
function updateLastView()
{
	
	var index=$$("parentView")._active_cell;
	lastView.push($$("parentView")._cells[index]);
	
	
	
}
function menuHandler(id,evt,trg)
{
	var menuItem=$$("saveMenuList").item(id);
	var itemId=$$(currentId).getSelected();
	if(itemId=="")
	{
		dhx.alert({title:"提示",message:"请选中一条记录。"});
		return;
	}
	var selectObj=$$(currentId).item(itemId);

	updateLastView();
    if(menuItem.type=="view")
    {
        var url=contextPath+menuItem.url+"&custId="+selectObj.CUST_ID;
    	$$(menuItem.viewName+"_list").load(url);
    	$$(menuItem.viewName).show();
    	
    	//$$(menuItem.viewName).load("http://10.203.19.15:7001/shResWeb/cust.spr?action=queryCircuits&_dc=1300969202472&custId=207620&limit=25");
    }
    else if(menuItem.type=="url")
    {
    	doGoTopo(menuItem.url);
    }

    $$('saveMenu').hide();	
} 
function showGQtopo()
{
	var index=$$("parentView")._active_cell;
	var view_id=$$("parentView")._cells[index].config.id+"_list";
    var selectId=$$(view_id).getSelected();
    if(selectId=="")
	{
		dhx.alert({title:"提示",message:"请选中一条记录。"});
		return;
	}
	var CUST_ID=$$(view_id).item(selectId).CIRCUIT_ID;
	var url="/main/touch/testTwaverOptTopo.jsp?custId=";
	var src=window.location.protocol+"//"+window.location.host+contextPath+url+CUST_ID;
	$$('topoFrame').src_setter(src);
	$$('topoView').show();
	updateLastView();
}
function doGoTopo(url)
{
	var seletedId=$$(currentId).getSelected();
	var CUST_ID=$$(currentId).item(seletedId).CUST_ID;
	var src=window.location.protocol+"//"+window.location.host+contextPath+url+CUST_ID;
	$$('topoFrame').src_setter(src);
	$$('topoView').show();
}
function doBack()
{
	//$$('custView').show();
	lastView.pop().show();
	
}
function showDetail()
{
	var index=$$("parentView")._active_cell;
	var view_id=$$("parentView")._cells[index].config.id+"_list";
    var selectId=$$(view_id).getSelected();
    if(selectId=="")
	{
		dhx.alert({title:"提示",message:"请选中一条记录。"});
		return;
	}
	var selectObj = $$(view_id).item(selectId);
	var fieldsList=$$(view_id).config.fields;
	var data=new Array();
	for(var fieldItem in fieldsList)
	{
		var value=selectObj[fieldItem];
		var key=fieldsList[fieldItem].label;
		if(key=="电路/光路路由")
		{
			value="<div>";

			value += "<input onclick=\"queryRouter('"+selectObj["CIRCUIT_ID"]+"');\" type='button'  value='查询路由'>";

			value += "</div>";
		}
		data.push({"key":key,"value":value});
	}
	updateLastView();
	$$("detail_view_list").clearAll();
	$$("detail_view_list").parse(data);
	$$("detail_view").show();
}
function queryRouter(CIRCUIT_ID)
{
	var url="<%=request.getContextPath()%>/ajaxParam.spr?action=queryRouterDetail&CIRCUIT_ID="+CIRCUIT_ID;
	dhx.ajax(url,function(text,xml)
			{
		//alert(text);
		var routerTxt=text;
		if(routerTxt=="")
		{
			dhx.alert({title:"提示",message:"不存在路由"});
			return;
		}
		
		var id=$$("detail_view_list").idByIndex(5);
		$$("detail_view_list").update(id,{key:"电路/光路路由",value:routerTxt});
		
			});
	
}



</script>


</html>