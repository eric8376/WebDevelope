<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title></title>
<style type="text/css">
.divStyle{
	border:1px;
}
.tableGC{
	background:#F3F6FF;
}
</style>
</head>
<script type="text/javascript" src="js/treePage.js"></script>
<script type="text/javascript" src="/RES/inc/xtree/xtree.js"></script>
<link href="/RES/inc/xtree/xtree.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="/RES/inc/js/common.js"></script>
<body onload="treeInit();">
<table width='100%' height='100%' class='tableGC'>
	<tr>
		<td valign="top" width='40%'>
			<div id='treeDiv' style='overflow: auto;'>
			</div>
		</td>
		<td width='60%'>
			<iframe frameborder="0" id="gutsPage" scrolling="no" name="gutsPage" src="gutsPage.jsp" width="100%" height="100%" style="padding: 0px"></iframe>
		</td>
	</tr>
</table>
</body>
<script>
</script>
</html>