dhtmlxEvent(window,"load", doOnLoad);
function doOnLoad() {
	
	
	
	grid=createGridObject('gridbox',grid_define);
	grid.enableMultiselect(true);
	initToolBar(grid);

 
}
var searchFormDefine={
		formName:"search",
		title:"条件过滤",
		formData: [
  	 				{type: "block", width: 600, list:[
  	 				{type:"hidden", name:"patientId"},
  	 				{type:"input", name:"recordNo", label:"病例号:"},
  	 				{type:"input", name:"idNo", label:"身份证号:"},
  	 				{type:"input", name:"insuranceId", label:"医保号:"},
  	 				{type: "newcolumn", offset:80},	 
  	 				{type:"input", name:"name", label:"姓名:"},
  	 				{type:"combo", name: 'type', label:'类型:',options:[
  	 					                                   				{value: "1", text: "门诊"},
  	 					                                				{value: "2", text: "住院"}
  	 					                                		]},
  	 			     ]},	 
  	 			  {type: "block", width: 600, list:[
  	 				{type:"button", name:"search", value:"查询"},{type: "newcolumn", offset:0},{type:"button", name:"cancel", value:"取消" }
  	 			 ]}
  	 				],
  	 		searchFunction:function(searchForm){
  	 			var likelist="name";
  	 			var searchSql=gridSql+copyFormToCondition(searchForm,likelist);
	    		grid.doQuery(searchSql);
	    		searchForm.parentWins.window('search').close();
  	 		}		
		};
function initToolBar(grid){
	toolbar=grid.toolBar;
	toolbar.setIconsPath(parent.contextPath+"/images/performance/icon/");
	toolbar.setIconSize(32);

	toolbar.addButton('search',1,"过滤","find.ico",null);

	
	toolbar.attachEvent("onClick", function(id) {
        if(id=='search'){
        	 createWindowForm(searchFormDefine);
        }
    });
}
var gridSql="select t1.check_id,t3.name,t2.user_name,t1.mach_id,t1.check_result,t1.analysis_result,t1.check_time,t1.memo " +
		"from (BGM.t_result t1 left join BGM.t_user t2 on  t1.user_id=t2.user_id) " +
		"left join BGM.t_patient t3 on t1.patient_id=t3.patient_id" +
		" where 1=1 ";
var grid_define={
		columns:
			[{title:"检测号",width:130,type:"ro"},
			 {title:"病患姓名",width:130,type:"ro"},
			 {title:"检测人姓名",width:130,type:"ro"},
			 {title:"检测机器编号",width:130,type:"ro"},
			 {title:"检测结果",width:130,type:"ro"},
			 {title:"分析结果",width:150,type:"ro"}, 
			 {title:"检测时间",width:100,type:"ro"},
			 {title:"备注",width:180,type:"ro"},
			
			],
		key:"check_id",
		sql:gridSql
			 
}