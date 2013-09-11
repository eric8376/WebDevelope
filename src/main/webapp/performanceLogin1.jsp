<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<title>医院全面质量与绩效考核系统</title>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/dhtmlx/dhtmlx.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/performance/login.js"></script>
<link rel="stylesheet" href="<%=request.getContextPath()%>/js/dhtmlx/dhtmlx.css" type="text/css" media="screen">
<style type="text/css">
body{
				background:url(images/performance/bg.png) repeat-x;
				padding: 0;
				margin: 0;
				text-align: center;
}
.mainbox{
			background: url(images/performance/bg01.png) no-repeat left top;
		}
		.welcome{
			background: url(images/performance/bg02.png) no-repeat right top ;
			height: 500px;
		}
.login{
			background:url(images/performance/bglogin.png) no-repeat center bottom ;
			height: 250px;
			width: 525px;
			padding: 220px 0 0 330px;
			margin:0 auto 0 auto;
			text-align:left;
		}
.submit{float: right; margin-top:4px;width:86px;height:29px;color:#36434E;border:0px;cursor:pointer;font-size:14px;;color:#fff;FONT-WEIGHT: bold;}		
</style>
</head>
<body>
<div class="mainbox">
	<div class="welcome">
	<div class="login">
<form action="logon.spr" method="post" >
  <div id="form_container" style="position:absolute;left:550px;top:290px;" ></div>
</form>
</div>
</div>
</div>
</body>
</html>