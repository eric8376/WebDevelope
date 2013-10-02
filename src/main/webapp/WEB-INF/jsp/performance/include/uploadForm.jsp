<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>文件上传</title>
<jsp:include page="../include/include.jsp" />
<script language="javascript" src="<%=request.getContextPath()%>/js/commons/uploadForm.js"></script>
</head>
<body>
	<a href="<%=request.getContextPath()%>/download/hospital/record/importExample.xls">导入范例下载</a>
	<a href="<%=request.getContextPath()%>/download/hospital/record/importTemplate.xls">导入空模板下载</a>
	<form id="uploadForm" method="POST" enctype="multipart/form-data" action="import.spr">
	<div id="dhxForm">
 
	</div>
</form>
</body>
</html>