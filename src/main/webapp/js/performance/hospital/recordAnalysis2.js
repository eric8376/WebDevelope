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
	var ks=myForm.getItemValue("ks");
	var zb=myForm.getItemValue("zb");
	var hj=myForm.getItemValue("hj");
	var kssj=myForm.getCalendar("beginTime").getFormatedDate("%Y-%m-%d");
	var jssj=myForm.getCalendar("endTime").getFormatedDate("%Y-%m-%d");
	keyIndex=myForm.getItemValue("keyIndex");
	chartType=myForm.getItemValue("chartType");
	
	if(!isEmpty(user_name)&&user_name!="ALL"){
		condition+=" and user_name='"+user_name+"' ";
	}
	if(!isEmpty(hj)&&zb!="ALL"){
		condition+=" and hj_id='"+hj+"' ";
	}
	if(!isEmpty(zb)&&zb!="ALL"){
		condition+=" and zb_id='"+zb+"' ";
	}
	if(!isEmpty(ks)&&ks!="ALL"){
		condition+=" and ks_id='"+ks+"' ";
	}
	else if(!isEmpty(xm)&&xm!="ALL"){
		condition+=" and xm_id='"+xm+"' ";
	}
	if(!isEmpty(kssj)){
		condition+=" and check_time>='"+kssj+"'";
	}
	if(!isEmpty(jssj)){
		condition+=" and check_time<='"+jssj+"'";
	}
	
	var loader = dhtmlxAjax.postSync("authorize.spr?action=queryAnalysis","&type=time&condition="+condition+"&keyIndex="+keyIndex);
	var res=eval("("+loader.xmlDoc.responseText+")");
	data=res.list;
	if(chartType=="pie"){
	createPieChart();
	}else if(chartType=="bar"){
		createBarChart();
	}else if(chartType=="barH"){
		createBarHChart();
	}else if(chartType=="line"){
		createLineChart();
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
//	 var dhxWins= new dhtmlXWindows();
//	
//	 var popupWindow = parent.dhxLayout.dhxWins.createWindow("popupWindow",300,300,800,500);
//	 
//	 popupWindow.attachObject(chart);
//	 popupWindow.show();
	
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
function createLineChart(){
	newCanvas();
	chart =  new dhtmlXChart({
	     container: "chart_container"
	    	 });
	 chart.define("view","line");
	 chart.define("value","#number#");
	 chart.define("label","#keyindex#");
	 chart.define("xAxis",{
			title:"医院",
			template:"#keyindex#"
		});   	
	 chart.define("yAxis",{
      
     // template:"{obj}",
      title:"扣分"
	 	});     
	
	chart.parse(data,"json");
}
function loadSearchForm(){
	//owner
 	
    var sql="select user_name as value ,user_name as text from hospital.t_per_vrecord where user_name is  not null group by user_name ";
    var list1= db.queryForList(sql)
    list1.unshift({value:'ALL',text:"全部"});
    var list2= toComboData(parent.getKSList(),'dict_id','dict_text');
   list2.unshift({value:'ALL',text:"全部"});
	var list3=toComboData(parent.getXMList(),'dict_id','dict_text');
	list3.unshift({value:'ALL',text:"全部"});
	dhtmlx.skin = "dhx_skyblue";
	window.dhx_globalImgPath =parent.contextPath+"/js/dhtmlx/imgs/";
   formData = [
	{
	    type: "settings",
	    position: "label-left",
	    labelWidth: 60,
	    inputWidth: 110
	},          
    { type: "fieldset", name: "data1", label: "分析条件", inputWidth: "auto", list:[
    {type: "label", label: "数据范围",position:"label-left"}, 
    {type:"calendar", name:"beginTime", label:"开始时间:",readonly:0,dateFormat: "%Y-%m-%d"},
	{type:"calendar", name:"endTime", label:"结束时间:",readonly:0,dateFormat: "%Y-%m-%d"},
    {type:"combo", name:"user_name", label:"相关人员:",options:list1,filtering:true},
	{type:"combo", name:"xm", label:"项目",options:list3},
	
	 {type:"button", name:"search", value:"生成图形"},
	 {type: "newcolumn", offset:50},
	 {type: "label", label: ""},
	 {type: "label", label: ""},
	 {type:"combo", name:"ks", label:"科室",options:list2},
		{type:"combo", name:"hj", label:"关键环节",options:null},
		{type:"combo", name:"zb", label:"一级指标",options:null},
//	{type: "newcolumn", offset:50},
//    {type: "label", label: "分析指标",position:"label-left"},
//    {type: "radio", name: "keyIndex", value: "xm", label: "项目",checked: "1"},
//    {type: "radio", name: "keyIndex", value: "ks", label: "科室"},
//    {type: "radio", name: "keyIndex", value: "hj", label: "关键环节"},
//    {type: "radio", name: "keyIndex", value: "zb", label: "一级指标"},
    {type: "newcolumn", offset:50},
  {type: "label", label: "图表类型",position:"label-left"},
  {type: "radio", name: "chartType", value: "line", label: "折线图",checked: "1"},
  {type: "radio", name: "chartType", value: "bar", label: "垂直柱状图"},
  {type: "radio", name: "chartType", value: "barH", label: "水平柱状图"},
  {type: "radio", name: "chartType", value: "pie", label: "饼状图"}
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
}
function loadSonByParent(parentObj,sonObj){
	var sonCombo=myForm.getCombo(sonObj);
	var parentComboValue=myForm.getCombo(parentObj).getSelectedValue();
	sonCombo.clearAll();
	sonCombo.setComboValue("");
	var list2=parent.getDictListByParent(parentComboValue,sonObj);
	var list=new Array();
	for(var i=0;i< list2.length;i++){
		list.push({text:list2[i].text,value:list2[i].value});
		
		}
	if(list==null||list==""){
		list=new Array();
	}
	list.unshift({value:'ALL',text:"全部"});
	sonCombo.addOption(list);
}