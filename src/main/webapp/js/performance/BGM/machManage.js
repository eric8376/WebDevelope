dhtmlxEvent(window,"load", doOnLoad);
var grid,toolbar;
//

function onChangeHandle(id){
	if(id=="bmId"){
 	var selectBmId=this.getCombo("bmId").getSelectedValue();
 	var sql="select user_id as value, user_name as text from BGM.t_user ";
 	if(selectBmId!="ALL"){
 		sql+="where bm_id='"+selectBmId+"'";
 	}
 	var list=db.queryForList(sql);
 	this.getCombo("userId").clearAll();
 	list.unshift({value:'',text:"请选择"});
 	this.getCombo("userId").addOption(list);
 	this.getCombo("userId").setComboValue('');
 	
	}
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

function doDelete(id){
	if(id!=null){
		if(!confirm("确定要删除吗？")){
			return;
		}
		dhtmlxAjax.post("manageOperation.spr?action=deleteMach","machId="+id,function(respon){
			var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");;
			if(res.result=='success')
			{
				parent.loadPage('p.spr?page=machManage');
			}
		});
	}
}
//源数据
var roomOption=db.queryForList("select dict_id as value, dict_text as text from BGM.t_dict where dict_code='ks'");
var addFormDefine = {
		formName:"addMach",
		title:"新增设备",
		formData:[
	 				{type: "block", width: 600, list:[
	 				{type:"input", name:"machNo", label:"仪器编号:"},
	 				{type:"combo", name:"ksId", label:"所属科室:",options:roomOption,required:true},
	 				{type: "newcolumn", offset:80},	 
	 				{type:"input", name:"area", label:"所属省市区县:"},
	 				{type:"input", name:"company", label:"所属单位:"}
	 				 ]},{type: "block", width: 600, list:[
	 				                                  
	 				{type:"button", name:"save", value:"保存"},{type: "newcolumn", offset:10},{type:"button", name:"cancel", value:"取消" }]
	 				}],
	 				submitUrl:"manageOperation.spr?action=addOrUpdateMach",
	 				returnUrl:"p.spr?page=machManage"
	};
function doAdd(){
	var addForm=createWindowForm(addFormDefine);
	addForm.setItemValue("checkinTime",new Date().format('yyyy-MM-dd'));
	addForm.setItemValue("checkoutTime","2099-01-01");
	addForm.setItemValue("recordNo",new Date().format('yyyyMMddhhmmss'));
	addForm.setItemValue("source","WEB录入");
};

var updateFormDefine = {
		formName:"updateUser",
		title:"修改设备",
		formData:[
		          	
	 				{type: "block", width: 600, list:[
	 				{type:"hidden", name:"machId"},
	 				{type:"input", name:"machNo", label:"仪器编号:"},
	 				{type:"combo", name:"ksId", label:"所属科室:",options:roomOption,required:true},
	 				{type: "newcolumn", offset:80},	 
	 				{type:"input", name:"area", label:"所属省市区县:"},
	 				{type:"input", name:"company", label:"所属单位:"}
	 				 ]},{type: "block", width: 600, list:[
	 				                                  
	 				{type:"button", name:"save", value:"保存"},{type: "newcolumn", offset:10},{type:"button", name:"cancel", value:"取消" }]
	 				}],
	 				submitUrl:"manageOperation.spr?action=addOrUpdateMach",
	 				returnUrl:"p.spr?page=machManage"
	};
function doUpdate(patientId){
	var updateDhxForm =createWindowForm(updateFormDefine);
	 var sql="select * from BGM.t_terminal where mach_id='"+patientId+"'";
	 var list=db.queryForList(sql);
	 copyObjectToForm(list[0],updateFormDefine.formData,updateDhxForm);
	
};
function doOnLoad() {
	grid=createGridObject('gridbox',grid_define);
	grid.enableMultiselect(true);
	initToolBar(grid);
	

 
}
function initToolBar(grid){
	toolbar=grid.toolBar;
	toolbar.setIconsPath(parent.contextPath+"/images/performance/icon/");
	toolbar.setIconSize(32);
	toolbar.addButton('addUser',1,"新增","add.ico",null);
	toolbar.addButton('updateUser',2,"修改","edit.ico",null);
	toolbar.addButton('deleteUser',3,"删除","delete.ico",null);
	//toolbar.addButton('search',4,"过滤","find.ico",null);
	//toolbar.addButton('genPlan',5,"生成计划","calculator.ico",null);
	
	
	toolbar.attachEvent("onClick", function(id) {
        if(id=="addUser"){
        	 doAdd();
        	
        }else if(id=="updateUser"){
        	if(!checkGridRowSelected(grid)){
        		return;
        	}
        	var patientId = getSelectGridCellValue(grid,0);
        	doUpdate(patientId)
        }else if(id=='deleteUser'){
        	if(!checkGridRowSelected(grid)){
        		return;
        	}
        	var patientId = getSelectGridCellValue(grid,0);
        	doDelete(patientId);
        }else if(id=='search'){
        	 createWindowForm(searchFormDefine);
        }else if(id=='genPlan'){
        	var obj={};
        	if(!checkGridRowSelected(grid,true)){
        		return;
        	}
        	obj.patient_id = getSelectGridCellValue(grid,0);
        	obj.patient_name = getSelectGridCellValue(grid,4);
        	var dhxForm =createWindowForm(genPlanFormDefine);
        	copyObjectToForm(obj,genPlanFormDefine.formData,dhxForm);
        	dhxForm.attachEvent("onSelectionChange", onChangeHandle );
        	dhxForm.attachEvent("onChange", onChangeHandle );
        	//onChangeHandle("bmId");
        }
    });
}

//源数据





var gridSql="select mach_id,mach_no,ks_id,area,company from BGM.t_terminal where 1=1 ";
var grid_define={
		columns:
			[{title:"",width:0,type:"ro"},
			 {title:"仪器编号",width:80,type:"ro"},
			 {title:"所属科室",width:80,type:"co",dataSql:"select dict_id as 'key', dict_text as value from BGM.t_dict where dict_code='ks'"},
			 {title:"所属区域",width:80,type:"ro"},
			 {title:"所属单位",width:80,type:"ro"},
			
			 
			
			
			],
		key:"mach_id",
		sql:gridSql
			 
}