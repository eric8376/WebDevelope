<%@ page language="java" contentType="text/html; charset=GB2312"%>
<%@ page import="com.microwill.MessageImpl"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
		<title>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</title>
		<link href="../../css/ccm.css" rel="stylesheet" type="text/css">
			<script language="javascript">
			var a=window.dialogArguments;;
			document.title = a.title+document.title;

			function init()
			{
				errorLabel.innerText = a.content_name;
			}
			function onCancel()
			{
				window.close();
			}
			</script>
	</head>
	<body onload="init();" leftMargin="5" topMargin="5">
	<table width="270" border="0" cellpadding="0" cellspacing="1" bgcolor="#3399FF" align="center">
     <tr>
     <td bgcolor="#FFFFFF">
		<table width="100%" height="140" border="0" cellpadding="0" cellspacing="5" ID="Table1">
			<form name="form1" method="post" action="" ID="Form1">
				<tr>
					<td width="8">&nbsp;</td>
					<td width="85" align="center" bgcolor="#EBF5FE"><img src="../../images/icon/icon_pop_alarm.gif" width="68" height="67"></td>
					<td width="1" background="../../images/welcome/line_bg_v.gif"><img src="../../images/shim.gif" width="1" height="1"></td>
					<td align="center">
					<P><LABEL ID="errorLabel"></LABEL><br>
					<a id="id1"></a>
					</P>
					<input type="button" class="button_yellow" value="<%=MessageImpl.getDesignMsg("10018")%>" ID="btnOK2" onclick="onCancel()">
					</td>
				</tr>
			</form>
		</table>
	  </td>
     </tr>
    </table>
	</body>
</html>
