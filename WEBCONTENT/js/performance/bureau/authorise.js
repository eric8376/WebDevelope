dhtmlxEvent(window,"load", doOnLoad);
var grid;
function saveMap(){
	var addChecklist="";
	var deleteChecklist="";
	var param="";
	var userId=getParam('userId');
	for(var i=0;i<grid.getRowsNum();i++){
		if(grid.cellByIndex(i,2).isChecked() && grid.cellByIndex(i,2).getValue()!=grid.cellByIndex(i,3).getValue()){
			addChecklist+=grid.cellByIndex(i,0).getValue()+",";
		}else if(grid.cellByIndex(i,2).getValue()!=grid.cellByIndex(i,3).getValue()){
			deleteChecklist+=grid.cellByIndex(i,0).getValue()+",";
		}
		
	}
//	alert(addChecklist+"|"+deleteChecklist);
	param+="&addChecklist="+addChecklist+"&deleteChecklist="+deleteChecklist+"&userId="+userId;
	dhtmlxAjax.get("manageOperation.spr?action=doAuthorise"+param,function (respon){
		var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");;
		if(res.result=='success')
		{
			parent.loadPage('manage.spr?action=userManage');
		}
		
	});
}
function doOnLoad() {
	
	grid = new dhtmlXGridObject('gridbox');
    grid.setSkin("dhx_skyblue");
    grid.setImagePath(parent.contextPath+"/js/dhtmlx/imgs/");
    grid.setHeader("编号,角色,选择,初始选择");
    grid.setInitWidths("0,100,100,0");
    grid.setColAlign("center,center,center,center");
    grid.setColTypes("ro,ro,ch,ro");
    grid.setColSorting("str,str,str,str");
    grid.init();
  
    var userId=getParam('userId');
    var sql="select dict_id,dict_text,if(t2.role_id is null,0,1),if(t2.role_id is null,0,1) as init_value from bureau.t_per_role  t1 left join bureau.t_per_user_role  t2 on t1.dict_id=t2.role_id and user_id='"+userId+"'";
	var data=toGridData(db.queryForList(sql),'dictId');
	grid.parse(data,"json");
	
    
    grid.attachEvent("onRowSelect", function(id,ind){
    	
    	//alert(grid.cells(id,0).getValue());
    })
 
}