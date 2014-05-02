dhtmlxEvent(window,"load", doOnLoad);
function doOnLoad() {
	
	
	
	grid=createGridObject('gridbox',grid_define);
	grid.enableMultiselect(true);
	initToolBar(grid);

 
}
function initToolBar(grid){
	toolbar=grid.toolBar;
	toolbar.setIconsPath(parent.contextPath+"/js/dhtmlx/imgs/csh_bluefolders/");
//	toolbar.addButton('addUser',1,"新增病患","iconWrite2.gif",null);
//	toolbar.addButton('updateUser',2,"修改病患","iconWrite2.gif",null);
//	toolbar.addButton('deleteUser',3,"删除病患","iconWrite2.gif",null);
//	toolbar.addButton('search',4,"条件过滤","iconWrite2.gif",null);
//	toolbar.addButton('genPlan',5,"生成计划","iconWrite2.gif",null);
//	
//	
//	toolbar.attachEvent("onClick", function(id) {
//        if(id=="addUser"){
//        	 var dhxWins = new dhtmlXWindows();
//        	 doAdd(dhxWins);
//        	
//        }else if(id=="updateUser"){
//        	var index=grid.getSelectedRowId();
//        	index=grid.getRowIndex(index)
//        	if(index==-1){
//        		alert("请选择一条记录");
//        		return;
//        	}
//        	var patientId = grid.cellByIndex(index, 0).getValue();
//        	var dhxWins = new dhtmlXWindows();
//        	doUpdate(dhxWins,patientId)
//        }else if(id=='deleteUser'){
//        	var index=grid.getSelectedRowId();
//        	index=grid.getRowIndex(index)
//        	if(index==-1){
//        		alert("请选择一条记录");
//        		return;
//        	}
//        	var patientId = grid.cellByIndex(index, 0).getValue();
//        	doDelete(patientId);
//        }else if(id=='search'){
//        	var dhxWins = new dhtmlXWindows();
//        	doSearch(dhxWins);
//        }else if(id=='genPlan'){
//        	var index=grid.getSelectedRowId();
//        	index=grid.getRowIndex(index)
//        	if(index==-1){
//        		alert("请选择一条记录");
//        		return;
//        	}
//        	var patientId = grid.cellByIndex(index, 0).getValue();
//        	var name = grid.cellByIndex(index, 4).getValue();
//        	var dhxWins = new dhtmlXWindows();
//        	doGenPlan(dhxWins,patientId,name);
//        }
//    });
}
var gridSql="select t1.plan_id,t3.name,t2.user_name,t1.begin_time,t1.end_time,t1.memo,t1.dectect_time " +
		"from (BGM.t_plan t1 left join BGM.t_user t2 on  t1.user_id=t2.user_id) " +
		"left join BGM.t_patient t3 on t1.patient_id=t3.patient_id" +
		" where 1=1 ";
var grid_define={
		columns:
			[{title:"计划号",width:0,type:"ro"},
			 {title:"病患姓名",width:130,type:"ro"},
			 {title:"检测人姓名",width:130,type:"ro"},
			 {title:"开始时间",width:130,type:"ro"},
			 {title:"结束时间",width:130,type:"ro"},
			 {title:"备注",width:150,type:"ro"}, 
			 {title:"检测时间",width:100,type:"ro"},
			
			],
		key:"plan_id",
		sql:gridSql
			 
}