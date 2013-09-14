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
	param+="&addChecklist="+addChecklist+"&deleteChecklist="+deleteChecklist+"&parentId="+projectId;
	dhtmlxAjax.get("manageOperation.spr?action=mapProject"+param,function (respon){
		var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");;
		if(res.result=='success')
		{
			var mapType=getParam('mapType');
			parent.loadPage('manage.spr?action=projectManage&mapType='+mapType);
		}
		
	});
}
function doOnLoad() {
	var mapType=getParam('mapType');
	grid = new dhtmlXGridObject('gridbox');
    grid.setSkin("dhx_skyblue");
    grid.setImagePath(parent.contextPath+"/js/dhtmlx/imgs/");
    var viewName="";
    if(mapType=='xm'){
    	 grid.setHeader("编号,关键环节,选择,初始选择");
    	 viewName="bureau.t_per_hj";
    }else if(mapType=='hj'){
    	 grid.setHeader("编号,一级指标,选择,初始选择");
    	 viewName="bureau.t_per_zb";
    }
   
    grid.setInitWidths("0,100,100,0");
    grid.setColAlign("center,center,center,center");
    grid.setColTypes("ro,ro,ch,ro");
    grid.setColSorting("str,str,str,str");
    grid.init();
   
    var projectId=getParam('projectId');
    var sql="select dict_id,dict_text,if(t2.son_id is null,0,1),if(t2.son_id is null,0,1) as init_value from (select * from "+viewName+" where hosp_id='"+parent.loginedUserInfo.hospId+"')  t1 left join bureau.t_per_dict_map  t2 on t1.dict_id=t2.son_id and parent_id='"+projectId+"'";
	var data=toGridData(db.queryForList(sql),'dict_id');
	grid.parse(data,"json");
	 
}