dhtmlxEvent(window,"load", doOnLoad);
function doDelete(id){
	if(id!=null){
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
	grid = new dhtmlXGridObject('gridbox');
    grid.setSkin("dhx_skyblue");
    grid.setImagePath(parent.contextPath+"/js/dhtmlx/imgs/");
    grid.setHeader("编号,项目,删除,管理,对应部门");
    grid.setInitWidths("0,100,100,150,150,100,150,150");
    grid.setColAlign("center,center,center,center,center");
    grid.setColTypes("ro,ro,link,link,ro");
    grid.setColSorting("str,str,str,str,str");
    grid.init();
    var serviceCall = new ServiceCall();
    var obj=new Object();
    var filterCondition=" and hosp_id='"+parent.loginedUserInfo.hospId+"'";
    obj.sql="select t1.dict_id,t1.dict_text,CONCAT('Delete^javascript:doDelete(\"',t1.dict_id,'\")'),CONCAT('Manage^javascript:doManage(\"',t1.dict_id,'\")') ,GROUP_CONCAT(t2.ks_text) as group_ks" +
    		" from (select * from t_per_xm where 1=1 "+filterCondition+") t1 left join (select dict_text as ks_text,xm_id from t_per_xm_ks k1,hospital.t_dict_table k2 where k1.ks_id=k2.dict_id ) t2 " +
    		" on t1.dict_id=t2.xm_id "+
    		" group by t1.dict_id,t1.dict_text,CONCAT('Delete^javascript:doDelete(\"',t1.dict_id,'\")'),CONCAT('Manage^javascript:doManage(\"',t1.dict_id,'\")')";
	serviceCall.init("queryDataSvc");
	var rt= serviceCall.execute(obj);
	//alert(Object.toJSON(rt));
	var data=toGridData(rt.list,'dict_id');
	grid.parse(data,"json");
	
    
    grid.attachEvent("onRowSelect", function(id,ind){
    	
    	//alert(grid.cells(id,0).getValue());
    })
 
}