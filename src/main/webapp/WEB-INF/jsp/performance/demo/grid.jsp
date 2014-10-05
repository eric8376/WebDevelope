<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title></title>
<script language="javascript"
	src="<%=request.getContextPath()%>/js/base.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery-1.9.1.min.js"></script>
<script src="<%=request.getContextPath()%>/js/easyui/easyloader.js"></script>
</head>
<body>

<table id="test">
</table>
<script type="text/javascript">

using('datagrid', function(){
	function myLoader(param,success,error){
		var that = $(this);
		var data=db.queryForList("select user_id,user_name,real_name,BM,KS,JB from nursing.t_per_user");
		that.data().datagrid['cache'] = data;
		success(data);
	}	
$('#test').datagrid({ 
	loadMsg: "数据加载中，请稍后……", 
	pageList: [10, 15, 20, 25, 30, 40, 50],
	pageSize: 15,  
	loader:myLoader,     
    columns:[[     
        {field:'user_id',title:'用户编号',width:100},     
        {field:'user_name',title:'用户名',width:100},     
        {field:'real_name',title:'真实姓名',width:100,align:'right'}     
    ]],
    pagination:true
         
});
});
</script>
</body>
</html>