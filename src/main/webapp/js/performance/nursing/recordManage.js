dhtmlxEvent(window,"load", doOnLoad);
var grid,pagetoolbar,toolbar,page,conditionSql="",resultSet,ksmc,executor,kssj,jssj;
function doOnLoad() {
	if(getParam('bm')!=null){
		
	}
	 window.dhx_globalImgPath=parent.contextPath+"/js/dhtmlx/imgs/";

	 ksmc = new dhtmlXCombo("ksmc", "ksmc", 200);
	var list=db.queryForList("select apartment_name as text,apartment_name as value from nursing.t_nursing group by apartment_name  ");
	
	ksmc.addOption(list);
	
	 executor = new dhtmlXCombo("executor", "executor", 200);
	list=db.queryForList("select executor as text,executor as value from nursing.t_nursing group by executor ");
	executor.addOption(list);
	
	 kssj = new dhtmlXCombo("kssj", "kssj", 200);
	list=db.queryForList("select times as text,times as value from nursing.t_nursing group by times  ");
	kssj.addOption(list);
	
	 jssj = new dhtmlXCombo("jssj", "jssj", 200);
	list=db.queryForList("select times as text,times as value from nursing.t_nursing group by times ");
	jssj.addOption(list);


	var grid_define={
			columns:
				[{title:"项目ID",width:0,type:"ro"},
				 {title:"科室名称",width:100,type:"co"},
				 {title:"收费编码",width:100,type:"co"},
				 {title:"收费名称",width:100,type:"co"},
				 {title:"执行人",width:100,type:"co"},
				 {title:"单位",width:100,type:"ro"},
				 {title:"时间",width:150,type:"ro"},
				 {title:"数量",width:100,type:"ro",align:"left"},
				 {title:"风险系数",width:100,type:"ro"},
				 {title:"技术难度",width:100,type:"ro"},
				 {title:"权重",width:100,type:"ro"},
				 {title:"分值",width:100,type:"ro"},
				 {title:"容错",width:100,type:"ro"}
				],
			key:"record_id",
			callback:loadData,
			height:430,
			pageSize:10
				 
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
	//toolbar.addButton('addRecord',1,"添加新记录",null,null);
	toolbar.setIconsPath(parent.contextPath+"/images/performance/icon/");
	
//	toolbar.addButton('backtosearch',1,"搜索","find.ico",null);
//	toolbar.addButton('deleteRecord',2,"删除","delete.ico",null);
//	toolbar.addButton('updateRecord',3,"修改","edit.ico",null);
	toolbar.addButton('caculate',4,"考核计算","calculator.ico",null);
//	toolbar.addButton('import',5,"导入数据","importExcel.ico",null);
	toolbar.addButton('search',5,"查询","find.ico",null);
	toolbar.setIconSize(24);
	
	
	toolbar.attachEvent("onClick", function(id) {
        if(id=="addRecord"){
        	parent.loadPage('manage.spr?action=addRecord&operation=add');
        }else if(id=="updateRecord"){
        	var hasRight=(parent.loginedUserInfo.bm=="bm"&&parent.loginedUserInfo.jb==2)||parent.loginedUserInfo.jb==0;
        	if(!hasRight){
        		alert("权限不足");
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
        }else if(id=="caculate"){
        	alert("统计结果："+grid.data.summaryNum+"分");
        }else if(id=="backtosearch"){
        	parent.loadPage('manage.spr?action=searchRecord');
        }else if(id=="import"){
        	var hasRight=(parent.loginedUserInfo.bm=="bm"&&parent.loginedUserInfo.jb==2)||parent.loginedUserInfo.jb==0;
        	if(!hasRight){
        		alert("权限不足");
        		return;
        	}
        	createFileImport2("import.spr");
        }else if(id=="deleteRecord"){
        	var index=grid.getSelectedRowId();
        	index=grid.getRowIndex(index);
        	var recordId = grid.cellByIndex(index, 0).getValue();
        	if(index==-1){
        		alert("请选择一条记录");
        		return;
        	}
        	if(parent.loginedUserInfo.jb!='0'){
    			alert("非管理员不能删除");
    			return;
    		}
    		if(!confirm("确定要删除吗？")){
    			return;
    		}
    		dhtmlxAjax.post("manageOperation.spr?action=deleteRecord","recordId="+recordId,function(respon){
    			var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");;
    			if(res.result=='success')
    			{
    				parent.loadPage('manage.spr?action=recordManage');
    			}
    		});
        }else if(id=="search"){
        	conditionSql="";
        	grid.page=null;
        	if(ksmc.getSelectedText()!=""){
            	conditionSql+="and apartment_name='"+ksmc.getSelectedText()+"' ";
            	}
        	if(executor.getSelectedText()!=""){
        	conditionSql+="and executor='"+executor.getSelectedText()+"' ";
        	}
        	if(kssj.getSelectedText()!=""){
            	conditionSql+="and times>='"+kssj.getSelectedText()+"' ";
            	}
        	if(jssj.getSelectedText()!=""){
            	conditionSql+="and times<='"+jssj.getSelectedText()+"' ";
            	}
        	
        	grid.doQuery();
        	
        	
        }
        
    });
}