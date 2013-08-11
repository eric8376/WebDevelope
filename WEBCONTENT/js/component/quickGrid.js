
$include("~/js/dhtmlx/dhtmlx.js");
$include("~/inc/json/json.js");


function quickGrid(id,sql,metaData){
	var grid = new dhtmlXGridObject(id);
	grid.sql=sql;
	grid.serviceCall=new ServiceCall();
	grid.loadServerData=function(){
		var param=new Object();
		param.sql=this.sql;
		this.serviceCall.init("queryDataSvc");
		var rt = this.serviceCall.execute(param);
		var data=toGridData(rt.list,'dictId');
		this.clearAll();
		this.parse(data,"json");
	};
	
	grid.setSkin("dhx_skyblue");
    grid.setImagePath(getContextPath()+"/js/dhtmlx/imgs/");
    grid.setHeader(metaData[0]);
    grid.setInitWidths(metaData[1]);
    var colHeaderNum=metaData[0].split(",").length;
    var colWidthsNum=metaData[1].split(",").length;
    if(colHeaderNum!=colWidthsNum){
    	alert("配置项错误");
    	return;
    }
    var colTypeMeta="";
    var colAlignMeta="";
    var colSortingMeta="";
    for(var i=0;i<colHeaderNum;i++){
    	colTypeMeta+="ro,";
    	colAlignMeta+="center,";
    	colSortingMeta+="str,";
    }
    grid.setColTypes(colTypeMeta.substring(0,colTypeMeta.length-1));
    grid.setColAlign(colAlignMeta.substring(0,colAlignMeta.length-1));
    grid.setColSorting(colSortingMeta.substring(0,colSortingMeta.length-1));
    grid.init();
    grid.loadServerData();
    
}
function Page(pageSize,totalCount){
	var obj=new Object();
	obj.currentPage=0;
	obj.pageSize=pageSize;
	obj.page=0;
	obj.totalCount=totalCount;
	obj.recount=function(){
		this.page=Math.floor(this.totalCount/this.pageSize);
		this.totalCount%this.pageSize>0?this.page+1:this.page+0;

	}
	obj.getPageSql=function(){
		return "limit "+this.currentPage*this.pageSize+","+this.pageSize;
	}
	obj.setCurrentPage=function(currentPage){
		this.currentPage=currentPage;
	}
	obj.recount();
	return obj;
	
}
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