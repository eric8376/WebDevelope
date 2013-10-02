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
	var projectId=getParam('projectId');
    var sql="select dict_id,dict_text,if(t2.ks_id is null,0,1),if(t2.ks_id is null,0,1) as init_value from (select * from t_per_bm where 1=1 and  hosp_id='"+parent.loginedUserInfo.hospId+"') t1 left join t_per_xm_ks  t2 on t1.dict_id=t2.ks_id and xm_id='"+projectId+"'";
	var grid_define={
			columns:
				[{title:"编号",width:0,type:"ro"},
				 {title:"科室",width:200,type:"ro"},
				 {title:"选择",width:100,type:"ch"},
				 {title:"初始选择",width:0,type:"ro"}
				
				],
			key:"dict_id",
			sql:sql
				 
	}
	grid=createGridObject('gridbox',grid_define);
	initToolBar(grid);
	
	
    
    grid.attachEvent("onRowSelect", function(id,ind){
    	
    	//alert(grid.cells(id,0).getValue());
    })
 
}
function initToolBar(grid){
	toolbar=grid.toolBar;
	toolbar.setIconsPath(parent.contextPath+"/js/dhtmlx/imgs/csh_bluefolders/");
	toolbar.addButton('saveMap',1,"保存","iconWrite2.gif",null);
	toolbar.addButton('return',1,"返回","iconWrite2.gif",null);
	
	
	toolbar.attachEvent("onClick", function(id) {
        if(id=="saveMap"){
        	saveMap();
        }else if(id=="return"){
        	parent.loadPage('manage.spr?action=projectManage');
        }
    });
}