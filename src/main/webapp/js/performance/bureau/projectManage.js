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
				var mapType=getParam('mapType');
				parent.loadPage('manage.spr?action=projectManage&mapType='+mapType);
			}
		});
	}
}
function doManage(id){
	if(id!=null){
		var mapType=getParam('mapType');
		parent.loadPage('manage.spr?action=projectMap&projectId='+id+'&mapType='+mapType);
		
	}
}
function addProject(){
	var dictText=prompt('请输入项目名称');
	if(dictText!=null){
		var mapType=getParam('mapType');
		var dictType="";
		if(mapType=='xm'){
			dictType="groupId=2&groupCode=xm";
		}else if(mapType=='hj'){
			dictType="groupId=4&groupCode=hj";
		}
		dhtmlxAjax.post("manageOperation.spr?action=addDictItem",dictType+"&dictText="+dictText,function(respon){
			var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");;
			if(res.result=='success')
			{
				parent.loadPage('manage.spr?action=projectManage&mapType='+mapType);
			}
		});
	}
}
var grid;
function doOnLoad() {
	var mapType=getParam('mapType');
	grid = new dhtmlXGridObject('gridbox');
    grid.setSkin("dhx_skyblue");
    grid.setImagePath(parent.contextPath+"/js/dhtmlx/imgs/");
    var viewName;
    if(mapType=='hj'){
    	viewName="bureau.t_per_hj";
    	grid.setHeader("编号,关键环节,删除,管理,对应一级指标");
    	}
    else if(mapType=='xm'){
    	viewName="bureau.t_per_xm";
    	grid.setHeader("编号,项目,删除,管理,对应关键环节");
    	
    }
    grid.setInitWidths("0,100,100,150,150,100,150,150");
    grid.setColAlign("center,center,center,center,center");
    grid.setColTypes("ro,ro,link,link,ro");
    grid.setColSorting("str,str,str,str,str");
    grid.init();
   
    var filterCondition=" and hosp_id='"+parent.loginedUserInfo.hospId+"'";
    var sql="select t1.dict_id,t1.dict_text,CONCAT('Delete^javascript:doDelete(\"',t1.dict_id,'\");^_self'),CONCAT('Manage^javascript:doManage(\"',t1.dict_id,'\");^_self') ,GROUP_CONCAT(t2.ks_text) as group_ks" +
    		" from (select * from "+viewName+" where 1=1 "+filterCondition+") t1 left join (select dict_text as ks_text,parent_id from bureau.t_per_dict_map k1,bureau.t_dict_table k2 where k1.son_id=k2.dict_id ) t2 " +
    		" on t1.dict_id=t2.parent_id "+
    		" group by t1.dict_id,t1.dict_text,CONCAT('Delete^javascript:doDelete(\"',t1.dict_id,'\");^_self'),CONCAT('Manage^javascript:doManage(\"',t1.dict_id,'\");^_self')";
    
	var data=toGridData(db.queryForList(sql),'dict_id');
	grid.parse(data,"json");
 
}