dhtmlxEvent(window,"load", doOnLoad);
var dhxLayout;
function doOnLoad() {
	
    dhxLayout = new dhtmlXLayoutObject("parentId", "3J");
    dhxLayout.cells("a").hideHeader();
    dhxAccord = dhxLayout.cells("a").attachAccordion();
    dhxAccord.addItem("a1", "科室");
    var grid = dhxAccord.cells("a1").attachGrid();
    grid.setSkin("dhx_skyblue");
    grid.setImagePath(parent.contextPath+"/js/dhtmlx/imgs/");
    grid.setHeader("序号,科室");
    grid.setInitWidths("0,180");
    grid.setColAlign("right,left");
    grid.setColTypes("ro,ro");
    grid.setColSorting("str,str");
   
    grid.init();
    
	var data=toGridData(getKSList(),'dict_id');
	grid.parse(data,"json");
	dhxAccord.addItem("a2", "项目");
	var grid1 = dhxAccord.cells("a2").attachGrid();
    grid1.setSkin("dhx_skyblue");
    grid1.setImagePath("../../../dhtmlxGrid/codebase/imgs/");
    grid1.setHeader("序号,项目");
    grid1.setInitWidths("0,180");
    grid1.setColAlign("right,left");
    grid1.setColTypes("ro,ro");
    grid1.setColSorting("str,str");
    grid1.init();
  
	var data=toGridData(getXMList(),'dict_id');
	grid1.parse(data,"json");
	//alert(Object.toJSON(data));
    dhxLayout.cells("a").setWidth(200);
    dhxLayout.cells("b").hideHeader();
    dhxLayout.cells("c").hideHeader();
    dhxLayout.cells("c").setHeight(300);
    dhxLayout.cells("c").attachObject("controlPanel");
    
    grid.attachEvent("onRowSelect", function(id,ind){
    	
    	var ks=grid.cells(id,0).getValue();
    	loadPage('manage.spr?action=recordManage&ks='+ks);
    	
    })
    grid1.attachEvent("onRowSelect", function(id,ind){
    	
    	var xm=grid1.cells(id,0).getValue();
    	loadPage('manage.spr?action=recordManage&xm='+xm);
    })
    loadPage('manage.spr?action=welcome');
}
function loadPage(url)
{
	dhxLayout.cells("b").attachURL(url);
}
function getKSList(){
	var loader = dhtmlxAjax.postSync("workbench.spr?action=getKSList","");
	var res=eval("("+loader.xmlDoc.responseText+")");
	//alert(Object.toJSON(res.value));
	return res.value;
	
}
function getXMList(){
	var loader = dhtmlxAjax.postSync("workbench.spr?action=getXMList","");
	var res=eval("("+loader.xmlDoc.responseText+")");
	//alert(Object.toJSON(res.value));
	return res.value;
}