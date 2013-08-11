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
		<td height='25%'>
		<div>
			<table>
			<tr>
				<td><input type="checkbox"></td>
				<td>光路编号</td>
				<td><select>
						<option>包含</option>
						<option>等于</option>
					</select>
				</td>
				<td>
					<input type="text">
				</td>
				<td><input type="checkbox"></td>
				<td>大小写敏感</td>
			</tr>
			<tr>
				<td><input type="checkbox"></td>
				<td>光路名称</td>
				<td><select>
						<option>包含</option>
						<option>等于</option>
					</select>
				</td>
				<td>
					<input type="text">
				</td>
				<td><input type="checkbox"></td>
				<td>大小写敏感</td>
			</tr>
			<tr>
				<td><input type="checkbox"></td>
				<td>业务状态</td>
				<td><select>
						<option>包含</option>
						<option>等于</option>
					</select>
				</td>
				<td>
					<input type="text">
				</td>
				<td><input type="checkbox"></td>
				<td>大小写敏感</td>
			</tr>
			<tr>
				<td><input type="checkbox"></td>
				<td>设施名称</td>
				<td><select>
						<option>包含</option>
						<option>等于</option>
					</select>
				</td>
				<td>
					<input type="text">
				</td>
				<td><input type="checkbox"></td>
				<td>大小写敏感</td>
			</tr>
			<tr>
				<td><input type="checkbox"></td>
				<td>用户设备终端描述</td>
				<td><select>
						<option>包含</option>
						<option>等于</option>
					</select>
				</td>
				<td>
					<input type="text">
				</td>
				<td><input type="checkbox"></td>
				<td>大小写敏感</td>
			</tr>
			</table>
		</div>
		</td>
	</tr>
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
	<tr>
		<td>
		<div>
		</div>
		</td>
	</tr>
</table>
</body>
<script>
function init(){
}
</script>
</html>