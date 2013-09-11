<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title></title>
<style type="text/css">
body table{
	font-size:12px;
}
</style>
</head>

<body onload='init();'>
<table width='100%' height='100%' border='1'>
	<tr>
		<td height='20px'>
			<div>
				<span>查询条件</span>
			</div>
		</td>
	</tr>
	<tr height='35%'>
		<td>
		<div>
			<table cellspacing="0" cellpadding="0">
			<tr height='12px'>
				<td width='12%' align="center">A端接入地址</td>
				<td width='8%'><select>
						<option>包含</option>
						<option>等于</option>
					</select>
				</td>
				<td width='15%'>
					<input type="text">
				</td>
				
				<td width='10%' align="center">A端联系人</td>
				<td width='8%'><select>
						<option>包含</option>
						<option>等于</option>
					</select>
				</td>
				<td width='15%'>
					<input type="text">
				</td>
				
				<td width='9%' align="center">电路状态</td>
				<td width='8%'><select disabled="disabled">
						<option>包含</option>
						<option selected="selected">等于</option>
					</select>
				</td>
				<td width='15%'>
					<input type="text">
				</td>
			</tr>
			<tr>
				<td align="center">Z端接入地址</td>
				<td><select>
						<option>包含</option>
						<option>等于</option>
					</select>
				</td>
				<td align="center">
					<input type="text">
				</td>
				
				<td align="center">Z端联系人</td>
				<td><select>
						<option>包含</option>
						<option>等于</option>
					</select>
				</td>
				<td>
					<input type="text">
				</td>
				
				<td align="center">开通时间</td>
				<td><select disabled="disabled">
						<option>包含</option>
						<option selected="selected">等于</option>
					</select>
				</td>
				<td>
					<input type="text">
				</td>
			</tr>
			<tr>
				<td align="center">本地电路编码</td>
				<td><select>
						<option>包含</option>
						<option>等于</option>
					</select>
				</td>
				<td>
					<input type="text">
				</td>
				
				<td align="center">业务受理号</td>
				<td><select>
						<option>包含</option>
						<option>等于</option>
					</select>
				</td>
				<td>
					<input type="text">
				</td>
				
				<td align="center">电路速率</td>
				<td><select disabled="disabled">
						<option>包含</option>
						<option selected="selected">等于</option>
					</select>
				</td>
				<td>
					<input type="text">
				</td>
			</tr>
			<tr>
				<td align="center">第三方电路编码</td>
				<td><select>
						<option>包含</option>
						<option>等于</option>
					</select>
				</td>
				<td>
					<input type="text">
				</td>
				
				<td align="center">VRF</td>
				<td><select>
						<option>包含</option>
						<option>等于</option>
					</select>
				</td>
				<td>
					<input type="text">
				</td>
				
				<td align="center">业务类型</td>
				<td><select disabled="disabled">
						<option>包含</option>
						<option selected="selected">等于</option>
					</select>
				</td>
				<td>
					<input type="text">
				</td>
			</tr>
			<tr>
				<td align="center">国内国际电路编码</td>
				<td><select>
						<option>包含</option>
						<option>等于</option>
					</select>
				</td>
				<td>
					<input type="text">
				</td>
				
				<td align="center">客户名称</td>
				<td><select>
						<option>包含</option>
						<option>等于</option>
					</select>
				</td>
				<td>
					<input type="text">
				</td>
				
				<td align="center">客户级别</td>
				<td><select disabled="disabled">
						<option>包含</option>
						<option selected="selected">等于</option>
					</select>
				</td>
				<td>
					<input type="text">
				</td>
			</tr>
			<tr>
				<td align="center">机房名称</td>
				<td><select>
						<option>包含</option>
						<option>等于</option>
					</select>
				</td>
				<td>
					<input type="text">
				</td>
				
				<td align="center">合同号</td>
				<td><select>
						<option>包含</option>
						<option>等于</option>
					</select>
				</td>
				<td>
					<input type="text">
				</td>
				
				<td align="center">删除状态</td>
				<td><select disabled="disabled">
						<option>包含</option>
						<option selected="selected">等于</option>
					</select>
				</td>
				<td>
					<input type="text">
				</td>
			</tr>
			<tr>
				<td align="center">设备名称</td>
				<td><select>
						<option>包含</option>
						<option>等于</option>
					</select>
				</td>
				<td>
					<input type="text">
				</td>
				
				<td align="center">IP地址</td>
				<td><select disabled="disabled">
						<option>包含</option>
						<option selected="selected">智能</option>
					</select>
				</td>
				<td>
					<input type="text">
				</td>
				
			</tr>
			</table>
		</div>
		</td>
	</tr>
	<tr>
		<td height='20px'>
		<div>
			<input style='width:75px' type="button" value='查询（P）'>
			<input style='width:85px' type="button" value='下一页（N）'>
			<input style='width:95px' type="button" value='保存结果（R）'>
			<input style='width:85px' type="button" value='IP细则（I）'>
			<input style='width:75px' type="button" value='路由（R）'>
			<input style='width:75px' type="button" value='专业（P）'>
			<input style='width:95px' type="button" value='显示设置（D）'>
			<input style='width:95px' type="button" value='保存全部（A）'>
			<span style='width:60px' >每页记录数</span>
			<input style='width:50px' type="text">
			<input type="checkbox">
			<span style='width:90px'>显示SQL语句</span>
		</div>
		</td>
	</tr>
	<tr height="25%">
		<td>
		<div>
		</div>
		</td>
	</tr>
	<tr>
		<td>
			<table>
				<tr>
					<td></td>
					<td></td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</body>
<script>
function init(){
}
</script>
</html>