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
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/zteTouch.js"></script>
</head>
<body>

</body>
<script  type="text/javascript">
var ResCustPage = {};
var selectRecord,selectEl,lastCustID1,lastCustID2,lastCustID3,lastCustID4,lastCustID5;

Ext.setup({
    onReady: function() {
		ResCustPage.IsPad =  Ext.is.Phone;
		initCustList();
		initResBusGrid();
		initTransGrid();
		initOptRoadGrid();
		initCircuitsGrid()
		//initSynthesizeBussGrid();
		initNetDescGrid();
		initCustPropGrid();
		initBothDeviceGrid();
		initMainPanel();
   }
});

var initMainPanel = function(){
	 ResCustPage.backButton = new Ext.Button({
        text: "返回",
        ui: 'back',
        handler:function(){
			var mainPanel = Ext.getCmp("mainPanel");
			mainPanel.setActiveItem(ResCustPage.CustListPanel,{type: 'slide',reverse: true});
			ResCustPage.navigationBar.setTitle(mainPanel.title);
			ResCustPage.backButton.hide();
			ResCustPage.CustList.select(selectEl);
	    },
        hidden: true,
        scope: this
    });
	 ResCustPage.funButton = new Ext.Button({
	        text: "功能",
	        ui: 'confirm',
	        handler:function(){
	        	 if(!selectRecord){
	        		 Ext.Msg.alert('提示', '请选择一个客户！', Ext.emptyFn);
	        		 return;
		       		}
				 if(!ResCustPage.MenuPanel){
		      		initMenuList();
		      	}
		 	 	ResCustPage.MenuPanel.showBy(ResCustPage.funButton, 'fade', false);
		    },
	        scope: this
	    });
	
	ResCustPage.navigationBar = new Ext.Toolbar({
        ui: 'dark',
        dock: 'top',
        title: '客户列表',
        items: [ResCustPage.backButton, {xtype: 'spacer'},ResCustPage.funButton]
    });
	ResCustPage.MainPanel = new Ext.Panel({
		title: '客户列表',
		id:'mainPanel',
		fullscreen: true,
		dockedItems:[ResCustPage.navigationBar],
		layout: 'card',
		items:[
			ResCustPage.CustListPanel,
			//ResCustPage.busGrid,
			//ResCustPage.transGrid,
			//ResCustPage.optRoadGrid,
			ResCustPage.CircuitsGrid,
			ResCustPage.netDescGrid,
			ResCustPage.custPropGrid,
			ResCustPage.BothDeviceGrid
		]
	}).show();
	
};
var loadDataFun = function(itemId){
	 var custId=selectRecord.get("CUST_ID");
		if(selectRecord){
			if(itemId=="card0"){
				ResCustPage.CustList.select(selectEl);
			}
			if(itemId=="bussList"){
				 if(lastCustID1!=custId){
				 	Ext.getBody().mask(false, '<div class="demos-loading">Loading&hellip;</div>');
				 	lastCustID1 = custId;
				 	ResCustPage.busGrid.getStore().load({params:{'custId':custId}});
          	 }
			}
			if(itemId=="card3"){
				 	Ext.getBody().mask(false, '<div class="demos-loading">Loading&hellip;</div>');
				 	ResCustPage.transGrid.getStore().load({params:{'custId':custId}});
			}
			
			if(itemId == "card4"){
				Ext.getBody().mask(false, '<div class="demos-loading">Loading&hellip;</div>');
				ResCustPage.optRoadGrid.getStore().load({params:{'custId':custId}});
			}
			if(itemId == "Circuits"){
				ResCustPage.CircuitsGrid.setLoading(true);
				ResCustPage.CircuitsGrid.getStore().load({params:{'custId':custId}});
			}
			if(itemId == "netDesc"){
				ResCustPage.netDescGrid.setLoading(true);
				ResCustPage.netDescGrid.getStore().load({params:{'custId':custId}});
			}
			if(itemId == "custprop"){
				ResCustPage.custPropGrid.setLoading(true);
				ResCustPage.custPropGrid.getStore().load({params:{'custId':custId}});
			}
			if(itemId == "BothDevice"){
				ResCustPage.BothDeviceGrid.setLoading(true);
				ResCustPage.BothDeviceGrid.getStore().load({params:{'custId':custId}});
			}
			
		}
}
var initMenuList = function(){
	 Ext.regModel('MenuModel', {
         fields: ['menuID', 'menuName']
     });
	 ResCustPage.MenuList = new Ext.List({
		 store: new Ext.data.Store({
             model: 'MenuModel',
             data: [
                 {menuID: 'Circuits', menuName: '电路/光路列表'},
                 {menuID: 'BothDevice', menuName: '两端设备列表'},
                 {menuID: 'housePic', menuName: '机房拓扑'},
                 {menuID: 'NetPic', menuName: '传输网元拓扑图'},
                 {menuID: 'OPTPic', menuName: '光纤拓扑图'},
                 {menuID: 'cloudPic', menuName: '拓扑云图 '},
                 {menuID: 'netDesc', menuName: '网络描述'},
                 {menuID: 'custprop', menuName: '客户信息'}
                 //{menuID: 'bussList', menuName: '业务列表'},
                 //{menuID: 'card3', menuName: '传输列表'},
                 //{menuID: 'card4', menuName: '光路列表'},
                 //{menuID: 'card9', menuName: '业务拓扑图'},
             ]
         }),
         itemId: 'list',
         scroll: false,
         itemTpl : [
             '<span class="x-list-label">{menuName}</span>',
             '<span class="x-list-selected"></span>'
         ],
         listeners: {
             select :function(selModel, selected) {
     					if(selected){
     						ResCustPage.MenuPanel.hide({
         			            type: 'fade',
         			            out: true,
         			            scope: this
         			        });
         					var objID = selected.get("menuID");
         					if(objID=='housePic'){
         						ResCustPage.MenuList.deselect(selected);
             					window.open("<%=request.getContextPath()%>/main/touch/testTwaver.jsp?custId="+selectRecord.get("CUST_ID"));
             					return;
             				}
         					if(objID=='cloudPic'){
         						ResCustPage.MenuList.deselect(selected);
         						window.open("<%=request.getContextPath()%>/main/touch/testTwaverCloudyTopo.jsp?custId="+selectRecord.get("CUST_ID"));
             					return ;
             				}
         					if(objID=='card9'){
         						ResCustPage.MenuList.deselect(selected);
         						window.open("<%=request.getContextPath()%>/main/touch/testTwaverRoomTopo.jsp?custId="+selectRecord.get("CUST_ID"));
             					return ;
             				}
         					if(objID=='NetPic'){
         						ResCustPage.MenuList.deselect(selected);
         						window.open("<%=request.getContextPath()%>/main/touch/testTwaverNetTopo.jsp?custId="+selectRecord.get("CUST_ID"));
             					return ;
             				}
             				if(objID=='OPTPic'){
         						ResCustPage.MenuList.deselect(selected);
         						var optRecord = ResCustPage.CircuitsGrid.getSelect();
         						if(!optRecord){
         							 Ext.Msg.alert('提示', '请选择一条电路或者光路！', Ext.emptyFn);
         							 return;
             					}
         						window.open("<%=request.getContextPath()%>/main/touch/testTwaverOptTopo.jsp?custId="+optRecord.get("CIRCUIT_ID"));
             					return ;
             				}
         					var win = Ext.getCmp(objID);
         					var mainPanel = Ext.getCmp("mainPanel");
         					mainPanel.setActiveItem(win,{type: 'slide',reverse: false});
         					var custId=selectRecord.get("CUST_ID");
         					var _title = win.title;
         					if(custId){
         						_title = '<img height="40"  src="../../images/LOGO/'+custId+'.png" style="border-top:5px "  />'+_title;
             				}
         					
         					ResCustPage.navigationBar.setTitle(_title);
         					ResCustPage.backButton.show();
         					loadDataFun(objID);
         				}
     					ResCustPage.MenuList.deselect(selected);
     				},
             scope  : this
     	} 

	});
     ResCustPage.MenuPanel = new Ext.Panel({
         floating         : true,
         stopMaskTapEvent : true,
         hideOnMaskTap    : true,
         cls              : 'x-select-overlay',
         scroll           : 'vertical',
         items:  ResCustPage.MenuList
     });
}
//客户列表
var initCustList = function(){
	
	 Ext.regModel('Customer', {
         fields: ['CUST_NO','CUST_ID']
     });
     var store =  ResCustPage.CustStore =  new Ext.data.JsonStore({
         model  : 'Customer',
         autoLoad :true,
         proxy: {
	            type: 'ajax',
	            url: '<%=request.getContextPath()%>/cust.spr?action=queryCust',
	            reader: {
	                type: 'json',
	                root: '',
	                idProperty: 'CUST_ID'
	            }
     		}
     });
     var listConfig = {
    	 itemTpl: '<div class="contact" ><img height="40"  src="../../images/LOGO/{CUST_ID}.png"/><strong>{CUST_NO}</strong></div>',
         singleSelect: true,
         grouped: false,
         store: store
     
     };
	var custList = ResCustPage.CustList = new Ext.List(Ext.apply(listConfig, {
        fullscreen: false,
        width: "100%",
        height: "100%"
        
    }));
	ResCustPage.CustListPanel = new Ext.Panel({
		 title:'客户',
         id:"card0",
         fullscreen: false,
         width: "100%",
         height: "100%",
         items:ResCustPage.CustList,
         dockedItems:[
                      {xtype: 'toolbar',dock : 'top',
                       items: [
                           {xtype: 'textfield',placeHolder: '客户名称',id:'seachCod',
                               name:'seachCod',
                               listeners  : {
                                   scope: this,
                                   blur: searchCust
                               }
                           },
                           {xtype: 'button',ui: 'confirm',text:'GO',handler:function(){
                               var seachField = Ext.getCmp('seachCod');
                               searchCust(seachField);
                               }},
                           {xtype: 'spacer'}
                       ]
                      }
                  ]

		});
	ResCustPage.CustList.on('itemtap',function(dataView,index,item,e){
    	selectRecord = ResCustPage.CustList.getStore().getAt(index);
    	selectEl = item;
    });
};
function searchCust(field){
     var value = field.getValue();
     if (!value) {
    	 ResCustPage.CustStore.filterBy(function() {
             return true;
         });
     } else {
         var searches = value.split(' '),
             regexps  = [],
             i;
         for (i = 0; i < searches.length; i++) {
             if (!searches[i]) return;
             regexps.push(new RegExp(searches[i], i));
         };
         ResCustPage.CustStore.filterBy(function(record) {
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
		fullscreen  : false,
		width: "100%",
        height: "100%",
		id:"bussList",
		store: testStore,
		selModel    : {
			singleSelect : true,
			locked:false
		},
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
		width: "100%",
        height: "100%",
		id:"card3",
		store: testStore,
		selModel    : {
			singleSelect : true,
			locked:false
		},
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
		selModel    : {
			singleSelect : true,
			locked:false
		},
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
		fields: ["ROWNUM","BUZ_TYPE","CIRCUIT_NO","RATE","EQPBEG","EQPEND","DIS_NO","CIRCUIT_ID"]
		});
	var testStore = new Ext.ux.ZteStore({
       model  : 'SynthesizeBuss',
       autoLoad :false,
       proxy: {type: 'ajax',
	           url: '<%=request.getContextPath()%>/cust.spr?action=querySynthesizeBuss',
	           reader: {type: 'json',root: 'list',idProperty: 'CIRCUIT_ID'}
   		}
   }); 
	var testGrid = ResCustPage.synthesizeBussGrid = new Ext.ux.ZteGridPanel({
		fullscreen  : false,
		width: "100%",
        height: "100%",
		id:"card5",
		selModel    : {
			singleSelect : true,
			locked:false
		},
		store: testStore,
		title : "电路/光路列表",
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
	var testStore = new Ext.ux.ZteStore({
      model  : 'NetDesc',
      autoLoad :false,
      sorters: 'CUST_ID_NODE',
      proxy: {
            type: 'ajax',
            totalProperty:'totalCount',
            url: '<%=request.getContextPath()%>/cust.spr?action=queryNetDesc',
            reader: {type: 'json',root: 'list',idProperty: 'CUST_ID_NODE'}
  		}
	}); 
	var testGrid = ResCustPage.netDescGrid = new Ext.ux.ZteGridPanel({
		fullscreen  : false,
		width: "100%",
        height: "100%",
		id:"netDesc",
		store: testStore,
		selModel    : {
			singleSelect : true,
			locked:false
		},
		title : "网络描述",
		colModel    : [
			{header  : "主要节点",mapping :"EQP_NAME"},
			{header   : "节点电路信息",mapping  : "CIR_INFO"},
			{header   : "上联网元",mapping  : "UPPER_NODE",hidden:ResCustPage.IsPad},
			{header   : "保护方式",mapping  : "PROTECT_TYPE",hidden:ResCustPage.IsPad},
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
       proxy: {
	            type: 'ajax',
	            url: '<%=request.getContextPath()%>/cust.spr?action=queryCustProp',
	            reader: {type: 'json',root: '',idProperty: 'key'}
   		}
   }); 
	var testGrid = ResCustPage.custPropGrid =new Ext.ux.TouchGridPanel({
		fullscreen  : false,
		width: "100%",
        height: "100%",
		id:"custprop",
		selModel    : {
			singleSelect : true,
			locked:false
		},
		store: testStore,
		title : "客户信息",
		colModel: [
			{header  : "属性",mapping : "key"},
			{header   : "属性值",mapping  : "value"}
		]
	});
}
//两端设备列表
var initBothDeviceGrid = function(){
	 Ext.regModel("BothDeviceModel", {
			fields : ["CIRCUIT_NO","BUZ_TYPE", "ROOM_NAME","EQP_NAME","EQP_NO","SPECIALITY"]
		});
	var testStore = new Ext.ux.ZteStore({
       model  : 'BothDeviceModel',
       autoLoad :false,
       proxy: {
	            type: 'ajax',
	            url: '<%=request.getContextPath()%>/cust.spr?action=queryBothDevice',
	            reader: {
	                type: 'json',
	                root: 'list',
	                totalProperty:'totalCount',
	                idProperty: 'CIRCUIT_NO'
	            }
   		}
   }); 
	var bothDeviceGrid  = ResCustPage.BothDeviceGrid = new Ext.ux.ZteGridPanel({
		fullscreen  : false,
		width: "100%",
        height: "100%",
		id:"BothDevice",
		store: testStore,
		selModel    : {
			singleSelect : true,
			locked:false
		},
		title : "两端设备列表",
		colModel    : [
			{header   : "电路/光路编号",mapping  : "CIRCUIT_NO"},
			{header   : "业务类型",mapping  : "BUZ_TYPE"},
			{header   : "专业",mapping  : "SPECIALITY"},
			{header   : "机房名称",mapping  : "ROOM_NAME",hidden:ResCustPage.IsPad},
			{header   : "设备名称",mapping  : "EQP_NAME"},
			{header   : "设备编号",mapping  : "EQP_NO",hidden:ResCustPage.IsPad}
		]
	});
}
//电路光路列表
var initCircuitsGrid = function(){
	 Ext.regModel("CircuitModel", {
			fields : ["CIRCUIT_ID","CIRCUIT_NO","BUZ_TYPE", "OPR_STATE","RATE","FORMAL_CIRCUIT_NO","ROUTE"]
		});
	var testStore = new Ext.ux.ZteStore({
       model  : 'CircuitModel',
       autoLoad :false,
       proxy: {
	            type: 'ajax',
	            url: '<%=request.getContextPath()%>/cust.spr?action=queryCircuits',
	            reader: {
	                type: 'json',
	                root: 'list',
	                totalProperty:'totalCount',
	                idProperty: 'CIRCUIT_NO'
	            }
   		}
   }); 
	var circuitsGrid  = ResCustPage.CircuitsGrid = new Ext.ux.ZteGridPanel({
		fullscreen  : false,
		width: "100%",
        height: "100%",
		id:"Circuits",
		store: testStore,
		selModel    : {
			singleSelect : true,
			locked:false
		},
		title:"电路/光路列表",
		colModel    : [
			{header   : "电路/光路编号",mapping  : "CIRCUIT_NO"},
			{header   : "业务类型",mapping  : "BUZ_TYPE"},
			{header   : "电路/光路状态",mapping  : "OPR_STATE"},
			{header   : "电路/光路速率",mapping  : "RATE"},
			{header   : "国内国际编码",mapping  : "FORMAL_CIRCUIT_NO",hidden:ResCustPage.IsPad},
			{header   : "电路/光路路由",mapping  : "ROUTE",hidden:ResCustPage.IsPad}
		]
	});
}
</script>


</html>