dhtmlxEvent(window,"load", doOnLoad);
var dhxLayout,toolbar,statusbar;
function doOnLoad() {
	dhxLayout = new dhtmlXLayoutObject("parentId", "3W");
	dhxLayout.progressOn();
	//dhxLayout.attachHeader('headerDiv');
	/*工具栏*/
	toolbar = dhxLayout.attachToolbar(); 
	//toolbar.setRTL(true); 
	toolbar.addButton('changepassword',1,"控制面板",null,null);
	toolbar.addButton('logout',1,"退出系统",null,null);
	toolbar.setIconsPath(parent.contextPath+"/js/dhtmlx/imgs/");
	toolbar.attachEvent("onClick", function(id) {
        if(id=="changepassword"){
        	loadPage('manage.spr?action=changePassword');
        }else if(id=="logout"){
        	window.location.href="logon.spr?action=signout";
        }
    });
	/*工具栏*/
	/*状态栏*/
	statusbar = dhxLayout.attachStatusBar();
	/*状态栏*/
	/*菜单栏*/
	dhxLayout.cells("a").setText("我的菜单");
	dhxLayout.cells("a").setWidth(150);
	
	dhxLayout.cells("a").attachObject("controlPanel");
    dhxLayout.cells("b").hideHeader();
    /*菜单栏*/
    /*过滤栏*/
    tabbar = dhxLayout.cells("c").attachTabbar();
    tabbar.setImagePath(parent.contextPath+"/js/dhtmlx/imgs/");
    tabbar.setSkin('dhx_skyblue');
    tabbar.addTab("a1", "科室","70px");
    var grid = tabbar.cells("a1").attachGrid();
    grid.setSkin("dhx_skyblue");
    grid.setImagePath(parent.contextPath+"/js/dhtmlx/imgs/");
    grid.setHeader("序号,科室");
    grid.setNoHeader(true);
    grid.setInitWidths("0,140");
    grid.setColAlign("center,center");
    grid.setColTypes("ro,ro");
    grid.setColSorting("str,str");
   
    grid.init();
    
	var data=toGridData(getKSList(),'dict_id');
	grid.parse(data,"json");
	tabbar.addTab("a2", "项目","70px");
	var grid1 = tabbar.cells("a2").attachGrid();
    grid1.setSkin("dhx_skyblue");
    grid1.setImagePath("../../../dhtmlxGrid/codebase/imgs/");
    grid1.setHeader("序号,项目");
    grid1.setNoHeader(true);

    grid1.setInitWidths("0,140");
    grid1.setColAlign("center,center");
    grid1.setColTypes("ro,ro");
    grid1.setColSorting("str,str");
    grid1.init();
  
	var data=toGridData(getXMList(),'dict_id');
	grid1.parse(data,"json");
	tabbar.setTabActive("a1");
	//alert(Object.toJSON(data));
	dhxLayout.cells("c").setText("分类过滤");
    dhxLayout.cells("c").setWidth(150);
   
    //dhxLayout.cells("b").hideHeader();
    //dhxLayout.cells("a").setHeight(300);
  
    
    grid.attachEvent("onRowSelect", function(id,ind){
    	
    	var ks=grid.cells(id,0).getValue();
    	loadPage('manage.spr?action=recordManage&ks='+ks);
    	
    })
    grid1.attachEvent("onRowSelect", function(id,ind){
    	
    	var xm=grid1.cells(id,0).getValue();
    	loadPage('manage.spr?action=recordManage&xm='+xm);
    })
    /*过滤栏*/
    loadPage('manage.spr?action=welcome');
    dhxLayout.progressOff();
}
function loadPage(url)
{
	dhxLayout.cells("b").progressOn();
	
	dhxLayout.cells("b").attachURL(url);
	var ifr=dhxLayout.cells("b").getFrame();
	dhtmlxEvent(ifr, "load", function(){
		parent.dhxLayout.cells("b").progressOff();
	});
	
	
	
	
}
function getKSList(){
	var loader = dhtmlxAjax.postSync("workbench.spr?action=getKSList","");
	var res=eval("("+loader.xmlDoc.responseText+")");
	//alert(Object.toJSON(res));
	return res;
	
}
function getXMList(){
	var loader = dhtmlxAjax.postSync("workbench.spr?action=getXMList","");
	var res=eval("("+loader.xmlDoc.responseText+")");
	//alert(Object.toJSON(res));
	return res;
}