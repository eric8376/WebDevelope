dhtmlxEvent(window,"load", doOnLoad);
function doDelete(id){
	if(id!=null){
		if(parent.loginedUserInfo.jb!='0'){
			alert("非管理员不能删除");
			return;
		}
		if(!confirm("确定要删除吗？")){
			return;
		}
		dhtmlxAjax.post("manageOperation.spr?action=deleteDictItem","dictId="+id,function(respon){
			var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");;
			if(res.result=='success')
			{
				parent.loadPage('manage.spr?action=projectManage');
			}
		});
	}
}
function doManage(id,mapType){
	if(id!=null){
		if(mapType==null){
			mapType=getParam('mapType');
		}
		parent.loadPage('manage.spr?action=projectMap&projectId='+id+'&mapType='+mapType);
		
	}
}
function addProject(){
	var dictText=prompt('请输入名称');
	if(dictText!=null){
		var mapType=getParam('mapType');
		var dictType="";
		if(mapType=='xm'){
			dictType="groupId=2&groupCode=xm";
		}else if(mapType=='hj'){
			dictType="groupId=4&groupCode=hj";
		}
		dhtmlxAjax.post("manageOperation.spr?action=addDictItem",dictType+"&dictText="+dictText,function(respon){
			var responsetxt=(respon.xmlDoc.response==undefined)?respon.xmlDoc.responseText:respon.xmlDoc.response;var res=eval("("+responsetxt+")");;
			if(res.result=='success')
			{
				parent.loadPage('manage.spr?action=projectManage');
			}else if(res.result=='false'&&res.errorType=='exist'){
				alert('该名称已经存在');
			}
		});
	}
}
var grid;
function doOnLoad() {
	var mapType=getParam('mapType');
	  var viewName;
	  var columns;
	  var sql;
	  var filterCondition=" and hosp_id='"+parent.loginedUserInfo.hospId+"'";
	    if(mapType=='hj'){
	    	viewName="hospital.t_per_hj";
	    	columns=[{title:"编号",width:0,type:"ro"},
			 {title:"关键环节",width:100,type:"ro"},
			 {title:"删除",width:100,type:"link"},
			 {title:"管理",width:100,type:"link"},
			 {title:"对应一级指标",width:350,type:"ro"}
			];
	    	  sql="select t1.dict_id,t1.dict_text,CONCAT('Delete^javascript:doDelete(\"',t1.dict_id,'\");^_self') as d,CONCAT('Manage^javascript:doManage(\"',t1.dict_id,'\");^_self') as m2,GROUP_CONCAT(t2.ks_text) as group_ks" +
	    		" from (select * from "+viewName+" where 1=1 "+filterCondition+") t1 left join (select dict_text as ks_text,parent_id from hospital.t_per_dict_map k1,hospital.t_dict_table k2 where k1.son_id=k2.dict_id ) t2 " +
	    		" on t1.dict_id=t2.parent_id "+
	    		" group by t1.dict_id,t1.dict_text,d,m2";
	    	}
	    else if(mapType=='xm'){
	    	viewName="hospital.t_per_xm";
	    	columns=[{title:"编号",width:0,type:"ro"},
	    			 {title:"项目",width:100,type:"ro"},
	    			 {title:"删除",width:100,type:"link"},
	    			 {title:"管理部门",width:100,type:"link"},
	    			 {title:"管理环节",width:100,type:"link"},
	    			 {title:"对应环节和部门",width:350,type:"ro"}
	    			];
	    	  sql="select t1.dict_id,t1.dict_text,CONCAT('Delete^javascript:doDelete(\"',t1.dict_id,'\");^_self') as d,CONCAT('Manage^javascript:doManage(\"',t1.dict_id,'\",\"','bm','\");^_self') as m1,CONCAT('Manage^javascript:doManage(\"',t1.dict_id,'\");^_self') as m2,GROUP_CONCAT(t2.ks_text) as group_ks" +
	    		" from (select * from "+viewName+" where 1=1 "+filterCondition+") t1 left join (select dict_text as ks_text,parent_id from hospital.t_per_dict_map k1,hospital.t_dict_table k2 where k1.son_id=k2.dict_id ) t2 " +
	    		" on t1.dict_id=t2.parent_id "+
	    		" group by t1.dict_id,t1.dict_text,d,m1,m2";
	    	
	    }
	    
	   
	var grid_define={
			columns:columns,
			key:"dict_id",
			sql:sql
				 
	}
	grid=createGridObject('gridbox',grid_define);
	initToolBar(grid); 
}
function initToolBar(grid){
	toolbar=grid.toolBar;
	toolbar.setIconsPath(parent.contextPath+"/js/dhtmlx/imgs/csh_bluefolders/");
	toolbar.addButton('addProject',1,"新增","iconWrite2.gif",null);
	
	
	toolbar.attachEvent("onClick", function(id) {
        if(id=="addProject"){
        	addProject();
        }
    });
}