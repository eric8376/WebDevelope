<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@page import="java.util.*" %>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>厦门市卫生局医疗机构医疗服务关键环节质量监督管理系统</title>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/dhtmlx3.0/dhtmlx.js"></script>
<script language="javascript" src="<%=request.getContextPath()%>/js/prototype.js"></script>
<script language="javascript" src="<%=request.getContextPath()%>/js/jquery.js"></script>
<script language="javascript" src="<%=request.getContextPath()%>/js/base.js"></script>
<script language="javascript" src="<%=request.getContextPath()%>/js/helper/dhtmlxhelper.js"></script>
<script language="javascript" src="<%=request.getContextPath()%>/js/performance/bureau/workbench.js"></script>
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
loginedUserInfo.userId='<%=loginedUserInfo.get("user_id") %>';
loginedUserInfo.userName='<%=loginedUserInfo.get("user_name") %>';
function changeBg(obj){
	$('li').removeClass('fn');
	$(obj).parent().addClass('fn');
}
</script>
<link rel="stylesheet" href="<%=request.getContextPath()%>/js/dhtmlx3.0/dhtmlx.css" type="text/css" media="screen"><link rel="stylesheet" href="<%=request.getContextPath()%>/js/dhtmlx3.0/dhtmlx_custom.css" type="text/css" media="screen">
<style type="text/css">
.fn{
background-color:#b6cdec;
}
a:hover {color: #FF00FF}
a:active {color: #0000FF}
</style>
</head>
<body>

<div style="background: url(../images/performance/bureau/banner.jpg);height:90px;width:100%;padding:0px;margin:0px;border:0px;">&nbsp;</div>
<div id="parentId" style="position: relative;   width: 100%; height: 600px; aborder: #B5CDE4 1px solid;"></div>
<div id="controlPanel" style="position: relative;   width: 100%; height: 600px; aborder: #B5CDE4 1px solid;padding:0px;margin:0px;border:0px;">
<ul id="controllist" style="width: 100%; height: 100%;padding:20px 0px 20px 0px;margin:0px;border:0px;text-align:left;list-style-type:none;text-indent:4em;">
<li class="fn" style="display:none;"><a href="#" onclick="changeBg(this);loadPage('manage.spr?action=recordManage');" >记录管理</a></li>
<li class="fn"><a href="#" onclick="changeBg(this);loadPage('manage.spr?action=recordAnalysis');" >记录分析</a></li>
<li><a href="#" onclick="changeBg(this);loadPage('manage.spr?action=searchRecord');">记录搜索</a></li>
<li><a href="#" onclick="changeBg(this);loadPage('manage.spr?action=changePassword');">用户控制面板</a></li>
<%if(loginedUserInfo!=null&&(loginedUserInfo.get("jb").equals("0")||loginedUserInfo.get("jb").equals("1")||loginedUserInfo.get("jb").equals("2"))){ 
%>
<li><a href="#" onclick="changeBg(this);loadPage('manage.spr?action=addRecord&operation=add');">记录录入</a></li>
<% }%>
<%if(loginedUserInfo!=null&&(loginedUserInfo.get("jb").equals("0")||loginedUserInfo.get("jb").equals("1"))){ 
%>
<li><a href="#" onclick="changeBg(this);loadPage('manage.spr?action=userManage');">用户管理</a></li>
<% }%>
<%if(loginedUserInfo!=null&&(loginedUserInfo.get("jb").equals("0")||loginedUserInfo.get("jb").equals("1"))){ 
%>
<!-- li><a href="#" onclick="changeBg(this);loadPage('manage.spr?action=roleManage');">角色管理</a></li-->
<li><a href="#" onclick="changeBg(this);loadPage('manage.spr?action=roomManage&roomType=zb');">一级指标管理</a></li>
<li><a href="#" onclick="changeBg(this);loadPage('manage.spr?action=projectManage&mapType=hj');">关键环节管理</a></li>
<li><a href="#" onclick="changeBg(this);loadPage('manage.spr?action=projectManage&mapType=xm');">项目管理</a></li>
<% }%>
<li><a href="signout.spr" >退出</a></li>
</ul>

</div>
</body>
</html>