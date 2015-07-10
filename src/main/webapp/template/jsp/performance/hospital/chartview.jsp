<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>医院全面质量与绩效考核系统</title>
<jsp:include page="../include/include.jsp" />
<script src="<%=request.getContextPath()%>/js/echart/echarts-all.js"></script>
<script language="javascript" src="<%=request.getContextPath()%>/js/performance/hospital/chartview.js"></script>
<link rel="stylesheet" href="<%=request.getContextPath()%>/js/dhtmlx/dhtmlx.css" type="text/css" media="screen"><link rel="stylesheet" href="<%=request.getContextPath()%>/js/dhtmlx/dhtmlx_custom.css" type="text/css" media="screen">
<style>
.dhx_axis_item_x{
-webkit-transform: rotate(45deg);
-moz-transform: rotate(45deg);
-o-transform:rotate(45deg);
-ms-transform: rotate(45deg);
transform: rotate(45deg);
}
</style>
</head>
<body>
<div id="chart_container" style="border:1px solid #A4BED4;width:10px;height:10px;">
</div>
</body>
</html>