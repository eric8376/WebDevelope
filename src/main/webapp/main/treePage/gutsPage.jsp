<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title></title>
<script type="text/javascript" src="js/treePage.js"></script>
<link rel="stylesheet" href="/RES/inc/tab/css/tab-view.css" type="text/css" media="screen">
<script type="text/javascript" src="/RES/inc/tab/js/ajax.js"></script>
<script type="text/javascript" src="/RES/inc/tab/js/tab-view.js"></script>
<script type="text/javascript" src="/RES/inc/js/common.js"></script>
<style type="text/css">
	body{
		margin:0px;
		font-size:0.9em;
	}
	a{
		color:#F00;
	}
	.clear{
		clear:both;
	}
	</style>
</head>

<body onload='init();'>
<div id='tabDiv'>
	<div id='tab1' class="dhtmlgoodies_aTab">
		<iframe frameborder="0" id="dianLuTab" scrolling="auto" name="dianLuTab" src="dianLuTab.jsp" width="100%" height="100%" style="padding: 0px"></iframe>
	</div>
	<div id='tab2' class="dhtmlgoodies_aTab">
		<iframe frameborder="0" id="sheBeiTab" scrolling="auto" name="sheBeiTab" src="sheBeiTab.jsp" width="100%" height="100%" style="padding: 0px"></iframe>
	</div>
	<div id='tab3' class="dhtmlgoodies_aTab">
		<iframe frameborder="0" id="jiFangTab" scrolling="auto" name="jiFangTab" src="jiFangTab.jsp" width="100%" height="100%" style="padding: 0px"></iframe>
	</div>
	<div id='tab4' class="dhtmlgoodies_aTab">
		<iframe frameborder="0" id="chuanShuTab" scrolling="auto" name="chuanShuTab" src="chuanShuTab.jsp" width="100%" height="100%" style="padding: 0px"></iframe>
	</div>
</div>
</body>
<script>
var deptId=GetUrlParameter('deptId');
function init(){
	if(deptId!=null&&deptId!=''){
		document.getElementsByTagName("iframe")["dianLuTab"].src="dianLuTab.jsp?deptId="+escape(deptId);
		document.getElementsByTagName("iframe")["sheBeiTab"].src="sheBeiTab.jsp?deptId="+escape(deptId);
		document.getElementsByTagName("iframe")["jiFangTab"].src="jiFangTab.jsp?deptId="+escape(deptId);
		document.getElementsByTagName("iframe")["chuanShuTab"].src="chuanShuTab.jsp?deptId="+escape(deptId);
	}
	initTabs('tabDiv',Array('电路列表','两端设备列表','机房拓扑图','传输网元拓扑图'),0,'100%','97%');
}
</script>
</html>