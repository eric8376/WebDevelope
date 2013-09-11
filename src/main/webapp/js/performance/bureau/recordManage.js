dhtmlxEvent(window,"load", doOnLoad);
var grid,pagetoolbar,toolbar,page,conditionSql,resultSet;
function doOnLoad() {
	initToolBar();
	initPageToolBar();
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
	
	
	grid = new dhtmlXGridObject('gridbox');
	
    grid.setSkin("dhx_skyblue");
    grid.setImagePath(parent.contextPath+"/js/dhtmlx/imgs/");
    grid.setHeader("项目ID,项目,关键环节,一级指标,医疗机构,检查时间,检查事项/结果,扣分,备注");
    grid.setInitWidths("0,100,100,100,100,150,350,100,100");
    grid.setColAlign("center,center,center,center,center,center,center,center,center");
    grid.setColTypes("ro,co,co,co,ro,ro,ro,ro,ro");
    grid.setColSorting("str,str,str,str,str,str,str,str,str");
   
    var combo1 = grid.getCombo(1);
	var sql = "select dict_id as 'key',dict_text as 'value' from bureau.t_per_xm";
	var list=db.queryForList(sql);
	for ( var i = 0; i < list.length; i++) {
		combo1.put(list[i].key, list[i].value);
	}
	
	var combo2 = grid.getCombo(2);
	 sql = "select dict_id as 'key',dict_text as 'value' from bureau.t_per_hj";
	var list=db.queryForList(sql);
	for ( var i = 0; i < list.length; i++) {
		combo2.put(list[i].key, list[i].value);
	}
	
	var combo3 = grid.getCombo(3);
	sql = "select dict_id as 'key',dict_text as 'value' from bureau.t_per_zb";
	var list=db.queryForList(sql);
	for ( var i = 0; i < list.length; i++) {
		combo3.put(list[i].key, list[i].value);
	}
			
	grid.init();
	loadData(conditionSql);
	
    
    grid.attachEvent("onRowSelect", function(id,ind){
    	
    	//alert(grid.cells(id,0).getValue());
    })
 
}
function loadData(conditionSql){
	var pageSql;
	if(page==null){
		pageSql=" limit 0,25 ";
	}else{
		pageSql=page.getPageSql();
	}
	var loader = dhtmlxAjax.postSync("authorize.spr?action=query","&conditionSql="+conditionSql+"&pageSql="+pageSql);
	var res=eval("("+loader.xmlDoc.responseText+")");
	resultSet=res;
	//alert(Object.toJSON(rt));
	if(page==null){
	    page=new Page(25,res.totalCount);
	}
	
	var data=toGridData(res.list.value,'record_id');
	//alert(data);
	grid.clearAll();
	grid.parse(data,"json");
	pagetoolbar.setItemText("pageinfo","第"+(page.currentPage+1)+"页,共"+(page.page+1)+"页,"+page.totalCount+"条记录");
	
}
function initPageToolBar(){
	pagetoolbar = new dhtmlXToolbarObject("pageToolbarObj"); 
	pagetoolbar.addButton('firstPage',0,"第一页",null,null);
	pagetoolbar.addButton('previousPage',1,"上一页",null,null);
	//toolbar.addButtonSelect('limit', 2, '200', ['100,300,500,1000'], null, null);
	pagetoolbar.addButton('nextPage',3,"下一页",null,null);
	pagetoolbar.addButton('lastPage',4,"最后页",null,null);
	pagetoolbar.addText("pageinfo", 5, "");
	pagetoolbar.addButton("backtosearch", 6, "重新搜索",null,null);
	pagetoolbar.setIconsPath(parent.contextPath+"/js/dhtmlx/imgs/");
	pagetoolbar.setAlign('right');
	pagetoolbar.attachEvent("onClick", function(id) {
        if(id=="firstPage"){
        	page.setCurrentPage(0);
        	loadData(conditionSql);
        }else if(id=="previousPage"){
        	if(page.currentPage<=0){
        		return;
        	}
        	page.setCurrentPage(page.currentPage-1);
        	loadData(conditionSql);
        
        }else if(id=="nextPage"){
        	if(page.currentPage>=page.page){
        		return;
        	}
        	page.setCurrentPage(page.currentPage+1);
        	loadData(conditionSql);
        }else if(id=="lastPage"){
        	page.setCurrentPage(page.page);
        	loadData(conditionSql);
        }else if(id="backtosearch"){
        	parent.loadPage('manage.spr?action=searchRecord');
        }
    });
}
function initToolBar(){
	toolbar = new dhtmlXToolbarObject("toolbarObj"); 
	//toolbar.addButton('addRecord',1,"添加新记录",null,null);
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