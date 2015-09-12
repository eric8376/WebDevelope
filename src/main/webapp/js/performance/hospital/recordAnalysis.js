dhtmlxEvent(window,"load", doOnLoad);

var chart,myForm,data,keyIndex,chartType,valueIndex;

function doOnLoad() {
	chart =  new dhtmlXChart({
	     container: "chart_container"
	    	 });
	loadSearchForm();
	
}
function doAnalysis(newWindows){
	
	var condition="";
	var user_name=myForm.getItemValue("user_name");
	var xm=myForm.getItemValue("xm");
	var ks=myForm.getItemValue("ks");
	var post=myForm.getItemValue("post");
	var zb=myForm.getItemValue("zb");
	var ejzb=myForm.getItemValue("ejzb");
	var hj=myForm.getItemValue("hj");
	var kssj=myForm.getCalendar("beginTime").getFormatedDate("%Y-%m-%d");
	var jssj=myForm.getCalendar("endTime").getFormatedDate("%Y-%m-%d");
	keyIndex=myForm.getItemValue("keyIndex");
	valueIndex=myForm.getItemValue("valueIndex");
	chartType=myForm.getItemValue("chartType");
	
	if(!isEmpty(user_name)&&user_name!="ALL"){
		condition+=" and user_name='"+user_name+"' ";
	}
	if(!isEmpty(hj)&&zb!="ALL"){
		condition+=" and hj_id='"+hj+"' ";
	}
	if(!isEmpty(ejzb)&&ejzb!="ALL"){
		condition+=" and ejzb_id='"+ejzb+"' ";
	}
	if(!isEmpty(zb)&&zb!="ALL"){
		condition+=" and zb_id='"+zb+"' ";
	}
	if(!isEmpty(ks)&&ks!="ALL"){
		condition+=" and ks_id='"+ks+"' ";
	}
	if(!isEmpty(post)&&post!="ALL"){
		condition+=" and post='"+post+"' ";
	}
	if(!isEmpty(xm)&&xm!="ALL"){
		condition+=" and xm_id='"+xm+"' ";
	}
	if(!isEmpty(kssj)){
		condition+=" and check_time>='"+kssj+"'";
	}
	if(!isEmpty(jssj)){
		condition+=" and check_time<='"+jssj+"'";
	}
	var allcondition="&condition="+condition+"&keyIndex="+keyIndex+"&valueIndex="+valueIndex+"&chartType="+chartType;
	if(newWindows)
	{
		window.open("p.spr?page=chartview"+allcondition);
	}
	else{
	var loader = dhtmlxAjax.postSync("authorize.spr?action=queryAnalysis",allcondition);
	var res=eval("("+loader.xmlDoc.responseText+")");
	data=parent.filter(res.list,keyIndex);
	doCreateChart(chartType,data);
	}
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
    { type: "fieldset", name: "data1", label: "分析条件", width : 900, list:[
    {type: "label", label: "数据范围",position:"label-left"}, 
    {type:"calendar", name:"beginTime", label:"开始时间:",readonly:0,dateFormat: "%Y-%m-%d"},
	{type:"calendar", name:"endTime", label:"结束时间:",readonly:0,dateFormat: "%Y-%m-%d"},
    {type:"combo", name:"user_name", label:"相关人员:",options:list1,readonly:1},
    {type:"combo", name:"post", label:"人员类别:",options:parent.getEjzb(true),readonly:1},
    {type:"combo", name:"ks", label:"科室",options:list2,readonly:1},
	 {type:"button", name:"search", value:"生成图表(本页)"},
	 {type:"button", name:"searchnew", value:"生成图表(新页)"},
	 {type: "newcolumn", offset:50},
	 {type: "label", label: ""},
	 {type: "label", label: ""},
	 {type:"combo", name:"xm", label:"项目",options:list3,readonly:1},
		{type:"combo", name:"hj", label:"关键环节",options:null,readonly:1},
		{type:"combo", name:"zb", label:"一级指标",options:null,readonly:1},
		{type:"combo", name:"ejzb", label:"二级指标",options:null,readonly:1},
		
	{type: "newcolumn", offset:50},
    {type: "label", label: "分析类型",position:"label-left"},
    {type: "radio", name: "keyIndex", value: "post", label: "人员类别"},
    {type: "radio", name: "keyIndex", value: "ks", label: "科室"},
    {type: "radio", name: "keyIndex", value: "xm", label: "项目",checked: "1"},
    {type: "radio", name: "keyIndex", value: "hj", label: "关键环节"},
    {type: "radio", name: "keyIndex", value: "zb", label: "一级指标"},
    {type: "radio", name: "keyIndex", value: "ejzb", label: "二级指标"},
    {type: "newcolumn", offset:50},
    {type: "label", label: "统计数值",position:"label-left"},
    {type: "radio", name: "valueIndex", value: "ROUND(sum(kaohe),1)", label: "考核分",checked: "1"},
    {type: "radio", name: "valueIndex", value: "count(1)", label: "监测数"},
    {type: "radio", name: "valueIndex", value: "sum(jiance)", label: "监测值"},
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
myForm = createFormObject(formData);
myForm.attachEvent("onButtonClick", function(name) {
	if(name =='search'){
		doAnalysis(false);
	}else if(name =='searchnew'){
		doAnalysis(true);
	}
});
myForm.attachEvent("onChange", function(name) {
	if(name=="xm"){
		loadSonByParent("xm","hj");
	}else if(name=='hj'){
		loadSonByParent("hj","zb");
		
	}else if(name=='zb'){
		loadSonByParent("zb","ejzb");
	}
	//alert(name);
});
document.onkeydown=function(e){
	if(e.keyCode=='13'){
	doAnalysis(true);
	}
};
myForm.getCombo("user_name").setComboValue("");
myForm.getCombo("xm").setComboValue("");
loadSonByParent("xm","hj");
loadSonByParent("hj","zb");
loadSonByParent("zb","ejzb");
}
function loadSonByParent(parentObj,sonObj){
	var sonCombo=myForm.getCombo(sonObj);
	var parentComboValue=myForm.getCombo(parentObj).getSelectedValue();
	sonCombo.clearAll();
	sonCombo.setComboText("");
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