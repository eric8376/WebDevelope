dhtmlxEvent(window,"load", doOnLoad);
var myForm, formData;
function doOnLoad() {
	//owner
	 	var serviceCall = new ServiceCall();
	 	 var obj=new Object();
	     obj.sql="select user_name as value ,user_name as text from t_per_record where user_name is  not null group by user_name ";
	     serviceCall.init("queryDataSvc");
		var rt3= serviceCall.execute(obj);
		rt3.list.unshift({value:'',text:""});
		//ks
		var list2=toComboData(parent.getKSList(),'dict_id','dict_text');
		list2.unshift({value:'ALL',text:"全部"});
		//xm
		var list3=toComboData(parent.getXMList(),'dict_id','dict_text');
		list3.unshift({value:'ALL',text:"全部"});
		dhtmlx.skin = "dhx_skyblue";
		window.dhx_globalImgPath =parent.contextPath+"/js/dhtmlx/imgs/";
        formData = [
		{
		    type: "settings",
		    position: "label-left",
		    labelWidth: 240,
		    inputWidth: 300
		},          
    
		{type:"calendar", name: 'kssj', label:'开始时间:',readonly:1,dateFormat: "%Y-%m-%d"},
		{type:"calendar", name:"jssj", label:"结束时间:",readonly:1,dateFormat: "%Y-%m-%d"},
		{type:"combo", name:"owner", label:"人名:",options:rt3.list,filtering:true},
		{type:"combo", name:"ks", label:"科室",options:list2},
		{type:"combo", name:"xm", label:"项目:",options:list3},
		{type:"combo", name:"hj", label:"关键环节",options:null},
		{type:"combo", name:"zb", label:"一级指标",options:null},
		{type:"button", name:"search", value:"开始搜索",offsetLeft:300,offsetTop :30}
	   
                ]
	myForm = new dhtmlXForm("form_container", formData);
    myForm.attachEvent("onButtonClick", function(name) {
    	if(name =='search'){
    		doSearch();
    	}
	});
    document.onkeydown=function(e){
    	if(e.keyCode=='13'){
    	doSearch();
    	}
    };
    //联动
    myForm.attachEvent("onSelectionChange", onChangeHandle );
    myForm.attachEvent("onChange", onChangeHandle );
    
    myForm.getCombo("owner").setComboValue("");
    myForm.getCombo("xm").setComboValue("");
    loadSonByParent("xm","hj");
    loadSonByParent("hj","zb");
    
   
   
        
}
function onChangeHandle(name){
	if(name=="xm"){
		loadSonByParent("xm","hj");
	}else if(name=='hj'){
		loadSonByParent("hj","zb");
		
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
function doSearch(){
	
		var kssj=myForm.getCalendar("kssj").getFormatedDate("%Y-%m-%d");
		var jssj=myForm.getCalendar("jssj").getFormatedDate("%Y-%m-%d");
		var owner=myForm.getItemValue("owner");
		var xm=myForm.getItemValue("xm");
		var ks=myForm.getItemValue("ks");
		var hj=myForm.getItemValue("hj");
		var zb=myForm.getItemValue("zb");
		parent.loadPage('manage.spr?action=recordManage&kssj='+kssj+'&jssj='+jssj+'&owner='+owner+'&ks='+ks+'&xm='+xm+'&hj='+hj+'&zb='+zb);

}

 	