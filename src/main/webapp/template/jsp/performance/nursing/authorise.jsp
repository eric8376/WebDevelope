<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>医院全面质量与绩效考核系统</title>
<jsp:include page="../include/include.jsp" />
<script language="javascript" src="<%=request.getContextPath()%>/js/performance/nursing/authorise.js"></script>
<link rel="stylesheet" href="<%=request.getContextPath()%>/js/dhtmlx/dhtmlx.css" type="text/css" media="screen"><link rel="stylesheet" href="<%=request.getContextPath()%>/js/dhtmlx/dhtmlx_custom.css" type="text/css" media="screen">
</head>
<input type="button" value='保存'onclick="saveMap();"/>
<input type="button" value='返回' onclick="parent.loadPage('manage.spr?action=userManage');"/>
<body>

<div id="gridbox" style="position: relative;   width:100%; height: 600px; aborder: #B5CDE4 1px solid;"></div>

</body>
</html>