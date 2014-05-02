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
	param+="&addChecklist="+addChecklist+"&deleteChecklist="+deleteChecklist+"&parentId="+projectId;
	dhtmlxAjax.get("manageOperation.spr?action=mapProject"+param,function (respon){
		var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");;
		if(res.result=='success')
		{
			returnTo();
		}
		
	});
}
function doOnLoad() {
	var projectId=getParam('projectId');
	var mapType=getParam('mapType');
	  var viewName="";
	  var columns;
	    if(mapType=='xm'){
	    	columns=[{title:"编号",width:0,type:"ro"},
					 {title:"关键环节",width:200,type:"ro"},
					 {title:"选择",width:100,type:"ch"},
					 {title:"初始选择",width:0,type:"ro"}];
	    	 viewName="nursing.t_per_hj";
	    }else if(mapType=='hj'){
	    	columns=[{title:"编号",width:0,type:"ro"},
					 {title:"一级指标",width:200,type:"ro"},
					 {title:"选择",width:100,type:"ch"},
					 {title:"初始选择",width:0,type:"ro"}];
	    	 viewName="nursing.t_per_zb";
	    }else if(mapType=='bm'){
	    	columns=[{title:"编号",width:0,type:"ro"},
					 {title:"管理部门",width:200,type:"ro"},
					 {title:"选择",width:100,type:"ch"},
					 {title:"初始选择",width:0,type:"ro"}];
	    	 viewName="nursing.t_per_bm";
	    }
	    var filterCondition=" and hosp_id='"+parent.loginedUserInfo.hospId+"'";
		  if(parent.loginedUserInfo.jb!=0){
			  filterCondition+=" and creator_dep_id='"+parent.loginedUserInfo.ks+"'";
		  }  
	  var sql="select dict_id,dict_text,if(t2.son_id is null,0,1),if(t2.son_id is null,0,1) as init_value from (select * from "+viewName+" where 1=1 "+filterCondition+")  t1 left join  nursing.t_per_dict_map  t2 on t1.dict_id=t2.son_id and parent_id='"+projectId+"'";
	var grid_define={
			columns:columns,
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
        	returnTo();
        }
    });
}
function returnTo(){
	var mapType=getParam('mapType')
	if(mapType=='bm')mapType='xm';
	parent.loadPage('manage.spr?action=projectManage&mapType='+mapType);
}