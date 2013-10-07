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
	roomType=getParam("roomType");
	if(dictText!=null){
		dhtmlxAjax.post("manageOperation.spr?action=addDictItem","groupId=1&groupCode="+roomType+"&dictText="+encodeURI(dictText),function(respon){
			var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");;
			if(res.result=='success')
			{
				parent.loadPage('manage.spr?action=roomManage&roomType='+roomType);
			}else if(res.result=='false'&&res.errorType=='exist'){
				alert('该名称已经存在');
			}
		});
	}
}
var grid;

function doOnLoad() {
	roomType=getParam("roomType");
	var viewName="";
	if(roomType=="ks"){
		viewName="t_per_ks";
	}else if(roomType=="bm"){
		viewName="t_per_bm";
	}else if(roomType=="zb"){
		viewName="t_per_zb";
	}
	 var filterCondition=" and hosp_id='"+parent.loginedUserInfo.hospId+"'";
	   var sql="select dict_id,dict_text,CONCAT('Delete^javascript:doDelete(\"',dict_id,'\");^_self') from "+viewName+" where 1=1 "+filterCondition;
		
	var grid_define={
		columns:
			[{title:"编号",width:0,type:"ro"},
			 {title:"名称",width:200,type:"ro"},
			 {title:"操作",width:100,type:"link"}
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
toolbar.addButton('addRoom',1,"添加","iconWrite2.gif",null);


toolbar.attachEvent("onClick", function(id) {
    if(id=="addRoom"){
    	addRoom();
    }
});
}