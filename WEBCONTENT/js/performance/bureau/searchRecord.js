dhtmlxEvent(window,"load", doOnLoad);
var myForm, formData;
function doOnLoad() {
	//owner
	 	
	     var sql="select user_name as value ,user_name as text from bureau.t_per_record where user_name is  not null group by user_name ";
	    var list2= db.queryForList(sql)
		if(list2.size>0)
		list2.unshift({value:'',text:""});
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
        { type: "fieldset", name: "data", label: "搜索面板", inputWidth: "auto", list:[
		{type:"calendar", name: 'kssj', label:'开始时间:',readonly:1,dateFormat: "%Y-%m-%d"},
		{type:"calendar", name:"jssj", label:"结束时间:",readonly:1,dateFormat: "%Y-%m-%d"},
		{type:"combo", name:"owner", label:"医疗机构:",options:list2,filtering:true},
		{type:"combo", name:"xm", label:"项目",options:list3},
		{type:"combo", name:"hj", label:"关键环节",options:null},
		{type:"combo", name:"zb", label:"一级指标",options:null},
		{type:"button", name:"search", value:"开始搜索"}] 
	   }
                ]
	myForm = new dhtmlXForm("form_container", formData);
    myForm.attachEvent("onButtonClick", function(name) {
    	if(name =='search'){
    		doSearch();
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
    	doSearch();
    	}
    };
    myForm.getCombo("owner").setComboValue("");
    myForm.getCombo("xm").setComboValue("");
    loadSonByParent("xm","hj");
    loadSonByParent("hj","zb");
   
        
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
		var hj=myForm.getItemValue("hj");
		var zb=myForm.getItemValue("zb");
		parent.loadPage('manage.spr?action=recordManage&kssj='+kssj+'&jssj='+jssj+'&owner='+owner+'&hj='+hj+'&xm='+xm+'&zb='+zb);

}

 	