dhtmlxEvent(window,"load", doOnLoad);
var dhxLayout,toolbar,statusbar,dhxTree,priviageMap,contentTab;
var treeDefine={id:0,
        item:[
            {id:1,text:"人员管理",open:1,im0 :'folderClosed.gif',
          	  item:[
	                  {id:"/user/add/", text:"病患管理",href:"p.spr?page=patientManage"},
	                  {id:"/record/add/", text:"用户管理",href:"p.spr?page=userManage"}
	                      
	               ]       
	        },
            {id:2, text:"检测管理",open:1,im0 :'folderClosed.gif',
                item:[
                    {id:"/user/query/", text:"数据查询",href:"p.spr?page=resultManage"},
                    //{id:"/ks/query/", text:"数据分析",href:"manage.spr?action=roomManage&roomType=ks"},
                    {id:"/bm/query/", text:"检测计划",href:"p.spr?page=planManage"}
                     ]
            },
            {id:3,text:"系统设置",open:1,im0 :'folderClosed.gif',
          	  item:[
				       {id:"/project/query/", text:"字典管理",href:"p.spr?page=dictManage"},
                     //{id:"/hj/query/", text:"系统设置",href:"manage.spr?action=projectManage&mapType=hj"}
                   
					]
            },
]
};
function doOnLoad() {
	//dhtmlx.skin="dhx_web";
	dhxLayout = new dhtmlXLayoutObject(document.body, "2U");
	//dhxLayout.setSkin("dhx_web");
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
        	loadPage('p.spr?page=changePassword','修改密码');
        }else if(id=="logout"){
        	window.location.href="signout.spr";
        }
    });
	/*工具栏*/
	/*状态栏*/
	//statusbar = dhxLayout.attachStatusBar();
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
	
	//doPriviage(dhxTree);//暂时不做权限控制
	//dhxLayout.cells("a").setText("我的菜单");
	dhxLayout.cells("a").hideHeader();
	dhxLayout.cells("a").setWidth(220);
	//dhxTree.setImagePath("imgs/");
	
    dhxLayout.cells("b").hideHeader();
    contentTab=dhxLayout.cells("b").attachTabbar()
    //contentTab.setImagePath(parent.contextPath+"/js/dhtmlx/imgs/");
    contentTab.addTab("a1", "","70px");
    //contentTab.setTabActive("a1");
    contentTab.tabs("a1").setActive();
    /*菜单栏*/
   
    //loadPage('manage.spr?action=welcome','首页');
    dhxLayout.progressOff();
    loadPage('p.spr?page=patientManage','首页');
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
		sql="select t1.dict_id as value,t1.dict_text as text from hospital.t_dict_table t1 where hosp_id='"+parent.loginedUserInfo.hospId+"' and group_code='"+type+"'";
	}else{
		sql="select t1.dict_id as value,t1.dict_text as text " +
		"from hospital.t_dict_table t1,hospital.t_per_dict_map t2 " +
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
