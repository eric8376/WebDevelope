dhtmlxEvent(window,"load", doOnLoad);
var grid,toolbar;
function doDelete(id){
	if(id!=null){
		if(!confirm("确定要删除吗？")){
			return;
		}
		dhtmlxAjax.post("manageOperation.spr?action=deleteUser","userId="+id,function(respon){
			var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");;
			if(res.result=='success')
			{
				parent.loadPage('p.spr?page=userManage');
			}
		});
	}
}
//源数据
var roomOption=db.queryForList("select dict_id as value, dict_text as text from BGM.t_dict where dict_code='ks'");
var addFormData = {
		formName:"addUser",
		title:"新增用户",
		fieldData:[
	 				
	 				{type:"input", name:"userName", label:"用户名:"},
	 				{type:"password", name:"password", label:"密码:"},
	 				{type:"password", name:"repassword", label:"确认密码:"},
	 				{type:"input", name:"email", label:"邮箱:"},
	 				{type:"input", name:"phone", label:"手机:"},
	 				{type:"combo", name: 'role', label:'角色:',options:[
	 					                                   				{value: "1", text: "管理员"},
	 					                                				{value: "2", text: "职员"}
	 					                                		]},
	 				{type:"combo", name: 'bmId', label:'科室:',options:roomOption},	 	                                		
	 				{type:"input", name: 'houseId', label:'负责病房:'},
	 				{type:"input", name: 'bedId', label:'负责病床:'}
	 				],
	   buttonData:[	
                 {type:"button", name:"save", value:"保存"},
                 {type:"button", name:"cancel", value:"取消" }
                 ],
       submitUrl:"manageOperation.spr?action=addOrUpdateUser",
	   returnUrl:"p.spr?page=userManage"
			};
var updateFormData =  {
		formName:"updateUser",
		title:"修改用户",
		fieldData: [
   	 				
   	 				{type:"hidden", name:"userId"},
   	 				{type:"input", name:"userName", label:"用户名:"},
   	 				{type:"password", name:"password", label:"密码:"},
   	 				{type:"password", name:"repassword", label:"确认密码:"},
   	 				{type:"input", name:"email", label:"邮箱:"},
   	 				{type:"input", name:"phone", label:"手机:"},
   	 				{type:"combo", name: 'role', label:'角色:',options:[
   	 					                                   				{value: "1", text: "管理员"},
   	 					                                				{value: "2", text: "职员"}
   	 					                                		]},
   	 				{type:"combo", name: 'bmId', label:'科室:',options:roomOption},	                                		
   	 				{type:"input", name: 'houseId', label:'负责病房:'},
   	 				{type:"input", name: 'bedId', label:'负责病床:'}],
   	   buttonData:[			
   	 				{type:"button", name:"save", value:"保存"},{type:"button", name:"cancel", value:"取消" }
   	 			  ],
   	 	   submitUrl:"manageOperation.spr?action=addOrUpdateUser",
   		   returnUrl:"p.spr?page=userManage"
   				};
function doUpdate(userId){
	 var updateDhxForm=createWindowForm(updateFormData);
	 var sql="select * from BGM.t_user where user_id='"+userId+"'";
	 var list=db.queryForList(sql);
	 copyObjectToForm(list[0],updateFormData.formData,updateDhxForm);
};
function doOnLoad() {
	
	
	
	grid=createGridObject('gridbox',grid_define);
	initToolBar(grid);

 
}
function initToolBar(grid){
	toolbar=grid.toolBar;
	toolbar.setIconsPath(parent.contextPath+"/images/performance/icon/");
	toolbar.setIconSize(32);
	toolbar.addButton('addUser',1,"新增","add.ico",null);
	toolbar.addButton('updateUser',2,"修改","edit.ico",null);
	toolbar.addButton('deleteUser',3,"删除","delete.ico",null);
	
	
	toolbar.attachEvent("onClick", function(id) {
        if(id=="addUser"){
        	createWindowForm(addFormData);
        	
        }else if(id=="updateUser"){
        	var index=grid.getSelectedRowId();
        	index=grid.getRowIndex(index)
        	if(index==-1){
        		alert("请选择一条记录");
        		return;
        	}
        	var userId = grid.cellByIndex(index, 0).getValue();
        	var dhxWins = new dhtmlXWindows();
        	doUpdate(userId)
        }else if(id=='deleteUser'){
        	var index=grid.getSelectedRowId();
        	index=grid.getRowIndex(index)
        	if(index==-1){
        		alert("请选择一条记录");
        		return;
        	}
        	var patientId = grid.cellByIndex(index, 0).getValue();
        	doDelete(patientId);
        }
    });
}

//源数据
var roomOption=db.queryForList("select dict_id as value, dict_text as text from BGM.t_dict where dict_code='ks'");




var grid_define={
		columns:
			[{title:"",width:0,type:"ro"},
			 {title:"用户名",width:90,type:"ro"},
			 {title:"邮箱",width:90,type:"ro"},
			 {title:"手机",width:90,type:"ro"},
			 {title:"角色",width:90,type:"co",data:[
			                                       {key: "1", value: "管理员"},
	 					                           {key: "2", value: "职员"}
			                                      ]},
			 {title:"科室",width:50,type:"co",dataSql:"select dict_id as 'key', dict_text as value from BGM.t_dict where dict_code='ks'"},                                     
			 {title:"负责病房",width:100,type:"ro"}, 
			 {title:"负责病床",width:100,type:"ro"}
			],
		key:"user_id",
		sql:"select user_id,user_name,email,phone,role,bm_id,house_id,bed_id from BGM.t_user where 1=1 "
			 
}