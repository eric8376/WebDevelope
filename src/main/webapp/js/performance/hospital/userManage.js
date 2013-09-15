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
	toolbar = new dhtmlXToolbarObject("toolbarObj"); 
	toolbar.addButton('addUser',1,"添加新用户",null,null);
	toolbar.addButton('updateUser',1,"修改用户",null,null);
	toolbar.setIconsPath(parent.contextPath+"/js/dhtmlx/imgs/");
	
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
	grid = new dhtmlXGridObject('gridbox');
    grid.setSkin("dhx_skyblue");
    grid.setImagePath(parent.contextPath+"/js/dhtmlx/imgs/");
    grid.setHeader("用户号,用户名,姓名,部门类型,所属科室,级别,删除,权限管理");
    grid.setInitWidths("0,100,100,150,150,100,150,150");
    grid.setColAlign("center,center,center,center,center,center,center,center");
    grid.setColTypes("ro,ro,ro,co,co,co,link,link");
    grid.setColSorting("str,str,str,str,str,str,str,str");
   
    var combo1 = grid.getCombo(3);
	combo1.put("bm", "职能部门");
	combo1.put("ks", "临床部门");
	var combo3 = grid.getCombo(5);
	combo3.put("0", "管理员");
	combo3.put("1", "普通职员");
	combo3.put("2", "科室领导");
	var combo2 = grid.getCombo(4);
	var serviceCall = new ServiceCall();
	var obj = new Object();
	obj.sql = "select dict_id as 'key',dict_text as value from t_per_ks union select dict_id as 'key',dict_text as value from t_per_bm";
	serviceCall.init("queryDataSvc");
	var rt = serviceCall.execute(obj);
	for ( var i = 0; i < rt.list.length; i++) {
		combo2.put(rt.list[i].key, rt.list[i].value);
	}
    
    grid.init();
    var serviceCall = new ServiceCall();
    var obj=new Object();
    var filterCondition="and hosp_id='"+parent.loginedUserInfo.hospId+"'";
    if(parent.loginedUserInfo.jb=='2'){
    	filterCondition+=" and ks='"+parent.loginedUserInfo.ks+"'";
    }
    obj.sql="select user_id,user_name,real_name,BM,KS,JB,CONCAT('Delete^javascript:doDelete(\"',user_id,'\")')  as de,CONCAT('Authorise^javascript:doAuthorise(\"',user_id,'\")') as au from t_per_user where 1=1 "+filterCondition;
	serviceCall.init("queryDataSvc");
	var rt= serviceCall.execute(obj);
	//alert(Object.toJSON(rt));
	var data=toGridData(rt.list,'user_id');
	//alert(data);
	grid.parse(data,"json");
	
    
    grid.attachEvent("onRowSelect", function(id,ind){
    	
//    	alert(grid.cells(id,0).getValue());
    })
 
}