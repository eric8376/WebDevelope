dhtmlxEvent(window,"load", doOnLoad);
var grid;
function saveMap(){
	var addChecklist="";
	var deleteChecklist="";
	var param="";
	var roleId=getParam('roleId');
	for(var i=0;i<grid.getRowsNum();i++){
		if(grid.cellByIndex(i,3).isChecked() && grid.cellByIndex(i,3).getValue()!=grid.cellByIndex(i,4).getValue()){
			addChecklist+=grid.cellByIndex(i,0).getValue()+",";
		}else if(grid.cellByIndex(i,3).getValue()!=grid.cellByIndex(i,4).getValue()){
			deleteChecklist+=grid.cellByIndex(i,0).getValue()+",";
		}
		
	}
//	alert(addChecklist+"|"+deleteChecklist);
	param+="&addChecklist="+addChecklist+"&deleteChecklist="+deleteChecklist+"&roleId="+roleId;
	dhtmlxAjax.get("manageOperation.spr?action=mapRole"+param,function (respon){
		var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");;
		if(res.result=='success')
		{
			parent.loadPage('manage.spr?action=roleManage');
		}
		
	});
}
function doOnLoad() {
	
	grid = new dhtmlXGridObject('gridbox');
    grid.setSkin("dhx_skyblue");
    grid.setImagePath(parent.contextPath+"/js/dhtmlx/imgs/");
    grid.setHeader("编号,科室,项目,选择,初始选择");
    grid.setInitWidths("0,100,100,100,0");
    grid.setColAlign("center,center,center,center,center");
    grid.setColTypes("ro,co,co,ch,ro");
    grid.setColSorting("str,str,str,str,str");
   
    var combo1 = grid.getCombo(1);
	var serviceCall = new ServiceCall();
	var obj1 = new Object();
	obj1.sql = "select dict_id as 'key',dict_text as 'value' from bureau.t_per_ks";
	serviceCall.init("queryDataSvc");
	var rt1 = serviceCall.execute(obj1);
	for ( var i = 0; i < rt1.list.length; i++) {
		combo1.put(rt1.list[i].key, rt1.list[i].value);
	}
	var combo2 = grid.getCombo(2);
	var serviceCall = new ServiceCall();
	var obj2 = new Object();
	obj2.sql = "select dict_id as 'key',dict_text as 'value' from bureau.t_per_xm";
	serviceCall.init("queryDataSvc");
	var rt2 = serviceCall.execute(obj2);
	for ( var i = 0; i < rt2.list.length; i++) {
		combo2.put(rt2.list[i].key, rt2.list[i].value);
	}
	grid.init();
    var serviceCall = new ServiceCall();
    var obj3=new Object();
    var roleId=getParam('roleId');
    obj3.sql="select t1.ksxm_id,ks_id,xm_id,if(t2.role_id is null,0,1),if(t2.role_id is null,0,1) as init_value from bureau.t_per_xm_ks  t1 left join bureau.t_per_role_xm  t2 on t1.ksxm_id=t2.ksxm_id and role_id='"+roleId+"'";
	serviceCall.init("queryDataSvc");
	var rt3= serviceCall.execute(obj3);
	var data=toGridData(rt3.list,'ksxmId');
	grid.parse(data,"json");
	//alert(Object.toJSON(rt3));
    
    grid.attachEvent("onRowSelect", function(id,ind){
    	
    	//alert(grid.cells(id,0).getValue());
    })
 
}