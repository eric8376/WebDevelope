<%@ page language="java" contentType="text/html; charset=GB2312"%>
<%@ page import="com.microwill.MessageImpl"%>
<html>
	<head>
		<title>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</title>
		<link href="../../css/ccm.css" rel="stylesheet" type="text/css">
			<script language="javascript">
		var a=window.dialogArguments;
		document.title = a.title+document.title;

		function init()
		{
			errorLabel.innerText = a.content_name;
		}
		function onCancel()
		{
			window.close();
		}
		function onOk()
		{
			window.returnValue = "1";
			window.close();
		}
		function detail()
		{
			document.all("id1").innerText = a.content_message;
		}
			</script>
	</head>
	<body onload="init();" leftMargin="5" topMargin="5">
	<table width="270" border="0" cellpadding="0" cellspacing="1" bgcolor="#3399FF" align="center">
     <tr>
     <td bgcolor="#FFFFFF">
		<table width="100%" height="140" border="0" cellpadding="0" cellspacing="5" ID="Table1">
        <tr>
         <td width="8">&nbsp;</td>
         <td width="85" align="center" bgcolor="#EBF5FE"><img src="../../images/icon/icon_pop_error.gif" width="68" height="53"></td>
         <td width="1" background="../../images/welcome/line_bg_v.gif"><img src="../../images/shim.gif" width="1" height="1"></td>
         <td align="center">
         <P>
			<LABEL ID="errorLabel"></LABEL><br>
			<!--点击--><%=MessageImpl.getDesignMsg("29044")%><a id="A1" href="#" onclick="detail()"><font color="#ff0000"><!--此处--><%=MessageImpl.getDesignMsg("29045")%></font></a><!--查看详细信息--><%=MessageImpl.getDesignMsg("29046")%><br>
			<a id="id1"></a>
		 </P>
         <input name="btnOK" type="button" class="button_yellow" value="<%=MessageImpl.getDesignMsg("10018")%>" ID="btnOK" onclick="onCancel()"></td><!--确定-->
       </tr>
       </table>
     </td>
     </tr>
    </table>
	</body>
</html>
