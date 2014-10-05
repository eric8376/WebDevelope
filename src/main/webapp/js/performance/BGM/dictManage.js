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
function doAdd(dhxWins){
	
	 
	 var win = dhxWins.createWindow('addUser',150,150,600,400);
	 dhxWins.window('addUser').setText("新增字典");
	 var addDhxForm =dhxWins.window('addUser').attachForm(addFormData);
	 
	 addDhxForm.attachEvent("onButtonClick", function(name) {
	    	if(name =='save'){
	    		this.send("manageOperation.spr?action=addOrUpdateDict","post",function(respon){
	    			parent.loadPage('p.spr?page=dictManage');
	    		});
	    		dhxWins.window('addUser').close();
	    	
	    	}else if(name =='cancel'){
	    		dhxWins.window('addUser').close();
	    	}
		});
};
function doUpdate(dhxWins,userId){
	dhtmlx.skin = "dhx_skyblue";
	window.dhx_globalImgPath =parent.contextPath+"/js/dhtmlx/imgs/";
	 
	 var win = dhxWins.createWindow('updateUser',150,150,600,400);
	 dhxWins.window('updateUser').setText("修改字典");
	 var updateDhxForm =dhxWins.window('updateUser').attachForm(updateFormData);
	 var sql="select * from BGM.t_dict where dict_id='"+userId+"'";
	 var list=db.queryForList(sql);
	 copyObjectToForm(list[0],updateFormData,updateDhxForm);
	 updateDhxForm.attachEvent("onButtonClick", function(name) {
	    	if(name =='save'){
	    		this.send("manageOperation.spr?action=addOrUpdateDict","post",function(respon){
	    			//alert(respon);
	    			parent.loadPage('p.spr?page=dictManage');
	    		});
	    		dhxWins.window('updateUser').close();
	    	}else if(name =='cancel'){
	    		dhxWins.window('updateUser').close();
	    	}
		});
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
	 				{type:"input", name:"dictText", label:"字典名:"},
	 				{type:"combo", name: 'dictCode', label:'类别:',options:[
		 					                                   				{value: "ks", text: "科室"},
		 					                                				{value: "bm", text: "部门"}
		 					                                		]},
	 				{type:"button", name:"save", value:"保存"},{type:"button", name:"cancel", value:"取消" }];
var updateFormData =  [
	 				{
	 				    type: "settings",
	 				    position: "label-left",
	 				    labelWidth: 240,
	 				    inputWidth: 300
	 				},
	 				{type:"hidden", name:"dictId"},
	 				{type:"input", name:"dictText", label:"字典名:"},
	 				{type:"combo", name: 'dictCode', label:'类别:',options:[
		 					                                   				{value: "ks", text: "科室"},
		 					                                				{value: "bm", text: "部门"}
		 					                                		]},
	 				{type:"button", name:"save", value:"保存"},{type:"button", name:"cancel", value:"取消" }];
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