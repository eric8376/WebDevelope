<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>血糖仪管理系统</title>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/js/easyui/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/js/easyui/themes/icon.css">

<script type="text/javascript">
var contextPath='<%=request.getContextPath()%>/BGM';
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/easyui/jquery.min.js"></script>
<script trpe="text/javascript" src="<%=request.getContextPath()%>/js/easyui/locale/easyui-lang-zh_CN.js"></script> 
<script type="text/javascript" src="<%=request.getContextPath()%>/js/easyui/jquery.easyui.min.js"></script>

<script type="text/javascript">
		$(function(){
			$('#login').form({
				 url:contextPath+"/logon.spr",
				onSubmit:function(){
					//return $(this).form('validate');
				},
				success:function(res){
					res = $.parseJSON(res);
					//loadingbar(false);
		        	if(res.success==true)
					{
						window.location.href=contextPath+"/p.spr?page=workbench";
						
					}else{
						$.messager.alert("错误",res.msg);
						
					}
				}
			});
		});
		function loadingbar(state){
			if(window._progressCover==null){
			var p1 = document.createElement("DIV");
			p1.className = "dhtmlxLayoutPolyProgressGlobal_dhx_skyblue";
			document.body.appendChild(p1);
			var p2 = document.createElement("DIV");
			p2.className = "dhtmlxLayoutPolyProgressBGIMGGlobal_dhx_skyblue";
			document.body.appendChild(p2);
			window._progressCover=new Array(p1,p2);
			}
			window._progressCover[0].style.display = (state==true?"":"none");
			window._progressCover[1].style.display = this._progressCover[0].style.display;
		}
	</script>

</head>
<body style="background-image: url('<%=request.getContextPath()%>/images/performance/BGM/bg.jpg');">
<div style="margin:150px auto;width:500px;height:200;">
    <div class="easyui-panel" title="血糖仪管理系统" style="margin:0 auto;width:400px;">
        <div style="padding:10px 60px 20px 60px">
        <form id="login" method="post" >
            <table cellpadding="2">
                <tr>
                    <td><label for="username">用户名:</label></td>
                    <td><input class="easyui-textbox easyui-validatebox" type="text" name="username" data-options="required:true,missingMessage:'用户名不能为空'"></input></td>
                </tr>
                <tr>
                    <td><label for="password">密 码:</label></td>
                    <td><input class="easyui-textbox easyui-validatebox" type="password" name="password" data-options="required:true,missingMessage:'密码不能为空'"></input></td>
                </tr>
            </table>
        </form>
        <div style="text-align:center;padding:5px">
            <a href="javascript:void(0)" class="easyui-linkbutton" onclick="submitForm();">登 录</a>
            <a href="javascript:void(0)" class="easyui-linkbutton" onclick="clearForm();">清 空</a>
        </div>
        </div>
    </div>
   </div>
    <script>


 function submitForm(){
     $('#login').form('submit');
 }
 function clearForm(){
     $('#login').form('clear');
 }


    </script>
</body>
</html>