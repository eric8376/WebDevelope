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
<body id="layout">


<script type="text/javascript">

using(['layout','tabs'], function(){
	
$('#layout').layout();
$('#layout').layout('add',{
    region: 'north',
    height: 60,
    split: false
});
$('#layout').layout('add',{
    region: 'west',
    width: 150,
    title: '导航',
    split: true
});
$('#layout').layout('add',{
    region: 'center',
    split: true
});
$('#layout').layout('add',{
    region: 'south',
    height: 50,
    border:false
});
//var west=$('#layout').layout('panel','west').panel({content:"<iframe src='http://www.163.com'></iframe>"});	
var center=$('#layout').layout('panel','center').panel({id:'pp'});
$("#pp").tabs({
    border:false,
    onSelect:function(title){
        alert(title+' is selected');
    }
});
$('#pp').tabs('add',{
    title:'New Tab',
    content:'Tab Body',
    closable:true,
    tools:[{
        iconCls:'icon-mini-refresh',
        handler:function(){
            alert('refresh');
        }
    }]
});
});
</script>
</body>
</html>