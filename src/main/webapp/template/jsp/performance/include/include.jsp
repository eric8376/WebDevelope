<%@page import="java.util.Map"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="utf-8"%>
<%
	Map loginedUserInfo = (Map) request.getSession().getAttribute(
			"token");
%>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/dhtmlx/dhtmlx.js"></script>
<script language="javascript"
	src="<%=request.getContextPath()%>/js/jquery-1.9.1.min.js"></script>
<script language="javascript"
	src="<%=request.getContextPath()%>/js/base.js"></script>
<script language="javascript" src="<%=request.getContextPath()%>/js/helper/dhtmlxhelper.js"></script>
<% if(loginedUserInfo !=null) {%>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/performance<%=loginedUserInfo.get("relativeInernalContext")%>/bussiness.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/performance<%=loginedUserInfo.get("relativeInernalContext")%>/dao.js"></script>
<% } %>
<!--  script src="http://s4.cnzz.com/z_stat.php?id=1253352188&web_id=1253352188" language="JavaScript"></script-->
<link rel="stylesheet" href="<%=request.getContextPath()%>/js/dhtmlx/dhtmlx_skyblue.css" type="text/css" media="screen">
<!--link rel="stylesheet" href="<%=request.getContextPath()%>/js/dhtmlx/dhtmlx_terrace.css" type="text/css" media="screen">
<link rel="stylesheet" href="<%=request.getContextPath()%>/js/dhtmlx/dhtmlx_web.css" type="text/css" media="screen"-->	
	<link rel="stylesheet"
	href="<%=request.getContextPath()%>/style/base.css"
	type="text/css" media="screen">


