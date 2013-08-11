<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%> 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>资源能力计算</title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/style/touch/ext-touch.css" type="text/css" media="screen">
<link rel="stylesheet" href="<%=request.getContextPath()%>/style/touch/touchGridPanel.css" type="text/css" media="screen">
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/ext-touch.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/touchGridPanel.js"></script>
<style type="text/css" media="screen">
	 .demos-loading {
          background: rgba(0,0,0,.3) url(<%=request.getContextPath()%>/images/loading.gif) center center no-repeat;
          display: block;
          width: 10em;
          height: 10em;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -5em;
          margin-top: -5em;  
          -webkit-border-radius: .5em;
          color: #fff;
          text-shadow: #000 0 1px 1px;
          text-align: center;
          padding-top: 8em;
          font-weight: bold;
        }
        .card1 > .x-panel-body {
	       padding: 20px;
	       text-align: center;
	       color: rgba(0,0,0,.5);
	   }
</style>
</head>
<body>
</body>
</html>
<script  type="text/javascript">
var pageIndex,pageSize=30,lastPage,houseName;
var ResPage = {};
ResPage.conditions = [];
Ext.setup({
    glossOnIcon: false,
    onReady: function() {
    	initFrom();
    	initGrid();
    	initMainPanel();
    	initListener();
    }
});
var initMainPanel = function(){
	ResPage.backButton = new Ext.Button({
       text: "返回",
       ui: 'back',
       handler:function(){
			var mainPanel = Ext.getCmp("mainPanel");
			mainPanel.setActiveItem(ResPage.resFrom,{type: 'slide',reverse: true});
			ResPage.navigationBar.setTitle(mainPanel.title);
			ResPage.backButton.hide();
	    },
       hidden: true,
       scope: this
   });
	
	ResPage.navigationBar = new Ext.Toolbar({
       ui: 'dark',
       dock: 'top',
       title: '资源能力计算',
       items: [ResPage.backButton, {xtype: 'spacer'}]
   });
	ResPage.MainPanel = new Ext.Panel({
		title: '资源能力计算',
		id:'mainPanel',
		fullscreen: true,
		dockedItems:[ResPage.navigationBar],
		layout: 'card',
		items:[
			ResPage.resFrom,	
	        ResPage.resGrid
		]
	}).show();
	
};
var initFrom  = function(){
	Ext.regModel("Strategys", {
		fields     : ["strategyId","strategyDesc"]
	});
	straStore = new Ext.data.JsonStore({
         model  : 'Strategys',
         autoLoad :true,
         proxy: {
            type: 'ajax',
            url: '<%=request.getContextPath()%>/ajaxParam.spr?action=queryStrategys&prodId=000000000000000000001004',
            reader: {
                type: 'json',
                root: 'list',
                idProperty: 'strategyId'
            }
     		}
     });
	Ext.regModel("atomSel", {
		fields     : ["srvId","srvDesc"]
	});
	atomSelStore = new Ext.data.JsonStore({
         model  : 'atomSel',
         autoLoad :false,
         proxy: {
            type: 'ajax',
            url: '<%=request.getContextPath()%>/ajaxParam.spr?action=queryStrategyGroup',
            reader: {
                type: 'json',
                root: 'list',
                idProperty: 'srvId'
            }
     		}
     });  
	var srVar = [{value: '28040032',  text:"2M"},{value: '28040040',  text:"3M"},{value: '28040047',  text:"4M"},{value: '28040052',  text:"5M"},
	             {value: '28040060',  text:"6M"},{value: '28040063',  text:"7M"},{value: '28040065',  text:"8M"},{value: '28040003',  text:"10M"},
	             {value: '28040007',  text:"12M"},{value: '28040010',  text:"14M"},{value: '28040013',  text:"15M"},{value: '28040014',  text:"16M"},
	             {value: '28040015',  text:"17M"},{value: '28040017',  text:"18M"},{value: '28040024',  text:"20M"},{value: '28040026',  text:"22M"},
	             {value: '28040027',  text:"24M"},{value: '28040029',  text:"25M"},{value: '28040030',  text:"26M"},{value: '28040031',  text:"28M"},
	             {value: '28040034',  text:"30M"},{value: '28040036',  text:"32M"},{value: '28040037',  text:"34M"},{value: '28040038',  text:"36M"},
	             {value: '28040042',  text:"42M"},{value: '28040042',  text:"43M"},{value: '28040044',  text:"44M"},{value: '28040045',  text:"45M"},
	             {value: '28040046',  text:"46M"},{value: '28040048',  text:"50M"},{value: '28040051',  text:"54M"},{value: '28040053',  text:"60M"},
	             {value: '28040059',  text:"68M"},{value: '28040061',  text:"70M"},{value: '28040064',  text:"80M"},{value: '28040066',  text:"90M"},
	             {value: '28040067',  text:"96M"},{value: '28040001',  text:"100M"},{value: '28040004',  text:"120M"},{value: '28040008',  text:"135M"},
	             {value: '28040009',  text:"140M"},{value: '28040012',  text:"155M"},{value: '28040016',  text:"180M"},{value: '28040023',  text:"200M"},
	             {value: '28040025',  text:"225M"},{value: '28040033',  text:"300M"},{value: '28040035',  text:"310M"},{value: '28040041',  text:"405M"},
	             {value: '28040050',  text:"540M"},{value: '28040054',  text:"620M"},{value: '28040055',  text:"622M"},{value: '28040058',  text:"675M"},
	             {value: '28040020',  text:"1G"},{value: '28040000',  text:"1.25G"},{value: '28040022',  text:"2.5G"},{value: '28040002',  text:"10G"},
	             {value: '28040068',  text:"FE"}];
    var typeOpt=[{value: '',  text:"请选择"},{value: '3101016',  text:"2M电口"},{value: '3101012',  text:"34M电口"},{value: '3101014',  text:"45M电口"},{value: '31010123',  text:"140M电口"},
                 {value: '3101007',  text:"155M电口"},{value: '3101011',  text:"Fast Ethernet电口"},{value: '24150004',  text:"GigabitEthernet"},{value: '3101017',  text:"155M光口"},
                 {value: '3101004',  text:"622M光口"},{value: '3101001',  text:"2.5G光口"},{value: '3101016',  text:"2M电口"},{value: '3101000',  text:"10G光口"}];
	var resFrom = ResPage.resFrom = new Ext.form.FormPanel({
        id:"resFrom",
        name:"resFrom",
        scroll: 'vertical',
        modal: true,
        fullscreen : true,
        items: [
			{xtype: 'fieldset', id:'calcCondi',name:'calcCondi',title: '计算条件',defaults: {labelAlign: 'left'},
			    items: [
		    {xtype: 'textfield',id : 'aResTypeName',name : 'aResTypeName',label: 'A端机房 ',showClear: true,autoCapitalize : false},
		    {xtype: 'textfield',id : 'zResTypeName',name : 'zResTypeName',label: 'Z端机房 ',showClear: true,autoCapitalize : false},
		    {xtype: 'selectfield',id: 'strategySel',name: 'strategySel',label:'接入方式',store:straStore,displayField:"strategyDesc",valueField:"strategyId"},
		    {xtype: 'selectfield',id: 'atomSel',name: 'atomSel',label:'原子服务列表',store:atomSelStore,displayField:"srvDesc",valueField:"srvId"},
		    {xtype: 'numberfield',id : 'cirCount',name : 'cirCount',label: '电路数量 ',minValue : 1,value:1,showClear: true,autoCapitalize : false},
		    {xtype: 'selectfield',id: 'rateSel',name: 'rateSel',label:'速率',options:srVar},
		    {xtype: 'selectfield',id: 'portTypeSel',name: 'portTypeSel',label:'端口类型',options:typeOpt},
		    {xtype: 'hiddenfield',id: 'aResType',name: 'aResType'},
		    {xtype: 'hiddenfield',id: 'zResType',name: 'zResType'}
		 ]},   
		    {xtype: 'fieldset', id:'calcRes',name:'calcRes',title: '计算结果',defaults: {labelAlign: 'left'},
	            items: [
	            	{xtype: 'textfield',id: 'srvName',name: 'srvName',disabled:true,label:'原子服务名称'},
	            	{xtype: 'textareafield',id : 'condition',name : 'condition',label: '计算输入条件',disabled:true,maxLength : 60,maxRows : 2,showClear: true,autoCapitalize : false},
	            	{xtype: 'textfield',id : 'result',name : 'result',label: '资源是否具备',disabled:true,showClear: true,autoCapitalize : false}
	             ]
	           }
       ],
       dockedItems: [
            {xtype: 'toolbar',dock: 'bottom',
             items: [
                  {xtype: 'spacer'},
                  {text: '计算',
                   ui: 'confirm',
                   handler: function() {
                	  calculate();
                  }
                  },{
                      text: '重置',
                      handler: function() {
                          ResPage.resFrom.reset();
                      }
                  }
                ]
            }
        ]
	});
};
var initGrid = function(){
	ResPage.resCol = ["srvName","condition","result"];
	Ext.regModel("Circuit", {
		fields     : ResPage.resCol
	});
	testStore = new Ext.data.JsonStore({
         model  : 'Circuit',
         autoLoad :false,
         proxy: {
            type: 'ajax',
            url: '<%=request.getContextPath()%>/ajaxParam.spr?action=queryTransRouteCalc',
            reader: {
                type: 'json',
                root: 'list',
                idProperty: ' CUST_ID'
            }
     		}
     }); 
	var resGrid = ResPage.resGrid = new Ext.ux.TouchGridPanel({
		fullscreen:false,
		id:"card1",
		store: testStore,
		id:"resGrid",
		selModel    : {
			singleSelect : true,
			locked:false
		},
		name:"resGrid",
		editable:true,
		title : "能力计算结果",
		colModel: [
				{
					header  :'原子服务名称',
					mapping :'srvName'
				},{
					header  :'计算输入条件',
					mapping :'condition'
				},{
					header  :'资源是否具备',
					mapping :'result'
				}
		]
	});
};
var initListener  = function(){
	var aResType = Ext.getCmp('aResTypeName');
	var zResType = Ext.getCmp('zResTypeName');
	var strategySel = Ext.getCmp('strategySel');
	aResType.addListener("focus",function(){
		ResPage.selectItemId = Ext.getCmp('aResType');
		ResPage.selectItemName = aResType;
		showHousePanel();
	});
	zResType.addListener("focus",function(){
		ResPage.selectItemId = Ext.getCmp('zResType');
		ResPage.selectItemName = zResType;
		showHousePanel();
	});
	strategySel.addListener("change",function(strategySel,value){
		var atomSel = Ext.getCmp('atomSel');
		atomSel.store.load({params:{'strategyId':value}});
	});
};
var showHousePanel = function(){
	if(!ResPage.aRoomPanel){
		 Ext.regModel('House', {
            fields: ['ID','CHINA_NAME','ROOM_NO','ONDUTY_TELE','AREA','HEIGHT','REGION_NAME','BELOG_STATION','SPECIALITY','DESC_CHINA','LOCATION']
         });
        houseStore = new Ext.data.JsonStore({
            model  : 'House',
            autoLoad :false,
            sorters: 'CNT_BOX_NO',
            proxy: {
  	            type: 'ajax',
  	            url: '<%=request.getContextPath()%>/opt.spr?action=queryHouse&pageSize=30',
  	            reader: {
  	                type: 'json',
  	                root: 'list',
  	                idProperty: 'ID',
  	                getData:getPageInfo
  	            }
        	}
        });
        ResPage.houseGrid = new Ext.ux.TouchGridPanel({
				id:"houseGrid",
				selModel    : {
					singleSelect : true,
					locked:false
				},
				width: "100%",
                height: "100%",
				store : houseStore,
				title : "查询机房",
				colModel    : [
					{header  : "机房编码",mapping : "ROOM_NO"},
					{header   : "机房名称",mapping  : "CHINA_NAME"},
					{header   : "区域名称",mapping  : "REGION_NAME"},
					{header   : "高度",hidden:true,mapping  : "HEIGHT"},
					{header   : "专业",mapping  : "SPECIALITY"},
					{header   : "位置",mapping  : "LOCATION"}
				]
			});
		ResPage.aRoomPanel = new Ext.Panel({
			 floating: true,
	         width: "90%",
             height: "80%",
             modal: true,
             centered: true,
	         stopMaskTapEvent : true,
	         hideOnMaskTap: true,
	         items:ResPage.houseGrid,
	         dockedItems: [
                {xtype: 'toolbar',dock : 'top',title:'机房查询',
                      items: [
                          {xtype      : 'textfield',
                           placeHolder: '机房名称',
                           id:'seachCod',
                           name:'seachCod',
                           listeners  : {
                               scope: this,
                               blur: searchHouse
                           }
                          },
                          {xtype: 'button',ui: 'confirm',text:'GO',handler:function(){
                              var seachField = Ext.getCmp('seachCod');
                              searchHouse(seachField);
                              }},
                          {xtype: 'spacer'}
                      ]
                   },{xtype: 'toolbar',dock : 'bottom',scroll: 'horizontal',
                     layout: {pack: 'center'},
                     defaults: {iconMask: true,ui: 'plain'},
                     items: [
                         {id:'preBtn',iconCls: 'arrow_left',disabled:true,handler:prePage},
                         {xtype: 'spacer'},
                         {id:'reloadBtn',iconCls: 'refresh',disabled:true,iconCls: 'refresh',handler:refresh},
                         {xtype: 'spacer'},
                         {id:'nextBtn',iconCls: 'arrow_right',disabled:true,iconCls: 'arrow_right',handler:nextPage},
                         {text: '确定',ui: 'confirm',handler:function(){
							var record =  ResPage.houseGrid.getSelect();
							if(record){
								ResPage.selectItemId.setValue(record.get("ID"));
								ResPage.selectItemName.setValue(record.get("CHINA_NAME"));
							}
							 ResPage.aRoomPanel.hide({
	          			            type: 'fade',
	          			            out: true,
	          			            scope: this
	          			        });
                         }} ,
                         {text: '取消',ui: 'confirm',handler:function(){
                        	 ResPage.aRoomPanel.hide({
          			            type: 'fade',
          			            out: true,
          			            scope: this
          			        });
						 }} 
                     ]
                 }
               ]
		});
	}
	ResPage.aRoomPanel.show();
}

function calculate(){	
	var args = new Object();
	args.srvId = Ext.getCmp('atomSel').getValue(); 
	args.aRoomId = Ext.getCmp('aResType').getValue();
	args.zRoomId = Ext.getCmp('zResType').getValue();
	//args.azFlag = nvl(azSel.value);
	args.rate = Ext.getCmp('rateSel').getValue(); 
	args.portType =  Ext.getCmp('portTypeSel').getValue();
	//args.pairNo =  Ext.getCmp('pairNoSel').getValue();
    args.cirCount = Ext.getCmp('cirCount').getValue();
	args.roomId = "";

	if(Ext.getCmp('strategySel').getValue()==""){
		Ext.Msg.alert('提示', '请先选择接入方式！', Ext.emptyFn);
	  	return;
	}
	//校验条件
	if(args.srvId=="" || args.srvId=="-1"){
		Ext.Msg.alert('提示', '请先选择要进行计算的原子服务！', Ext.emptyFn);
	  	return;
	}
  if(args.srvId==1010 || args.srvId==1003){ //传输与光纤原子服务
    if(args.aRoomId=="" || args.zRoomId==""){
    	Ext.Msg.alert('提示', '两端机房不能为空！', Ext.emptyFn);
	  	return;
     }	
    if(args.srvId==1010){ //传输
    	if(args.rate==""||args.rate=="-1"){
    		Ext.Msg.alert('提示', '请选择速率！', Ext.emptyFn);
    	  	return;
    	}
    	if(args.portType==""||args.portType=="-1"){
    		Ext.Msg.alert('提示', '请选择端口类型！', Ext.emptyFn);
    		return;
    	}
    }
  }else{
	  Ext.Msg.alert('提示', '不是目前支持进行能力计算的资源服务！', Ext.emptyFn);
	  return;
  }
 	var calcRes = Ext.getCmp('calcRes');
 	calcRes.setLoading(true);
 	var index  = Ext.getCmp('rateSel').store.findExact("value", args.rate);
 	var selectRate = Ext.getCmp('rateSel').store.getAt(index);
  //调用后台
	args.rateDesc = selectRate.get("text");
	Ext.Ajax.request({
        url: '<%=request.getContextPath()%>/ajaxParam.spr?action=queryTransRouteCalc',
        timeout:30000000,
        params:{'aRoomId':args.aRoomId,'zRoomId':args.zRoomId,'portType':args.portType,'rateDesc':args.rateDesc,'cirCountStr':args.cirCount},
        success: function(response, opts) {
            var countResult = response.responseText;
            var record = {};
            //原子服务名称
            var atomSel_Inx  = Ext.getCmp('atomSel').store.findExact("srvId",args.srvId);
            var atomSel_Name =  Ext.getCmp('atomSel').store.getAt(atomSel_Inx).get("srvDesc");
            record.srvName = atomSel_Name;
            var aRoomName =  Ext.getCmp('aResTypeName').getValue();
            var zRoomName =  Ext.getCmp('zResTypeName').getValue();
            //端口类型
            var portType_Inx =  Ext.getCmp('portTypeSel').store.findExact("value",args.portType);
            var portType_Name =  Ext.getCmp('portTypeSel').store.getAt(portType_Inx).get("text");
            var conditionStr = "A端机房："+aRoomName+"；  Z端机房:"+zRoomName+"；  ";
            if(args.rate!="" && args.rate!="-1"){
              	conditionStr += "速率："+args.rateDesc+"；  ";
              }
            if(args.portType!="" && args.portType!="-1"){
              	conditionStr += "端口类型："+portType_Name+"；  ";
              }
            record.condition = conditionStr;
        	if(countResult==0){
        		record.result = "不具备(时隙资源不足)";
        	  }else if(countResult==1){
        		  record.result = "具备";
        	  }else if(countResult==21){
        		  record.result = "部分具备(有路由，A端端口资源不足)";
        	  }else if(countResult==22){
        		  record.result = "部分具备(有路由，Z端端口资源不足)";
        	  }else if(countResult==3){
        		  record.result = "具备(只能开通10M及以下业务)";
        	  }
      	  Ext.getCmp('condition').setValue(record.condition);
      	  Ext.getCmp('result').setValue(record.result);
      	  Ext.getCmp('srvName').setValue(record.srvName);
      	calcRes.setLoading(false);
        //	ResPage.resGrid.getStore().add(record);
        }
    });
}
function searchHouse (field) {
	houseName = field.getValue();
	ResPage.houseGrid.getStore().load({params:{'siteName':houseName}});
};
function refresh(){
	ResPage.houseGrid.getStore().load({params:{'pageIndex':pageIndex,'pageSize':pageSize,'siteName':houseName}});
}
function nextPage(){
 if(pageIndex==lastPage){
	 alert(1);
    return;
  }
  Ext.getCmp("preBtn").onEnable();
  ResPage.houseGrid.getStore().load({params:{'pageIndex':pageIndex+1,'pageSize':pageSize,'siteName':houseName}});
}
function prePage()
{
	if(!pageIndex||pageIndex<=1){
	    return;
	  }
	  Ext.getCmp("nextBtn").onEnable();
  ResPage.houseGrid.getStore().load({params:{'pageIndex':pageIndex-1,'pageSize':pageSize,'siteName':houseName}});
}
function getPageInfo(data){
	Ext.getCmp("reloadBtn").onEnable();
   	pageIndex=data.pageIndex;
   	pageSize=data.pageSize;
   	lastPage=data.lastPage;
   	if(lastPage==1 ||pageIndex == lastPage){
	 	Ext.getCmp("nextBtn").onDisable();
	}
	if(pageIndex==1){
	 	Ext.getCmp("preBtn").onDisable();
	}else{
		Ext.getCmp("preBtn").onEnable();
	}
	if(pageIndex<lastPage){
		Ext.getCmp("nextBtn").onEnable();
	}
   return data;
}
</script>

