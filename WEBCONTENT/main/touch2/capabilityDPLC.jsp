<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%> 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>资源能力计算</title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/style/touch/touchui_unicom.css" type="text/css" media="screen">

<script  type="text/javascript">
var contextPath='<%=request.getContextPath()%>';
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/touchui_debug.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/pagegrid.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/app/DPLC.js"></script>
</head>

<body>
</body>
<script type="text/javascript">
function loadStrate()
{
var url="<%=request.getContextPath()%>/ajaxParam.spr?action=queryStrategys&prodId=000000000000000000001004";
dhx.ajax(url,function(text,xml)
		{
	dhx.exec("var result="+text);
	var root=result.list;
	var dataArray=new Array();
	dataArray.push({id:"0",value:"....请选择"})
	for(var i=0;i<root.length;i++)
	{
		dataArray.push({id:root[i].strategyId,value:root[i].strategyDesc});
	}
	$$("conditionfrom").update("strategySel",{type:"list",name:"strategySel", id: "strategySel", label: '接入方式 ' ,template:"#value#",value:0,labelWidth:300,width:600,data:dataArray});
	$$("conditionfrom").refresh("strategySel");

	//$$("conditionfrom").item('strategySel');
	
	
	});
}

function loadAtom()
{
url="<%=request.getContextPath()%>/ajaxParam.spr?action=queryStrategyGroup";
dhx.ajax(url,function(text,xml)
		{
	dhx.exec("var result="+text);
	alert(result.list[0].srvId);
	alert(result.list[0].srvDesc);
	
	});
}
dhx.ui({ 
    rows:[
          mainbar,
          conditionform,
          resultform,
          footbar
          ]
    });

loadStrate();
</script>
</html>
