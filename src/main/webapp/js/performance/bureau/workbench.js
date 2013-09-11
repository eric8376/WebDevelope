dhtmlxEvent(window,"load", doOnLoad);
var dhxLayout;
function doOnLoad() {
	
    dhxLayout = new dhtmlXLayoutObject("parentId", "3J");
    dhxLayout.cells("a").hideHeader();
    dhxAccord = dhxLayout.cells("a").attachAccordion();
    //accord1
    dhxAccord.addItem("a1", "项目");
    var grid = dhxAccord.cells("a1").attachGrid();
    grid.setSkin("dhx_skyblue");
    grid.setImagePath(parent.contextPath+"/js/dhtmlx/imgs/");
    grid.setHeader("序号,项目");
    grid.setInitWidths("0,180");
    grid.setColAlign("right,left");
    grid.setColTypes("ro,ro");
    grid.setColSorting("str,str");
    grid.init();
    var data=toGridData(getXMList(),'dict_id');
	grid.parse(data,"json");
	//accord2
	dhxAccord.addItem("a2", "关键环节");
	var grid1 = dhxAccord.cells("a2").attachGrid();
    grid1.setSkin("dhx_skyblue");
    grid1.setImagePath("../../../dhtmlxGrid/codebase/imgs/");
    grid1.setHeader("序号,关键环节");
    grid1.setInitWidths("0,180");
    grid1.setColAlign("right,left");
    grid1.setColTypes("ro,ro");
    grid1.setColSorting("str,str");
    grid1.init();
	var data=toGridData(getHJList(),'dict_id');
	grid1.parse(data,"json");
	//accord3
	dhxAccord.addItem("a3", "一级指标");
	var grid2 = dhxAccord.cells("a3").attachGrid();
    grid2.setSkin("dhx_skyblue");
    grid2.setImagePath("../../../dhtmlxGrid/codebase/imgs/");
    grid2.setHeader("序号,一级指标");
    grid2.setInitWidths("0,180");
    grid2.setColAlign("right,left");
    grid2.setColTypes("ro,ro");
    grid2.setColSorting("str,str");
    grid2.init();
  
	var data=toGridData(getZBList(),'dict_id');
	grid2.parse(data,"json");
	//alert(Object.toJSON(data));
    dhxLayout.cells("a").setWidth(200);
    dhxLayout.cells("b").hideHeader();
    dhxLayout.cells("c").hideHeader();
    dhxLayout.cells("c").setHeight(300);
    dhxLayout.cells("c").attachObject("controlPanel");
    
    grid.attachEvent("onRowSelect", function(id,ind){
    	
    	var xm=grid.cells(id,0).getValue();
    	loadPage('manage.spr?action=recordManage&xm='+xm);
    	
    })
    grid1.attachEvent("onRowSelect", function(id,ind){
    	
    	var hj=grid1.cells(id,0).getValue();
    	loadPage('manage.spr?action=recordManage&hj='+hj);
    })
     grid2.attachEvent("onRowSelect", function(id,ind){
    	
    	var zb=grid2.cells(id,0).getValue();
    	loadPage('manage.spr?action=recordManage&zb='+zb);
    })
    loadPage('manage.spr?action=welcome');
}
function loadPage(url)
{
	dhxLayout.cells("b").attachURL(url);
}
function getXMList(){
	var loader = dhtmlxAjax.postSync("workbench.spr?action=getXMList","");
	var res=eval("("+loader.xmlDoc.responseText+")");
	//alert(Object.toJSON(res));
	return res;
	
}
function getHJList(){
	var loader = dhtmlxAjax.postSync("workbench.spr?action=getHJList","");
	var res=eval("("+loader.xmlDoc.responseText+")");
	//alert(Object.toJSON(res));
	return res;
}
function getZBList(){
	var loader = dhtmlxAjax.postSync("workbench.spr?action=getZBList","");
	var res=eval("("+loader.xmlDoc.responseText+")");
	//alert(Object.toJSON(res));
	return res;
}
function getDictListByParent(parent_id,type){
	
	var sql="";
	if(parent_id=="ALL"){
		sql="select t1.dict_id as value,t1.dict_text as text from bureau.t_dict_table t1 where hosp_id='"+parent.loginedUserInfo.hospId+"' and group_code='"+type+"'";
	}else{
		sql="select t1.dict_id as value,t1.dict_text as text " +
		"from bureau.t_dict_table t1,bureau.t_per_dict_map t2 " +
		"where t2.son_id=t1.dict_id and t2.parent_id='"+parent_id+"'";
	}

	return db.queryForList(sql);
}

