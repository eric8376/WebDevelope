<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="java.util.*" %>  
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%
   Map loginedUserInfo=(Map)request.getSession().getAttribute("loginedUser");
%>
</head>
<body>
<%if(loginedUserInfo!=null){ 
%>

<div style="text-align:left;" >当前登陆的医院是：<%=loginedUserInfo.get("hosp_name")%></br>
欢迎 :<%=loginedUserInfo.get("KS_TEXT")%> 的<%=loginedUserInfo.get("REAL_NAME") %>,您拥有：<%=loginedUserInfo.get("JB_TEXT") %>权限</div>
<% }%>
</body>
</html>