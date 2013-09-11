dhtmlxEvent(window,"load", doOnLoad);
function doDelete(id){
	if(id!=null){
		dhtmlxAjax.post("manageOperation.spr?action=deleteDictItem","dictId="+id,function(respon){
			var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");;
			if(res.result=='success')
			{
				parent.loadPage('manage.spr?action=roleManage');
			}
		});
	}
}
function doManage(id){
	if(id!=null){
		parent.loadPage('manage.spr?action=roleMap&roleId='+id);
		
	}
}
function addRole(){
	var dictText=prompt('请输入角色名称');
	if(dictText!=null){
		dhtmlxAjax.post("manageOperation.spr?action=addDictItem","groupId=3&groupCode=js&dictText="+dictText,function(respon){
			var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");;
			if(res.result=='success')
			{
				parent.loadPage('manage.spr?action=roleManage');
			}
		});
	}
}
var grid,toolbar;
function doOnLoad() {
	
	
	toolbar = new dhtmlXToolbarObject("toolbarObj"); 
	toolbar.addButton('addRole',1,"新增角色",null,null);
	toolbar.addButton('delRole',2,"删除角色",null,null);
	toolbar.setIconsPath(parent.contextPath+"/js/dhtmlx/imgs/");
	
	toolbar.attachEvent("onClick", function(id) {
        if(id=="addRole"){
        	addRole();
        }else if(id=='delRole'){
        	var index=grid.getSelectedCellIndex();
        	var id=grid.cellByIndex(index,0).getValue()
        	doDelete(id);
        }
    });
	grid = new dhtmlXGridObject('gridbox');
	
    grid.setSkin("dhx_skyblue");
    grid.setImagePath(parent.contextPath+"/js/dhtmlx/imgs/");
    grid.setHeader("编号,角色,删除,管理");
    grid.setInitWidths("0,200,100,100");
    grid.setColAlign("center,center,center,center");
    grid.setColTypes("ro,ro,link,link");
    grid.setColSorting("str,str,str,str");
    grid.init();
    var serviceCall = new ServiceCall();
    var obj=new Object();
    obj.sql="select dict_id,dict_text,CONCAT('Delete^javascript:doDelete(\"',dict_id,'\")'),CONCAT('Manage^javascript:doManage(\"',dict_id,'\")') from bureau.t_per_role";
	serviceCall.init("queryDataSvc");
	var rt= serviceCall.execute(obj);
	//alert(Object.toJSON(rt));
	var data=toGridData(rt.list,'dictId');
	grid.parse(data,"json");
	
    
    grid.attachEvent("onRowSelect", function(id,ind){
    	
//    	alert(grid.cells(id,0).getValue());
    })
 
}