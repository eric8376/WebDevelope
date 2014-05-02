dhtmlxEvent(window,"load", doOnLoad);
var grid,toolbar;
function doDelete(id){
	if(id!=null){
		if(parent.loginedUserInfo.jb!='0'){
			alert("非管理员不能删除");
			return;
		}
		if(!confirm("确定要删除吗？")){
			return;
		}
		dhtmlxAjax.post("manageOperation.spr?action=deleteUser","userId="+id,function(respon){
			var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");;
			if(res.result=='success')
			{
				parent.loadPage('manage.spr?action=userManage');
			}
		});
	}
}
function doAuthorise(id){
	if(id!=null){
		if(grid.cellById(id, 3).getValue()!='bm'){
			alert("非职能部门不能授权");
			return;
		}
		parent.loadPage('manage.spr?action=authorise&userId='+id);
		
	}
}
function doOnLoad() {
//	 var filterCondition="and hosp_id='"+parent.loginedUserInfo.hospId+"'";
//	    if(parent.loginedUserInfo.jb=='2'){
//	    	filterCondition+=" and ks='"+parent.loginedUserInfo.ks+"' and jb='"+d+"'";
//	    }
	var sql="select param_id,charge_code,weight from nursing.t_parameter where 1=1 ";//+filterCondition;
	
	var grid_define={
			columns:
				[{title:"参数标识",width:0,type:"ro"},
				 {title:"收费编码",width:100,type:"ro"},
				 {title:"权重",width:100,type:"ro"},
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
	toolbar.addButton('addParameter',1,"新增用户","iconWrite2.gif",null);
	toolbar.addButton('updateUser',1,"修改用户","iconWrite2.gif",null);
	
	
	toolbar.attachEvent("onClick", function(id) {
        if(id=="addParameter"){
        	parent.loadPage('manage.spr?action=addParameter&operation=add');
        }else if(id=="updateParameter"){
        	var index=grid.getSelectedRowId();
        	index=grid.getRowIndex(index)
        	if(index==-1){
        		alert("请选择一条记录");
        		return;
        	}
        	var ParameterId = grid.cellByIndex(index, 0).getValue();
        	parent.loadPage('manage.spr?action=addParameter&operation=update&ParameterId='+ParameterId);
        }
    });
}