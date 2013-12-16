<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@page import="java.util.*" %>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>医院全面质量与绩效考核系统</title>
<jsp:include page="../include/include.jsp" />

<script language="javascript" src="<%=request.getContextPath()%>/js/dhtmlx/dhtmlxtree_start.js"></script>
<script language="javascript" src="<%=request.getContextPath()%>/js/performance/BGM/workbench.js"></script>
<%
   Map loginedUserInfo=(Map)request.getSession().getAttribute("token");
%>
<script type="text/javascript">
var contextPath='<%=request.getContextPath()%>';
var loginedUserInfo={};
loginedUserInfo.realName='<%=loginedUserInfo.get("REAL_NAME") %>';
loginedUserInfo.ks='<%=loginedUserInfo.get("ks") %>';
loginedUserInfo.jb='<%=loginedUserInfo.get("jb") %>';
loginedUserInfo.bm='<%=loginedUserInfo.get("bm") %>';
loginedUserInfo.hospId='<%=loginedUserInfo.get("hosp_id") %>';
loginedUserInfo.roleName='<%=loginedUserInfo.get("role_name") %>';

</script>
<link rel="stylesheet" href="<%=request.getContextPath()%>/js/dhtmlx/dhtmlx.css" type="text/css" media="screen">

<style type="text/css">
.fn{
background-color:#b6cdec;
}
a:hover {color: #FF00FF}
a:active {color: #0000FF}
 html, body {
                      width: 100%;
                      height: 100%;
                      margin: 0px;
                      overflow: hidden;
              }

</style>
</head>
<body>






 
</body>
</html>