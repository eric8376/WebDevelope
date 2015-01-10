dhtmlxEvent(window,"load", doOnLoad);
var grid,toolbar;
//
var roomOption=db.queryForList("select dict_id as value, dict_text as text from BGM.t_dict where dict_code='ks'");
roomOption.unshift({value:'ALL',text:"全部"});
var userOption=db.queryForList("select user_id as value, user_name as text from BGM.t_user ");
var genPlanFormDefine={
		formName:"genPlan",
		title:"生成计划",
		formData:[
	 				
	 				{type: "block", width: 600, list:[
	 				{type:"input", name:"patientId", label:"受测人流水号:",required:true},
	 				{type:"input", name:"patientName", label:"受测人姓名:",required:true},
	 				{type:"combo", name: 'bmId', label:'检测科室:',options:roomOption,required:true},	 
	 				{type:"combo", name: 'userId', label:'检测人员:',options:userOption,required:true},	
	 				{type: "newcolumn", offset:80},	
	 				{type:"calendar", name:"beginTime", label:"开始时间:",readonly:1,dateFormat: "%Y-%m-%d",required:true},
	 				{type:"calendar", name:"endTime", label:"结束时间:",readonly:1,dateFormat: "%Y-%m-%d",required:true},
	 				{type:"input", name:"dectectTime", label:"检测时间:",required:true},
	 				{type:"input", name:"memo", label:"备注:",required:true},
	 				 ]},
	 				{type: "block", width: 600, list:[
	 				{type:"button", name:"save", value:"生成"},{type: "newcolumn", offset:10},	{type:"button", name:"cancel", value:"取消" }
	 				]}
	 				],
		submitUrl:"manageOperation.spr?action=addOrUpdatePlan",
		returnUrl:"p.spr?page=patientManage"};

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
		dhtmlxAjax.post("manageOperation.spr?action=deletePatient","patientId="+id,function(respon){
			var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");;
			if(res.result=='success')
			{
				parent.loadPage('p.spr?page=patientManage');
			}
		});
	}
}
var addFormDefine = {
		formName:"addUser",
		title:"新增病患",
		formData:[
	 				{type: "block", width: 600, list:[
	 				{type:"input", name:"recordNo", label:"病例号:",required:true},
	 				{type:"input", name:"idNo", label:"身份证号:"},
	 				{type:"input", name:"insuranceId", label:"医保号:"},
	 				{type:"input", name:"name", label:"姓名:",required:true},
	 				{type:"combo", name: 'sex', label:'性别:',required:true,options:[
	 					                                   				{value: "1", text: "男"},
	 					                                				{value: "2", text: "女"}
	 					                                		]},
	 			                               		
	 				{type:"input", name: 'age', label:'年龄:'},
	 			
	 				{type:"calendar", name:"bornDate", label:"出生时间:",readonly:1,dateFormat: "%Y-%m-%d"},
	 				{type:"input", name:"source", label:"病例来源:"},
	 				{type: "newcolumn", offset:80},	 
	 				{type:"input", name:"contact1", label:"联系方式1:"},
	 				{type:"input", name:"contact2", label:"联系方式2:"},
	 				{type:"input", name:"address", label:"通讯地址:"},
	 				{type:"combo", name: 'type', label:'类型:',required:true,options:[
	 					                                   				{value: "1", text: "门诊"},
	 					                                				{value: "2", text: "住院"}
	 					                                		]},
	 				{type:"calendar", name:"checkinTime", label:"入院时间:",required:true,readonly:1,dateFormat: "%Y-%m-%d"},
	 				{type:"calendar", name:"checkoutTime", label:"出院时间:",required:true,readonly:1,dateFormat: "%Y-%m-%d"},
	 				{type:"input", name:"memo", label:"备注信息:"},
	 				{type:"input", name:"creator", label:"录入人:"},
	 				 ]},{type: "block", width: 600, list:[
	 				                                  
	 				{type:"button", name:"save", value:"保存"},{type: "newcolumn", offset:10},{type:"button", name:"cancel", value:"取消" }]
	 				}],
	 				submitUrl:"manageOperation.spr?action=addOrUpdatePatient",
	 				returnUrl:"p.spr?page=patientManage"
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
		title:"修改病患",
		formData:[
  	 				{type: "block", width: 600, list:[
  	 				{type:"hidden", name:"patientId"},
  	 				{type:"input", name:"recordNo", label:"病例号:",required:true},
  	 				{type:"input", name:"idNo", label:"身份证号:",required:true},
  	 				{type:"input", name:"insuranceId", label:"医保号:",required:true},
  	 				{type:"input", name:"name", label:"姓名:",required:true},
  	 				{type:"combo", name: 'sex', label:'性别:',required:true,options:[
  	 					                                   				{value: "1", text: "男"},
  	 					                                				{value: "2", text: "女"}
  	 					                                		]},
  	 				{type:"input", name: 'age', label:'年龄:',required:true},
  	 				{type:"calendar", name:"bornDate", label:"出生时间:",readonly:1,dateFormat: "%Y-%m-%d",required:true},
  	 				{type: "newcolumn", offset:80},	 
  	 				{type:"input", name:"contact1", label:"联系方式1:",required:true},
  	 				{type:"input", name:"contact2", label:"联系方式2:",required:true},
  	 				{type:"input", name:"address", label:"通讯地址:",required:true},
  	 				{type:"combo", name: 'type', label:'类型:',required:true,options:[
  	 					                                   				{value: "1", text: "门诊"},
  	 					                                				{value: "2", text: "住院"}
  	 					                                		]},
  	 				{type:"calendar", name:"checkinTime", label:"入院时间:",readonly:1,dateFormat: "%Y-%m-%d",button: "icon",required:true},
  	 				{type:"calendar", name:"checkoutTime", label:"出院时间:",readonly:1,dateFormat: "%Y-%m-%d",required:true},
  	 				{type:"input", name:"memo", label:"备注信息:",required:true},
  	 				 ]},{type: "block", width: 600, list:[
  	 				{type:"button", name:"save", value:"保存"},{type: "newcolumn", offset:10},{type:"button", name:"cancel", value:"取消" }]
  	 				}],
	 				submitUrl:"manageOperation.spr?action=addOrUpdatePatient",
	 				returnUrl:"p.spr?page=patientManage"
	};
function doUpdate(patientId){
	var updateDhxForm =createWindowForm(updateFormDefine);
	 var sql="select * from BGM.t_patient where patient_id='"+patientId+"'";
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
	toolbar.addButton('search',4,"过滤","find.ico",null);
	toolbar.addButton('genPlan',5,"生成计划","calculator.ico",null);
	
	
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
        	if(!checkGridRowSelected(grid)){
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





var gridSql="select patient_id,record_no,id_no,insurance_id,name,sex,age,born_date,contact1,contact2,address,type,checkin_time,checkout_time,memo from BGM.t_patient where 1=1 ";
var grid_define={
		columns:
			[{title:"流水号",width:80,type:"ro"},
			 {title:"病例号",width:80,type:"ro"},
			 {title:"身份证号",width:80,type:"ro"},
			 {title:"医保号",width:80,type:"ro"},
			 {title:"姓名",width:80,type:"ro"},
			 {title:"性别",width:50,type:"co",data:[
			                                       {key:"1",value:"男"},
			                                       {key:"2",value:"女"},
			                                       {key: "null", value: "请选择"}
			                                      ]},
			                                      
			 {title:"年龄",width:50,type:"ro"}, 
			 {title:"出生日期",width:80,type:"ro"},
			 {title:"联系方式1",width:80,type:"ro"},
			 {title:"联系方式2",width:80,type:"ro"},
			 {title:"通讯地址",width:80,type:"ro"},
			 {title:"类型",width:50,type:"co",data:[
			                                       {key:"1",value:"门诊"},
			                                       {key:"2",value:"住院"},
			                                       {key: "null", value: "请选择"}
			                                      ]},
			 {title:"入院时间",width:80,type:"ro"},
			 {title:"出院时间",width:80,type:"ro"},
			 {title:"备注信息",width:80,type:"ro"}
			
			
			],
		key:"patient_id",
		sql:gridSql
			 
}