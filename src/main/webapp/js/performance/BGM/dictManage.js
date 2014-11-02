dhtmlxEvent(window,"load", doOnLoad);
var grid,toolbar;
function doDelete(id){
	if(id!=null){
		if(!confirm("确定要删除吗？")){
			return;
		}
		dhtmlxAjax.post("manageOperation.spr?action=deleteDict","dictId="+id,function(respon){
			var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");;
			if(res.result=='success')
			{
				parent.loadPage('p.spr?page=dictManage');
			}
		});
	}
}

function doUpdate(userId){
	
	 
	 var updateDhxForm=createWindowForm(updateFormData);
	 var sql="select * from BGM.t_dict where dict_id='"+userId+"'";
	 var list=db.queryForList(sql);
	 copyObjectToForm(list[0],updateFormData.formData,updateDhxForm);
};
function doOnLoad() {
	
	
	
	grid=createGridObject('gridbox',grid_define);
	initToolBar(grid);

 
}
function initToolBar(grid){
	toolbar=grid.toolBar;
	toolbar.setIconSize(32);
	toolbar.setIconsPath(parent.contextPath+"/images/performance/icon/");
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
        	var patientId = grid.cellByIndex(index, 0).getValue();
        	doUpdate(patientId)
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
var addFormData = {
		formName:"addDict",
		title:"新增字典",
		fieldData:[
	 				
	 				{type:"input", name:"dictText", label:"字典名:",required:true},
	 				{type:"combo", name: 'dictCode', label:'类别:',options:[
		 					                                   				{value: "ks", text: "科室"},
		 					                                				{value: "bm", text: "部门"}],required:true
	 				}
	 				],
		buttonData:[{type:"button", name:"save", value:"保存"},{type:"button", name:"cancel", value:"取消" }],
		submitUrl:"manageOperation.spr?action=addOrUpdateDict",
		returnUrl:"p.spr?page=dictManage"
		             };
var updateFormData = {
		formName:"updateDict",
		title:"修改字典",
		fieldData: [
	 				
	 				{type:"hidden", name:"dictId"},
	 				{type:"input", name:"dictText", label:"字典名:",required:true},
	 				{type:"combo", name: 'dictCode', label:'类别:',options:[
		 					                                   				{value: "ks", text: "科室"},
		 					                                				{value: "bm", text: "部门"}
		 					                                		],required:true}
	 				],
	 	buttonData:[
	 	            {type:"button", name:"save", value:"保存"},
	 	            {type:"button", name:"cancel", value:"取消" }
	 	            ],
	 				submitUrl:"manageOperation.spr?action=addOrUpdateDict",
	 				returnUrl:"p.spr?page=dictManage"
	 				             };			
	 			
var grid_define={
		columns:
			[{title:"",width:0,type:"ro"},
			 {title:"字典类别",width:150,type:"co",data:[
				                                       {key:"ks",value:"科室"},
				                                       {key:"bm",value:"部门"},
				                                      ]},
			 {title:"字典名",width:180,type:"ro"}
			 
			],
		key:"dict_id",
		sql:"select dict_id,dict_code,dict_text from BGM.t_dict where 1=1 "
			 
}