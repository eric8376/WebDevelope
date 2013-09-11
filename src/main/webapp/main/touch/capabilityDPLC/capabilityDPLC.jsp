<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head>
<title>
	资源能力计算
</title>
<style>
	td {
		background-color: #F8F3F7;
	}
</style>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/touch/capabilityDPLC/ccm.css">
<script language="javascript" src="<%=request.getContextPath()%>/inc/json/json.js"></script>
<script language="javascript" src="<%=request.getContextPath()%>/main/touch/capabilityDPLC/inc/langConvert.js"></script>
<script language="javascript" src="<%=request.getContextPath()%>/main/touch/capabilityDPLC/inc/helper/helper.js"></script>
<script language="javascript" src="<%=request.getContextPath()%>/main/touch/capabilityDPLC/inc/capabilityDPLC.js"></script>

<script language="javascript">
	eqpInfoObj = window.dialogArguments; 	
</script>

</head>
<body onLoad="init();">
 
  <table width="100%" height="100" border="0" cellpadding="2" cellspacing="1" bgcolor="#7992C5">
  	<tr>
			<td colspan="7" class="td_blue_title"><img src="<%=request.getContextPath()%>/images/icon/title_dot.gif" align="absmiddle">&nbsp;<font color='black'>资源能力计算条件</font></td>		
		</tr>
    <tr id="cond1">
      <td width="10%" align="center" class="td_blue_txt">产品类型 &nbsp;&nbsp;&nbsp;&nbsp;</td>
      <td width="40%" align="left" class="td_grey">
					<select class="select_htc" style="width:90%" name="productSel" id="productSel" disabled="disabled" onChange="qryStrategy(productSel.value)"></select>
			</td>
      <td width="10%"align="center" class="td_blue_txt">A端机房 &nbsp;&nbsp;&nbsp;&nbsp;</td>
      <td width="10%" class="td_grey" style="display:none">
      	<select class="select_htc" name="aResType" id="aResType" style="width:90%" disabled onChange="f_changeNodeType(0)">
        	<option value="205" selected="selected">机房</option>
        	<option value="703">光交接箱</option>
        </select>
      </td>
      <td width="30%" align="left" class="td_grey" valign="baseline">
      	<input type="text" style="width:75%" name="aRoomTxt" readonly><input type="image" name="Input" style="margin-bottom:-4px;"
      	src="<%=request.getContextPath()%>/images/button/popedit.gif" class="input_underline" onClick="qryRoom('A')">
        <input type="hidden" name="aRoomId" id="aRoomId">
      </td>
    </tr>
    <tr id="cond2">
      <td width="10%" align="center" class="td_blue_txt">接入方式 &nbsp;&nbsp;&nbsp;&nbsp;</td>
      <td class="td_grey" align="left">
					<select class="select_htc" style="width:90%" name="strategySel" id="strategySel" onChange="qryStrategyAtom(strategySel.value)"></select>
			</td>
      <td class="td_blue_txt" align="center">Z端机房 &nbsp;&nbsp;&nbsp;&nbsp;</td>
      <td width="10%" class="td_grey" style="display:none">
				<select class="select_htc" name="zResType" id="zResType" style="width:90%" disabled onChange="f_changeNodeType(1)">
				 	<option value="205" selected="selected">机房</option>
        	<option value="703">光交接箱</option>
        </select>
			</td>
      <td width="30%" align="left" class="td_grey" valign="top">
      	<input type="text" style="width:75%" name="zRoomTxt" readonly><input type="image" style="margin-bottom:-4px;"
      	src="<%=request.getContextPath()%>/images/button/popedit.gif" class="input_underline" onClick="qryRoom('Z')">
        <input type="hidden" name="zRoomId">
      </td>
    </tr>
		<tr id="cond3">
			<td align="center" class="td_blue_txt">原子服务列表&nbsp;</td>
			<td align="left" class="td_grey">
				<select class="select_htc" style="width:90%" name="atomSel" id="atomSel" onChange="qryAtomCondition(atomSel.value)"></select>
			</td>
			
			<!-- 以下这部分不显示 -->
			<td class="td_blue_txt" style="display:none">A/Z标记</td>
			<td align="left" class="td_grey" style="display:none">
				<select class="select_htc" style="width:90%" name="azSel" id="azSel">
					  <option value="-1">---请选择--</option>					
					  <option value="A">---A---</option>
					  <option value="Z">---Z---</option>
					</select>
			</td>
			<td class="td_blue_txt" style="display:none">光纤搜索深度</td>
			<td class="td_grey" colspan="3" align="left" style="display:none">
				<select class="select_htc" style="width:60px" name="optDepth" id="optDepth">
				  <option value="1">1</option>					
				  <option value="2">2</option>
				  <option value="3">3</option>
				  <option value="4">4</option>
				  <option value="5" SELECTED >5</option>
				</select>
			</td>
			<td class="td_blue_txt" colspan="3" valign="bottom" style="display:none">
				<table width="100%" border="0" cellpadding="2" cellspacing="1" bgcolor="#7992C5">		
					<tr>
							<td width="10%" align="center" class="td_blue_txt">设备类型</td> 
							<td width="40%" class="td_grey">
								<select class="select_htc" name="eqpTypeSel"  id="eqpTypeSel"style="width:95%" disabled="disabled"></select>
							</td>
							<td width="10%" align="center" class="td_blue_txt">纤芯数量</td>   
							<td width="40%" class="td_grey">
								<select class="select_htc" name="pairNoSel" id="pairNoSel" style="width:95%" disabled="disabled">
									<option value="-1" selected>---请选择---</option>
									<option value="1">---1---</option>
									<option value="2">---2---</option>
									<option value="4">---4---</option>
									<option value="6">---6---</option>
								</select>
							</td>
						</tr>
					</table>
				</td>
			<!-- 以上这部分不显示 -->
			
			<td width="10%" align="center" class="td_blue_txt">电路数量 &nbsp;&nbsp;&nbsp;&nbsp;</td>   
			<td width="5%" align="left" class="td_grey">					
				<input type="text" style="width:50px" name="cirCount" value="1">
			</td>					
		</tr>
		<tr id="cond4">
			<td width="10%" align="center" class="td_blue_txt">速率 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>  
			<td width="10%" align="left" class="td_grey">
				<select class="select_htc" name="rateSel" id="rateSel" style="width:90%">
					<option value="-1" selected>---请选择---</option>
				</select>
			</td>
			<td width="10%" align="center" class="td_blue_txt">端口类型 &nbsp;&nbsp;&nbsp;&nbsp;</td>  
			<td width="10%" align="left" class="td_grey">
				<select class="select_htc" name="portTypeSel" id="portTypeSel" style="width:95%"></select>
			</td>
		</tr>	
		<tr>
			<td  style="background-color: white!important" colspan="7" align="right">
				<input type="button" name="" value="开始计算" id="doBtn" class="button_blue" onClick="calculate()">
				<input type="button" name="" value="取消计算" id="cancleBtn" class="button_blue" onClick="cancle()" style="display:none">
				<input type="button" name="" value="重置AZ端" id="resetBtn" class="button_blue" onClick="f_reset()">
			</td> 
		</tr>
		<tr>
			<td class="td_blue_title"  colspan="8"><img src="<%=request.getContextPath()%>/images/icon/title_dot.gif" align="absmiddle">&nbsp;<font color="black">能力计算结果</font></td>
		</tr>
			<tr>
				<td colspan="7" bgcolor="#FFFFFF" style="width:100%">
				<table id="resultGrid" class="dhtmlxGrid"  imgpath="<%=request.getContextPath()%>/js/dhtmlxGrid/imgs">
                <tr >
                <td width="200" align="center" >原子服务名称</td>
                <td  width="500" align="center" >计算输入条件</td>
                <td  width="200" align="center" >资源是否具备</td>
              
              </tr>
</table>

		   </td>
		</tr>
	</table>
</body>
</html>