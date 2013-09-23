dhtmlxEvent(window,"load", doOnLoad);
function doDelete(id){
	if(id!=null){
		if(parent.loginedUserInfo.jb!='0'){
			alert("非管理员不能删除");
			return;
		}
		if(!confirm("确定要删除吗？")){
			return;
		}
		dhtmlxAjax.post("manageOperation.spr?action=deleteDictItem","dictId="+id,function(respon){
			var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");;
			if(res.result=='success')
			{
				parent.loadPage('manage.spr?action=projectManage');
			}
		});
	}
}
function doManage(id){
	if(id!=null){
		parent.loadPage('manage.spr?action=projectMap&projectId='+id);
		
	}
}
function addProject(){
	var dictText=prompt('请输入项目名称');
	if(dictText!=null){
		dhtmlxAjax.post("manageOperation.spr?action=addDictItem","groupId=2&groupCode=xm&dictText="+dictText,function(respon){
			var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");;
			if(res.result=='success')
			{
				parent.loadPage('manage.spr?action=projectManage');
			}
		});
	}
}
var grid;
function doOnLoad() {
	    var filterCondition=" and hosp_id='"+parent.loginedUserInfo.hospId+"'";
	    var sql="select t1.dict_id,t1.dict_text,CONCAT('Delete^javascript:doDelete(\"',t1.dict_id,'\");^_self'),CONCAT('Manage^javascript:doManage(\"',t1.dict_id,'\");^_self') ,GROUP_CONCAT(t2.ks_text) as group_ks" +
	    		" from (select * from t_per_xm where 1=1 "+filterCondition+") t1 left join (select dict_text as ks_text,xm_id from t_per_xm_ks k1,hospital.t_per_bm k2 where k1.ks_id=k2.dict_id ) t2 " +
	    		" on t1.dict_id=t2.xm_id "+
	    		" group by t1.dict_id,t1.dict_text,CONCAT('Delete^javascript:doDelete(\"',t1.dict_id,'\");^_self'),CONCAT('Manage^javascript:doManage(\"',t1.dict_id,'\");^_self')";
	var grid_define={
			columns:
				[{title:"编号",width:0,type:"ro"},
				 {title:"项目",width:100,type:"ro"},
				 {title:"删除",width:100,type:"link"},
				 {title:"部门关联",width:100,type:"link"},
				 {title:"对应部门",width:350,type:"ro"}
				],
			key:"dict_id",
			sql:sql
				 
	}
	grid=createGridObject('gridbox',grid_define);
	initToolBar(grid); 
}
function initToolBar(grid){
	toolbar=grid.toolBar;
	toolbar.setIconsPath(parent.contextPath+"/js/dhtmlx/imgs/csh_bluefolders/");
	toolbar.addButton('addProject',1,"添加新项目","iconWrite2.gif",null);
	
	
	toolbar.attachEvent("onClick", function(id) {
        if(id=="addProject"){
        	addProject();
        }
    });
}