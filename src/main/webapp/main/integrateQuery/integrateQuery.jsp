<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title></title>
<style type="text/css">
body,table{
	margin-top:0px;
	font-size:12px;
}
</style>
</head>

<body onload='init();'>
<table width='100%' height='100%' border='0'>
<tr>
	<td><iframe frameborder="0" width="100%" style="padding: 0px;" id="queryCondtions" src="integrateTab.htm" onload="this.height=100"></iframe> </td>
</tr>
<!--
<tr>
	<td height='20px'>		
	<div>
			<input style='width:65px' type="button" value='查询（P）'>

			<input style='width:75px' type="button" value='下一页（N）'>
			<input style='width:65px' type="button" value='停止（S）'>
			<input style='width:85px' type="button" value='保存结果（R）'>
			<input style='width:65px' type="button" value='打印（P）'>
			<input style='width:65px' type="button" value='确定（Q）'>
			<input style='width:65px' type="button" value='取消（C）'>
			<input style='width:85px' type="button" value='显示设置（S）'>
			<span style='width:85px' >每页记录数（空为系统缺省值）</span>
			<input style='width:50px' type="text">
			<input type="checkbox">
			<span style='width:50px'>统计总数</span>		
	</div>
	</td>
</tr>
-->	
<tr>
	<td><iframe frameborder="0" width="100%" scrolling="no" style="padding: 0px" id="queryReusts" src="resultPage.htm"></iframe></td>
</tr>
<tr>
	<td id="detailTD" style="display:none"><iframe frameborder="0" width="100%" height="150px" style="padding: 0px" id="resultDetail" src="detailPage.htm"></iframe></td>
</tr>
<tr>
<td height="6px" width="100%" bgcolor="#E1E1E1" onMouseUp="changBottomBar()" onMouseOver="this.style.backgroundColor='#FFF9DD';"
   onMouseOut="this.style.backgroundColor='#E1E1E1'" align="center">
   <img id="imgBottom" src="../../images/btn/arrow_down.gif" alt="关闭/开启" style="cursor:hand">
 </td>
</tr>
</table>
</body>
<script>
function init(){
}

function reinitIframe(){
	var iframe = document.getElementById("queryCondtions");
	var iframe2 = document.getElementById("queryReusts");
	var iframe3 = document.getElementById("resultDetail");
	try{
		var bHeight = iframe.contentWindow.document.body.scrollHeight;
		var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
		var height = Math.max(bHeight, dHeight);
		iframe.height =  height;
		
		var bHeight2 = iframe2.contentWindow.document.body.scrollHeight;
		var dHeight2 = iframe2.contentWindow.document.documentElement.scrollHeight;
		var height2 = Math.max(bHeight2, dHeight2);
		iframe2.height =  height2;
		
		var bHeight3 = iframe3.contentWindow.document.body.scrollHeight;
		var dHeight3 = iframe3.contentWindow.document.documentElement.scrollHeight;
		var height3 = Math.max(bHeight3, dHeight3);
		iframe3.height =  height3;					
	   }catch (ex){}
}

window.setInterval("reinitIframe()", 200);

function  showQuery(){
	var iframe = document.getElementById("queryCondtions")
	if(iframe.style.display!="none")iframe.style.display="none";
	else iframe.style.display="";
}

function changBottomBar(){
	if ((document.getElementById("imgBottom").src).indexOf("arrow_up")!=-1){
		document.getElementById("imgBottom").src="../../images/btn/arrow_down.gif";
		document.getElementById("detailTD").style.display="none";
	}else{
		document.getElementById("imgBottom").src="../../images/btn/arrow_up.gif";
		document.getElementById("detailTD").style.display="";
	}	
}

</script>
</html>