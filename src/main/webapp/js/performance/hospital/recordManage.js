dhtmlxEvent(window,"load", doOnLoad);
var grid,pagetoolbar,toolbar,page,conditionSql,resultSet;
function doOnLoad() {
	
	var kssj=getParam('kssj');
	var jssj=getParam('jssj');
	var owner=getParam('owner');
	var ks=getParam('ks');
	var xm=getParam('xm');
    conditionSql="";
	if(owner==null){owner='';}
	if(ks==null){ks='';}
	if(xm==null){xm='';}
	if(owner!=null&&owner!=''){
		conditionSql+=" and user_name='"+owner+"' ";
	}
	if(ks!=null&&ks!=''&&ks!='ALL'){
		conditionSql+=" and ks_id='"+ks+"' ";
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
	conditionSql+= " order by check_time desc";
	var grid_define={
			columns:
				[{title:"项目ID",width:0,type:"ro"},
				 {title:"项目",width:100,type:"co",dict:["hospital.t_per_xm"]},
				 {title:"所在科室",width:100,type:"co",dict:["hospital.t_per_ks"]},
				 {title:"相关人员",width:100,type:"ro"},
				 {title:"检查时间",width:150,type:"ro"},
				 {title:"检查事项/结果",width:350,type:"ro"},
				 {title:"点评",width:100,type:"ro"},
				 {title:"考核分",width:100,type:"ro"},
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
	//toolbar.addButton('addRecord',1,"添加新记录",null,null);
	toolbar.setIconsPath(parent.contextPath+"/images/performance/icon/");
	
	toolbar.addButton('backtosearch',1,"搜索","find.ico",null);
	toolbar.addButton('updateRecord',2,"修改","edit.ico",null);
	toolbar.addButton('caculate',3,"考核计算","calculator.ico",null);
	toolbar.addButton('import',4,"导入数据","importExcel.ico",null);
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
        	alert(resultSet.summaryNum);
        }else if(id=="backtosearch"){
        	parent.loadPage('manage.spr?action=searchRecord');
        }else if(id=="import"){
        	createFileImport2("import.spr");
        }
    });
}