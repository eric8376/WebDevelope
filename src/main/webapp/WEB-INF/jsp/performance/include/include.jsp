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
	src="<%=request.getContextPath()%>/js/jquery.js"></script>
<script language="javascript"
	src="<%=request.getContextPath()%>/js/base.js"></script>


<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/performance<%=loginedUserInfo.get("relativeInernalContext")%>/dao.js"></script>

<link rel="stylesheet"
	href="<%=request.getContextPath()%>/js/dhtmlx/dhtmlx.css"
	type="text/css" media="screen">


