dhtmlxEvent(window,"load", doOnLoad);
var grid,toolbar;

function doOnLoad() {
	  var filterCondition="and hosp_id='"+parent.loginedUserInfo.hospId+"'"+getUserTypeSql();
	    var sql="select user_id,user_name,real_name,JB,CONCAT('Delete^javascript:doDelete(\"',user_id,'\");^_self')  as de,CONCAT('Authorise^javascript:doAuthorise(\"',user_id,'\");^_self') as au from bureau.t_per_user where 1=1 "+filterCondition;
	var grid_define={
			columns:
				[{title:"用户号",width:0,type:"ro"},
				 {title:"用户名",width:100,type:"ro"},
				 {title:"姓名",width:100,type:"ro"},
				 {title:"级别",width:150,type:"co",data:[
				                                       {key:"0",value:"管理员"},
				                                       {key:"2",value:"质控中心职员"},
				                                       {key:"1",value:"质控中心领导"},
				                                       {key:"3",value:"医疗机构"}]},
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
	toolbar.setIconsPath(parent.contextPath+"/js/dhtmlx/imgs/csh_bluefolders/");
	toolbar.addButton('addUser',1,"添加新用户","iconWrite2.gif",null);
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
function getUserTypeSql(){
	if(parent.loginedUserInfo.jb=='0'){
		return "";
	}
	return " and jb='2' ";
}
