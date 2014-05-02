dhtmlxEvent(window,"load", doOnLoad);
var grid,toolbar;
function doGenPlan(dhxWins,patientId,name){
	dhtmlx.skin = "dhx_skyblue";
	window.dhx_globalImgPath =parent.contextPath+"/js/dhtmlx/imgs/";
	 
	 var win = dhxWins.createWindow('genPlan',150,150,600,400);
	 dhxWins.window('genPlan').setText("生成计划");
	 var addDhxForm =dhxWins.window('genPlan').attachForm(genPlanFormData);
	 addDhxForm.setItemValue('patientId',patientId);
	 addDhxForm.setItemValue('patientName',name);
	 addDhxForm.attachEvent("onButtonClick", function(name) {
	    	if(name =='save'){
	    		this.send("manageOperation.spr?action=addOrUpdatePlan","post",function(respon){
	    			alert("生成成功");
	    			parent.loadPage('p.spr?page=patientManage');
	    			
	    		});
	    		dhxWins.window('addUser').close();
	    	
	    	}else if(name =='cancel'){
	    		dhxWins.window('addUser').close();
	    	}
		});
	 addDhxForm.attachEvent("onSelectionChange", onChangeHandle );
	 addDhxForm.attachEvent("onChange", onChangeHandle );
	 onChangeHandle();

}
function onChangeHandle(){
 	var selectBmId=this.getCombo("bmId").getSelectedValue();
 	var sql="select user_name ,user_id from BGM.t_user where bm_id='"+selectBmId+"'";
 	var list=db.queryForList(sql);
 	this.getCombo("userId").clearAll();
 	list.unshift({value:'ALL',text:"全部"});
 	this.getCombo("userId").addOption(toComboData(list,'user_id','user_name'));
 }
function doSearch(dhxWins){
	dhtmlx.skin = "dhx_skyblue";
	window.dhx_globalImgPath =parent.contextPath+"/js/dhtmlx/imgs/";
	 
	 var win = dhxWins.createWindow('search',150,150,600,400);
	 dhxWins.window('search').setText("条件过滤");
	 var searchForm =dhxWins.window('search').attachForm(searchFormData);
	 searchForm.attachEvent("onButtonClick", function(name) {
	    	if(name =='search'){
	    		var searchSql=gridSql+copyFormToCondition(searchForm);
	    		grid.doQuery(searchSql);
	    		dhxWins.window('search').close();
	    	
	    	}else if(name =='cancel'){
	    		dhxWins.window('search').close();
	    	}
		});
}
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
function doAdd(dhxWins){
	dhtmlx.skin = "dhx_skyblue";
	window.dhx_globalImgPath =parent.contextPath+"/js/dhtmlx/imgs/";
	 
	 var win = dhxWins.createWindow('addUser',150,150,600,400);
	 dhxWins.window('addUser').setText("新增病患");
	 var addDhxForm =dhxWins.window('addUser').attachForm(addFormData);
	 
	 addDhxForm.attachEvent("onButtonClick", function(name) {
	    	if(name =='save'){
	    		this.send("manageOperation.spr?action=addOrUpdatePatient","post",function(respon){
	    			parent.loadPage('p.spr?page=patientManage');
	    		});
	    		dhxWins.window('addUser').close();
	    	
	    	}else if(name =='cancel'){
	    		dhxWins.window('addUser').close();
	    	}
		});
};
function doUpdate(dhxWins,patientId){
	dhtmlx.skin = "dhx_skyblue";
	window.dhx_globalImgPath =parent.contextPath+"/js/dhtmlx/imgs/";
	 
	 var win = dhxWins.createWindow('updateUser',150,150,600,400);
	 dhxWins.window('updateUser').setText("修改病患");
	 var updateDhxForm =dhxWins.window('updateUser').attachForm(updateFormData);
	 var sql="select * from BGM.t_patient where patient_id='"+patientId+"'";
	 var list=db.queryForList(sql);
	 copyObjectToForm(list[0],updateFormData,updateDhxForm);
	 updateDhxForm.attachEvent("onButtonClick", function(name) {
	    	if(name =='save'){
	    		this.send("manageOperation.spr?action=addOrUpdatePatient","post",function(respon){
	    			//alert(respon);
	    			parent.loadPage('p.spr?page=patientManage');
	    		});
	    		dhxWins.window('updateUser').close();
	    	}else if(name =='cancel'){
	    		dhxWins.window('updateUser').close();
	    	}
		});
};
function doOnLoad() {
	
	
	
	grid=createGridObject('gridbox',grid_define);
	grid.enableMultiselect(true);
	initToolBar(grid);

 
}
function initToolBar(grid){
	toolbar=grid.toolBar;
	toolbar.setIconsPath(parent.contextPath+"/js/dhtmlx/imgs/csh_bluefolders/");
	toolbar.addButton('addUser',1,"新增病患","iconWrite2.gif",null);
	toolbar.addButton('updateUser',2,"修改病患","iconWrite2.gif",null);
	toolbar.addButton('deleteUser',3,"删除病患","iconWrite2.gif",null);
	toolbar.addButton('search',4,"条件过滤","iconWrite2.gif",null);
	toolbar.addButton('genPlan',5,"生成计划","iconWrite2.gif",null);
	
	
	toolbar.attachEvent("onClick", function(id) {
        if(id=="addUser"){
        	 var dhxWins = new dhtmlXWindows();
        	 doAdd(dhxWins);
        	
        }else if(id=="updateUser"){
        	var index=grid.getSelectedRowId();
        	index=grid.getRowIndex(index)
        	if(index==-1){
        		alert("请选择一条记录");
        		return;
        	}
        	var patientId = grid.cellByIndex(index, 0).getValue();
        	var dhxWins = new dhtmlXWindows();
        	doUpdate(dhxWins,patientId)
        }else if(id=='deleteUser'){
        	var index=grid.getSelectedRowId();
        	index=grid.getRowIndex(index)
        	if(index==-1){
        		alert("请选择一条记录");
        		return;
        	}
        	var patientId = grid.cellByIndex(index, 0).getValue();
        	doDelete(patientId);
        }else if(id=='search'){
        	var dhxWins = new dhtmlXWindows();
        	doSearch(dhxWins);
        }else if(id=='genPlan'){
        	var index=grid.getSelectedRowId();
        	index=grid.getRowIndex(index)
        	if(index==-1){
        		alert("请选择一条记录");
        		return;
        	}
        	var patientId = grid.cellByIndex(index, 0).getValue();
        	var name = grid.cellByIndex(index, 4).getValue();
        	var dhxWins = new dhtmlXWindows();
        	doGenPlan(dhxWins,patientId,name);
        }
    });
}

//源数据
var addFormData = [
	 				{
	 				    type: "settings",
	 				    position: "label-left",
	 				    labelWidth: 240,
	 				    inputWidth: 300
	 				},
	 				{type:"input", name:"recordNo", label:"病例号:"},
	 				{type:"input", name:"idNo", label:"身份证号:"},
	 				{type:"input", name:"insuranceId", label:"医保号:"},
	 				{type:"input", name:"name", label:"姓名:"},
	 				{type:"combo", name: 'sex', label:'性别:',options:[
	 					                                   				{value: "1", text: "男"},
	 					                                				{value: "2", text: "女"}
	 					                                		]},
	 				{type:"input", name: 'age', label:'年龄:'},
	 				{type:"calendar", name:"bornDate", label:"出生时间:",readonly:1,dateFormat: "%Y-%m-%d"},
	 				{type:"input", name:"contact1", label:"联系方式1:"},
	 				{type:"input", name:"contact2", label:"联系方式2:"},
	 				{type:"input", name:"address", label:"通讯地址:"},
	 				{type:"combo", name: 'type', label:'类型:',options:[
	 					                                   				{value: "1", text: "门诊"},
	 					                                				{value: "2", text: "住院"}
	 					                                		]},
	 				{type:"calendar", name:"checkinTime", label:"入院时间:",readonly:1,dateFormat: "%Y-%m-%d"},
	 				{type:"calendar", name:"checkoutTime", label:"出院时间:",readonly:1,dateFormat: "%Y-%m-%d"},
	 				{type:"input", name:"memo", label:"备注信息:"},
	 				{type:"button", name:"save", value:"保存"},{type:"button", name:"cancel", value:"取消" }];
var updateFormData = [
	 				{
	 				    type: "settings",
	 				    position: "label-left",
	 				    labelWidth: 240,
	 				    inputWidth: 300
	 				},
	 				{type:"hidden", name:"patientId"},
	 				{type:"input", name:"recordNo", label:"病例号:"},
	 				{type:"input", name:"idNo", label:"身份证号:"},
	 				{type:"input", name:"insuranceId", label:"医保号:"},
	 				{type:"input", name:"name", label:"姓名:"},
	 				{type:"combo", name: 'sex', label:'性别:',options:[
	 					                                   				{value: "1", text: "男"},
	 					                                				{value: "2", text: "女"}
	 					                                		]},
	 				{type:"input", name: 'age', label:'年龄:'},
	 				{type:"calendar", name:"bornDate", label:"出生时间:",readonly:1,dateFormat: "%Y-%m-%d"},
	 				{type:"input", name:"contact1", label:"联系方式1:"},
	 				{type:"input", name:"contact2", label:"联系方式2:"},
	 				{type:"input", name:"address", label:"通讯地址:"},
	 				{type:"combo", name: 'type', label:'类型:',options:[
	 					                                   				{value: "1", text: "门诊"},
	 					                                				{value: "2", text: "住院"}
	 					                                		]},
	 				{type:"calendar", name:"checkinTime", label:"入院时间:",readonly:1,dateFormat: "%Y-%m-%d"},
	 				{type:"calendar", name:"checkoutTime", label:"出院时间:",readonly:1,dateFormat: "%Y-%m-%d"},
	 				{type:"input", name:"memo", label:"备注信息:"},
	 				{type:"button", name:"save", value:"保存"},{type:"button", name:"cancel", value:"取消" }];
var searchFormData = [
  	 				{
  	 				    type: "settings",
  	 				    position: "label-left",
  	 				    labelWidth: 240,
  	 				    inputWidth: 300
  	 				},
  	 				{type:"hidden", name:"patientId"},
  	 				{type:"input", name:"recordNo", label:"病例号:"},
  	 				{type:"input", name:"idNo", label:"身份证号:"},
  	 				{type:"input", name:"insuranceId", label:"医保号:"},
  	 				{type:"input", name:"name", label:"姓名:"},
  	 				{type:"combo", name: 'type', label:'类型:',options:[
  	 					                                   				{value: "1", text: "门诊"},
  	 					                                				{value: "2", text: "住院"}
  	 					                                		]},
  	 				{type:"button", name:"search", value:"查询"},{type:"button", name:"cancel", value:"取消" }];
var roomOption=db.queryForList("select dict_id as value, dict_text as text from BGM.t_dict where dict_code='ks'");
var genPlanFormData = [
    	 				{
    	 				    type: "settings",
    	 				    position: "label-left",
    	 				    labelWidth: 240,
    	 				    inputWidth: 300
    	 				},
    	 				{type:"input", name:"patientId", label:"受测人流水号:"},
    	 				{type:"input", name:"patientName", label:"受测人姓名:"},
    	 				{type:"combo", name: 'bmId', label:'检测科室:',options:roomOption},	 
    	 				{type:"combo", name: 'userId', label:'检测人员:'},	
    	 				{type:"calendar", name:"beginTime", label:"开始时间:",readonly:1,dateFormat: "%Y-%m-%d"},
    	 				{type:"calendar", name:"endTime", label:"结束时间:",readonly:1,dateFormat: "%Y-%m-%d"},
    	 				{type:"input", name:"dectectTime", label:"检测时间:"},
    	 				{type:"input", name:"memo", label:"备注:"},
    	 				
    	 				{type:"button", name:"save", value:"生成"},{type:"button", name:"cancel", value:"取消" }];


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
			                                      ]},
			                                      
			 {title:"年龄",width:50,type:"ro"}, 
			 {title:"出生日期",width:80,type:"ro"},
			 {title:"联系方式1",width:80,type:"ro"},
			 {title:"联系方式2",width:80,type:"ro"},
			 {title:"通讯地址",width:80,type:"ro"},
			 {title:"类型",width:50,type:"co",data:[
			                                       {key:"1",value:"门诊"},
			                                       {key:"2",value:"住院"},
			                                      ]},
			 {title:"入院时间",width:80,type:"ro"},
			 {title:"出院时间",width:80,type:"ro"},
			 {title:"备注信息",width:80,type:"ro"}
			
			
			],
		key:"patient_id",
		sql:gridSql
			 
}