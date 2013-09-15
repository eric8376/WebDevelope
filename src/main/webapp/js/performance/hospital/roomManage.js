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
	var dictText=prompt('请输入部门名称');
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
	if(roomType=="ks"){
		viewName="t_per_ks";
	}else if(roomType=="bm"){
		viewName="t_per_bm";
	}
    grid.setSkin("dhx_skyblue");
    grid.setImagePath(parent.contextPath+"/js/dhtmlx/imgs/");
    grid.setHeader("编号,科室,操作");
    grid.setInitWidths("0,100,100,150,150,100,150");
    grid.setColAlign("center,center,center");
    grid.setColTypes("ro,ro,link");
    grid.setColSorting("str,str,str");
    grid.init();
    var serviceCall = new ServiceCall();
    var obj=new Object();
    var filterCondition=" and hosp_id='"+parent.loginedUserInfo.hospId+"'";
    obj.sql="select dict_id,dict_text,CONCAT('Delete^javascript:doDelete(\"',dict_id,'\")') from "+viewName+" where 1=1 "+filterCondition;
	serviceCall.init("queryDataSvc");
	var rt= serviceCall.execute(obj);
	//alert(Object.toJSON(rt));
	var data=toGridData(rt.list,'dict_id');
	grid.parse(data,"json");
	
    
    grid.attachEvent("onRowSelect", function(id,ind){
    	
    	//alert(grid.cells(id,0).getValue());
    })
 
}