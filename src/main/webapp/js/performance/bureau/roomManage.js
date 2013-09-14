dhtmlxEvent(window,"load", doOnLoad);
var roomType;
function doDelete(id){
	if(parent.loginedUserInfo.jb!='0'){
		alert("非管理员不能删除");
		return;
	}
	if(!confirm("确定要删除吗？")){
		return;
	}
	if(id!=null){
		dhtmlxAjax.post("manageOperation.spr?action=deleteDictItem","dictId="+id,function(respon){
			var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");;
			if(res.result=='success')
			{
				parent.loadPage('manage.spr?action=roomManage&roomType='+roomType);
			}
		});
	}
}
function addRoom(){
	var objName=(roomType=='zb')?"一级指标":"部门";
	var dictText=prompt("请输入"+objName+"名称");
	if(dictText!=null){
		dhtmlxAjax.post("manageOperation.spr?action=addDictItem","groupId=1&groupCode="+roomType+"&dictText="+encodeURI(dictText),function(respon){
			var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");;
			if(res.result=='success')
			{
				parent.loadPage('manage.spr?action=roomManage&roomType='+roomType);
			}
		});
	}
}
var grid;
function doOnLoad() {
	grid = new dhtmlXGridObject('gridbox');
	roomType=getParam("roomType");
	var viewName="";
	if(roomType=="zb"){
		viewName="bureau.t_per_zb";
	}else if(roomType=="bm"){
		viewName="bureau.t_per_bm";
	}
    grid.setSkin("dhx_skyblue");
    grid.setImagePath(parent.contextPath+"/js/dhtmlx/imgs/");
    if(roomType=="zb"){
    	  grid.setHeader("编号,一级指标,操作");
	}else if(roomType=="bm"){
		  grid.setHeader("编号,部门,操作");
	}
    grid.setInitWidths("0,100,100,150,150,100,150");
    grid.setColAlign("center,center,center");
    grid.setColTypes("ro,ro,link");
    grid.setColSorting("str,str,str");
    grid.init();
    
    var filterCondition=" and hosp_id='"+parent.loginedUserInfo.hospId+"'";
    var sql="select dict_id,dict_text,CONCAT('Delete^javascript:doDelete(\"',dict_id,'\")') from "+viewName+" where 1=1 "+filterCondition;
	var data=toGridData(db.queryForList(sql),'dict_id');
	grid.parse(data,"json");
 
}