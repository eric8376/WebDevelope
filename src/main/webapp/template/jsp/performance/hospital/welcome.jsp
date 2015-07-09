<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="java.util.*" %>  
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%
   Map loginedUserInfo=(Map)request.getSession().getAttribute("token");
%>
</head>
<body>
<%if(loginedUserInfo!=null){ 
%>

<div style="text-align:left;background-color: rgb(255,230,246);padding: 60px;" >
亲爱的用户您好,欢迎您的登录。<br>
<p>您当前使用的是【<%=loginedUserInfo.get("hosp_name")%>】医院的全面质量与绩效考核系统 。</p>
<p>您是【<%=loginedUserInfo.get("KS_TEXT")%>】 科室的【<%=loginedUserInfo.get("REAL_NAME") %>】。</p>
<p>您拥有：【<%=loginedUserInfo.get("ROLE_TEXT") %>】权限。</p>
</div>
<% }%>
</body>
</html>