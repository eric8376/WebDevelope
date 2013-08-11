var serviceCall = new ServiceCall();
var resultGrid;
//初始化
function init(){
getProd();
getCirRate();
initResultGrid();
}



//查询产品
function getProd(){
  
var object={};
object.sql="select prod_id,prod_name from srv_prod where prod_class_id='000000000000000000000179' and prod_name = 'DPLC' ";
var serviceCall = new ServiceCall();
serviceCall.init("queryDataSvc");
var prodRecords=serviceCall.execute(object);
if(prodRecords!=null && prodRecords.length>0){
  for(var i=0;i<prodRecords.length;i++){
    addOptionToSelect(productSel,prodRecords[i].prodId,prodRecords[i].prodName);	
  }
}
if ("-1" != productSel.value) {
	
	qryStrategy(productSel.value);
}
}


////查询速率
function getCirRate(){
removeAllOption(rateSel);
//addOptionToSelect(rateSel,"-1",getModuleMsg("20044"));	
var sqlStr="  SELECT   serial_no, desc_china "
			+"    FROM   pub_restriction "
			+"   WHERE       keyword = 'BUSI_CIRCUIT_RATE' "
			+"           AND delete_state = '0' "
			+"           AND is_display = '1' "
			+"ORDER BY   desc_china ";
//var rateRecords=executeQuery(sqlStr,false);
//由于定制的显示需要（部分不显示），不能直接从后台配置（影响别的地方显示）。
	var rateRecords = [{'col':['serial_no','desc_china']}];
	rateRecords.push({'col':[28040032,'2M']});
	rateRecords.push({'col':[28040040,'3M']});
	rateRecords.push({'col':[28040047,'4M']});
	rateRecords.push({'col':[28040052,'5M']});
	rateRecords.push({'col':[28040060,'6M']});
	rateRecords.push({'col':[28040063,'7M']});
	rateRecords.push({'col':[28040065,'8M']});
	rateRecords.push({'col':[28040003,'10M']});
	rateRecords.push({'col':[28040007,'12M']});
	rateRecords.push({'col':[28040010,'14M']});
	rateRecords.push({'col':[28040013,'15M']});
	rateRecords.push({'col':[28040014,'16M']});
	rateRecords.push({'col':[28040015,'17M']});
	rateRecords.push({'col':[28040017,'18M']});
	rateRecords.push({'col':[28040024,'20M']});
	rateRecords.push({'col':[28040026,'22M']});
	rateRecords.push({'col':[28040027,'24M']});
	rateRecords.push({'col':[28040029,'25M']});
	rateRecords.push({'col':[28040030,'26M']});
	rateRecords.push({'col':[28040031,'28M']});
	rateRecords.push({'col':[28040034,'30M']});
	rateRecords.push({'col':[28040036,'32M']});
	rateRecords.push({'col':[28040037,'34M']});
	rateRecords.push({'col':[28040038,'36M']});
	rateRecords.push({'col':[28040042,'40M']});
	rateRecords.push({'col':[28040043,'42M']});
	rateRecords.push({'col':[28040044,'44M']});
	rateRecords.push({'col':[28040045,'45M']});
	rateRecords.push({'col':[28040046,'46M']});
	rateRecords.push({'col':[28040048,'50M']});
	rateRecords.push({'col':[28040051,'54M']});
	rateRecords.push({'col':[28040053,'60M']});
	rateRecords.push({'col':[28040059,'68M']});
	rateRecords.push({'col':[28040061,'70M']});
	rateRecords.push({'col':[28040064,'80M']});
	rateRecords.push({'col':[28040066,'90M']});
	rateRecords.push({'col':[28040067,'96M']});
	rateRecords.push({'col':[28040001,'100M']});
	rateRecords.push({'col':[28040004,'120M']});
	rateRecords.push({'col':[28040008,'135M']});
	rateRecords.push({'col':[28040009,'140M']});
	rateRecords.push({'col':[28040012,'155M']});
	rateRecords.push({'col':[28040016,'180M']});
	rateRecords.push({'col':[28040023,'200M']});
	rateRecords.push({'col':[28040025,'225M']});
	rateRecords.push({'col':[28040033,'300M']});
	rateRecords.push({'col':[28040035,'310M']});
	rateRecords.push({'col':[28040041,'405M']});
	rateRecords.push({'col':[28040050,'540M']});
	rateRecords.push({'col':[28040054,'620M']});
	rateRecords.push({'col':[28040055,'622M']});
	rateRecords.push({'col':[28040058,'675M']});
	rateRecords.push({'col':[28040020,'1G']});
//	rateRecords.push({'col':[28040005,'1240M']});
	rateRecords.push({'col':[28040000,'1.25G']});
	rateRecords.push({'col':[28040022,'2.5G']});
	rateRecords.push({'col':[28040002,'10G']});
	rateRecords.push({'col':[28040068,'FE']});

if(rateRecords!=null && rateRecords.length>1){
  for(var i=1;i<rateRecords.length;i++){
    addOptionToSelect(rateSel,rateRecords[i].col[0],rateRecords[i].col[1]);	
  }
}

}
//
//
//查询策略
function qryStrategy(prodId){
	
	removeAllOption(strategySel);
	
    removeAllOption(atomSel);  
   
	//addOptionToSelect(strategySel, "-1",getModuleMsg("20044"));	
   serviceCall.init("resFacadeService","getStrategysFromProd");
  var resultRecords=serviceCall.execute(prodId);
  resultRecords=eval(resultRecords);
  alert(resultRecords);
  //alert(resultRecords);
//    var resultRecords = callRemoteFunctionNoTrans("com.zte.resmaster.dispatchDesign.resService.srvCatalog.SrvStrategyCatalog","getStrategysFromProd",prodId);
//    alert(resultRecords);
//    alert(strategySel); 
if(resultRecords!=null && resultRecords.length>1){
  for(var i=0;i<resultRecords.length-1;i++){
    addOptionToSelect(strategySel,resultRecords[i].strategyId,resultRecords[i].strategyDesc);	
  }
} 
if ("-1" != strategySel.value) {
	qryStrategyAtom(strategySel.value);
}
}
//
//
//查询某策略下的原子服务
function qryStrategyAtom(strategyId){
	removeAllOption(atomSel);
	//addOptionToSelect(atomSel, "-1",getModuleMsg("20044"));
	  serviceCall.init("resFacadeService","getStrategyGroup");
	  var voSrvStrategyGroup=serviceCall.execute(strategyId);
	  voSrvStrategyGroup=eval(voSrvStrategyGroup);
//	var voSrvStrategyGroup = callRemoteFunctionNoTrans("com.zte.resmaster.dispatchDesign.resService.srvCatalog.SrvStrategyCatalog","getStrategyGroup", strategyId);
	
	  
	if(voSrvStrategyGroup!=null && voSrvStrategyGroup.length>1){
	    for(var i=0;i<voSrvStrategyGroup.length-1;i++){
       addOptionToSelect(atomSel,voSrvStrategyGroup[i].srvId,voSrvStrategyGroup[i].srvDesc);	
    }
}
if ("-1" != atomSel.value) {
	qryAtomCondition(atomSel.value);
}
}
//
//
//根据原子服务，得到该服务的设备类型、端口类型约束
function qryAtomCondition(srvId){
	//控制节点类型
	if(srvId == "1003")
	{
		aResType.disabled = false;
		zResType.disabled = false;
	}else{
		aResType.disabled = true;
		zResType.disabled = true;
		
		if(aResType.selectedIndex != 0){
			aRoomTxt.value = "";
			aRoomId.value = "";
		}
		
		if(zResType.selectedIndex != 0){
			zRoomTxt.value = "";
			zRoomId.value = "";
		}
		
		aResType.selectedIndex = 0;
		zResType.selectedIndex = 0;
	}
	

	removeAllOption(eqpTypeSel);
addOptionToSelect(eqpTypeSel, "-1","----请选择----");	
serviceCall.init("resFacadeService","getAtomEqpPortType");
var srvAttrResultEqp=serviceCall.execute(srvId,"eqpType");
srvAttrResultEqp=eval(srvAttrResultEqp);
//var srvAttrResultEqp = callRemoteFunctionNoTrans("com.zte.resmaster.dispatchDesign.resService.srvCatalog.SrvAtomCatalog","getAtomEqpPortType", srvId, "eqpType");
	
	if(srvAttrResultEqp!=null && srvAttrResultEqp.length>1){	
	    for(var i=0;i<srvAttrResultEqp.length-1;i++){
       addOptionToSelect(eqpTypeSel,srvAttrResultEqp[i].type,srvAttrResultEqp[i].typeDesc);	
    }	  
	}	
	removeAllOption(portTypeSel);	
    addOptionToSelect(portTypeSel, "-1","----请选择----");		
	//var srvAttrResultPort = callRemoteFunctionNoTrans("com.zte.resmaster.dispatchDesign.resService.srvCatalog.SrvAtomCatalog","getAtomEqpPortType", srvId, "portType");
	var srvAttrResultPort = [];
	if ( 1010 == srvId ) {
		srvAttrResultPort.push({'type':3101016,'typeDesc':'2M电口'});
		srvAttrResultPort.push({'type':3101012,'typeDesc':'34M电口'});
		srvAttrResultPort.push({'type':3101014,'typeDesc':'45M电口'});
		//srvAttrResultPort.push({'type':3101067,'typeDesc':'34/45M'});
		srvAttrResultPort.push({'type':31010123,'typeDesc':'140M电口'});
		srvAttrResultPort.push({'type':3101007,'typeDesc':'155M电口'});
		//srvAttrResultPort.push({'type':31020010,'typeDesc':'8口以太网'});
		//srvAttrResultPort.push({'type':31020023,'typeDesc':'10/100M以太网板卡'});
		srvAttrResultPort.push({'type':3101011,'typeDesc':'Fast Ethernet电口'});
		srvAttrResultPort.push({'type':24150004,'typeDesc':'GigabitEthernet'});
		srvAttrResultPort.push({'type':3101017,'typeDesc':'155M光口'});
		//srvAttrResultPort.push({'type':3101018,'typeDesc':'155M多模光口'});
		srvAttrResultPort.push({'type':3101004,'typeDesc':'622M光口'});
		//srvAttrResultPort.push({'type':3101005,'typeDesc':'622M多模光口'});
		//srvAttrResultPort.push({'type':3101002,'typeDesc':'1G光口'});
		srvAttrResultPort.push({'type':3101001,'typeDesc':'2.5G光口'});
		srvAttrResultPort.push({'type':3101000,'typeDesc':'10G光口'});
		//srvAttrResultPort.push({'type':3101065,'typeDesc':'逻辑端口'});
	}
	
	
if (srvAttrResultPort != null && srvAttrResultPort.length > 0) {
	    for (var i = 0; i <= srvAttrResultPort.length - 1; i++) {
       addOptionToSelect(portTypeSel,srvAttrResultPort[i].type,srvAttrResultPort[i].typeDesc);	
    }
	}
}
//
//
///*机房查询*/
function qryRoom(AZ){
 var o=new Object();
 if(AZ == "A"){
	   switch(aResType.selectedIndex){
	   	case 0: o.queryId = 9301; break;
	   	case 1: o.queryId = 9153; break;
	   }
	 }else{
	 	switch(zResType.selectedIndex){
	   	case 0: o.queryId = 9301; break;
	   	case 1: o.queryId = 9153; break;
	   }
	}
 //o.queryId=9301;
 o.multiOption=false;
 o.isDetail=false;
 var re=callQuery(o,800,570);
 if(re){
    if(AZ=='A'){
    	 aRoomTxt.value=re.name;
       aRoomId.value=re.id;  	
    }else{
    	 zRoomTxt.value=re.name;
       zRoomId.value=re.id;
    }
 }
}
//
//
//能力计算
function calculate(){	
	var args = new Object();
	args.srvId = nvl(atomSel.value); 
	args.aRoomId = nvl(document.all.aRoomId.value);
	args.zRoomId = nvl(document.all.zRoomId.value);
	args.azFlag = nvl(azSel.value);
	args.rate = nvl(rateSel.value);
	args.eqpType = nvl(eqpTypeSel.value);
	args.portType = nvl(portTypeSel.value);
	args.pairNo = nvl(pairNoSel.value);
    args.cirCount = parseInt(document.all.cirCount.value);
	args.roomId = "";
	
	args.srvId = "1010"; 
	args.aRoomId ="000102050000000000029982";
	args.zRoomId = "000102050000000000028368";
	args.azFlag = "-1";
	args.rate = "28040065";
	args.eqpType ="-1";
	args.portType ="3101014";
	args.pairNo = "-1";
    args.cirCount = "1";
	alert("xx");
	//校验条件
	if(args.srvId=="" || args.srvId=="-1"){
	  alert("请先选择要进行计算的原子服务！");
	  return;
	}
if(args.srvId==1010 || args.srvId==1003){ //传输与光纤原子服务
  if(args.aRoomId=="" || args.zRoomId==""){
  	  alert("两端机房不能为空！");
  	  return;
  }	
  if(args.srvId==1010){ //传输
  	if(args.rate==""||args.rate=="-1"){
  		alert("请选择速率！");
  		return;
  	}
  	if(args.portType==""||args.portType=="-1"){
  		alert("请选择端口类型！");
  		return;
  	}
  }
  if(args.srvId==1003){ //光纤
  	if(args.pairNo==""||args.pairNo=="-1"){
      alert("请选择纤芯数量！");
      return;
    }	
  }
}else if(args.srvId==1200){ //数据端口原子服务
	if(args.azFlag=="-1"){
	  alert("请设置A/Z标记！");
	  return;	
	}
	if(args.azFlag=="A"){
		if(args.aRoomId==""){
	    alert("A端机房不能为空！");
	    return;	
	  }
	  args.roomId = args.aRoomId;
	}
	else if(args.azFlag=="Z"){
		if(args.zRoomId==""){
	    alert("Z端机房不能为空！");
	    return;	
	  }
	  args.roomId = args.zRoomId;
	}  	  	
 	if(args.eqpType==""||args.eqpType=="-1"){
  		alert("请选择设备类型！");
  		return;
 	}
 	if(args.portType==""||args.portType=="-1"){
  		alert("请选择端口类型！");
  		return;
 	}
	if(args.rate==""||args.rate=="-1"){
		args.rate = 0;
	}
}else{
  alert("不是目前支持进行能力计算的资源服务！");
  return;	
}

document.all.doBtn.style.display="none";
	document.all.cancleBtn.style.display="";
	document.all.cond1.disabled="true";
	document.all.cond2.disabled="true";
	document.all.cond3.disabled="true";
	document.all.cond4.disabled="true";
	document.all.resetBtn.disabled="true";

//调用后台
	args.rateDesc = nvl(rateSel.options[rateSel.selectedIndex].text); 
	var countResult;
	try{
	  if(args.srvId==1010){
		 
		  serviceCall.init("resFacadeService","transRouteCalc");
		  countResult=serviceCall.execute(args.aRoomId,args.zRoomId,args.portType,args.rateDesc,args.cirCount);
//	    ajax.callback = view;
//	  	ajax.fdata = args;
//			ajax.callRemoteAs("com.zte.resmaster.dispatchDesign.dao.daoimpl.oracle.resService.SrvCapabilityImpl","transRouteCalc", args.aRoomId,args.zRoomId,args.portType,args.rateDesc,args.cirCount);
	 
	  
	  
	  }else if(args.srvId==1003){
//	  	ajax.callback = view;
//	  	ajax.fdata = args;
//			ajax.callRemoteAs("com.zte.resmaster.dispatchDesign.dao.daoimpl.oracle.resService.SrvCapabilityImpl","optRouteCalc", parseInt(aResType.value),args.aRoomId,parseInt(zResType.value),args.zRoomId,parseInt(args.pairNo),args.cirCount, parseInt(optDepth.value));
	  
		  serviceCall.init("resFacadeService","optRouteCalc");
		  countResult=serviceCall.execute(parseInt(aResType.value),args.aRoomId,parseInt(zResType.value),args.zRoomId,parseInt(args.pairNo),args.cirCount, parseInt(optDepth.value));
	  
	  }else if(args.srvId==1200){
//	  	ajax.callback = view;
//	  	ajax.fdata = args;
//			ajax.callRemoteAs("com.zte.resmaster.dispatchDesign.dao.daoimpl.oracle.resService.SrvCapabilityImpl","calDataEqpPort", args.roomId,parseInt(args.eqpType),parseInt(args.portType),"0", args.cirCount);  	  	
		  serviceCall.init("resFacadeService","calDataEqpPort");
		  countResult=serviceCall.execute(args.roomId,parseInt(args.eqpType),parseInt(args.portType),"0", args.cirCount);
	  
	  } 
	}catch(err){
		alert(err.message);
		return;
	}




//展示结果

var srvDesc = atomSel.options[atomSel.selectedIndex].text;
//var aRoomName = nvl(aRoomTxt.value);
//var zRoomName = nvl(zRoomTxt.value);
var aRoomName = "";
var zRoomName = "";
	var eqpTypeDesc = nvl(eqpTypeSel.options[eqpTypeSel.selectedIndex].text);
	var portTypeDesc = nvl(portTypeSel.options[portTypeSel.selectedIndex].text);
	
	var node = {};
	node.srvName = srvDesc;
	if(args.azFlag=="-1"){
		node.azFlag = "不关心";
	}else{
		node.azFlag = args.azFlag;
	}
	var conditionStr = "";
	if(args.azFlag=="A"){
		conditionStr += aResType.options[aResType.selectedIndex].text + ":" + aRoomName+"；  ";
	}else if(args.azFlag=="Z"){
		conditionStr += zResType.options[zResType.selectedIndex].text + ":" + zRoomName+"；  ";
	}else if(args.azFlag=="-1"){
		conditionStr += "A端机房："+aRoomName+"；  Z端机房:"+zRoomName+"；  ";
	}

	if(args.rate!="" && args.rate!="-1"){
		conditionStr += "速率："+args.rateDesc+"；  ";
	}
	if(args.eqpType!="" && args.eqpType!="-1"){
		conditionStr += "设备类型："+eqpTypeDesc+"；  ";
	}  
	if(args.portType!="" && args.portType!="-1"){
		conditionStr += "端口类型："+portTypeDesc+"；  ";
	}
	if(args.srvId=="1003" && args.pairNo!=""){
		conditionStr += "纤芯数量："+args.pairNo+"；  ";
	}
	node.condition = conditionStr;

		if(countResult==0){
	  node.result = "不具备";
	}else if(countResult==1){
	  node.result = "具备";
	}else if(countResult==2){
	  node.result = "部分具备(有路由，端口资源不足)";
	}else if(countResult==3){
		node.result = "具备(只能开通10M及以下业务)";
	}
	//resultGrid.addRow("",[node.srvName,node.condition,node.result]);
		var resultGrid=document.getElementById("resultGrid");
		
		var trTag=resultGrid.insertRow(1);
		trTag.innerHTML="<TD>"+node.srvName+"</TD><TD>"+node.condition+"</TD><TD>"+node.result+"</TD>";
		
		

}

function f_changeNodeType(azFlag){
	if(azFlag == 0){
		aRoomTxt.value = "";
		aRoomId.value = "";
	}else{
		zRoomTxt.value = "";
		zRoomId.value = "";
	}
}

function f_reset(){
	aRoomTxt.value = "";
	aRoomId.value = "";
	zRoomTxt.value = "";
	zRoomId.value = "";
}

function view(countResult, args){
	
//展示结果
var srvDesc = atomSel.options[atomSel.selectedIndex].text;
var aRoomName = nvl(aRoomTxt.value);
var zRoomName = nvl(zRoomTxt.value);
	var eqpTypeDesc = nvl(eqpTypeSel.options[eqpTypeSel.selectedIndex].text);
	var portTypeDesc = nvl(portTypeSel.options[portTypeSel.selectedIndex].text);
	
	var node = srvResultTree.createTreeNode();
	node.srvName = srvDesc;
if(args.azFlag=="-1"){
	node.azFlag = "不关心";
}else{
	node.azFlag = args.azFlag;
}
var conditionStr = "";
if(args.azFlag=="A"){
	conditionStr += aResType.options[aResType.selectedIndex].text + ":" + aRoomName+"；  ";
}else if(args.azFlag=="Z"){
	conditionStr += zResType.options[zResType.selectedIndex].text + ":" + zRoomName+"；  ";
}else if(args.azFlag=="-1"){
	conditionStr += "A端机房："+aRoomName+"；  Z端机房:"+zRoomName+"；  ";
}

if(args.rate!="" && args.rate!="-1"){
	conditionStr += "速率："+args.rateDesc+"；  ";
}
if(args.eqpType!="" && args.eqpType!="-1"){
	conditionStr += "设备类型："+eqpTypeDesc+"；  ";
}  
if(args.portType!="" && args.portType!="-1"){
	conditionStr += "端口类型："+portTypeDesc+"；  ";
}
if(args.srvId=="1003" && args.pairNo!=""){
	conditionStr += "纤芯数量："+args.pairNo+"；  ";
}
node.condition = conditionStr;

	if(countResult==0){
  node.result = "不具备";
}else if(countResult==1){
  node.result = "具备";
}else if(countResult==2){
  node.result = "部分具备(有路由，端口资源不足)";
}else if(countResult==3){
	node.result = "具备(只能开通10M及以下业务)";
}

srvResultTree.add(node);
node.refresh();

document.all.doBtn.style.display="";
	document.all.cancleBtn.style.display="none";
	document.all.cond1.disabled = false;
	document.all.cond2.disabled = false;
	document.all.cond3.disabled = false;
	document.all.cond4.disabled = false;
	document.all.resetBtn.disabled = false; 
}
//
function cancle(){
	if(ajax!=null){
		ajax.cancle(ajax.req);
	}
	document.all.doBtn.style.display="";
	document.all.cancleBtn.style.display="none";
	document.all.cond1.disabled = false;
	document.all.cond2.disabled = false;
	document.all.cond3.disabled = false;
	document.all.cond4.disabled = false;
	document.all.resetBtn.disabled = false; 
	document.all.p_o_p_9.style.display="none";
}

function nvl(inPara,replPara){

	return inPara == null?replPara:inPara;

	}