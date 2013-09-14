<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@page import="java.util.*" %>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>医院全面质量与绩效考核系统</title>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/dhtmlx/dhtmlx.js"></script>
<script language="javascript" src="<%=request.getContextPath()%>/inc/json/json.js"></script>

<script language="javascript" src="<%=request.getContextPath()%>/js/jquery.js"></script>
<script language="javascript" src="<%=request.getContextPath()%>/js/base.js"></script>
<script language="javascript" src="<%=request.getContextPath()%>/js/performance/hospital/workbench.js"></script>
<%
   Map loginedUserInfo=(Map)request.getSession().getAttribute("loginedUser");
%>
<script type="text/javascript">
var contextPath='<%=request.getContextPath()%>';
var loginedUserInfo={};
loginedUserInfo.realName='<%=loginedUserInfo.get("REAL_NAME") %>';
loginedUserInfo.ks='<%=loginedUserInfo.get("ks") %>';
loginedUserInfo.jb='<%=loginedUserInfo.get("jb") %>';
loginedUserInfo.bm='<%=loginedUserInfo.get("bm") %>';
loginedUserInfo.hospId='<%=loginedUserInfo.get("hosp_id") %>';

</script>
<link rel="stylesheet" href="<%=request.getContextPath()%>/js/dhtmlx/dhtmlx.css" type="text/css" media="screen"><link rel="stylesheet" href="<%=request.getContextPath()%>/js/dhtmlx/dhtmlx_custom.css" type="text/css" media="screen">
<style type="text/css">
.fn{
background-color:#b6cdec;
}
a:hover {color: #FF00FF}
a:active {color: #0000FF}
</style>
</head>
<body>

<div id="headerDiv" style="background: url(../images/performance/hospital/banner.jpg);height:80px;width:100%;padding:0px;margin:0px;border:0px;">&nbsp;</div>
<div id="toolbarObj"></div>
<div id="parentId" style="position: relative;   width: 100%; height: 600px; aborder: #B5CDE4 1px solid;"><div class="dhtmlxTree" 
        id="treeboxbox_tree"
        setImagePath="<%=request.getContextPath()%>/js/dhtmlx/imgs/"
        style="width:150px; ">

<ul>
<li><a href="#" onclick="loadPage('manage.spr?action=recordAnalysis');" >记录分析</a></li>
<li><a href="#" onclick="loadPage('manage.spr?action=recordManage');" >记录管理</a></li>
<li><a href="#" onclick="loadPage('manage.spr?action=searchRecord');">记录搜索</a></li>
<%if(loginedUserInfo!=null&&(loginedUserInfo.get("jb").equals("0")||loginedUserInfo.get("bm").equals("bm"))){ 
%>
<li><a href="#" onclick="loadPage('manage.spr?action=addRecord');">记录录入</a></li>
<% }%>
<%if(loginedUserInfo!=null&&(loginedUserInfo.get("jb").equals("0")||loginedUserInfo.get("jb").equals("2"))){ 
%>
<li><a href="#" onclick="loadPage('manage.spr?action=userManage');">用户管理</a></li>
<% }%>
<%if(loginedUserInfo!=null&&(loginedUserInfo.get("jb").equals("0"))){ 
%>

<li><a href="#" onclick="loadPage('manage.spr?action=roomManage&roomType=ks');">科室管理</a></li>
<li><a href="#" onclick="loadPage('manage.spr?action=roomManage&roomType=bm');">部门管理</a></li>
<li><a href="#" onclick="loadPage('manage.spr?action=projectManage');">项目管理</a></li>
<% }%>
</ul>
</ul>

</div></div>



 
</body>
</html>