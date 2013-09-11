<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>大客户视图</title>
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
</style>
</head>
<body>

</body>
<script  type="text/javascript">

var ResCustPage = {};
var selectRecord,selectEl,lastCustID1,lastCustID2,lastCustID3,lastCustID4,lastCustID5;

Ext.setup({
    onReady: function() {
		initCustList();
		initResBusGrid();
		initTransGrid();
		initOptRoadGrid();
		initSynthesizeBussGrid();
		initNetDescGrid();
		initCustPropGrid();
        var tabPanel = new Ext.TabPanel({
            fullscreen: true,
            items: [
            	ResCustPage.CustList,
            	ResCustPage.busGrid,
            	ResCustPage.transGrid,
            	ResCustPage.optRoadGrid,
            	ResCustPage.synthesizeBussGrid,
            	ResCustPage.netDescGrid,
            	ResCustPage.custPropGrid,
	            {title: '机房拓扑',id:"card2",
                html: '<iframe id="topoFrame" name ="topoFrame" scrolling="auto" width="100%" height="100%"   src="<%=request.getContextPath()%>/main/touch/noTuopo.html"></iframe>',
                cls: 'card3'},
                {title: '拓扑云图 ',id:"card8",
                    html: '<iframe id="topoFrame1" name ="topoFrame1" scrolling="auto" width="100%" height="100%"   src="<%=request.getContextPath()%>/main/touch/noTuopo.html"></iframe>',
                    cls: 'card3'},
                {title: '业务拓扑图 ',id:"card9",
                    html: '<iframe id="topoFrame2" name ="topoFrame2" scrolling="auto" width="100%" height="100%"   src="<%=request.getContextPath()%>/main/touch/noTuopo.html"></iframe>',
                    cls: 'card3'},
                {title: '网元图   ',id:"card10",
                    html: '<iframe id="topoFrame3" name ="topoFrame3" scrolling="auto" width="100%" height="100%"   src="<%=request.getContextPath()%>/main/touch/noTuopo.html"></iframe>',
                    cls: 'card3'}
               ]
        });
        new Ext.Panel({
            fullscreen: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                flex: 1
            },
            items: [tabPanel]
        });
	tabPanel.on('cardswitch',function(tabPanel,newCard,oldCard,index,animated){
		 var custId=selectRecord.get("CUST_ID");
		if(selectRecord){
			if(newCard.id=="card0"){
				ResCustPage.CustList.select(selectEl);
			}
			if(newCard.id=="card1"){
				 if(lastCustID1!=custId){
				 	Ext.getBody().mask(false, '<div class="demos-loading">Loading&hellip;</div>');
				 	lastCustID1 = custId;
				 	ResCustPage.busGrid.getStore().load({params:{'custId':custId}});
             	 }
			}
			if(newCard.id=="card3"){
				 	Ext.getBody().mask(false, '<div class="demos-loading">Loading&hellip;</div>');
				 	ResCustPage.transGrid.getStore().load({params:{'custId':custId}});
			}
			if(newCard.id=="card2"){ 
			 	if(lastCustID2!=custId){
					lastCustID2 = custId;
					window.frames["topoFrame"].location.replace("<%=request.getContextPath()%>/main/touch/testTwaver.jsp");
				}
			}
			if(newCard.id=="card8"){ 
			 	if(lastCustID3!=custId){
					lastCustID3 = custId;
					window.frames["topoFrame1"].location.replace("<%=request.getContextPath()%>/main/touch/testTwaverCloudyTopo.jsp");
				}
			}
			if(newCard.id=="card9"){ 
			 	if(lastCustID4!=custId){
					lastCustID4 = custId;
					window.frames["topoFrame2"].location.replace("<%=request.getContextPath()%>/main/touch/testTwaverRoomTopo.jsp");
				}
			}
			if(newCard.id=="card10"){ 
			 	if(lastCustID5!=custId){
					lastCustID5 = custId;
					window.frames["topoFrame3"].location.replace("<%=request.getContextPath()%>/main/touch/testTwaverNetTopo.jsp");
				}
			}
			if(newCard.id == "card4"){
				Ext.getBody().mask(false, '<div class="demos-loading">Loading&hellip;</div>');
				ResCustPage.optRoadGrid.getStore().load({params:{'custId':custId}});
			}
			if(newCard.id == "card5"){
				Ext.getBody().mask(false, '<div class="demos-loading">Loading&hellip;</div>');
				ResCustPage.synthesizeBussGrid.getStore().load({params:{'custId':custId}});
			}
			if(newCard.id == "card6"){
				Ext.getBody().mask(false, '<div class="demos-loading">Loading&hellip;</div>');
				ResCustPage.netDescGrid.getStore().load({params:{'custId':custId}});
			}
			if(newCard.id == "card7"){
				Ext.getBody().mask(false, '<div class="demos-loading">Loading&hellip;</div>');
				ResCustPage.custPropGrid.getStore().load({params:{'custId':custId}});
			}
			
		}
	});
   }
    

});

var initMenuList = function(){
	 Ext.regModel('MenuModel', {
         fields: ['menuID', 'menuName']
     });
     ResCustPage.MenuPanel = new Ext.Panel({
         floating         : true,
         stopMaskTapEvent : true,
         hideOnMaskTap    : true,
         cls              : 'x-select-overlay',
         scroll           : 'vertical',
         items: {
             xtype: 'list',
             store: new Ext.data.Store({
                 model: 'MenuModel',
                 sorters: 'menuID',
                 data: [
                     {menuID: 'card1', menuName: '业务列表'},
                     {menuID: 'card2', menuName: '机房拓扑'},
                     {menuID: 'card3', menuName: '传输列表'},
                     {menuID: 'card4', menuName: '光路列表'},
                     {menuID: 'card5', menuName: '综合业务'},
                     {menuID: 'card6', menuName: '网络描述'},
                     {menuID: 'card7', menuName: '客户属性'},
                     {menuID: 'card8', menuName: '拓扑云图 '},
                     {menuID: 'card9', menuName: '业务拓扑图'},
                     {menuID: 'card10', menuName: '网元图'}
                 ]
             }),
             itemId: 'list',
             scroll: false,
             itemTpl : [
                 '<span class="x-list-label">{menuName}</span>',
                 '<span class="x-list-selected"></span>'
             ]                   
         }
     });
}
//客户列表
var initCustList = function(){
	initMenuList();
	 Ext.regModel('Customer', {
         fields: ['CUST_NO','CUST_ID']
     });
     var store = new Ext.data.JsonStore({
         model  : 'Customer',
         autoLoad :true,
         sorters: 'CUST_ID',
         proxy: {
	            type: 'ajax',
	            url: '<%=request.getContextPath()%>/cust.spr?action=queryCust',
	            reader: {
	                type: 'json',
	                root: 'list',
	                idProperty: 'CUST_ID'
	            }
     		}
     });
     var listConfig = {
         tpl: '<tpl for="."><div class="contact" ><img height="40"  src="../../images/LOGO/{CUST_ID}.png"/><strong>{CUST_NO}</strong></div></tpl>',
         itemSelector: 'div.contact',
         singleSelect: true,
         disclosure: {
             scope: 'this',
             handler: function(record, btn, index) {
        	 	ResCustPage.MenuPanel.showBy(btn, 'fade', false);
             }
         },
         title:'客户',
         id:"card0",
         grouped     : false,
         store: store,
         dockedItems: [
               {xtype: 'toolbar',dock : 'top',
                items: [{xtype: 'spacer'},
                    {xtype: 'textfield',placeHolder: 'Search...',
                        listeners  : {
                            scope: this,
                            keyup: function(field) {
                                var value = field.getValue();
                                if (!value) {
                                    store.filterBy(function() {
                                        return true;
                                    });
                                } else {
                                    var searches = value.split(' '),
                                        regexps  = [],
                                        i;
                                    for (i = 0; i < searches.length; i++) {
                                        if (!searches[i]) return;
                                        regexps.push(new RegExp(searches[i], 'i'));
                                    };
                                    store.filterBy(function(record) {
                                        var matched = [];
                                        for (i = 0; i < regexps.length; i++) {
                                            var search = regexps[i];
                                            if (record.get('CUST_NO').match(search)) matched.push(true);
                                            else matched.push(false);
                                        };
                                        if (regexps.length > 1 && matched.indexOf(false) != -1) {
                                            return false;
                                        } else {
                                            return matched[0];
                                        }
                                    });
                                }
                            }
                        }
                    },
                    {xtype: 'spacer'}
                ]
               }
           ]
     };
	var custList = ResCustPage.CustList = new Ext.List(Ext.apply(listConfig, {
        fullscreen: true
    }));
	ResCustPage.CustList.on('itemtap',function(dataView,index,item,e){
    	selectRecord = ResCustPage.CustList.getStore().getAt(index);
    	selectEl = item;
    });
};
//业务列表
var initResBusGrid = function(){
	Ext.regModel("Circuit", {
		fields     : ["CIRCUIT_ID","CIRCUIT_NO","BUZ_TYPE","SPECIALITY","ROOM_NAME","EQP_NAME","EQP_NO"]
	});
	var testStore = new Ext.data.JsonStore({
      model  : 'Circuit',
      autoLoad :false,
      sorters: 'CIRCUIT_ID',
      proxy: {
            type: 'ajax',
            url: '<%=request.getContextPath()%>/cust.spr?action=queryBuss',
            reader: {
                type: 'json',
                root: 'list',
                idProperty: 'CIRCUIT_ID'
            }
  		}
  }); 
	var testGrid = ResCustPage.busGrid = new Ext.ux.TouchGridPanel({
		fullscreen  : true,
		id:"card1",
		store       : testStore,
		title : "业务",
		colModel    : [
			{header  : "电路编号",mapping : "CIRCUIT_NO"},
			{header   : "业务类型",mapping  : "BUZ_TYPE"},
			{header   : "专业",mapping  : "SPECIALITY"},
			{header   : "机房名称",mapping  : "ROOM_NAME"},
			{header   : "设备名称",mapping  : "EQP_NAME"},
			{header   : "设备编号",hidden:true,mapping  : "EQP_NO"}
		]
	});
}
//传输列表
var initTransGrid = function(){
	 Ext.regModel("TransCircuit", {
			fields : ["CUST_ID","CIRCUIT_ID", "SERVICE_NO","BUZ_TYPE","CIRCUIT_NO","CIRCUIT_NAME","RATE", "A_TRS_NE_NAME","Z_TRS_NE_NAME"]
		});
	var testStore = new Ext.data.JsonStore({
       model  : 'TransCircuit',
       autoLoad :false,
       sorters: 'CIRCUIT_ID',
       proxy: {
	            type: 'ajax',
	            url: '<%=request.getContextPath()%>/cust.spr?action=queryTransfer',
	            reader: {
	                type: 'json',
	                root: 'list',
	                idProperty: 'CIRCUIT_ID'
	            }
   		}
   }); 
	var transGrid = ResCustPage.transGrid = new Ext.ux.TouchGridPanel({
		fullscreen  : false,
		id:"card3",
		store: testStore,
		title : "传输电路",
		colModel    : [
			{header  : "序号",mapping : "CIRCUIT_NO"},
			{header   : "业务分类",mapping  : "BUZ_TYPE"},
			{header   : "传输电路编码",mapping  : "CIRCUIT_NO"},
			{header   : "传输电路名称",mapping  : "CIRCUIT_NAME"},
			{header   : "速率",mapping  : "RATE"},
			{header   : "起端设备",mapping  : "A_TRS_NE_NAME"},
			{header   : "终端设备",mapping  : "Z_TRS_NE_NAME"},
			{header   : "定单号",mapping  : "SERVICE_NO"}
		]
	});
}
//光路列表
var initOptRoadGrid = function(){
	Ext.regModel("OPT", {
		fields     : ["BUZ_TYPE","CIRCUIT_NO","OPT_PAIR_NUM","A_NAME","Z_NAME","CIRCUIT_ID"]
	});
	var testStore = new Ext.data.JsonStore({
      model  : 'OPT',
      autoLoad :false,
      sorters: 'CIRCUIT_ID',
      proxy: {
            type: 'ajax',
            url: '<%=request.getContextPath()%>/cust.spr?action=queryOptRoad',
            reader: {type: 'json',root: 'list',idProperty: 'CIRCUIT_ID'}
  		}
   }); 
	var optRoadGrid = ResCustPage.optRoadGrid  =new Ext.ux.TouchGridPanel({
		fullscreen  : true,
		id:"card4",
		store       : testStore,
		title : "光路",
		colModel    : [
			{header  : "光纤类别",mapping : "BUZ_TYPE"},
			{header   : "光路编码",mapping  : "CIRCUIT_NO"},
			{header   : "纤芯数量",mapping  : "OPT_PAIR_NUM"},
			{header   : "起端设备",mapping  : "A_NAME"},
			{header   : "终端设备",mapping  : "Z_NAME"}
		]
	});
}
//综合业务
var initSynthesizeBussGrid = function(){
	 Ext.regModel("SynthesizeBuss", {
		fields: ["ROWNUM","BUZ_TYPE","CIRCUIT_NO","RATE","EQPBEG","EQPEND","DIS_NO"]
		});
	var testStore = new Ext.data.JsonStore({
       model  : 'SynthesizeBuss',
       autoLoad :false,
       sorters: 'CIRCUIT_ID',
       proxy: {type: 'ajax',
	           url: '<%=request.getContextPath()%>/cust.spr?action=querySynthesizeBuss',
	           reader: {type: 'json',root: 'list',idProperty: 'CIRCUIT_ID'}
   		}
   }); 
	var testGrid = ResCustPage.synthesizeBussGrid = new Ext.ux.TouchGridPanel({
		fullscreen  : true,
		id:"card5",
		store: testStore,
		title : "综合业务",
		colModel    : [
			{header  : "综合业务类别",mapping : "BUZ_TYPE"},
			{header   : "综合业务电路编码",mapping  : "CIRCUIT_NO"},
			{header   : "速率",mapping  : "RATE"},{header   : "起端设备",mapping: "EQPBEG"},
			{header   : "终端设备",mapping  : "EQPEND"},
			{header   : "订单号",mapping  : "DIS_NO"}
		]
	});
};
//网络描述
var initNetDescGrid = function(){
	Ext.regModel("NetDesc", {
		fields     : ["ROWNUM","CUST_ID_NODE","EQP_NAME","CIR_INFO","UPPER_NODE","PROTECT_TYPE","OPT_INFO"]
	});
	var testStore = new Ext.data.JsonStore({
      model  : 'NetDesc',
      autoLoad :false,
      sorters: 'CUST_ID_NODE',
      proxy: {
            type: 'ajax',
            url: '<%=request.getContextPath()%>/cust.spr?action=queryNetDesc',
            reader: {type: 'json',root: 'list',idProperty: 'CUST_ID_NODE'}
  		}
	}); 
	var testGrid = ResCustPage.netDescGrid = new Ext.ux.TouchGridPanel({
		fullscreen  : true,
		id:"card6",
		store       : testStore,
		title : "网络描述",
		colModel    : [
			{header  : "主要节点",mapping : "EQP_NAME"},
			{header   : "节点电路信息",mapping  : "CIR_INFO"},
			{header   : "上联网元",mapping  : "UPPER_NODE"},
			{header   : "保护方式",mapping  : "PROTECT_TYPE"},
			{header   : "光路情况",mapping  : "OPT_INFO"}
		]
	});	
};
//属性
var initCustPropGrid = function(){
	 Ext.regModel("PROP", {
			fields: ["key","value",]
		});
	 var testStore = new Ext.data.JsonStore({
       model  : 'PROP',
       autoLoad :false,
       sorters: 'key',
       proxy: {
	            type: 'ajax',
	            url: '<%=request.getContextPath()%>/cust.spr?action=queryCustProp',
	            reader: {type: 'json',root: 'list',idProperty: 'key'}
   		}
   }); 
	var testGrid = ResCustPage.custPropGrid =new Ext.ux.TouchGridPanel({
		fullscreen  : true,
		id:"card7",
		store: testStore,
		title : "客户属性",
		colModel: [
			{header  : "属性",mapping : "key"},
			{header   : "属性值",mapping  : "value"}
		]
	});
}
</script>


</html>