<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>医院全面质量与绩效考核系统</title>
<jsp:include page="../include/include2.jsp" />
<script language="javascript" src="<%=request.getContextPath()%>/js/performance/BGM/dictManage.js"></script>
<link rel="stylesheet" href="<%=request.getContextPath()%>/js/dhtmlx/dhtmlx.css" type="text/css" media="screen">
<style type="text/css">
 html, body {
                      width: 100%;
                      height: 100%;
                      margin: 0px;
                      overflow: hidden;
              }

</style>
</head>
<body>
<table id="mygrid">
</table>
<script type="text/javascript">

$(function(){
	function myLoader(param,success,error){
		var that = $(this);
		var data=db.queryForList("select dict_id,dict_code,dict_text from BGM.t_dict where 1=1 ");
		that.data().datagrid['cache'] = data;
		success(data);
	}	
$('#mygrid').datagrid({ 
	loadMsg: "数据加载中，请稍后……", 
	pageList: [10, 15, 20, 25, 30, 40, 50],
	pageSize: 15,  
	loader:myLoader,     
    columns:[[     
        {field:'dict_id',title:'字典编号',width:0,sortable:true,hidden:true},     
        {field:'dict_code',title:'字典类别',width:100,sortable:true},     
        {field:'dict_text',title:'字典名',width:100,align:'right',sortable:true}     
    ]],
    pagination:true
         
});
});
</script>
</body>
</html>