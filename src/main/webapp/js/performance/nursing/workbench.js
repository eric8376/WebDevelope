dhtmlxEvent(window,"load", doOnLoad);
var dhxLayout,toolbar,statusbar,dhxTree,priviageMap,contentTab;
var treeDefine={id:0,
        item:[
            {id:1,text:"数据管理",open:1,im0 :'folderClosed.gif',
          	  item:[
          	        	  {id:"/record/bm/query/", text:"部门搜索",href:"p.spr?page=recordManage&bm=true"},
	                      {id:"/record/ks/query/", text:"科室搜索",href:"p.spr?page=recordManage"},
	                      {id:"/record/parameter/", text:"参数管理",href:"p.spr?page=parameterManage"}
	                      
	                  ]},
            {id:2, text:"权限管理",open:1,im0 :'folderClosed.gif',
                item:[
                    {id:"/user/query/", text:"用户管理",href:"p.spr?page=userManage"},
                    {id:"/ks/query/", text:"科室管理",href:"p.spr?page=roomManage&roomType=ks"},
                    {id:"/bm/query/", text:"部门管理",href:"p.spr?page=roomManage&roomType=bm"}
                ]}
]
};
function doOnLoad() {
	dhxLayout = new dhtmlXLayoutObject(document.body, "2U");
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
        	loadPage('manage.spr?action=changePassword','修改密码');
        }else if(id=="logout"){
        	window.location.href="signout.spr";
        }
    });
	/*工具栏*/
	/*状态栏*/
	statusbar = dhxLayout.attachStatusBar();
	/*状态栏*/
	/*菜单栏*/
	dhxTree=dhxLayout.cells("a").attachTree();
	dhxTree.setImagePath(parent.contextPath+"/images/performance/icon/");
	
	dhxTree.loadJSONObject(treeDefine);
	dhxTree.attachEvent("onClick",function(id){
		var treeNode=findURL(id,treeDefine);
		if(treeNode==null){
			return true;
		}
        loadPage(treeNode.href,treeNode.text);
        return true;
   });
	
	doPriviage(dhxTree);
	//dhxLayout.cells("a").setText("我的菜单");
	dhxLayout.cells("a").hideHeader();
	dhxLayout.cells("a").setWidth(220);
	//dhxTree.setImagePath("imgs/");
	
    dhxLayout.cells("b").hideHeader();
    contentTab=dhxLayout.cells("b").attachTabbar()
   // contentTab.setImagePath(parent.contextPath+"/js/dhtmlx/imgs/");
    contentTab.addTab("a1", "","70px");
  //contentTab.setTabActive("a1");
    contentTab.tabs("a1").setActive();
    /*菜单栏*/
    /*过滤栏*/
    
//    tabbar = dhxLayout.cells("c").attachTabbar();
//    tabbar.setImagePath(parent.contextPath+"/js/dhtmlx/imgs/");
//    tabbar.setSkin('dhx_skyblue');
//    tabbar.addTab("a1", "科室","70px");
//    var grid = tabbar.cells("a1").attachGrid();
//    grid.setSkin("dhx_skyblue");
//    grid.setImagePath(parent.contextPath+"/js/dhtmlx/imgs/");
//    grid.setHeader("序号,科室");
//    grid.setNoHeader(true);
//    grid.setInitWidths("0,125");
//    grid.setColAlign("center,center");
//    grid.setColTypes("ro,ro");
//    grid.setColSorting("str,str");
//   
//    grid.init();
//    
//	var data=toGridData(getKSList(),'dict_id');
//	grid.parse(data,"json");
//	tabbar.addTab("a2", "项目","70px");
//	var grid1 = tabbar.cells("a2").attachGrid();
//    grid1.setSkin("dhx_skyblue");
//    grid1.setImagePath(parent.contextPath+"/js/dhtmlx/imgs/");
//    grid1.setHeader("序号,项目");
//    grid1.setNoHeader(true);
//
//    grid1.setInitWidths("0,125");
//    grid1.setColAlign("center,center");
//    grid1.setColTypes("ro,ro");
//    grid1.setColSorting("str,str");
//    grid1.init();
//  
//	var data=toGridData(getXMList(),'dict_id');
//	grid1.parse(data,"json");
//	tabbar.setTabActive("a1");
	//alert(Object.toJSON(data));
	//
//	dhxLayout.cells("c").setText("分类过滤");
//    dhxLayout.cells("c").setWidth(150);
    
    //dhxLayout.cells("b").hideHeader();
    //dhxLayout.cells("a").setHeight(300);
  
    
//    grid.attachEvent("onRowSelect", function(id,ind){
//    	
//    	var ks=grid.cells(id,0).getValue();
//    	var ksname=grid.cells(id,1).getValue();
//    	loadPage('manage.spr?action=recordManage&ks='+ks,ksname+'科室记录');
//    	
//    })
//    grid1.attachEvent("onRowSelect", function(id,ind){
//    	
//    	var xm=grid1.cells(id,0).getValue();
//    	var xmname=grid1.cells(id,1).getValue();
//    	loadPage('manage.spr?action=recordManage&xm='+xm,xmname+'项目记录');
//    })
    /*过滤栏*/
    loadPage('manage.spr?action=welcome','首页');
    dhxLayout.progressOff();
}
function loadPage(url,text)
{
	dhxLayout.cells("b").progressOn();
	
	contentTab.cells("a1").attachURL(url);
	if(text){
		//contentTab.setLabel("a1",text,200);
		contentTab.tabs("a1").setText(text);
	}
	var ifr=contentTab.cells("a1").getFrame();
	dhtmlxEvent(ifr, "load", function(){
		parent.dhxLayout.cells("b").progressOff();
	});
	
	
	
	
}
function getPriviageMap(){
	var loader = dhtmlxAjax.postSync("authorize.spr?action=getPriviageMap","");
	var res=eval("("+loader.xmlDoc.responseText+")");
	return res;
	
}
function getKSList(){
	var loader = dhtmlxAjax.postSync("authorize.spr?action=getKSList","");
	var res=eval("("+loader.xmlDoc.responseText+")");
	return res;
	
}
function getXMList(){
	var loader = dhtmlxAjax.postSync("authorize.spr?action=getXMList","");
	var res=eval("("+loader.xmlDoc.responseText+")");
	return res;
}
function findURL(id,treeDefine){
	if(treeDefine.id==id&&treeDefine.href){//叶子
		return treeDefine;
	}else if(treeDefine.item){
		for(var i=0;i<treeDefine.item.length;i++){
			var treeNode=findURL(id,treeDefine.item[i]);
			if(treeNode!=null){
				return treeNode;
			}
		}
	}
	return null;
	
}
/**
 * 根据关联父ID获取某一类型的子字典列表
 * @param parent_id
 * @param type
 * @returns
 */
function getDictListByParent(parent_id,type){
	
	var sql="";
	if(parent_id=="ALL"){
		sql="select t1.dict_id as value,t1.dict_text as text from nursing.t_dict_table t1 where hosp_id='"+parent.loginedUserInfo.hospId+"' and group_code='"+type+"'";
	}else{
		sql="select t1.dict_id as value,t1.dict_text as text " +
		"from nursing.t_dict_table t1,nursing.t_per_dict_map t2 " +
		"where t2.son_id=t1.dict_id and t2.parent_id='"+parent_id+"' and t1.group_code='"+type+"'";
	}

	return db.queryForList(sql);
}
/**
 * 对菜单进行权限控制
 * @param tree
 */
function doPriviage(tree){
	
	
	priviageMap=getPriviageMap();
	for(var id in priviageMap){
		if(!priviageMap[id]){
		tree.deleteItem(id);
		}
	}
	
	
}
