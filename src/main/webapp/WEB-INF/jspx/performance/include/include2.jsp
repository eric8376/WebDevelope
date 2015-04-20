<%@page import="java.util.Map"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="utf-8"%>
<%
	Map loginedUserInfo = (Map) request.getSession().getAttribute(
			"token");
%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/js/easyui/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/js/easyui/themes/icon.css">

<script type="text/javascript">
var contextPath='<%=request.getContextPath()%>/BGM';
</script>
<script language="javascript"
	src="<%=request.getContextPath()%>/js/base.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/easyui/jquery.min.js"></script>
<script trpe="text/javascript" src="<%=request.getContextPath()%>/js/easyui/locale/easyui-lang-zh_CN.js"></script> 

<script type="text/javascript" src="<%=request.getContextPath()%>/js/easyui/jquery.easyui.min.js"></script>
<script language="javascript" src="<%=request.getContextPath()%>/js/helper/dhtmlxhelper.js"></script>

<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/performance<%=loginedUserInfo.get("relativeInernalContext")%>/dao.js"></script>

<!--script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1253352188'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s4.cnzz.com/z_stat.php%3Fid%3D1253352188' type='text/javascript'%3E%3C/script%3E"));</script-->
	
	<link rel="stylesheet"
	href="<%=request.getContextPath()%>/style/base.css"
	type="text/css" media="screen">


