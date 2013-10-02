dhtmlxEvent(window,"load", doOnLoad);
var grid,pagetoolbar,toolbar,page,conditionSql,resultSet;
function doOnLoad() {
	var kssj=getParam('kssj');
	var jssj=getParam('jssj');
	var owner=getParam('owner');
	var zb=getParam('zb');
	var hj=getParam('hj');
	var xm=getParam('xm');
    conditionSql="";
	if(owner==null){owner='';}
	if(hj==null){hj='';}
	if(xm==null){xm='';}
	if(zb==null){zb='';}
	if(owner!=null&&owner!=''){
		conditionSql+=" and user_name='"+owner+"' ";
	}
	if(hj!=null&&hj!=''&&hj!='ALL'){
		conditionSql+=" and hj_id='"+hj+"' ";
	}
	if(zb!=null&&zb!=''&&zb!='ALL'){
		conditionSql+=" and zb_id='"+zb+"' ";
	}
	if(xm!=null&&xm!=''&&xm!='ALL'){
		conditionSql+=" and xm_id='"+xm+"' ";
	}
	if(kssj!=null&&kssj!='')
	{
		conditionSql+=" and str_to_date(check_time,'%25Y-%25m-%25d') > str_to_date('"+kssj+"','%25Y-%25m-%25d') ";
	}
	if(jssj!=null&&jssj!='')
	{
		conditionSql+=" and str_to_date(check_time,'%25Y-%25m-%25d') < str_to_date('"+jssj+"','%25Y-%25m-%25d') ";
	}
	var grid_define={
			columns:
				[{title:"项目ID",width:0,type:"ro"},
				 {title:"项目",width:100,type:"co",dict:["bureau.t_per_xm"]},
				 {title:"关键环节",width:100,type:"co",dict:["bureau.t_per_hj"]},
				 {title:"一级指标",width:100,type:"co",dict:["bureau.t_per_zb"]},
				 {title:"医疗机构",width:100,type:"ro"},
				 {title:"检查时间",width:150,type:"ro"},
				 {title:"检查事项/结果",width:350,type:"ro"},
				 {title:"扣分",width:100,type:"ro"},
				 {title:"备注",width:100,type:"ro"}
				],
				key:"record_id",
				callback:loadData
				 
	}
	grid=createGridObject('gridbox',grid_define);
	initToolBar(grid);
	grid.doQuery();    
 
}
function loadData(grid){

	var loader = dhtmlxAjax.postSync("authorize.spr?action=query","&conditionSql="+conditionSql+"&pageSql="+grid.page.getPageSql());
	var res=eval("("+loader.xmlDoc.responseText+")");
	return res;
}
function initToolBar(grid){
	toolbar = grid.toolBar; 
	toolbar.addButton('updateRecord',1,"修改记录",null,null);
	toolbar.addButton('deleteRecord',1,"删除记录",null,null);
	toolbar.addButton('caculate',1,"考核计算",null,null);
	toolbar.setIconsPath(parent.contextPath+"/js/dhtmlx/imgs/");
	
	toolbar.attachEvent("onClick", function(id) {
        if(id=="addRecord"){
        	parent.loadPage('manage.spr?action=addRecord&operation=add');
        }else if(id=="updateRecord"){
        	var hasRight=(parent.loginedUserInfo.jb==0)||(parent.loginedUserInfo.jb==1);
        	if(!hasRight){
        		alert("权限不足,联系管理员");
        		return;
        	}
        	var index=grid.getSelectedRowId();
        	index=grid.getRowIndex(index)
        	if(index==-1){
        		alert("请选择一条记录");
        		return;
        	}
        	var recordId = grid.cellByIndex(index, 0).getValue();
        	parent.loadPage('manage.spr?action=addRecord&operation=update&recordId='+recordId);
        }else if(id=="deleteRecord"){
        	var hasRight=(parent.loginedUserInfo.jb==0);
        	if(!hasRight){
        		alert("权限不足,联系管理员");
        		return;
        	}
        	var index=grid.getSelectedRowId();
        	index=grid.getRowIndex(index)
        	if(index==-1){
        		alert("请选择一条记录");
        		return;
        	}
        	var recordId = grid.cellByIndex(index, 0).getValue();
        	if(recordId!=null){
        		dhtmlxAjax.post("manageOperation.spr?action=deleteRecord","recordId="+recordId,function(respon){
        			var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;
        			var res=eval("("+responsetxt+")");
        			if(res.result=='success')
        			{
        				parent.loadPage('manage.spr?action=recordManage');
        			}
        		});
        	}
        }
        else if(id=="caculate"){
        	alert(resultSet.summaryNum);
        }
    });
}