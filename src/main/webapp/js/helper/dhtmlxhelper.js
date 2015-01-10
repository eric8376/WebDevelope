window.alert=dhtmlx.alert;
/*
 * dhtmlxhelper.js
 * 依赖于base.js
 */
var toGridData=function(list,key)
{
	var jsonlist=new Array();
	for(var i=0;i<list.length;i++)
	{
		var item=new Array();
		for(var obj in list[i])
		{
			item.push(list[i][obj]);
		}
		jsonlist.push({"id":list[i][key],data:item});
	}
	var data={"rows":jsonlist};
	return data;
}
var toComboData=function(list,valueStr,textStr){
	var jsonlist=new Array();
	for(var i=0;i<list.length;i++)
	{
		var item=new Array();
		
		jsonlist.push({"value":list[i][valueStr],"text":list[i][textStr]});
	}
	return jsonlist;
}


/*grid*/
/**
 * define.sql 列表的sql语句
 * define.columns[]{title,width,type,dataSql,data}
 * define.pageSize
 * 
 * @param id
 * @param define
 */
function createGridObject(id,define){
	var grid = new dhtmlXGridObject(id);
	//初始化工具栏和分页栏
	$("#"+id).before("<div id='toolbarObj'></div>");
	$("#"+id).after("<div id='pageToolbarObj'></div>");
	grid.pageToolBar=new dhtmlXToolbarObject("pageToolbarObj");
	grid.toolBar=new dhtmlXToolbarObject("toolbarObj");
	grid.pageToolBar=new dhtmlXToolbarObject("pageToolbarObj");
	//列表的默认查询语句和列表主键
	grid.sql=define.sql;
	grid.key=define.key;
	grid.loadcallback=define.callback;
	//默认的查询方法
	grid.doQuery=function(sql){
		if(sql){
		grid.sql=sql;
		}
		if(grid.page==null){
			var pageSize=define.pageSize?define.pageSize:15;
			grid.page=new Page(pageSize);
		}
		var data
		if(grid.loadcallback){
			data=grid.loadcallback(grid);
		}else{
		data=db.queryForPageList(grid.sql+grid.page.getPageSql());
		}
		grid.data=data;
		grid.clearAll();
	
		grid.parse(toGridData(data.list,grid.key),"json");
	
		grid.page.setTotalCount(data.totalCount);
		pagetoolbar.setItemText("pageinfo","第"+(grid.page.currentPage+1)+"页,共"+(grid.page.page+1)+"页,合计"+grid.page.totalCount+"条记录");
	}
	initGrid(grid,define);
	initPageToolBar(grid);
	grid.doQuery();
	return grid;
}
function initPageToolBar(grid){
	pagetoolbar =grid.pageToolBar; 
	pagetoolbar.grid=grid;
	pagetoolbar.setIconsPath(parent.contextPath+"/images/performance/icon/");
	pagetoolbar.addButton('firstPage',0,"第一页","first(1).ico",null);
	pagetoolbar.addButton('previousPage',1,"上一页","previous(1).ico",null);
	
	pagetoolbar.addButton('nextPage',3,"下一页","next(1).ico",null);
	pagetoolbar.addButton('lastPage',4,"最后页","last(1).ico",null);
	pagetoolbar.addSeparator("pageinfo", 5, "");
	pagetoolbar.addText("pageinfo", 6, "");

	pagetoolbar.setAlign('right');
	pagetoolbar.attachEvent("onClick", function(id) {
		var page=pagetoolbar.grid.page;
        if(id=="firstPage"){
        	page.setCurrentPage(0);
        	this.grid.doQuery();
        }else if(id=="previousPage"){
        	if(page.currentPage<=0){
        		return;
        	}
        	page.setCurrentPage(page.currentPage-1);
        	this.grid.doQuery();
        
        }else if(id=="nextPage"){
        	if(page.currentPage>=page.page){
        		return;
        	}
        	page.setCurrentPage(page.currentPage+1);
        	this.grid.doQuery();
        }else if(id=="lastPage"){
        	page.setCurrentPage(page.page);
        	this.grid.doQuery();
        }

    });
}
function initGrid(grid,define){
	var headerlist=new Array();
	var headeralignlist=new Array();
	var initWidthlist=new Array();
	var colTypelist=new Array();
	var colAlignlist=new Array();
	var colVAlignlist=new Array();
	var colSorting=new Array();
	for(var i=0;i<define.columns.length;i++){
		headerlist.push(define.columns[i].title);
		headeralignlist.push("text-align:center");
		initWidthlist.push(define.columns[i].width);
		colTypelist.push(define.columns[i].type);
		if(define.columns[i].align){
			colAlignlist.push(define.columns[i].align);
		}else{
			colAlignlist.push("justify");
		}

		colVAlignlist.push("middle");
		colSorting.push("str");
		if("co"==define.columns[i].type){
			if(define.columns[i].data){
				addGridComboOptions(grid.getCombo(i),define.columns[i].data);
			}
			else if(define.columns[i].dataSql){
				var list=db.queryForList(define.columns[i].dataSql);
				addGridComboOptions(grid.getCombo(i),list);
			}else if(define.columns[i].dict){
				for(var j=0;j<define.columns[i].dict.length;j++){
				var sql="select dict_id as 'key',dict_text as 'value' from "+define.columns[i].dict[j];
				var list=db.queryForList(sql);
				addGridComboOptions(grid.getCombo(i),list);
				}
			}
			
			
		}
	}
	grid.setColAlign(colAlignlist.join(","));
	grid.setColVAlign(colVAlignlist.join(","));
	grid.setHeader(headerlist.join(","),null,headeralignlist);
	grid.setInitWidths(initWidthlist.join(","));
	grid.setColTypes(colTypelist.join(","));
	grid.setColSorting(colSorting.join(","));
	grid.enableDragAndDrop(true);
	grid.enableDragOrder(true);
	grid.dontSetSizes=true;
	//grid.setEditable(false);
	//grid.enableAutoWidth(true,300,300);
	var menu = new dhtmlXMenuObject();
	menu.grid=grid;
	menu.renderAsContextMenu();
	menu.addNewChild(null,null, "detail", "查看详情", false, "", "");
	menu.attachEvent("onClick",function(){
		
		var detailItems=new Array();
		var index=this.grid.getSelectedRowId();
		index=this.grid.getRowIndex(index);
		
		for(var i=0;i<this.grid.getColumnsNum();i++){
			var title=this.grid.getColLabel(i);
			var value=this.grid.cellByIndex(index, i).getValue();
			detailItems.push({type:"input", name:title, label:title,value:value,readonly:true});
		}
		var detailDefine={
				formName:"updateUser",
				title:"修改病患",
				fieldData:detailItems
		};
		createWindowForm(detailDefine);
	});
	grid.enableContextMenu(menu);
	grid.init();
	if(define.height){
		$("#gridbox").height(define.height);
	}else{
	$("#gridbox").height(480);
	}

	return grid;
}
function addGridComboOptions(combo,datas){
	for(var i=0;i<datas.length;i++){
		combo.put(datas[i].key,datas[i].value);
	}
}
function Page(pageSize){
	var obj=new Object();
	obj.currentPage=0;
	obj.pageSize=pageSize;
	obj.page=0;
	//obj.totalCount=totalCount;
	obj.recount=function(){
		this.page=Math.floor(this.totalCount/this.pageSize);
		this.totalCount%this.pageSize>0?this.page+1:this.page+0;

	}
	obj.getPageSql=function(){
		return " limit "+this.currentPage*this.pageSize+","+this.pageSize;
	}
	obj.setTotalCount=function(totalCount){
		this.totalCount=totalCount;
		this.recount();
	}
	obj.setCurrentPage=function(currentPage){
		this.currentPage=currentPage;
	}
	
	return obj;
	
}
function getSelectGridCellValue(grid,colIndex){
	var index=grid.getSelectedRowId();
	index=grid.getRowIndex(index);
	return  grid.cellByIndex(index, colIndex).getValue();
}
function checkGridRowSelected(grid){
	var index=grid.getSelectedRowId();
	index=grid.getRowIndex(index);
	if(index==-1){
		alert("请选择一条记录");
		return false;
	}
	return true;
}
/**
 * window forms
 * define.type:submit,common,
 * define.formName
 * define.title
 * define.fieldData
 * define.buttonData
 * define.submitUrl
 * define.returnUrl
 * define.searchFunction
 * define.saveFunction
 */
function createWindowForm(define){
	if(define.formData==null){
	 define.formData=[];
	 var leftFieldColumn=[];
	 var rightFieldColumn=[];
	 var combinFieldColumn=[];
	 var index=0;
	 for(var item in define.fieldData){
		 index++;
		 if(index%2==0){
			 rightFieldColumn.push(define.fieldData[item]);
		 }else{
			 leftFieldColumn.push(define.fieldData[item]);
		 }
	 }
	 combinFieldColumn= combinFieldColumn.concat(leftFieldColumn);
	 combinFieldColumn.push({type: "newcolumn", offset:80});
	 combinFieldColumn=combinFieldColumn.concat(rightFieldColumn);
	 var combinButtonColumn=[];
	 for(var item in define.buttonData){
		 combinButtonColumn.push(define.buttonData[item]);
		 combinButtonColumn.push({type: "newcolumn", offset:10});
	 }
	 combinButtonColumn.pop();
	
	 define.formData=[
	                  {type: "block", width: 600, list:combinFieldColumn}
	                  ,{type: "block", width: 600, list:combinButtonColumn}
	                  ];
	}
	 var dhxWins = new dhtmlXWindows();
	 var height=(define.formData[0].list.length/2+3)*30;
	 var win = dhxWins.createWindow(define.formName,100,100,650,height);
	 dhxWins.window(define.formName).setText(define.title);
	 define.formData.push({
	    	type: "settings",
		    position: "label-left",
		    labelWidth: 80,
		    inputWidth: 150
		});
	 var dhxForm =dhxWins.window(define.formName).attachForm(define.formData);
	 dhxForm.enableLiveValidation(true);
	 dhxForm.attachEvent("onButtonClick", function(name) {
	    	if(name =='save'){
	    		if(define.submitUrl&&define.returnUrl)
	    		{
	    			if(!dhxForm.validate()){
	    				return; 
	    			}
	    			this.send(define.submitUrl,"post",function(respon){
	    			parent.loadPage(define.returnUrl);
	    		});
	    		}else{
	    			eval("define.saveFunction(dhxForm)");
	    		}
	    		dhxWins.window(define.formName).close();
	    	
	    	}else if(name =='search'){
	    		eval("define.searchFunction(dhxForm)");
	    		dhxWins.window('search').close();
	    	}
	    	else if(name =='cancel'){
	    		dhxWins.window(define.formName).close();
	    	}
		});
	 dhxForm.parentWins=dhxWins;
	 return dhxForm;
}
/*
 * 
 * form.js
 */

function copyObjectToForm(object,updateFormData,updateDhxForm){
	var formData=updateFormData[0].list;
	for(var i=0;i<formData.length;i++){
		if("input,password,calendar,hidden".indexOf(formData[i].type)!=-1)
		{
			var name=formData[i].name;
			var dbName=S(name).underscore().s;
			updateDhxForm.setItemValue(name,object[dbName]);
		}
		if("combo".indexOf(formData[i].type)!=-1)
		{
			var name=formData[i].name;
			var dbName=S(name).underscore().s;
			updateDhxForm.getCombo(name).setComboValue(object[dbName]);
		}
	}
}
function copyFormToCondition(form,likelist){
	var list=form.getFormData();
	var returnSql="";
	for(var key in list)
	{
		if(list[key]!=""){
			var dbName=S(key).underscore().s;
			if(likelist!=undefined&&likelist!=null&&likelist.indexOf(key)>=0){
				returnSql+=" and "+dbName+ " like '%2525"+encodeURIComponent(encodeURIComponent(list[key]))+"%2525'";
			}
			else{
			returnSql+=" and "+dbName+"='"+encodeURIComponent(encodeURIComponent(list[key]))+"'";
			}
		}
	}
	console.log(returnSql);
	return returnSql;
}
/*
 * import.js
 */
function createFileImport(url){
	var dhxWins= new dhtmlXWindows();
	var win =dhxWins.createWindow("importExcelForRecord",400,400,400,400);
	dhxWins.window("importExcelForRecord").setText("导入记录文件Excel");
	   formData = [{
	        type: "fieldset",
	        label: "Uploader",
	        list: [{
	            type: "upload",
	            name: "excel",
	            inputWidth: 330,
	            url: url,
	            mode :'html4'
	        }]
	        }, {
	        type: "button",
	        name: "send",
	        value: "Send"
	    }
	];

	var importExcelForRecordForm=dhxWins.window("importExcelForRecord").attachForm(formData);
	importExcelForRecordForm.attachEvent("onButtonClick", function(name) {
		 if(name=="send"){
//			 var myUploader = importExcelForRecordForm.getUploader("excel");
//			 myUploader.upload();
			 importExcelForRecordForm.send(url, function(loader, response) {
	                alert("<pre>" + response + "</pre>");
	            });

		 }
	 });

	
	
	
}
function createFileImport2(url){
	var dhxWins= new dhtmlXWindows();
	var win =dhxWins.createWindow("importExcelForRecord",400,400,400,400);
	dhxWins.window("importExcelForRecord").center();
	dhxWins.window("importExcelForRecord").setText("导入记录文件Excel");
	dhxWins.window("importExcelForRecord").attachURL("import.spr?action=showUploadFrom", false);
}	
//grid改进
eXcell_co.prototype.setValue=function(val){
	if (typeof (val) == "object"&&val!=null){
		var optCol = this.grid.xmlLoader.doXPath("./option", val);

		if (optCol.length)
			this.cell._combo=new dhtmlXGridComboObject();

		for (var j = 0;
			j < optCol.length;
			j++)this.cell._combo.put(optCol[j].getAttribute("value"),
			optCol[j].firstChild
				? optCol[j].firstChild.data
				: "");
		val=val.firstChild.data;
	}

	if ((val||"").toString()._dhx_trim() == "")
		val=null
	this.cell.combo_value=val;
	
	if (val !== null){
		var label = (this.cell._combo||this.grid.getCombo(this.cell._cellIndex)).get(val);
		this.setCValue(label===null?val:label, val);
	}else
		this.setCValue("&nbsp;", val);

	
}