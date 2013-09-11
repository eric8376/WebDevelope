/************************************************************************************************************
						上海联通 综合查询服务
	Copyright (C) October 2009  ztesoft

	ZTEsoft, 2009
	Owner of www.ztesoft.com.cn

************************************************************************************************************/

function getQueryCon(formId){
	var form=document.getElementById(formId);
	var sql="";
	if(form){
		for(var i=0;i<form.elements.length; i++){
			if(form.elements[i].id.indexOf("_sel")>0)continue;
			
			if(form.elements[i].id.indexOf("_tbeg")>0){
				if(form.elements[i].value&&form.elements[i].value!="")
				sql+=" and "+form.elements[i].id.replace(/_tbeg/,"")+">='"+form.elements[i].value+"'";
			}else			
			if(form.elements[i].id.indexOf("_tend")>0){
				if(form.elements[i].value&&form.elements[i].value!="")
				sql+=" and "+form.elements[i].id.replace(/_tend/,"")+"<='"+form.elements[i].value+"'";
			}else
			if(form.elements[i].value&&form.elements[i].value!=""){
				var sel=document.getElementById(form.elements[i].id+"_sel");
				if(!sel)continue;
				if(sel.selectedIndex>-1&&sel.options[sel.selectedIndex].value&&sel.options[sel.selectedIndex]!="")
					sql+=" and "+form.elements[i].id+" "+sel.options[sel.selectedIndex].value+" '"+form.elements[i].value+"'";
			}
		}
		if(sql!="")sql=sql.substr(5);
		return sql;
	}
	return 0;
}

//////////////////////////////////////////////////////////////////////
//数据实体类
function DataList(list,totalCount,showCount,pageIndex){
	this.list=list;
	this.total=totalCount;
	this.count=showCount;
	this.pageNo=pageIndex;
	this.maxPageNo=Math.ceil(this.total/this.count);
	
	this.firstPage=firstPage;
	this.prePage=prePage;
	this.nextPage=nextPage;
	this.lastPage=lastPage;
}

function firstPage(){
	this.pageNo=1;
}

function prePage(){
	if(this.pageNo>1)
		this.pageNo--;
	else{
		this.pageNo=1;
		alert("已经到了首页。");
	}
}

function nextPage(){
	if(this.pageNo<this.maxPageNo)
		this.pageNo++;
	else{
		this.pageNo=1;
		alert("已经到了末页。");
	}
}

function lastPage(){
	this.pageNo=this.maxPageNo;
}
////////////////////////////////////////////////////////////////


/*
 * 
 * ids,names，设置表头字段，以逗号分隔的字段，相互对应，以正确地加载数据
 * 
 * 
 */
function exportExcel(list,ids,names){
	var id=ids.split(",");
	var name=names.split(",");
	if(id.length!=name.length){
		alert("表头设置有问题。");
		return;
	}
	try{
	   var oXL = new ActiveXObject("Excel.Application"); 
	   var oWB = oXL.Workbooks.Add(); 
	   var oSheet = oWB.ActiveSheet;
	   oSheet.name="导出结果"; 
	   //设置表头
	   oSheet.Rows(1).Font.Name="黑体"; 
	   	for(var j=0;j<name.length;++j){
	   		oSheet.Cells(1,j+1).value=name[j];
	   		oSheet.Columns(j+1).NumberFormatLocal="@";//设置数字显示的是字符
	   		//oSheet.Columns(j+1).columnWidth＝35;
	   	}
	   oSheet.Columns.AutoFit;
	   /*   
	   window.clipboardData.setData("Text",htmlStr);
	   oSheet.Paste();
	   oSheet.Columns(1).columnWidth = 15;
	   oSheet.Columns(2).columnWidth = 20;
	   oSheet.Columns(3).columnWidth = 15;
	   oSheet.Columns(4).columnWidth = 20;
	   oSheet.Columns(5).columnWidth = 20;
	   */
	   
	   //根据id加载数据
	   if(list&&list.length)
		   for(var i=0;i<list.length;++i){
		   	var item=list[i];
		   	for(var j=0;j<id.length;++j){
		   		oSheet.Cells(i+2,j+1).value=item[id[j]];
		   	}
		   }
	   oXL.Visible = true;
	   oXL.UserControl = true;
	   oSheet.Application.Quit();
	   //window.clipboardData.cleardata();
	  /*
	  var WshShell = new ActiveXObject("WScript.Shell");
	  oWB.SaveAs("c:\\test.xls");
	  oXL.UserControl = true; 
	  */	
	  
	}
	catch(e)
	{
		 alert("请确认你是否把该站点设置为信任站点，且安装了excel");
	}
}

/*
 * 获得复选框的值
 * param:chName控件的name
 */
function getCheckedValue(chName){
	var objList=document.getElementsByName(chName);
	if(!objList||!objList.length)return;
	for(var i=0;i<objList.length;i++){
		if(objList[i].checked)return objList[i].value;
	}
	return null;
}