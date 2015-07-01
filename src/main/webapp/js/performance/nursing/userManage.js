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
	 var filterCondition="and hosp_id='"+parent.loginedUserInfo.hospId+"'";
	    if(parent.loginedUserInfo.jb=='2'){
	    	filterCondition+=" and ks='"+parent.loginedUserInfo.ks+"' ";//+"' and jb='"+d+"'";
	    }
	var sql="select user_id,user_name,real_name,BM,KS,JB,CONCAT('Delete^javascript:doDelete(\"',user_id,'\");^_self')  as de,CONCAT('Authorise^javascript:doAuthorise(\"',user_id,'\");^_self') as au from nursing.t_per_user where 1=1 "+filterCondition;
	
	var grid_define={
			columns:
				[{title:"用户号",width:0,type:"ro"},
				 {title:"用户名",width:100,type:"ro"},
				 {title:"姓名",width:100,type:"ro"},
				 {title:"部门类型",width:100,type:"co",data:[
					                                       {key:"bm",value:"职能部门"},
					                                       {key:"ks",value:"临床部门"}
					                                      ]},
				 {title:"所属科室",width:150,type:"co",dict:["nursing.t_per_ks","nursing.t_per_bm"]},
				 {title:"级别",width:150,type:"co",data:[
				                                       {key:"0",value:"管理员"},
				                                       {key:"1",value:"普通职员"},
				                                       {key:"2",value:"科室领导"}]},
				 {title:"删除",width:100,type:"link"},
				 {title:"权限管理",width:100,type:"link"}
				],
			key:"user_id",
			sql:sql
				 
	}
	grid=createGridObject('gridbox',grid_define);
	initToolBar(grid);

 
}
function initToolBar(grid){
	toolbar=grid.toolBar;
	toolbar.setIconsPath(parent.contextPath+"/js/dhtmlx/imgs/custom/");
	toolbar.addButton('addUser',1,"新增用户","iconWrite2.gif",null);
	toolbar.addButton('updateUser',1,"修改用户","iconWrite2.gif",null);
	
	
	toolbar.attachEvent("onClick", function(id) {
        if(id=="addUser"){
        	parent.loadPage('manage.spr?action=addUser&operation=add');
        }else if(id=="updateUser"){
        	var index=grid.getSelectedRowId();
        	index=grid.getRowIndex(index)
        	if(index==-1){
        		alert("请选择一条记录");
        		return;
        	}
        	var userId = grid.cellByIndex(index, 0).getValue();
        	parent.loadPage('manage.spr?action=addUser&operation=update&userId='+userId);
        }
    });
}