dhtmlxEvent(window,"load", doOnLoad);
var grid;
function saveMap(){
	var addChecklist="";
	var deleteChecklist="";
	var param="";
	var projectId=getParam('projectId');
	for(var i=0;i<grid.getRowsNum();i++){
		if(grid.cellByIndex(i,2).isChecked() && grid.cellByIndex(i,2).getValue()!=grid.cellByIndex(i,3).getValue()){
			addChecklist+=grid.cellByIndex(i,0).getValue()+",";
		}else if(grid.cellByIndex(i,2).getValue()!=grid.cellByIndex(i,3).getValue()){
			deleteChecklist+=grid.cellByIndex(i,0).getValue()+",";
		}
		
	}
//	alert(addChecklist+"|"+deleteChecklist);
	param+="&addChecklist="+addChecklist+"&deleteChecklist="+deleteChecklist+"&projectId="+projectId;
	dhtmlxAjax.get("manageOperation.spr?action=mapProject"+param,function (respon){
		var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");;
		if(res.result=='success')
		{
			parent.loadPage('manage.spr?action=projectManage');
		}
		
	});
}
function doOnLoad() {
	
	grid = new dhtmlXGridObject('gridbox');
    grid.setSkin("dhx_skyblue");
    grid.setImagePath(parent.contextPath+"/js/dhtmlx/imgs/");
    grid.setHeader("编号,科室,选择,初始选择");
    grid.setInitWidths("0,100,100,0");
    grid.setColAlign("center,center,center,center");
    grid.setColTypes("ro,ro,ch,ro");
    grid.setColSorting("str,str,str,str");
    grid.init();
    var serviceCall = new ServiceCall();
    var obj=new Object();
    var projectId=getParam('projectId');
    obj.sql="select dict_id,dict_text,if(t2.ks_id is null,0,1),if(t2.ks_id is null,0,1) as init_value from (select * from t_per_bm where 1=1 and  hosp_id='"+parent.loginedUserInfo.hospId+"') t1 left join t_per_xm_ks  t2 on t1.dict_id=t2.ks_id and xm_id='"+projectId+"'";
	serviceCall.init("queryDataSvc");
	var rt= serviceCall.execute(obj);
	var data=toGridData(rt.list,'dict_id');
	grid.parse(data,"json");
	
    
    grid.attachEvent("onRowSelect", function(id,ind){
    	
    	//alert(grid.cells(id,0).getValue());
    })
 
}