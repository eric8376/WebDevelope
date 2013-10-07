dhtmlxEvent(window,"load", doOnLoad);
var dhxLayout,toolbar,statusbar,dhxTree;
function doOnLoad() {
	dhxLayout = new dhtmlXLayoutObject(document.body, "3W");
	dhxLayout.progressOn();
	//dhxLayout.attachHeader('headerDiv');
	/*工具栏*/
	toolbar = dhxLayout.attachToolbar();
	toolbar.setAlign('right');
	toolbar.setIconSize(32);
	toolbar.setIconsPath(parent.contextPath+"/images/performance/icon/");
	toolbar.addButton('changepassword',1,"控制面板","setting.ico",null);
	toolbar.addButton('logout',1,"退出系统","exit.ico",null);
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
	dhxTree=dhxLayout.cells("a").attachTree();
//	var obj=document.getElementById("treeboxbox_tree");
//	var cont=dhx_li2trees(obj.childNodes[0],new Array(),0);
//	dhxTree.loadXMLString("<tree id='0'>"+cont+"</tree>");
//	dhxTree.openAllItems('0')
	//dhxTree = dhtmlXTreeFromHTML("treeboxbox_tree");
	//dhxLayout.cells("a").attachObject("treeboxbox_tree");
	//dhxTree = dhtmlXTreeFromHTML("treeboxbox_tree");
	//
//	
//	dhxTree.setIconPath("tree.ico","tree.ico","tree.ico");
	dhxTree.setImagePath(parent.contextPath+"/images/performance/icon/");
	var treeDefine={id:0,
			          item:[
			              {id:1,text:"数据管理",open:1,im0 :'folderClosed.gif',
			            	  item:[
				                      {id:"11", text:"记录录入",href:"manage.spr?action=addRecord&operation=add"},
				                      {id:"12", text:"记录搜索"},
				                      {id:"13", text:"记录管理"},
				                      {id:"14", text:"记录分析"}
				                      
				                  ]},
			              {id:2, text:"权限管理",open:1,im0 :'folderClosed.gif',
			                  item:[
			                      {id:"21", text:"用户管理"},
			                      {id:"22", text:"科室管理"},
			                      {id:"23", text:"部门管理"}
			                  ]},
			              {id:3,text:"指标管理",open:1,im0 :'folderClosed.gif',
			            	  item:[
							       {id:"31", text:"项目管理"},
			                       {id:"32", text:"关键环节管理"},
			                       {id:"33", text:"一级指标管理"}
								                  ]},
	          ]
	      };
	var operationMap=
	                  {'11':"manage.spr?action=addRecord&operation=add",
	                  '12':"manage.spr?action=searchRecord",
	                  '13':"manage.spr?action=recordManage",
	                  '14':"manage.spr?action=recordAnalysis",
	                  '21':"manage.spr?action=userManage",
	                  '22':"manage.spr?action=roomManage&roomType=ks",
	                  '23':"manage.spr?action=roomManage&roomType=bm",
	                  '31':"manage.spr?action=projectManage&mapType=xm",
	                  '32':"manage.spr?action=projectManage&mapType=hj",
	                  '33':"manage.spr?action=roomManage&roomType=zb"}
	;
	dhxTree.loadJSONObject(treeDefine);
	dhxTree.attachEvent("onClick",function(id){
		var url=operationMap[id];
		if(url==null){
			return true;
		}
        loadPage(url);
        return true;
   });
	doPriviage(dhxTree);
	dhxLayout.cells("a").setText("我的菜单");
	dhxLayout.cells("a").setWidth(150);
	//dhxTree.setImagePath("imgs/");
	
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
    grid.setInitWidths("0,125");
    grid.setColAlign("center,center");
    grid.setColTypes("ro,ro");
    grid.setColSorting("str,str");
   
    grid.init();
    
	var data=toGridData(getKSList(),'dict_id');
	grid.parse(data,"json");
	tabbar.addTab("a2", "项目","70px");
	var grid1 = tabbar.cells("a2").attachGrid();
    grid1.setSkin("dhx_skyblue");
    grid1.setImagePath(parent.contextPath+"/js/dhtmlx/imgs/");
    grid1.setHeader("序号,项目");
    grid1.setNoHeader(true);

    grid1.setInitWidths("0,125");
    grid1.setColAlign("center,center");
    grid1.setColTypes("ro,ro");
    grid1.setColSorting("str,str");
    grid1.init();
  
	var data=toGridData(getXMList(),'dict_id');
	grid1.parse(data,"json");
	tabbar.setTabActive("a1");
	//alert(Object.toJSON(data));
	//
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
function getDictListByParent(parent_id,type){
	
	var sql="";
	if(parent_id=="ALL"){
		sql="select t1.dict_id as value,t1.dict_text as text from hospital.t_dict_table t1 where hosp_id='"+parent.loginedUserInfo.hospId+"' and group_code='"+type+"'";
	}else{
		sql="select t1.dict_id as value,t1.dict_text as text " +
		"from hospital.t_dict_table t1,hospital.t_per_dict_map t2 " +
		"where t2.son_id=t1.dict_id and t2.parent_id='"+parent_id+"' and t1.group_code='"+type+"'";
	}

	return db.queryForList(sql);
}
function doPriviage(tree){
	if(loginedUserInfo.jb!=0&&loginedUserInfo!='bm'){
		tree.deleteItem('11');//记录录入
	}
	if(loginedUserInfo.jb!=0&&loginedUserInfo.jb!=2){
		tree.deleteItem('21');//用户管理
	}
	if(loginedUserInfo.jb!=0){
		tree.deleteItem('22');
		tree.deleteItem('23');
		tree.deleteItem('31');
		tree.deleteItem('32');
		tree.deleteItem('33');
	}
	
}