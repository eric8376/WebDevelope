dhtmlxEvent(window,"load", doOnLoad);
var grid,toolbar;
function doDelete(id){
	if(id!=null){
//		if(parent.loginedUserInfo.jb!='0'){
//			alert("非管理员不能删除");
//			return;
//		}
		if(!confirm("确定要删除吗？")){
			return;
		}
		dhtmlxAjax.post("manageOperation.spr?action=deleteParameter","paramId="+id,function(respon){
			var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");;
			if(res.result.success)
			{
				parent.loadPage('p.spr?page=parameterManage');
			}
		});
	}
}

function doOnLoad() {
//	 var filterCondition="and hosp_id='"+parent.loginedUserInfo.hospId+"'";
//	    if(parent.loginedUserInfo.jb=='2'){
//	    	filterCondition+=" and ks='"+parent.loginedUserInfo.ks+"' and jb='"+d+"'";
//	    }
	var sql="select param_id,charge_code,weight,CONCAT('Delete^javascript:doDelete(\"',param_id,'\");^_self') from nursing.t_parameter where 1=1 ";//+filterCondition;
	
	var grid_define={
			columns:
				[{title:"参数标识",width:0,type:"ro"},
				 {title:"收费编码",width:100,type:"ro"},
				 {title:"权重",width:100,type:"ro"},
				 {title:"操作",width:100,type:"link"}
				],
			key:"param_id",
			sql:sql
				 
	}
	grid=createGridObject('gridbox',grid_define);
	initToolBar(grid);

 
}
function initToolBar(grid){
	toolbar=grid.toolBar;
	toolbar.setIconsPath(parent.contextPath+"/js/dhtmlx/imgs/csh_bluefolders/");
	toolbar.addButton('addParameter',1,"新增参数","iconWrite2.gif",null);
	toolbar.addButton('updateParameter',1,"修改参数","iconWrite2.gif",null);
	
	
	toolbar.attachEvent("onClick", function(id) {
        if(id=="addParameter"){
       	 var dhxWins = new dhtmlXWindows();
    	 doAdd(dhxWins);
        }else if(id=="updateParameter"){
        	var index=grid.getSelectedRowId();
        	index=grid.getRowIndex(index)
        	if(index==-1){
        		alert("请选择一条记录");
        		return;
        	}
        	var objId = grid.cellByIndex(index, 0).getValue();
        	var dhxWins = new dhtmlXWindows();
        	doUpdate(dhxWins,objId)
        }
    });
}
function doAdd(dhxWins){
	//dhtmlx.skin = "dhx_skyblue";
	window.dhx_globalImgPath =parent.contextPath+"/js/dhtmlx/imgs/";
	 
	 var win = dhxWins.createWindow('addParameter',150,150,600,400);
	 dhxWins.window('addParameter').setText("新增参数");
	 var addDhxForm =dhxWins.window('addParameter').attachForm(addFormData);
	 
	 addDhxForm.attachEvent("onButtonClick", function(name) {
	    	if(name =='save'){
	    		this.send("manageOperation.spr?action=addParameter","post",function(respon){
	    			parent.loadPage('p.spr?page=parameterManage');
	    		});
	    		dhxWins.window('addParameter').close();
	    	
	    	}else if(name =='cancel'){
	    		dhxWins.window('addParameter').close();
	    	}
		});
};
function doUpdate(dhxWins,objId){
	dhtmlx.skin = "dhx_skyblue";
	window.dhx_globalImgPath =parent.contextPath+"/js/dhtmlx/imgs/";
	 
	 var win = dhxWins.createWindow('updateParameter',150,150,600,400);
	 dhxWins.window('updateParameter').setText("修改参数");
	 var updateDhxForm =dhxWins.window('updateParameter').attachForm(addFormData);
	 var sql="select * from nursing.t_parameter where param_id='"+objId+"'";
	 var list=db.queryForList(sql);
	 copyObjectToForm(list[0],addFormData,updateDhxForm);
	 updateDhxForm.attachEvent("onButtonClick", function(name) {
	    	if(name =='save'){
	    		this.send("manageOperation.spr?action=updateParameter&paramId="+objId,"post",function(respon){
	    			//alert(respon);
	    			parent.loadPage('p.spr?page=parameterManage');
	    		});
	    		dhxWins.window('updateParameter').close();
	    	}else if(name =='cancel'){
	    		dhxWins.window('updateParameter').close();
	    	}
		});
};
//源数据
var addFormData = [
	 				{
	 				    type: "settings",
	 				    position: "label-left",
	 				    labelWidth: 240,
	 				    inputWidth: 300
	 				},
	 				{type:"input", name:"charge_code", label:"收费编码"},
	 				{type:"input", name:"weight", label:"权重:"},
	 				{type:"button", name:"save", value:"保存"},
	 				{type:"button", name:"cancel", value:"取消" }
	 				];
