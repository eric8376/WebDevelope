<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'index.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<script language="javascript" src="inc/json/json.js"></script>
	<script language="javascript" src="js/prototype.js"></script>
	<script type="text/javascript">
	function queryCust()//查询客户列表
	{
	 var serviceCall = new ServiceCall();
     var obj=new Object();
   
       obj.sql="select * from nursing";
	   serviceCall.init("queryDataSvc");
	   var rt= serviceCall.execute(obj);
	   alert(Object.toJSON(rt));
	}
	
	function queryBuss()//查询业务列表
	{
	 var serviceCall = new ServiceCall();
     var obj=new Object();
     obj.sql="select * from pub_cust where parent_id is null  and consume_level='1' and delete_state='0'";
	 serviceCall.init("queryDataSvc");
	 var rt= serviceCall.execute(obj);
	 alert(Object.toJSON(rt));
	}
	
	</script>
  </head>
  
  <body>
   <input type="button" onclick="queryCust();" value="查询客户列表">
   <input type="button" onclick="queryBuss();"  value="查询业务列表">
  </body>
</html>
