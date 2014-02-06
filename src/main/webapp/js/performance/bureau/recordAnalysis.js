dhtmlxEvent(window,"load", doOnLoad);

var chart,myForm,data,keyIndex,chartType;

function doOnLoad() {
	chart =  new dhtmlXChart({
	     container: "chart_container"
	    	 });
	loadSearchForm();
	
}
function doAnalysis(){
	var condition="";
	var user_name=myForm.getItemValue("user_name");
	var xm=myForm.getItemValue("xm");
	var hj=myForm.getItemValue("hj");
	var zb=myForm.getItemValue("zb");
	keyIndex=myForm.getItemValue("keyIndex");
	chartType=myForm.getItemValue("chartType");
	
	if(!isEmpty(user_name)&&user_name!="ALL"){
		condition+=" and user_name='"+encodeURIComponent(encodeURIComponent(user_name))+"' ";
	}
	if(!isEmpty(zb)&&zb!="ALL"){
		condition+=" and zb_id='"+zb+"' ";
	}
	else if(!isEmpty(hj)&&hj!="ALL"){
		condition+=" and hj_id='"+hj+"' ";
	}
	else if(!isEmpty(xm)&&xm!="ALL"){
		condition+=" and xm_id='"+xm+"' ";
	}
	condition+=parent.getHospFilterSql();
	sql="select "+keyIndex+" as keyindex,ROUND(sum(kaohe),1) as number from bureau.t_per_vrecord where 1=1 "+condition+"group by "+keyIndex+ " ";
	data=db.queryForList(sql);
	if(data.length==0){
		alert("数据为空");
		return;
	}
	if(chartType=="pie"){
	createPieChart();
	}else if(chartType=="bar"){
		createBarChart();
	}else if(chartType=="barH"){
		createBarHChart();
	}
}
function newCanvas(){
	$("#chart_container").remove();
	$("body").append("<div id='chart_container' style='border:1px solid #A4BED4;'>");
	//默认大小
	$("#chart_container").css("height","800px");
	$("#chart_container").css("width","1000px");
	if(data.length>=10&&chartType=="bar"){
		$("#chart_container").css("width",data.length*60+"px");
	}
	if(data.length>=10&&chartType=="barH"){
		$("#chart_container").css("height",data.length*40+"px");
	}
	
}
function createBarHChart(){
	
	newCanvas();
	 chart =  new dhtmlXChart({
	     container: "chart_container"
	    	 });
	 chart.define("view","barH");
	 chart.define("value","#number#");
	 //chart.define("color","#66cc33"); 
	 chart.define("label","#number#");
	 chart.define("width","80"); 
	 chart.define("padding",{left: 150}); 
	 chart.define("tooltip","#keyindex#");   
	 chart.define("yAxis",{
			title:"医院",
			template:"#keyindex#"
		});   	
	 chart.define("xAxis",{
     
       // template:"{obj}",
        title:"扣分"
	 	});     
	 chart.parse(data,"json");
	
	
}
function createBarChart(){
	
	newCanvas();
	chart =  new dhtmlXChart({
	     container: "chart_container"
	    	 });
	 chart.define("view","bar");
	 chart.define("value","#number#");
	 chart.define("label","#number#");
	 chart.define("width","40");
	 chart.define("padding",{bottom: 150}); 
	 chart.define("tooltip","#keyindex#");   
	 chart.define("xAxis",{
			title:"医院",
			template:"#keyindex#"
		});   	
	 chart.define("yAxis",{
        
        // template:"{obj}",
         title:"扣分"
	 	});     
	// chart.clearAll();
	 chart.parse(data,"json");	
}
function createPieChart(){
	newCanvas();
	chart =  new dhtmlXChart({
	     container: "chart_container"
	    	 });
	 chart.define("view","pie3D");
	 chart.define("value","#number#");
	 chart.define("label","#keyindex#");
	 chart.define("pieInnerText",function(obj){
 		var sum = chart.sum("#number#");
		return Math.round(obj.number/sum*100) +"%"
	}); 
	chart.parse(data,"json");
}
function loadSearchForm(){
	//owner
 	
    var sql="select user_name as value ,user_name as text from bureau.t_per_record where user_name is  not null and hosp_id='"+parent.loginedUserInfo.hospId+"' group by user_name ";
   var list2= db.queryForList(sql)
   list2.unshift({value:'ALL',text:"全部"});
	var list3=toComboData(parent.getXMList(),'dict_id','dict_text');
	list3.unshift({value:'ALL',text:"全部"});
	dhtmlx.skin = "dhx_skyblue";
	window.dhx_globalImgPath =parent.contextPath+"/js/dhtmlx/imgs/";
   formData = [
	{
	    type: "settings",
	    position: "label-left",
	    labelWidth: 80,
	    inputWidth: 180
	},          
    { type: "fieldset", name: "data1", label: "分析条件", inputWidth: "auto", list:[
    {type: "label", label: "数据范围",position:"label-left"},                                                                                
	{type:"combo", name:"user_name", label:"医疗机构:",options:list2,filtering:true},
	{type:"combo", name:"xm", label:"项目",options:list3},
	{type:"combo", name:"hj", label:"关键环节",options:null},
	{type:"combo", name:"zb", label:"一级指标",options:null},
	 {type:"button", name:"search", value:"生成图形"},
	{type: "newcolumn", offset:50},
    {type: "label", label: "分析指标",position:"label-left"},
    {type: "radio", name: "keyIndex", value: "user_name", label: "医院", checked: "1"},
    {type: "radio", name: "keyIndex", value: "xm", label: "项目"},
    {type: "radio", name: "keyIndex", value: "hj", label: "关键环节"},
    {type: "radio", name: "keyIndex", value: "zb", label: "一级指标"},
    {type: "newcolumn", offset:50},
  {type: "label", label: "图表类型",position:"label-left"},
  {type: "radio", name: "chartType", value: "bar", label: "垂直柱状图",checked: "1"},
  {type: "radio", name: "chartType", value: "barH", label: "水平柱状图"},
  {type: "radio", name: "chartType", value: "pie", label: "饼状图"}
 
  //{type: "radio", name: "chartType", value: "line", label: "折线图"},
  //{type: "radio", name: "chartType", value: "radar", label: "雷达图"},
  //{type: "radio", name: "chartType", value: "scatter", label: "点状图"},
                                                         	
           ]
  }];
  
myForm = new dhtmlXForm("form_container", formData);
myForm.attachEvent("onButtonClick", function(name) {
	if(name =='search'){
		doAnalysis();
	}
});
myForm.attachEvent("onChange", function(name) {
	if(name=="xm"){
		loadSonByParent("xm","hj");
	}else if(name=='hj'){
		loadSonByParent("hj","zb");
		
	}
	
});
document.onkeydown=function(e){
	if(e.keyCode=='13'){
	doAnalysis();
	}
};
myForm.getCombo("user_name").setComboValue("");
myForm.getCombo("xm").setComboValue("");
loadSonByParent("xm","hj");
loadSonByParent("hj","zb");
//如果是医疗机构默认只能看自己医院的数据，此功能必须在当前
if(parent.loginedUserInfo.jb==3)
{
	myForm.getCombo("user_name").setComboValue(parent.loginedUserInfo.userName);
	myForm.disableItem("user_name");
}
}
function loadSonByParent(parentObj,sonObj){
	var sonCombo=myForm.getCombo(sonObj);
	var parentComboValue=myForm.getCombo(parentObj).getSelectedValue();
	sonCombo.clearAll();
	sonCombo.setComboValue("");
	var list=parent.getDictListByParent(parentComboValue,sonObj);
	if(list==null||list==""){
		list=new Array();
	}
	list.unshift({value:'ALL',text:"全部"});
	sonCombo.addOption(list);
	
}